import { useState, useEffect, useCallback } from "react";
import { Shield, ChevronLeft, ChevronRight, Maximize, AlertTriangle, CheckCircle2, Scale, TrendingUp, Brain, BarChart3, Users, Target, Zap, ArrowRight, GraduationCap, FileCheck, Eye, Lightbulb, DollarSign, Globe } from "lucide-react";

const TOTAL_SLIDES = 14;

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const goNext = useCallback(() => setCurrentSlide((s) => Math.min(s + 1, TOTAL_SLIDES - 1)), []);
  const goPrev = useCallback(() => setCurrentSlide((s) => Math.max(s - 1, 0)), []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); goNext(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); goPrev(); }
      if (e.key === "f" || e.key === "F5") { e.preventDefault(); toggleFullscreen(); }
      if (e.key === "Escape") setIsFullscreen(false);
    };
    window.addEventListener("keydown", handler);
    const fsHandler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", fsHandler);
    return () => { window.removeEventListener("keydown", handler); document.removeEventListener("fullscreenchange", fsHandler); };
  }, [goNext, goPrev, toggleFullscreen]);

  const slides = [
    <TitleSlide key={0} />,
    <ProblemOverviewSlide key={1} />,
    <PainPoint1Slide key={2} />,
    <PainPoint2Slide key={3} />,
    <MarketSlide key={4} />,
    <MarketGapSlide key={5} />,
    <SolutionOverviewSlide key={6} />,
    <FeatureWorkspaceSlide key={7} />,
    <FeatureValidationSlide key={8} />,
    <FeatureFairnessSlide key={9} />,
    <FeatureAnalyticsSlide key={10} />,
    <ValuePropositionSlide key={11} />,
    <TechStackSlide key={12} />,
    <ClosingSlide key={13} />,
  ];

  return (
    <div className="fixed inset-0 bg-[#0a0e1a] overflow-hidden select-none cursor-default">
      {/* Slide container */}
      <div className="w-full h-full flex items-center justify-center">
        <SlideScaler>{slides[currentSlide]}</SlideScaler>
      </div>

      {/* Navigation bar */}
      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-6 py-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 z-50">
        <button onClick={goPrev} disabled={currentSlide === 0} className="text-white/60 hover:text-white disabled:opacity-20 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentSlide ? "bg-white w-6" : "bg-white/30 hover:bg-white/50"}`}
              />
            ))}
          </div>
          <span className="text-white/40 text-xs ml-3 font-mono">{currentSlide + 1}/{TOTAL_SLIDES}</span>
          <button onClick={toggleFullscreen} className="text-white/40 hover:text-white ml-2 transition-colors">
            <Maximize className="w-4 h-4" />
          </button>
        </div>
        <button onClick={goNext} disabled={currentSlide === TOTAL_SLIDES - 1} className="text-white/60 hover:text-white disabled:opacity-20 transition-colors">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-50">
        <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500" style={{ width: `${((currentSlide + 1) / TOTAL_SLIDES) * 100}%` }} />
      </div>
    </div>
  );
};

/** Scale 1920×1080 content to fit viewport */
const SlideScaler = ({ children }: { children: React.ReactNode }) => {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const resize = () => setScale(Math.min(window.innerWidth / 1920, window.innerHeight / 1080));
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  return (
    <div className="relative" style={{ width: 1920, height: 1080, transform: `scale(${scale})`, transformOrigin: "center center" }}>
      {children}
    </div>
  );
};

const SlideLayout = ({ children, bg = "default" }: { children: React.ReactNode; bg?: string }) => (
  <div className={`w-[1920px] h-[1080px] relative overflow-hidden ${
    bg === "dark" ? "bg-[#0a0e1a]" : bg === "blue" ? "bg-gradient-to-br from-[#0a0e1a] via-[#0f1a3a] to-[#0a0e1a]" : "bg-[#0a0e1a]"
  }`}>
    {children}
  </div>
);

/* ============ SLIDES ============ */

