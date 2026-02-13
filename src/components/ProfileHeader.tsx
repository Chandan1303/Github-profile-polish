import { Github, Star, GitFork, Code, Calendar } from "lucide-react";
import type { GitHubProfile } from "@/types/analysis";

interface ProfileHeaderProps {
  profile: GitHubProfile;
  repoCount: number;
  languages: string[];
  totalStars: number;
}

const ProfileHeader = ({ profile, repoCount, languages, totalStars }: ProfileHeaderProps) => {
  const joined = new Date(profile.created_at).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <div className="glass rounded-2xl p-6 animate-slide-up">
      <div className="flex items-center gap-5">
        <img
          src={profile.avatar_url}
          alt={profile.login}
          className="w-16 h-16 rounded-full border-2 border-primary/30"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold font-mono text-foreground truncate">
              {profile.name || profile.login}
            </h2>
            <a
              href={profile.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
          {profile.bio && (
            <p className="text-sm text-muted-foreground mt-0.5 truncate">{profile.bio}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
        <Stat icon={Code} label="Repos" value={repoCount} />
        <Stat icon={Star} label="Stars" value={totalStars} />
        <Stat icon={GitFork} label="Followers" value={profile.followers} />
        <Stat icon={Calendar} label="Joined" value={joined} />
      </div>

      {languages.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-4">
          {languages.slice(0, 10).map((lang) => (
            <span
              key={lang}
              className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-mono"
            >
              {lang}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

function Stat({ icon: Icon, label, value }: { icon: any; label: string; value: string | number }) {
  return (
    <div className="text-center p-2 rounded-lg bg-secondary/50">
      <Icon className="w-3.5 h-3.5 text-muted-foreground mx-auto mb-1" />
      <div className="text-lg font-bold font-mono text-foreground">{value}</div>
      <div className="text-[10px] text-muted-foreground uppercase">{label}</div>
    </div>
  );
}

export default ProfileHeader;
