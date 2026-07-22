import { GsapReveal } from "@/shared/ui/GsapReveal";
import { WeddingData } from "@/entities/invitation/model/types";
import {
  getLastNameFirstLetter,
  getLastTwoNames,
} from "@/shared/lib/utils/string";

//img
import img_5 from "@/shared/assets/image/flower/img_5.webp";
import img_11 from "@/shared/assets/image/flower/img_11.webp";
import img_12 from "@/shared/assets/image/flower/img_12.svg";
import img_heart_1 from "@/shared/assets/image/heart/img_1.svg";

interface InvitationCoverProps {
  weddingData: WeddingData;
  guestName?: string;
}

export function InvitationCover({
  weddingData,
  guestName,
}: InvitationCoverProps) {
  const { groomName, brideName, galleryImages, templateConfig } = weddingData;
  const textColor = "#7c6a60";

  // Use coverImage from templateConfig if available, else fallback to first gallery image, else hardcoded demo
  const coverImage =
    weddingData.coverImage ||
    templateConfig?.coverImage ||
    (galleryImages && galleryImages.length > 0 ? galleryImages[0] : null);

  return (
    <section className="relative flex flex-col items-center justify-start text-center overflow-hidden pt-16 bg-transparent">
      <style>{`
        .wax-seal {
          background: radial-gradient(circle at 30% 30%, #dbba82, #b5925a 60%, #826639);
          box-shadow: 0 4px 10px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(0,0,0,0.2);
        }
        .wax-seal::after {
          content: '';
          position: absolute;
          top: 4px;
          left: 4px;
          right: 4px;
          bottom: 4px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.3);
          box-shadow: inset 0 0 4px rgba(0,0,0,0.2);
        }
      `}</style>

      {/* Faded leaf decoration background (left) */}
      <div className="absolute top-0 left-[-20px] sm:left-[-180px] w-[140px] sm:w-[450px] opacity-15 mix-blend-multiply pointer-events-none z-0">
        <img
          src={img_11.src || (img_11 as unknown as string)}
          alt=""
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Decorative heart background (top-right) */}
      <div className="absolute top-[-5%] right-[-3%] w-[120px] sm:w-[180px] opacity-80 pointer-events-none z-0">
        <img
          src={img_heart_1.src || (img_heart_1 as unknown as string)}
          alt=""
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Faded leaf decoration background (bottom-right) */}
      <div
        className="absolute top-[50%] -right-[150px] w-[400px] opacity-[0.05] pointer-events-none"
        style={{ transform: "rotate(-45deg)" }}
      >
        <img
          src={img_5.src || (img_5 as unknown as string)}
          alt=""
          className="w-full h-auto"
        />
      </div>

      <GsapReveal
        delay={0.2}
        direction="up"
        distance={40}
        className="z-10 flex flex-col items-center w-full max-w-md px-4"
      >
        <p
          className="uppercase tracking-[0.25em] text-[12px] font-medium mb-3"
          style={{
            color: "rgba(124, 106, 96, 0.7)",
            fontFamily: '"Lora", "Times New Roman", serif',
          }}
        >
          The Wedding Of
        </p>

        <h1
          className="flex items-center justify-center capitalize  gap-3 leading-tight text-[36px] sm:text-[36px]"
          style={{ color: textColor }}
        >
          <span
            style={{
              fontFamily: '"Times New Roman", serif',
              fontStyle: "italic",
              color: "rgb(130, 119, 113)",
            }}
          >
            {getLastTwoNames(groomName) || "Hoàng Nam"}
          </span>
          <span
            className="text-[30px] -mt-1"
            style={{
              fontFamily: '"The Nautigal", cursive',
              color: "rgba(218, 63, 192, 1)",
            }}
          >
            &amp;
          </span>
          <span
            style={{
              fontFamily: '"Times New Roman", serif',
              fontStyle: "italic",
              color: "rgb(130, 119, 113)",
            }}
          >
            {getLastTwoNames(brideName) || "Thảo Vy"}
          </span>
        </h1>
      </GsapReveal>

      {/* Polaroid Section */}
      <GsapReveal
        delay={0.4}
        direction="up"
        distance={40}
        className="relative mt-12 z-20 w-[75%] max-w-[320px] sm:max-w-[380px]"
      >
        <div
          className="bg-white p-3 pb-12 shadow-2xl relative"
          style={{ transform: "rotate(-2deg)" }}
        >
          {/* Masking tape */}
          <div
            className="absolute -top-3 left-1/2 -translate-x-1/2 w-[80px] h-[26px] bg-[#e6d0a7] opacity-90 z-30"
            style={{
              transform: "translate(-50%, 0) rotate(-3deg)",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          ></div>

          {/* Photo or Video */}
          <div className="w-full aspect-[4/6] overflow-hidden bg-gray-100">
            {templateConfig?.coverVideo ||
            (coverImage && coverImage.match(/\.(mp4|webm|ogg)$/i)) ? (
              <video
                src={templateConfig?.coverVideo || coverImage}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                poster={
                  coverImage && !coverImage.match(/\.(mp4|webm|ogg)$/i)
                    ? coverImage
                    : undefined
                }
              />
            ) : (
              <img
                src={coverImage}
                alt="Couple"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Flower Overlap */}
          <div
            className="absolute -bottom-[180px] -left-[70px] w-[200px] sm:w-[180px] z-40 pointer-events-none drop-shadow-xl"
            style={{ transform: "rotate(15deg)" }}
          >
            <img
              src={img_12.src || (img_12 as unknown as string)}
              alt=""
              className="w-full h-auto"
            />
          </div>

          {/* Wax Seal */}
          <div
            className="absolute -bottom-[15px] -right-[15px] w-[65px] h-[65px] rounded-full wax-seal z-40 flex items-center justify-center font-serif"
            style={{
              color: "rgba(255,255,255,0.85)",
              textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
            }}
          >
            <span className="text-[18px] font-medium tracking-tighter italic relative z-10">
              {getLastNameFirstLetter(groomName)}/
              {getLastNameFirstLetter(brideName)}
            </span>
          </div>
        </div>
      </GsapReveal>

      {/* Khung Thân Mời Khách Nổi Bật */}
      <GsapReveal
        delay={0.6}
        direction="up"
        distance={30}
        className="mt-12 z-30 w-full max-w-sm sm:max-w-md px-4"
      >
        <div
          className="relative group p-6 sm:p-7 rounded-2xl text-center transition-all duration-500 hover:scale-[1.02]"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 253, 249, 0.95), rgba(246, 236, 225, 0.9))",
            backdropFilter: "blur(10px)",
            border: "1.5px solid rgba(200, 169, 126, 0.5)",
            boxShadow:
              "0 12px 32px -5px rgba(124, 106, 96, 0.18), 0 0 0 4px rgba(255, 255, 255, 0.6), inset 0 0 15px rgba(200, 169, 126, 0.1)",
          }}
        >
          {/* Decorative Corner Lines */}
          <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[#b5925a]/70 rounded-tl-sm pointer-events-none"></div>
          <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-[#b5925a]/70 rounded-tr-sm pointer-events-none"></div>
          <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-[#b5925a]/70 rounded-bl-sm pointer-events-none"></div>
          <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[#b5925a]/70 rounded-br-sm pointer-events-none"></div>

          {/* Header Flourish */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <span
              className="h-[1px] w-8 sm:w-12"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(181, 146, 90, 0.7))",
              }}
            ></span>
            <span
              className="text-[12px] sm:text-[13px] uppercase tracking-[0.25em] font-semibold"
              style={{
                color: "#826639",
                fontFamily: '"Lora", "Times New Roman", serif',
              }}
            >
              TRÂN TRỌNG KÍNH MỜI
            </span>
            <span
              className="h-[1px] w-8 sm:w-12"
              style={{
                background:
                  "linear-gradient(-90deg, transparent, rgba(181, 146, 90, 0.7))",
              }}
            ></span>
          </div>

          {/* Guest Name */}
          <h2
            className="text-3xl sm:text-4xl lg:text-[42px] capitalize font-bold tracking-wide my-2 leading-tight drop-shadow-sm"
            style={{
              color: "#5c4a3e",
              fontFamily: '"Fz Qellia", serif',
              textShadow: "0 2px 8px rgba(181, 146, 90, 0.2)",
            }}
          >
            {guestName || "Quý Khách"}
          </h2>

          {/* Subtitle */}
          <p
            className="text-[12px] sm:text-[13px] font-medium tracking-wide mt-2 opacity-85"
            style={{
              color: "#7c6a60",
              fontFamily: '"Lora", "Times New Roman", serif',
            }}
          >
            Tới dự buổi tiệc chung vui cùng gia đình chúng tôi
          </p>
        </div>
      </GsapReveal>

      {/* Extra space at bottom to transition into next section smoothly */}
      <div className="h-[80px] w-full"></div>
    </section>
  );
}
