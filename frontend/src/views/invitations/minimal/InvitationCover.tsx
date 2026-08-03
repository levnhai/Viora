import { GsapReveal } from "@/shared/ui/GsapReveal";
import { WeddingData } from "@/entities/invitation/model/types";
import img_1 from "@/shared/assets/image/flower/img_1.png";
import { getLastTwoNames } from "@/shared/lib/utils/string";
interface InvitationCoverProps {
  weddingData: WeddingData;
  guestName?: string;
}

export function InvitationCover({
  weddingData,
  guestName,
}: InvitationCoverProps) {
  const { groomName, brideName } = weddingData;

  return (
    <section className="relative min-h-[50vh] flex flex-col items-center justify-start text-center overflow-visible pb-20">
      {/* Floral top image */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[400px]">
        <img
          src={img_1.src}
          alt="Floral decoration"
          className="w-full h-auto object-contain opacity-90 -mt-45"
        />
      </div>

      <GsapReveal
        delay={0}
        direction="none"
        distance={0}
        className="z-10 flex flex-col items-center mt-2 mb-4 space-y-2 pt-24 sm:pt-32 w-11/12 sm:w-4/5 md:w-3/5"
      >
        <p className="font-serif uppercase tracking-[0.2em] text-[12px] mb-2 opacity-90">
          THE WEDDING OF
        </p>

        <h1
          className="text-5xl sm:text-7xl md:text-8xl mt-2 text-left w-full capitalize leading-tight"
          style={{
            fontFamily: "'Great Vibes', cursive",
            textShadow: "0px 4px 20px rgba(0,0,0,0.5)",
          }}
        >
          {getLastTwoNames(groomName) || "Trung Hiếu"}
        </h1>

        <div className="text-5xl sm:text-6xl font-cursive my-1 opacity-80">
          &amp;
        </div>

        <h1
          className="text-5xl sm:text-7xl md:text-8xl mt-2 text-right w-full capitalize leading-tight"
          style={{
            fontFamily: "'Great Vibes', cursive",
            textShadow: "0px 4px 20px rgba(0,0,0,0.5)",
          }}
        >
          {getLastTwoNames(brideName) || "Như Ý"}
        </h1>
      </GsapReveal>

      {guestName && (
        <GsapReveal
          delay={0.4}
          direction="up"
          distance={30}
          className="mt-16 z-10 border border-current/30 rounded-full px-8 py-3 bg-current/5"
        >
          <p className="text-lg font-serif uppercase tracking-widest">
            Thân Mời:{" "}
            <span className="font-semibold text-white ml-2">
              {guestName || " hai le"}
            </span>
          </p>
        </GsapReveal>
      )}

      {/* Decorative Divider to separate Cover from next section */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 max-w-md flex items-center justify-center gap-4 py-8">
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-current opacity-60"></div>
        <div className="flex items-center justify-center opacity-80 gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          <span className="text-lg">✧</span>
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
        </div>
        <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-current opacity-60"></div>
      </div>
    </section>
  );
}
