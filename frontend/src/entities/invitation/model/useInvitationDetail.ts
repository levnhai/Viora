import { useState, useEffect, useCallback } from "react";
import { fetchInvitationDetail } from "../api/invitation.api";

export const useInvitationDetail = (slug: string) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    try {
      const result = await fetchInvitationDetail(slug);
      setData(result);
    } catch (err: any) {
      console.error("Failed to fetch invitation details:", err);
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { loading, data, error, reload: loadData };
};
