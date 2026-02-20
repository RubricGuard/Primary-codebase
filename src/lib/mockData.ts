const fmtDate = (daysOffset: number) => {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const assignments = [
  {
    id: "bus302-ca1",
    title: "Argumentative Essay: Should Universities Ban Laptops in Lecture Halls?",
    course: "BUS302 — Strategic Management",
    get assignedDate() { return fmtDate(-7); },
    get dueDate() { return fmtDate(7); },
    totalSubmissions: 48,
    gradedCount: 0,
    sections: ["Section A (Prof. Sharma)", "Section B (TA: M. Chen)", "Section C (TA: R. Patel)"],
    rubricCriteria: 4,
    description: "The debate over laptop use in university lecture halls has intensified in recent years. Proponents argue laptops enhance learning through real-time note-taking, accessibility, and digital resource access. Critics point to research showing laptops reduce comprehension, distract nearby students, and undermine deep engagement.\n\nYour task is to write an argumentative essay taking a clear position on whether universities should ban laptops in lecture halls. Your argument should be grounded in evidence and demonstrate critical thinking.\n\nYour essay should address:\n\n1. Does laptop note-taking help or hinder learning? Consider the research on handwriting vs. typing for retention and comprehension (e.g., Mueller & Oppenheimer, 2014).\n\n2. What is the impact of laptop multitasking on the student using the laptop AND on students sitting nearby? Consider Sana et al. (2013) on second-hand distraction effects.\n\n3. Are there equity and accessibility concerns that complicate a blanket ban? Think about students with disabilities, non-native speakers, or those who rely on digital tools.\n\n4. What alternatives to a full ban might achieve the same learning outcomes without restricting student autonomy?\n\nYour essay should be 800–1,200 words, take a clear position, cite at least 3 credible sources, and demonstrate strong argumentative writing.",
  },
];

export const rubricCriteria = [
  {
    id: "arg-clarity",
    name: "Argument Clarity",
    description: "Strength and clarity of the central thesis and overall argument structure.",
    maxScore: 25,
    scoringGuide: {
      excellent: "Thesis is precise, debatable, and consistently sustained. Argument flows logically with smooth transitions and a compelling structure.",
      good: "Clear thesis with mostly logical structure. Minor lapses in flow or transitions but overall argument is easy to follow.",
      adequate: "Thesis is present but vague or overly broad. Argument structure is discernible but disjointed in places.",
      needsWork: "No clear thesis or position. Essay reads as a summary of opinions rather than a structured argument.",
    },
  },
  {
    id: "evidence-use",
    name: "Evidence Use",
    description: "Quality, relevance, and integration of supporting evidence from credible sources.",
    maxScore: 25,
    scoringGuide: {
      excellent: "3+ credible, well-integrated sources. Evidence directly supports claims with proper citations and context. Sources are current and authoritative.",
      good: "3 sources cited with mostly effective integration. Occasional gaps between evidence and claims. Citations are present but may lack context.",
      adequate: "Fewer than 3 sources or sources are weakly integrated. Evidence is present but doesn't clearly support the argument being made.",
      needsWork: "Little to no credible evidence. Claims are unsupported or rely on anecdotal reasoning. Missing or incorrect citations.",
    },
  },
  {
    id: "critical-analysis",
    name: "Critical Analysis",
    description: "Depth of analytical reasoning, identification of assumptions, and engagement with counterarguments.",
    maxScore: 25,
    scoringGuide: {
      excellent: "Engages meaningfully with counterarguments and rebuts them with evidence. Identifies underlying assumptions and demonstrates nuanced, multi-perspective thinking.",
      good: "Addresses at least one counterargument with some depth. Shows awareness of complexity but may not fully develop rebuttals.",
      adequate: "Mentions opposing views superficially without genuine engagement. Analysis stays at surface level with limited critical depth.",
      needsWork: "No engagement with counterarguments. Essay is one-sided with no evidence of critical thinking or analysis of assumptions.",
    },
  },
  {
    id: "writing-quality",
    name: "Writing Quality",
    description: "Clarity, coherence, grammar, and adherence to academic writing conventions.",
    maxScore: 25,
    scoringGuide: {
      excellent: "Polished, professional prose with no significant errors. Academic tone is consistent. Paragraphs are well-organized with clear topic sentences.",
      good: "Generally well-written with minor grammatical issues. Tone is mostly academic. Organization is clear with occasional rough transitions.",
      adequate: "Noticeable grammatical or structural issues that impede readability. Tone shifts between casual and academic. Weak paragraph cohesion.",
      needsWork: "Frequent errors in grammar, spelling, or syntax. Lacks academic tone. Poor organization makes the argument difficult to follow.",
    },
  },
];

const formatDate = (daysAgo: number, time: string) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + " — " + time;
};

