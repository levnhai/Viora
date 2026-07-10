import { useState, useEffect, useCallback } from "react";
import { fetchInvitations } from "../api/invitation.api";

export const useInvitations = (initialQuery: any = {}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState(initialQuery);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchInvitations(query);
      setData(result);
    } catch (err: any) {
      console.error("Failed to fetch invitations:", err);
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const updateQuery = (newParams: any) => {
    setQuery((prev: any) => ({ ...prev, ...newParams, page: newParams.page || 1 }));
  };

  return { loading, data, error, query, updateQuery, reload: loadData };
};
