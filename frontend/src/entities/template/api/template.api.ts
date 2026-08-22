import { API_URL } from "@/shared/lib/config";
import { TEMPLATES } from "../model/templates";

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
  schema?: any;
}

export const fetchTemplates = async (): Promise<Template[]> => {
  const fallbackTemplates: Template[] = TEMPLATES.map((t) => ({
    _id: t.code,
    name: t.name,
    code: t.code,
    thumbnail: t.preview,
    previewUrl: t.preview,
    price: t.price,
    features: t.features || [],
    tags: t.tags || [],
    status: "active",
    createdAt: new Date().toISOString(),
    schema: t.schema,
  }));

  try {
    const response = await fetch(`${API_URL}/api/templates`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return fallbackTemplates;
    }

    const result = await response.json();
    const apiData: Template[] = result.data || [];
    if (apiData.length === 0) {
      return fallbackTemplates;
    }

    // Merge: ensure all templates from local TEMPLATES are present
    const codeMap = new Map<string, Template>();
    fallbackTemplates.forEach((t) => codeMap.set(t.code, t));
    apiData.forEach((t) => {
      const code = t.code || `temp_${(t as any).id}`;
      const local = codeMap.get(code);
      codeMap.set(code, {
        ...local,
        ...t,
        _id: t._id || code,
        code: code,
        schema: local?.schema || (t as any).schema,
      });
    });

    return Array.from(codeMap.values());
  } catch (err) {
    return fallbackTemplates;
  }
};
