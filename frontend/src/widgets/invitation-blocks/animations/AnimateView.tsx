"use client";

import React, { useEffect, useRef, useState } from "react";

export type AnimationType =
  | "fadeInUp"
  | "fadeInDown"
  | "fadeInLeft"
  | "fadeInRight"
  | "zoomIn"
  | "flipInX"
  | "flipInY"
  | "pulse"
  | "bounceIn"
  | "none";

export interface AnimateViewProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  infinite?: boolean;
  className?: string;
}

export function AnimateView({
  children,
  animation = "fadeInUp",
  delay = 0,
  duration = 1,
  infinite = false,
  className = "",
  style,
  ...props
}: AnimateViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -5% 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const getAnimationClass = () => {
    if (!isVisible || animation === "none") return "opacity-0";

    const base = "animate__animated";
    const anim = `animate__${animation}`;
    const inf = infinite ? "animate__infinite" : "";
    return `${base} ${anim} ${inf}`;
  };

  return (
    <div
      ref={ref}
      className={`${getAnimationClass()} ${className}`}
      style={{
        ...style,
        animationDelay: isVisible && delay > 0 ? `${delay}s` : undefined,
        animationDuration: isVisible && duration ? `${duration}s` : undefined,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
