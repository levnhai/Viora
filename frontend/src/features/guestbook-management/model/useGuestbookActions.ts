import { useState } from "react";
import { toast } from "sonner";
import { API_URL } from "@/shared/lib/config";

export const useGuestbookActions = (
  weddingSlug: string | null,
  onMutateSuccess: () => void,
) => {
  const [submitting, setSubmitting] = useState(false);

  const handleDeleteGuestbook = async (id: string) => {
    if (!weddingSlug) return false;

    setSubmitting(true);
    try {
      const response = await fetch(
        `${API_URL}/api/weddings/${weddingSlug}/guestbook/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!response.ok) {
        const resData = await response.json();
        throw new Error(resData.message || "Xóa lời chúc thất bại!");
      }

      toast.success("Đã xóa lời chúc thành công!");
      onMutateSuccess();
      return true;
    } catch (err: any) {
      toast.error(err.message || "Không thể xóa lời chúc!");
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    submitting,
    handleDeleteGuestbook,
  };
};
