import React from "react";
import { AnimateView } from "@/widgets/invitation-blocks";

export const ThankYouFooter: React.FC = () => {
  return (
    <footer className="relative isolate flex w-full flex-col items-center pt-4 pb-10 text-center">
      <AnimateView animation="fadeInUp" duration={0.9}>
        <span
          className="whitespace-pre-line flex flex-col items-center gap-1 px-6 text-center text-[12px] md:text-[14px] mx-auto md:max-w-[500px] leading-relaxed font-serif"
          style={{
            color: "#ffdfaf",
            fontFamily: '"Times New Roman", "Baskerville", serif',
          }}
        >
          Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình chúng tôi!
        </span>
      </AnimateView>

      {/* Đường Phân Cách Mạ Vàng Dưới Cùng */}
      <AnimateView animation="fadeIn" duration={0.8} delay={0.15} className="pointer-events-none relative mt-4 z-[1] flex w-full justify-center">
        <img
          src="/images/themes/baroque-v2-dark-red/golden-line-decoration.webp"
          alt=""
          aria-hidden="true"
          className="block h-auto w-[85%] max-w-[380px] md:max-w-[480px] object-contain"
          style={{ filter: "drop-shadow(4px 4px 2px rgba(0,0,0,0.25))" }}
          loading="lazy"
        />
      </AnimateView>
    </footer>
  );
};
