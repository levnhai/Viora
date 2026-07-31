import React, { useState, useEffect, useRef } from "react";
import { greatVibes, playfairDisplay, montserrat } from "@/shared/lib/fonts";
import { WeddingData } from "@/entities/invitation/model/types";

interface ThankYouFooterProps {
  weddingData: WeddingData;
}

interface AnimatedFooterItemProps {
  children: React.ReactNode;
  animationType: "slideDown" | "slideUp" | "zoomIn";
  delayMs?: number;
}

function AnimatedFooterItem({
  children,
  animationType,
  delayMs = 0,
}: AnimatedFooterItemProps) {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getClasses = () => {
    switch (animationType) {
      case "slideDown":
        return isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-8";
      case "slideUp":
        return isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8";
      case "zoomIn":
        return isVisible
          ? "opacity-100 scale-100"
          : "opacity-0 scale-50";
      default:
        return isVisible ? "opacity-100" : "opacity-0";
    }
  };

  return (
    <div
      ref={itemRef}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`transition-all duration-1000 ease-out transform-gpu ${getClasses()}`}
    >
      {children}
    </div>
  );
}

export function ThankYouFooter({ weddingData }: ThankYouFooterProps) {
  return (
    <footer className="w-full bg-[#8b6c42] py-12 sm:py-16 px-4 sm:px-6 text-white text-center select-none overflow-hidden space-y-6 shadow-inner relative">
      {/* Subtle Top Border Line */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#aa8657] via-[#f4ebe1] to-[#aa8657]" />

      <div className="w-full max-w-sm sm:max-w-lg mx-auto space-y-5">
        {/* Thank You Calligraphy Title (Slide Down) */}
        <AnimatedFooterItem animationType="slideDown">
          <h2
            className={`${greatVibes.className} text-4xl sm:text-6xl text-[#f4ebe1] font-normal tracking-wide drop-shadow-sm`}
          >
            Thank You!
          </h2>
        </AnimatedFooterItem>

        {/* Heart Divider (Zoom In) */}
        <AnimatedFooterItem animationType="zoomIn" delayMs={150}>
          <div className="flex items-center justify-center gap-3">
            <div className="h-[1px] w-8 sm:w-16 bg-[#d8c7b2]" />
            <span className="text-xl text-[#f4ebe1]">❤️</span>
            <div className="h-[1px] w-8 sm:w-16 bg-[#d8c7b2]" />
          </div>
        </AnimatedFooterItem>

        {/* Message (Slide Up) */}
        <AnimatedFooterItem animationType="slideUp" delayMs={250}>
          <p
            className={`${playfairDisplay.className} text-sm sm:text-base text-[#fffdfa] leading-relaxed italic font-light px-4`}
          >
            "Sự hiện diện của Quý khách là niềm vinh hạnh lớn nhất cho gia đình chúng tôi. Cảm ơn sự đồng hành và những lời chúc phúc tốt đẹp nhất!"
          </p>
        </AnimatedFooterItem>

        {/* Groom & Bride Signature (Slide Up) */}
        <AnimatedFooterItem animationType="slideUp" delayMs={350}>
          <div className="pt-3">
            <p
              className={`${greatVibes.className} text-3xl sm:text-4xl text-[#f4ebe1] font-normal`}
            >
              {weddingData.groomName} & {weddingData.brideName}
            </p>
          </div>
        </AnimatedFooterItem>
      </div>
    </footer>
  );
}

