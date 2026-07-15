import { formatVietnameseDate } from "@/shared/lib/utils/date";
import img_5 from "@/shared/assets/image/flower/img_5.webp";

interface Envelope_4Props {
  guestName?: string;
  groomName: string;
  brideName: string;
  weddingDate: string;
  weddingTime?: string;
  onOpen: () => void;
  isFixed?: boolean;
  primaryColor?: string;
  textColor?: string;
}

export function Envelope_4({
  guestName,
  groomName,
  brideName,
  weddingDate,
  weddingTime,
  onOpen,
  isFixed = true,
  primaryColor = "#e8d5c4",
  textColor = "#7c6a60",
}: Envelope_4Props) {
  const weddingDateLabel = formatVietnameseDate(weddingDate, {
    includeWeekday: true,
    time: weddingTime,
  });

  return (
    <div
      className={`${isFixed ? "fixed" : "absolute"} inset-0 z-50 flex items-center justify-center overflow-hidden`}
      style={{
        background:
          "linear-gradient(to bottom right, #f3e6da, #e8d5c4, #dcc6b2)",
        backgroundColor: primaryColor, // Fallback if gradient is overridden
      }}
    >
      <style>{`
        @keyframes sway {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(15px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-sway {
          animation: sway 6s ease-in-out infinite;
        }
        .animate-sway-delayed {
          animation: sway 7s ease-in-out 2s infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          opacity: 0;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
      `}</style>
      <div className="relative z-10 w-full flex justify-center px-4">
        <div className="relative w-full max-w-[310px] sm:max-w-[340px] md:max-w-[520px] lg:max-w-[600px]">
          {/* Wax Seal */}
          <div
            className="absolute left-1/2 rounded-full flex items-center justify-center animate-seal-pulse"
            style={{
              top: "50px",
              width: "56px",
              height: "56px",
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle at 30% 30%, ${textColor}, rgb(94, 76, 66))`,
              boxShadow: `0 4px 20px rgba(124, 106, 96, 0.5), inset 0 2px 4px rgba(255,255,255,0.3)`,
              zIndex: 30,
            }}
          >
            <svg
              style={{ fill: "#ffffff" }}
              viewBox="0 0 24 24"
              className="w-7 h-7"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>

          {/* Envelope Body */}
          <div
            className="relative rounded-lg w-full"
            style={{
              boxShadow:
                "0 25px 60px -12px rgba(0, 0, 0, 0.45), 0 8px 24px rgba(0, 0, 0, 0.2), 0 0 40px rgba(124, 106, 96, 0.15)",
            }}
          >
            <div
              className="absolute inset-0 rounded-lg overflow-hidden"
              style={{
                background: "rgba(255, 250, 245, 0.96)",
                border: "1px solid rgba(124, 106, 96, 0.15)",
                clipPath: "inset(0 round 8px)",
              }}
            >
              {/* Top Right Flower */}
              <div
                className="absolute pointer-events-none w-[90px] sm:w-[110px] md:w-[140px] -top-[56px] -right-[20px] md:-top-[50px] md:-right-[10px] z-20"
                style={{ transform: "rotate(220deg)" }}
              >
                <img
                  src={img_5.src || (img_5 as unknown as string)}
                  alt=""
                  className="w-full h-auto opacity-80 animate-sway"
                  style={{ transformOrigin: "bottom center" }}
                />
              </div>

              {/* Bottom Left Flower */}
              <div
                className="absolute pointer-events-none w-[100px] sm:w-[120px] md:w-[150px] -bottom-[70px] -left-[35px] md:-bottom-[60px] md:-left-[10px] z-20"
                style={{ transform: "rotate(38deg)" }}
              >
                <img
                  src={img_5.src || (img_5 as unknown as string)}
                  alt=""
                  className="w-full h-auto opacity-90 animate-sway-delayed"
                  style={{ transformOrigin: "bottom center" }}
                />
              </div>
            </div>

            <div className="relative z-10 text-center px-6 pt-28 pb-14 md:pt-24 md:pb-12 flex flex-col items-center">
              <h1
                className="mb-2 flex flex-col items-center leading-tight text-4xl sm:text-5xl md:text-[3.5rem]"
                style={{
                  color: textColor,
                  textShadow: `0 2px 8px ${textColor}20` // Add a very subtle shadow for extra pop
                }}
              >
                <span
                  className="block w-full text-center animate-fade-in-up delay-100"
                  style={{ fontFamily: '"Fz Qellia", serif' }}
                >
                  {groomName || "Tên chú rể"}
                </span>
                <span
                  className="block w-full text-center text-lg sm:text-xl leading-none my-3 animate-fade-in-up delay-200"
                  style={{
                    fontFamily: '"Baskerville", "Times New Roman", serif',
                  }}
                >
                  &amp;
                </span>
                <span
                  className="block w-full text-center animate-fade-in-up delay-300"
                  style={{ fontFamily: '"Fz Qellia", serif' }}
                >
                  {brideName || "Tên cô dâu"}
                </span>
              </h1>

              <div className="flex items-center justify-center gap-3 mb-4 w-full max-w-[160px] md:max-w-[200px] mt-4 animate-fade-in-up delay-400">
                <div
                  className="flex-1 h-px"
                  style={{
                    background: `linear-gradient(to right, transparent, ${textColor})`,
                  }}
                ></div>
                <span
                  className="opacity-70 text-sm"
                  style={{ color: textColor }}
                >
                  ❦
                </span>
                <div
                  className="flex-1 h-px"
                  style={{
                    background: `linear-gradient(to left, transparent, ${textColor})`,
                  }}
                ></div>
              </div>

              <div
                className="text-[18px] mb-5 flex flex-col items-center animate-fade-in-up delay-500"
                style={{
                  color: "rgba(124, 106, 96, 0.72)",
                  fontFamily: '"Lora", "Times New Roman", serif',
                }}
              >
                <span>{weddingDateLabel}</span>
              </div>

              {guestName && (
                <div className="mb-6 flex flex-col items-center animate-fade-in-up delay-500">
                  <p
                    className="text-[18px] mb-2 font-light"
                    style={{
                      color: "rgba(124, 106, 96, 0.72)",
                      fontFamily: '"Lora", "Times New Roman", serif',
                    }}
                  >
                    Thân Mời
                  </p>
                  <p
                    className="text-xl sm:text-2xl capitalize font-medium"
                    style={{
                      color: textColor,
                      fontFamily: '"Fz Qellia", serif',
                    }}
                  >
                    {guestName}
                  </p>
                </div>
              )}

              <button
                onClick={onOpen}
                className="relative mt-2 px-8 py-2.5 text-lg font-medium rounded-full shadow-lg flex items-center justify-center overflow-hidden transition-transform hover:scale-105 active:scale-95 animate-fade-in-up delay-600"
                style={{
                  backgroundColor: textColor,
                  color: "#ffffff",
                  boxShadow: `0 4px 14px rgba(124, 106, 96, 0.35)`,
                  fontFamily: '"Lora", "Times New Roman", serif',
                }}
              >
                <span>Mở thiệp</span>
                <div
                  className="absolute top-0 h-full w-8 pointer-events-none animate-shine"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                  }}
                ></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
