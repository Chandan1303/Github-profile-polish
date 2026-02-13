import { useState } from "react";
import { Search, Github, ArrowRight, Loader2 } from "lucide-react";

interface HeroSectionProps {
  onAnalyze: (input: string) => void;
  loading: boolean;
}

const HeroSection = ({ onAnalyze, loading }: HeroSectionProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !loading) {
      onAnalyze(input.trim());
    }
  };

  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-4">
      {/* Background grid */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-3xl w-full text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-secondary/50 text-sm text-muted-foreground mb-8">
          <Github className="w-4 h-4" />
          <span>AI-Powered Portfolio Analysis</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold font-mono tracking-tight mb-6">
          <span className="text-foreground">GitHub</span>
          <br />
          <span className="text-primary glow-text">Portfolio Analyzer</span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-12">
          Get an AI-powered recruiter-perspective analysis of your GitHub profile.
          Discover your strengths, fix red flags, and become hire-ready.
        </p>

        <form onSubmit={handleSubmit} className="relative max-w-xl mx-auto">
          <div className="relative glass rounded-xl glow-green">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter GitHub username or URL..."
              className="w-full bg-transparent pl-12 pr-32 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 rounded-xl font-mono text-sm"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing
                </>
              ) : (
                <>
                  Analyze
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {loading && (
          <div className="mt-8 flex flex-col items-center gap-3 animate-slide-up">
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary animate-pulse-glow"
                  style={{ animationDelay: `${i * 0.3}s` }}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Fetching repos & running AI analysis... This may take 15-30 seconds.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
