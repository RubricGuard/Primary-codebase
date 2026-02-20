import { Activity, TrendingUp, CheckCircle2 } from "lucide-react";
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
}

const LiveAnalytics = ({ scores, criteria, gradedCount, totalCount }: Props) => {
  const validatedCount = scores.filter((s) => s.validated).length;
  const validityRate = criteria.length > 0 ? Math.round((validatedCount / criteria.length) * 100) : 0;

  const scoredCriteria = scores.filter((s) => s.score !== null);
  const avgScore = scoredCriteria.length > 0
    ? (scoredCriteria.reduce((sum, s) => sum + (s.score || 0), 0) / scoredCriteria.length).toFixed(1)
    : "—";

  const consistency = validityRate >= 75 ? "Stable" : validityRate >= 50 ? "Moderate" : "Low";
  const consistencyColor =
    consistency === "Stable"
      ? "text-success bg-success-light"
      : consistency === "Moderate"
      ? "text-warning bg-warning-light"
      : "text-destructive bg-destructive/10";

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

        {/* Validity Rate */}
        <div className="bg-card rounded-xl border border-border/40 shadow-soft p-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-4 h-4 text-success" />
            <span className="text-sm font-medium text-foreground">Explanation Validity Rate</span>
          </div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Validated</span>
            <span className="font-medium text-foreground">{validityRate}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-success rounded-full transition-all duration-500"
              style={{ width: `${validityRate}%` }}
            />
          </div>
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
