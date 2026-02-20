import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, ClipboardCheck, ArrowRight } from "lucide-react";
import { rubricCriteria } from "@/lib/mockData";

const Rubrics = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/80 to-slate-950" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-blue-500/15 via-indigo-500/8 to-transparent rounded-full blur-3xl" />

      {/* Header */}
      <header className="relative z-10 border-b border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white/80 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <div className="w-px h-5 bg-white/10" />
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" strokeWidth={1.5} />
              <span className="font-semibold text-white">RubricGuard <span className="text-blue-400">AI</span></span>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 max-w-4xl mx-auto w-full px-8 py-12">
        <div className="mb-10 animate-fade-in">
          <div className="flex items-center gap-2 mb-3">
            <ClipboardCheck className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-blue-400/80 font-medium">BUS302 — Strategic Management</span>
          </div>
          <h1 className="font-serif text-3xl font-semibold text-white mb-2">Grading Rubric</h1>
          <p className="text-white/45">Case Analysis 1: Strategic Pivot — Total: 100 points</p>
        </div>

        {/* Rubric Cards */}
        <div className="space-y-4 mb-12">
          {rubricCriteria.map((criterion, i) => (
            <div
              key={criterion.id}
              className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-6 animate-fade-in hover:border-white/[0.14] transition-all duration-200"
              style={{ animationDelay: `${0.05 + i * 0.05}s` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-sm font-bold text-blue-400">
                    {i + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-white">{criterion.name}</h3>
                </div>
                <span className="text-sm font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-lg px-3 py-1">
                  {criterion.maxScore} pts
                </span>
              </div>
              <p className="text-sm text-white/50 leading-relaxed ml-11">{criterion.description}</p>

              {/* Scoring guide */}
              <div className="mt-4 ml-11 grid grid-cols-4 gap-2">
                {[
                  { level: "Excellent", color: "emerald", range: `${criterion.maxScore - 2}–${criterion.maxScore}`, desc: criterion.scoringGuide?.excellent },
                  { level: "Good", color: "blue", range: `${criterion.maxScore - 7}–${criterion.maxScore - 3}`, desc: criterion.scoringGuide?.good },
                  { level: "Adequate", color: "amber", range: `${criterion.maxScore - 13}–${criterion.maxScore - 8}`, desc: criterion.scoringGuide?.adequate },
                  { level: "Needs Work", color: "red", range: `0–${criterion.maxScore - 14}`, desc: criterion.scoringGuide?.needsWork },
                ].map(({ range, level, color, desc }) => (
                  <div key={level} className="bg-white/[0.02] border border-white/[0.05] rounded-lg px-3 py-2.5">
                    <p className={`text-xs font-semibold ${
                      color === "emerald" ? "text-emerald-400" :
                      color === "blue" ? "text-blue-400" :
                      color === "amber" ? "text-amber-400" : "text-red-400"
                    }`}>{level}</p>
                    <p className="text-[11px] text-white/30 mt-0.5 mb-1.5">{range}</p>
                    {desc && (
                      <p className="text-[11px] text-white/45 leading-relaxed">{desc}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <button
            onClick={() => navigate("/grading/bus302-ca1")}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl px-6 py-3 font-medium text-sm hover:from-blue-400 hover:to-indigo-400 transition-all duration-300 shadow-lg shadow-blue-500/20"
          >
            Begin Grading
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default Rubrics;
