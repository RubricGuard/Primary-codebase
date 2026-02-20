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
  },
  {
    id: "evidence-use",
    name: "Evidence Use",
    description: "Quality, relevance, and integration of supporting evidence from credible sources.",
    maxScore: 25,
  },
  {
    id: "critical-analysis",
    name: "Critical Analysis",
    description: "Depth of analytical reasoning, identification of assumptions, and engagement with counterarguments.",
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
  overridden?: boolean;
  highlightedTexts?: string[];
  validationStatus?: ValidationStatus;
  validationLoading?: boolean;
  validationResult?: ValidationResult;
}

export const sampleGradedData: Record<string, GradingScore[]> = {
  STU001: [
    {
      criterionId: "arg-clarity",
      score: 22,
      explanation: "Clear thesis advocating a structured middle ground. Well-signposted argument that moves logically from evidence against laptops to accessibility concerns to a proposed solution.",
      validated: false,
      aiSuggestion: "The student's thesis is nuanced ('carefully structured policy rather than an outright ban') — this sophistication may warrant a higher score than a simple pro/con thesis would.",
      highlightedTexts: [
        "Universities should implement a carefully structured laptop policy rather than an outright ban.",
        "The most effective approach is a structured middle ground: designated \"laptop-free\" zones or sessions within a course, combined with explicit instruction on effective digital note-taking strategies.",
      ],
      validationStatus: "fully_supported",
      validationResult: {
        status: "fully_supported",
        reasoning: "The justification accurately identifies the nuanced thesis and logical structure. The highlighted evidence clearly shows a well-signposted argument moving from problem identification to proposed solution.",
        suggestedRefinement: "Consider noting how the student's thesis evolves throughout the essay — the opening claim is refined by the conclusion into a more specific policy recommendation.",
        keyQuotes: [
          "carefully structured laptop policy rather than an outright ban",
          "a structured middle ground: designated \"laptop-free\" zones",
          "preserves student choice, maintains accessibility, and addresses the distraction problem",
        ],
      },
    },
    {
      criterionId: "evidence-use",
      score: 23,
      explanation: "Cites Mueller & Oppenheimer, Sana et al., Waterfield & West, and the Urry meta-analysis. Evidence is well-integrated into the argument rather than just listed.",
      validated: false,
      highlightedTexts: [
        "Mueller and Oppenheimer (2014) demonstrated that students who took notes by hand scored significantly higher on conceptual questions than those who typed",
        "Sana, Weston, and Cepeda (2013) found that not only did laptop multitaskers perform 11% worse on comprehension tests, but students sitting within view of a multitasking peer scored 17% lower",
        "A 2020 meta-analysis by Urry et al. found that the Mueller and Oppenheimer effect was smaller and less consistent when replicated at scale.",
      ],
      validationStatus: "fully_supported",
      validationResult: {
        status: "fully_supported",
        reasoning: "The justification is well-supported — all four cited sources appear in the highlighted evidence with specific data points (11%, 17%). The student integrates rather than just lists sources.",
        suggestedRefinement: "You could also note that Waterfield & West (2006) is used for a different purpose (accessibility) than the cognitive science sources, showing versatile evidence deployment.",
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
      explanation: "Engages with counterarguments (accessibility, contested research) but could push deeper on the equity implications of alternative policies.",
      validated: false,
      highlightedTexts: [
        "Yet a blanket ban is problematic for several reasons. First, it raises serious accessibility concerns.",
        "The authors cautioned against using a single study to justify sweeping policy changes — a point that underscores the importance of evidence-based, rather than evidence-inspired, decision-making.",
      ],
      validationStatus: "partially_supported",
      validationResult: {
        status: "partially_supported",
        reasoning: "The justification correctly identifies engagement with counterarguments, but the claim that the student 'could push deeper on equity implications' is not fully demonstrated by the highlighted evidence alone. The student does address equity through Waterfield & West but this wasn't highlighted.",
        suggestedRefinement: "Highlight the Waterfield & West passage about disability disclosure and stigma to better support the equity dimension of your justification.",
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
      explanation: "Strong academic prose with effective transitions. The 'second-hand smoke' metaphor is vivid. Minor point: conclusion could be more concise.",
      validated: false,
      highlightedTexts: [
        "This \"second-hand smoke\" effect means that one student's laptop use imposes a negative externality on the learning environment",
        "the question is not whether laptops can hinder learning — the evidence suggests they can — but whether a university-wide ban is the appropriate response.",
      ],
      validationStatus: "fully_supported",
      validationResult: {
        status: "fully_supported",
        reasoning: "The highlighted passages confirm strong rhetorical devices ('second-hand smoke' metaphor) and effective academic framing. The conclusion excerpt supports the 'could be more concise' observation as it's somewhat lengthy.",
        suggestedRefinement: "Consider noting the effective use of em-dashes for parenthetical asides throughout the essay as an additional marker of writing sophistication.",
        keyQuotes: [
          "This \"second-hand smoke\" effect means that one student's laptop use",
          "the question is not whether laptops can hinder learning",
          "a nuanced policy is both more ethical and more effective than prohibition",
        ],
      },
    },
  ],
  STU002: [
    {
      criterionId: "arg-clarity",
      score: 14,
      explanation: "Takes a clear position but thesis is simplistic. No nuance or qualification — reads as opinion rather than academic argument.",
      validated: false,
      highlightedTexts: [
        "I think universities should ban laptops in lectures because they are very distracting.",
      ],
      validationStatus: "fully_supported",
      validationResult: {
        status: "fully_supported",
        reasoning: "The highlighted opening sentence clearly demonstrates the simplistic, opinion-based thesis the justification describes. The 'I think' framing and single-reason structure ('because they are very distracting') confirm the lack of academic argumentation.",
        suggestedRefinement: "You might also note that the conclusion merely restates the opening without development, further evidencing a lack of argumentative progression.",
        keyQuotes: [
          "I think universities should ban laptops in lectures because they are very distracting",
          "In conclusion laptops should be banned from lectures",
        ],
      },
    },
    {
      criterionId: "evidence-use",
      score: 10,
      explanation: "Vaguely references 'studies' without citing any specific sources. No author names, dates, or data points. The cheating claim is entirely unsupported.",
      validated: false,
      highlightedTexts: [
        "Studies have shown that laptops are bad for learning.",
        "Laptops also make it too easy to cheat. Students can look up answers during class or share notes with people who didn't come to lecture.",
      ],
      validationStatus: "fully_supported",
      validationResult: {
        status: "fully_supported",
        reasoning: "The highlighted evidence perfectly supports the justification — 'Studies have shown' is the quintessential vague citation, and the cheating paragraph offers zero empirical backing. The justification accurately identifies both weaknesses.",
        suggestedRefinement: "Consider noting that the student makes quantitative-sounding claims ('don't do as well') without any actual data, which is a distinct problem from merely omitting citations.",
        keyQuotes: [
          "Studies have shown that laptops are bad for learning",
          "Laptops also make it too easy to cheat",
          "This is unfair and undermines the learning process",
        ],
      },
    },
    {
      criterionId: "critical-analysis",
      score: 8,
      explanation: "Dismisses the accessibility counterargument ('they can just get special permission') without engaging with the underlying equity concerns. No alternative perspectives explored.",
      validated: false,
      highlightedTexts: [
        "Some people say laptops should be allowed for students with disabilities but I think those students can just get special permission from the professor. The rest of the class shouldn't have to deal with distractions just because a few students need laptops.",
      ],
      validationStatus: "fully_supported",
      validationResult: {
        status: "fully_supported",
        reasoning: "The highlighted passage directly demonstrates the dismissive treatment of accessibility concerns. The phrase 'just get special permission' and framing of disabled students as an inconvenience ('just because a few students') confirms the lack of genuine engagement with equity issues.",
        suggestedRefinement: "You could strengthen this by noting the problematic 'us vs. them' framing — 'the rest of the class shouldn't have to deal with' — which reveals a failure to consider inclusive design principles.",
        keyQuotes: [
          "those students can just get special permission from the professor",
          "The rest of the class shouldn't have to deal with distractions just because a few students need laptops",
        ],
      },
    },
    {
      criterionId: "writing-quality",
      score: 15,
      explanation: "Readable but informal. Uses 'I think' framing, lacks paragraph cohesion, and contains run-on sentences. Missing commas in compound sentences.",
      validated: false,
      highlightedTexts: [
        "I think universities should ban laptops in lectures because they are very distracting. When students have laptops open they just go on social media and don't pay attention to the professor.",
        "In conclusion laptops should be banned from lectures because they hurt learning, distract others, and make cheating easier. Universities need to take action to protect the quality of education.",
      ],
      validationStatus: "partially_supported",
      validationResult: {
        status: "partially_supported",
        reasoning: "The highlighted text supports the 'I think' framing and informal tone observations. However, the claim about run-on sentences and missing commas isn't strongly evidenced by these specific excerpts — the second excerpt is actually grammatically acceptable.",
        suggestedRefinement: "Highlight a passage with clearer grammatical errors, such as 'When students have laptops open they just go on social media' (missing comma after 'open') to better support the punctuation claim.",
        keyQuotes: [
          "I think universities should ban laptops in lectures",
          "When students have laptops open they just go on social media",
          "In conclusion laptops should be banned from lectures",
        ],
      },
    },
  ],
  STU003: [
    {
      criterionId: "arg-clarity",
      score: 24,
      explanation: "Sophisticated thesis reframing the debate from 'should we ban?' to 'should we redesign pedagogy?' — this elevates the argument beyond a simple pro/con structure.",
      validated: false,
      highlightedTexts: [
        "This essay contends that universities should not ban laptops, but should instead redesign lecture pedagogy to render the distraction problem irrelevant.",
        "Rather than treating laptops as the disease, universities should treat disengagement as the symptom and active pedagogy as the cure.",
      ],
      validationStatus: "fully_supported",
      validationResult: {
        status: "fully_supported",
        reasoning: "The highlighted passages perfectly demonstrate the reframing thesis. The opening contention and closing metaphor (disease/symptom/cure) show how the student elevates the debate beyond a binary ban/no-ban discussion.",
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
      explanation: "Integrates Mueller & Oppenheimer, Sana et al., Urry et al. replication, Rose & Meyer (UDL), and Fried's active learning research. Each source is critically contextualized.",
      validated: false,
      highlightedTexts: [
        "Mueller and Oppenheimer's (2014) landmark study demonstrated that longhand note-takers outperformed laptop users on conceptual recall",
        "Urry et al. (2021) conducted a large-scale replication (n = 1,162 across multiple sites) and found substantially weaker effects",
        "Universal Design for Learning (UDL) principles hold that learning environments should be proactively designed to accommodate diverse needs rather than retrofitted with individual exemptions (Rose & Meyer, 2002).",
      ],
      validationStatus: "fully_supported",
      validationResult: {
        status: "fully_supported",
        reasoning: "The highlighted evidence confirms citation of Mueller & Oppenheimer, Urry et al., and Rose & Meyer with specific details (sample sizes, dates, frameworks). The sources are integrated into analytical claims rather than merely cited.",
        suggestedRefinement: "Consider highlighting the Fried (2008) reference as well — the student uses it to propose a concrete solution (active learning reducing off-task behavior by 60-70%), which is a distinctive use of evidence.",
        keyQuotes: [
          "Mueller and Oppenheimer's (2014) landmark study",
          "Urry et al. (2021) conducted a large-scale replication (n = 1,162",
          "Active learning interventions — including think-pair-share, real-time polling",
        ],
      },
    },
    {
      criterionId: "critical-analysis",
      score: 25,
      explanation: "Exceptional depth. Distinguishes lab vs. real-world findings, applies UDL framework to the exemption problem, and reframes the core issue as pedagogical rather than technological.",
      validated: false,
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
      explanation: "Excellent academic writing. The 'blunt instrument vs. scalpel' closing metaphor is memorable. Dense but clear prose with precise vocabulary.",
      validated: false,
      highlightedTexts: [
        "The laptop debate in higher education represents a microcosm of a broader tension in pedagogy: the conflict between technological affordance and cognitive science.",
        "A ban is a blunt instrument applied to a nuanced problem; redesigned instruction is a scalpel.",
      ],
      validationStatus: "fully_supported",
      validationResult: {
        status: "fully_supported",
        reasoning: "The highlighted passages confirm excellent academic prose — the opening sentence is densely packed yet clear, and the closing metaphor (blunt instrument/scalpel) is indeed memorable and effective. The justification accurately characterizes the writing quality.",
        suggestedRefinement: "Consider noting the effective use of semicolons and em-dashes throughout, which demonstrates command of advanced punctuation for rhetorical effect.",
        keyQuotes: [
          "a microcosm of a broader tension in pedagogy",
          "A ban is a blunt instrument applied to a nuanced problem; redesigned instruction is a scalpel",
          "This analysis does not dismiss the distraction evidence — it reframes it",
        ],
      },
    },
  ],
};
