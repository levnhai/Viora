import React from "react";

export interface RunningMarqueeProps {
  text?: string;
  speed?: number;
  className?: string;
  separator?: string;
}

export function RunningMarquee({
  text = "WEDDING INVITATION • SAVE OUR DATE • FOREVER & ALWAYS",
  speed = 25,
  className = "bg-[#5D733F] text-[#FAF8F5] py-2 text-xs uppercase tracking-[0.25em] font-lora",
  separator = "✦",
}: RunningMarqueeProps) {
  const repeatedItems = Array(8).fill(text);

  return (
    <div className={`w-full overflow-hidden whitespace-nowrap select-none flex ${className}`}>
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-scroll {
          display: flex;
          width: max-content;
          animation: marqueeScroll ${speed}s linear infinite;
        }
        .animate-marquee-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="animate-marquee-scroll flex items-center shrink-0">
        {repeatedItems.map((item, idx) => (
          <span key={idx} className="inline-flex items-center gap-3 px-3">
            <span>{item}</span>
            <span className="text-[10px] opacity-75">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
