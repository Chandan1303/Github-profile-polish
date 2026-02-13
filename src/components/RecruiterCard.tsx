import { User, Briefcase, Eye, AlertCircle } from "lucide-react";
import type { RecruiterSummary } from "@/types/analysis";

interface RecruiterCardProps {
  summary: RecruiterSummary;
}

function getRecColor(rec: string) {
  if (rec === "Strong") return "text-primary";
  if (rec === "Moderate") return "text-[hsl(var(--chart-4))]";
  return "text-destructive";
}

const RecruiterCard = ({ summary }: RecruiterCardProps) => {
  return (
    <div className="glass rounded-2xl p-6 animate-slide-up gradient-border">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-5 flex items-center gap-2">
        <Briefcase className="w-4 h-4" />
        AI Recruiter Feedback
      </h3>

      <div className="space-y-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Eye className="w-3.5 h-3.5" />
            First Impression
          </div>
          <p className="text-sm text-foreground leading-relaxed">{summary.firstImpression}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <User className="w-3.5 h-3.5" />
            Hiring Recommendation
          </div>
          <span className={`text-lg font-bold font-mono ${getRecColor(summary.hiringRecommendation)}`}>
            {summary.hiringRecommendation}
          </span>
        </div>

        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <CheckIcon />
            Standout Factors
          </div>
          <ul className="space-y-1.5">
            {summary.standoutFactors.map((f, i) => (
              <li key={i} className="text-sm text-foreground flex items-start gap-2">
                <span className="text-primary mt-0.5">›</span> {f}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <AlertCircle className="w-3.5 h-3.5" />
            Missing Elements
          </div>
          <ul className="space-y-1.5">
            {summary.missingElements.map((m, i) => (
              <li key={i} className="text-sm text-foreground flex items-start gap-2">
                <span className="text-destructive mt-0.5">›</span> {m}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

function CheckIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export default RecruiterCard;
