import { useNavigate } from "react-router-dom";
import { ChevronRight, Shield, BookOpen, Users, BarChart3, ClipboardCheck, Calendar, GraduationCap, Zap, TrendingUp, Eye, FileText } from "lucide-react";
import { assignments } from "@/lib/mockData";

const Homepage = () => {
  const navigate = useNavigate();
  const assignment = assignments[0];

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-slate-950">
      {/* Layered gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/80 to-slate-950" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-b from-blue-500/20 via-indigo-500/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-gradient-to-tl from-violet-600/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-1/4 left-0 w-[300px] h-[300px] bg-gradient-to-r from-cyan-500/8 to-transparent rounded-full blur-3xl" />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      {/* Header */}
      <header className="relative z-10 border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Shield className="w-4.5 h-4.5 text-white" strokeWidth={2} />
            </div>
            <h1 className="text-lg font-semibold tracking-tight text-white">
              RubricGuard <span className="text-blue-400">AI</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400/20 to-indigo-500/20 border border-white/10 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-blue-300" />
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-white/90">Prof. Sharma</p>
              <p className="text-[11px] text-white/40">Strategic Management</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 flex flex-col items-center px-6 pt-16 pb-16">
        {/* Hero */}
        <div className="max-w-xl w-full text-center mb-10 animate-fade-in">
          <h2 className="font-serif text-5xl font-semibold text-white leading-[1.15] mb-5 tracking-tight">
            Grade with
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent"> confidence</span>
          </h2>
          <p className="text-white/45 text-lg leading-relaxed max-w-lg mx-auto">
            Select an assignment to begin. Real-time alignment analytics ensure every score is consistent and defensible.
          </p>

          {/* Feature highlights */}
          <div className="grid grid-cols-3 gap-3 mt-8">
            {[
              { icon: TrendingUp, label: "Drift Detection", desc: "Cross-section" },
              { icon: Eye, label: "Live Validation", desc: "Real-time" },
              { icon: Zap, label: "AI Insights", desc: "Per criterion" },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-3.5 text-center">
                <Icon className="w-4 h-4 text-blue-400/70 mb-2 mx-auto" />
                <p className="text-xs font-medium text-white/70">{label}</p>
                <p className="text-[10px] text-white/30">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Assignment Card */}
        <div className="max-w-xl w-full rounded-2xl text-left animate-fade-in relative mb-8" style={{ animationDelay: "0.05s" }}>
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-white/[0.12] to-white/[0.04] pointer-events-none" />

          <div className="relative bg-white/[0.04] backdrop-blur-sm rounded-2xl border border-white/[0.08] p-7">
            {/* Top row */}
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-blue-400/80 font-medium">{assignment.course}</p>
                  <h3 className="font-serif text-lg font-semibold text-white mt-0.5">
                    {assignment.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* Dates Row */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[10px] font-medium text-white/40 uppercase tracking-wider">Assigned</span>
                </div>
                <p className="text-sm font-semibold text-white/90">{assignment.assignedDate}</p>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[10px] font-medium text-white/40 uppercase tracking-wider">Due Date</span>
                </div>
                <p className="text-sm font-semibold text-white/90">{assignment.dueDate}</p>
              </div>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-5 text-sm text-white/40 mb-5">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                {assignment.sections.length} sections
              </span>
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                {assignment.totalSubmissions} submissions
              </span>
              <span className="flex items-center gap-1.5">
                <ClipboardCheck className="w-3.5 h-3.5" />
                {assignment.rubricCriteria} criteria
              </span>
            </div>

            {/* Progress */}
            <div className="flex items-center justify-between text-sm mb-2.5">
              <span className="text-white/35 text-xs">Progress</span>
              <span className="text-xs font-medium text-white/60">
                {assignment.gradedCount} of {assignment.totalSubmissions}
              </span>
            </div>
            <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
                style={{ width: `${Math.max((assignment.gradedCount / assignment.totalSubmissions) * 100, 1.5)}%` }}
              />
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-4 gap-3">
              <button
                onClick={() => navigate("/submissions/bus302-ca1")}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl py-3 font-medium text-sm hover:from-blue-400 hover:to-indigo-400 transition-all duration-300 shadow-lg shadow-blue-500/20"
              >
                Submissions
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate("/assignment/bus302-ca1")}
                className="flex items-center justify-center gap-2 bg-white/[0.06] border border-white/[0.1] text-white/80 rounded-xl py-3 font-medium text-sm hover:bg-white/[0.1] transition-all duration-200"
              >
                <FileText className="w-4 h-4" />
                Assignment
              </button>
              <button
                onClick={() => navigate("/rubrics")}
                className="flex items-center justify-center gap-2 bg-white/[0.06] border border-white/[0.1] text-white/80 rounded-xl py-3 font-medium text-sm hover:bg-white/[0.1] transition-all duration-200"
              >
                <ClipboardCheck className="w-4 h-4" />
                Rubrics
              </button>
              <button
                onClick={() => navigate("/analytics")}
                className="flex items-center justify-center gap-2 bg-white/[0.06] border border-white/[0.1] text-white/80 rounded-xl py-3 font-medium text-sm hover:bg-white/[0.1] transition-all duration-200"
              >
                <BarChart3 className="w-4 h-4" />
                Analytics
              </button>
            </div>
          </div>
        </div>

        {/* Dummy Assignment Card */}
        <div className="max-w-xl w-full rounded-2xl text-left animate-fade-in relative mb-8 opacity-60" style={{ animationDelay: "0.1s" }}>
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] pointer-events-none" />
          <div className="relative bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/[0.06] p-7">
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-violet-400" />
                </div>
                <div>
                  <p className="text-xs text-violet-400/80 font-medium">BUS405 — Organizational Behavior</p>
                  <h3 className="font-serif text-lg font-semibold text-white mt-0.5">
                    Case Study: Leadership Styles in Crisis Management
                  </h3>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[10px] font-medium text-white/40 uppercase tracking-wider">Assigned</span>
                </div>
                <p className="text-sm font-semibold text-white/90">Feb 24, 2026</p>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[10px] font-medium text-white/40 uppercase tracking-wider">Due Date</span>
                </div>
                <p className="text-sm font-semibold text-white/90">Mar 6, 2026</p>
              </div>
            </div>

            <div className="flex items-center gap-5 text-sm text-white/40 mb-5">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                2 sections
              </span>
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                10 submissions
              </span>
              <span className="flex items-center gap-1.5">
                <ClipboardCheck className="w-3.5 h-3.5" />
                5 criteria
              </span>
            </div>

            <div className="flex items-center justify-between text-sm mb-2.5">
              <span className="text-white/35 text-xs">Progress</span>
              <span className="text-xs font-medium text-white/60">0 of 10</span>
            </div>
            <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden mb-6">
              <div className="h-full bg-gradient-to-r from-violet-500 to-purple-400 rounded-full" style={{ width: "1.5%" }} />
            </div>

            <div className="flex items-center justify-center py-2">
              <span className="text-xs text-white/30 italic">Submissions not yet due</span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-8 text-[13px] text-white/25 max-w-sm text-center leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Final grading authority remains with the professor. AI provides alignment support only.
        </p>
      </main>
    </div>
  );
};

export default Homepage;
