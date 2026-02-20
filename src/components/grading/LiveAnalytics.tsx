import { Activity, TrendingUp, CheckCircle2, AlertTriangle, Scale } from "lucide-react";
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

interface FairnessFlag {
  criterionId: string;
  criterionName: string;
  maxScore: number;
  benchmark: { id: string; score: number; aiScore: number };
  flagged: { id: string; score: number; aiScore: number; explanation: string };
  deviation: number;
  direction: "over" | "under";
  reason: string;
}

/** Detect grading inconsistencies by comparing grader scores to AI-assessed quality */
const detectFairnessFlags = (
  allScores: Record<string, GradingScore[]>,
  criteria: Criterion[]
): FairnessFlag[] => {
  const flags: FairnessFlag[] = [];

  criteria.forEach((c) => {
    const students = Object.entries(allScores)
      .map(([id, scores]) => {
        const s = scores.find((sc) => sc.criterionId === c.id);
        if (!s || s.score == null || s.aiSuggestedScore == null) return null;
        return {
          id,
          score: s.score,
          aiScore: s.aiSuggestedScore,
          explanation: s.explanation,
          gap: Math.abs(s.score - s.aiSuggestedScore),
        };
      })
      .filter(Boolean) as { id: string; score: number; aiScore: number; explanation: string; gap: number }[];

    if (students.length < 2) return;

    // Benchmark = student with smallest gap (most accurate grading)
    const benchmark = students.reduce((best, s) => (s.gap < best.gap ? s : best));

    // Flag each student with deviation > 4 points from AI assessment
    students.forEach((s) => {
      if (s.id === benchmark.id || s.gap <= 4) return;
      flags.push({
        criterionId: c.id,
        criterionName: c.name,
        maxScore: c.maxScore,
        benchmark: { id: benchmark.id, score: benchmark.score, aiScore: benchmark.aiScore },
        flagged: { id: s.id, score: s.score, aiScore: s.aiScore, explanation: s.explanation },
        deviation: s.gap,
        direction: s.score > s.aiScore ? "over" : "under",
        reason: `Grader ${s.score > s.aiScore ? "over-scored" : "under-scored"} by ${s.gap} points vs. AI assessment (${s.aiScore}/${c.maxScore}). Benchmark ${benchmark.id} scored ${benchmark.score}/${c.maxScore} (AI: ${benchmark.aiScore}), showing accurate rubric application.`,
      });
    });
  });

  return flags;
};

