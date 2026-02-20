import { useNavigate } from "react-router-dom";
import { ArrowRight, Shield, BookOpen, Users, Sparkles, BarChart3, ClipboardCheck, Calendar, GraduationCap } from "lucide-react";
import { assignments } from "@/lib/mockData";

const Dashboard = () => {
  const navigate = useNavigate();
  const assignment = assignments[0];

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Blue gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.3),transparent_60%)]" />

      {/* Header */}
      <header className="relative z-10 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Shield className="w-6 h-6 text-white" strokeWidth={1.5} />
            <h1 className="font-serif text-xl font-semibold tracking-tight text-white">
              RubricGuard AI
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-white/70" />
            <span className="text-sm text-white/80 font-medium">Prof. Sharma</span>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-16">
        {/* Hero Section */}
        <div className="max-w-xl w-full text-center space-y-4 mb-14 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-2">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-sm text-white/90 font-medium">AI-Powered Grading Assistant</span>
          </div>
          <h2 className="font-serif text-4xl font-semibold text-white leading-snug">
            Welcome back
          </h2>
          <p className="text-white/70 text-lg leading-relaxed">
            Select an assignment to begin your AI-assisted grading session.
          </p>
        </div>

        {/* Feature pills */}
        <div className="flex items-center gap-3 mb-10 animate-fade-in" style={{ animationDelay: "0.05s" }}>
          {[
            { icon: BarChart3, label: "Drift Detection" },
            { icon: ClipboardCheck, label: "Rubric Validation" },
            { icon: Sparkles, label: "AI Suggestions" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3.5 py-1.5 text-xs text-white/80 font-medium">
              <Icon className="w-3.5 h-3.5" />
              {label}
            </div>
          ))}
        </div>

        {/* Assignment Card */}
        <button
          onClick={() => navigate("/grading/bus302-ca1")}
          className="group max-w-lg w-full bg-white rounded-2xl shadow-soft-lg hover:shadow-2xl transition-all duration-300 p-7 text-left animate-fade-in border border-white/80"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="flex items-start justify-between mb-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-accent rounded-lg px-2.5 py-1">
              <BookOpen className="w-3.5 h-3.5" />
              {assignment.course}
            </span>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
          </div>

          <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
            {assignment.title}
          </h3>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-5">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Due: {assignment.dueDate}
            </span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span>{assignment.totalSubmissions} submissions</span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>{assignment.sections.length} sections</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-border" />
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <ClipboardCheck className="w-4 h-4" />
              <span>{assignment.rubricCriteria} rubric criteria</span>
            </div>
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
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.max((assignment.gradedCount / assignment.totalSubmissions) * 100, 2)}%` }}
              />
            </div>
          </div>

          {/* Start Grading CTA */}
          <div className="mt-5 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl py-2.5 font-medium text-sm group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
            <Sparkles className="w-4 h-4" />
            Start Grading
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </button>

        {/* Disclaimer */}
        <p className="mt-12 text-sm text-white/50 max-w-md text-center leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
          RubricGuard AI assists with grading consistency. All final grading
          decisions remain with the professor.
        </p>
      </main>
    </div>
  );
};

export default Dashboard;
