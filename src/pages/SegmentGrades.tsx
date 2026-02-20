import { useNavigate } from "react-router-dom";
import { Shield, ArrowLeft, Users, BarChart3, AlertTriangle, CheckCircle2, TrendingUp, Scale, GraduationCap } from "lucide-react";
import { studentSubmissions, rubricCriteria, sampleGradedData, type GradingScore, type ValidationStatus } from "@/lib/mockData";

// Grader definitions
const graders = [
  { id: "section-a", name: "Prof. Sharma", section: "Section A", role: "Professor" },
  { id: "section-b", name: "TA: M. Chen", section: "Section B", role: "Teaching Assistant" },
  { id: "section-c", name: "TA: R. Patel", section: "Section C", role: "Teaching Assistant" },
];

const AI_SIMILARITY_THRESHOLD = 2;
const SCORE_DIFF_THRESHOLD = 1.5;

// Group students by section
const studentsBySection = graders.map((g) => {
  const students = studentSubmissions.filter((s) => s.section === g.section);
  return { ...g, students };
});

// Compute per-grader analytics
const graderAnalytics = studentsBySection.map((g) => {
  const studentScores = g.students.map((s) => {
    const scores = sampleGradedData[s.id] || [];
    const total = scores.reduce((sum, sc) => sum + (sc.score || 0), 0);
    return { id: s.id, scores, total };
  });

  const maxTotal = rubricCriteria.reduce((sum, c) => sum + c.maxScore, 0);
  const avgScore = studentScores.length > 0
    ? studentScores.reduce((sum, s) => sum + s.total, 0) / studentScores.length
    : 0;

  // Explanation validity rate
  let totalValidated = 0;
  let fullySupported = 0;
  studentScores.forEach((s) => {
    s.scores.forEach((sc) => {
      if (sc.validationStatus) {
        totalValidated++;
        if (sc.validationStatus === "fully_supported") fullySupported++;
      }
    });
  });
  const validityRate = totalValidated > 0 ? Math.round((fullySupported / totalValidated) * 100) : 100;

  // Fairness alerts (within this grader's students)
  let fairnessAlerts = 0;
  rubricCriteria.forEach((c) => {
    const studs = studentScores
      .map((s) => {
        const sc = s.scores.find((x) => x.criterionId === c.id);
        if (!sc || sc.score == null || sc.aiSuggestedScore == null) return null;
        return { id: s.id, score: sc.score, aiScore: sc.aiSuggestedScore };
      })
      .filter(Boolean) as { id: string; score: number; aiScore: number }[];

    for (let i = 0; i < studs.length; i++) {
      for (let j = i + 1; j < studs.length; j++) {
        const aiDiff = Math.abs(studs[i].aiScore - studs[j].aiScore);
        const scoreDiff = Math.abs(studs[i].score - studs[j].score);
        if (aiDiff <= AI_SIMILARITY_THRESHOLD && scoreDiff > SCORE_DIFF_THRESHOLD) {
          fairnessAlerts++;
        }
      }
    }
  });

  // Validation breakdown
  const validationCounts = { fully_supported: 0, partially_supported: 0, not_supported: 0 };
  studentScores.forEach((s) => {
    s.scores.forEach((sc) => {
      if (sc.validationStatus === "fully_supported") validationCounts.fully_supported++;
      else if (sc.validationStatus === "partially_supported") validationCounts.partially_supported++;
      else if (sc.validationStatus === "not_supported") validationCounts.not_supported++;
    });
  });

  return {
    ...g,
    studentScores,
    avgScore,
    maxTotal,
    validityRate,
    fairnessAlerts,
    validationCounts,
    totalValidated,
  };
});

