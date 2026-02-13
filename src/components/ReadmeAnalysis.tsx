import type { ReadmeAnalysisItem } from "@/types/analysis";
import { FileText } from "lucide-react";

interface ReadmeAnalysisProps {
  items: ReadmeAnalysisItem[];
}

const ReadmeAnalysis = ({ items }: ReadmeAnalysisProps) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="glass rounded-2xl p-6 animate-slide-up">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-5 flex items-center gap-2">
        <FileText className="w-4 h-4" />
        README Analysis
      </h3>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="p-4 rounded-xl bg-secondary/30 border border-border">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-sm text-foreground font-semibold">{item.repoName}</span>
              <span className="font-mono text-sm text-primary font-bold">{item.score}/10</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-primary font-semibold block mb-1">Strengths</span>
                <ul className="space-y-1 text-muted-foreground">
                  {item.strengths.map((s, j) => (
                    <li key={j}>• {s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="text-destructive font-semibold block mb-1">To Improve</span>
                <ul className="space-y-1 text-muted-foreground">
                  {item.improvements.map((im, j) => (
                    <li key={j}>• {im}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadmeAnalysis;