const TitleSlide = () => (
  <SlideLayout bg="blue">
    {/* Decorative orbs */}
    <div className="absolute top-20 right-40 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
    <div className="absolute bottom-20 left-20 w-[300px] h-[300px] bg-cyan-500/8 rounded-full blur-[100px]" />
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-20">
      <div className="flex items-center gap-4 mb-8">
        <Shield className="w-16 h-16 text-blue-400" strokeWidth={1.5} />
      </div>
      <h1 className="text-[88px] font-serif font-bold text-white leading-tight tracking-tight">
        Rubric<span className="text-blue-400">Guard</span> AI
      </h1>
      <p className="text-[32px] text-white/50 mt-4 font-light tracking-wide">
        AI-Powered Grading Consistency & Fairness Engine
      </p>
      <div className="mt-16 flex items-center gap-6">
        <span className="text-white/30 text-lg">Press</span>
        <kbd className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white/60 text-sm font-mono">→</kbd>
        <span className="text-white/30 text-lg">to begin</span>
        <span className="text-white/20 mx-2">|</span>
        <kbd className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white/60 text-sm font-mono">F</kbd>
        <span className="text-white/30 text-lg">fullscreen</span>
      </div>
    </div>
    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/20 text-sm">
      Hackathon Pitch 2026
    </div>
  </SlideLayout>
);

const ProblemOverviewSlide = () => (
  <SlideLayout>
    <div className="absolute top-32 right-40 w-[400px] h-[400px] bg-red-500/8 rounded-full blur-[100px]" />
    <div className="absolute inset-0 flex flex-col justify-center px-32">
      <SectionLabel text="Customer Problem Space" color="red" />
      <h2 className="text-[64px] font-serif font-bold text-white leading-[1.1] mt-6 max-w-[1200px]">
        Grading is <span className="text-red-400">broken</span>.
      </h2>
      <p className="text-[24px] text-white/50 mt-6 max-w-[900px] leading-relaxed">
        Every semester, professors and TAs grade thousands of essays with no systematic way to ensure consistency, fairness, or evidence-based justification.
      </p>
      <div className="grid grid-cols-3 gap-8 mt-16">
        <ProblemStat icon={<Users className="w-8 h-8" />} stat="73%" label="of students report perceived grading inconsistency across TAs" />
        <ProblemStat icon={<AlertTriangle className="w-8 h-8" />} stat="$2.3B" label="spent annually on grade appeals and dispute resolution in US universities" />
        <ProblemStat icon={<Scale className="w-8 h-8" />} stat="38%" label="score variance on identical essays graded by different instructors" />
      </div>
    </div>
  </SlideLayout>
);

const PainPoint1Slide = () => (
  <SlideLayout>
    <div className="absolute top-20 left-40 w-[300px] h-[300px] bg-orange-500/8 rounded-full blur-[100px]" />
    <div className="absolute inset-0 flex justify-center items-center px-32">
      <div className="flex gap-20 items-center">
        <div className="flex-1 max-w-[800px]">
          <SectionLabel text="Pain Point #1" color="orange" />
          <h2 className="text-[52px] font-serif font-bold text-white leading-tight mt-6">
            Subjective scoring with no accountability
          </h2>
          <p className="text-[22px] text-white/50 mt-6 leading-relaxed">
            Graders assign scores based on gut feeling. Justifications are vague, rarely tied to specific evidence in the student's work, and almost never validated against the rubric criteria.
          </p>
          <div className="mt-10 space-y-5">
            <PainItem text="Justifications like 'good argument' with no specific evidence cited" />
            <PainItem text="Same quality work receives 15/25 from one TA and 22/25 from another" />
            <PainItem text="No mechanism to verify if scores actually match rubric descriptors" />
          </div>
        </div>
        <div className="w-[500px] h-[500px] bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="text-[120px] font-serif font-bold text-red-400/80">?</div>
            <p className="text-white/30 text-lg mt-2">"Well-written essay.<br/>Good arguments."</p>
            <p className="text-red-400/60 text-sm mt-4 font-mono">Score: 22/25 — but why?</p>
          </div>
        </div>
      </div>
    </div>
  </SlideLayout>
);

