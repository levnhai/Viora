import React from "react";
import { WeddingData } from "@/entities/invitation/model/types";
import { formatDate } from "@/shared/lib/utils/date";
import hyImg from "@/shared/assets/image/hy/img_1.webp";
import bgImg1 from "@/shared/assets/image/hy/img_2.webp";
import bgImg2 from "@/shared/assets/image/hy/img_3.webp";

interface LongPhungEnvelopeProps {
  onOpen: () => void;
  weddingData: WeddingData;
}

export function LongPhungEnvelope({ onOpen, weddingData }: LongPhungEnvelopeProps) {
  const characters = [
    { left: "31.55%", size: "13.55px", sway: "14.64px", dur: "11.4s", delay: "1.92s" },
    { left: "57.77%", size: "14.06px", sway: "-8.92px", dur: "9.46s", delay: "1.74s" },
    { left: "13.78%", size: "22.68px", sway: "-8.91px", dur: "8.36s", delay: "1.64s", color: "#FF9B4A" },
    { left: "5.27%", size: "17.09px", sway: "23.71px", dur: "8.56s", delay: "1.94s" },
    { left: "89.57%", size: "17.46px", sway: "-2.3px", dur: "8.19s", delay: "1.37s" },
    { left: "53.16%", size: "14.27px", sway: "-18.51px", dur: "9.96s", delay: "1.33s" },
    { left: "88.73%", size: "18.14px", sway: "-17.91px", dur: "8.47s", delay: "0.15s", color: "#FFBE89" },
    { left: "78.71%", size: "18.04px", sway: "19.41px", dur: "12.2s", delay: "0.36s", color: "#FF9B4A" },
    { left: "5.55%", size: "12.78px", sway: "-6.1px", dur: "12.56s", delay: "0.99s" },
    { left: "93.74%", size: "23.18px", sway: "7.81px", dur: "10.84s", delay: "0.8s", color: "#710001" },
    { left: "65.28%", size: "12.26px", sway: "19.24px", dur: "12.87s", delay: "0.79s", color: "#FFBE89" },
    { left: "93.16%", size: "19.74px", sway: "-27.12px", dur: "9.64s", delay: "1.73s", color: "#710001" },
  ];

  return (
    <div
      style={{ background: "linear-gradient(to bottom right, #710001, #5a0001, #450001)" }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
    >
      <div style={{ zIndex: 1 }} className="absolute inset-0 pointer-events-none overflow-hidden">
        {characters.map((char, i) => (
          <div
            key={i}
            style={{
              left: char.left,
              top: "auto",
              bottom: "-30px",
              color: char.color || "#FFD4A8",
              fontSize: char.size,
              "--sway": char.sway,
              animation: `ambient-rise ${char.dur} ease-in-out ${char.delay} infinite`,
            } as React.CSSProperties}
            className="absolute"
          >
            囍
          </div>
        ))}
      </div>

      <div style={{ zIndex: 10 }} className="relative">
        <div className="relative w-[310px] sm:w-[340px] md:w-[520px] lg:w-[600px]">
          
          <div
            style={{
              top: "50px",
              width: "64px",
              height: "64px",
              transform: "translate(-50%, -50%)",
              background: "transparent",
              boxShadow: "none",
              zIndex: 30,
              animation: "seal-pulse 2s ease-in-out infinite",
            }}
            className="absolute left-1/2 rounded-full flex items-center justify-center"
          >
            <img
              src={hyImg.src}
              alt=""
              style={{ transformOrigin: "center" }}
              className="w-[52px] h-[52px] object-contain"
            />
          </div>

          <div
            style={{
              boxShadow:
                "0 25px 60px -12px rgba(0, 0, 0, 0.45), 0 8px 24px rgba(0, 0, 0, 0.2), 0 0 40px rgba(255, 190, 137, 0.15)",
            }}
            className="relative rounded-lg"
          >
            <div
              style={{
                background: "rgba(255, 190, 137, 0.1)",
                border: "1px solid rgba(255, 190, 137, 0.15)",
                clipPath: "inset(0 round 8px)",
              }}
              className="absolute inset-0 rounded-lg overflow-hidden"
            >
              <img
                src={bgImg1.src}
                alt=""
                aria-hidden="true"
                className="absolute pointer-events-none w-[230px] md:w-[320px] top-[10px] -left-[20px] md:top-[0px] md:-left-[30px] opacity-80 rotate-[20deg]"
              />
              <img
                src={bgImg2.src}
                alt=""
                aria-hidden="true"
                className="absolute pointer-events-none w-[230px] md:w-[320px] bottom-[10px] -right-[20px] md:bottom-[0px] md:-right-[30px] opacity-80 -rotate-[20deg]"
              />
            </div>
            
            <div className="relative z-10 text-center px-6 pt-28 pb-14 md:pt-24 md:pb-8">
              <h1
                style={{
                  color: "#FFBE89",
                  fontFamily: "'Playfair Display', serif",
                }}
                className="mb-2 flex flex-col items-center leading-tight text-3xl sm:text-4xl"
              >
                <span className="block w-full text-center">{weddingData.groomName}</span>
                <span className="block w-full text-center text-lg leading-none sm:text-xl my-1">
                  &amp;
                </span>
                <span className="block w-full text-center">{weddingData.brideName}</span>
              </h1>
              <div className="flex items-center justify-center gap-3 mb-2">
                <div
                  style={{ background: "linear-gradient(to right, transparent, #FFBE89)" }}
                  className="w-10 h-px"
                ></div>
                <span style={{ color: "#FFBE89", opacity: 0.7 }} className="text-sm">
                  ❦
                </span>
                <div
                  style={{ background: "linear-gradient(to left, transparent, #FFBE89)" }}
                  className="w-10 h-px"
                ></div>
              </div>
              
              <div
                style={{
                  color: "rgba(255, 190, 137, 0.8)",
                  fontFamily: "'Lora', serif",
                }}
                className="text-[18px] mb-5 flex flex-col items-center"
              >
                <span dir="auto">{formatDate(weddingData.weddingDate)}</span>
              </div>
              
              <div className="mb-6">
                <p
                  style={{
                    color: "rgba(255, 190, 137, 0.8)",
                    fontFamily: "'Lora', serif",
                  }}
                  className="text-[18px] font-light mb-2"
                >
                  <span dir="auto">Thân Mời</span>
                </p>
              </div>
              
              <button
                onClick={onOpen}
                style={{
                  backgroundColor: "#FFBE89",
                  color: "#710001",
                  boxShadow: "0 4px 14px rgba(255, 190, 137, 0.35)",
                  fontFamily: "'Lora', serif",
                }}
                className="relative px-8 py-2.5 text-lg font-semibold sm:font-medium rounded-full shadow-lg flex items-center justify-center mx-auto overflow-hidden cursor-pointer hover:scale-105 transition-transform"
              >
                <span dir="auto">Mở thiệp</span>
                <div
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                    animation: "shine 3s ease-in-out infinite",
                  }}
                  className="absolute top-0 h-full w-8 pointer-events-none"
                ></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
