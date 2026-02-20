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

interface SimilarityFlag {
  criterionId: string;
  criterionName: string;
  studentA: { id: string; score: number; explanation: string };
  studentB: { id: string; score: number; explanation: string };
  scoreGap: number;
  sharedEvidence: string[];
  reason: string;
}

/** Extract academic citation patterns (author names with years) from text */
const extractCitations = (texts: string[]): string[] => {
  const patterns = [
    /([A-Z][a-z]+)\s*(?:&|and)\s*[A-Z][a-z]+\s*\(\d{4}\)/g,
    /([A-Z][a-z]+)\s+et\s+al\.\s*\(\d{4}\)/g,
    /([A-Z][a-z]+)\s*\(\d{4}\)/g,
  ];
  const found = new Set<string>();
  texts.forEach((t) => {
    patterns.forEach((p) => {
      let m;
      const regex = new RegExp(p.source, p.flags);
      while ((m = regex.exec(t)) !== null) {
        found.add(m[1].toLowerCase());
      }
    });
  });
  return [...found];
};

/** Extract key academic/topical phrases from justification text */
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

/** Detect grading inconsistencies ONLY between similar-quality answers */
const detectSimilarityFlags = (
  allScores: Record<string, GradingScore[]>,
  criteria: Criterion[]
): SimilarityFlag[] => {
  const flags: SimilarityFlag[] = [];

  interface StudentCriterionData {
    id: string;
    score: number;
    explanation: string;
    citations: string[];
    phrases: string[];
    highlightedTexts: string[];
  }

  criteria.forEach((c) => {
    const studentData: StudentCriterionData[] = [];
    Object.entries(allScores).forEach(([id, scores]) => {
      const s = scores.find((sc) => sc.criterionId === c.id);
      if (!s || s.score == null) return;
      studentData.push({
        id,
        score: s.score,
        explanation: s.explanation,
        citations: extractCitations(s.highlightedTexts || []),
        phrases: extractKeyPhrases(s.explanation),
        highlightedTexts: s.highlightedTexts || [],
      });
    });

    // Compare all pairs
    for (let i = 0; i < studentData.length; i++) {
      for (let j = i + 1; j < studentData.length; j++) {
        const a = studentData[i];
        const b = studentData[j];

        // Find shared citations between highlighted texts
        const sharedCitations = a.citations.filter((c: string) =>
          b.citations.includes(c)
        );

        // Find shared quality descriptors in justifications
        const sharedPhrases = a.phrases.filter((p: string) =>
          b.phrases.includes(p)
        );

        const scoreGap = Math.abs(a.score - b.score);

        // Only flag if:
        // 1. They share at least 1 citation (similar evidence base)
        // 2. Score gap is significant (> 4 points)
        // 3. Both justifications use similar quality language (grader praised both)
        const hasSimilarEvidence = sharedCitations.length >= 1;
        const hasSignificantGap = scoreGap > 4;
        const hasSimilarPraise = sharedPhrases.length >= 1;

        if (hasSimilarEvidence && hasSignificantGap && hasSimilarPraise) {
          const lower = a.score < b.score ? a : b;
          const higher = a.score < b.score ? b : a;

          const citationNames = sharedCitations.map(
            (c: string) => c.charAt(0).toUpperCase() + c.slice(1)
          );

          flags.push({
            criterionId: c.id,
            criterionName: c.name,
            studentA: { id: lower.id, score: lower.score, explanation: lower.explanation },
            studentB: { id: higher.id, score: higher.score, explanation: higher.explanation },
            scoreGap,
            sharedEvidence: citationNames,
            reason: `Both students cite ${citationNames.join(", ")} and your justifications describe similar evidence quality, yet there is a ${scoreGap}-point scoring gap.`,
          });
        }
      }
    }
  });

  return flags;
};

const LiveAnalytics = ({ scores, criteria, gradedCount, totalCount, allScores }: Props) => {
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

  const scoredCriteria = scores.filter((s) => s.score !== null);
  const avgScore = scoredCriteria.length > 0
    ? (scoredCriteria.reduce((sum, s) => sum + (s.score || 0), 0) / scoredCriteria.length).toFixed(1)
    : "—";

  // Smart similarity-based consistency flags
  const similarityFlags = allScores ? detectSimilarityFlags(allScores, criteria) : [];

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

        {/* Overall Consistency */}
        <div className="bg-card rounded-xl border border-border/40 shadow-soft p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Overall Consistency</span>
          </div>
          <span className={`inline-flex items-center text-xs font-semibold rounded-full px-3 py-1 ${consistencyColor}`}>
            {consistency}
          </span>
        </div>

        {/* Cross-Student Grading Fairness */}
        {similarityFlags.length > 0 && (
          <div className="bg-destructive/5 rounded-xl border border-destructive/20 shadow-soft p-4">
            <div className="flex items-center gap-2 mb-2">
              <Scale className="w-4 h-4 text-destructive" />
              <span className="text-sm font-medium text-destructive">Grading Fairness Alert</span>
            </div>
            <p className="text-[11px] text-muted-foreground mb-3">
              Similar answers received significantly different scores. This may indicate inconsistent rubric application.
            </p>
            <div className="space-y-3">
              {similarityFlags.map((flag, idx) => (
                <div key={idx} className="bg-card rounded-lg border border-border/40 p-3 space-y-2.5">
                  <span className="text-xs font-semibold text-foreground block">
                    {flag.criterionName}
                  </span>

                  {/* Shared evidence */}
                  <div className="bg-muted/50 rounded-md px-2.5 py-1.5">
                    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">Shared Citations</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {flag.sharedEvidence.map((e) => (
                        <span key={e} className="text-[10px] bg-primary/10 text-primary rounded px-1.5 py-0.5 font-medium">
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Score comparison */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{flag.studentA.id}</span>
                      <span className="text-xs font-bold text-destructive">{flag.studentA.score}/25</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground/80 italic leading-tight pl-2 border-l-2 border-destructive/20">
                      "{flag.studentA.explanation.slice(0, 80)}…"
                    </p>

                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">{flag.studentB.id}</span>
                      <span className="text-xs font-bold text-success">{flag.studentB.score}/25</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground/80 italic leading-tight pl-2 border-l-2 border-success/20">
                      "{flag.studentB.explanation.slice(0, 80)}…"
                    </p>
                  </div>

                  {/* Gap indicator */}
                  <div className="pt-1.5 border-t border-border/30">
                    <div className="flex items-center gap-1.5">
                      <AlertTriangle className="w-3 h-3 text-destructive shrink-0" />
                      <span className="text-[10px] text-destructive/90 font-medium leading-tight">
                        {flag.scoreGap}-point gap for similar evidence — review for rubric alignment
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
