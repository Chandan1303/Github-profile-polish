import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import type { AnalysisResult } from "@/types/analysis";

interface ScoreRadarProps {
  analysis: AnalysisResult;
}

const ScoreRadar = ({ analysis }: ScoreRadarProps) => {
  const b = analysis.scoreBreakdown;
  const data = [
    { metric: "Documentation", value: (b.documentationQuality.score / 20) * 100, fullMark: 100 },
    { metric: "Code Quality", value: (b.codeStructure.score / 20) * 100, fullMark: 100 },
    { metric: "Activity", value: (b.activityConsistency.score / 15) * 100, fullMark: 100 },
    { metric: "Organization", value: (b.repoOrganization.score / 15) * 100, fullMark: 100 },
    { metric: "Tech Depth", value: (b.technicalDepth.score / 15) * 100, fullMark: 100 },
    { metric: "Impact", value: (b.realWorldImpact.score / 15) * 100, fullMark: 100 },
  ];

  return (
    <div className="glass rounded-2xl p-6 animate-slide-up">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">
        Score Breakdown
      </h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis
              dataKey="metric"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={false}
              axisLine={false}
            />
            <Radar
              name="Score"
              dataKey="value"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ScoreRadar;
