import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { AnalysisResponse } from "@/types/analysis";

export function useGitHubAnalysis() {
  const [data, setData] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = async (input: string) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const username = input
        .replace(/^https?:\/\/(www\.)?github\.com\//, "")
        .replace(/\/.*$/, "")
        .trim();

      if (!username) {
        throw new Error("Please enter a valid GitHub username or URL");
      }

      const { data: result, error: fnError } = await supabase.functions.invoke(
        "analyze-github",
        { body: { username } }
      );

      if (fnError) throw new Error(fnError.message);
      if (result?.error) throw new Error(result.error);

      setData(result as AnalysisResponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, analyze };
}
