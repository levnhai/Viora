import { API_URL } from "@/shared/lib/config";

export const fetchInvitations = async (query: any = {}) => {
  const queryParams = new URLSearchParams();
  Object.keys(query).forEach((key) => {
    if (query[key]) {
      queryParams.append(key, query[key]);
    }
  });

  const url = `${API_URL}/api/weddings?${queryParams.toString()}`;

  const res = await fetch(url, { credentials: "include", cache: "no-store" });

  if (res.status === 401) {
    throw new Error("UNAUTHORIZED");
  }

  if (!res.ok) {
    throw new Error("Failed to fetch invitations");
  }

  const result = await res.json();
  return result.data;
};

export const fetchInvitationDetail = async (slug: string) => {
  const url = `${API_URL}/api/weddings/${slug}/render`;

  const res = await fetch(url, { credentials: "include", cache: "no-store" });

  if (res.status === 401) {
    throw new Error("UNAUTHORIZED");
  }

  if (!res.ok) {
    throw new Error("Failed to fetch invitation details");
  }

  const result = await res.json();
  return result.data;
};
