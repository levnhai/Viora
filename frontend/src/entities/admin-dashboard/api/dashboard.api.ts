import { API_URL } from "@/shared/lib/config";

export const fetchAdminDashboardData = async () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers: Record<string, string> = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const [reqRes, dashRes] = await Promise.all([
    fetch(`${API_URL}/api/invitation-requests`, {
      credentials: "include",
      headers,
    }),
    fetch(`${API_URL}/api/admin/dashboard`, {
      credentials: "include",
      headers,
    }),
  ]);

  if (reqRes.status === 401 || dashRes.status === 401) {
    throw new Error("UNAUTHORIZED");
  }

  const requestsList = reqRes.ok ? (await reqRes.json()).data || [] : [];
  const dashboardData = dashRes.ok ? (await dashRes.json()).data : null;

  return { requestsList, dashboardData };
};
