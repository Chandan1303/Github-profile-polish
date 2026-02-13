import { ArrowUp, ArrowRight as ArrowMid, ArrowDown } from "lucide-react";
import type { Improvement } from "@/types/analysis";

interface ImprovementsListProps {
  improvements: Improvement[];
}

function getPriorityStyles(p: string) {
  if (p === "high") return { icon: ArrowUp, color: "text-destructive", bg: "bg-destructive/10 border-destructive/20" };
  if (p === "medium") return { icon: ArrowMid, color: "text-[hsl(var(--chart-4))]", bg: "bg-[hsl(var(--chart-4)/0.1)] border-[hsl(var(--chart-4)/0.2)]" };
  return { icon: ArrowDown, color: "text-primary", bg: "bg-primary/10 border-primary/20" };
}

const ImprovementsList = ({ improvements }: ImprovementsListProps) => {
  return (
    <div className="glass rounded-2xl p-6 animate-slide-up">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-5">
        🎯 Actionable Improvements
      </h3>
      <div className="space-y-3">
        {improvements.map((imp, i) => {
          const style = getPriorityStyles(imp.priority);
          const Icon = style.icon;
          return (
            <div key={i} className={`p-4 rounded-xl border ${style.bg}`}>
              <div className="flex items-start gap-3">
                <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${style.color}`} />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-foreground">{imp.title}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-mono uppercase ${style.bg} ${style.color}`}>
                      {imp.priority}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{imp.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImprovementsList;