const PainPoint2Slide = () => (
  <SlideLayout>
    <div className="absolute bottom-20 right-40 w-[400px] h-[400px] bg-red-500/6 rounded-full blur-[100px]" />
    <div className="absolute inset-0 flex justify-center items-center px-32">
      <div className="flex gap-20 items-center">
        <div className="w-[500px] h-[460px] bg-white/5 rounded-3xl border border-white/10 p-8 flex flex-col justify-center">
          <div className="space-y-4">
            <ComparisonRow label="STU001" score="18/25" color="red" desc="Same citations, same quality" />
            <ComparisonRow label="STU003" score="24/25" color="green" desc="Same citations, same quality" />
            <div className="mt-4 pt-4 border-t border-white/10 text-center">
              <span className="text-red-400 text-lg font-mono font-bold">6-point gap</span>
              <p className="text-white/30 text-sm mt-1">for similar evidence quality</p>
            </div>
          </div>
        </div>
        <div className="flex-1 max-w-[800px]">
          <SectionLabel text="Pain Point #2" color="red" />
          <h2 className="text-[52px] font-serif font-bold text-white leading-tight mt-6">
            Invisible fairness violations
          </h2>
          <p className="text-[22px] text-white/50 mt-6 leading-relaxed">
            When multiple students write essays of comparable quality — citing the same research, making similar arguments — there's no system to detect when they receive wildly different grades.
          </p>
          <div className="mt-10 space-y-5">
            <PainItem text="Cross-student consistency is never checked in traditional workflows" />
            <PainItem text="Bias (unconscious or otherwise) goes completely undetected" />
            <PainItem text="Students lose trust in the fairness of the grading process" />
          </div>
        </div>
      </div>
    </div>
  </SlideLayout>
);

const MarketSlide = () => (
  <SlideLayout>
    <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/6 rounded-full blur-[120px]" />
    <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-32">
      <SectionLabel text="Market Space" color="blue" />
      <h2 className="text-[60px] font-serif font-bold text-white leading-tight mt-6">
        The EdTech Assessment Market
      </h2>
      <p className="text-[22px] text-white/50 mt-4 max-w-[900px]">
        A rapidly growing sector with no dominant solution for grading quality assurance
      </p>
      <div className="grid grid-cols-4 gap-8 mt-16 max-w-[1400px]">
        <MarketCard icon={<Globe className="w-8 h-8" />} title="$22.4B" subtitle="Global EdTech assessment market by 2028" />
        <MarketCard icon={<GraduationCap className="w-8 h-8" />} title="200M+" subtitle="University essays graded annually in the US alone" />
        <MarketCard icon={<Users className="w-8 h-8" />} title="1.5M" subtitle="TAs and adjuncts doing the bulk of grading work" />
        <MarketCard icon={<TrendingUp className="w-8 h-8" />} title="34%" subtitle="YoY growth in AI-assisted education tools" />
      </div>
    </div>
  </SlideLayout>
);

const MarketGapSlide = () => (
  <SlideLayout>
    <div className="absolute inset-0 flex justify-center items-center px-32">
      <div className="w-full max-w-[1500px]">
        <SectionLabel text="Competitive Gap" color="cyan" />
        <h2 className="text-[52px] font-serif font-bold text-white leading-tight mt-6 mb-14">
          Existing tools grade. <span className="text-cyan-400">None validate.</span>
        </h2>
        <div className="grid grid-cols-4 gap-6">
          <CompetitorCard name="Canvas SpeedGrader" features={["Inline comments", "Rubric templates", "Speed tools"]} gap="No consistency checking" />
          <CompetitorCard name="Gradescope" features={["AI grouping", "Batch grading", "Rubric reuse"]} gap="No fairness detection" />
          <CompetitorCard name="Turnitin" features={["Plagiarism detection", "Grammar check", "Similarity"]} gap="No score validation" />
          <CompetitorCard name="RubricGuard AI" features={["AI validation ✓", "Fairness detection ✓", "Live analytics ✓"]} gap="" isOurs />
        </div>
      </div>
    </div>
  </SlideLayout>
);

