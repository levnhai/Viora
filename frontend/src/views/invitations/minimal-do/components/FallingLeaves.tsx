import { useEffect, useState } from "react";
import img_2 from "@/shared/assets/image/flower/img_2.png";
import img_3 from "@/shared/assets/image/flower/img_3.png";

const images = [img_2.src, img_3.src];

interface Leaf {
  id: number;
  src: string;
  left: number;
  animationDuration: number;
  animationDelay: number;
  size: number;
  rotate: number;
}

export function FallingLeaves() {
  const [leaves, setLeaves] = useState<Leaf[]>([]);

  useEffect(() => {
    // Generate random leaves
    const generateLeaves = () => {
      const newLeaves: Leaf[] = [];
      const numLeaves = 6; // Number of falling leaves (giảm tần suất)
      for (let i = 0; i < numLeaves; i++) {
        newLeaves.push({
          id: i,
          src: images[Math.floor(Math.random() * images.length)],
          left: Math.random() * 100, // Random left position 0-100vw
          animationDuration: 30 + Math.random() * 30, // 30s to 60s fall duration (rơi rất chậm)
          animationDelay: Math.random() * 30, // 0s to 30s initial delay
          size: 25 + Math.random() * 35, // 25px to 60px size
          rotate: Math.random() * 360, // Random initial rotation
        });
      }
      setLeaves(newLeaves);
    };

    generateLeaves();
  }, []);

  if (leaves.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[50] overflow-hidden">
      <style>
        {`
          @keyframes falling-leaf {
            0% {
              transform: translate3d(0, -10vh, 0) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 1;
              filter: blur(1.5px);
            }
            90% {
              opacity: 1;
              filter: blur(1.5px);
            }
            100% {
              transform: translate3d(20vw, 110vh, 0) rotate(720deg);
              opacity: 0;
            }
          }
          @keyframes falling-leaf-reverse {
            0% {
              transform: translate3d(0, -10vh, 0) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 1;
              filter: blur(1.5px);
            }
            90% {
              opacity: 1;
              filter: blur(1.5px);
            }
            100% {
              transform: translate3d(-20vw, 110vh, 0) rotate(-720deg);
              opacity: 0;
            }
          }
        `}
      </style>
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute top-0 opacity-0"
          style={{
            left: `${leaf.left}vw`,
            width: `${leaf.size}px`,
            height: `${leaf.size}px`,
            animationName:
              leaf.id % 2 === 0 ? "falling-leaf" : "falling-leaf-reverse",
            animationDuration: `${leaf.animationDuration}s`,
            animationDelay: `${leaf.animationDelay}s`,
            animationIterationCount: "infinite",
            animationTimingFunction: "linear",
          }}
        >
          <img
            src={leaf.src}
            alt="leaf"
            className="w-full h-full object-contain"
            style={{ transform: `rotate(${leaf.rotate}deg)` }}
          />
        </div>
      ))}
    </div>
  );
}
