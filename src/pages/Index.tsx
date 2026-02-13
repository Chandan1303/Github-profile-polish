import { AlertCircle } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import ProfileHeader from "@/components/ProfileHeader";
import ScoreDisplay from "@/components/ScoreDisplay";
import ScoreRadar from "@/components/ScoreRadar";
import ScoreBreakdown from "@/components/ScoreBreakdown";
import StrengthsRedFlags from "@/components/StrengthsRedFlags";
import RecruiterCard from "@/components/RecruiterCard";
import ImprovementsList from "@/components/ImprovementsList";
import ReadmeAnalysis from "@/components/ReadmeAnalysis";
import { useGitHubAnalysis } from "@/hooks/useGitHubAnalysis";

const Index = () => {
  const { data, loading, error, analyze } = useGitHubAnalysis();

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onAnalyze={analyze} loading={loading} />

      {error && (
        <div className="max-w-2xl mx-auto px-4 mb-8">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            {error}
          </div>
        </div>
      )}

      {data && (
        <div className="max-w-6xl mx-auto px-4 pb-20 space-y-6">
          <ProfileHeader
            profile={data.profile}
            repoCount={data.repoCount}
            languages={data.languages}
            totalStars={data.totalStars}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ScoreDisplay analysis={data.analysis} />
            <div className="lg:col-span-2">
              <ScoreRadar analysis={data.analysis} />
            </div>
          </div>

          <ScoreBreakdown analysis={data.analysis} />
          <StrengthsRedFlags analysis={data.analysis} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecruiterCard summary={data.analysis.recruiterSummary} />
            <ImprovementsList improvements={data.analysis.improvements} />
          </div>

          <ReadmeAnalysis items={data.analysis.readmeAnalysis} />

          <div className="text-center pt-8">
            <p className="text-xs text-muted-foreground">
              Powered by AI • Analysis based on public GitHub data
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
