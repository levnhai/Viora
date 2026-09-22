import React from "react";
import { AnimateView } from "@/widgets/invitation-blocks";

export const DressCodeSection: React.FC = () => {
  const dressCodes = [
    { name: "Đen", color: "#000000", border: "1px solid rgba(255, 223, 175, 0.2)" },
    { name: "Gold / Be", color: "#ffdfaf", border: "1.5px solid rgba(255, 223, 175, 0.5)" },
    { name: "Trắng", color: "#ffffff", border: "1.5px solid rgba(255, 223, 175, 0.5)" },
  ];

  return (
    <div className="relative z-10 flex flex-col items-center gap-4 px-6 py-6 text-center">
      <AnimateView animation="fadeInDown" duration={0.8} className="flex flex-col items-center gap-1">
        <h2
          className="uppercase text-center text-[19px] md:text-[22px] font-bold tracking-wider"
          style={{
            color: "#ffdfaf",
            fontFamily: '"Times New Roman", "Baskerville", serif',
          }}
        >
          DRESS CODE
        </h2>
        <p
          className="text-xs md:text-sm text-[#ffefd6]/90 italic"
          style={{ fontFamily: '"Times New Roman", serif' }}
        >
          Trang phục dự tiệc
        </p>
      </AnimateView>

      <div className="flex justify-center items-center gap-5 sm:gap-6 mt-1">
        {dressCodes.map((item, idx) => (
          <AnimateView
            key={idx}
            animation="zoomIn"
            duration={0.8}
            delay={0.1 + idx * 0.08}
            className="flex flex-col items-center gap-1.5"
          >
            <div
              className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-lg transition-transform hover:scale-110"
              style={{
                backgroundColor: item.color,
                border: item.border,
                boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
              }}
            />
            <span className="text-[11px] md:text-[12px] text-[#ffefd6] font-medium">
              {item.name}
            </span>
          </AnimateView>
        ))}
      </div>
    </div>
  );
};
