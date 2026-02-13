import { CheckCircle, AlertTriangle } from "lucide-react";
import type { AnalysisResult } from "@/types/analysis";

interface StrengthsRedFlagsProps {
  analysis: AnalysisResult;
}

const StrengthsRedFlags = ({ analysis }: StrengthsRedFlagsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="glass rounded-2xl p-6 animate-slide-up">
        <h3 className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          Strengths
        </h3>
        <ul className="space-y-3">
          {analysis.strengths.map((s, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div className="glass rounded-2xl p-6 animate-slide-up">
        <h3 className="text-sm font-semibold text-destructive uppercase tracking-widest mb-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          Red Flags
        </h3>
        <ul className="space-y-3">
          {analysis.redFlags.map((f, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StrengthsRedFlags;