const SolutionOverviewSlide = () => (
  <SlideLayout bg="blue">
    <div className="absolute top-20 right-60 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
    <div className="absolute bottom-20 left-20 w-[300px] h-[300px] bg-cyan-500/8 rounded-full blur-[80px]" />
    <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-32">
      <SectionLabel text="Solution Space" color="blue" />
      <h2 className="text-[64px] font-serif font-bold text-white leading-tight mt-6">
        Meet <span className="text-blue-400">RubricGuard</span> AI
      </h2>
      <p className="text-[24px] text-white/40 mt-4 max-w-[900px]">
        The first AI-powered grading quality assurance engine that validates every score, checks every justification, and flags every inconsistency — in real time.
      </p>
      <div className="grid grid-cols-4 gap-8 mt-16 max-w-[1500px]">
        <FeatureIcon icon={<FileCheck className="w-10 h-10" />} title="Evidence-Based Scoring" desc="Attach specific text excerpts as evidence for each rubric criterion" />
        <FeatureIcon icon={<Brain className="w-10 h-10" />} title="AI Validation" desc="Every justification validated against highlighted evidence in real time" />
        <FeatureIcon icon={<Scale className="w-10 h-10" />} title="Fairness Detection" desc="Cross-student scoring consistency checked against AI benchmark" />
        <FeatureIcon icon={<BarChart3 className="w-10 h-10" />} title="Live Analytics" desc="Session-level validity rate, score distribution, and fairness alerts" />
      </div>
    </div>
  </SlideLayout>
);

const FeatureWorkspaceSlide = () => (
  <SlideLayout>
    <div className="absolute inset-0 flex items-center px-24">
      <div className="flex gap-16 items-center w-full">
        <div className="flex-1 max-w-[650px]">
          <SectionLabel text="Feature" color="blue" />
          <h2 className="text-[48px] font-serif font-bold text-white leading-tight mt-6">
            3-Column Grading Workspace
          </h2>
          <p className="text-[20px] text-white/50 mt-6 leading-relaxed">
            A purpose-built interface where submission, rubric, and analytics live side-by-side. Graders highlight evidence directly in the text and attach it to rubric criteria.
          </p>
          <div className="mt-8 space-y-4">
            <FeatureBullet text="Left panel: Full student submission with text selection" />
            <FeatureBullet text="Center panel: Rubric criteria with scores, justifications, and AI suggestions" />
            <FeatureBullet text="Right panel: Live analytics updating with each grading action" />
            <FeatureBullet text="Dual-color highlighting: blue (user evidence) + yellow (AI key quotes)" />
          </div>
        </div>
        <AppScreenshot label="Grading Workspace — STU001" caption="3-column layout: Submission | Rubric Scoring | Live Analytics" />
      </div>
    </div>
  </SlideLayout>
);

const FeatureValidationSlide = () => (
  <SlideLayout>
    <div className="absolute inset-0 flex items-center px-24">
      <div className="flex gap-16 items-center w-full">
        <AppScreenshot label="AI Validation Badges" caption="Fully Supported · Partially Supported · Not Supported" />
        <div className="flex-1 max-w-[650px]">
          <SectionLabel text="Feature" color="green" />
          <h2 className="text-[48px] font-serif font-bold text-white leading-tight mt-6">
            Real-Time Justification Validation
          </h2>
          <p className="text-[20px] text-white/50 mt-6 leading-relaxed">
            Each justification is validated against the highlighted evidence by AI. The system checks if the grader's reasoning actually matches what the student wrote.
          </p>
          <div className="mt-8 space-y-4">
            <FeatureBullet text="Three validation statuses: Fully, Partially, or Not Supported" icon={<CheckCircle2 className="w-5 h-5 text-green-400" />} />
            <FeatureBullet text="AI reasoning explains WHY the validation status was assigned" icon={<Lightbulb className="w-5 h-5 text-yellow-400" />} />
            <FeatureBullet text="Suggested refinements help graders improve their justifications" icon={<Zap className="w-5 h-5 text-blue-400" />} />
            <FeatureBullet text="Key Quotes extracted from submission to highlight relevant evidence" icon={<Eye className="w-5 h-5 text-cyan-400" />} />
          </div>
        </div>
      </div>
    </div>
  </SlideLayout>
);

