import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, ArrowLeft, ChevronLeft, ChevronRight, BarChart3 } from "lucide-react";
import { studentSubmissions, rubricCriteria, sampleGradedData, type GradingScore } from "@/lib/mockData";
import SubmissionViewer from "@/components/grading/SubmissionViewer";
import RubricPanel from "@/components/grading/RubricPanel";
import LiveAnalytics from "@/components/grading/LiveAnalytics";

const GradingWorkspace = () => {
  const navigate = useNavigate();
  const [currentStudentIdx, setCurrentStudentIdx] = useState(0);
  const student = studentSubmissions[currentStudentIdx];

  const [scores, setScores] = useState<Record<string, GradingScore[]>>(() => {
    // Initialize with sample data for demo
    const initial: Record<string, GradingScore[]> = {};
    studentSubmissions.forEach((s) => {
      initial[s.id] = sampleGradedData[s.id] || rubricCriteria.map((c) => ({
        criterionId: c.id,
        score: null,
        explanation: "",
        validated: false,
      }));
    });
    return initial;
  });

  const [activeValidation, setActiveValidation] = useState<string | null>("arg-clarity");

  const currentScores = scores[student.id] || [];
  const totalScore = currentScores.reduce((sum, s) => sum + (s.score || 0), 0);
  const maxTotal = rubricCriteria.reduce((sum, c) => sum + c.maxScore, 0);

  const updateScore = (criterionId: string, field: keyof GradingScore, value: any) => {
    setScores((prev) => ({
      ...prev,
      [student.id]: (prev[student.id] || []).map((s) =>
        s.criterionId === criterionId ? { ...s, [field]: value } : s
      ),
    }));
  };

  const gradedStudents = Object.entries(scores).filter(([_, s]) =>
    s.every((sc) => sc.score !== null)
  ).length;

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-white via-blue-50/30 to-slate-50/40 overflow-hidden">
      {/* Header */}
      <header className="border-b border-border/60 bg-card/60 backdrop-blur-sm flex-shrink-0">
        <div className="px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Dashboard
            </button>
            <div className="w-px h-5 bg-border" />
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" strokeWidth={1.5} />
              <span className="font-serif font-semibold text-foreground">RubricGuard AI</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Student nav */}
            <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-1.5">
              <button
                onClick={() => setCurrentStudentIdx(Math.max(0, currentStudentIdx - 1))}
                disabled={currentStudentIdx === 0}
                className="text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm font-medium text-foreground min-w-[80px] text-center">
                {student.id}
              </span>
              <button
                onClick={() => setCurrentStudentIdx(Math.min(studentSubmissions.length - 1, currentStudentIdx + 1))}
                disabled={currentStudentIdx === studentSubmissions.length - 1}
                className="text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{totalScore}</span>
              <span>/{maxTotal}</span>
            </div>

            <button
              onClick={() => navigate("/analytics")}
              className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              Analytics
            </button>
          </div>
        </div>
      </header>

      {/* 3-Column Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Submission */}
        <div className="w-[30%] border-r border-border/40 overflow-y-auto scrollbar-thin">
          <SubmissionViewer student={student} />
        </div>

        {/* Center: Rubric Scoring */}
        <div className="w-[45%] overflow-y-auto scrollbar-thin">
          <RubricPanel
            criteria={rubricCriteria}
            scores={currentScores}
            activeValidation={activeValidation}
            onScoreChange={updateScore}
            onToggleValidation={(id) => setActiveValidation(activeValidation === id ? null : id)}
            studentId={student.id}
          />
        </div>

        {/* Right: Live Analytics */}
        <div className="w-[25%] border-l border-border/40 overflow-y-auto scrollbar-thin bg-surface-overlay/50">
          <LiveAnalytics
            scores={currentScores}
            criteria={rubricCriteria}
            gradedCount={gradedStudents}
            totalCount={studentSubmissions.length}
          />
        </div>
      </div>
    </div>
  );
};

export default GradingWorkspace;
