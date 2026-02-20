import { useNavigate } from "react-router-dom";
import { ArrowRight, Shield, BookOpen, Users, BarChart3, ClipboardCheck, Calendar, GraduationCap, Zap, TrendingUp, Eye } from "lucide-react";
import { assignments } from "@/lib/mockData";

const Dashboard = () => {
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
      <main className="relative z-10 flex-1 flex flex-col items-center px-6 pt-20 pb-16">
        {/* Hero */}
        <div className="max-w-2xl w-full text-center mb-16 animate-fade-in">
          <h2 className="font-serif text-5xl font-semibold text-white leading-[1.15] mb-5 tracking-tight">
            Grade with
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent"> confidence</span>
          </h2>
          <p className="text-white/45 text-lg leading-relaxed max-w-lg mx-auto">
            Select an assignment to begin. Real-time alignment analytics ensure every score is consistent and defensible.
          </p>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-8 mb-14 animate-fade-in" style={{ animationDelay: "0.05s" }}>
          {[
            { value: "48", label: "Submissions", icon: ClipboardCheck },
            { value: "3", label: "Sections", icon: Users },
            { value: "4", label: "Criteria", icon: BarChart3 },
          ].map(({ value, label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                <Icon className="w-4.5 h-4.5 text-blue-400" />
              </div>
              <div>
                <p className="text-xl font-semibold text-white">{value}</p>
                <p className="text-xs text-white/35">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Assignment Card */}
        <button
          onClick={() => navigate("/grading/bus302-ca1")}
          className="group max-w-xl w-full rounded-2xl text-left animate-fade-in relative"
          style={{ animationDelay: "0.1s" }}
        >
          {/* Card glow */}
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-white/[0.12] to-white/[0.04] pointer-events-none" />
          <div className="absolute -inset-1 rounded-2xl bg-blue-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="relative bg-white/[0.04] backdrop-blur-sm rounded-2xl border border-white/[0.08] p-7 group-hover:border-white/[0.15] transition-all duration-300">
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
              <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:bg-blue-500/20 group-hover:border-blue-500/30 transition-all duration-300">
                <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-blue-300 group-hover:translate-x-0.5 transition-all duration-200" />
              </div>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-5 text-sm text-white/40 mb-6">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {assignment.dueDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                {assignment.sections.length} sections
              </span>
              <span className="flex items-center gap-1.5">
                <ClipboardCheck className="w-3.5 h-3.5" />
                {assignment.rubricCriteria} criteria
              </span>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { icon: TrendingUp, label: "Drift Detection", desc: "Cross-section" },
                { icon: Eye, label: "Live Validation", desc: "Real-time" },
                { icon: Zap, label: "AI Insights", desc: "Per criterion" },
              ].map(({ icon: Icon, label, desc }) => (
                <div key={label} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3">
                  <Icon className="w-4 h-4 text-blue-400/70 mb-2" />
                  <p className="text-xs font-medium text-white/70">{label}</p>
                  <p className="text-[10px] text-white/30">{desc}</p>
                </div>
              ))}
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

            {/* CTA */}
            <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl py-3 font-medium text-sm group-hover:from-blue-400 group-hover:to-indigo-400 transition-all duration-300 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/30">
              Begin Grading Session
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </button>

        {/* Disclaimer */}
        <p className="mt-14 text-[13px] text-white/25 max-w-sm text-center leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Final grading authority remains with the professor. AI provides alignment support only.
        </p>
      </main>
    </div>
  );
};

export default Dashboard;