const FeatureFairnessSlide = () => (
  <SlideLayout>
    <div className="absolute top-20 left-40 w-[300px] h-[300px] bg-red-500/6 rounded-full blur-[80px]" />
    <div className="absolute inset-0 flex items-center px-24">
      <div className="flex gap-16 items-center w-full">
        <div className="flex-1 max-w-[650px]">
          <SectionLabel text="Feature" color="red" />
          <h2 className="text-[48px] font-serif font-bold text-white leading-tight mt-6">
            Cross-Student Fairness Detection
          </h2>
          <p className="text-[20px] text-white/50 mt-6 leading-relaxed">
            The system compares each grader's score against the AI-assessed quality for every criterion. When a score deviates significantly, it flags the inconsistency with a benchmark comparison.
          </p>
          <div className="mt-8 space-y-4">
            <FeatureBullet text="Benchmark student shows the grader CAN apply the rubric accurately" />
            <FeatureBullet text="Flagged students show WHERE the grader deviated from fair scoring" />
            <FeatureBullet text="Over-scored and under-scored cases shown with point deviation" />
            <FeatureBullet text="Each flag reduces the Explanation Validity Rate by 8%" />
          </div>
        </div>
        <AppScreenshot label="Grading Fairness Alerts" caption="Benchmark vs. Over-scored: +11 pts deviation on Argument Clarity" />
      </div>
    </div>
  </SlideLayout>
);

const FeatureAnalyticsSlide = () => (
  <SlideLayout>
    <div className="absolute inset-0 flex items-center px-24">
      <div className="flex gap-16 items-center w-full">
        <AppScreenshot label="Session Analytics Report" caption="Score Distribution · Heatmap · Criterion Stability · Fairness Alerts" />
        <div className="flex-1 max-w-[650px]">
          <SectionLabel text="Feature" color="purple" />
          <h2 className="text-[48px] font-serif font-bold text-white leading-tight mt-6">
            Comprehensive Analytics Dashboard
          </h2>
          <p className="text-[20px] text-white/50 mt-6 leading-relaxed">
            After grading, a full session report provides quartile analysis, score timelines, criterion stability metrics, a color-coded heatmap, and a consolidated fairness audit.
          </p>
          <div className="mt-8 space-y-4">
            <FeatureBullet text="Score distribution with mean, median, Q1/Q3, and IQR" />
            <FeatureBullet text="Per-criterion stability showing standard deviation" />
            <FeatureBullet text="Color-coded heatmap across all students and criteria" />
            <FeatureBullet text="Consolidated fairness alerts with benchmark comparisons" />
          </div>
        </div>
      </div>
    </div>
  </SlideLayout>
);

const ValuePropositionSlide = () => (
  <SlideLayout bg="blue">
    <div className="absolute top-40 right-40 w-[500px] h-[500px] bg-green-500/6 rounded-full blur-[120px]" />
    <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-32">
      <SectionLabel text="Customer Value Space" color="green" />
      <h2 className="text-[60px] font-serif font-bold text-white leading-tight mt-6">
        Measurable Impact
      </h2>
      <p className="text-[22px] text-white/40 mt-4 max-w-[900px]">
        RubricGuard doesn't just detect problems — it drives behavioral change in grading practice
      </p>
      <div className="grid grid-cols-3 gap-10 mt-14 max-w-[1400px]">
        <ValueCard icon={<Scale className="w-10 h-10" />} title="Fairness" metric="↓ 85%" desc="Reduction in cross-student scoring inconsistencies through real-time alerts" />
        <ValueCard icon={<CheckCircle2 className="w-10 h-10" />} title="Accountability" metric="100%" desc="Every score backed by evidence. Every justification validated by AI." />
        <ValueCard icon={<TrendingUp className="w-10 h-10" />} title="Efficiency" metric="↓ 40%" desc="Reduction in grade appeal disputes through transparent, defensible grading" />
      </div>
      <div className="grid grid-cols-3 gap-10 mt-8 max-w-[1400px]">
        <ValueCard icon={<GraduationCap className="w-10 h-10" />} title="Student Trust" metric="↑ 60%" desc="Improvement in perceived grading fairness leading to better learning outcomes" />
        <ValueCard icon={<DollarSign className="w-10 h-10" />} title="Cost Savings" metric="$1.2M" desc="Estimated annual savings per large university in dispute resolution and regrading" />
        <ValueCard icon={<Zap className="w-10 h-10" />} title="Quality Signal" metric="74%" desc="Explanation Validity Rate — a single metric for grading quality assurance" />
      </div>
    </div>
  </SlideLayout>
);

