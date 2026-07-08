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
    groomFatherName,
    groomMotherName,
    brideFatherName,
    brideMotherName,
  } = weddingData;

  return (
    <section className="pt-16 pb-12 px-4 relative">
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
          className="flex justify-between items-start max-w-lg mx-auto text-center mb-16 px-4"
        >
          <div className="space-y-1">
            <p className="text-sm font-serif text-[rgb(225,188,124)]/80">
              Ông Bà
            </p>
            <h3 className="text-lg font-serif text-[rgb(225,188,124)]">
              {groomFatherName || "Lê Văn Bình"}
            </h3>
            <h3 className="text-lg font-serif text-[rgb(225,188,124)]">
              {groomMotherName || "Trần Thị Hằng"}
            </h3>
            <p className="text-[10px] font-serif text-[rgb(225,188,124)]/60 pt-2 max-w-[150px] mx-auto">
              Số 3, Xóm 1, Xã Ninh Nhất, TP. Ninh Bình
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-serif text-[rgb(225,188,124)]/80">
              Ông Bà
            </p>
            <h3 className="text-lg font-serif text-[rgb(225,188,124)]">
              {brideFatherName || "Nguyễn Văn Lợi"}
            </h3>
            <h3 className="text-lg font-serif text-[rgb(225,188,124)]">
              {brideMotherName || "Vũ Thị Thanh"}
            </h3>
            <p className="text-[10px] font-serif text-[rgb(225,188,124)]/60 pt-2 max-w-[150px] mx-auto">
              Tổ 5, Phường Nam Thành, TP. Ninh Bình
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={200} className="text-center space-y-6">
          <p className="text-[rgb(225,188,124)] font-serif uppercase tracking-widest text-sm mb-12">
            Trân trọng báo tin <br />
            Lễ thành hôn của con chúng tôi
          </p>

          <div className="space-y-6 flex flex-col items-center">
            <div className="space-y-2">
              <h3
                className="text-5xl text-[rgb(225,188,124)] font-light"
                style={{ fontFamily: "'EB Garamond', serif" }}
              >
                {groomName}
              </h3>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[rgb(225,188,124)]/80 font-serif">
                Trưởng Nam
              </p>
            </div>

            <div className="text-4xl text-[rgb(225,188,124)] font-serif italic py-2">
              &
            </div>

            <div className="space-y-2">
              <h3
                className="text-5xl text-[rgb(225,188,124)] font-light"
                style={{ fontFamily: "'EB Garamond', serif" }}
              >
                {brideName}
              </h3>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[rgb(225,188,124)]/80 font-serif">
                Thứ Nữ
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
