import { FileText, Clock, MapPin, Highlighter } from "lucide-react";
import { useCallback, useMemo } from "react";

interface Props {
  student: {
    id: string;
    name: string;
    submittedAt: string;
    section: string;
    content: string;
  };
  onTextSelected?: (text: string) => void;
  aiHighlights?: string[];
}

/** Split text so that any substring matching one of the AI quotes is wrapped in a yellow highlight */
const highlightText = (text: string, quotes: string[]) => {
  if (!quotes.length) return [text];

  // Sort quotes longest-first to prefer longer matches
  const sorted = [...quotes].sort((a, b) => b.length - a.length);
  const escaped = sorted.map((q) => q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(`(${escaped.join("|")})`, "gi");

  const parts = text.split(regex);
  return parts.map((part, i) => {
    const isMatch = sorted.some((q) => q.toLowerCase() === part.toLowerCase());
    if (isMatch) {
      return (
        <mark
          key={i}
          className="bg-yellow-200/70 text-foreground rounded-sm px-0.5 -mx-0.5"
          title="AI-highlighted evidence"
        >
          {part}
        </mark>
      );
    }
    return part;
  });
};

const SubmissionViewer = ({ student, onTextSelected, aiHighlights = [] }: Props) => {
  const handleMouseUp = useCallback(() => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();
    if (text && text.length > 3 && onTextSelected) {
      onTextSelected(text);
    }
  }, [onTextSelected]);

  const uniqueHighlights = useMemo(
    () => [...new Set(aiHighlights)],
    [aiHighlights]
  );

  return (
    <div className="p-6">
      <div className="mb-5">
        <h2 className="font-serif text-lg font-semibold text-foreground mb-3">
          Student Submission
        </h2>
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <FileText className="w-3.5 h-3.5" />
            {student.id}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {student.submittedAt}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {student.section}
          </span>
        </div>
        {onTextSelected && (
          <div className="flex items-center gap-1.5 mt-3 text-xs text-primary/70 bg-primary/5 rounded-lg px-3 py-2 border border-primary/10">
            <Highlighter className="w-3.5 h-3.5" />
            Select text to attach as evidence for a rubric criterion
          </div>
        )}
        {uniqueHighlights.length > 0 && (
          <div className="flex items-center gap-1.5 mt-2 text-xs text-yellow-700 bg-yellow-50 rounded-lg px-3 py-2 border border-yellow-200">
            <Sparkle className="w-3.5 h-3.5" />
            Yellow highlights show AI-identified key evidence
          </div>
        )}
      </div>

      <div
        className="bg-card rounded-xl border border-border/40 shadow-soft p-5 select-text cursor-text"
        onMouseUp={handleMouseUp}
      >
        <div className="prose prose-sm max-w-none">
          {student.content.split("\n\n").map((paragraph, i) => (
            <p
              key={i}
              className="text-foreground/85 leading-[1.8] text-[14.5px] mb-4 last:mb-0 selection:bg-primary/20 selection:text-primary"
            >
              {highlightText(paragraph, uniqueHighlights)}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

// Small sparkle icon for the legend
const Sparkle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5z" />
  </svg>
);

export default SubmissionViewer;
