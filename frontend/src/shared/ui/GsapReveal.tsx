import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GsapRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  delay?: number;
  stagger?: number; // Nếu có stagger, nó sẽ animate các child element thay vì chính nó
  triggerOnce?: boolean;
}

export function GsapReveal({
  children,
  direction = "up",
  distance = 40,
  duration = 1.2,
  delay = 0,
  stagger = 0,
  triggerOnce = true,
  className = "",
  ...props
}: GsapRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let x = 0;
    let y = 0;

    if (direction === "up") y = distance;
    if (direction === "down") y = -distance;
    if (direction === "left") x = distance;
    if (direction === "right") x = -distance;

    const scrollParent = containerRef.current.closest(
      ".overflow-y-auto, .overflow-auto"
    );
    const isPreviewEnv =
      typeof window !== "undefined" &&
      (window.location.pathname.includes("/admin") ||
        window.location.pathname.includes("/create") ||
        window.location.pathname.includes("/edit") ||
        window.location.pathname.includes("/templates"));

    const ctx = gsap.context(() => {
      const target =
        stagger > 0 ? containerRef.current!.children : containerRef.current;

      const scrollTriggerConfig = scrollParent
        ? {
            trigger: containerRef.current,
            scroller: scrollParent,
            start: "top 95%",
            once: triggerOnce,
          }
        : isPreviewEnv
        ? undefined
        : {
            trigger: containerRef.current,
            start: "top 88%",
            once: triggerOnce,
          };

      gsap.fromTo(
        target,
        {
          opacity: 0,
          x,
          y,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          stagger: stagger > 0 ? stagger : 0,
          ease: "power3.out",
          scrollTrigger: scrollTriggerConfig,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [direction, distance, duration, delay, stagger, triggerOnce]);

  return (
    <div ref={containerRef} className={className} {...props}>
      {children}
    </div>
  );
}
