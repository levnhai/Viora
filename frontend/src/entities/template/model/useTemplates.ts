import { useState, useEffect } from "react";
import { Template, fetchTemplates } from "../api/template.api";

export function useTemplates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchTemplates();
        setTemplates(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to load templates");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { templates, loading, error };
}
