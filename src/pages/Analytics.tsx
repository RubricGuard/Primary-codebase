import { useNavigate } from "react-router-dom";
import { Shield, ArrowLeft, FileCheck, TrendingUp, Sparkles, CheckCircle, Scale, AlertTriangle, BarChart3, Target } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { studentSubmissions, rubricCriteria, sampleGradedData } from "@/lib/mockData";

// ── Only show the 5 students graded in this session (STU001–STU005) ──
const gradedStudentIds = ["STU001", "STU002", "STU003", "STU004", "STU005"];
const gradedSubmissions = studentSubmissions.filter((s) => gradedStudentIds.includes(s.id));

const studentTotals = gradedSubmissions.map((s) => {
  const scores = sampleGradedData[s.id] || [];
  const total = scores.reduce((sum, sc) => sum + (sc.score || 0), 0);
  return { id: s.id, total };
});

const allTotals = studentTotals.map((s) => s.total).sort((a, b) => a - b);

const mean = allTotals.length > 0 ? allTotals.reduce((a, b) => a + b, 0) / allTotals.length : 0;

const median = (() => {
  if (allTotals.length === 0) return 0;
  const mid = Math.floor(allTotals.length / 2);
  return allTotals.length % 2 !== 0 ? allTotals[mid] : (allTotals[mid - 1] + allTotals[mid]) / 2;
})();

