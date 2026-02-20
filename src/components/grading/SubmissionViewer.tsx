import { FileText, Clock, MapPin } from "lucide-react";

interface Props {
  student: {
    id: string;
    name: string;
    submittedAt: string;
    section: string;
    content: string;
  };
}

const SubmissionViewer = ({ student }: Props) => {
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
      </div>

      <div className="bg-card rounded-xl border border-border/40 shadow-soft p-5">
        <div className="prose prose-sm max-w-none">
          {student.content.split("\n\n").map((paragraph, i) => (
            <p
              key={i}
              className="text-foreground/85 leading-[1.8] text-[14.5px] mb-4 last:mb-0"
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
