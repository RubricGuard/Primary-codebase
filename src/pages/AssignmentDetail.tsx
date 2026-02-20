import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, BookOpen, Calendar, Users, FileText, ClipboardCheck, ArrowRight, GraduationCap } from "lucide-react";
import { assignments, rubricCriteria, studentSubmissions } from "@/lib/mockData";

const AssignmentDetail = () => {
  const navigate = useNavigate();
  const assignment = assignments[0];

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/80 to-slate-950" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-blue-500/15 via-indigo-500/8 to-transparent rounded-full blur-3xl" />

      {/* Header */}
      <header className="relative z-10 border-b border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/")} className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white/80 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Dashboard
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
        {/* Title */}
        <div className="mb-10 animate-fade-in">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-400/80 font-medium">{assignment.course}</span>
          </div>
          <h1 className="font-serif text-3xl font-semibold text-white mb-4">{assignment.title}</h1>
          <div className="text-white/45 leading-relaxed max-w-2xl space-y-3">
            {assignment.description.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        {/* Date & Info Cards */}
        <div className="grid grid-cols-2 gap-4 mb-10 animate-fade-in" style={{ animationDelay: "0.05s" }}>
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-medium text-white/50 uppercase tracking-wide">Assigned</span>
            </div>
            <p className="text-lg font-semibold text-white">{assignment.assignedDate}</p>
          </div>
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-medium text-white/50 uppercase tracking-wide">Due Date</span>
            </div>
            <p className="text-lg font-semibold text-white">{assignment.dueDate}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          {[
            { icon: FileText, label: "Submissions", value: assignment.totalSubmissions },
            { icon: Users, label: "Sections", value: assignment.sections.length },
            { icon: ClipboardCheck, label: "Rubric Criteria", value: assignment.rubricCriteria },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-5">
              <Icon className="w-4 h-4 text-blue-400/70 mb-2" />
              <p className="text-2xl font-semibold text-white">{value}</p>
              <p className="text-xs text-white/40 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Sections */}
        <div className="mb-10 animate-fade-in" style={{ animationDelay: "0.15s" }}>
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wide mb-4">Sections</h2>
          <div className="space-y-2">
            {assignment.sections.map((section) => (
              <div key={section} className="bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-3 flex items-center gap-3">
                <GraduationCap className="w-4 h-4 text-blue-400/60" />
                <span className="text-sm text-white/70">{section}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Submissions Preview */}
        <div className="mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wide mb-4">Recent Submissions</h2>
          <div className="space-y-2">
            {studentSubmissions.slice(0, 3).map((s) => (
              <div key={s.id} className="bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xs font-semibold text-blue-400">
                    {s.id.slice(-2)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/80">{s.name}</p>
                    <p className="text-[11px] text-white/35">{s.submittedAt} · {s.section}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 animate-fade-in" style={{ animationDelay: "0.25s" }}>
          <button
            onClick={() => navigate("/grading/bus302-ca1")}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl px-6 py-3 font-medium text-sm hover:from-blue-400 hover:to-indigo-400 transition-all duration-300 shadow-lg shadow-blue-500/20"
          >
            Begin Grading
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate("/rubrics")}
            className="flex items-center gap-2 bg-white/[0.06] border border-white/[0.1] text-white/80 rounded-xl px-6 py-3 font-medium text-sm hover:bg-white/[0.1] transition-all duration-200"
          >
            <ClipboardCheck className="w-4 h-4" />
            View Rubrics
          </button>
        </div>
      </main>
    </div>
  );
};

export default AssignmentDetail;