const LiveAnalytics = ({ scores, criteria, gradedCount, totalCount, allScores }: Props) => {
  // Fairness flags: compare grader scores to AI-assessed quality per criterion
  const similarityFlags = allScores ? detectFairnessFlags(allScores, criteria) : [];

  // Validation status summary
  const statusCounts = {
    fully_supported: scores.filter((s) => s.validationStatus === "fully_supported").length,
    partially_supported: scores.filter((s) => s.validationStatus === "partially_supported").length,
    not_supported: scores.filter((s) => s.validationStatus === "not_supported").length,
  };
  const totalValidated = statusCounts.fully_supported + statusCounts.partially_supported + statusCounts.not_supported;
  const qualityRate = totalValidated > 0 ? Math.round((statusCounts.fully_supported / totalValidated) * 100) : 0;

  // Explanation Validity Rate: computed across ALL graded students
  const allValidationCounts = (() => {
    if (!allScores) return { total: 0, valid: 0 };
    let total = 0;
    let valid = 0;
    Object.values(allScores).forEach((studentScores) => {
      studentScores.forEach((s) => {
        if (s.validationStatus) {
          total++;
          if (s.validationStatus === "fully_supported") valid++;
        }
      });
    });
    return { total, valid };
  })();

  const rawValidityPct = allValidationCounts.total > 0
    ? (allValidationCounts.valid / allValidationCounts.total) * 100
    : 100;
  const fairnessPenalty = similarityFlags.length * 8; // each fairness flag costs 8%
  const explanationValidityRate = Math.max(0, Math.round(rawValidityPct - fairnessPenalty));

  const validityBarColor =
    explanationValidityRate >= 75
      ? "bg-success"
      : explanationValidityRate >= 50
      ? "bg-warning"
      : "bg-destructive";
  const validityTextColor =
    explanationValidityRate >= 75
      ? "text-success"
      : explanationValidityRate >= 50
      ? "text-warning"
      : "text-destructive";

  const scoredCriteria = scores.filter((s) => s.score !== null);
  const avgScore = scoredCriteria.length > 0
    ? (scoredCriteria.reduce((sum, s) => sum + (s.score || 0), 0) / scoredCriteria.length).toFixed(1)
    : "—";

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

        {/* Explanation Validity Rate — under Session Progress */}
        <div className="bg-card rounded-xl border border-border/40 shadow-soft p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Explanation Validity Rate</span>
          </div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground text-xs">
              {allValidationCounts.total > 0
                ? `${allValidationCounts.valid}/${allValidationCounts.total} valid${similarityFlags.length > 0 ? ` · ${similarityFlags.length} fairness alert${similarityFlags.length > 1 ? "s" : ""}` : ""}`
                : "No validations yet"}
            </span>
            <span className={`font-semibold text-sm ${validityTextColor}`}>{explanationValidityRate}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${validityBarColor}`}
              style={{ width: `${explanationValidityRate}%` }}
            />
          </div>
          {allValidationCounts.total > 0 && explanationValidityRate < 75 && (
            <p className="text-[10px] text-muted-foreground mt-2">
              {similarityFlags.length > 0
                ? "Unsupported explanations and fairness inconsistencies are reducing this rate."
                : "Some explanations lack full AI validation support."}
            </p>
          )}
        </div>

        {/* Cross-Student Grading Fairness */}
        {similarityFlags.length > 0 && (
          <div className="bg-destructive/5 rounded-xl border border-destructive/20 shadow-soft p-4">
            <div className="flex items-center gap-2 mb-2">
              <Scale className="w-4 h-4 text-destructive" />
              <span className="text-sm font-medium text-destructive">Grading Fairness Alert</span>
            </div>
            <p className="text-[11px] text-muted-foreground mb-3">
              Some scores deviate significantly from AI-assessed quality. The benchmark shows accurate rubric application for comparison.
            </p>
            <div className="space-y-3">
              {similarityFlags.map((flag, idx) => (
                <div key={idx} className="bg-card rounded-lg border border-border/40 p-3 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-foreground">{flag.criterionName}</span>
                    <span className="text-[10px] font-semibold text-destructive bg-destructive/10 rounded px-1.5 py-0.5">
                      {flag.direction === "over" ? "+" : "−"}{flag.deviation} pts
                    </span>
                  </div>

                  {/* Benchmark — correct grading */}
                  <div className="bg-success/5 rounded-md px-2.5 py-1.5 border border-success/10">
                    <span className="text-[10px] text-success font-medium uppercase tracking-wide">Benchmark</span>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">{flag.benchmark.id}</span>
                      <span className="text-xs">
                        <span className="font-bold text-success">{flag.benchmark.score}/{flag.maxScore}</span>
                        <span className="text-muted-foreground ml-1">(AI: {flag.benchmark.aiScore})</span>
                      </span>
                    </div>
                  </div>

                  {/* Flagged student */}
                  <div className="bg-destructive/5 rounded-md px-2.5 py-1.5 border border-destructive/10">
                    <span className="text-[10px] text-destructive font-medium uppercase tracking-wide">
                      {flag.direction === "over" ? "Over-scored" : "Under-scored"}
                    </span>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">{flag.flagged.id}</span>
                      <span className="text-xs">
                        <span className="font-bold text-destructive">{flag.flagged.score}/{flag.maxScore}</span>
                        <span className="text-muted-foreground ml-1">(AI: {flag.flagged.aiScore})</span>
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground/80 italic leading-tight mt-1.5 pl-2 border-l-2 border-destructive/20">
                      "{flag.flagged.explanation.slice(0, 80)}…"
                    </p>
                  </div>

                  {/* Gap indicator */}
                  <div className="pt-1.5 border-t border-border/30">
                    <div className="flex items-center gap-1.5">
                      <AlertTriangle className="w-3 h-3 text-destructive shrink-0" />
                      <span className="text-[10px] text-destructive/90 font-medium leading-tight">
                        {flag.deviation}-point deviation — review for rubric alignment
                      </span>
                    </div>
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
