import { useState } from "react";
import { API_URL } from "@/shared/lib/config";

export const useGuestActions = (weddingSlug: string | null, onMutateSuccess: () => void) => {
  const [guestSubmitting, setGuestSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleAddGuest = async (newGuest: { name: string; phone: string; relationship: string }) => {
    if (!weddingSlug || !newGuest.name.trim()) return false;

    setGuestSubmitting(true);
    setError(null);
    try {
      const names = newGuest.name
        .split("\n")
        .map((n) => n.trim())
        .filter((n) => n);

      for (const name of names) {
        const guestPayload = { ...newGuest, name, relationship: "Bạn bè" };
        const response = await fetch(
          `${API_URL}/api/weddings/${weddingSlug}/guests`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(guestPayload),
          }
        );

        if (!response.ok) {
          const resData = await response.json();
          throw new Error(
            resData.message || `Thêm khách mời ${name} thất bại!`
          );
        }
      }

      setSuccessMsg(`Đã thêm ${names.length} khách mời thành công!`);
      onMutateSuccess();
      setTimeout(() => setSuccessMsg(null), 3000);
      return true;
    } catch (err: any) {
      setError(err.message || "Không thể thêm khách mời!");
      return false;
    } finally {
      setGuestSubmitting(false);
    }
  };

  const handleDeleteGuest = async (id: string) => {
    if (!weddingSlug) return false;
    if (!window.confirm("Bạn có chắc chắn muốn xóa khách mời này khỏi danh sách?")) return false;

    setError(null);
    try {
      const response = await fetch(
        `${API_URL}/api/weddings/${weddingSlug}/guests/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const resData = await response.json();
        throw new Error(resData.message || "Xóa thất bại!");
      }

      setSuccessMsg("Đã xóa khách mời!");
      onMutateSuccess();
      setTimeout(() => setSuccessMsg(null), 3000);
      return true;
    } catch (err: any) {
      setError(err.message || "Không thể xóa khách mời!");
      return false;
    }
  };

  const handleUpdateGuestStatus = async (id: string, newStatus: string) => {
    if (!weddingSlug) return false;

    try {
      const response = await fetch(
        `${API_URL}/api/weddings/${weddingSlug}/guests/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ rsvpStatus: newStatus }),
        }
      );

      if (response.ok) {
        onMutateSuccess();
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return {
    guestSubmitting,
    error,
    successMsg,
    handleAddGuest,
    handleDeleteGuest,
    handleUpdateGuestStatus,
  };
};
