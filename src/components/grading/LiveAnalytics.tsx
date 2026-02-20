import { Activity, TrendingUp, CheckCircle2, AlertTriangle } from "lucide-react";
import type { GradingScore } from "@/lib/mockData";

interface Criterion {
  id: string;
  name: string;
  maxScore: number;
}

interface Props {
  scores: GradingScore[];
  criteria: Criterion[];
  gradedCount: number;
  totalCount: number;
  allScores?: Record<string, GradingScore[]>;
}

interface ConsistencyFlag {
  criterionName: string;
  students: { id: string; score: number }[];
  spread: number;
}

const LiveAnalytics = ({ scores, criteria, gradedCount, totalCount, allScores }: Props) => {
  const validatedCount = scores.filter((s) => s.validated).length;
  const validityRate = criteria.length > 0 ? Math.round((validatedCount / criteria.length) * 100) : 0;

  const scoredCriteria = scores.filter((s) => s.score !== null);
  const avgScore = scoredCriteria.length > 0
    ? (scoredCriteria.reduce((sum, s) => sum + (s.score || 0), 0) / scoredCriteria.length).toFixed(1)
    : "—";

  // Validation status summary
  const statusCounts = {
    fully_supported: scores.filter((s) => s.validationStatus === "fully_supported").length,
    partially_supported: scores.filter((s) => s.validationStatus === "partially_supported").length,
    not_supported: scores.filter((s) => s.validationStatus === "not_supported").length,
  };
  const totalValidated = statusCounts.fully_supported + statusCounts.partially_supported + statusCounts.not_supported;
  const qualityRate = totalValidated > 0 ? Math.round((statusCounts.fully_supported / totalValidated) * 100) : 0;

  const consistency = qualityRate >= 75 ? "Stable" : qualityRate >= 50 ? "Moderate" : "Low";
  const consistencyColor =
    consistency === "Stable"
      ? "text-success bg-success-light"
      : consistency === "Moderate"
      ? "text-warning bg-warning-light"
      : "text-destructive bg-destructive/10";

  // Cross-student grading consistency flags
  const consistencyFlags: ConsistencyFlag[] = [];
  if (allScores) {
    criteria.forEach((c) => {
      const studentScores: { id: string; score: number }[] = [];
      Object.entries(allScores).forEach(([studentId, sScores]) => {
        const s = sScores.find((sc) => sc.criterionId === c.id);
        if (s?.score != null) {
          studentScores.push({ id: studentId, score: s.score });
        }
      });
      if (studentScores.length >= 2) {
        const max = Math.max(...studentScores.map((s) => s.score));
        const min = Math.min(...studentScores.map((s) => s.score));
        const spread = max - min;
        // Flag if spread is large relative to maxScore (>40% of max score range)
        if (spread > c.maxScore * 0.4) {
          consistencyFlags.push({
            criterionName: c.name,
            students: studentScores.sort((a, b) => a.score - b.score),
            spread,
          });
        }
      }
    });
  }

  return (
    <div className="p-5">
      <h2 className="font-serif text-lg font-semibold text-foreground mb-5">
        Live Analytics
      </h2>

      <div className="space-y-5">
        {/* Session Progress */}
        <div className="bg-card rounded-xl border border-border/40 shadow-soft p-4">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Session Progress</span>
          </div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Graded</span>
            <span className="font-medium text-foreground">{gradedCount}/{totalCount}</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${(gradedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>

        {/* Validation Quality */}
        <div className="bg-card rounded-xl border border-border/40 shadow-soft p-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-4 h-4 text-success" />
            <span className="text-sm font-medium text-foreground">Validation Quality</span>
          </div>
          {totalValidated > 0 ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-success" />
                <span className="text-muted-foreground flex-1">Fully Supported</span>
                <span className="font-medium text-foreground">{statusCounts.fully_supported}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-warning" />
                <span className="text-muted-foreground flex-1">Partially Supported</span>
                <span className="font-medium text-foreground">{statusCounts.partially_supported}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-destructive" />
                <span className="text-muted-foreground flex-1">Not Supported</span>
                <span className="font-medium text-foreground">{statusCounts.not_supported}</span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">No validations yet</p>
          )}
        </div>

        {/* Consistency Badge */}
        <div className="bg-card rounded-xl border border-border/40 shadow-soft p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Overall Consistency</span>
          </div>
          <span className={`inline-flex items-center text-xs font-semibold rounded-full px-3 py-1 ${consistencyColor}`}>
            {consistency}
          </span>
        </div>

        {/* Cross-Student Grading Consistency */}
        {consistencyFlags.length > 0 && (
          <div className="bg-destructive/5 rounded-xl border border-destructive/20 shadow-soft p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              <span className="text-sm font-medium text-destructive">Grading Inconsistencies</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Large score differences detected across students for the same criterion:
            </p>
            <div className="space-y-3">
              {consistencyFlags.map((flag) => (
                <div key={flag.criterionName} className="bg-card rounded-lg border border-border/40 p-3">
                  <span className="text-xs font-semibold text-foreground block mb-2">
                    {flag.criterionName}
                  </span>
                  <div className="space-y-1">
                    {flag.students.map((s) => (
                      <div key={s.id} className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{s.id}</span>
                        <span className={`font-medium ${
                          s.score === Math.min(...flag.students.map((st) => st.score))
                            ? "text-destructive"
                            : s.score === Math.max(...flag.students.map((st) => st.score))
                            ? "text-success"
                            : "text-foreground"
                        }`}>
                          {s.score}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t border-border/30">
                    <span className="text-[10px] text-destructive/80 font-medium">
                      Spread: {flag.spread} pts — review for rubric alignment
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Average Score */}
        <div className="bg-card rounded-xl border border-border/40 shadow-soft p-4">
          <span className="text-sm text-muted-foreground">Avg Score (per criterion)</span>
          <p className="text-2xl font-serif font-semibold text-foreground mt-1">{avgScore}</p>
        </div>

        {/* Per-Criterion Bars */}
        <div className="bg-card rounded-xl border border-border/40 shadow-soft p-4">
          <span className="text-sm font-medium text-foreground mb-3 block">Criterion Scores</span>
          <div className="space-y-3">
            {criteria.map((c) => {
              const s = scores.find((sc) => sc.criterionId === c.id);
              const pct = s?.score != null ? (s.score / c.maxScore) * 100 : 0;
              return (
                <div key={c.id}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground truncate mr-2">{c.name}</span>
                    <span className="font-medium text-foreground whitespace-nowrap">
                      {s?.score ?? "—"}/{c.maxScore}
                    </span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary/70 rounded-full transition-all duration-300"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveAnalytics;
