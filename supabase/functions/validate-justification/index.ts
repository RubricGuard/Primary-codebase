import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { highlightedText, justification, criterionName, criterionDescription, maxScore, score, fullSubmission } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are an academic grading validation assistant. Your job is to evaluate whether a grader's justification is supported by the highlighted evidence from a student's submission.

You must respond with a JSON object using the tool provided. Evaluate the alignment between:
1. The highlighted text (evidence from the student's work)
2. The grader's justification/explanation for the score
3. The rubric criterion being evaluated

Determine one of three statuses:
- "fully_supported": The justification clearly references and is well-supported by the highlighted evidence
- "partially_supported": The justification has some connection to the evidence but is incomplete or makes claims not fully backed by the highlight
- "not_supported": The justification does not align with or is contradicted by the highlighted evidence

Additionally, identify 1-3 SHORT exact quotes (5-20 words each) from the full student submission that are most relevant to this criterion and the grader's justification. These quotes must be EXACT substrings of the submission text.`;

    const userPrompt = `Rubric Criterion: "${criterionName}" — ${criterionDescription} (Score: ${score}/${maxScore})

Highlighted Evidence from Student Submission:
"${highlightedText}"

Grader's Justification:
"${justification}"

Full Student Submission:
"${fullSubmission}"

Evaluate whether the justification is supported by the highlighted evidence. Also identify key quotes from the full submission relevant to this criterion.`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "validate_justification",
                description: "Return validation result for the grader's justification",
                parameters: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      enum: ["not_supported", "partially_supported", "fully_supported"],
                    },
                    reasoning: {
                      type: "string",
                      description: "Explain why this status was chosen — reference specific parts of the highlighted evidence and the justification (2-3 sentences)",
                    },
                    suggestedRefinement: {
                      type: "string",
                      description: "Suggest how the grader could improve their justification to better align with the evidence and rubric criterion (1-2 sentences)",
                    },
                    keyQuotes: {
                      type: "array",
                      items: { type: "string" },
                      description: "1-3 short exact quotes (5-20 words each) from the full student submission that are most relevant to this rubric criterion. Must be exact substrings of the submission.",
                    },
                  },
                  required: ["status", "reasoning", "suggestedRefinement", "keyQuotes"],
                  additionalProperties: false,
                },
              },
            },
          ],
          tool_choice: { type: "function", function: { name: "validate_justification" } },
        }),
      }
    );

    if (!response.ok) {
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: `AI gateway error: ${response.status}` }),
        { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    
    if (toolCall?.function?.arguments) {
      const result = JSON.parse(toolCall.function.arguments);
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ status: "partially_supported", reasoning: "Could not determine validation." }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("validate error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
