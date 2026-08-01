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

export const submitRsvpApi = async (
  slug: string,
  payload: { name: string; attend: string; guests?: number; message?: string }
) => {
  const url = `${API_URL}/api/weddings/${slug}/rsvp`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to submit RSVP");
  }

  return await res.json();
};

export const fetchDemoInvitations = async () => {
  try {
    const url = `${API_URL}/api/weddings/public/demos`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      return [];
    }
    const result = await res.json();
    return result.data || [];
  } catch (err) {
    return [];
  }
};


