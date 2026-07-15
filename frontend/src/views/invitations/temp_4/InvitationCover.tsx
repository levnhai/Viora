import { GsapReveal } from "@/shared/ui/GsapReveal";
import { WeddingData } from "@/entities/invitation/model/types";
import img_5 from "@/shared/assets/image/flower/img_5.webp";

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
    templateConfig?.coverImage || 
    (galleryImages && galleryImages.length > 0 ? galleryImages[0] : "https://i.pinimg.com/736x/0c/c6/cb/0cc6cb0151fd35b05d33c506061e46a6.jpg");

  return (
    <section className="relative min-h-[100vh] flex flex-col items-center justify-start text-center overflow-hidden pb-12 pt-16 bg-[#fdfbf6]">
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

      {/* Faded leaf decoration background (top-left) */}
      <div
        className="absolute -top-[50px] -left-[150px] w-[350px] opacity-[0.06] pointer-events-none"
        style={{ transform: "rotate(120deg)" }}
      >
        <img
          src={img_5.src || (img_5 as unknown as string)}
          alt=""
          className="w-full h-auto"
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
        className="z-10 flex flex-col items-center w-full max-w-md px-4 mt-8"
      >
        <p
          className="uppercase tracking-[0.25em] text-[12px] font-medium mb-3"
          style={{ color: "rgba(124, 106, 96, 0.7)" }}
        >
          The Wedding Of
        </p>

        <h1
          className="flex items-center justify-center gap-3 leading-tight text-[30px] sm:text-[36px]"
          style={{ color: textColor }}
        >
          <span style={{ fontFamily: '"Fz Qellia", serif' }}>
            {groomName || "Hoàng Nam"}
          </span>
          <span
            className="text-[20px] -mt-1"
            style={{ fontFamily: '"Baskerville", "Times New Roman", serif' }}
          >
            &amp;
          </span>
          <span style={{ fontFamily: '"Fz Qellia", serif' }}>
            {brideName || "Thảo Vy"}
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

          {/* Photo */}
          <div className="w-full aspect-[3/4] overflow-hidden bg-gray-100">
            <img
              src={coverImage}
              alt="Couple"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Flower Overlap */}
          <div
            className="absolute -bottom-[50px] -left-[70px] w-[180px] z-40 pointer-events-none drop-shadow-xl"
            style={{ transform: "rotate(25deg)" }}
          >
            <img
              src={img_5.src || (img_5 as unknown as string)}
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
            <span className="text-[18px] font-medium tracking-tighter italic">
              {groomName?.[0] || "A"}/{brideName?.[0] || "A"}
            </span>
          </div>
        </div>
      </GsapReveal>

      {guestName && (
        <GsapReveal
          delay={0.6}
          direction="up"
          distance={30}
          className="mt-16 z-10"
        >
          <div className="flex flex-col items-center">
            <p
              className="text-[16px] mb-1 font-light"
              style={{
                color: "rgba(124, 106, 96, 0.72)",
                fontFamily: '"Lora", "Times New Roman", serif',
              }}
            >
              Thân Mời
            </p>
            <p
              className="text-xl capitalize font-medium"
              style={{ color: textColor, fontFamily: '"Fz Qellia", serif' }}
            >
              {guestName}
            </p>
          </div>
        </GsapReveal>
      )}

      {/* Extra space at bottom to transition into next section smoothly */}
      <div className="h-[80px] w-full"></div>
    </section>
  );
}
