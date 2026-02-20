import { useNavigate } from "react-router-dom";
import { ArrowRight, Shield, BookOpen, Users } from "lucide-react";
import { assignments } from "@/lib/mockData";

const Dashboard = () => {
  const navigate = useNavigate();
  const assignment = assignments[0];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/60 bg-card/60 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Shield className="w-6 h-6 text-primary" strokeWidth={1.5} />
            <h1 className="font-serif text-xl font-semibold tracking-tight text-foreground">
              RubricGuard AI
            </h1>
          </div>
          <span className="text-sm text-muted-foreground font-medium">Prof. Sharma</span>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="max-w-xl w-full text-center space-y-3 mb-12 animate-fade-in">
          <h2 className="font-serif text-3xl font-semibold text-foreground leading-snug">
            Welcome back
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Select an assignment to begin your AI-assisted grading session.
          </p>
        </div>

        {/* Assignment Card */}
        <button
          onClick={() => navigate("/grading/bus302-ca1")}
          className="group max-w-lg w-full bg-card rounded-xl border border-border/60 shadow-soft hover:shadow-soft-lg transition-all duration-300 p-7 text-left animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="flex items-start justify-between mb-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-accent rounded-md px-2.5 py-1">
              <BookOpen className="w-3.5 h-3.5" />
              {assignment.course}
            </span>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
          </div>

          <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
            {assignment.title}
          </h3>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-5">
            <span>Due: {assignment.dueDate}</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span>{assignment.totalSubmissions} submissions</span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>{assignment.sections.length} sections</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="text-muted-foreground">{assignment.rubricCriteria} rubric criteria</span>
          </div>

          {/* Progress */}
          <div className="mt-5 pt-5 border-t border-border/40">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Grading progress</span>
              <span className="font-medium text-foreground">
                {assignment.gradedCount}/{assignment.totalSubmissions}
              </span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary/60 rounded-full transition-all duration-500"
                style={{ width: `${(assignment.gradedCount / assignment.totalSubmissions) * 100}%` }}
              />
            </div>
          </div>
        </button>

        {/* Disclaimer */}
        <p className="mt-12 text-sm text-muted-foreground/70 max-w-md text-center leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
          RubricGuard AI assists with grading consistency. All final grading
          decisions remain with the professor.
        </p>
      </main>
    </div>
  );
};

export default Dashboard;
