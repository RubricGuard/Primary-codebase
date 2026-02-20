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
    section: "Section A",
    content: "I think universities should ban laptops in lectures because they are very distracting. When students have laptops open they just go on social media and don't pay attention to the professor.\n\nStudies have shown that laptops are bad for learning. Students who use laptops don't do as well as students who write by hand. This makes sense because when you type you don't really think about what you're writing, you just type everything the professor says.\n\nAnother problem is that laptops distract other students too. If someone next to you is watching YouTube or shopping online it's hard to focus on the lecture. This isn't fair to students who are trying to learn.\n\nSome people say laptops should be allowed for students with disabilities but I think those students can just get special permission from the professor. The rest of the class shouldn't have to deal with distractions just because a few students need laptops.\n\nLaptops also make it too easy to cheat. Students can look up answers during class or share notes with people who didn't come to lecture. This is unfair and undermines the learning process.\n\nIn conclusion laptops should be banned from lectures because they hurt learning, distract others, and make cheating easier. Universities need to take action to protect the quality of education.",
  },
  {
    id: "STU003",
    name: "Student 003",
    submittedAt: formatDate(0, "2:30 PM"),
    section: "Section A",
    content: "The laptop debate in higher education represents a microcosm of a broader tension in pedagogy: the conflict between technological affordance and cognitive science. This essay contends that universities should not ban laptops, but should instead redesign lecture pedagogy to render the distraction problem irrelevant.\n\nThe empirical case against laptops centers on two findings. First, Mueller and Oppenheimer's (2014) landmark study demonstrated that longhand note-takers outperformed laptop users on conceptual recall, attributing this to the generative processing required by handwriting. Second, Sana et al. (2013) documented a striking externality: students in direct view of a multitasking peer scored 17% lower on comprehension assessments, suggesting that laptop distraction is not merely a private cost but a public one.\n\nThese findings are significant but require careful contextualization. The Mueller and Oppenheimer study tested immediate and delayed recall under controlled conditions — a far cry from the complex, multi-week learning that characterizes actual university courses. Moreover, Urry et al. (2021) conducted a large-scale replication (n = 1,162 across multiple sites) and found substantially weaker effects, concluding that \"the evidence for a laptop penalty is less robust than commonly assumed.\" This distinction between a clean laboratory finding and a messy real-world effect is precisely the kind of analytical nuance that should inform policy.\n\nThe accessibility dimension further complicates the ban argument. Universal Design for Learning (UDL) principles hold that learning environments should be proactively designed to accommodate diverse needs rather than retrofitted with individual exemptions (Rose & Meyer, 2002). A laptop ban with disability exemptions inverts this principle: it creates a restrictive default and forces students to self-identify as \"different\" to receive accommodation. This is both pedagogically and ethically problematic.\n\nPerhaps most importantly, the ban debate misdiagnoses the problem. If students are multitasking during lectures, the root cause may be lecture design rather than device availability. Active learning interventions — including think-pair-share, real-time polling, and structured problem-solving — have been shown to reduce off-task laptop behavior by 60-70% (Fried, 2008). In other words, the most effective \"laptop policy\" may be no laptop policy at all, but rather a commitment to pedagogical practices that demand engagement.\n\nThis analysis does not dismiss the distraction evidence — it reframes it. Rather than treating laptops as the disease, universities should treat disengagement as the symptom and active pedagogy as the cure. A ban is a blunt instrument applied to a nuanced problem; redesigned instruction is a scalpel.",
  },
  {
    id: "STU004",
    name: "Student 004",
    submittedAt: formatDate(0, "4:50 PM"),
    section: "Section A",
    content: "The question of whether universities should ban laptops from lecture halls is not simply a matter of technology policy — it is a question about what kind of learning environment we want to create. After reviewing the available evidence, I argue that universities should adopt a partial restriction model rather than an outright ban, balancing the legitimate concerns about distraction with the practical needs of modern students.\n\nMueller and Oppenheimer (2014) provide the most frequently cited evidence against laptop use. Their study found that students who took longhand notes outperformed laptop note-takers on conceptual questions, even though the latter recorded more words. The key mechanism was what the researchers called 'generative processing' — the act of summarizing and paraphrasing while writing by hand forces deeper engagement with the material. This is a compelling finding that cannot be dismissed.\n\nThe distraction externality is equally concerning. Sana, Weston, and Cepeda (2013) demonstrated that students seated near a multitasking laptop user scored 17% lower on comprehension assessments. This 'second-hand distraction' effect transforms laptop use from a personal choice into a collective problem, much like secondhand smoke in public health policy.\n\nHowever, the case for a complete ban falters when we consider accessibility. Students with learning disabilities, visual impairments, or motor difficulties often depend on assistive technology that runs on laptops. Forcing these students to seek individual exemptions creates an othering effect that contradicts principles of inclusive education. As Waterfield and West (2006) argue, the burden of accommodation should fall on institutions, not on individual students who must prove their need.\n\nFurthermore, the research base is less conclusive than it initially appears. The large-scale replication by Urry et al. (2021) found substantially weaker effects than Mueller and Oppenheimer reported, with the authors noting significant heterogeneity across study sites. This suggests that context — including instructor style, course content, and student population — may matter more than the device itself.\n\nA partial restriction model — designating certain lectures or sections as laptop-free while allowing devices in others — offers a pragmatic compromise. This approach respects student autonomy, maintains accessibility, and creates natural comparison conditions that can inform future policy decisions.\n\nIn conclusion, the evidence supports caution about unrestricted laptop use but does not justify a blanket ban. A flexible, evidence-informed approach is both more practical and more equitable.",
  },
  {
    id: "STU005",
    name: "Student 005",
    submittedAt: formatDate(0, "9:20 PM"),
    section: "Section A",
    content: "Laptop bans in universities have become increasingly popular, but this essay argues that such bans are misguided and counterproductive. While research by Mueller and Oppenheimer (2014) suggests that handwriting notes leads to better conceptual understanding, the practical implications of banning laptops outweigh the cognitive benefits of pen-and-paper note-taking.\n\nThe distraction argument is the strongest case for banning laptops. Sana et al. (2013) found that laptop multitasking reduces not only the user's comprehension but also that of nearby students. This externality effect is real and significant — a 17% reduction in comprehension for bystanders is hard to ignore. However, the solution to distraction is not prohibition but pedagogy. When lectures are engaging and interactive, students are less likely to drift to social media.\n\nFrom an accessibility standpoint, laptop bans create serious equity issues. Many students rely on digital tools for note-taking, especially those with disabilities who use screen readers, speech-to-text software, or specialized input devices. Creating an exemption system forces students to disclose private medical information and marks them as different from their peers, which is fundamentally at odds with inclusive education principles.\n\nThe evidence base for banning laptops is also less robust than commonly believed. Urry et al. (2021) attempted to replicate Mueller and Oppenheimer's findings across multiple universities and found much weaker effects. They concluded that the original study's results may not generalize to diverse classroom settings. Additionally, Fried (2008) found that active learning techniques reduced off-task laptop behavior by over 60%, suggesting that the problem lies in passive lecture formats rather than devices themselves.\n\nRather than banning laptops, universities should invest in training faculty to use active learning strategies, provide guidelines for productive laptop use, and create classroom cultures that promote engagement. The goal should be to make laptops irrelevant as distraction devices by making lectures impossible to ignore.\n\nIn summary, while the distraction concerns are valid, a laptop ban is a blunt tool that creates more problems than it solves. The answer lies in better teaching, not fewer tools.",
  },
  {
    id: "STU006",
    name: "Student 006",
    submittedAt: formatDate(0, "10:05 AM"),
    section: "Section B",
    content: "Laptop bans are a well-intentioned but ultimately flawed response to a real problem. The evidence from Mueller and Oppenheimer (2014) and Sana et al. (2013) is compelling, but a blanket ban ignores the diverse needs of modern students and the evolving nature of pedagogy.",
  },
  {
    id: "STU007",
    name: "Student 007",
    submittedAt: formatDate(0, "11:30 AM"),
    section: "Section B",
    content: "Universities should absolutely ban laptops in lecture halls. The evidence is clear: laptops hurt learning. Mueller and Oppenheimer proved this in 2014, and Sana et al. showed that laptops distract everyone around the user too. There is no good reason to allow them.",
  },
  {
    id: "STU008",
    name: "Student 008",
    submittedAt: formatDate(0, "1:15 PM"),
    section: "Section B",
    content: "The laptop ban debate requires nuance. While cognitive science research demonstrates clear downsides to laptop note-taking (Mueller & Oppenheimer, 2014), the accessibility implications of a blanket ban are significant. A tiered approach — combining laptop-free sessions with digital alternatives — offers the best compromise.",
  },
  {
    id: "STU009",
    name: "Student 009",
    submittedAt: formatDate(0, "3:45 PM"),
    section: "Section B",
    content: "I believe laptops should not be banned because students need them for accessibility reasons. Some students have disabilities and need special software. Also, many students prefer typing because it is faster. The research on handwriting is interesting but not enough to justify taking away students' tools.",
  },
  {
    id: "STU010",
    name: "Student 010",
    submittedAt: formatDate(0, "5:00 PM"),
    section: "Section B",
    content: "The intersection of cognitive science and educational policy makes the laptop ban debate particularly fascinating. Drawing on Mueller and Oppenheimer (2014), Sana et al. (2013), and Rose & Meyer's (2002) Universal Design for Learning framework, this essay argues that the solution lies not in prohibition but in pedagogical innovation that renders the distraction problem moot.",
  },
  {
    id: "STU011",
    name: "Student 011",
    submittedAt: formatDate(0, "6:20 PM"),
    section: "Section C",
    content: "Laptops in lectures are a double-edged sword. On one hand, they enable efficient note-taking and accessibility. On the other, research consistently shows they reduce comprehension for both users and bystanders. Universities should adopt a flexible policy that accounts for course type and student needs rather than imposing a one-size-fits-all ban.",
  },
  {
    id: "STU012",
    name: "Student 012",
    submittedAt: formatDate(0, "7:10 PM"),
    section: "Section C",
    content: "This essay examines the laptop ban debate through the lens of institutional responsibility. Universities have a duty to create optimal learning environments, but they also must respect student autonomy and accommodate diverse learning needs. The tension between these obligations demands a policy response more sophisticated than a simple ban.",
  },
  {
    id: "STU013",
    name: "Student 013",
    submittedAt: formatDate(0, "8:30 PM"),
    section: "Section C",
    content: "Banning laptops would be unfair to students. Many people learn better with technology and taking away laptops is old-fashioned. Professors should focus on making their lectures more interesting instead of blaming students for being distracted.",
  },
  {
    id: "STU014",
    name: "Student 014",
    submittedAt: formatDate(0, "9:00 PM"),
    section: "Section C",
    content: "The empirical evidence on laptop use in lectures presents a clear picture: unrestricted laptop use harms both individual and collective learning outcomes. Mueller and Oppenheimer (2014) demonstrated the cognitive superiority of handwriting, while Sana et al. (2013) quantified the externality cost at 17% reduced comprehension for bystanders. However, Urry et al. (2021) complicate this narrative with their large-scale replication failure, and accessibility advocates rightly point out that bans disproportionately burden students with disabilities.",
  },
  {
    id: "STU015",
    name: "Student 015",
    submittedAt: formatDate(0, "10:15 PM"),
    section: "Section C",
    content: "Universities face a genuine dilemma with laptop policies. The research evidence against unrestricted laptop use is real but contested, the accessibility implications are significant, and student autonomy matters. This essay argues for a research-informed middle path: structured laptop-free periods within courses, combined with training in effective digital note-taking, creating an environment that respects both cognitive science and student diversity.",
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
      score: 19,
      explanation: "Cites Mueller & Oppenheimer, Sana et al., Waterfield & West, and the Urry meta-analysis. Evidence is well-integrated. Deducted 6 marks: the student fails to include any primary data or original analysis, relying entirely on secondary sources without critically evaluating their methodologies.",
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
      validationStatus: "fully_supported",
      validationResult: {
        status: "fully_supported",
        reasoning: "The positive assessment of evidence integration is well-supported by the highlighted text. The 7-mark deduction for 'no primary data' applies a standard beyond the rubric's scope — the criterion evaluates 'quality, relevance, and integration of supporting evidence from credible sources,' not original research contribution. However, the grader's praise for source quality and integration is accurate.",
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
      validationStatus: "fully_supported",
      validationResult: {
        status: "fully_supported",
        reasoning: "The highlighted text clearly supports the 'I think' framing and informal tone observations. The missing comma observation is valid (e.g., 'When students have laptops open they just go on social media'). While the 'run-on sentences' claim is slightly overstated, the overall assessment of informality and weak academic register is well-evidenced.",
        suggestedRefinement: "Distinguish between 'informal tone' (well-supported) and 'run-on sentences' (less well-evidenced) to strengthen the precision of your justification.",
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
      validationStatus: "fully_supported",
      validationResult: {
        status: "fully_supported",
        reasoning: "The positive assessment of evidence integration is well-supported by the highlighted passages showing specific citations with publication years. While the 'no sources after 2021' deduction is questionable given the assignment prompt references older landmark studies, the grader's overall evaluation of source quality is accurate.",
        suggestedRefinement: "Reconsider whether the recency deduction is appropriate given the assignment prompt explicitly references older studies.",
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
      explanation: "Exceptional depth and nuanced reasoning. Distinguishes lab vs. real-world findings, applies UDL framework to the exemption problem, and reframes the core issue as pedagogical rather than technological. No marks deducted — this represents the highest standard of undergraduate critical analysis.",
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
      validationStatus: "fully_supported",
      validationResult: {
        status: "fully_supported",
        reasoning: "The justification accurately identifies sophisticated academic prose and effective transitions. The 'rather' repetition deduction is observable in the text. The highlighted evidence, combined with the AI-identified key quotes, provides sufficient support for the overall quality assessment.",
        suggestedRefinement: "Consider noting the effective use of em-dashes and the 'scalpel' metaphor as additional evidence of writing sophistication.",
        keyQuotes: [
          "The laptop debate in higher education represents a microcosm of a broader tension in pedagogy",
          "A ban is a blunt instrument applied to a nuanced problem; redesigned instruction is a scalpel.",
          "This distinction between a clean laboratory finding and a messy real-world effect is precisely the kind of analytical nuance that should inform policy.",
        ],
      },
    },
  ],

  // ── STU004: Solid grader, good scores, well-justified — creates fairness alert with STU001 on evidence-use (shared citations, different scores) ──
  STU004: [
    {
      criterionId: "arg-clarity",
      score: 21,
      explanation: "Well-structured argument advocating a partial restriction model. Clear thesis statement in the opening paragraph. Deducted 4 marks: the thesis relies on 'after reviewing the available evidence' which is a weak rhetorical frame, and the essay could more explicitly preview the accessibility argument earlier.",
      validated: false,
      aiSuggestion: "The 4-mark deduction is slightly steep. While 'after reviewing the available evidence' is somewhat formulaic, the thesis itself is clear and debatable. The preview concern is valid but minor. A score of 22–23 would better reflect the quality.",
      aiSuggestedScore: 22,
      aiSupportingEvidence: [
        "I argue that universities should adopt a partial restriction model rather than an outright ban, balancing the legitimate concerns about distraction with the practical needs of modern students.",
        "A partial restriction model — designating certain lectures or sections as laptop-free while allowing devices in others — offers a pragmatic compromise.",
      ],
      highlightedTexts: [
        "I argue that universities should adopt a partial restriction model rather than an outright ban, balancing the legitimate concerns about distraction with the practical needs of modern students.",
        "A partial restriction model — designating certain lectures or sections as laptop-free while allowing devices in others — offers a pragmatic compromise.",
      ],
      validationStatus: "fully_supported",
      validationResult: {
        status: "fully_supported",
        reasoning: "The highlighted passages confirm a clear, debatable thesis with a specific policy proposal. The deduction for the 'after reviewing' frame is defensible though slightly harsh. The overall argument structure is well-evidenced.",
        suggestedRefinement: "The thesis progressively narrows from principle to policy, similar to STU001. Consider whether this developmental structure deserves credit rather than penalization.",
        keyQuotes: [
          "universities should adopt a partial restriction model rather than an outright ban",
          "A partial restriction model — designating certain lectures or sections as laptop-free",
          "This approach respects student autonomy, maintains accessibility, and creates natural comparison conditions",
        ],
      },
    },
    {
      criterionId: "evidence-use",
      score: 23,
      explanation: "Excellent, well-integrated use of credible sources including Mueller & Oppenheimer (2014), Sana et al. (2013), Waterfield & West (2006), and Urry et al. (2021). Each source is contextualized and critically evaluated. Deducted 2 marks: could have included one additional source on active learning interventions to strengthen the alternative proposal.",
      validated: false,
      aiSuggestion: "The 2-mark deduction is reasonable. Four well-integrated sources exceed the assignment minimum of 3, and the critical evaluation of each source (especially Urry's replication findings) is a strength. The active learning gap is a fair observation.",
      aiSuggestedScore: 23,
      aiSupportingEvidence: [
        "Mueller and Oppenheimer (2014) provide the most frequently cited evidence against laptop use.",
        "Sana, Weston, and Cepeda (2013) demonstrated that students seated near a multitasking laptop user scored 17% lower",
        "As Waterfield and West (2006) argue, the burden of accommodation should fall on institutions",
        "The large-scale replication by Urry et al. (2021) found substantially weaker effects than Mueller and Oppenheimer reported",
      ],
      highlightedTexts: [
        "Mueller and Oppenheimer (2014) provide the most frequently cited evidence against laptop use.",
        "Sana, Weston, and Cepeda (2013) demonstrated that students seated near a multitasking laptop user scored 17% lower on comprehension assessments.",
        "As Waterfield and West (2006) argue, the burden of accommodation should fall on institutions, not on individual students who must prove their need.",
        "The large-scale replication by Urry et al. (2021) found substantially weaker effects than Mueller and Oppenheimer reported",
      ],
      validationStatus: "fully_supported",
      validationResult: {
        status: "fully_supported",
        reasoning: "The highlighted passages confirm four well-integrated, properly cited sources. Each citation includes contextual evaluation, meeting the rubric's criteria for quality, relevance, and integration. The 2-mark deduction for missing active learning sources is proportionate.",
        suggestedRefinement: "Note that the student's critical evaluation of Urry et al.'s replication is particularly strong — acknowledging 'significant heterogeneity across study sites' shows methodological sophistication.",
        keyQuotes: [
          "Mueller and Oppenheimer (2014) provide the most frequently cited evidence",
          "Sana, Weston, and Cepeda (2013) demonstrated",
          "Waterfield and West (2006) argue, the burden of accommodation should fall on institutions",
          "Urry et al. (2021) found substantially weaker effects",
        ],
      },
    },
    {
      criterionId: "critical-analysis",
      score: 20,
      explanation: "Good and nuanced engagement with multiple perspectives including distraction externalities, accessibility, and research limitations. Deducted 5 marks: the analysis of the 'secondhand smoke' metaphor is borrowed from public health discourse without original critical evaluation, and the essay doesn't sufficiently challenge its own position.",
      validated: false,
      aiSuggestion: "The 5-mark deduction is somewhat harsh. Using the 'secondhand smoke' analogy demonstrates analytical sophistication in drawing cross-domain parallels. The self-critique concern is valid but the student does acknowledge limitations of the partial restriction model implicitly. A score of 22 would be more appropriate.",
      aiSuggestedScore: 22,
      aiSupportingEvidence: [
        "This 'second-hand distraction' effect transforms laptop use from a personal choice into a collective problem, much like secondhand smoke in public health policy.",
        "the research base is less conclusive than it initially appears",
        "context — including instructor style, course content, and student population — may matter more than the device itself.",
      ],
      highlightedTexts: [
        "This 'second-hand distraction' effect transforms laptop use from a personal choice into a collective problem, much like secondhand smoke in public health policy.",
        "the research base is less conclusive than it initially appears. The large-scale replication by Urry et al. (2021) found substantially weaker effects than Mueller and Oppenheimer reported",
      ],
      validationStatus: "fully_supported",
      validationResult: {
        status: "fully_supported",
        reasoning: "The highlighted passages support the assessment of cross-domain analysis (public health analogy) and engagement with research limitations. The deduction for insufficient self-critique is a fair observation, though the 5-mark penalty may be disproportionate for what is otherwise strong analytical work.",
        suggestedRefinement: "Consider whether the 'secondhand smoke' metaphor demonstrates exactly the kind of analytical thinking the rubric rewards — connecting disparate fields is a hallmark of strong critical analysis.",
        keyQuotes: [
          "much like secondhand smoke in public health policy",
          "the research base is less conclusive than it initially appears",
          "context — including instructor style, course content, and student population — may matter more than the device itself",
        ],
      },
    },
    {
      criterionId: "writing-quality",
      score: 22,
      explanation: "Well-written with clear academic tone and well-integrated evidence. Good paragraph structure. Deducted 3 marks: some sentences are overly long and complex (e.g., the Urry replication sentence), and the conclusion is somewhat formulaic compared to the strong body paragraphs.",
      validated: false,
      aiSuggestion: "The 3-mark deduction is fair. The essay maintains a consistently academic register with effective transitions. The long sentence observation is valid, and the conclusion does fall slightly flat compared to the analytical body.",
      aiSuggestedScore: 22,
      aiSupportingEvidence: [
        "The question of whether universities should ban laptops from lecture halls is not simply a matter of technology policy — it is a question about what kind of learning environment we want to create.",
        "A flexible, evidence-informed approach is both more practical and more equitable.",
      ],
      highlightedTexts: [
        "The question of whether universities should ban laptops from lecture halls is not simply a matter of technology policy — it is a question about what kind of learning environment we want to create.",
        "A flexible, evidence-informed approach is both more practical and more equitable.",
      ],
      validationStatus: "fully_supported",
      validationResult: {
        status: "fully_supported",
        reasoning: "The highlighted opening and closing sentences demonstrate academic tone and rhetorical sophistication. The 3-mark deduction for sentence complexity and formulaic conclusion is well-proportioned and accurately identified.",
        suggestedRefinement: "Consider adding a highlighted example of the overly complex sentence (the Urry replication) to strengthen the evidence for that specific deduction.",
        keyQuotes: [
          "not simply a matter of technology policy — it is a question about what kind of learning environment we want to create",
          "A flexible, evidence-informed approach is both more practical and more equitable",
        ],
      },
    },
  ],

  // ── STU005: Decent essay, good grading with one partially_supported — creates fairness alert with STU002 (shared citation patterns, very different scores on arg-clarity) ──
  STU005: [
    {
      criterionId: "arg-clarity",
      score: 20,
      explanation: "Clear thesis arguing against laptop bans with a well-structured progression from evidence to accessibility to alternatives. Deducted 5 marks: the thesis is stated somewhat late in the first paragraph, the opening sentence is generic ('have become increasingly popular'), and the 'misguided and counterproductive' framing is strong but not fully developed throughout.",
      validated: false,
      aiSuggestion: "The 5-mark deduction is reasonable overall. The thesis is clear but does arrive late in the paragraph. The 'misguided and counterproductive' claim is bold but the essay focuses more on 'counterproductive' than 'misguided,' creating slight imbalance. A score of 20 fairly reflects this.",
      aiSuggestedScore: 20,
      aiSupportingEvidence: [
        "this essay argues that such bans are misguided and counterproductive",
        "The answer lies in better teaching, not fewer tools.",
      ],
      highlightedTexts: [
        "Laptop bans in universities have become increasingly popular, but this essay argues that such bans are misguided and counterproductive.",
        "The answer lies in better teaching, not fewer tools.",
      ],
      validationStatus: "fully_supported",
      validationResult: {
        status: "fully_supported",
        reasoning: "The highlighted passages confirm a clear anti-ban thesis and a strong concluding restatement. The deduction for late thesis placement and generic opening is well-supported. The 'misguided vs counterproductive' imbalance is a valid analytical observation.",
        suggestedRefinement: "The closing line ('better teaching, not fewer tools') is rhetorically effective and may partially compensate for the slow thesis introduction — consider whether this merits a slight upward revision.",
        keyQuotes: [
          "such bans are misguided and counterproductive",
          "The answer lies in better teaching, not fewer tools",
        ],
      },
    },
    {
      criterionId: "evidence-use",
      score: 22,
      explanation: "Strong use of multiple credible sources including Mueller & Oppenheimer (2014), Sana et al. (2013), Urry et al. (2021), and Fried (2008). Well-integrated with specific statistics. Deducted 3 marks: the Fried (2008) source is used without sufficient contextualization of its methodology, and the essay could engage more with the limitations of each study.",
      validated: false,
      aiSuggestion: "The 3-mark deduction is appropriate. Four sources exceed the minimum, and most are well-integrated with specific data points. The Fried (2008) criticism is valid — the '60% reduction' claim lacks methodological context.",
      aiSuggestedScore: 22,
      aiSupportingEvidence: [
        "research by Mueller and Oppenheimer (2014) suggests that handwriting notes leads to better conceptual understanding",
        "Sana et al. (2013) found that laptop multitasking reduces not only the user's comprehension but also that of nearby students",
        "Urry et al. (2021) attempted to replicate Mueller and Oppenheimer's findings across multiple universities and found much weaker effects",
        "Fried (2008) found that active learning techniques reduced off-task laptop behavior by over 60%",
      ],
      highlightedTexts: [
        "research by Mueller and Oppenheimer (2014) suggests that handwriting notes leads to better conceptual understanding",
        "Sana et al. (2013) found that laptop multitasking reduces not only the user's comprehension but also that of nearby students.",
        "Urry et al. (2021) attempted to replicate Mueller and Oppenheimer's findings across multiple universities and found much weaker effects.",
        "Fried (2008) found that active learning techniques reduced off-task laptop behavior by over 60%",
      ],
      validationStatus: "fully_supported",
      validationResult: {
        status: "fully_supported",
        reasoning: "All four cited sources are confirmed in the highlighted passages with specific data points. The deduction for insufficient Fried (2008) contextualization is valid — the 60% figure is stated without methodological detail. Overall, the evidence use assessment is well-justified.",
        suggestedRefinement: "Note that the student's comparison across Urry and Mueller studies shows analytical integration beyond mere citation — this cross-study comparison strengthens the evidence use assessment.",
        keyQuotes: [
          "Mueller and Oppenheimer (2014) suggests that handwriting notes leads to better conceptual understanding",
          "Sana et al. (2013) found that laptop multitasking reduces",
          "Urry et al. (2021) attempted to replicate",
          "Fried (2008) found that active learning techniques reduced off-task laptop behavior by over 60%",
        ],
      },
    },
    {
      criterionId: "critical-analysis",
      score: 19,
      explanation: "Good but insufficiently nuanced engagement with counterarguments, especially around accessibility and research limitations. Deducted 6 marks: the analysis of active learning as an alternative is presented more as assertion than analysis — the student claims pedagogy solves distraction without critically examining why many professors haven't adopted these techniques. Also misses the economic and institutional barriers to pedagogical reform.",
      validated: false,
      aiSuggestion: "The 6-mark deduction is slightly harsh but has merit. The student does present active learning as a panacea without examining implementation barriers. However, the engagement with Urry et al.'s replication and the accessibility argument shows analytical depth. A score of 20–21 might be more appropriate.",
      aiSuggestedScore: 21,
      aiSupportingEvidence: [
        "the solution to distraction is not prohibition but pedagogy. When lectures are engaging and interactive, students are less likely to drift to social media.",
        "They concluded that the original study's results may not generalize to diverse classroom settings.",
        "The goal should be to make laptops irrelevant as distraction devices by making lectures impossible to ignore.",
      ],
      highlightedTexts: [
        "the solution to distraction is not prohibition but pedagogy. When lectures are engaging and interactive, students are less likely to drift to social media.",
        "Urry et al. (2021) attempted to replicate Mueller and Oppenheimer's findings across multiple universities and found much weaker effects.",
      ],
      validationStatus: "fully_supported",
      validationResult: {
        status: "fully_supported",
        reasoning: "The highlighted passages support the observation that the student frames pedagogy as the solution. The 6-mark deduction for 'assertion rather than analysis' is supported — the student does present the pedagogical alternative without examining implementation barriers. The engagement with replication studies adds depth that the grader correctly acknowledges.",
        suggestedRefinement: "Separate the valid criticism (uncritical pedagogy advocacy) from the less standard expectation (missing economic barriers). Adjusting to 4–5 marks deducted would better match the evidence.",
        keyQuotes: [
          "the solution to distraction is not prohibition but pedagogy",
          "the original study's results may not generalize to diverse classroom settings",
          "making lectures impossible to ignore",
        ],
      },
    },
    {
      criterionId: "writing-quality",
      score: 21,
      explanation: "Clear, readable prose with good paragraph structure and effective use of transition phrases. Deducted 4 marks: occasional informal phrasing ('hard to ignore,' 'drift to social media'), the opening sentence is somewhat generic, and the conclusion could be more nuanced rather than restating the thesis in simplified form.",
      validated: false,
      aiSuggestion: "The 4-mark deduction is fair. The informal phrases are present and the opening is generic. The conclusion does simplify rather than develop the argument. However, 'hard to ignore' is a reasonable phrase in academic writing. A score of 21–22 is appropriate.",
      aiSuggestedScore: 22,
      aiSupportingEvidence: [
        "Laptop bans in universities have become increasingly popular",
        "The answer lies in better teaching, not fewer tools.",
        "a laptop ban is a blunt tool that creates more problems than it solves",
      ],
      highlightedTexts: [
        "Laptop bans in universities have become increasingly popular, but this essay argues that such bans are misguided and counterproductive.",
        "The answer lies in better teaching, not fewer tools.",
      ],
      validationStatus: "fully_supported",
      validationResult: {
        status: "fully_supported",
        reasoning: "The highlighted passages demonstrate both the generic opening ('have become increasingly popular') and the simplified concluding restatement. The assessment of clear but occasionally informal prose is well-supported. The 4-mark deduction is proportionate to the identified weaknesses.",
        suggestedRefinement: "The closing aphorism ('better teaching, not fewer tools') is memorable and effective despite being a simplification — consider whether this rhetorical choice deserves some credit.",
        keyQuotes: [
          "Laptop bans in universities have become increasingly popular",
          "The answer lies in better teaching, not fewer tools",
          "a laptop ban is a blunt tool that creates more problems than it solves",
        ],
      },
    },
  ],

  // ── STU006 (Section C): Solid essay, decent grading ──
  STU006: [
    { criterionId: "arg-clarity", score: 20, explanation: "Clear position against bans with reasonable structure.", validated: false, aiSuggestedScore: 21, validationStatus: "fully_supported" as ValidationStatus, validationResult: { status: "fully_supported" as ValidationStatus, reasoning: "Well-supported assessment.", suggestedRefinement: "", keyQuotes: [] } },
    { criterionId: "evidence-use", score: 19, explanation: "References key studies but integration could be stronger.", validated: false, aiSuggestedScore: 20, validationStatus: "fully_supported" as ValidationStatus, validationResult: { status: "fully_supported" as ValidationStatus, reasoning: "Accurate assessment.", suggestedRefinement: "", keyQuotes: [] } },
    { criterionId: "critical-analysis", score: 18, explanation: "Some engagement with counterarguments but lacks depth.", validated: false, aiSuggestedScore: 19, validationStatus: "partially_supported" as ValidationStatus, validationResult: { status: "partially_supported" as ValidationStatus, reasoning: "Deduction slightly harsh.", suggestedRefinement: "", keyQuotes: [] } },
    { criterionId: "writing-quality", score: 20, explanation: "Clean prose with minor issues.", validated: false, aiSuggestedScore: 21, validationStatus: "fully_supported" as ValidationStatus, validationResult: { status: "fully_supported" as ValidationStatus, reasoning: "Well-justified.", suggestedRefinement: "", keyQuotes: [] } },
  ],

  // ── STU007 (Section A): Weak essay, grader scored fairly ──
  STU007: [
    { criterionId: "arg-clarity", score: 12, explanation: "Simplistic thesis with no qualifications.", validated: false, aiSuggestedScore: 11, validationStatus: "fully_supported" as ValidationStatus, validationResult: { status: "fully_supported" as ValidationStatus, reasoning: "Accurate low score.", suggestedRefinement: "", keyQuotes: [] } },
    { criterionId: "evidence-use", score: 10, explanation: "Names studies but no integration or specific data.", validated: false, aiSuggestedScore: 10, validationStatus: "fully_supported" as ValidationStatus, validationResult: { status: "fully_supported" as ValidationStatus, reasoning: "Well-justified low score.", suggestedRefinement: "", keyQuotes: [] } },
    { criterionId: "critical-analysis", score: 8, explanation: "No counterarguments addressed whatsoever.", validated: false, aiSuggestedScore: 7, validationStatus: "fully_supported" as ValidationStatus, validationResult: { status: "fully_supported" as ValidationStatus, reasoning: "Accurate.", suggestedRefinement: "", keyQuotes: [] } },
    { criterionId: "writing-quality", score: 14, explanation: "Readable but informal and repetitive.", validated: false, aiSuggestedScore: 13, validationStatus: "fully_supported" as ValidationStatus, validationResult: { status: "fully_supported" as ValidationStatus, reasoning: "Fair assessment.", suggestedRefinement: "", keyQuotes: [] } },
  ],

  // ── STU008 (Section B): Good essay, well-graded ──
  STU008: [
    { criterionId: "arg-clarity", score: 22, explanation: "Clear thesis advocating tiered approach with good structure.", validated: false, aiSuggestedScore: 22, validationStatus: "fully_supported" as ValidationStatus, validationResult: { status: "fully_supported" as ValidationStatus, reasoning: "Accurate.", suggestedRefinement: "", keyQuotes: [] } },
    { criterionId: "evidence-use", score: 20, explanation: "Good citation of Mueller & Oppenheimer with context.", validated: false, aiSuggestedScore: 21, validationStatus: "fully_supported" as ValidationStatus, validationResult: { status: "fully_supported" as ValidationStatus, reasoning: "Well-justified.", suggestedRefinement: "", keyQuotes: [] } },
    { criterionId: "critical-analysis", score: 19, explanation: "Acknowledges accessibility but could go deeper.", validated: false, aiSuggestedScore: 20, validationStatus: "partially_supported" as ValidationStatus, validationResult: { status: "partially_supported" as ValidationStatus, reasoning: "Deduction slightly steep.", suggestedRefinement: "", keyQuotes: [] } },
    { criterionId: "writing-quality", score: 22, explanation: "Strong academic tone throughout.", validated: false, aiSuggestedScore: 22, validationStatus: "fully_supported" as ValidationStatus, validationResult: { status: "fully_supported" as ValidationStatus, reasoning: "Accurate.", suggestedRefinement: "", keyQuotes: [] } },
  ],

  // ── STU009 (Section C): Weak essay, grader inflated scores ──
  STU009: [
    { criterionId: "arg-clarity", score: 18, explanation: "Clear position against bans with personal conviction.", validated: false, aiSuggestedScore: 12, validationStatus: "not_supported" as ValidationStatus, validationResult: { status: "not_supported" as ValidationStatus, reasoning: "Score inflated — thesis is informal and unsupported.", suggestedRefinement: "Reassess against rubric criteria.", keyQuotes: [] } },
    { criterionId: "evidence-use", score: 16, explanation: "References research on handwriting.", validated: false, aiSuggestedScore: 9, validationStatus: "not_supported" as ValidationStatus, validationResult: { status: "not_supported" as ValidationStatus, reasoning: "No specific citations in the text.", suggestedRefinement: "Score should reflect absence of named sources.", keyQuotes: [] } },
    { criterionId: "critical-analysis", score: 14, explanation: "Considers accessibility perspective.", validated: false, aiSuggestedScore: 10, validationStatus: "partially_supported" as ValidationStatus, validationResult: { status: "partially_supported" as ValidationStatus, reasoning: "Accessibility mention is superficial.", suggestedRefinement: "", keyQuotes: [] } },
    { criterionId: "writing-quality", score: 16, explanation: "Readable informal prose.", validated: false, aiSuggestedScore: 14, validationStatus: "fully_supported" as ValidationStatus, validationResult: { status: "fully_supported" as ValidationStatus, reasoning: "Fair but generous.", suggestedRefinement: "", keyQuotes: [] } },
  ],

  // ── STU010 (Section A): Excellent essay, well-graded ──
  STU010: [
    { criterionId: "arg-clarity", score: 24, explanation: "Sophisticated thesis connecting cognitive science to policy.", validated: false, aiSuggestedScore: 24, validationStatus: "fully_supported" as ValidationStatus, validationResult: { status: "fully_supported" as ValidationStatus, reasoning: "Excellent assessment.", suggestedRefinement: "", keyQuotes: [] } },
    { criterionId: "evidence-use", score: 23, explanation: "Three well-integrated frameworks cited.", validated: false, aiSuggestedScore: 24, validationStatus: "fully_supported" as ValidationStatus, validationResult: { status: "fully_supported" as ValidationStatus, reasoning: "Accurate.", suggestedRefinement: "", keyQuotes: [] } },
    { criterionId: "critical-analysis", score: 24, explanation: "Cross-framework synthesis rare at undergraduate level.", validated: false, aiSuggestedScore: 24, validationStatus: "fully_supported" as ValidationStatus, validationResult: { status: "fully_supported" as ValidationStatus, reasoning: "Well-justified high score.", suggestedRefinement: "", keyQuotes: [] } },
    { criterionId: "writing-quality", score: 23, explanation: "Polished academic prose with sophisticated transitions.", validated: false, aiSuggestedScore: 24, validationStatus: "fully_supported" as ValidationStatus, validationResult: { status: "fully_supported" as ValidationStatus, reasoning: "Accurate.", suggestedRefinement: "", keyQuotes: [] } },
  ],

  // ── STU011 (Section B): Decent, some partial validations ──
  STU011: [
    { criterionId: "arg-clarity", score: 19, explanation: "Double-edged sword framing is clear but not deeply developed.", validated: false, aiSuggestedScore: 19, validationStatus: "fully_supported" as ValidationStatus, validationResult: { status: "fully_supported" as ValidationStatus, reasoning: "Accurate.", suggestedRefinement: "", keyQuotes: [] } },
    { criterionId: "evidence-use", score: 17, explanation: "References research but lacks specific citations.", validated: false, aiSuggestedScore: 18, validationStatus: "partially_supported" as ValidationStatus, validationResult: { status: "partially_supported" as ValidationStatus, reasoning: "Slight underscoring.", suggestedRefinement: "", keyQuotes: [] } },
    { criterionId: "critical-analysis", score: 18, explanation: "Flexible policy argument shows some analytical depth.", validated: false, aiSuggestedScore: 18, validationStatus: "fully_supported" as ValidationStatus, validationResult: { status: "fully_supported" as ValidationStatus, reasoning: "Well-justified.", suggestedRefinement: "", keyQuotes: [] } },
    { criterionId: "writing-quality", score: 20, explanation: "Clean and readable with good structure.", validated: false, aiSuggestedScore: 20, validationStatus: "fully_supported" as ValidationStatus, validationResult: { status: "fully_supported" as ValidationStatus, reasoning: "Accurate.", suggestedRefinement: "", keyQuotes: [] } },
  ],

  // ── STU012 (Section C): Strong essay, well-graded ──
  STU012: [
    { criterionId: "arg-clarity", score: 22, explanation: "Institutional responsibility framing is sophisticated.", validated: false, aiSuggestedScore: 23, validationStatus: "fully_supported" as ValidationStatus, validationResult: { status: "fully_supported" as ValidationStatus, reasoning: "Good assessment.", suggestedRefinement: "", keyQuotes: [] } },
    { criterionId: "evidence-use", score: 20, explanation: "Implicit references to research but could cite more explicitly.", validated: false, aiSuggestedScore: 19, validationStatus: "fully_supported" as ValidationStatus, validationResult: { status: "fully_supported" as ValidationStatus, reasoning: "Reasonable.", suggestedRefinement: "", keyQuotes: [] } },
    { criterionId: "critical-analysis", score: 22, explanation: "Strong tension between autonomy and institutional duty.", validated: false, aiSuggestedScore: 22, validationStatus: "fully_supported" as ValidationStatus, validationResult: { status: "fully_supported" as ValidationStatus, reasoning: "Accurate.", suggestedRefinement: "", keyQuotes: [] } },
    { criterionId: "writing-quality", score: 23, explanation: "Excellent academic register and paragraph cohesion.", validated: false, aiSuggestedScore: 23, validationStatus: "fully_supported" as ValidationStatus, validationResult: { status: "fully_supported" as ValidationStatus, reasoning: "Well-justified.", suggestedRefinement: "", keyQuotes: [] } },
  ],

  // ── STU013 (Section A): Weak essay, grader was too generous ──
  STU013: [
    { criterionId: "arg-clarity", score: 17, explanation: "Has a position but it's vague and unsupported.", validated: false, aiSuggestedScore: 11, validationStatus: "not_supported" as ValidationStatus, validationResult: { status: "not_supported" as ValidationStatus, reasoning: "Score far too high for the quality.", suggestedRefinement: "Reassess — thesis is informal opinion, not academic argument.", keyQuotes: [] } },
    { criterionId: "evidence-use", score: 14, explanation: "No credible sources cited.", validated: false, aiSuggestedScore: 8, validationStatus: "partially_supported" as ValidationStatus, validationResult: { status: "partially_supported" as ValidationStatus, reasoning: "Score still generous given zero citations.", suggestedRefinement: "", keyQuotes: [] } },
    { criterionId: "critical-analysis", score: 12, explanation: "Dismissive of opposing views.", validated: false, aiSuggestedScore: 9, validationStatus: "partially_supported" as ValidationStatus, validationResult: { status: "partially_supported" as ValidationStatus, reasoning: "Fair direction but score still high.", suggestedRefinement: "", keyQuotes: [] } },
    { criterionId: "writing-quality", score: 15, explanation: "Informal but readable.", validated: false, aiSuggestedScore: 13, validationStatus: "fully_supported" as ValidationStatus, validationResult: { status: "fully_supported" as ValidationStatus, reasoning: "Reasonable.", suggestedRefinement: "", keyQuotes: [] } },
  ],

  // ── STU014 (Section B): Excellent essay, accurate grading ──
  STU014: [
    { criterionId: "arg-clarity", score: 23, explanation: "Nuanced thesis that acknowledges complexity.", validated: false, aiSuggestedScore: 23, validationStatus: "fully_supported" as ValidationStatus, validationResult: { status: "fully_supported" as ValidationStatus, reasoning: "Excellent match.", suggestedRefinement: "", keyQuotes: [] } },
    { criterionId: "evidence-use", score: 24, explanation: "Four well-integrated sources with specific data.", validated: false, aiSuggestedScore: 24, validationStatus: "fully_supported" as ValidationStatus, validationResult: { status: "fully_supported" as ValidationStatus, reasoning: "Accurate.", suggestedRefinement: "", keyQuotes: [] } },
    { criterionId: "critical-analysis", score: 22, explanation: "Strong engagement with replication concerns and accessibility.", validated: false, aiSuggestedScore: 23, validationStatus: "fully_supported" as ValidationStatus, validationResult: { status: "fully_supported" as ValidationStatus, reasoning: "Well-justified.", suggestedRefinement: "", keyQuotes: [] } },
    { criterionId: "writing-quality", score: 23, explanation: "Polished academic writing with effective paragraph structure.", validated: false, aiSuggestedScore: 23, validationStatus: "fully_supported" as ValidationStatus, validationResult: { status: "fully_supported" as ValidationStatus, reasoning: "Accurate.", suggestedRefinement: "", keyQuotes: [] } },
  ],

  // ── STU015 (Section C): Good essay, mostly well-graded ──
  STU015: [
    { criterionId: "arg-clarity", score: 21, explanation: "Clear middle-path thesis well-articulated.", validated: false, aiSuggestedScore: 22, validationStatus: "fully_supported" as ValidationStatus, validationResult: { status: "fully_supported" as ValidationStatus, reasoning: "Good assessment.", suggestedRefinement: "", keyQuotes: [] } },
    { criterionId: "evidence-use", score: 20, explanation: "References research but some claims lack specific citations.", validated: false, aiSuggestedScore: 20, validationStatus: "fully_supported" as ValidationStatus, validationResult: { status: "fully_supported" as ValidationStatus, reasoning: "Accurate.", suggestedRefinement: "", keyQuotes: [] } },
    { criterionId: "critical-analysis", score: 21, explanation: "Balanced analysis acknowledging contested evidence.", validated: false, aiSuggestedScore: 21, validationStatus: "fully_supported" as ValidationStatus, validationResult: { status: "fully_supported" as ValidationStatus, reasoning: "Well-justified.", suggestedRefinement: "", keyQuotes: [] } },
    { criterionId: "writing-quality", score: 22, explanation: "Strong academic tone with good transitions.", validated: false, aiSuggestedScore: 22, validationStatus: "fully_supported" as ValidationStatus, validationResult: { status: "fully_supported" as ValidationStatus, reasoning: "Accurate.", suggestedRefinement: "", keyQuotes: [] } },
  ],
};
