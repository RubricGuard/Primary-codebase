import { useState, useEffect, useCallback } from "react";
import { Shield, ChevronLeft, ChevronRight, Maximize, AlertTriangle, CheckCircle2, Scale, TrendingUp, Brain, BarChart3, Users, Target, Zap, ArrowRight, GraduationCap, FileCheck, Eye, Lightbulb, BookOpen, UserCheck, Award, ClipboardCheck, MessageCircle, LineChart, Coffee, XCircle, Calculator, Layers } from "lucide-react";

const TOTAL_SLIDES = 23;

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
    <StoryOpenSlide key={1} />,
    <ProblemScaleSlide key={2} />,
    <PainSubjectiveSlide key={3} />,
    <PainFairnessSlide key={4} />,
    <StoryFrustrationSlide key={5} />,
    <MarketGapSlide key={6} />,
    <SolutionRevealSlide key={7} />,
    <WorkspaceSlide key={8} />,
    <ValidationSlide key={9} />,
    <ValidityCalcSlide key={10} />,
    <FairnessDetectionSlide key={11} />,
    <AnalyticsDashSlide key={12} />,
    <SegmentGradesSlide key={13} />,
    <ProfessorViewSlide key={14} />,
    <GraderGrowthSlide key={15} />,
    <DualHighlightLearningSlide key={16} />,
    <TACalibrationSlide key={17} />,
    <InstitutionalLearningSlide key={18} />,
    <ValueImpactSlide key={19} />,
    <TechStackSlide key={20} />,
    <DemoFlowSlide key={21} />,
    <ClosingSlide key={22} />,
  ];

  return (
    <div className="fixed inset-0 bg-[#0a0e1a] overflow-hidden select-none cursor-default">
      <div className="w-full h-full flex items-center justify-center">
        <SlideScaler>{slides[currentSlide]}</SlideScaler>
      </div>
      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-6 py-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 z-50">
        <button onClick={goPrev} disabled={currentSlide === 0} className="text-white/60 hover:text-white disabled:opacity-20 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
              <button key={i} onClick={() => setCurrentSlide(i)} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentSlide ? "bg-white w-6" : "bg-white/30 hover:bg-white/50"}`} />
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
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-50">
        <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500" style={{ width: `${((currentSlide + 1) / TOTAL_SLIDES) * 100}%` }} />
      </div>
    </div>
  );
};

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

/* ═══════════════════════ ACT 1: THE PROBLEM ═══════════════════════ */

const TitleSlide = () => (
  <SlideLayout bg="blue">
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
    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/20 text-sm">Hackathon Pitch 2026</div>
  </SlideLayout>
);

const StoryOpenSlide = () => (
  <SlideLayout>
    <div className="absolute top-20 left-1/3 w-[500px] h-[400px] bg-orange-500/6 rounded-full blur-[120px]" />
    <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-32">
      <SectionLabel text="The Story" color="orange" />
      <h2 className="text-[56px] font-serif font-bold text-white leading-tight mt-8 max-w-[1200px]">
        Meet <span className="text-orange-400">Prof. Sharma</span>
      </h2>
      <p className="text-[24px] text-white/45 mt-6 max-w-[900px] leading-relaxed">
        She teaches BUS302 — Strategic Management. 15 students across 3 sections, graded by 3 professors. An argumentative essay on whether universities should ban laptops in lectures.
      </p>
      <div className="grid grid-cols-3 gap-8 mt-14 max-w-[1200px]">
        <StoryCard icon={<GraduationCap className="w-8 h-8" />} name="Prof. Sharma" section="Section A · 5 students" highlight />
        <StoryCard icon={<BookOpen className="w-8 h-8" />} name="Prof. Somani" section="Section B · 5 students" />
        <StoryCard icon={<BookOpen className="w-8 h-8" />} name="Prof. Raymahesh" section="Section C · 5 students" />
      </div>
      <p className="text-white/25 text-sm mt-10 italic">Each professor grades their own section. But who checks if they're grading consistently?</p>
    </div>
  </SlideLayout>
);

const ProblemScaleSlide = () => (
  <SlideLayout>
    <div className="absolute top-32 right-40 w-[400px] h-[400px] bg-red-500/8 rounded-full blur-[100px]" />
    <div className="absolute inset-0 flex flex-col justify-center px-32">
      <SectionLabel text="The Problem" color="red" />
      <h2 className="text-[64px] font-serif font-bold text-white leading-[1.1] mt-6 max-w-[1200px]">
        Grading is <span className="text-red-400">broken</span>.
      </h2>
      <p className="text-[24px] text-white/50 mt-6 max-w-[900px] leading-relaxed">
        Every semester, professors grade thousands of essays with no systematic way to ensure consistency, fairness, or evidence-based justification.
      </p>
      <div className="grid grid-cols-3 gap-8 mt-16">
        <ProblemStat icon={<Users className="w-8 h-8" />} stat="73%" label="of students report perceived grading inconsistency across sections" />
        <ProblemStat icon={<AlertTriangle className="w-8 h-8" />} stat="$2.3B" label="spent annually on grade appeals and dispute resolution in US universities" />
        <ProblemStat icon={<Scale className="w-8 h-8" />} stat="38%" label="score variance on identical essays graded by different instructors" />
      </div>
    </div>
  </SlideLayout>
);

const PainSubjectiveSlide = () => (
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
            Graders assign scores based on gut feeling. Justifications are vague, rarely tied to specific evidence in the student's work, and almost never validated against the rubric.
          </p>
          <div className="mt-10 space-y-5">
            <PainItem text="Justifications like 'good argument' with no specific evidence cited" />
            <PainItem text="Same quality work receives 15/25 from one grader and 22/25 from another" />
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

const PainFairnessSlide = () => (
  <SlideLayout>
    <div className="absolute bottom-20 right-40 w-[400px] h-[400px] bg-red-500/6 rounded-full blur-[100px]" />
    <div className="absolute inset-0 flex justify-center items-center px-32">
      <div className="flex gap-20 items-center">
        <div className="w-[500px] h-[460px] bg-white/5 rounded-3xl border border-white/10 p-8 flex flex-col justify-center">
          <div className="space-y-4">
            <ComparisonRow label="STU001" score="18/25" color="red" desc="Sharma's Section A — same citations" />
            <ComparisonRow label="STU006" score="24/25" color="green" desc="Somani's Section B — same citations" />
            <div className="mt-4 pt-4 border-t border-white/10 text-center">
              <span className="text-red-400 text-lg font-mono font-bold">6-point gap</span>
              <p className="text-white/30 text-sm mt-1">for essays citing the same research</p>
            </div>
          </div>
        </div>
        <div className="flex-1 max-w-[800px]">
          <SectionLabel text="Pain Point #2" color="red" />
          <h2 className="text-[52px] font-serif font-bold text-white leading-tight mt-6">
            Invisible fairness violations
          </h2>
          <p className="text-[22px] text-white/50 mt-6 leading-relaxed">
            When students across sections write essays of comparable quality — citing Mueller & Oppenheimer, Sana et al. — there's no system to detect when they receive wildly different grades from different graders.
          </p>
          <div className="mt-10 space-y-5">
            <PainItem text="Cross-section consistency is never checked in traditional workflows" />
            <PainItem text="Grader bias (unconscious or otherwise) goes completely undetected" />
            <PainItem text="Students lose trust in the fairness of the grading process" />
          </div>
        </div>
      </div>
    </div>
  </SlideLayout>
);

const StoryFrustrationSlide = () => (
  <SlideLayout>
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-orange-500/8 rounded-full blur-[120px]" />
    <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-32">
      <Coffee className="w-16 h-16 text-orange-400/60 mb-6" />
      <h2 className="text-[56px] font-serif font-bold text-white leading-tight max-w-[1100px]">
        It's 2 AM. Prof. Sharma is on her <span className="text-orange-400">12th essay</span>.
      </h2>
      <p className="text-[22px] text-white/40 mt-6 max-w-[800px] leading-relaxed">
        She's graded 5 students. She wonders: "Am I scoring STU005 the same way I scored STU001 three hours ago?" She checks Canvas — no help. Gradescope — no consistency metrics. Turnitin — only plagiarism.
      </p>
      <div className="grid grid-cols-3 gap-6 mt-12 max-w-[1100px]">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
          <XCircle className="w-8 h-8 text-red-400/50 mx-auto mb-3" />
          <p className="text-white/60 font-semibold">Canvas</p>
          <p className="text-white/25 text-sm mt-1">No consistency checking</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
          <XCircle className="w-8 h-8 text-red-400/50 mx-auto mb-3" />
          <p className="text-white/60 font-semibold">Gradescope</p>
          <p className="text-white/25 text-sm mt-1">No fairness detection</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
          <XCircle className="w-8 h-8 text-red-400/50 mx-auto mb-3" />
          <p className="text-white/60 font-semibold">Turnitin</p>
          <p className="text-white/25 text-sm mt-1">No score validation</p>
        </div>
      </div>
      <p className="text-white/20 text-sm mt-10 italic">She needs a copilot, not another grading tool.</p>
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

/* ═══════════════════════ ACT 2: THE SOLUTION ═══════════════════════ */

const SolutionRevealSlide = () => (
  <SlideLayout bg="blue">
    <div className="absolute top-20 right-60 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
    <div className="absolute bottom-20 left-20 w-[300px] h-[300px] bg-cyan-500/8 rounded-full blur-[80px]" />
    <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-32">
      <SectionLabel text="Enter RubricGuard" color="blue" />
      <h2 className="text-[64px] font-serif font-bold text-white leading-tight mt-6">
        What if every score was <span className="text-blue-400">defensible</span>?
      </h2>
      <p className="text-[24px] text-white/40 mt-4 max-w-[900px]">
        An AI copilot that validates every justification, detects fairness violations across students, and gives professors real-time visibility into grading quality — without replacing human judgment.
      </p>
      <div className="grid grid-cols-4 gap-8 mt-16 max-w-[1500px]">
        <FeatureIcon icon={<FileCheck className="w-10 h-10" />} title="Evidence-Based Scoring" desc="Attach specific text excerpts as evidence for each rubric criterion" />
        <FeatureIcon icon={<Brain className="w-10 h-10" />} title="AI Validation" desc="Every justification validated against highlighted evidence in real time" />
        <FeatureIcon icon={<Scale className="w-10 h-10" />} title="Fairness Detection" desc="Pairwise comparison flags similar answers with different scores" />
        <FeatureIcon icon={<BarChart3 className="w-10 h-10" />} title="Segment Grades" desc="Cross-grader analytics with per-professor validity rates" />
      </div>
    </div>
  </SlideLayout>
);

const WorkspaceSlide = () => (
  <SlideLayout>
    <div className="absolute inset-0 flex items-center px-24">
      <div className="flex gap-16 items-center w-full">
        <div className="flex-1 max-w-[650px]">
          <SectionLabel text="The Workspace" color="blue" />
          <h2 className="text-[48px] font-serif font-bold text-white leading-tight mt-6">
            3-Column Grading Interface
          </h2>
          <p className="text-[20px] text-white/50 mt-6 leading-relaxed">
            Prof. Sharma opens RubricGuard and begins grading her 5 students. The workspace shows submission, rubric, and live analytics side-by-side.
          </p>
          <div className="mt-8 space-y-4">
            <FeatureBullet text="Left: Full student submission with text selection & highlighting" />
            <FeatureBullet text="Center: Rubric criteria with scores, justifications, and AI suggestions" />
            <FeatureBullet text="Right: Live analytics updating with each grading action" />
            <FeatureBullet text="Dual-color highlighting: blue (user evidence) + yellow (AI key quotes)" />
          </div>
        </div>
        <AppScreenshot label="Grading Workspace — Prof. Sharma grading STU001" caption="3-column layout: Submission | Rubric Scoring | Live Analytics" />
      </div>
    </div>
  </SlideLayout>
);

const ValidationSlide = () => (
  <SlideLayout>
    <div className="absolute inset-0 flex items-center px-24">
      <div className="flex gap-16 items-center w-full">
        <AppScreenshot label="AI Validation in Action" caption="Fully Supported · Partially Supported · Not Supported" />
        <div className="flex-1 max-w-[650px]">
          <SectionLabel text="AI Validation" color="green" />
          <h2 className="text-[48px] font-serif font-bold text-white leading-tight mt-6">
            "Is my justification backed by evidence?"
          </h2>
          <p className="text-[20px] text-white/50 mt-6 leading-relaxed">
            Prof. Sharma scores STU002's Argument Clarity at 12/25 and writes: "Simplistic thesis." She clicks Validate — the AI checks if her highlighted evidence actually supports that deduction.
          </p>
          <div className="mt-8 space-y-4">
            <FeatureBullet text="✅ Fully Supported — justification matches the evidence" icon={<CheckCircle2 className="w-5 h-5 text-green-400" />} />
            <FeatureBullet text="⚠️ Partially Supported — some gaps in reasoning" icon={<AlertTriangle className="w-5 h-5 text-yellow-400" />} />
            <FeatureBullet text="❌ Not Supported — evidence doesn't back the score" icon={<XCircle className="w-5 h-5 text-red-400" />} />
            <FeatureBullet text="AI extracts Key Quotes and suggests score refinements" icon={<Eye className="w-5 h-5 text-cyan-400" />} />
          </div>
        </div>
      </div>
    </div>
  </SlideLayout>
);

/* ═══════════════════════ ACT 3: THE MATH ═══════════════════════ */

const ValidityCalcSlide = () => (
  <SlideLayout>
    <div className="absolute top-20 right-40 w-[400px] h-[400px] bg-blue-500/8 rounded-full blur-[100px]" />
    <div className="absolute inset-0 flex items-center px-24">
      <div className="flex gap-16 items-center w-full">
        <div className="flex-1 max-w-[750px]">
          <SectionLabel text="The Math" color="blue" />
          <h2 className="text-[48px] font-serif font-bold text-white leading-tight mt-6">
            Explanation Validity Rate
          </h2>
          <p className="text-[20px] text-white/50 mt-6 leading-relaxed">
            A single metric that captures grading quality. It measures how well a grader's justifications hold up against AI validation, with a penalty for fairness violations.
          </p>
          <div className="mt-8 space-y-5">
            <CalcStep num="1" label="Count validations" formula="fully_supported / total_validated × 100" example="15 of 20 validations fully supported = 75%" />
            <CalcStep num="2" label="Fairness penalty" formula="fairness_flags × 1% (capped at 20%)" example="1 fairness flag = 1% penalty" />
            <CalcStep num="3" label="Final rate" formula="raw_validity − fairness_penalty" example="75% − 1% = 74% validity rate" />
          </div>
        </div>

        {/* Visual: Calculation breakdown */}
        <div className="w-[700px] h-[540px] bg-gradient-to-br from-white/[0.06] to-white/[0.02] rounded-2xl border border-white/15 overflow-hidden flex flex-col shadow-2xl">
          <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10 bg-white/5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
              <div className="w-3 h-3 rounded-full bg-green-400/60" />
            </div>
            <span className="text-white/30 text-xs font-mono ml-3">Validity Rate — Prof. Sharma (5 students × 4 criteria)</span>
          </div>
          <div className="flex-1 p-6 flex flex-col justify-center">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-green-500/5 border border-green-500/15">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span className="text-white/70 text-sm">Fully Supported</span>
                </div>
                <span className="text-green-400 font-bold font-mono text-xl">15</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/15">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  <span className="text-white/70 text-sm">Partially Supported</span>
                </div>
                <span className="text-yellow-400 font-bold font-mono text-xl">3</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-red-500/5 border border-red-500/15">
                <div className="flex items-center gap-3">
                  <XCircle className="w-5 h-5 text-red-400" />
                  <span className="text-white/70 text-sm">Not Supported</span>
                </div>
                <span className="text-red-400 font-bold font-mono text-xl">2</span>
              </div>
            </div>
            <div className="mt-5 pt-5 border-t border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/40 text-xs font-mono">Raw: 15/20 = 75%</span>
                <span className="text-white/40 text-xs font-mono">Penalty: 1 flag × 1% = 1%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm font-semibold">Final Validity Rate</span>
                <span className="text-blue-400 text-3xl font-serif font-bold">74%</span>
              </div>
              <div className="h-3 bg-white/5 rounded-full overflow-hidden mt-3">
                <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" style={{ width: "74%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </SlideLayout>
);

const FairnessDetectionSlide = () => (
  <SlideLayout>
    <div className="absolute top-20 left-40 w-[300px] h-[300px] bg-red-500/6 rounded-full blur-[80px]" />
    <div className="absolute inset-0 flex items-center px-24">
      <div className="flex gap-16 items-center w-full">
        <div className="flex-1 max-w-[650px]">
          <SectionLabel text="Fairness Engine" color="red" />
          <h2 className="text-[48px] font-serif font-bold text-white leading-tight mt-6">
            Pairwise Fairness Detection
          </h2>
          <p className="text-[20px] text-white/50 mt-6 leading-relaxed">
            The AI independently assesses each answer's quality per criterion. When two students receive similar AI assessments but significantly different grader scores, a fairness alert fires.
          </p>
          <div className="mt-8 space-y-4">
            <FeatureBullet text="AI scores each criterion independently (aiSuggestedScore)" />
            <FeatureBullet text="Compares all student pairs: |aiDiff| ≤ 2 means 'similar quality'" />
            <FeatureBullet text="If |scoreDiff| > 1.5 on similar quality → flag inconsistency" />
            <FeatureBullet text="Each flag penalizes Validity Rate by 2% (capped at 20%)" />
          </div>
          <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-xl">
            <p className="text-white/30 text-xs font-mono">
              if (|AI_A − AI_B| ≤ 2 && |Score_A − Score_B| &gt; 1.5) → FLAG
            </p>
          </div>
        </div>

        <div className="w-[700px] h-[500px] bg-gradient-to-br from-white/[0.06] to-white/[0.02] rounded-2xl border border-white/15 overflow-hidden flex flex-col shadow-2xl">
          <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10 bg-white/5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
              <div className="w-3 h-3 rounded-full bg-green-400/60" />
            </div>
            <span className="text-white/30 text-xs font-mono ml-3">Fairness Alert — Argument Clarity</span>
          </div>
          <div className="flex-1 p-6 flex flex-col justify-center">
            <div className="space-y-4">
              <div className="bg-white/[0.04] rounded-xl border border-white/10 p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white/80 font-semibold text-sm">Argument Clarity</span>
                  <span className="text-red-400 text-xs font-mono font-bold bg-red-500/10 px-2 py-1 rounded">6 pt gap</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-white/[0.03] rounded-lg px-4 py-3 border border-white/[0.06]">
                    <div>
                      <span className="text-white/60 text-xs font-mono">STU001</span>
                      <span className="text-white/30 text-xs ml-2">AI: 22</span>
                    </div>
                    <span className="text-white font-bold">18/25</span>
                  </div>
                  <div className="flex items-center justify-between bg-white/[0.03] rounded-lg px-4 py-3 border border-white/[0.06]">
                    <div>
                      <span className="text-white/60 text-xs font-mono">STU004</span>
                      <span className="text-white/30 text-xs ml-2">AI: 23</span>
                    </div>
                    <span className="text-white font-bold">24/25</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span className="text-red-400/80 text-xs">AI says similar quality (diff: 1), but scores differ by 6 pts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </SlideLayout>
);

/* ═══════════════════════ ACT 4: THE BIGGER PICTURE ═══════════════════════ */

const AnalyticsDashSlide = () => (
  <SlideLayout>
    <div className="absolute inset-0 flex items-center px-24">
      <div className="flex gap-16 items-center w-full">
        <AppScreenshot label="Session Analytics — Prof. Sharma" caption="Score Distribution · Heatmap · Criterion Stability · Fairness Alerts" />
        <div className="flex-1 max-w-[650px]">
          <SectionLabel text="Session Report" color="purple" />
          <h2 className="text-[48px] font-serif font-bold text-white leading-tight mt-6">
            Grading Session Analytics
          </h2>
          <p className="text-[20px] text-white/50 mt-6 leading-relaxed">
            After grading 5 students, Prof. Sharma reviews her session report: quartile analysis, score timeline, criterion stability, heatmap, and fairness audit — all for her section only.
          </p>
          <div className="mt-8 space-y-4">
            <FeatureBullet text="Score distribution with mean, median, Q1/Q3, and IQR" />
            <FeatureBullet text="Per-criterion standard deviation shows scoring stability" />
            <FeatureBullet text="Color-coded heatmap across all 5 students × 4 criteria" />
            <FeatureBullet text="Consolidated fairness alerts with pairwise comparisons" />
          </div>
        </div>
      </div>
    </div>
  </SlideLayout>
);

const SegmentGradesSlide = () => (
  <SlideLayout>
    <div className="absolute top-20 left-1/3 w-[500px] h-[400px] bg-blue-500/8 rounded-full blur-[120px]" />
    <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-24">
      <SectionLabel text="Full Picture" color="blue" />
      <h2 className="text-[52px] font-serif font-bold text-white leading-tight mt-6">
        Segment Grades: <span className="text-blue-400">All 15 Students</span>
      </h2>
      <p className="text-[22px] text-white/40 mt-4 max-w-[900px]">
        The Segment Grades view aggregates all 3 graders, showing per-professor analytics and a complete grade table with validation status dots.
      </p>
      <div className="grid grid-cols-3 gap-8 mt-12 max-w-[1400px]">
        <GraderSummaryCard name="Prof. Sharma" section="Section A" students={5} avgScore={72.4} validityRate={74} fairnessAlerts={1} highlight />
        <GraderSummaryCard name="Prof. Somani" section="Section B" students={5} avgScore={79.8} validityRate={88} fairnessAlerts={0} />
        <GraderSummaryCard name="Prof. Raymahesh" section="Section C" students={5} avgScore={75.2} validityRate={67} fairnessAlerts={2} />
      </div>
      <div className="mt-10 bg-white/5 border border-white/10 rounded-xl p-5 max-w-[1000px]">
        <div className="grid grid-cols-7 gap-3 text-xs text-white/40 font-mono mb-3">
          <span>Student</span><span className="text-center">Arg.</span><span className="text-center">Evidence</span><span className="text-center">Analysis</span><span className="text-center">Writing</span><span className="text-center">Total</span><span className="text-center">Status</span>
        </div>
        {[
          { id: "STU001", scores: [22, 20, 18, 21], dots: ["g", "g", "p", "g"] },
          { id: "STU002", scores: [12, 10, 8, 14], dots: ["g", "g", "n", "p"] },
          { id: "STU003", scores: [24, 22, 23, 23], dots: ["g", "g", "g", "g"] },
        ].map((s) => (
          <div key={s.id} className="grid grid-cols-7 gap-3 text-sm py-1.5 border-t border-white/5">
            <span className="text-white/60 font-mono text-xs">{s.id}</span>
            {s.scores.map((sc, i) => (
              <span key={i} className={`text-center font-bold text-xs ${sc >= 22 ? "text-green-400" : sc >= 16 ? "text-blue-400" : sc >= 12 ? "text-yellow-400" : "text-red-400"}`}>{sc}</span>
            ))}
            <span className="text-center font-bold text-white/80 text-xs">{s.scores.reduce((a, b) => a + b, 0)}</span>
            <div className="flex justify-center gap-1">
              {s.dots.map((d, i) => (
                <span key={i} className={`w-2 h-2 rounded-full ${d === "g" ? "bg-green-400" : d === "p" ? "bg-yellow-400" : "bg-red-400"}`} />
              ))}
            </div>
          </div>
        ))}
        <p className="text-white/20 text-[11px] mt-2 text-center italic">Showing 3 of 15 students · Full table available in app</p>
      </div>
    </div>
  </SlideLayout>
);

const ProfessorViewSlide = () => (
  <SlideLayout>
    <div className="absolute top-20 right-40 w-[400px] h-[400px] bg-purple-500/8 rounded-full blur-[100px]" />
    <div className="absolute inset-0 flex items-center px-24">
      <div className="flex gap-16 items-center w-full">
        <div className="flex-1 max-w-[700px]">
          <SectionLabel text="For Professors" color="purple" />
          <h2 className="text-[48px] font-serif font-bold text-white leading-tight mt-6">
            Cross-Section <span className="text-purple-400">Oversight</span>
          </h2>
          <p className="text-[20px] text-white/50 mt-6 leading-relaxed">
            Prof. Sharma can see how Prof. Somani and Prof. Raymahesh are grading their sections. One metric — Explanation Validity Rate — tells the whole story. Drill into fairness alerts and criterion-level heatmaps to identify where calibration is needed.
          </p>
          <div className="mt-8 space-y-4">
            <FeatureBullet text="Per-grader validity rates at a glance — one number for rubric fidelity" icon={<LineChart className="w-5 h-5 text-purple-400" />} />
            <FeatureBullet text="Cross-section fairness homepage highlights scoring drift between graders" icon={<Scale className="w-5 h-5 text-purple-400" />} />
            <FeatureBullet text="Criterion-level breakdown shows WHERE each grader is lenient or strict" icon={<BarChart3 className="w-5 h-5 text-purple-400" />} />
            <FeatureBullet text="Validation breakdown: fully / partially / not supported counts" icon={<TrendingUp className="w-5 h-5 text-purple-400" />} />
          </div>
        </div>

        <div className="w-[700px] h-[520px] bg-gradient-to-br from-white/[0.06] to-white/[0.02] rounded-2xl border border-white/15 overflow-hidden flex flex-col shadow-2xl">
          <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10 bg-white/5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
              <div className="w-3 h-3 rounded-full bg-green-400/60" />
            </div>
            <span className="text-white/30 text-xs font-mono ml-3">Grader Performance Comparison</span>
          </div>
          <div className="flex-1 p-6">
            <p className="text-white/50 text-xs font-mono mb-4 uppercase tracking-wider">Explanation Validity Rate by Grader</p>
            <div className="space-y-4">
              <TABar name="Prof. Somani" section="Section B" rate={88} color="green" />
              <TABar name="Prof. Sharma" section="Section A" rate={74} color="blue" />
              <TABar name="Prof. Raymahesh" section="Section C" rate={67} color="orange" />
            </div>
            <div className="mt-6 pt-5 border-t border-white/10">
              <p className="text-white/50 text-xs font-mono mb-3 uppercase tracking-wider">Flagged Issues</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 bg-red-500/5 border border-red-500/15 rounded-lg px-3 py-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                  <span className="text-white/60 text-xs">Raymahesh: 2 fairness alerts — Evidence Use scores inflated vs AI assessment</span>
                </div>
                <div className="flex items-center gap-2 bg-orange-500/5 border border-orange-500/15 rounded-lg px-3 py-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-orange-400" />
                  <span className="text-white/60 text-xs">Sharma: 1 fairness alert — Argument Clarity inconsistency on similar submissions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </SlideLayout>
);

const GraderGrowthSlide = () => (
  <SlideLayout>
    <div className="absolute bottom-20 left-40 w-[400px] h-[400px] bg-green-500/6 rounded-full blur-[100px]" />
    <div className="absolute inset-0 flex items-center px-24">
      <div className="flex gap-16 items-center w-full">
        <div className="w-[700px] h-[520px] bg-gradient-to-br from-white/[0.06] to-white/[0.02] rounded-2xl border border-white/15 overflow-hidden flex flex-col shadow-2xl">
          <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10 bg-white/5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
              <div className="w-3 h-3 rounded-full bg-green-400/60" />
            </div>
            <span className="text-white/30 text-xs font-mono ml-3">Grader Growth Trajectory</span>
          </div>
          <div className="flex-1 p-6">
            <p className="text-white/50 text-xs font-mono mb-4 uppercase tracking-wider">Improvement Over Time</p>
            <div className="space-y-3">
              <ImprovementStep week="Assignment 1" rate={54} label="Initial calibration — many unsupported justifications" status="warning" />
              <ImprovementStep week="Assignment 3" rate={71} label="AI refinements adopted — fewer vague explanations" status="improving" />
              <ImprovementStep week="Assignment 6" rate={88} label="Strong rubric alignment — consistent, evidence-based scoring" status="good" />
            </div>
            <div className="mt-5 pt-4 border-t border-white/10">
              <p className="text-white/50 text-xs font-mono mb-3 uppercase tracking-wider">AI Coaching</p>
              <div className="space-y-2">
                <div className="flex items-start gap-2 bg-blue-500/5 border border-blue-500/15 rounded-lg px-3 py-2.5">
                  <MessageCircle className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <span className="text-white/60 text-xs leading-relaxed">"Evidence Use improved 34% — citing specific passages instead of summarizing."</span>
                </div>
                <div className="flex items-start gap-2 bg-green-500/5 border border-green-500/15 rounded-lg px-3 py-2.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" />
                  <span className="text-white/60 text-xs leading-relaxed">"Critical Analysis scoring now within 1.2 pts of AI — excellent calibration."</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-[700px]">
          <SectionLabel text="Growth Loop" color="green" />
          <h2 className="text-[48px] font-serif font-bold text-white leading-tight mt-6">
            Every grader gets <span className="text-green-400">better</span>
          </h2>
          <p className="text-[20px] text-white/50 mt-6 leading-relaxed">
            RubricGuard isn't just a monitoring tool — it's a training system. Each validation teaches the grader what a well-justified score looks like. Over time, validity rates climb and fairness alerts disappear.
          </p>
          <div className="mt-8 space-y-4">
            <FeatureBullet text="Real-time AI feedback on every justification" icon={<Brain className="w-5 h-5 text-green-400" />} />
            <FeatureBullet text="Suggested refinements teach evidence-based reasoning" icon={<Lightbulb className="w-5 h-5 text-green-400" />} />
            <FeatureBullet text="Validity rate trends show personal growth over assignments" icon={<TrendingUp className="w-5 h-5 text-green-400" />} />
            <FeatureBullet text="Fairness alerts highlight specific blind spots to focus on" icon={<Target className="w-5 h-5 text-green-400" />} />
          </div>
        </div>
      </div>
    </div>
  </SlideLayout>
);

/* ═══════════════════════ ACT 4b: GRADER LEARNING & CALIBRATION ═══════════════════════ */

const DualHighlightLearningSlide = () => (
  <SlideLayout>
    <div className="absolute top-20 right-40 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[100px]" />
    <div className="absolute inset-0 flex items-center px-24">
      <div className="flex gap-16 items-center w-full">
        <div className="flex-1 max-w-[700px]">
          <SectionLabel text="Learning Tool" color="cyan" />
          <h2 className="text-[48px] font-serif font-bold text-white leading-tight mt-6">
            Dual Highlighting as a <span className="text-cyan-400">Teaching Moment</span>
          </h2>
          <p className="text-[20px] text-white/50 mt-6 leading-relaxed">
            When your blue highlights don't overlap with the AI's yellow key quotes, that gap becomes a learning signal. Over time, graders internalize what "strong evidence" looks like.
          </p>
          <div className="mt-8 space-y-4">
            <FeatureBullet text="Blue = what YOU thought was important" icon={<Eye className="w-5 h-5 text-blue-400" />} />
            <FeatureBullet text="Yellow = what the AI identified as most relevant to the criterion" icon={<Lightbulb className="w-5 h-5 text-yellow-400" />} />
            <FeatureBullet text="Overlap = strong alignment between grader and rubric intent" icon={<CheckCircle2 className="w-5 h-5 text-green-400" />} />
            <FeatureBullet text="Gap = a blind spot worth examining — not a mistake, a growth edge" icon={<Target className="w-5 h-5 text-cyan-400" />} />
          </div>
        </div>

        <div className="w-[700px] h-[520px] bg-gradient-to-br from-white/[0.06] to-white/[0.02] rounded-2xl border border-white/15 overflow-hidden flex flex-col shadow-2xl">
          <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10 bg-white/5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
              <div className="w-3 h-3 rounded-full bg-green-400/60" />
            </div>
            <span className="text-white/30 text-xs font-mono ml-3">Submission Viewer — Highlight Comparison</span>
          </div>
          <div className="flex-1 p-6 space-y-4">
            <p className="text-white/50 text-xs font-mono mb-2 uppercase tracking-wider">Evidence Use — STU003</p>
            <div className="space-y-3">
              <div className="bg-blue-500/10 border-l-4 border-blue-400 rounded-r-lg px-4 py-3">
                <p className="text-white/30 text-[10px] font-mono mb-1">YOUR HIGHLIGHT</p>
                <p className="text-white/60 text-sm italic">"Mueller & Oppenheimer (2014) showed that longhand notes improve conceptual understanding..."</p>
              </div>
              <div className="bg-yellow-500/10 border-l-4 border-yellow-400 rounded-r-lg px-4 py-3">
                <p className="text-white/30 text-[10px] font-mono mb-1">AI KEY QUOTE</p>
                <p className="text-white/60 text-sm italic">"However, the study's lab conditions may not generalize to real lecture settings, as noted by Morehead et al. (2019)..."</p>
              </div>
              <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg px-4 py-3 mt-4">
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <p className="text-white/50 text-xs leading-relaxed">
                    <span className="text-cyan-400 font-semibold">Learning insight:</span> You highlighted the supporting evidence but missed the counter-argument. For "Critical Analysis," the AI flagged the passage that challenges the student's thesis — recognizing nuance is key.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-blue-400/60" />
                <span className="text-white/30 text-[10px]">Your evidence</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-yellow-400/60" />
                <span className="text-white/30 text-[10px]">AI key quotes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-green-400/40" />
                <span className="text-white/30 text-[10px]">Overlap</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </SlideLayout>
);

const TACalibrationSlide = () => (
  <SlideLayout>
    <div className="absolute bottom-20 left-40 w-[400px] h-[400px] bg-purple-500/6 rounded-full blur-[100px]" />
    <div className="absolute inset-0 flex items-center px-24">
      <div className="flex gap-16 items-center w-full">
        <div className="w-[700px] h-[520px] bg-gradient-to-br from-white/[0.06] to-white/[0.02] rounded-2xl border border-white/15 overflow-hidden flex flex-col shadow-2xl">
          <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10 bg-white/5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
              <div className="w-3 h-3 rounded-full bg-green-400/60" />
            </div>
            <span className="text-white/30 text-xs font-mono ml-3">New TA Onboarding Journey</span>
          </div>
          <div className="flex-1 p-6">
            <p className="text-white/50 text-xs font-mono mb-4 uppercase tracking-wider">First-Time Grader Calibration</p>
            <div className="space-y-3">
              <div className="flex items-center gap-4 bg-red-500/5 border border-red-500/15 rounded-lg px-4 py-3">
                <div className="w-10 h-10 rounded-full bg-red-400/20 flex items-center justify-center text-red-400 text-sm font-bold">1</div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70 text-sm font-medium">First Essay</span>
                    <span className="text-red-400 text-sm font-bold">42%</span>
                  </div>
                  <p className="text-white/30 text-xs mt-0.5">"Good essay" — no evidence cited, vague justification</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-yellow-500/5 border border-yellow-500/15 rounded-lg px-4 py-3">
                <div className="w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400 text-sm font-bold">3</div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70 text-sm font-medium">Third Essay</span>
                    <span className="text-yellow-400 text-sm font-bold">68%</span>
                  </div>
                  <p className="text-white/30 text-xs mt-0.5">Citing passages, but missing counter-arguments</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-green-500/5 border border-green-500/15 rounded-lg px-4 py-3">
                <div className="w-10 h-10 rounded-full bg-green-400/20 flex items-center justify-center text-green-400 text-sm font-bold">5</div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70 text-sm font-medium">Fifth Essay</span>
                    <span className="text-green-400 text-sm font-bold">91%</span>
                  </div>
                  <p className="text-white/30 text-xs mt-0.5">Evidence-rich, rubric-aligned, defensible scores</p>
                </div>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-white/10">
              <p className="text-white/50 text-xs font-mono mb-2 uppercase tracking-wider">Time to Competency</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 rounded-full" style={{ width: "100%" }} />
                </div>
                <span className="text-white/40 text-xs font-mono">5 essays</span>
              </div>
              <p className="text-white/25 text-[11px] mt-2">Traditional calibration takes weeks of meetings. RubricGuard does it in one grading session.</p>
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-[700px]">
          <SectionLabel text="TA Training" color="purple" />
          <h2 className="text-[48px] font-serif font-bold text-white leading-tight mt-6">
            New TAs calibrate in <span className="text-purple-400">5 essays</span>, not 5 weeks
          </h2>
          <p className="text-[20px] text-white/50 mt-6 leading-relaxed">
            Traditional TA onboarding relies on calibration meetings, sample grading sessions, and senior oversight. RubricGuard provides instant, per-justification feedback that accelerates learning by 10×.
          </p>
          <div className="mt-8 space-y-4">
            <FeatureBullet text="Every 'Not Supported' verdict is a micro-lesson in rubric interpretation" icon={<Brain className="w-5 h-5 text-purple-400" />} />
            <FeatureBullet text="AI key quotes model what 'good evidence' looks like for each criterion" icon={<Eye className="w-5 h-5 text-purple-400" />} />
            <FeatureBullet text="Validity rate trend gives TAs a personal progress metric to track" icon={<TrendingUp className="w-5 h-5 text-purple-400" />} />
            <FeatureBullet text="Reduces supervisory burden — professors can verify TA quality remotely" icon={<UserCheck className="w-5 h-5 text-purple-400" />} />
          </div>
        </div>
      </div>
    </div>
  </SlideLayout>
);

const InstitutionalLearningSlide = () => (
  <SlideLayout bg="blue">
    <div className="absolute top-20 left-40 w-[500px] h-[500px] bg-green-500/8 rounded-full blur-[120px]" />
    <div className="absolute bottom-20 right-40 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px]" />
    <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-32">
      <SectionLabel text="Culture Shift" color="green" />
      <h2 className="text-[56px] font-serif font-bold text-white leading-tight mt-6 max-w-[1200px]">
        From grading <span className="text-red-400">anxiety</span> to grading <span className="text-green-400">mastery</span>
      </h2>
      <p className="text-[22px] text-white/40 mt-4 max-w-[900px]">
        RubricGuard transforms grading from a dreaded chore into a skill that visibly improves — with metrics to prove it.
      </p>
      <div className="grid grid-cols-3 gap-8 mt-14 max-w-[1400px]">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-7 text-left">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-red-400/10 border border-red-400/20 flex items-center justify-center">
              <Coffee className="w-6 h-6 text-red-400" />
            </div>
            <span className="text-white/60 font-semibold">Before</span>
          </div>
          <div className="space-y-3 mt-2">
            <p className="text-white/40 text-sm flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400/60 shrink-0 mt-0.5" /> "Am I being fair? I can't tell."</p>
            <p className="text-white/40 text-sm flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400/60 shrink-0 mt-0.5" /> Grading quality invisible to everyone</p>
            <p className="text-white/40 text-sm flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400/60 shrink-0 mt-0.5" /> New TAs learn by trial and error</p>
            <p className="text-white/40 text-sm flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400/60 shrink-0 mt-0.5" /> Appeals feel adversarial</p>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-7 flex flex-col items-center justify-center">
          <ArrowRight className="w-12 h-12 text-blue-400/40 mb-4" />
          <p className="text-white/50 font-serif text-2xl font-bold">RubricGuard</p>
          <p className="text-blue-400/50 text-sm mt-2 font-mono">The transformation</p>
        </div>
        <div className="bg-green-500/5 border border-green-500/20 rounded-2xl p-7 text-left">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-400/10 border border-green-400/20 flex items-center justify-center">
              <Award className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-green-400 font-semibold">After</span>
          </div>
          <div className="space-y-3 mt-2">
            <p className="text-white/50 text-sm flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-400/60 shrink-0 mt-0.5" /> "My validity rate proves I'm consistent"</p>
            <p className="text-white/50 text-sm flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-400/60 shrink-0 mt-0.5" /> Every grader's quality is measurable</p>
            <p className="text-white/50 text-sm flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-400/60 shrink-0 mt-0.5" /> TAs calibrate in one session</p>
            <p className="text-white/50 text-sm flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-400/60 shrink-0 mt-0.5" /> Evidence-backed scores end disputes</p>
          </div>
        </div>
      </div>
      <p className="text-white/20 text-sm mt-10 italic">"The best graders aren't born — they're built, one validated justification at a time."</p>
    </div>
  </SlideLayout>
);

/* ═══════════════════════ ACT 5: THE PAYOFF ═══════════════════════ */

const ValueImpactSlide = () => (
  <SlideLayout bg="blue">
    <div className="absolute top-40 right-40 w-[500px] h-[500px] bg-green-500/6 rounded-full blur-[120px]" />
    <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-32">
      <SectionLabel text="Impact" color="green" />
      <h2 className="text-[60px] font-serif font-bold text-white leading-tight mt-6">
        Measurable Impact
      </h2>
      <div className="grid grid-cols-3 gap-10 mt-14 max-w-[1400px]">
        <ValueCard icon={<Scale className="w-10 h-10" />} title="Fairness" metric="↓ 85%" desc="Reduction in cross-student scoring inconsistencies through real-time alerts" />
        <ValueCard icon={<CheckCircle2 className="w-10 h-10" />} title="Accountability" metric="100%" desc="Every score backed by evidence. Every justification validated by AI." />
        <ValueCard icon={<TrendingUp className="w-10 h-10" />} title="Efficiency" metric="↓ 40%" desc="Reduction in grade appeal disputes through transparent, defensible grading" />
      </div>
      <div className="grid grid-cols-3 gap-10 mt-8 max-w-[1400px]">
        <ValueCard icon={<GraduationCap className="w-10 h-10" />} title="Student Trust" metric="↑ 60%" desc="Improvement in perceived grading fairness and learning outcomes" />
        <ValueCard icon={<Calculator className="w-10 h-10" />} title="Quality Signal" metric="74%" desc="Explanation Validity Rate — the one metric for grading quality assurance" />
        <ValueCard icon={<Zap className="w-10 h-10" />} title="Growth" metric="54→88%" desc="Typical grader improvement over 6 weeks of AI-assisted calibration" />
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
          <p className="text-white/30 text-sm mt-1">AI validation response</p>
        </div>
        <div className="w-px h-16 bg-white/10" />
        <div className="text-center">
          <p className="text-[48px] font-serif font-bold text-cyan-400">0</p>
          <p className="text-white/30 text-sm mt-1">API keys required</p>
        </div>
        <div className="w-px h-16 bg-white/10" />
        <div className="text-center">
          <p className="text-[48px] font-serif font-bold text-cyan-400">15</p>
          <p className="text-white/30 text-sm mt-1">Students × 3 graders demo</p>
        </div>
      </div>
    </div>
  </SlideLayout>
);

const DemoFlowSlide = () => (
  <SlideLayout>
    <div className="absolute top-20 left-1/3 w-[400px] h-[400px] bg-blue-500/6 rounded-full blur-[100px]" />
    <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-32">
      <SectionLabel text="Live Demo" color="blue" />
      <h2 className="text-[52px] font-serif font-bold text-white leading-tight mt-6">
        The Flow You'll See
      </h2>
      <div className="grid grid-cols-5 gap-4 mt-14 max-w-[1600px]">
        {[
          { num: 1, icon: <BookOpen className="w-8 h-8" />, title: "Homepage", desc: "Assignment overview with progress" },
          { num: 2, icon: <ClipboardCheck className="w-8 h-8" />, title: "Grading", desc: "3-column workspace for 5 students" },
          { num: 3, icon: <Brain className="w-8 h-8" />, title: "Validate", desc: "AI checks justifications live" },
          { num: 4, icon: <BarChart3 className="w-8 h-8" />, title: "Analytics", desc: "Session report with fairness audit" },
          { num: 5, icon: <Layers className="w-8 h-8" />, title: "Segment Grades", desc: "All 15 students across 3 graders" },
        ].map((step) => (
          <div key={step.num} className="relative">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center h-full">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-blue-400/20 text-blue-400 border border-blue-400/30 flex items-center justify-center text-xs font-bold">
                {step.num}
              </div>
              <div className="text-blue-400/60 mx-auto mb-3 flex justify-center mt-2">{step.icon}</div>
              <p className="text-white/80 font-semibold text-sm">{step.title}</p>
              <p className="text-white/30 text-xs mt-1">{step.desc}</p>
            </div>
            {step.num < 5 && (
              <ArrowRight className="absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400/30 z-10" />
            )}
          </div>
        ))}
      </div>
      <p className="text-white/25 text-sm mt-10">Homepage → Grade 5 students → View Analytics → See Full Segment Grades across all graders</p>
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

/* ═══════════════════════ REUSABLE COMPONENTS ═══════════════════════ */

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

const StoryCard = ({ icon, name, section, highlight }: { icon: React.ReactNode; name: string; section: string; highlight?: boolean }) => (
  <div className={`rounded-2xl p-7 border ${highlight ? "bg-blue-500/10 border-blue-400/30" : "bg-white/5 border-white/10"}`}>
    <div className={`mb-4 ${highlight ? "text-blue-400" : "text-white/40"}`}>{icon}</div>
    <p className={`text-xl font-semibold ${highlight ? "text-blue-400" : "text-white/80"}`}>{name}</p>
    <p className="text-white/40 text-sm mt-1">{section}</p>
    {highlight && <p className="text-blue-400/50 text-xs mt-3 font-mono">← You are here</p>}
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
    {gap && <div className="pt-4 border-t border-white/10"><span className="text-red-400/70 text-xs font-mono">✗ {gap}</span></div>}
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

const CalcStep = ({ num, label, formula, example }: { num: string; label: string; formula: string; example: string }) => (
  <div className="flex items-start gap-4">
    <div className="w-8 h-8 rounded-full bg-blue-400/20 text-blue-400 border border-blue-400/30 flex items-center justify-center text-sm font-bold shrink-0">{num}</div>
    <div>
      <p className="text-white/80 font-semibold text-lg">{label}</p>
      <p className="text-blue-400/60 text-sm font-mono mt-1">{formula}</p>
      <p className="text-white/30 text-sm mt-0.5">{example}</p>
    </div>
  </div>
);

const GraderSummaryCard = ({ name, section, students, avgScore, validityRate, fairnessAlerts, highlight }: { name: string; section: string; students: number; avgScore: number; validityRate: number; fairnessAlerts: number; highlight?: boolean }) => {
  const vColor = validityRate >= 75 ? "text-green-400" : validityRate >= 50 ? "text-yellow-400" : "text-red-400";
  return (
    <div className={`rounded-2xl p-7 border ${highlight ? "bg-blue-500/10 border-blue-400/30" : "bg-white/5 border-white/10"}`}>
      <div className="flex items-center gap-3 mb-4">
        <GraduationCap className={`w-6 h-6 ${highlight ? "text-blue-400" : "text-white/40"}`} />
        <div>
          <p className={`font-semibold ${highlight ? "text-blue-400" : "text-white/80"}`}>{name}</p>
          <p className="text-white/30 text-xs">{section} · {students} students</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center"><p className="text-white font-bold text-lg">{avgScore}</p><p className="text-white/25 text-[10px]">Avg Score</p></div>
        <div className="text-center"><p className={`font-bold text-lg ${vColor}`}>{validityRate}%</p><p className="text-white/25 text-[10px]">Validity</p></div>
        <div className="text-center"><p className={`font-bold text-lg ${fairnessAlerts > 0 ? "text-red-400" : "text-green-400"}`}>{fairnessAlerts}</p><p className="text-white/25 text-[10px]">Alerts</p></div>
      </div>
      {highlight && <p className="text-blue-400/40 text-[10px] font-mono mt-3 text-center">Your section</p>}
    </div>
  );
};

const TABar = ({ name, section, rate, color }: { name: string; section: string; rate: number; color: string }) => {
  const barColor = color === "green" ? "bg-green-400" : color === "blue" ? "bg-blue-400" : "bg-orange-400";
  const textColor = color === "green" ? "text-green-400" : color === "blue" ? "text-blue-400" : "text-orange-400";
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <div>
          <span className="text-white/70 text-sm font-medium">{name}</span>
          <span className="text-white/30 text-xs ml-2">({section})</span>
        </div>
        <span className={`text-sm font-bold ${textColor}`}>{rate}%</span>
      </div>
      <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-700 ${barColor}`} style={{ width: `${rate}%` }} />
      </div>
    </div>
  );
};

const ImprovementStep = ({ week, rate, label, status }: { week: string; rate: number; label: string; status: string }) => {
  const barColor = status === "good" ? "bg-green-400" : status === "improving" ? "bg-blue-400" : "bg-orange-400";
  const textColor = status === "good" ? "text-green-400" : status === "improving" ? "text-blue-400" : "text-orange-400";
  const borderColor = status === "good" ? "border-green-400/20" : status === "improving" ? "border-blue-400/20" : "border-orange-400/20";
  return (
    <div className={`border ${borderColor} rounded-lg px-4 py-3 bg-white/[0.02]`}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-white/50 text-xs font-mono font-semibold">{week}</span>
        <span className={`text-sm font-bold ${textColor}`}>{rate}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-2">
        <div className={`h-full rounded-full ${barColor}`} style={{ width: `${rate}%` }} />
      </div>
      <p className="text-white/35 text-[11px] leading-relaxed">{label}</p>
    </div>
  );
};

export default Presentation;
