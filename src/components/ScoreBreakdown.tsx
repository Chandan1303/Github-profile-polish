import type { AnalysisResult } from "@/types/analysis";

interface ScoreBreakdownProps {
  analysis: AnalysisResult;
}

const categories = [
  { key: "documentationQuality" as const, label: "Documentation Quality", max: 20 },
  { key: "codeStructure" as const, label: "Code Structure & Practices", max: 20 },
  { key: "activityConsistency" as const, label: "Activity Consistency", max: 15 },
  { key: "repoOrganization" as const, label: "Repository Organization", max: 15 },
  { key: "technicalDepth" as const, label: "Technical Depth", max: 15 },
  { key: "realWorldImpact" as const, label: "Real-World Impact", max: 15 },
];

const ScoreBreakdown = ({ analysis }: ScoreBreakdownProps) => {
  return (
    <div className="glass rounded-2xl p-6 animate-slide-up">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-5">
        Detailed Scores
      </h3>
      <div className="space-y-4">
        {categories.map((cat) => {
          const item = analysis.scoreBreakdown[cat.key];
          const pct = (item.score / cat.max) * 100;
          return (
            <div key={cat.key}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm text-foreground">{cat.label}</span>
                <span className="text-sm font-mono text-primary">
                  {item.score}/{cat.max}
                </span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${pct}%`, boxShadow: "0 0 8px hsl(var(--primary) / 0.4)" }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{item.details}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScoreBreakdown;
