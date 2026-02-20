const fmtDate = (daysOffset: number) => {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const assignments = [
  {
    id: "bus302-ca1",
    title: "Case Analysis 1: Strategic Pivot",
    course: "BUS302 — Strategic Management",
    get assignedDate() { return fmtDate(-7); },
    get dueDate() { return fmtDate(7); },
    totalSubmissions: 48,
    gradedCount: 0,
    sections: ["Section A (Prof. Sharma)", "Section B (TA: M. Chen)", "Section C (TA: R. Patel)"],
    rubricCriteria: 4,
    description: "Analyze Netflix's strategic pivot from DVD-by-mail to streaming. Evaluate whether the transition was a proactive strategic choice or a reactive response to technological disruption. Consider the role of the subscription-based pricing model in enabling the pivot.",
  },
];

export const rubricCriteria = [
  {
    id: "arg-clarity",
    name: "Argument Clarity",
    description: "Strength and clarity of the central thesis and overall argument structure.",
    maxScore: 25,
  },
  {
    id: "evidence-use",
    name: "Evidence Use",
    description: "Quality, relevance, and integration of supporting evidence from case materials.",
    maxScore: 25,
  },
  {
    id: "critical-analysis",
    name: "Critical Analysis",
    description: "Depth of analytical reasoning, identification of assumptions, and alternative perspectives.",
    maxScore: 25,
  },
  {
    id: "writing-quality",
    name: "Writing Quality",
    description: "Clarity, coherence, grammar, and adherence to academic writing conventions.",
    maxScore: 25,
  },
];

const formatDate = (daysAgo: number, time: string) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return `${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} — ${time}`;
};

export const studentSubmissions = [
  {
    id: "STU001",
    name: "Student 001",
    submittedAt: formatDate(1, "11:42 PM"),
    section: "Section A",
    content: `The strategic pivot undertaken by Netflix in 2007 from DVD-by-mail to streaming represents one of the most consequential business model transformations in modern corporate history. This analysis examines whether the pivot was a calculated risk grounded in market intelligence or a reactive move forced by technological disruption.
...
In conclusion, Netflix's pivot was fundamentally a proactive strategic choice informed by technology adoption curves and consumer behavior trends, though its execution demonstrated that even well-conceived strategies require adaptive implementation. The subscription model served as both a competitive moat and a mechanism for funding the transition — a dual role that few business model elements achieve.`,
  },
  {
    id: "STU002",
    name: "Student 002",
    submittedAt: formatDate(0, "8:15 AM"),
    section: "Section B",
    content: `Netflix changed from DVDs to streaming around 2007. This was a big change for the company. They decided to start offering movies online instead of just mailing DVDs to people.
...
Overall, Netflix's pivot to streaming was successful because they saw the future of technology and adapted their business model accordingly. The subscription pricing was key to their success.`,
  },
  {
    id: "STU003",
    name: "Student 003",
    submittedAt: formatDate(0, "2:30 PM"),
    section: "Section C",
    content: `The Netflix case presents a compelling illustration of how platform economics and network effects can transform an incumbent's competitive position through deliberate business model innovation. This analysis argues that Netflix's 2007 pivot was not merely a technology adoption decision but a fundamental reimagining of value creation and capture in the entertainment industry.

Central to this argument is the distinction between sustaining and disruptive innovation as defined by Christensen (1997). Netflix's streaming pivot exhibits characteristics of both: it sustained the core value proposition of convenient home entertainment while disrupting the delivery mechanism and, critically, the economics of content distribution. The marginal cost of serving an additional streaming customer approached zero, fundamentally altering the company's cost structure and enabling the aggressive pricing that drove subscriber growth.

The subscription-based revenue model deserves particular attention. By maintaining flat-rate pricing, Netflix achieved three strategic objectives simultaneously: (1) reduced consumer decision fatigue, increasing engagement; (2) created a predictable cash flow that supported content investment; and (3) established high switching costs through accumulated viewing history and personalization algorithms.

A counterargument worth examining is whether Netflix's pivot was truly proactive or whether it was responding to the existential threat posed by digital distribution platforms. The timeline suggests elements of both — while Hastings had discussed streaming as early as 2000, the acceleration of investment coincided with Apple's launch of the iTunes video store and Amazon's entry into digital video.

This analysis concludes that Netflix's pivot represents a masterclass in strategic ambidexterity — the simultaneous exploitation of existing capabilities and exploration of new opportunities. The subscription model served as the connective tissue between old and new business models, enabling a transition that might otherwise have been fatally disruptive to the organization.`,
  },
];

export interface GradingScore {
  criterionId: string;
  score: number | null;
  explanation: string;
  validated: boolean;
  aiSuggestion?: string;
  overridden?: boolean;
}

export const sampleGradedData: Record<string, GradingScore[]> = {
  STU001: [
    {
      criterionId: "arg-clarity",
      score: 22,
      explanation: "Strong thesis identifying Netflix pivot as proactive. Clear structure, though the conclusion could be more decisive.",
      validated: true,
      aiSuggestion: "Consider acknowledging the student's nuanced conclusion that 'even well-conceived strategies require adaptive implementation' as evidence of sophisticated argumentation, which may warrant a higher score.",
    },
    {
      criterionId: "evidence-use",
      score: 23,
      explanation: "Excellent use of specific data points (broadband penetration, stock price decline). Evidence is well-integrated into the argument.",
      validated: true,
    },
    {
      criterionId: "critical-analysis",
      score: 21,
      explanation: "Good analysis of the Qwikster misstep as a counterpoint, but could go deeper on competitive dynamics.",
      validated: false,
    },
    {
      criterionId: "writing-quality",
      score: 24,
      explanation: "Excellent academic prose, well-structured paragraphs, minimal errors.",
      validated: true,
    },
  ],
  STU002: [
    {
      criterionId: "arg-clarity",
      score: 15,
      explanation: "Thesis is present but generic. Lacks analytical depth.",
      validated: true,
    },
    {
      criterionId: "evidence-use",
      score: 12,
      explanation: "Very limited evidence. No specific data or sources cited.",
      validated: true,
    },
    {
      criterionId: "critical-analysis",
      score: 10,
      explanation: "Mostly descriptive with minimal analysis. No alternative perspectives explored.",
      validated: true,
    },
    {
      criterionId: "writing-quality",
      score: 16,
      explanation: "Readable but simplistic. Short, underdeveloped paragraphs.",
      validated: true,
    },
  ],
  STU003: [
    {
      criterionId: "arg-clarity",
      score: 24,
      explanation: "Sophisticated thesis with clear framing through established theory.",
      validated: true,
    },
    {
      criterionId: "evidence-use",
      score: 23,
      explanation: "Strong theoretical grounding. Could benefit from more empirical data.",
      validated: true,
    },
    {
      criterionId: "critical-analysis",
      score: 25,
      explanation: "Exceptional depth. Engages with counterarguments and synthesizes multiple frameworks.",
      validated: true,
    },
    {
      criterionId: "writing-quality",
      score: 24,
      explanation: "Excellent academic writing. Sophisticated vocabulary and structure.",
      validated: true,
    },
  ],
};
