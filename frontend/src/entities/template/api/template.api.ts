import { API_URL } from "@/shared/lib/config";

export interface Template {
  _id: string;
  name: string;
  code: string;
  thumbnail: string;
  previewUrl: string;
  price: number;
  features: string[];
  tags: string[];
  status: string;
  createdAt: string;
}

export const fetchTemplates = async (): Promise<Template[]> => {
  try {
    const response = await fetch(`${API_URL}/api/templates`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return [];
    }

    const result = await response.json();
    return result.data || [];
  } catch (err) {
    return [];
  }
};
