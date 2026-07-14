import { FadeIn } from "@/shared/ui/FadeIn";
import { WeddingData } from "@/entities/invitation/model/types";
import img_1 from "@/shared/assets/image/flower/img_1.png";

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
    <section className="relative min-h-[50vh] flex flex-col items-center justify-start text-center overflow-visible pb-20 bg-[rgb(0,26,8)]">
      {/* Floral top image */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[400px]">
        <img
          src={img_1.src}
          alt="Floral decoration"
          className="w-full h-auto object-contain opacity-90 -mt-45"
        />
      </div>

      <FadeIn
        delay={200}
        className="z-10 flex flex-col items-center mt-4 mb-6 space-y-4 pt-48 sm:pt-56 w-11/12 sm:w-4/5 md:w-3/5"
      >
        <p className="text-[rgb(225,188,124)] font-serif uppercase tracking-[0.2em] text-[12px] mb-4">
          THE WEDDING OF
        </p>

        <h1
          className="text-5xl sm:text-7xl md:text-8xl mt-17 text-[rgb(225,188,124)] text-left w-full"
          style={{
            fontFamily: "'Great Vibes', cursive",
            textShadow: "0px 4px 20px rgba(0,0,0,0.5)",
          }}
        >
          {groomName || "Trung Hiếu"}
        </h1>

        <div className="text-4xl sm:text-5xl text-[rgb(225,188,124)] font-serif italic my-2 opacity-80">
          &
        </div>

        <h1
          className="text-5xl sm:text-7xl md:text-8xl mt-6 text-[rgb(225,188,124)] text-right w-full"
          style={{
            fontFamily: "'Great Vibes', cursive",
            textShadow: "0px 4px 20px rgba(0,0,0,0.5)",
          }}
        >
          {brideName || "Như Ý"}
        </h1>
      </FadeIn>

      {guestName && (
        <FadeIn
          delay={400}
          className="mt-16 z-10 border border-[rgb(225,188,124)]/30 rounded-full px-8 py-3 bg-[rgb(225,188,124)]/5"
        >
          <p className="text-lg font-serif text-[rgb(225,188,124)] uppercase tracking-widest">
            Thân Mời:{" "}
            <span className="font-semibold text-white ml-2">
              {guestName || " hai le"}
            </span>
          </p>
        </FadeIn>
      )}

      {/* Decorative Divider to separate Cover from next section */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 max-w-md flex items-center justify-center gap-4 py-8">
        <div
          className="flex-1 h-[1px]"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(225,188,124,0.6))",
          }}
        ></div>
        <div className="flex items-center justify-center text-[rgb(225,188,124)] opacity-80 gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[rgb(225,188,124)]" />
          <span className="text-lg">✧</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[rgb(225,188,124)]" />
        </div>
        <div
          className="flex-1 h-[1px]"
          style={{
            background:
              "linear-gradient(to left, transparent, rgba(225,188,124,0.6))",
          }}
        ></div>
      </div>
    </section>
  );
}
