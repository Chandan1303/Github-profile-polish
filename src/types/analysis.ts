export interface ScoreBreakdownItem {
  score: number;
  details: string;
}

export interface RecruiterSummary {
  firstImpression: string;
  hiringRecommendation: string;
  standoutFactors: string[];
  missingElements: string[];
}

export interface Improvement {
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  category: string;
}

export interface ReadmeAnalysisItem {
  repoName: string;
  score: number;
  strengths: string[];
  improvements: string[];
}

export interface AnalysisResult {
  totalScore: number;
  grade: string;
  recruiterReadiness: string;
  scoreBreakdown: {
    documentationQuality: ScoreBreakdownItem;
    codeStructure: ScoreBreakdownItem;
    activityConsistency: ScoreBreakdownItem;
    repoOrganization: ScoreBreakdownItem;
    technicalDepth: ScoreBreakdownItem;
    realWorldImpact: ScoreBreakdownItem;
  };
  strengths: string[];
  redFlags: string[];
  recruiterSummary: RecruiterSummary;
  improvements: Improvement[];
  readmeAnalysis: ReadmeAnalysisItem[];
}

export interface GitHubProfile {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  html_url: string;
}

export interface AnalysisResponse {
  profile: GitHubProfile;
  repoCount: number;
  languages: string[];
  totalStars: number;
  analysis: AnalysisResult;
}
