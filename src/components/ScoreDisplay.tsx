import type { AnalysisResult } from "@/types/analysis";

interface ScoreDisplayProps {
  analysis: AnalysisResult;
}

function getGradeColor(grade: string) {
  if (grade.startsWith("A")) return "text-primary";
  if (grade.startsWith("B")) return "text-[hsl(var(--chart-2))]";
  if (grade.startsWith("C")) return "text-[hsl(var(--chart-4))]";
  return "text-destructive";
}

function getReadinessColor(readiness: string) {
  if (readiness === "Strong") return "bg-primary/20 text-primary border-primary/30";
  if (readiness === "Moderate") return "bg-[hsl(var(--chart-4)/0.2)] text-[hsl(var(--chart-4))] border-[hsl(var(--chart-4)/0.3)]";
  return "bg-destructive/20 text-destructive border-destructive/30";
}

const ScoreDisplay = ({ analysis }: ScoreDisplayProps) => {
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (analysis.totalScore / 100) * circumference;

  return (
    <div className="glass rounded-2xl p-8 glow-green animate-score-reveal text-center">
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-6">
        Portfolio Score
      </h2>

      <div className="relative w-40 h-40 mx-auto mb-6">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
            style={{ filter: "drop-shadow(0 0 6px hsl(var(--primary) / 0.5))" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold font-mono text-foreground">{analysis.totalScore}</span>
          <span className="text-xs text-muted-foreground">/100</span>
        </div>
      </div>

      <div className={`text-3xl font-bold font-mono mb-3 ${getGradeColor(analysis.grade)}`}>
        {analysis.grade}
      </div>

      <div className={`inline-flex px-4 py-1.5 rounded-full border text-xs font-semibold ${getReadinessColor(analysis.recruiterReadiness)}`}>
        {analysis.recruiterReadiness} — Recruiter Readiness
      </div>
    </div>
  );
};

export default ScoreDisplay;
