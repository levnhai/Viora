export interface Template {
  id: number;
  name: string;
  style: string;
  preview: string;
  accentColor: string;
  bgColor: string;
  popular?: boolean;
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
  },
  {
    id: 2,
    name: "Ngà Cổ Điển",
    style: "Cổ điển",
    preview:
      "https://images.unsplash.com/photo-1593043927112-08289c3f1b64?w=600&h=800&fit=crop&auto=format",
    accentColor: "#b8945a",
    bgColor: "#fdf8f0",
  },
  {
    id: 3,
    name: "Xanh Tối Giản",
    style: "Tối giản",
    preview:
      "https://images.unsplash.com/photo-1551546897-0cf94d9bb428?w=600&h=800&fit=crop&auto=format",
    accentColor: "#5a7d6b",
    bgColor: "#f4f8f6",
  },
  {
    id: 4,
    name: "Vàng Hoàng Gia",
    style: "Sang trọng",
    preview:
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&h=800&fit=crop&auto=format",
    accentColor: "#c9956c",
    bgColor: "#fdf6ef",
    popular: true,
  },
  {
    id: 5,
    name: "Trắng Tinh Khôi",
    style: "Hiện đại",
    preview:
      "https://images.unsplash.com/photo-1524777313293-86d2ab467344?w=600&h=800&fit=crop&auto=format",
    accentColor: "#8b7a8b",
    bgColor: "#faf8fa",
  },
  {
    id: 6,
    name: "Mộc Tự Nhiên",
    style: "Vintage",
    preview:
      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=600&h=800&fit=crop&auto=format",
    accentColor: "#8a6a4a",
    bgColor: "#f8f3ee",
  },
];
