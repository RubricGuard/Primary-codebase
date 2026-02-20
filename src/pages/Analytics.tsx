import { useNavigate } from "react-router-dom";
import { Shield, ArrowLeft, FileCheck, TrendingUp, Sparkles, CheckCircle } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const scoreTimeline = [
  { submission: "STU001", score: 90 },
  { submission: "STU002", score: 53 },
  { submission: "STU003", score: 96 },
];

const criterionStability = [
  { criterion: "Arg. Clarity", variance: 4.2 },
  { criterion: "Evidence", variance: 5.1 },
  { criterion: "Analysis", variance: 7.0 },
  { criterion: "Writing", variance: 3.8 },
];

const Analytics = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/40 to-indigo-50/30">
      {/* Header */}
      <header className="border-b border-border/60 bg-card/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <div className="w-px h-5 bg-border" />
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" strokeWidth={1.5} />
              <span className="font-serif font-semibold text-foreground">RubricGuard AI</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-10 animate-fade-in">
          <h1 className="font-serif text-2xl font-semibold text-foreground mb-1">
            Grading Session Analytics
          </h1>
          <p className="text-muted-foreground">
            Case Analysis 1: Strategic Pivot — BUS302
          </p>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-3 gap-5 mb-10 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <MetricCard
            icon={<FileCheck className="w-5 h-5 text-primary" />}
            label="Submissions Graded"
            value="3"
          />
          <MetricCard
            icon={<TrendingUp className="w-5 h-5 text-success" />}
            label="Average Score"
            value="89.7"
          />
          <MetricCard
            icon={<Sparkles className="w-5 h-5 text-primary" />}
            label="AI Support Rate"
            value="33%"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-5 mb-10 animate-fade-in" style={{ animationDelay: "0.15s" }}>
          {/* Score Timeline */}
          <div className="bg-card rounded-xl border border-border/40 shadow-soft p-6">
            <h3 className="font-semibold text-foreground mb-4">Score Timeline</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={scoreTimeline}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 12% 88%)" />
                <XAxis dataKey="submission" tick={{ fontSize: 12, fill: "hsl(220 10% 45%)" }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "hsl(220 10% 45%)" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(40 25% 99%)",
                    border: "1px solid hsl(220 12% 88%)",
                    borderRadius: "8px",
                    fontSize: "13px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="hsl(213 40% 52%)"
                  strokeWidth={2.5}
                  dot={{ fill: "hsl(213 40% 52%)", r: 4, strokeWidth: 0 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Criterion Stability */}
          <div className="bg-card rounded-xl border border-border/40 shadow-soft p-6">
            <h3 className="font-semibold text-foreground mb-4">Criterion Stability</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={criterionStability}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 12% 88%)" />
                <XAxis dataKey="criterion" tick={{ fontSize: 11, fill: "hsl(220 10% 45%)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(220 10% 45%)" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(40 25% 99%)",
                    border: "1px solid hsl(220 12% 88%)",
                    borderRadius: "8px",
                    fontSize: "13px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                  }}
                />
                <Bar
                  dataKey="variance"
                  fill="hsl(152 45% 45%)"
                  radius={[6, 6, 0, 0]}
                  barSize={36}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Finalize */}
        <div className="flex justify-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <button
            onClick={() => {
              navigate("/");
            }}
            className="group flex items-center gap-2.5 bg-primary text-primary-foreground font-semibold text-base rounded-xl px-8 py-3.5 shadow-soft hover:glow-primary hover:shadow-soft-lg transition-all duration-300"
          >
            <CheckCircle className="w-5 h-5" />
            Finalize Grades
          </button>
        </div>
      </main>
    </div>
  );
};

const MetricCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="bg-card rounded-xl border border-border/40 shadow-soft p-5">
    <div className="flex items-center gap-2.5 mb-3">
      {icon}
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
    <p className="text-3xl font-serif font-semibold text-foreground">{value}</p>
  </div>
);

export default Analytics;
