import { Heart } from "lucide-react";

interface SectionHeadingProps {
  en: string;
  vi: string;
}

export function SectionHeading({ en, vi }: SectionHeadingProps) {
  return (
    <div className="text-center mb-14">
      <p className="text-xs uppercase tracking-[0.3em] text-[#c9828e] mb-3">{en}</p>
      <h2 style={{ fontFamily: "'Great Vibes', cursive", fontSize: "3rem", color: "#8b3a52", lineHeight: 1.2 }}>{vi}</h2>
      <div className="flex items-center justify-center gap-3 mt-4">
        <div className="h-px w-16 bg-[#c9828e]/30" />
        <Heart size={12} fill="#c9828e" stroke="#c9828e" />
        <div className="h-px w-16 bg-[#c9828e]/30" />
      </div>
    </div>
  );
}
