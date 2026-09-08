import { GsapReveal } from "@/shared/ui/GsapReveal";
import { WeddingData } from "@/entities/invitation/model/types";

interface MinimalCoupleSpotlightProps {
  weddingData: WeddingData;
}

export function MinimalCoupleSpotlight({
  weddingData,
}: MinimalCoupleSpotlightProps) {
  const {
    groomName,
    brideName,
    groomRank,
    brideRank,
    groomFatherName,
    groomMotherName,
    brideFatherName,
    groomAddress,
    brideAddress,
    brideMotherName,
  } = weddingData;

  return (
    <section className="pt-16 pb-4 px-4 relative">
      <div className="max-w-4xl mx-auto relative z-10">
        <GsapReveal direction="up" distance={30}>
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-2xl text-[rgb(225,188,124)] font-serif uppercase tracking-widest">
              THÔNG TIN LỄ CƯỚI
            </h2>
          </div>
        </GsapReveal>

        <GsapReveal
          delay={0.1}
          direction="up"
          distance={40}
          className="flex flex-row justify-between items-start max-w-lg mx-auto text-center mb-16 px-4 sm:px-0 gap-4 sm:gap-0"
        >
          <div className="space-y-2 flex-1">
            <div className="flex items-center justify-center gap-2 mb-2 sm:mb-4">
              <div className="h-[1px] w-6 sm:w-10 bg-[rgb(225,188,124)]/30" />
              <p className="text-[10px] sm:text-[11px] font-sans text-[rgb(225,188,124)]/70 uppercase tracking-[0.25em] font-semibold mb-0">
                NHÀ TRAI
              </p>
              <div className="h-[1px] w-6 sm:w-10 bg-[rgb(225,188,124)]/30" />
            </div>
            {groomFatherName && groomFatherName.trim() ? (
              <h3 className="text-base sm:text-lg font-serif text-[rgb(225,188,124)] capitalize drop-shadow-sm mb-0">
                {groomFatherName}
              </h3>
            ) : null}
            {groomMotherName && groomMotherName.trim() ? (
              <h3 className="text-base sm:text-lg font-serif text-[rgb(225,188,124)] capitalize drop-shadow-sm mb-0">
                {groomMotherName}
              </h3>
            ) : null}
            {groomAddress ? (
              <p className="text-[10px] font-serif text-[rgb(225,188,124)]/50 max-w-[150px] mx-auto leading-relaxed">
                {groomAddress}
              </p>
            ) : null}
          </div>

          <div className="space-y-2 flex-1">
            <div className="flex items-center justify-center gap-2 mb-2 sm:mb-4">
              <div className="h-[1px] w-6 sm:w-10 bg-[rgb(225,188,124)]/30" />
              <p className="text-[10px] sm:text-[11px] font-sans text-[rgb(225,188,124)]/70 uppercase tracking-[0.25em] font-semibold">
                NHÀ GÁI
              </p>
              <div className="h-[1px] w-6 sm:w-10 bg-[rgb(225,188,124)]/30" />
            </div>
            {brideFatherName && brideFatherName.trim() ? (
              <h3 className="text-base sm:text-lg font-serif text-[rgb(225,188,124)] capitalize drop-shadow-sm mb-0">
                {brideFatherName}
              </h3>
            ) : null}
            {brideMotherName && brideMotherName.trim() ? (
              <h3 className="text-base sm:text-lg font-serif text-[rgb(225,188,124)] capitalize drop-shadow-sm mb-0">
                {brideMotherName}
              </h3>
            ) : null}
            {brideAddress ? (
              <p className="text-[10px] font-serif text-[rgb(225,188,124)]/50 max-w-[150px] mx-auto leading-relaxed">
                {brideAddress}
              </p>
            ) : null}
          </div>
        </GsapReveal>

        <GsapReveal
          delay={0.3}
          direction="up"
          distance={50}
          className="text-center mt-12 space-y-6"
        >
          <p className="text-[rgb(225,188,124)] font-serif uppercase tracking-widest text-sm mb-12">
            Trân trọng báo tin <br />
            Lễ thành hôn của con chúng tôi
          </p>

          <div className="space-y-6 flex flex-col items-center">
            <div className="space-y-2">
              <h3 className="text-5xl text-[rgb(225,188,124)] font-serif capitalize">
                {groomName}
              </h3>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[rgb(225,188,124)]/80 font-serif capitalize">
                {groomRank}
              </p>
            </div>

            <div className="text-6xl text-[rgb(225,188,124)] font-cursive py-2 opacity-80">
              &
            </div>

            <div className="space-y-2">
              <h3 className="text-5xl text-[rgb(225,188,124)] font-serif capitalize">
                {brideName}
              </h3>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[rgb(225,188,124)]/80 font-serif capitalize">
                {brideRank}
              </p>
            </div>
          </div>
        </GsapReveal>
      </div>
    </section>
  );
}