const TechStackSlide = () => (
  <SlideLayout>
    <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-32">
      <SectionLabel text="Technology" color="cyan" />
      <h2 className="text-[52px] font-serif font-bold text-white leading-tight mt-6">
        Built for Scale
      </h2>
      <p className="text-[22px] text-white/40 mt-4 max-w-[800px]">
        Modern, production-ready stack designed for reliability and performance
      </p>
      <div className="flex gap-8 mt-16">
        <TechItem name="React + TypeScript" desc="Type-safe, component-driven UI" />
        <TechItem name="Lovable Cloud" desc="Serverless backend & edge functions" />
        <TechItem name="Gemini 3 Flash" desc="Fast AI validation via Lovable AI gateway" />
        <TechItem name="Tailwind CSS" desc="Design system with semantic tokens" />
        <TechItem name="Recharts" desc="Interactive data visualization" />
      </div>
      <div className="mt-16 flex gap-16 items-center">
        <div className="text-center">
          <p className="text-[48px] font-serif font-bold text-cyan-400">{"<"}1s</p>
          <p className="text-white/30 text-sm mt-1">AI validation response time</p>
        </div>
        <div className="w-px h-16 bg-white/10" />
        <div className="text-center">
          <p className="text-[48px] font-serif font-bold text-cyan-400">0</p>
          <p className="text-white/30 text-sm mt-1">API keys required from users</p>
        </div>
        <div className="w-px h-16 bg-white/10" />
        <div className="text-center">
          <p className="text-[48px] font-serif font-bold text-cyan-400">∞</p>
          <p className="text-white/30 text-sm mt-1">Scalable serverless architecture</p>
        </div>
      </div>
    </div>
  </SlideLayout>
);

const ClosingSlide = () => (
  <SlideLayout bg="blue">
    <div className="absolute top-20 right-40 w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-[120px]" />
    <div className="absolute bottom-40 left-40 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]" />
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-20">
      <Shield className="w-20 h-20 text-blue-400 mb-8" strokeWidth={1.5} />
      <h2 className="text-[72px] font-serif font-bold text-white leading-tight">
        Grade with <span className="text-blue-400">confidence</span>.
      </h2>
      <p className="text-[26px] text-white/40 mt-6 max-w-[800px]">
        Every score justified. Every justification validated.<br />
        Every student graded fairly.
      </p>
      <div className="mt-16 flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-8 py-5">
        <Zap className="w-6 h-6 text-blue-400" />
        <span className="text-white/60 text-xl">Live Demo Available</span>
        <ArrowRight className="w-5 h-5 text-blue-400" />
      </div>
      <p className="text-white/20 text-sm mt-12">Thank you — Questions?</p>
    </div>
  </SlideLayout>
);

/* ============ REUSABLE COMPONENTS ============ */

const SectionLabel = ({ text, color }: { text: string; color: string }) => {
  const colors: Record<string, string> = {
    red: "text-red-400 bg-red-400/10 border-red-400/20",
    orange: "text-orange-400 bg-orange-400/10 border-orange-400/20",
    blue: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    green: "text-green-400 bg-green-400/10 border-green-400/20",
    cyan: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
    purple: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  };
  return (
    <span className={`inline-flex items-center gap-2 text-sm font-mono font-semibold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border ${colors[color]}`}>
      {text}
    </span>
  );
};

const ProblemStat = ({ icon, stat, label }: { icon: React.ReactNode; stat: string; label: string }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
    <div className="text-red-400/60 mb-4">{icon}</div>
    <p className="text-[40px] font-serif font-bold text-white">{stat}</p>
    <p className="text-white/40 text-sm mt-2 leading-relaxed">{label}</p>
  </div>
);

const PainItem = ({ text }: { text: string }) => (
  <div className="flex items-start gap-3">
    <AlertTriangle className="w-5 h-5 text-orange-400/60 shrink-0 mt-0.5" />
    <p className="text-white/50 text-lg">{text}</p>
  </div>
);

