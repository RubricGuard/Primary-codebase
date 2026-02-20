import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Sparkles, Check, X, Quote, Loader2, ShieldCheck, ShieldAlert, ShieldQuestion } from "lucide-react";
import type { GradingScore, ValidationStatus } from "@/lib/mockData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

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
  pendingHighlight: string | null;
  onAttachHighlight: (criterionId: string) => void;
  onValidateJustification: (criterionId: string) => void;
  focusedCriterion: string | null;
  onFocusCriterion: (criterionId: string) => void;
}

const statusConfig: Record<string, { label: string; icon: typeof ShieldCheck; className: string; badgeClass: string }> = {
  fully_supported: {
    label: "Fully Supported",
    icon: ShieldCheck,
    className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    badgeClass: "bg-emerald-50 text-emerald-600 border border-emerald-200",
  },
  partially_supported: {
    label: "Partially Supported",
    icon: ShieldQuestion,
    className: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    badgeClass: "bg-amber-50 text-amber-600 border border-amber-200",
  },
  not_supported: {
    label: "Not Supported",
    icon: ShieldAlert,
    className: "bg-destructive/10 text-destructive border-destructive/20",
    badgeClass: "bg-red-50 text-destructive border border-red-200",
  },
};

const RubricPanel = ({
  criteria,
  scores,
  activeValidation,
  onScoreChange,
  onToggleValidation,
  studentId,
  pendingHighlight,
  onAttachHighlight,
  onValidateJustification,
  focusedCriterion,
  onFocusCriterion,
}: Props) => {
  const [validationDialogCriterion, setValidationDialogCriterion] = useState<string | null>(null);

  const dialogScore = validationDialogCriterion
    ? scores.find((s) => s.criterionId === validationDialogCriterion)
    : null;
  const dialogCriterion = validationDialogCriterion
    ? criteria.find((c) => c.id === validationDialogCriterion)
    : null;
  const dialogStatus = dialogScore?.validationResult?.status
    ? statusConfig[dialogScore.validationResult.status]
    : null;

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
          const status = score?.validationStatus;
          const statusInfo = status ? statusConfig[status] : null;
          const isFocused = focusedCriterion === criterion.id;

          return (
            <div
              key={criterion.id}
              className={`bg-card rounded-xl border shadow-soft overflow-hidden transition-all duration-300 ${
                isFocused ? "border-primary/50 ring-2 ring-primary/20" : "border-border/40"
              }`}
            >
              <div className="p-5">
                {/* Header */}
                <div
                  className="flex items-start justify-between mb-3 cursor-pointer"
                  onClick={() => onFocusCriterion(criterion.id)}
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground text-[15px]">
                      {criterion.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {criterion.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {score?.validationLoading && (
                      <span className="flex items-center gap-1 text-xs font-medium text-primary bg-primary/5 rounded-md px-2 py-0.5 border border-primary/10">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Validating
                      </span>
                    )}
                    {statusInfo && !score?.validationLoading && (
                      <button
                        onClick={() => setValidationDialogCriterion(criterion.id)}
                        className={`flex items-center gap-1 text-xs font-medium rounded-md px-2 py-0.5 border cursor-pointer hover:opacity-80 transition-opacity ${statusInfo.className}`}
                      >
                        <statusInfo.icon className="w-3 h-3" />
                        {statusInfo.label}
                      </button>
                    )}
                    {score?.validated && (
                      <span className="flex items-center gap-1 text-xs font-medium text-success bg-success-light rounded-md px-2 py-0.5">
                        <Check className="w-3 h-3" />
                        Validated
                      </span>
                    )}
                  </div>
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

                {/* Highlighted Evidence */}
                {score?.highlightedTexts && score.highlightedTexts.length > 0 && (
                  <div className="mb-3 bg-primary/5 border border-primary/10 rounded-lg p-3">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Quote className="w-3.5 h-3.5 text-primary/60" />
                      <span className="text-xs font-semibold text-primary/70 uppercase tracking-wide">
                        Selected Evidence ({score.highlightedTexts.length})
                      </span>
                      <button
                        onClick={() => {
                          onScoreChange(criterion.id, "highlightedTexts", []);
                          onScoreChange(criterion.id, "validationStatus", null);
                          onScoreChange(criterion.id, "validationResult", undefined);
                        }}
                        className="ml-auto text-xs text-muted-foreground hover:text-destructive transition-colors"
                      >
                        Clear all
                      </button>
                    </div>
                    <div className="space-y-2">
                      {score.highlightedTexts.map((ht, idx) => (
                        <div key={idx} className="flex items-start gap-2 group">
                          <p className="flex-1 text-sm text-foreground/70 leading-relaxed italic line-clamp-3">
                            "{ht}"
                          </p>
                          <button
                            onClick={() => {
                              const updated = score.highlightedTexts!.filter((_, i) => i !== idx);
                              onScoreChange(criterion.id, "highlightedTexts", updated);
                              if (updated.length === 0) {
                                onScoreChange(criterion.id, "validationStatus", null);
                                onScoreChange(criterion.id, "validationResult", undefined);
                              }
                            }}
                            className="mt-0.5 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Attach highlight button */}
                {pendingHighlight && (
                  <button
                    onClick={() => onAttachHighlight(criterion.id)}
                    className="mb-3 flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/5 hover:bg-primary/10 border border-primary/15 rounded-lg px-3 py-2 transition-colors w-full justify-center"
                  >
                    <Quote className="w-3.5 h-3.5" />
                    Attach selected text as evidence
                  </button>
                )}

                {/* Explanation */}
                <textarea
                  value={score?.explanation ?? ""}
                  onChange={(e) => onScoreChange(criterion.id, "explanation", e.target.value)}
                  placeholder="Provide justification for this score..."
                  rows={3}
                  className="w-full text-sm text-foreground/85 bg-muted/30 border border-border/40 rounded-lg px-3.5 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all placeholder:text-muted-foreground/50 leading-relaxed"
                />

                {/* Validate button */}
                {score?.highlightedTexts && score.highlightedTexts.length > 0 && score?.explanation && !score?.validationLoading && (
                  <button
                    onClick={() => onValidateJustification(criterion.id)}
                    className="mt-2 flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Validate justification with AI
                  </button>
                )}
              </div>

              {/* AI Suggestion — collapsible */}
              {score?.aiSuggestion && (
                <div className="mx-3 mb-3">
                  <button
                    onClick={() => onToggleValidation(criterion.id)}
                    className="w-full flex items-center gap-2 glass-panel rounded-xl px-4 py-2.5 border border-primary/15 hover:bg-primary/5 transition-colors"
                  >
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Sparkles className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                      AI Suggestion
                    </span>
                    {score?.aiSuggestedScore != null && (
                      <span className="text-xs font-bold text-primary bg-primary/10 rounded-md px-2 py-0.5 border border-primary/15">
                        {score.aiSuggestedScore}/{criterion.maxScore}
                      </span>
                    )}
                    <ChevronDown className={`w-3.5 h-3.5 text-primary/60 ml-auto transition-transform duration-200 ${isValidationActive ? "rotate-180" : ""}`} />
                  </button>

                  {isValidationActive && (
                    <div className="glass-panel rounded-b-xl border border-t-0 border-primary/15 px-4 py-3 animate-fade-in space-y-3">
                      <p className="text-sm text-foreground/75 leading-relaxed">
                        {score.aiSuggestion}
                      </p>

                      {/* Supporting Evidence */}
                      {score?.aiSupportingEvidence && score.aiSupportingEvidence.length > 0 && (
                        <div className="bg-primary/5 border border-primary/10 rounded-lg p-3">
                          <div className="flex items-center gap-1.5 mb-2">
                            <Quote className="w-3 h-3 text-primary/60" />
                            <span className="text-[10px] font-semibold text-primary/70 uppercase tracking-wide">
                              Supporting Evidence
                            </span>
                          </div>
                          <div className="space-y-1.5">
                            {score.aiSupportingEvidence.map((ev, idx) => (
                              <p key={idx} className="text-xs text-foreground/65 italic leading-relaxed border-l-2 border-primary/20 pl-2">
                                "{ev}"
                              </p>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            if (score?.aiSuggestedScore != null) {
                              onScoreChange(criterion.id, "score", score.aiSuggestedScore);
                            }
                            onScoreChange(criterion.id, "validated", true);
                            onToggleValidation(criterion.id);
                          }}
                          className="flex items-center gap-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-lg px-3.5 py-2 hover:bg-primary/90 transition-colors"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Accept{score?.aiSuggestedScore != null && score.aiSuggestedScore !== score.score ? ` (${score.aiSuggestedScore}/${criterion.maxScore})` : " Suggestion"}
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
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Validation Details Dialog */}
      <Dialog
        open={!!validationDialogCriterion}
        onOpenChange={(open) => !open && setValidationDialogCriterion(null)}
      >
        <DialogContent className="sm:max-w-md max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="font-serif text-lg">AI Validation Details</DialogTitle>
                <p className="text-sm text-muted-foreground mt-0.5">{dialogCriterion?.name}</p>
              </div>
              {dialogStatus && (
                <span className={`flex items-center gap-1 text-xs font-semibold rounded-full px-3 py-1 ${dialogStatus.badgeClass}`}>
                  {dialogStatus.label}
                </span>
              )}
            </div>
          </DialogHeader>

          <div className="space-y-5 pt-2">
            {/* Referenced Submission Excerpt */}
            <div>
              <h4 className="font-semibold text-sm text-foreground mb-2">Referenced Submission Excerpt</h4>
              <div className="border-l-[3px] border-muted-foreground/20 bg-muted/30 rounded-r-lg px-4 py-3">
                {dialogScore?.highlightedTexts?.map((ht, i) => (
                  <p key={i} className="text-sm text-foreground/70 italic leading-relaxed mb-2 last:mb-0">
                    "{ht}"
                  </p>
                ))}
              </div>
            </div>

            {/* Reasoning */}
            <div>
              <h4 className="font-semibold text-sm text-foreground mb-2">Reasoning</h4>
              <p className="text-sm text-foreground/75 leading-relaxed">
                {dialogScore?.validationResult?.reasoning}
              </p>
            </div>

            {/* Suggested Refinement */}
            <div>
              <h4 className="font-semibold text-sm text-foreground mb-2">Suggested Refinement</h4>
              <div className="border-l-[3px] border-warning bg-warning-light rounded-r-lg px-4 py-3">
                <p className="text-sm text-foreground/75 leading-relaxed">
                  {dialogScore?.validationResult?.suggestedRefinement}
                </p>
              </div>
            </div>

            {/* AI Key Quotes */}
            {dialogScore?.validationResult?.keyQuotes && dialogScore.validationResult.keyQuotes.length > 0 && (
              <div>
                <h4 className="font-semibold text-sm text-foreground mb-2">AI-Highlighted Evidence</h4>
                <div className="space-y-2">
                  {dialogScore.validationResult.keyQuotes.map((quote, i) => (
                    <div key={i} className="flex items-start gap-2 bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2">
                      <span className="text-xs font-bold text-yellow-600 mt-0.5 shrink-0">{i + 1}.</span>
                      <p className="text-sm text-foreground/75 italic leading-relaxed">"{quote}"</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">These quotes are highlighted in yellow in the submission viewer.</p>
              </div>
            )}
          </div>

          <div className="flex justify-end pt-2">
            <DialogClose asChild>
              <button className="text-sm font-medium bg-primary text-primary-foreground rounded-lg px-5 py-2 hover:bg-primary/90 transition-colors">
                Close
              </button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RubricPanel;