const SegmentGrades = () => {
  const navigate = useNavigate();
  const maxTotal = rubricCriteria.reduce((sum, c) => sum + c.maxScore, 0);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-secondary/30 to-primary/5" />
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-primary/8 via-transparent to-transparent rounded-full blur-3xl" />

      {/* Header */}
      <header className="relative z-10 border-b border-border/40 bg-card/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/analytics")}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Analytics
            </button>
            <div className="w-px h-5 bg-border/60" />
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" strokeWidth={1.5} />
              <span className="font-serif font-semibold text-foreground">RubricGuard AI</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Users className="w-3.5 h-3.5" />
            <span>Full Segment Grades</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        {/* Title */}
        <div className="mb-10 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-1 w-8 rounded-full bg-primary" />
            <span className="text-xs font-medium text-primary uppercase tracking-widest">Segment Overview</span>
          </div>
          <h1 className="font-serif text-3xl font-semibold text-foreground mb-1.5">
            Full Segment Grades
          </h1>
          <p className="text-muted-foreground">
            BUS302 — 15 students across 3 graders · 4 rubric criteria · 100 points total
          </p>
        </div>

        {/* Per-Grader Summary Cards */}
        <div className="grid grid-cols-3 gap-5 mb-10 animate-fade-in" style={{ animationDelay: "0.05s" }}>
          {graderAnalytics.map((g) => {
            const validityColor = g.validityRate >= 75 ? "text-success" : g.validityRate >= 50 ? "text-warning" : "text-destructive";
            const validityBg = g.validityRate >= 75 ? "bg-success/10" : g.validityRate >= 50 ? "bg-warning/10" : "bg-destructive/10";
            return (
              <div key={g.id} className="glass-panel rounded-2xl shadow-soft-lg p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{g.name}</p>
                    <p className="text-[11px] text-muted-foreground">{g.section} · {g.role}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-muted/20 rounded-xl p-3 border border-border/30">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium mb-1">Avg Score</p>
                    <p className="text-xl font-serif font-semibold text-foreground">
                      {g.avgScore.toFixed(1)}
                      <span className="text-xs font-normal text-muted-foreground">/{g.maxTotal}</span>
                    </p>
                  </div>
                  <div className={`rounded-xl p-3 border border-border/30 ${validityBg}`}>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium mb-1">Validity Rate</p>
                    <p className={`text-xl font-serif font-semibold ${validityColor}`}>
                      {g.validityRate}%
                    </p>
                  </div>
                  <div className="bg-muted/20 rounded-xl p-3 border border-border/30">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium mb-1">Students</p>
                    <p className="text-xl font-serif font-semibold text-foreground">{g.students.length}</p>
                  </div>
                  <div className={`rounded-xl p-3 border border-border/30 ${g.fairnessAlerts > 0 ? "bg-destructive/5" : "bg-muted/20"}`}>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium mb-1">Fairness Alerts</p>
                    <p className={`text-xl font-serif font-semibold ${g.fairnessAlerts > 0 ? "text-destructive" : "text-foreground"}`}>
                      {g.fairnessAlerts}
                    </p>
                  </div>
                </div>

                {/* Validation breakdown */}
                <div className="mt-3 pt-3 border-t border-border/30">
                  <div className="flex items-center gap-3 text-[10px]">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-success" />
                      <span className="text-muted-foreground">{g.validationCounts.fully_supported}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-warning" />
                      <span className="text-muted-foreground">{g.validationCounts.partially_supported}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-destructive" />
                      <span className="text-muted-foreground">{g.validationCounts.not_supported}</span>
                    </span>
                    <span className="text-muted-foreground/50 ml-auto">{g.totalValidated} validated</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Per-Grader Student Tables */}
        {graderAnalytics.map((g, gIdx) => (
          <div key={g.id} className="glass-panel rounded-2xl shadow-soft-lg p-6 mb-8 animate-fade-in" style={{ animationDelay: `${0.1 + gIdx * 0.05}s` }}>
            <div className="flex items-center gap-3 mb-5">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                g.validityRate >= 75 ? "bg-success/10 text-success" : g.validityRate >= 50 ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"
              }`}>
                {g.validityRate >= 75 ? <CheckCircle2 className="w-4 h-4" /> : g.validityRate >= 50 ? <TrendingUp className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
              </div>
              <div>
                <h3 className="font-serif font-semibold text-foreground">{g.name}</h3>
                <p className="text-xs text-muted-foreground">{g.section} · {g.students.length} students · Avg: {g.avgScore.toFixed(1)}/{g.maxTotal}</p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                {g.fairnessAlerts > 0 && (
                  <span className="flex items-center gap-1 text-xs font-semibold text-destructive bg-destructive/10 rounded-full px-2.5 py-1">
                    <Scale className="w-3 h-3" />
                    {g.fairnessAlerts} alert{g.fairnessAlerts > 1 ? "s" : ""}
                  </span>
                )}
                <span className={`text-xs font-semibold rounded-full px-2.5 py-1 ${
                  g.validityRate >= 75 ? "text-success bg-success/10" : g.validityRate >= 50 ? "text-warning bg-warning/10" : "text-destructive bg-destructive/10"
                }`}>
                  {g.validityRate}% validity
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40">
                    <th className="text-left text-xs font-medium text-muted-foreground py-2.5 pr-4">Student</th>
                    {rubricCriteria.map((c) => (
                      <th key={c.id} className="text-center text-xs font-medium text-muted-foreground py-2.5 px-3">
                        {c.name.replace("Argument ", "Arg. ").replace("Evidence Use", "Evidence").replace("Critical Analysis", "Analysis").replace("Writing Quality", "Writing")}
                      </th>
                    ))}
                    <th className="text-center text-xs font-medium text-muted-foreground py-2.5 px-3">Total</th>
                    <th className="text-center text-xs font-medium text-muted-foreground py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {g.studentScores.map((s) => (
                    <tr key={s.id} className="border-b border-border/20 last:border-0 hover:bg-muted/10 transition-colors">
                      <td className="text-xs font-medium text-foreground py-3 pr-4">{s.id}</td>
                      {rubricCriteria.map((c) => {
                        const sc = s.scores.find((x) => x.criterionId === c.id);
                        const score = sc?.score ?? 0;
                        const pct = score / c.maxScore;
                        const bg = pct >= 0.9
                          ? "bg-success/15 text-success"
                          : pct >= 0.75
                          ? "bg-primary/10 text-primary"
                          : pct >= 0.5
                          ? "bg-warning/15 text-warning"
                          : "bg-destructive/10 text-destructive";
                        return (
                          <td key={c.id} className="text-center py-3 px-3">
                            <span className={`inline-block text-xs font-bold rounded-md px-2 py-1 min-w-[36px] ${bg}`}>
                              {score}
                            </span>
                          </td>
                        );
                      })}
                      <td className="text-center py-3 px-3">
                        <span className="text-sm font-bold text-foreground">{s.total}</span>
                        <span className="text-xs text-muted-foreground">/{maxTotal}</span>
                      </td>
                      <td className="text-center py-3 px-3">
                        <ValidationDots scores={s.scores} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {/* Back to Dashboard */}
        <div className="flex justify-center pb-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <button
            onClick={() => navigate("/")}
            className="group relative flex items-center gap-2.5 bg-gradient-to-r from-primary to-primary/85 text-primary-foreground font-semibold text-base rounded-2xl px-10 py-4 shadow-soft-lg hover:shadow-[0_8px_30px_-6px_hsl(217_91%_60%_/_0.4)] transition-all duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/10 to-primary/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            <CheckCircle2 className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Back to Dashboard</span>
          </button>
        </div>
      </main>
    </div>
  );
};

const ValidationDots = ({ scores }: { scores: GradingScore[] }) => {
  return (
    <div className="flex items-center justify-center gap-1">
      {scores.map((sc, i) => {
        const color = sc.validationStatus === "fully_supported"
          ? "bg-success"
          : sc.validationStatus === "partially_supported"
          ? "bg-warning"
          : sc.validationStatus === "not_supported"
          ? "bg-destructive"
          : "bg-muted-foreground/30";
        return <span key={i} className={`w-2 h-2 rounded-full ${color}`} />;
      })}
    </div>
  );
};

export default SegmentGrades;
