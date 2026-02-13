import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface RepoData {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  topics: string[];
  has_wiki: boolean;
  license: { name: string } | null;
  updated_at: string;
  created_at: string;
  size: number;
  default_branch: string;
  fork: boolean;
}

async function fetchGitHubData(username: string) {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "GitHub-Portfolio-Analyzer",
  };

  // Fetch user profile
  const userRes = await fetch(`https://api.github.com/users/${username}`, { headers });
  if (!userRes.ok) {
    const errText = await userRes.text();
    throw new Error(`GitHub user not found: ${userRes.status} ${errText}`);
  }
  const user = await userRes.json();

  // Fetch repos (up to 100)
  const reposRes = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated&type=owner`,
    { headers }
  );
  if (!reposRes.ok) {
    const errText = await reposRes.text();
    throw new Error(`Failed to fetch repos: ${reposRes.status} ${errText}`);
  }
  const repos: RepoData[] = await reposRes.json();

  // Fetch READMEs for top 5 repos (by stars)
  const topRepos = repos
    .filter((r) => !r.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5);

  const readmes: Record<string, string> = {};
  for (const repo of topRepos) {
    try {
      const readmeRes = await fetch(
        `https://api.github.com/repos/${username}/${repo.name}/readme`,
        { headers: { ...headers, Accept: "application/vnd.github.v3.raw" } }
      );
      if (readmeRes.ok) {
        const text = await readmeRes.text();
        readmes[repo.name] = text.substring(0, 3000); // Limit size
      }
    } catch {
      // Skip if no README
    }
  }

  // Fetch recent events for activity
  const eventsRes = await fetch(
    `https://api.github.com/users/${username}/events/public?per_page=100`,
    { headers }
  );
  const events = eventsRes.ok ? await eventsRes.json() : [];

  return { user, repos: repos.filter((r) => !r.fork), readmes, events };
}

