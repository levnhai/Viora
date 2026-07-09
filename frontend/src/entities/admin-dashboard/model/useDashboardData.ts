import { useState, useEffect } from "react";
import { fetchAdminDashboardData } from "../api/dashboard.api";

export const useDashboardData = () => {
  const [loading, setLoading] = useState(true);
  const [requestsList, setRequestsList] = useState<any[]>([]);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const { requestsList, dashboardData } = await fetchAdminDashboardData();
        setRequestsList(requestsList);
        setDashboardData(dashboardData);
      } catch (err: any) {
        console.error("Failed to fetch dashboard data:", err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { loading, requestsList, dashboardData, error };
};