export const studentSubmissions = [
  {
    id: "STU001",
    name: "Student 001",
    submittedAt: formatDate(1, "11:42 PM"),
    section: "Section A",
    content: "Universities should implement a carefully structured laptop policy rather than an outright ban. This essay argues that while the evidence against unrestricted laptop use is compelling, a blanket prohibition creates more problems than it solves — particularly around accessibility and student autonomy.\n\nThe case against laptops rests on strong empirical ground. Mueller and Oppenheimer (2014) demonstrated that students who took notes by hand scored significantly higher on conceptual questions than those who typed, even when laptop users took more voluminous notes. The researchers attributed this to \"desirable difficulty\" — handwriting forces students to process and condense information rather than transcribing verbatim. This finding has been replicated across multiple studies and suggests that the cognitive benefits of handwriting are not trivial.\n\nHowever, the distraction argument is arguably more damaging to the case for laptops. Sana, Weston, and Cepeda (2013) found that not only did laptop multitaskers perform 11% worse on comprehension tests, but students sitting within view of a multitasking peer scored 17% lower — even though they were paying attention. This \"second-hand smoke\" effect means that one student's laptop use imposes a negative externality on the learning environment, a point that strengthens the case for some form of restriction.\n\nYet a blanket ban is problematic for several reasons. First, it raises serious accessibility concerns. Students with documented disabilities — including those with dyslexia, motor impairments, or processing disorders — may rely on laptops for essential accommodations like speech-to-text software or enlarged displays. Requiring these students to disclose their disability to receive an exemption creates stigma and violates the spirit of inclusive education (Waterfield & West, 2006).\n\nSecond, the research landscape is more nuanced than ban advocates acknowledge. A 2020 meta-analysis by Urry et al. found that the Mueller and Oppenheimer effect was smaller and less consistent when replicated at scale. The authors cautioned against using a single study to justify sweeping policy changes — a point that underscores the importance of evidence-based, rather than evidence-inspired, decision-making.\n\nThe most effective approach is a structured middle ground: designated \"laptop-free\" zones or sessions within a course, combined with explicit instruction on effective digital note-taking strategies. This preserves student choice, maintains accessibility, and addresses the distraction problem without resorting to paternalistic enforcement.\n\nIn conclusion, the question is not whether laptops can hinder learning — the evidence suggests they can — but whether a university-wide ban is the appropriate response. Given the accessibility implications, the contested nature of the research, and the availability of less restrictive alternatives, a nuanced policy is both more ethical and more effective than prohibition.",
  },
  {
    id: "STU002",
    name: "Student 002",
    submittedAt: formatDate(0, "8:15 AM"),
    section: "Section B",
    content: "I think universities should ban laptops in lectures because they are very distracting. When students have laptops open they just go on social media and don't pay attention to the professor.\n\nStudies have shown that laptops are bad for learning. Students who use laptops don't do as well as students who write by hand. This makes sense because when you type you don't really think about what you're writing, you just type everything the professor says.\n\nAnother problem is that laptops distract other students too. If someone next to you is watching YouTube or shopping online it's hard to focus on the lecture. This isn't fair to students who are trying to learn.\n\nSome people say laptops should be allowed for students with disabilities but I think those students can just get special permission from the professor. The rest of the class shouldn't have to deal with distractions just because a few students need laptops.\n\nLaptops also make it too easy to cheat. Students can look up answers during class or share notes with people who didn't come to lecture. This is unfair and undermines the learning process.\n\nIn conclusion laptops should be banned from lectures because they hurt learning, distract others, and make cheating easier. Universities need to take action to protect the quality of education.",
  },
  {
    id: "STU003",
    name: "Student 003",
    submittedAt: formatDate(0, "2:30 PM"),
    section: "Section C",
    content: "The laptop debate in higher education represents a microcosm of a broader tension in pedagogy: the conflict between technological affordance and cognitive science. This essay contends that universities should not ban laptops, but should instead redesign lecture pedagogy to render the distraction problem irrelevant.\n\nThe empirical case against laptops centers on two findings. First, Mueller and Oppenheimer's (2014) landmark study demonstrated that longhand note-takers outperformed laptop users on conceptual recall, attributing this to the generative processing required by handwriting. Second, Sana et al. (2013) documented a striking externality: students in direct view of a multitasking peer scored 17% lower on comprehension assessments, suggesting that laptop distraction is not merely a private cost but a public one.\n\nThese findings are significant but require careful contextualization. The Mueller and Oppenheimer study tested immediate and delayed recall under controlled conditions — a far cry from the complex, multi-week learning that characterizes actual university courses. Moreover, Urry et al. (2021) conducted a large-scale replication (n = 1,162 across multiple sites) and found substantially weaker effects, concluding that \"the evidence for a laptop penalty is less robust than commonly assumed.\" This distinction between a clean laboratory finding and a messy real-world effect is precisely the kind of analytical nuance that should inform policy.\n\nThe accessibility dimension further complicates the ban argument. Universal Design for Learning (UDL) principles hold that learning environments should be proactively designed to accommodate diverse needs rather than retrofitted with individual exemptions (Rose & Meyer, 2002). A laptop ban with disability exemptions inverts this principle: it creates a restrictive default and forces students to self-identify as \"different\" to receive accommodation. This is both pedagogically and ethically problematic.\n\nPerhaps most importantly, the ban debate misdiagnoses the problem. If students are multitasking during lectures, the root cause may be lecture design rather than device availability. Active learning interventions — including think-pair-share, real-time polling, and structured problem-solving — have been shown to reduce off-task laptop behavior by 60-70% (Fried, 2008). In other words, the most effective \"laptop policy\" may be no laptop policy at all, but rather a commitment to pedagogical practices that demand engagement.\n\nThis analysis does not dismiss the distraction evidence — it reframes it. Rather than treating laptops as the disease, universities should treat disengagement as the symptom and active pedagogy as the cure. A ban is a blunt instrument applied to a nuanced problem; redesigned instruction is a scalpel.",
  },
];

