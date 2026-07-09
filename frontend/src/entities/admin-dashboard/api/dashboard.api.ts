import { API_URL } from "@/shared/lib/config";

export const fetchAdminDashboardData = async () => {
  const [reqRes, dashRes] = await Promise.all([
    fetch(`${API_URL}/api/invitation-requests`, {
      credentials: "include",
    }),
    fetch(`${API_URL}/api/admin/dashboard`, { credentials: "include" }),
  ]);

  if (reqRes.status === 401 || dashRes.status === 401) {
    throw new Error("UNAUTHORIZED");
  }

  const requestsList = reqRes.ok ? (await reqRes.json()).data || [] : [];
  const dashboardData = dashRes.ok ? (await dashRes.json()).data : null;

  return { requestsList, dashboardData };
};
