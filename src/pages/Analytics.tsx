import { useNavigate } from "react-router-dom";
import { Shield, ArrowLeft, FileCheck, TrendingUp, Sparkles, CheckCircle, Scale, AlertTriangle } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { studentSubmissions, rubricCriteria, sampleGradedData } from "@/lib/mockData";

// ── Compute total scores per student ──
const studentTotals = studentSubmissions.map((s) => {
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

// ── Fairness detection (same logic as LiveAnalytics) ──
const extractCitations = (texts: string[]): string[] => {
  const patterns = [
    /([A-Z][a-z]+)\s*(?:&|and)\s*[A-Z][a-z]+(?:'s)?\s*\(\d{4}\)/g,
    /([A-Z][a-z]+)\s+et\s+al\.?\s*(?:\(\d{4}\))?/g,
    /([A-Z][a-z]+)(?:'s)?\s*\(\d{4}\)/g,
    /\(([A-Z][a-z]+),?\s*\d{4}\)/g,
  ];
  const found = new Set<string>();
  texts.forEach((t) => {
    patterns.forEach((p) => {
      let m;
      const regex = new RegExp(p.source, p.flags);
      while ((m = regex.exec(t)) !== null) found.add(m[1].toLowerCase());
    });
  });
  return [...found];
};

const extractKeyPhrases = (text: string): string[] => {
  const phrases = [
    "well-structured", "well-integrated", "strong thesis", "nuanced",
    "multiple perspectives", "critical analysis", "counterargument",
    "accessibility", "equity", "evidence-based", "empirical",
    "meta-analysis", "replication", "methodology", "peer-reviewed",
    "data-driven", "quantitative", "credible sources", "integrated",
  ];
  return phrases.filter((p) => text.toLowerCase().includes(p));
};

interface FairnessFlag {
  criterionName: string;
  studentA: { id: string; score: number; explanation: string };
  studentB: { id: string; score: number; explanation: string };
  scoreGap: number;
  sharedEvidence: string[];
  reason: string;
}

const fairnessFlags: FairnessFlag[] = (() => {
  const flags: FairnessFlag[] = [];

  rubricCriteria.forEach((c) => {
    const studentData = Object.entries(sampleGradedData).map(([id, scores]) => {
      const s = scores.find((sc) => sc.criterionId === c.id);
      if (!s || s.score == null) return null;
      return {
        id,
        score: s.score,
        explanation: s.explanation,
        citations: extractCitations(s.highlightedTexts || []),
        phrases: extractKeyPhrases(s.explanation),
      };
    }).filter(Boolean) as { id: string; score: number; explanation: string; citations: string[]; phrases: string[] }[];

    for (let i = 0; i < studentData.length; i++) {
      for (let j = i + 1; j < studentData.length; j++) {
        const a = studentData[i];
        const b = studentData[j];
        const sharedCitations = a.citations.filter((c) => b.citations.includes(c));
        const sharedPhrases = a.phrases.filter((p) => b.phrases.includes(p));
        const scoreGap = Math.abs(a.score - b.score);

        if (sharedCitations.length >= 1 && scoreGap > 4 && sharedPhrases.length >= 1) {
          const lower = a.score < b.score ? a : b;
          const higher = a.score < b.score ? b : a;
          const citationNames = sharedCitations.map((c) => c.charAt(0).toUpperCase() + c.slice(1));
          flags.push({
            criterionName: c.name,
            studentA: { id: lower.id, score: lower.score, explanation: lower.explanation },
            studentB: { id: higher.id, score: higher.score, explanation: higher.explanation },
            scoreGap,
            sharedEvidence: citationNames,
            reason: `Both students cite ${citationNames.join(", ")} with similar evidence quality, yet there is a ${scoreGap}-point scoring gap.`,
          });
        }
      }
    }
  });

  return flags;
})();

const scoreTimeline = studentTotals.map((s) => ({ submission: s.id, score: s.total }));

const criterionStability = rubricCriteria.map((c) => {
  const scores = Object.values(sampleGradedData)
    .map((ss) => ss.find((s) => s.criterionId === c.id)?.score)
    .filter((s) => s != null) as number[];
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  const variance = Math.sqrt(scores.reduce((sum, s) => sum + (s - avg) ** 2, 0) / scores.length);
  return { criterion: c.name.replace("Argument ", "Arg. ").replace("Evidence Use", "Evidence").replace("Critical Analysis", "Analysis").replace("Writing Quality", "Writing"), variance: parseFloat(variance.toFixed(1)) };
});

const maxTotal = rubricCriteria.reduce((sum, c) => sum + c.maxScore, 0);

const Analytics = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/40 to-indigo-50/30">
      {/* Header */}
      <header className="border-b border-border/60 bg-card/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <div className="w-px h-5 bg-border" />
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" strokeWidth={1.5} />
              <span className="font-serif font-semibold text-foreground">RubricGuard AI</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-10 animate-fade-in">
          <h1 className="font-serif text-2xl font-semibold text-foreground mb-1">
            Grading Session Analytics
          </h1>
          <p className="text-muted-foreground">
            Case Analysis 1: Strategic Pivot — BUS302
          </p>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-3 gap-5 mb-10 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <MetricCard
            icon={<FileCheck className="w-5 h-5 text-primary" />}
            label="Submissions Graded"
            value={`${studentTotals.length}`}
          />
          <MetricCard
            icon={<TrendingUp className="w-5 h-5 text-success" />}
            label="Average Score"
            value={mean.toFixed(1)}
          />
          <MetricCard
            icon={<Sparkles className="w-5 h-5 text-primary" />}
            label="AI Support Rate"
            value="33%"
          />
        </div>

        {/* Statistical Summary */}
        <div className="bg-card rounded-xl border border-border/40 shadow-soft p-6 mb-10 animate-fade-in" style={{ animationDelay: "0.12s" }}>
          <h3 className="font-semibold text-foreground mb-5">Score Distribution</h3>
          <div className="grid grid-cols-5 gap-4">
            <StatBox label="Mean" value={mean.toFixed(1)} sub={`/ ${maxTotal}`} />
            <StatBox label="Median" value={median.toFixed(1)} sub={`/ ${maxTotal}`} />
            <StatBox label="Q1 (25th)" value={q1.toFixed(1)} sub={`/ ${maxTotal}`} />
            <StatBox label="Q3 (75th)" value={q3.toFixed(1)} sub={`/ ${maxTotal}`} />
            <StatBox label="IQR" value={(q3 - q1).toFixed(1)} sub="spread" />
          </div>

          {/* Visual quartile bar */}
          <div className="mt-5">
            <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
              <span>0</span>
              <span>Q1: {q1.toFixed(0)}</span>
              <span>Median: {median.toFixed(0)}</span>
              <span>Q3: {q3.toFixed(0)}</span>
              <span>{maxTotal}</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden flex relative">
              <div className="h-full bg-muted" style={{ width: `${(q1 / maxTotal) * 100}%` }} />
              <div className="h-full bg-primary/30" style={{ width: `${((median - q1) / maxTotal) * 100}%` }} />
              <div className="h-full bg-primary/60" style={{ width: `${((q3 - median) / maxTotal) * 100}%` }} />
              <div className="h-full bg-primary/20" style={{ width: `${((maxTotal - q3) / maxTotal) * 100}%` }} />
              {/* Student dots */}
              {studentTotals.map((s) => (
                <div
                  key={s.id}
                  className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-foreground border-2 border-card shadow-sm"
                  style={{ left: `${(s.total / maxTotal) * 100}%` }}
                  title={`${s.id}: ${s.total}/${maxTotal}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-5 mb-10 animate-fade-in" style={{ animationDelay: "0.15s" }}>
          {/* Score Timeline */}
          <div className="bg-card rounded-xl border border-border/40 shadow-soft p-6">
            <h3 className="font-semibold text-foreground mb-4">Score Timeline</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={scoreTimeline}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 12% 88%)" />
                <XAxis dataKey="submission" tick={{ fontSize: 12, fill: "hsl(220 10% 45%)" }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "hsl(220 10% 45%)" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(40 25% 99%)",
                    border: "1px solid hsl(220 12% 88%)",
                    borderRadius: "8px",
                    fontSize: "13px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="hsl(213 40% 52%)"
                  strokeWidth={2.5}
                  dot={{ fill: "hsl(213 40% 52%)", r: 4, strokeWidth: 0 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Criterion Stability */}
          <div className="bg-card rounded-xl border border-border/40 shadow-soft p-6">
            <h3 className="font-semibold text-foreground mb-4">Criterion Stability</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={criterionStability}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 12% 88%)" />
                <XAxis dataKey="criterion" tick={{ fontSize: 11, fill: "hsl(220 10% 45%)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(220 10% 45%)" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(40 25% 99%)",
                    border: "1px solid hsl(220 12% 88%)",
                    borderRadius: "8px",
                    fontSize: "13px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                  }}
                />
                <Bar
                  dataKey="variance"
                  fill="hsl(152 45% 45%)"
                  radius={[6, 6, 0, 0]}
                  barSize={36}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Grading Fairness Alerts */}
        <div className="mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-2 mb-4">
            <Scale className="w-5 h-5 text-destructive" />
            <h3 className="font-semibold text-foreground">Grading Fairness Alerts</h3>
            {fairnessFlags.length > 0 && (
              <span className="text-xs font-bold bg-destructive/10 text-destructive rounded-full px-2.5 py-0.5">
                {fairnessFlags.length} {fairnessFlags.length === 1 ? "alert" : "alerts"}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            The AI compares all student submissions, justifications, and scores — when two students cite similar evidence and receive similar praise but significantly different scores, it flags a potential inconsistency.
          </p>

          {fairnessFlags.length === 0 ? (
            <div className="bg-card rounded-xl border border-border/40 shadow-soft p-6 text-center">
              <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No fairness inconsistencies detected across graded submissions.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {fairnessFlags.map((flag, idx) => (
                <div key={idx} className="bg-card rounded-xl border border-destructive/20 shadow-soft p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground text-sm">{flag.criterionName}</span>
                    <span className="flex items-center gap-1 text-xs font-medium text-destructive bg-destructive/10 rounded-full px-2.5 py-0.5">
                      <AlertTriangle className="w-3 h-3" />
                      {flag.scoreGap}-point gap
                    </span>
                  </div>

                  {/* Shared citations */}
                  <div className="bg-muted/40 rounded-lg px-3 py-2">
                    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">Shared Citations</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {flag.sharedEvidence.map((e) => (
                        <span key={e} className="text-[11px] bg-primary/10 text-primary rounded px-2 py-0.5 font-medium">
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Side-by-side comparison */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-destructive/5 border border-destructive/10 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-medium text-muted-foreground">{flag.studentA.id}</span>
                        <span className="text-sm font-bold text-destructive">{flag.studentA.score}/25</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                        "{flag.studentA.explanation.slice(0, 120)}…"
                      </p>
                    </div>
                    <div className="bg-success/5 border border-success/10 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-medium text-muted-foreground">{flag.studentB.id}</span>
                        <span className="text-sm font-bold text-success">{flag.studentB.score}/25</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                        "{flag.studentB.explanation.slice(0, 120)}…"
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-destructive/80 leading-relaxed">
                    {flag.reason}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Finalize */}
        <div className="flex justify-center animate-fade-in" style={{ animationDelay: "0.25s" }}>
          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-2.5 bg-primary text-primary-foreground font-semibold text-base rounded-xl px-8 py-3.5 shadow-soft hover:glow-primary hover:shadow-soft-lg transition-all duration-300"
          >
            <CheckCircle className="w-5 h-5" />
            Finalize Grades
          </button>
        </div>
      </main>
    </div>
  );
};

const MetricCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="bg-card rounded-xl border border-border/40 shadow-soft p-5">
    <div className="flex items-center gap-2.5 mb-3">
      {icon}
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
    <p className="text-3xl font-serif font-semibold text-foreground">{value}</p>
  </div>
);

const StatBox = ({ label, value, sub }: { label: string; value: string; sub: string }) => (
  <div className="text-center bg-muted/30 rounded-lg p-3 border border-border/30">
    <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wide mb-1">{label}</p>
    <p className="text-xl font-serif font-semibold text-foreground">{value}</p>
    <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>
  </div>
);

export default Analytics;