export type ValidationStatus = "not_supported" | "partially_supported" | "fully_supported" | null;

export interface ValidationResult {
  status: ValidationStatus;
  reasoning: string;
  suggestedRefinement: string;
  keyQuotes?: string[];
}

export interface GradingScore {
  criterionId: string;
  score: number | null;
  explanation: string;
  validated: boolean;
  aiSuggestion?: string;
  aiSuggestedScore?: number;
  aiSupportingEvidence?: string[];
  overridden?: boolean;
  highlightedTexts?: string[];
  validationStatus?: ValidationStatus;
  validationLoading?: boolean;
  validationResult?: ValidationResult;
}

// ============================================================
// SHOWCASE DATA
// STU001 → "Gold standard" grader: mostly fully_supported
// STU002 → Grader errors: not_supported cases (justification contradicts evidence, inflated scores)
// STU003 → Close but sloppy: partially_supported cases (vague justifications for high scores)
// ============================================================

export const sampleGradedData: Record<string, GradingScore[]> = {
  // ── STU001: Mix of reasonable and questionable deductions ──
  STU001: [
    {
      criterionId: "arg-clarity",
      score: 22,
      explanation: "Clear thesis advocating a structured middle ground. Well-signposted argument. Deducted 3 marks: thesis doesn't explicitly state which specific 'laptop-free' model is being proposed, leaving the reader to infer the exact policy recommendation.",
      validated: false,
      aiSuggestion: "The 3-mark deduction seems harsh — the student's thesis progressively narrows from a general principle to a specific policy ('laptop-free zones + digital note-taking instruction'). The refinement happens across the essay, which is a sign of argumentative sophistication, not weakness.",
      aiSuggestedScore: 24,
      aiSupportingEvidence: [
        "Universities should implement a carefully structured laptop policy rather than an outright ban.",
        "The most effective approach is a structured middle ground: designated \"laptop-free\" zones or sessions within a course, combined with explicit instruction on effective digital note-taking strategies.",
        "the question is not whether laptops can hinder learning — the evidence suggests they can — but whether a university-wide ban is the appropriate response.",
      ],
      highlightedTexts: [
        "Universities should implement a carefully structured laptop policy rather than an outright ban.",
        "The most effective approach is a structured middle ground: designated \"laptop-free\" zones or sessions within a course, combined with explicit instruction on effective digital note-taking strategies.",
      ],
      validationStatus: "fully_supported",
      validationResult: {
        status: "fully_supported",
        reasoning: "The justification accurately identifies the nuanced thesis and logical structure. The deduction reason ('thesis doesn't explicitly state which model') is defensible, though the highlighted evidence shows the student does specify their policy later in the essay.",
        suggestedRefinement: "Consider noting how the student's thesis evolves throughout the essay — the opening claim is refined by the conclusion into a more specific policy recommendation, which may reduce the validity of the 3-mark deduction.",
        keyQuotes: [
          "carefully structured laptop policy rather than an outright ban",
          "a structured middle ground: designated \"laptop-free\" zones",
          "preserves student choice, maintains accessibility, and addresses the distraction problem",
        ],
      },
    },
    {
      criterionId: "evidence-use",
      score: 18,
      explanation: "Cites Mueller & Oppenheimer, Sana et al., Waterfield & West, and the Urry meta-analysis. Evidence is well-integrated. Deducted 7 marks: the student fails to include any primary data or original analysis, relying entirely on secondary sources without critically evaluating their methodologies.",
      validated: false,
      aiSuggestion: "The 7-mark deduction for 'no primary data' is disproportionate — undergraduate argumentative essays are not expected to include original research. The rubric criterion is about quality, relevance, and integration of sources, all of which are strong here.",
      aiSuggestedScore: 22,
      aiSupportingEvidence: [
        "Mueller and Oppenheimer (2014) demonstrated that students who took notes by hand scored significantly higher on conceptual questions than those who typed",
        "Sana, Weston, and Cepeda (2013) found that not only did laptop multitaskers perform 11% worse on comprehension tests, but students sitting within view of a multitasking peer scored 17% lower",
        "Waterfield & West, 2006",
        "A 2020 meta-analysis by Urry et al. found that the Mueller and Oppenheimer effect was smaller and less consistent when replicated at scale.",
      ],
      highlightedTexts: [
        "Mueller and Oppenheimer (2014) demonstrated that students who took notes by hand scored significantly higher on conceptual questions than those who typed",
        "Sana, Weston, and Cepeda (2013) found that not only did laptop multitaskers perform 11% worse on comprehension tests, but students sitting within view of a multitasking peer scored 17% lower",
        "A 2020 meta-analysis by Urry et al. found that the Mueller and Oppenheimer effect was smaller and less consistent when replicated at scale.",
      ],
      validationStatus: "partially_supported",
      validationResult: {
        status: "partially_supported",
        reasoning: "The positive assessment of evidence integration is well-supported by the highlighted text. However, the 7-mark deduction for 'no primary data' applies a standard beyond the rubric's scope — the criterion evaluates 'quality, relevance, and integration of supporting evidence from credible sources,' not original research contribution.",
        suggestedRefinement: "Re-evaluate the deduction against the rubric criteria. If 'primary data' is not required by the rubric, the deduction should reflect actual weaknesses in source integration or relevance instead.",
        keyQuotes: [
          "Mueller and Oppenheimer (2014) demonstrated that students who took notes by hand",
          "Sana, Weston, and Cepeda (2013) found that not only did laptop multitaskers",
          "A 2020 meta-analysis by Urry et al.",
        ],
      },
    },
    {
      criterionId: "critical-analysis",
      score: 21,
      explanation: "Engages with counterarguments (accessibility, contested research). Deducted 4 marks: does not address the economic cost of implementing laptop-free zones (e.g., signage, enforcement) and doesn't consider the perspective of university administrators.",
      validated: false,
      aiSuggestion: "The deduction for 'economic cost of signage/enforcement' applies a policy implementation standard rather than an analytical depth standard. The student demonstrates strong critical analysis through methodological critique and equity analysis, which is what the rubric assesses.",
      aiSuggestedScore: 23,
      aiSupportingEvidence: [
        "Yet a blanket ban is problematic for several reasons. First, it raises serious accessibility concerns.",
        "Requiring these students to disclose their disability to receive an exemption creates stigma and violates the spirit of inclusive education",
        "The authors cautioned against using a single study to justify sweeping policy changes",
      ],
      highlightedTexts: [
        "Yet a blanket ban is problematic for several reasons. First, it raises serious accessibility concerns.",
        "The authors cautioned against using a single study to justify sweeping policy changes — a point that underscores the importance of evidence-based, rather than evidence-inspired, decision-making.",
      ],
      validationStatus: "fully_supported",
      validationResult: {
        status: "fully_supported",
        reasoning: "The justification correctly identifies engagement with counterarguments. The deduction reason (economic cost, administrator perspective) is a valid observation about what's missing, though it may set the bar beyond what the rubric requires for a 25/25.",
        suggestedRefinement: "Consider whether the rubric's 'depth of analytical reasoning' requires policy cost analysis, or whether the student's methodological critique and equity analysis already demonstrate sufficient depth.",
        keyQuotes: [
          "Requiring these students to disclose their disability to receive an exemption creates stigma",
          "evidence-based, rather than evidence-inspired, decision-making",
          "a blanket ban is problematic for several reasons",
        ],
      },
    },
    {
      criterionId: "writing-quality",
      score: 23,
      explanation: "Strong academic prose with effective transitions. The 'second-hand smoke' metaphor is vivid. Deducted 2 marks: conclusion could be more concise, and the essay slightly exceeds the ideal paragraph length in the middle sections.",
      validated: false,
      aiSuggestion: "The 2-mark deduction for conclusion length and paragraph density is reasonable and proportionate. The essay demonstrates sophisticated rhetorical techniques including extended metaphor and effective use of em-dashes.",
      aiSuggestedScore: 23,
      aiSupportingEvidence: [
        "This \"second-hand smoke\" effect means that one student's laptop use imposes a negative externality on the learning environment",
        "a nuanced policy is both more ethical and more effective than prohibition",
      ],
      highlightedTexts: [
        "This \"second-hand smoke\" effect means that one student's laptop use imposes a negative externality on the learning environment",
        "the question is not whether laptops can hinder learning — the evidence suggests they can — but whether a university-wide ban is the appropriate response.",
      ],
      validationStatus: "fully_supported",
      validationResult: {
        status: "fully_supported",
        reasoning: "The highlighted passages confirm strong rhetorical devices ('second-hand smoke' metaphor) and effective academic framing. The deduction for conclusion conciseness is reasonable and well-proportioned at 2 marks.",
        suggestedRefinement: "Consider noting the effective use of em-dashes for parenthetical asides throughout the essay as an additional marker of writing sophistication.",
        keyQuotes: [
          "This \"second-hand smoke\" effect means that one student's laptop use",
          "the question is not whether laptops can hinder learning",
          "a nuanced policy is both more ethical and more effective than prohibition",
        ],
      },
    },
  ],

  // ── STU002: Grader errors — inflated scores with fabricated reasons, plus one honest low score ──
  STU002: [
    {
      criterionId: "arg-clarity",
      score: 22,
      explanation: "The student constructs a nuanced, multi-layered thesis with explicit qualifications, citing Mueller & Oppenheimer (2014) directly in the thesis statement. Deducted only 3 marks for minor structural flow issues between paragraphs.",
      validated: false,
      aiSuggestion: "The score of 22 is far too high. The thesis is a single informal sentence ('I think universities should ban laptops') with no qualifications, no citations, and no nuance. A score of 10–12 would better reflect the actual argument clarity.",
      aiSuggestedScore: 11,
      aiSupportingEvidence: [
        "I think universities should ban laptops in lectures because they are very distracting.",
        "laptops should be banned from lectures because they hurt learning, distract others, and make cheating easier.",
      ],
      highlightedTexts: [
        "I think universities should ban laptops in lectures because they are very distracting.",
      ],
      validationStatus: "not_supported",
      validationResult: {
        status: "not_supported",
        reasoning: "The grader's justification claims the thesis is 'nuanced' and 'multi-layered' and cites Mueller & Oppenheimer. However, the student's submission contains no such citation, and the highlighted thesis is a simple, straightforward statement without qualifications. The 3-mark deduction implies a near-perfect argument, which is inaccurate.",
        suggestedRefinement: "The grader should revise the justification to reflect the actual text, which lacks academic citations in the thesis, and adjust the score significantly downward to account for the simplicity of the argument.",
        keyQuotes: [
          "I think universities should ban laptops in lectures because they are very distracting.",
          "laptops should be banned from lectures because they hurt learning, distract others, and make cheating easier.",
        ],
      },
    },
    {
      criterionId: "evidence-use",
      score: 21,
      explanation: "The student cites Mueller & Oppenheimer (2014) and Sana et al. (2013) with specific statistics on comprehension reduction. Deducted 4 marks because only two sources are used instead of the recommended three or more.",
      validated: false,
      aiSuggestion: "The deduction rationale implies the student cited two named sources — but the submission contains zero named citations. The actual text only says 'Studies have shown' without any author names, years, or data points. The score should reflect the absence of credible sourcing.",
      aiSuggestedScore: 8,
      aiSupportingEvidence: [
        "Studies have shown that laptops are bad for learning.",
        "Laptops also make it too easy to cheat. Students can look up answers during class or share notes with people who didn't come to lecture.",
      ],
      highlightedTexts: [
        "Studies have shown that laptops are bad for learning.",
        "Laptops also make it too easy to cheat. Students can look up answers during class or share notes with people who didn't come to lecture.",
      ],
      validationStatus: "not_supported",
      validationResult: {
        status: "not_supported",
        reasoning: "The grader's justification is entirely unsupported. The grader claims the student cites specific peer-reviewed authors and statistics, but the actual text only contains a vague reference to 'Studies' without any citations or specific data. The deduction for 'only two sources' is also fabricated since zero sources are properly cited.",
        suggestedRefinement: "The grader needs to re-evaluate the submission based on what is actually written; the current justification appears to be for a completely different paper.",
        keyQuotes: [
          "Studies have shown that laptops are bad for learning.",
          "Laptops also make it too easy to cheat.",
        ],
      },
    },
    {
      criterionId: "critical-analysis",
      score: 8,
      explanation: "Dismisses the accessibility counterargument ('they can just get special permission') without engaging with the underlying equity concerns. Deducted 17 marks: no alternative perspectives explored, no engagement with methodological limitations, and the counterargument treatment borders on dismissive rather than analytical.",
      validated: false,
      aiSuggestion: "The heavy deduction is well-justified. The student's treatment of accessibility is dismissive and frames disabled students as an inconvenience. The 'us vs. them' framing reveals a complete failure to engage with inclusive design principles.",
      aiSuggestedScore: 7,
      aiSupportingEvidence: [
        "Some people say laptops should be allowed for students with disabilities but I think those students can just get special permission from the professor.",
        "The rest of the class shouldn't have to deal with distractions just because a few students need laptops.",
      ],
      highlightedTexts: [
        "Some people say laptops should be allowed for students with disabilities but I think those students can just get special permission from the professor. The rest of the class shouldn't have to deal with distractions just because a few students need laptops.",
      ],
      validationStatus: "fully_supported",
      validationResult: {
        status: "fully_supported",
        reasoning: "The justification accurately identifies the dismissive treatment of accessibility concerns. The highlighted passage confirms 'just get special permission' and the framing of disabled students as an inconvenience, validating the low score of 8/25 and the specific deduction reasons.",
        suggestedRefinement: "You could strengthen this by also noting the problematic 'us vs. them' framing — 'the rest of the class shouldn't have to deal with' — which reveals a failure to consider inclusive design principles.",
        keyQuotes: [
          "those students can just get special permission from the professor",
          "The rest of the class shouldn't have to deal with distractions just because a few students need laptops",
        ],
      },
    },
    {
      criterionId: "writing-quality",
      score: 15,
      explanation: "Readable but informal. Uses 'I think' framing, lacks paragraph cohesion. Deducted 10 marks: run-on sentences throughout, missing commas in compound sentences, and the conclusion merely restates the introduction without development.",
      validated: false,
      aiSuggestion: "The deduction for informality and 'I think' framing is valid (roughly 5 marks). However, claiming 'run-on sentences throughout' is overstated — most sentences are short and simple rather than run-on. A score of 12–13 might be more appropriate.",
      aiSuggestedScore: 13,
      aiSupportingEvidence: [
        "I think universities should ban laptops in lectures because they are very distracting.",
        "When students have laptops open they just go on social media and don't pay attention to the professor.",
        "In conclusion laptops should be banned from lectures because they hurt learning, distract others, and make cheating easier.",
      ],
      highlightedTexts: [
        "I think universities should ban laptops in lectures because they are very distracting. When students have laptops open they just go on social media and don't pay attention to the professor.",
        "In conclusion laptops should be banned from lectures because they hurt learning, distract others, and make cheating easier. Universities need to take action to protect the quality of education.",
      ],
      validationStatus: "partially_supported",
      validationResult: {
        status: "partially_supported",
        reasoning: "The highlighted text supports the 'I think' framing and informal tone observations. However, the claim about 'run-on sentences throughout' isn't strongly evidenced — most sentences are short and grammatically simple. The missing comma observation is valid (e.g., 'When students have laptops open they just go on social media').",
        suggestedRefinement: "Distinguish between 'informal tone' (supported) and 'run-on sentences' (not well-evidenced). The deduction should be reframed around informality and lack of academic register rather than grammar errors.",
        keyQuotes: [
          "I think universities should ban laptops in lectures",
          "When students have laptops open they just go on social media",
          "In conclusion laptops should be banned from lectures",
        ],
      },
    },
  ],

  // ── STU003: High scores with some reasonable and some unreasonable deduction reasoning ──
  STU003: [
    {
      criterionId: "arg-clarity",
      score: 24,
      explanation: "Sophisticated thesis reframing the debate from 'should we ban?' to 'should we redesign pedagogy?' Deducted 1 mark: the thesis could have explicitly acknowledged the strongest counterargument (second-hand distraction) before reframing.",
      validated: false,
      aiSuggestion: "The 1-mark deduction is reasonable — the student's thesis is exceptionally strong but could benefit from briefly acknowledging the distraction externality before proposing the pedagogical solution.",
      aiSuggestedScore: 24,
      aiSupportingEvidence: [
        "This essay contends that universities should not ban laptops, but should instead redesign lecture pedagogy to render the distraction problem irrelevant.",
        "Rather than treating laptops as the disease, universities should treat disengagement as the symptom and active pedagogy as the cure.",
      ],
      highlightedTexts: [
        "This essay contends that universities should not ban laptops, but should instead redesign lecture pedagogy to render the distraction problem irrelevant.",
        "Rather than treating laptops as the disease, universities should treat disengagement as the symptom and active pedagogy as the cure.",
      ],
      validationStatus: "fully_supported",
      validationResult: {
        status: "fully_supported",
        reasoning: "The highlighted passages perfectly demonstrate the reframing thesis. The 1-mark deduction for not explicitly acknowledging the strongest counterargument in the thesis itself is a fair and proportionate observation.",
        suggestedRefinement: "Consider noting that the thesis is introduced in the opening and then refined in the conclusion — this progressive development is itself a marker of argumentative sophistication.",
        keyQuotes: [
          "redesign lecture pedagogy to render the distraction problem irrelevant",
          "Rather than treating laptops as the disease",
          "A ban is a blunt instrument applied to a nuanced problem",
        ],
      },
    },
    {
      criterionId: "evidence-use",
      score: 24,
      explanation: "Excellent use of well-integrated, credible sources throughout. Deducted 1 mark: the student doesn't include any sources published after 2021, suggesting the evidence base may not reflect the most current research in this rapidly evolving field.",
      validated: false,
      aiSuggestion: "The 1-mark deduction for 'no sources after 2021' is questionable — the assignment prompt itself references Mueller & Oppenheimer (2014) and Sana et al. (2013). Penalizing recency when the prompt directs students to older landmark studies is inconsistent.",
      aiSuggestedScore: 25,
      aiSupportingEvidence: [
        "Mueller and Oppenheimer's (2014) landmark study demonstrated that longhand note-takers outperformed laptop users on conceptual recall",
        "Urry et al. (2021) conducted a large-scale replication (n = 1,162 across multiple sites) and found substantially weaker effects",
        "Active learning interventions — including think-pair-share, real-time polling, and structured problem-solving — have been shown to reduce off-task laptop behavior by 60-70% (Fried, 2008).",
      ],
      highlightedTexts: [
        "Mueller and Oppenheimer's (2014) landmark study demonstrated that longhand note-takers outperformed laptop users on conceptual recall",
        "Active learning interventions — including think-pair-share, real-time polling, and structured problem-solving — have been shown to reduce off-task laptop behavior by 60-70% (Fried, 2008).",
      ],
      validationStatus: "partially_supported",
      validationResult: {
        status: "partially_supported",
        reasoning: "The positive assessment of evidence integration is well-supported. However, the deduction for 'no sources after 2021' is questionable — the assignment prompt itself directs students to use landmark studies from 2013–2014, making a recency penalty inconsistent with the task design.",
        suggestedRefinement: "Reconsider whether the recency deduction is appropriate given the assignment prompt explicitly references older studies. If you want to maintain the deduction, cite the specific area where more current research would strengthen the argument.",
        keyQuotes: [
          "Mueller and Oppenheimer study tested immediate and delayed recall under controlled conditions — a far cry from the complex, multi-week learning",
          "Urry et al. (2021) conducted a large-scale replication (n = 1,162 across multiple sites) and found substantially weaker effects",
          "Active learning interventions — including think-pair-share, real-time polling, and structured problem-solving — have been shown to reduce off-task laptop behavior by 60-70%",
        ],
      },
    },
    {
      criterionId: "critical-analysis",
      score: 25,
      explanation: "Exceptional depth. Distinguishes lab vs. real-world findings, applies UDL framework to the exemption problem, and reframes the core issue as pedagogical rather than technological. No marks deducted — this represents the highest standard of undergraduate critical analysis.",
      validated: false,
      aiSuggestion: "Perfect score is well-deserved. The student synthesizes across three distinct analytical frameworks (cognitive science, UDL, and active learning pedagogy) — this cross-framework synthesis is rare at the undergraduate level and fully justifies 25/25.",
      aiSuggestedScore: 25,
      aiSupportingEvidence: [
        "The Mueller and Oppenheimer study tested immediate and delayed recall under controlled conditions — a far cry from the complex, multi-week learning that characterizes actual university courses.",
        "A laptop ban with disability exemptions inverts this principle: it creates a restrictive default and forces students to self-identify as \"different\" to receive accommodation.",
        "If students are multitasking during lectures, the root cause may be lecture design rather than device availability.",
      ],
      highlightedTexts: [
        "The Mueller and Oppenheimer study tested immediate and delayed recall under controlled conditions — a far cry from the complex, multi-week learning that characterizes actual university courses.",
        "A laptop ban with disability exemptions inverts this principle: it creates a restrictive default and forces students to self-identify as \"different\" to receive accommodation. This is both pedagogically and ethically problematic.",
        "If students are multitasking during lectures, the root cause may be lecture design rather than device availability.",
      ],
      validationStatus: "fully_supported",
      validationResult: {
        status: "fully_supported",
        reasoning: "All three analytical moves described in the justification are directly evidenced: lab/real-world distinction, UDL framework application, and the pedagogical reframing. The highlighted passages demonstrate exceptional critical depth.",
        suggestedRefinement: "This is a strong justification. You might add that the student's ability to synthesize across frameworks (cognitive science + UDL + active learning) is what makes this a 25/25.",
        keyQuotes: [
          "a far cry from the complex, multi-week learning that characterizes actual university courses",
          "forces students to self-identify as \"different\" to receive accommodation",
          "the root cause may be lecture design rather than device availability",
        ],
      },
    },
    {
      criterionId: "writing-quality",
      score: 24,
      explanation: "Excellent academic prose with sophisticated paragraph transitions. Deducted 1 mark: the essay uses the word 'rather' four times, which slightly weakens the stylistic variety and suggests over-reliance on a single rhetorical transition.",
      validated: false,
      aiSuggestion: "The 1-mark deduction for repeating the word 'rather' is nitpicky but technically observable. However, the repetition serves a deliberate rhetorical function — creating parallel reframing structures — which could be seen as a stylistic choice rather than a flaw.",
      aiSuggestedScore: 25,
      aiSupportingEvidence: [
        "The laptop debate in higher education represents a microcosm of a broader tension in pedagogy: the conflict between technological affordance and cognitive science.",
        "Rather than treating laptops as the disease, universities should treat disengagement as the symptom and active pedagogy as the cure.",
        "A ban is a blunt instrument applied to a nuanced problem; redesigned instruction is a scalpel.",
      ],
      highlightedTexts: [
        "The laptop debate in higher education represents a microcosm of a broader tension in pedagogy: the conflict between technological affordance and cognitive science.",
      ],
      validationStatus: "partially_supported",
      validationResult: {
        status: "partially_supported",
        reasoning: "The justification praises the overall structure and transitions, but the highlighted evidence is only the opening sentence. The deduction for 'rather' repetition is observable but arguably a deliberate rhetorical device. The main issue is that the single highlighted excerpt cannot support broad claims about transitions and counterargument structures across paragraphs.",
        suggestedRefinement: "Expand the highlighted evidence to include transitions between paragraphs (e.g., 'These findings are significant but require careful contextualization') to better support the assessment of writing quality across the full essay.",
        keyQuotes: [
          "The laptop debate in higher education represents a microcosm of a broader tension in pedagogy",
          "A ban is a blunt instrument applied to a nuanced problem; redesigned instruction is a scalpel.",
          "This distinction between a clean laboratory finding and a messy real-world effect is precisely the kind of analytical nuance that should inform policy.",
        ],
      },
    },
  ],
};