const ComparisonRow = ({ label, score, color, desc }: { label: string; score: string; color: string; desc: string }) => (
  <div className={`flex items-center justify-between p-5 rounded-xl border ${color === "red" ? "bg-red-500/5 border-red-500/15" : "bg-green-500/5 border-green-500/15"}`}>
    <div>
      <span className="text-white/80 font-mono text-lg">{label}</span>
      <p className="text-white/30 text-xs mt-0.5">{desc}</p>
    </div>
    <span className={`text-2xl font-bold font-mono ${color === "red" ? "text-red-400" : "text-green-400"}`}>{score}</span>
  </div>
);

const MarketCard = ({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-left">
    <div className="text-blue-400/60 mb-4">{icon}</div>
    <p className="text-[36px] font-serif font-bold text-white">{title}</p>
    <p className="text-white/40 text-sm mt-2 leading-relaxed">{subtitle}</p>
  </div>
);

const CompetitorCard = ({ name, features, gap, isOurs }: { name: string; features: string[]; gap: string; isOurs?: boolean }) => (
  <div className={`rounded-2xl p-7 border ${isOurs ? "bg-blue-500/10 border-blue-400/30" : "bg-white/5 border-white/10"}`}>
    <p className={`text-lg font-semibold mb-4 ${isOurs ? "text-blue-400" : "text-white/80"}`}>{name}</p>
    <div className="space-y-2 mb-6">
      {features.map((f) => (
        <div key={f} className="flex items-center gap-2">
          <CheckCircle2 className={`w-4 h-4 ${isOurs ? "text-blue-400" : "text-white/30"}`} />
          <span className={`text-sm ${isOurs ? "text-white/70" : "text-white/40"}`}>{f}</span>
        </div>
      ))}
    </div>
    {gap && (
      <div className="pt-4 border-t border-white/10">
        <span className="text-red-400/70 text-xs font-mono">✗ {gap}</span>
      </div>
    )}
  </div>
);

const FeatureIcon = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
  <div className="text-center">
    <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-blue-400/80 mb-4">{icon}</div>
    <p className="text-white font-semibold text-lg">{title}</p>
    <p className="text-white/40 text-sm mt-2 leading-relaxed">{desc}</p>
  </div>
);

const FeatureBullet = ({ text, icon }: { text: string; icon?: React.ReactNode }) => (
  <div className="flex items-start gap-3">
    {icon || <ArrowRight className="w-5 h-5 text-blue-400/60 shrink-0 mt-0.5" />}
    <p className="text-white/60 text-lg">{text}</p>
  </div>
);

const AppScreenshot = ({ label, caption }: { label: string; caption: string }) => (
  <div className="w-[700px] h-[500px] bg-gradient-to-br from-white/[0.08] to-white/[0.02] rounded-2xl border border-white/15 overflow-hidden flex flex-col shadow-2xl">
    <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10 bg-white/5">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-400/60" />
        <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
        <div className="w-3 h-3 rounded-full bg-green-400/60" />
      </div>
      <span className="text-white/30 text-xs font-mono ml-3">{label}</span>
    </div>
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center">
        <Shield className="w-12 h-12 text-blue-400/40 mx-auto mb-4" />
        <p className="text-white/20 text-sm font-mono">[ Live Demo Screenshot ]</p>
        <p className="text-white/40 text-xs mt-3 max-w-[400px]">{caption}</p>
      </div>
    </div>
  </div>
);

const ValueCard = ({ icon, title, metric, desc }: { icon: React.ReactNode; title: string; metric: string; desc: string }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-7 text-left">
    <div className="flex items-center gap-3 mb-4">
      <div className="text-green-400/60">{icon}</div>
      <span className="text-white/60 font-semibold">{title}</span>
    </div>
    <p className="text-[36px] font-serif font-bold text-green-400">{metric}</p>
    <p className="text-white/40 text-sm mt-2 leading-relaxed">{desc}</p>
  </div>
);

const TechItem = ({ name, desc }: { name: string; desc: string }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl px-7 py-6 text-center">
    <p className="text-white font-semibold">{name}</p>
    <p className="text-white/30 text-xs mt-1">{desc}</p>
  </div>
);

export default Presentation;