const quartile = (arr: number[], q: number) => {
  if (arr.length === 0) return 0;
  const pos = (arr.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  return arr[base + 1] !== undefined ? arr[base] + rest * (arr[base + 1] - arr[base]) : arr[base];
};

const q1 = quartile(allTotals, 0.25);
const q3 = quartile(allTotals, 0.75);

interface FairnessFlag {
  criterionName: string;
  maxScore: number;
  studentA: { id: string; score: number; aiScore: number };
  studentB: { id: string; score: number; aiScore: number };
  scoreDiff: number;
}

const AI_SIMILARITY_THRESHOLD = 2;
const SCORE_DIFF_THRESHOLD = 1.5;

const fairnessFlags: FairnessFlag[] = (() => {
  const flags: FairnessFlag[] = [];
  rubricCriteria.forEach((c) => {
    const students = Object.entries(sampleGradedData)
      .filter(([id]) => gradedStudentIds.includes(id))
      .map(([id, scores]) => {
        const s = scores.find((sc) => sc.criterionId === c.id);
        if (!s || s.score == null || s.aiSuggestedScore == null) return null;
        return { id, score: s.score, aiScore: s.aiSuggestedScore };
      })
      .filter(Boolean) as { id: string; score: number; aiScore: number }[];

    for (let i = 0; i < students.length; i++) {
      for (let j = i + 1; j < students.length; j++) {
        const a = students[i], b = students[j];
        const aiDiff = Math.abs(a.aiScore - b.aiScore);
        const scoreDiff = Math.abs(a.score - b.score);

        if (aiDiff <= AI_SIMILARITY_THRESHOLD && scoreDiff > SCORE_DIFF_THRESHOLD) {
          flags.push({
            criterionName: c.name,
            maxScore: c.maxScore,
            studentA: a.score >= b.score ? a : b,
            studentB: a.score >= b.score ? b : a,
            scoreDiff: parseFloat(scoreDiff.toFixed(1)),
          });
        }
      }
    }
  });
  return flags;
})();

const scoreTimeline = studentTotals.map((s) => ({ submission: s.id, score: s.total }));

const criterionStability = rubricCriteria.map((c) => {
  const scores = gradedStudentIds
    .map((id) => sampleGradedData[id]?.find((s) => s.criterionId === c.id)?.score)
    .filter((s) => s != null) as number[];
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  const variance = Math.sqrt(scores.reduce((sum, s) => sum + (s - avg) ** 2, 0) / scores.length);
  return { criterion: c.name.replace("Argument ", "Arg. ").replace("Evidence Use", "Evidence").replace("Critical Analysis", "Analysis").replace("Writing Quality", "Writing"), variance: parseFloat(variance.toFixed(1)) };
});

const maxTotal = rubricCriteria.reduce((sum, c) => sum + c.maxScore, 0);

// Per-student per-criterion data for the heatmap
const heatmapData = rubricCriteria.map((c) => {
  const row: Record<string, any> = { criterion: c.name.replace("Argument ", "Arg. ").replace("Evidence Use", "Evidence").replace("Critical Analysis", "Analysis").replace("Writing Quality", "Writing") };
  studentTotals.forEach((s) => {
    const scores = sampleGradedData[s.id] || [];
    const sc = scores.find((x) => x.criterionId === c.id);
    row[s.id] = sc?.score ?? 0;
  });
  return row;
});

const Analytics = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with layered gradients + blue tinge */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-primary/[0.06] to-primary/[0.12]" />
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-primary/15 via-primary/5 to-transparent rounded-full blur-3xl" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-primary/8 via-transparent to-transparent rounded-full blur-3xl" />
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-primary/[0.04] to-transparent rounded-full blur-3xl" />

      {/* Header */}
      <header className="relative z-10 border-b border-border/40 bg-card/70 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <div className="w-px h-5 bg-border/60" />
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" strokeWidth={1.5} />
              <span className="font-serif font-semibold text-foreground">RubricGuard AI</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Session Report</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        {/* Hero Title */}
        <div className="mb-10 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-1 w-8 rounded-full bg-primary" />
            <span className="text-xs font-medium text-primary uppercase tracking-widest">Analytics</span>
          </div>
          <h1 className="font-serif text-3xl font-semibold text-foreground mb-1.5">
            Grading Session Report
          </h1>
          <p className="text-muted-foreground">
            Case Analysis 1 — BUS302 Strategic Management
          </p>
        </div>

        {/* Metric Cards — glass style */}
        <div className="grid grid-cols-3 gap-5 mb-10 animate-fade-in" style={{ animationDelay: "0.08s" }}>
          <MetricCard
            icon={<FileCheck className="w-5 h-5" />}
            label="Submissions Graded"
            value={`${studentTotals.length}`}
            accent="primary"
          />
          <MetricCard
            icon={<TrendingUp className="w-5 h-5" />}
            label="Average Score"
            value={mean.toFixed(1)}
            accent="success"
            sub={`/ ${maxTotal}`}
          />
          <MetricCard
            icon={<Target className="w-5 h-5" />}
            label="Median Score"
            value={median.toFixed(1)}
            accent="primary"
            sub={`/ ${maxTotal}`}
          />
        </div>

        {/* Score Distribution — elevated card */}
        <div className="glass-panel rounded-2xl shadow-soft-lg p-6 mb-8 animate-fade-in" style={{ animationDelay: "0.12s" }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-serif font-semibold text-foreground text-lg">Score Distribution</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Quartile analysis across all graded submissions</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-1.5">
              <Sparkles className="w-3 h-3 text-primary" />
              {studentTotals.length} students
            </div>
          </div>

          <div className="grid grid-cols-5 gap-3 mb-6">
            <StatBox label="Mean" value={mean.toFixed(1)} sub={`/ ${maxTotal}`} highlight />
            <StatBox label="Median" value={median.toFixed(1)} sub={`/ ${maxTotal}`} />
            <StatBox label="Q1 (25th)" value={q1.toFixed(1)} sub={`/ ${maxTotal}`} />
            <StatBox label="Q3 (75th)" value={q3.toFixed(1)} sub={`/ ${maxTotal}`} />
            <StatBox label="IQR" value={(q3 - q1).toFixed(1)} sub="spread" />
          </div>

          {/* Visual quartile bar */}
          <div className="relative">
            <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1.5 px-0.5">
              <span>0</span>
              <span className="font-medium">Q1: {q1.toFixed(0)}</span>
              <span className="font-medium text-primary">Median: {median.toFixed(0)}</span>
              <span className="font-medium">Q3: {q3.toFixed(0)}</span>
              <span>{maxTotal}</span>
            </div>
            <div className="h-4 bg-muted/60 rounded-full overflow-hidden flex relative shadow-inner">
              <div className="h-full bg-muted/80" style={{ width: `${(q1 / maxTotal) * 100}%` }} />
              <div className="h-full bg-gradient-to-r from-primary/25 to-primary/35" style={{ width: `${((median - q1) / maxTotal) * 100}%` }} />
              <div className="h-full bg-gradient-to-r from-primary/50 to-primary/65" style={{ width: `${((q3 - median) / maxTotal) * 100}%` }} />
              <div className="h-full bg-primary/15" style={{ width: `${((maxTotal - q3) / maxTotal) * 100}%` }} />
              {studentTotals.map((s) => (
                <div
                  key={s.id}
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-foreground border-2 border-card shadow-md transition-transform hover:scale-125"
                  style={{ left: `calc(${(s.total / maxTotal) * 100}% - 6px)` }}
                  title={`${s.id}: ${s.total}/${maxTotal}`}
                />
              ))}
            </div>
            {/* Student labels below dots */}
            <div className="relative h-5 mt-1">
              {studentTotals.map((s) => (
                <span
                  key={s.id}
                  className="absolute text-[9px] font-medium text-muted-foreground -translate-x-1/2"
                  style={{ left: `${(s.total / maxTotal) * 100}%` }}
                >
                  {s.id.replace("STU00", "")}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Charts — with gradient fills */}
        <div className="grid grid-cols-2 gap-5 mb-8 animate-fade-in" style={{ animationDelay: "0.15s" }}>
          {/* Score Timeline — area chart */}
          <div className="glass-panel rounded-2xl shadow-soft-lg p-6">
            <h3 className="font-serif font-semibold text-foreground mb-1">Score Timeline</h3>
            <p className="text-xs text-muted-foreground mb-4">Total scores across grading sequence</p>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={scoreTimeline}>
                <defs>
                  <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(217 91% 60%)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(217 91% 60%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 12% 92%)" />
                <XAxis dataKey="submission" tick={{ fontSize: 11, fill: "hsl(220 10% 50%)" }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "hsl(220 10% 50%)" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid hsl(220 12% 90%)",
                    borderRadius: "10px",
                    fontSize: "12px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="hsl(217 91% 60%)"
                  strokeWidth={2.5}
                  fill="url(#scoreGradient)"
                  dot={{ fill: "hsl(217 91% 60%)", r: 5, strokeWidth: 2, stroke: "white" }}
                  activeDot={{ r: 7, strokeWidth: 2, stroke: "white" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Criterion Stability — styled bars */}
          <div className="glass-panel rounded-2xl shadow-soft-lg p-6">
            <h3 className="font-serif font-semibold text-foreground mb-1">Criterion Stability</h3>
            <p className="text-xs text-muted-foreground mb-4">Standard deviation per rubric criterion</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={criterionStability}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(152 55% 42%)" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="hsl(152 55% 42%)" stopOpacity={0.5} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 12% 92%)" />
                <XAxis dataKey="criterion" tick={{ fontSize: 10, fill: "hsl(220 10% 50%)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(220 10% 50%)" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid hsl(220 12% 90%)",
                    borderRadius: "10px",
                    fontSize: "12px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                  }}
                />
                <Bar
                  dataKey="variance"
                  fill="url(#barGradient)"
                  radius={[8, 8, 0, 0]}
                  barSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Score Heatmap Table */}
        <div className="glass-panel rounded-2xl shadow-soft-lg p-6 mb-8 animate-fade-in" style={{ animationDelay: "0.18s" }}>
          <h3 className="font-serif font-semibold text-foreground mb-1">Score Heatmap</h3>
          <p className="text-xs text-muted-foreground mb-4">Per-criterion scores across all students</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="text-left text-xs font-medium text-muted-foreground py-2 pr-4">Criterion</th>
                  {studentTotals.map((s) => (
                    <th key={s.id} className="text-center text-xs font-medium text-muted-foreground py-2 px-3">{s.id}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {heatmapData.map((row) => (
                  <tr key={row.criterion} className="border-b border-border/20 last:border-0">
                    <td className="text-xs font-medium text-foreground py-2.5 pr-4">{row.criterion}</td>
                    {studentTotals.map((s) => {
                      const score = row[s.id] as number;
                      const pct = score / 25;
                      const bg = pct >= 0.9
                        ? "bg-success/15 text-success"
                        : pct >= 0.75
                        ? "bg-primary/10 text-primary"
                        : pct >= 0.5
                        ? "bg-warning/15 text-warning"
                        : "bg-destructive/10 text-destructive";
                      return (
                        <td key={s.id} className="text-center py-2.5 px-3">
                          <span className={`inline-block text-xs font-bold rounded-md px-2 py-1 min-w-[36px] ${bg}`}>
                            {score}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
                <tr className="border-t-2 border-border/60">
                  <td className="text-xs font-semibold text-foreground py-2.5 pr-4">Total</td>
                  {studentTotals.map((s) => (
                    <td key={s.id} className="text-center py-2.5 px-3">
                      <span className="text-sm font-bold text-foreground">{s.total}</span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Grading Fairness Alerts */}
        <div className="mb-10 animate-fade-in" style={{ animationDelay: "0.22s" }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
              <Scale className="w-4 h-4 text-destructive" />
            </div>
            <div>
              <h3 className="font-serif font-semibold text-foreground">Grading Fairness Alerts</h3>
              <p className="text-xs text-muted-foreground">Scores deviating significantly from AI-assessed quality</p>
            </div>
            {fairnessFlags.length > 0 && (
              <span className="text-xs font-bold bg-destructive/10 text-destructive rounded-full px-2.5 py-0.5 ml-auto">
                {fairnessFlags.length} {fairnessFlags.length === 1 ? "alert" : "alerts"}
              </span>
            )}
          </div>

          {fairnessFlags.length === 0 ? (
            <div className="glass-panel rounded-2xl shadow-soft p-8 text-center">
              <CheckCircle className="w-10 h-10 text-success mx-auto mb-3 opacity-80" />
              <p className="text-sm text-muted-foreground">No fairness inconsistencies detected across graded submissions.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {fairnessFlags.map((flag, idx) => (
                <div key={idx} className="glass-panel rounded-2xl border border-destructive/15 shadow-soft p-5 space-y-3 hover:shadow-soft-lg transition-shadow duration-300">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground text-sm">{flag.criterionName}</span>
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-destructive bg-destructive/10 rounded-full px-3 py-1">
                      <AlertTriangle className="w-3 h-3" />
                      {flag.scoreDiff} pt gap
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    AI assesses both answers as similar quality, but grader scores differ by {flag.scoreDiff} points.
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-muted/20 border border-border/30 rounded-xl p-3.5">
                      <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">{flag.studentA.id}</span>
                      <div className="flex items-center justify-between mt-1.5 mb-1">
                        <span className="text-base font-bold text-foreground">{flag.studentA.score}<span className="text-xs font-normal text-muted-foreground">/{flag.maxScore}</span></span>
                      </div>
                      <p className="text-[10px] text-muted-foreground">AI: {flag.studentA.aiScore}/{flag.maxScore}</p>
                    </div>
                    <div className="bg-muted/20 border border-border/30 rounded-xl p-3.5">
                      <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">{flag.studentB.id}</span>
                      <div className="flex items-center justify-between mt-1.5 mb-1">
                        <span className="text-base font-bold text-foreground">{flag.studentB.score}<span className="text-xs font-normal text-muted-foreground">/{flag.maxScore}</span></span>
                      </div>
                      <p className="text-[10px] text-muted-foreground">AI: {flag.studentB.aiScore}/{flag.maxScore}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* View Full Segment Grades */}
        <div className="flex justify-center pb-6 animate-fade-in" style={{ animationDelay: "0.28s" }}>
          <button
            onClick={() => navigate("/segment-grades")}
            className="group relative flex items-center gap-2.5 bg-gradient-to-r from-primary to-primary/85 text-primary-foreground font-semibold text-base rounded-2xl px-10 py-4 shadow-soft-lg hover:shadow-[0_8px_30px_-6px_hsl(217_91%_60%_/_0.4)] transition-all duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/10 to-primary/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            <BarChart3 className="w-5 h-5 relative z-10" />
            <span className="relative z-10">View Full Segment Grades</span>
          </button>
        </div>
      </main>
    </div>
  );
};

const MetricCard = ({ icon, label, value, accent, sub }: { icon: React.ReactNode; label: string; value: string; accent: string; sub?: string }) => (
  <div className="glass-panel rounded-2xl shadow-soft-lg p-5 group hover:shadow-[0_8px_30px_-6px_rgba(0,0,0,0.08)] transition-all duration-300">
    <div className="flex items-center gap-2.5 mb-3">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
        accent === "success" ? "bg-success/10 text-success" : "bg-primary/10 text-primary"
      }`}>
        {icon}
      </div>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
    <div className="flex items-baseline gap-1.5">
      <p className="text-3xl font-serif font-semibold text-foreground">{value}</p>
      {sub && <span className="text-sm text-muted-foreground">{sub}</span>}
    </div>
  </div>
);

const StatBox = ({ label, value, sub, highlight }: { label: string; value: string; sub: string; highlight?: boolean }) => (
  <div className={`text-center rounded-xl p-3.5 border transition-all duration-200 ${
    highlight
      ? "bg-primary/5 border-primary/20 shadow-sm"
      : "bg-muted/20 border-border/30"
  }`}>
    <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest mb-1">{label}</p>
    <p className={`text-xl font-serif font-semibold ${highlight ? "text-primary" : "text-foreground"}`}>{value}</p>
    <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>
  </div>
);

export default Analytics;
