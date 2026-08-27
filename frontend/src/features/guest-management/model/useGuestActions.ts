import { useState } from "react";
import { toast } from "sonner";
import { API_URL } from "@/shared/lib/config";

export const useGuestActions = (weddingSlug: string | null, onMutateSuccess: () => void) => {
  const [guestSubmitting, setGuestSubmitting] = useState(false);

  const handleAddGuest = async (newGuest: { name: string; phone: string; relationship: string }) => {
    if (!weddingSlug || !newGuest.name.trim()) return false;

    setGuestSubmitting(true);
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

      toast.success(`Đã thêm ${names.length} khách mời thành công!`);
      onMutateSuccess();
      return true;
    } catch (err: any) {
      toast.error(err.message || "Không thể thêm khách mời!");
      return false;
    } finally {
      setGuestSubmitting(false);
    }
  };

  const handleDeleteGuest = async (id: string) => {
    if (!weddingSlug) return false;

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

      toast.success("Đã xóa khách mời thành công!");
      onMutateSuccess();
      return true;
    } catch (err: any) {
      toast.error(err.message || "Không thể xóa khách mời!");
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
        toast.success("Cập nhật trạng thái thành công");
        onMutateSuccess();
        return true;
      }
      toast.error("Cập nhật trạng thái thất bại!");
      return false;
    } catch (err) {
      console.error(err);
      toast.error("Không thể kết nối đến máy chủ!");
      return false;
    }
  };

  return {
    guestSubmitting,
    handleAddGuest,
    handleDeleteGuest,
    handleUpdateGuestStatus,
  };
};