function buildAnalysisPrompt(data: {
  user: any;
  repos: RepoData[];
  readmes: Record<string, string>;
  events: any[];
}) {
  const { user, repos, readmes, events } = data;

  const languages = [...new Set(repos.map((r) => r.language).filter(Boolean))];
  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
  const totalForks = repos.reduce((s, r) => s + r.forks_count, 0);
  const reposWithDesc = repos.filter((r) => r.description).length;
  const reposWithLicense = repos.filter((r) => r.license).length;
  const reposWithTopics = repos.filter((r) => r.topics && r.topics.length > 0).length;

  // Activity analysis
  const pushEvents = events.filter((e: any) => e.type === "PushEvent");
  const uniqueDays = new Set(pushEvents.map((e: any) => e.created_at?.substring(0, 10)));

  const readmeSummary = Object.entries(readmes)
    .map(([name, content]) => `### ${name}\n${content.substring(0, 1500)}`)
    .join("\n\n");

  return `You are an expert GitHub portfolio analyzer and senior tech recruiter. Analyze this GitHub profile thoroughly.

## Profile Summary
- Username: ${user.login}
- Name: ${user.name || "Not set"}
- Bio: ${user.bio || "Not set"}
- Public repos: ${user.public_repos}
- Followers: ${user.followers}
- Following: ${user.following}
- Account created: ${user.created_at}

## Repository Statistics
- Total non-fork repos: ${repos.length}
- Languages used: ${languages.join(", ") || "None"}
- Total stars: ${totalStars}
- Total forks: ${totalForks}
- Repos with descriptions: ${reposWithDesc}/${repos.length}
- Repos with licenses: ${reposWithLicense}/${repos.length}
- Repos with topics/tags: ${reposWithTopics}/${repos.length}

## Top Repositories
${repos
  .slice(0, 10)
  .map(
    (r) =>
      `- **${r.name}**: ${r.description || "No description"} | ⭐${r.stargazers_count} | 🍴${r.forks_count} | ${r.language || "?"} | Last updated: ${r.updated_at}`
  )
  .join("\n")}

## Recent Activity
- Push events in last 90 days: ${pushEvents.length}
- Unique active days: ${uniqueDays.size}
- Recent event types: ${[...new Set(events.slice(0, 30).map((e: any) => e.type))].join(", ")}

## READMEs of Top Projects
${readmeSummary || "No READMEs found"}

---

Now provide a comprehensive analysis in the following JSON format. Be specific, actionable, and brutally honest:

{
  "totalScore": <number 0-100>,
  "grade": "<A+/A/B+/B/C+/C/D/F>",
  "recruiterReadiness": "<Strong|Moderate|Weak|Not Ready>",
  "scoreBreakdown": {
    "documentationQuality": { "score": <0-20>, "details": "<explanation>" },
    "codeStructure": { "score": <0-20>, "details": "<explanation>" },
    "activityConsistency": { "score": <0-15>, "details": "<explanation>" },
    "repoOrganization": { "score": <0-15>, "details": "<explanation>" },
    "technicalDepth": { "score": <0-15>, "details": "<explanation>" },
    "realWorldImpact": { "score": <0-15>, "details": "<explanation>" }
  },
  "strengths": ["<strength1>", "<strength2>", "<strength3>"],
  "redFlags": ["<flag1>", "<flag2>", "<flag3>"],
  "recruiterSummary": {
    "firstImpression": "<2-3 lines>",
    "hiringRecommendation": "<Strong|Moderate|Weak>",
    "standoutFactors": ["<factor1>", "<factor2>"],
    "missingElements": ["<element1>", "<element2>"]
  },
  "improvements": [
    { "title": "<improvement title>", "description": "<specific actionable advice>", "priority": "<high|medium|low>", "category": "<documentation|code|activity|organization|impact>" }
  ],
  "readmeAnalysis": [
    { "repoName": "<name>", "score": <0-10>, "strengths": ["<s1>"], "improvements": ["<i1>"] }
  ]
}

IMPORTANT: Return ONLY valid JSON, no markdown, no explanation outside the JSON.`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { username } = await req.json();

    if (!username || typeof username !== "string") {
      return new Response(
        JSON.stringify({ error: "Please provide a valid GitHub username" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Clean username
    const cleanUsername = username
      .replace(/^https?:\/\/(www\.)?github\.com\//, "")
      .replace(/\/.*$/, "")
      .trim();

    if (!cleanUsername) {
      return new Response(
        JSON.stringify({ error: "Could not extract a valid username" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Analyzing GitHub profile: ${cleanUsername}`);

    // Fetch GitHub data
    const githubData = await fetchGitHubData(cleanUsername);

    // Build prompt and call AI
    const prompt = buildAnalysisPrompt(githubData);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: "You are an expert GitHub portfolio analyzer. Return only valid JSON." },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await aiResponse.text();
      console.error("AI gateway error:", aiResponse.status, t);
      throw new Error(`AI analysis failed: ${aiResponse.status}`);
    }

    const aiResult = await aiResponse.json();
    const rawContent = aiResult.choices?.[0]?.message?.content || "";

    // Parse the JSON from the AI response
    let analysis;
    try {
      // Try to extract JSON from possible markdown code blocks
      const jsonMatch = rawContent.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, rawContent];
      analysis = JSON.parse(jsonMatch[1].trim());
    } catch (parseError) {
      console.error("Failed to parse AI response:", rawContent.substring(0, 500));
      throw new Error("Failed to parse AI analysis results");
    }

    // Return combined data
    return new Response(
      JSON.stringify({
        profile: {
          login: githubData.user.login,
          name: githubData.user.name,
          avatar_url: githubData.user.avatar_url,
          bio: githubData.user.bio,
          public_repos: githubData.user.public_repos,
          followers: githubData.user.followers,
          following: githubData.user.following,
          created_at: githubData.user.created_at,
          html_url: githubData.user.html_url,
        },
        repoCount: githubData.repos.length,
        languages: [...new Set(githubData.repos.map((r) => r.language).filter(Boolean))],
        totalStars: githubData.repos.reduce((s, r) => s + r.stargazers_count, 0),
        analysis,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("analyze-github error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
