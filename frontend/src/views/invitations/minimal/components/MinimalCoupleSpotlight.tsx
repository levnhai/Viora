import { FadeIn } from "@/shared/ui/FadeIn";
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
        <FadeIn>
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-2xl text-[rgb(225,188,124)] font-serif uppercase tracking-widest">
              THÔNG TIN LỄ CƯỚI
            </h2>
          </div>
        </FadeIn>

        <FadeIn
          delay={100}
          className="flex flex-row justify-between items-start max-w-lg mx-auto text-center mb-16 px-4 sm:px-0 gap-4 sm:gap-0"
        >
          <div className="space-y-2 flex-1">
            <div className="flex items-center justify-center gap-2 mb-2 sm:mb-4">
              <div className="h-[1px] w-6 sm:w-10 bg-[rgb(225,188,124)]/30" />
              <p className="text-[10px] sm:text-[11px] font-sans text-[rgb(225,188,124)]/70 uppercase tracking-[0.25em] font-semibold">
                NHÀ TRAI
              </p>
              <div className="h-[1px] w-6 sm:w-10 bg-[rgb(225,188,124)]/30" />
            </div>
            <h3 className="text-base sm:text-lg font-serif text-[rgb(225,188,124)] capitalize drop-shadow-sm capitalize">
              {groomFatherName || "Lê Văn Bình"}
            </h3>
            <h3 className="text-base sm:text-lg font-serif text-[rgb(225,188,124)] capitalize drop-shadow-sm capitalize">
              {groomMotherName || "Trần Thị Hằng"}
            </h3>
            <p className="text-[10px] font-serif text-[rgb(225,188,124)]/50 pt-2 max-w-[150px] mx-auto leading-relaxed">
              {groomAddress || ""}
            </p>
          </div>

          <div className="space-y-2 flex-1">
            <div className="flex items-center justify-center gap-2 mb-2 sm:mb-4">
              <div className="h-[1px] w-6 sm:w-10 bg-[rgb(225,188,124)]/30" />
              <p className="text-[10px] sm:text-[11px] font-sans text-[rgb(225,188,124)]/70 uppercase tracking-[0.25em] font-semibold">
                NHÀ GÁI
              </p>
              <div className="h-[1px] w-6 sm:w-10 bg-[rgb(225,188,124)]/30" />
            </div>
            <h3 className="text-base sm:text-lg font-serif text-[rgb(225,188,124)] capitalize drop-shadow-sm capitalize">
              {brideFatherName || "Nguyễn Văn Lợi"}
            </h3>
            <h3 className="text-base sm:text-lg font-serif text-[rgb(225,188,124)] capitalize drop-shadow-sm capitalize">
              {brideMotherName || "Vũ Thị Thanh"}
            </h3>
            <p className="text-[10px] font-serif text-[rgb(225,188,124)]/50 pt-2 max-w-[150px] mx-auto leading-relaxed">
              {brideAddress || ""}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={300} className="text-center mt-12 space-y-6">
          <p className="text-[rgb(225,188,124)] font-serif uppercase tracking-widest text-sm mb-12">
            Trân trọng báo tin <br />
            Lễ thành hôn của con chúng tôi
          </p>

          <div className="space-y-6 flex flex-col items-center">
            <div className="space-y-2">
              <h3
                className="text-5xl text-[rgb(225,188,124)] font-light capitalize"
                style={{ fontFamily: "'EB Garamond', serif" }}
              >
                {groomName}
              </h3>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[rgb(225,188,124)]/80 font-serif capitalize">
                {groomRank}
              </p>
            </div>

            <div className="text-4xl text-[rgb(225,188,124)] font-serif italic py-2">
              &
            </div>

            <div className="space-y-2">
              <h3
                className="text-5xl text-[rgb(225,188,124)] font-light capitalize"
                style={{ fontFamily: "'EB Garamond', serif" }}
              >
                {brideName}
              </h3>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[rgb(225,188,124)]/80 font-serif capitalize">
                {brideRank}
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
