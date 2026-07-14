import { formatVietnameseDate } from "@/shared/lib/utils/date";
import img_1 from "@/shared/assets/image/flower/img_1.png";

interface MinimalEnvelopeProps {
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

export function MinimalEnvelope({
  guestName,
  groomName,
  brideName,
  weddingDate,
  weddingTime,
  onOpen,
  isFixed = true,
  primaryColor,
  textColor,
}: MinimalEnvelopeProps) {
  const weddingDateLabel = formatVietnameseDate(weddingDate, {
    includeWeekday: true,
    time: weddingTime,
  });

  return (
    <div
      className={`${isFixed ? "fixed" : "absolute"} inset-0 z-50 flex items-center justify-center overflow-hidden`}
      style={{ backgroundColor: primaryColor }}
    >
      <div className="relative z-10">
        <div className="relative w-[310px] sm:w-[340px] md:w-[520px] lg:w-[600px]">
          {/* Wax Seal */}
          <div
            className="absolute left-1/2 rounded-full flex items-center justify-center animate-seal-pulse"
            style={
              {
                top: "50px",
                width: "56px",
                height: "56px",
                transform: "translate(-50%, -50%)",
                background: `radial-gradient(circle at 30% 30%, ${textColor}, rgba(255,255,255,0.2))`,
                "--shadow-color": textColor,
                zIndex: 30,
              } as any
            }
          >
            <svg
              style={{ fill: primaryColor }}
              viewBox="0 0 24 24"
              className="w-7 h-7"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>

          {/* Envelope Body */}
          <div
            className="relative rounded-lg"
            style={{
              boxShadow:
                "0 25px 60px -12px rgba(0, 0, 0, 0.45), 0 8px 24px rgba(0, 0, 0, 0.2), 0 0 40px rgba(225, 188, 124, 0.15)",
            }}
          >
            <div
              className="absolute inset-0 rounded-lg overflow-hidden"
              style={{
                backgroundColor: primaryColor,
                backgroundImage:
                  "linear-gradient(to bottom right, rgba(0,0,0,0.3), rgba(255,255,255,0.05), rgba(0,0,0,0.3))",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                clipPath: "inset(0 round 8px)",
              }}
            >
              <img
                src={img_1.src}
                alt=""
                aria-hidden="true"
                className="absolute pointer-events-none w-[80%] top-0 left-1/2 -translate-x-1/2 -translate-y-[40%] opacity-20"
              />
              <img
                src={img_1.src}
                alt=""
                aria-hidden="true"
                className="absolute pointer-events-none w-[80%] bottom-0 left-1/2 -translate-x-1/2 translate-y-[40%] opacity-20 -scale-y-100"
              />
            </div>

            <div className="relative z-10 text-center px-6 pt-28 pb-14 md:pt-24 md:pb-8 flex flex-col items-center">
              <h1
                className="mb-2 flex flex-col items-center leading-tight text-4xl sm:text-5xl md:text-6xl"
                style={{
                  fontFamily: "'The Nautigal', cursive",
                  color: textColor,
                }}
              >
                <span className="block w-full text-center">
                  {groomName || "Tên chú rể"}
                </span>
                <span className="block w-full text-center text-2xl leading-none my-2 font-serif">
                  &amp;
                </span>
                <span className="block w-full text-center">
                  {brideName || "Tên cô dâu"}
                </span>
              </h1>

              <div className="flex items-center justify-center gap-3 mb-2 w-full max-w-[200px]">
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
                className="text-[18px] mb-5 flex flex-col items-center font-serif"
                style={{ color: textColor, opacity: 0.75 }}
              >
                <span>{weddingDateLabel}</span>
              </div>

              <div className="mb-8">
                <p
                  className="text-[18px] font-light font-serif"
                  style={{ color: textColor, opacity: 0.75 }}
                >
                  Thân Mời:{"   "}
                  {guestName && (
                    <span
                      className="font-bold"
                      style={{ color: textColor, opacity: 1 }}
                    >
                      {guestName}
                    </span>
                  )}
                </p>
              </div>

              <button
                onClick={onOpen}
                className="relative px-8 py-2.5 text-lg font-serif font-semibold rounded-full shadow-lg flex items-center justify-center overflow-hidden transition-transform hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: textColor,
                  color: primaryColor,
                  boxShadow: `0 4px 14px ${textColor}59`,
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
