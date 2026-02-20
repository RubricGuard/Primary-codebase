import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, BookOpen, Clock, FileText, ChevronRight, Users } from "lucide-react";
import { assignments, studentSubmissions } from "@/lib/mockData";

const Submissions = () => {
  const navigate = useNavigate();
  const assignment = assignments[0];
  const sharmaSubmissions = studentSubmissions.filter(s => s.section === "Section A");

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/80 to-slate-950" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-blue-500/15 via-indigo-500/8 to-transparent rounded-full blur-3xl" />

      {/* Header */}
      <header className="relative z-10 border-b border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/assignment/bus302-ca1")} className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white/80 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Assignment
            </button>
            <div className="w-px h-5 bg-white/10" />
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" strokeWidth={1.5} />
              <span className="font-semibold text-white">Rubric<span className="text-blue-400">Guard</span> <span className="text-white">AI</span></span>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 max-w-4xl mx-auto w-full px-8 py-12">
        {/* Title */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-400/80 font-medium">{assignment.course}</span>
          </div>
          <h1 className="font-serif text-2xl font-semibold text-white mb-1">Submissions</h1>
          <p className="text-sm text-white/40">Prof. Sharma — Section A</p>
        </div>

        {/* Summary */}
        <div className="flex items-center gap-6 mb-8 animate-fade-in" style={{ animationDelay: "0.05s" }}>
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <FileText className="w-4 h-4" />
            <span>{sharmaSubmissions.length} submissions</span>
          </div>
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <Users className="w-4 h-4" />
            <span>Section A</span>
          </div>
        </div>

        {/* Submissions List */}
        <div className="space-y-2 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          {sharmaSubmissions.map((s, i) => (
            <button
              key={s.id}
              onClick={() => navigate(`/grading/bus302-ca1?student=${i}`)}
              className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-5 py-4 flex items-center justify-between hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-200 group text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xs font-semibold text-blue-400">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">{s.name}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3 h-3 text-white/30" />
                    <span className="text-[11px] text-white/35">{s.submittedAt}</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" />
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-10 animate-fade-in" style={{ animationDelay: "0.15s" }}>
          <button
            onClick={() => navigate("/grading/bus302-ca1")}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl px-6 py-3 font-medium text-sm hover:from-blue-400 hover:to-indigo-400 transition-all duration-300 shadow-lg shadow-blue-500/20"
          >
            Start Grading All
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default Submissions;
