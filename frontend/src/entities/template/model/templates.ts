export interface Template {
  id: number;
  name: string;
  style: string;
  preview: string;
  accentColor: string;
  bgColor: string;
  popular?: boolean;
  planRequired: "standard" | "premium";
  features: {
    hasMusic: boolean;
    maxGalleryImages: number;
    hasRsvp: boolean;
  };
}

export const TEMPLATES: Template[] = [
  {
    id: 1,
    name: "Hồng Sương Mai",
    style: "Lãng mạn",
    preview:
      "https://images.unsplash.com/photo-1764423805989-ec426dfb8de8?w=600&h=800&fit=crop&auto=format",
    accentColor: "#c9828e",
    bgColor: "#fff5f6",
    popular: true,
    planRequired: "standard",
    features: {
      hasMusic: false,
      maxGalleryImages: 3,
      hasRsvp: true,
    },
  },
  {
    id: 2,
    name: "Ngà Cổ Điển",
    style: "Cổ điển",
    preview:
      "https://images.unsplash.com/photo-1593043927112-08289c3f1b64?w=600&h=800&fit=crop&auto=format",
    accentColor: "#b8945a",
    bgColor: "#fdf8f0",
    planRequired: "premium",
    features: {
      hasMusic: true,
      maxGalleryImages: 6,
      hasRsvp: true,
    },
  },
];
