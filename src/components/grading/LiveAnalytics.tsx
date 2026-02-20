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
  studentA: { id: string; score: number; aiScore: number };
  studentB: { id: string; score: number; aiScore: number };
  scoreDiff: number;
}

const AI_SIMILARITY_THRESHOLD = 2;
const SCORE_DIFF_THRESHOLD = 1.5;

/** Detect grading inconsistencies: similar answers (by AI score) with different grader scores */
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
            criterionId: c.id,
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
  const fairnessPenalty = Math.min(similarityFlags.length * 2, 20); // cap penalty at 20%
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
              Similar-quality answers (per AI assessment) received significantly different scores from the grader.
            </p>
            <div className="space-y-3">
              {similarityFlags.map((flag, idx) => (
                <div key={idx} className="bg-card rounded-lg border border-border/40 p-3 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-foreground">{flag.criterionName}</span>
                    <span className="text-[10px] font-semibold text-destructive bg-destructive/10 rounded px-1.5 py-0.5">
                      {flag.scoreDiff} pt gap
                    </span>
                  </div>

                  {/* Stacked student comparison */}
                  <div className="space-y-1.5">
                    <div className="bg-muted/30 rounded-md px-3 py-2 border border-border/30">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-muted-foreground font-medium">{flag.studentA.id}</span>
                        <span className="text-[10px] text-muted-foreground">AI: {flag.studentA.aiScore}</span>
                      </div>
                      <span className="text-xs font-bold text-foreground">{flag.studentA.score}/{flag.maxScore}</span>
                    </div>
                    <div className="bg-muted/30 rounded-md px-3 py-2 border border-border/30">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-muted-foreground font-medium">{flag.studentB.id}</span>
                        <span className="text-[10px] text-muted-foreground">AI: {flag.studentB.aiScore}</span>
                      </div>
                      <span className="text-xs font-bold text-foreground">{flag.studentB.score}/{flag.maxScore}</span>
                    </div>
                  </div>

                  {/* Gap indicator */}
                  <div className="flex items-center gap-1.5">
                    <AlertTriangle className="w-3 h-3 text-destructive shrink-0" />
                    <span className="text-[10px] text-destructive/90 font-medium leading-tight">
                      AI says similar quality, but scores differ by {flag.scoreDiff} pts
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
