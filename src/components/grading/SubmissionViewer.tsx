import { FileText, Clock, MapPin, Highlighter } from "lucide-react";
import { useCallback } from "react";

interface Props {
  student: {
    id: string;
    name: string;
    submittedAt: string;
    section: string;
    content: string;
  };
  onTextSelected?: (text: string) => void;
}

const SubmissionViewer = ({ student, onTextSelected }: Props) => {
  const handleMouseUp = useCallback(() => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();
    if (text && text.length > 3 && onTextSelected) {
      onTextSelected(text);
    }
  }, [onTextSelected]);

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
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubmissionViewer;
