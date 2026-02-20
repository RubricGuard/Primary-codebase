import { Sparkles, Check, X } from "lucide-react";
import type { GradingScore } from "@/lib/mockData";

interface Criterion {
  id: string;
  name: string;
  description: string;
  maxScore: number;
}

interface Props {
  criteria: Criterion[];
  scores: GradingScore[];
  activeValidation: string | null;
  onScoreChange: (criterionId: string, field: keyof GradingScore, value: any) => void;
  onToggleValidation: (criterionId: string) => void;
  studentId: string;
}

const RubricPanel = ({ criteria, scores, activeValidation, onScoreChange, onToggleValidation, studentId }: Props) => {
  return (
    <div className="p-6">
      <div className="mb-5">
        <h2 className="font-serif text-lg font-semibold text-foreground">
          Grading: {studentId}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Score each criterion and provide justification.
        </p>
      </div>

      <div className="space-y-4">
        {criteria.map((criterion) => {
          const score = scores.find((s) => s.criterionId === criterion.id);
          const isValidationActive = activeValidation === criterion.id && score?.aiSuggestion;

          return (
            <div
              key={criterion.id}
              className="bg-card rounded-xl border border-border/40 shadow-soft overflow-hidden transition-all duration-300"
            >
              <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground text-[15px]">
                      {criterion.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {criterion.description}
                    </p>
                  </div>
                  {score?.validated && (
                    <span className="flex items-center gap-1 text-xs font-medium text-success bg-success-light rounded-md px-2 py-0.5">
                      <Check className="w-3 h-3" />
                      Validated
                    </span>
                  )}
                </div>

                {/* Score Input */}
                <div className="flex items-center gap-3 mb-3">
                  <label className="text-sm text-muted-foreground">Score</label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min={0}
                      max={criterion.maxScore}
                      value={score?.score ?? ""}
                      onChange={(e) =>
                        onScoreChange(criterion.id, "score", e.target.value ? Number(e.target.value) : null)
                      }
                      className="w-16 h-9 text-center text-sm font-medium bg-muted/40 border border-border/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                    />
                    <span className="text-sm text-muted-foreground">/ {criterion.maxScore}</span>
                  </div>
                </div>

                {/* Explanation */}
                <textarea
                  value={score?.explanation ?? ""}
                  onChange={(e) => onScoreChange(criterion.id, "explanation", e.target.value)}
                  placeholder="Provide justification for this score..."
                  rows={3}
                  className="w-full text-sm text-foreground/85 bg-muted/30 border border-border/40 rounded-lg px-3.5 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all placeholder:text-muted-foreground/50 leading-relaxed"
                />
              </div>

              {/* AI Validation Panel */}
              {isValidationActive && (
                <div className="mx-3 mb-3 animate-fade-in">
                  <div className="glass-panel rounded-xl p-4 border border-primary/15">
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <Sparkles className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                        AI Suggestion
                      </span>
                    </div>
                    <p className="text-sm text-foreground/75 leading-relaxed mb-4">
                      {score.aiSuggestion}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          onScoreChange(criterion.id, "validated", true);
                          onToggleValidation(criterion.id);
                        }}
                        className="flex items-center gap-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-lg px-3.5 py-2 hover:bg-primary/90 transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Accept Suggestion
                      </button>
                      <button
                        onClick={() => {
                          onScoreChange(criterion.id, "overridden", true);
                          onToggleValidation(criterion.id);
                        }}
                        className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted/60 rounded-lg px-3.5 py-2 hover:bg-muted transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                        Keep My Score
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Show validation trigger if has suggestion */}
              {score?.aiSuggestion && !isValidationActive && (
                <div className="px-5 pb-4">
                  <button
                    onClick={() => onToggleValidation(criterion.id)}
                    className="flex items-center gap-1.5 text-xs font-medium text-primary/70 hover:text-primary transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    View AI suggestion
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RubricPanel;
