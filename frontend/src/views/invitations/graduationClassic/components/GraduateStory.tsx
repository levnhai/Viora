import Image from "next/image";
import { WeddingData } from "@/entities/invitation/model/types";

interface GraduateStoryProps {
  weddingData: WeddingData;
}

export function GraduateStory({ weddingData }: GraduateStoryProps) {
  const graduateName =
    weddingData.brideName || weddingData.groomName || "Đặng Mai Trang";

  const storyPhoto =
    weddingData.storyImages?.[0] ||
    weddingData.galleryImages?.[4] ||
    "https://w.ladicdn.com/s450x500/69b247cf4f6ddc0012f0ce55/1784774421263_3379540865962086579_g2668429489759155549_8ee5c45ee5a08ba393a4a2ec8db2f7ab-20260723163500-2ay81.jpg";

  return (
    <section className="w-full relative min-h-[660px] flex flex-col items-center bg-[#F8F6F3] overflow-hidden pt-10 pb-12 px-4">
      {/* 1. Header Title: "My story" */}
      <h2 className="text-[52px] sm:text-[56px] font-hoatay font-normal text-[#9B343D] text-center leading-tight mb-4 z-10">
        My story
      </h2>

      {/* 2. Main Parchment Letter Card Container */}
      <div className="relative w-full max-w-[340px] min-h-[440px] flex flex-col items-center z-10">
        {/* Parchment Paper Background Asset */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <Image
            src="https://w.ladicdn.com/s800x800/69b247cf4f6ddc0012f0ce55/elements-thiep-8-20260722112936-_cok1.png"
            alt="Parchment Letter Card"
            fill
            className="object-fill"
          />
        </div>

        {/* 3D Gold Graduation Cap in top right corner */}
        <div className="absolute -top-7 -right-5 w-[76px] h-[86px] pointer-events-none z-20">
          <Image
            src="https://w.ladicdn.com/s500x500/69b247cf4f6ddc0012f0ce55/elements-thiep-6-20260722110649-uratr.png"
            alt="3D Gold Cap"
            fill
            className="object-contain drop-shadow-md"
          />
        </div>

        {/* Polaroid Photo clipped inside top */}
        <div className="relative w-[130px] h-[165px] mt-6 z-10">
          <div className="relative w-full h-full transform rotate-[12deg] shadow-md border-4 border-white overflow-hidden bg-white">
            <Image
              src={storyPhoto}
              alt="Story memory"
              fill
              sizes="140px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Letter Text Content */}
        <div className="relative z-10 w-full px-6 pt-5 pb-6 flex flex-col items-center text-center">
          <p className="text-[13px] font-hastegi text-[#9B343D] leading-relaxed tracking-wide text-justify sm:text-center">
            Một hành trình đã khép lại bằng những ngày tháng đáng nhớ, từ những
            bỡ ngỡ ban đầu đến những nụ cười rạng rỡ của ngày hôm nay. Cảm ơn vì
            đã luôn đồng hành, yêu thương và tạo nên một thanh xuân thật trọn
            vẹn. Hy vọng bạn sẽ cùng mình lưu giữ thêm một khoảnh khắc ý nghĩa
            trong ngày đặc biệt này!
          </p>

          {/* Signature */}
          <div className="mt-4 flex flex-col items-center">
            <span className="text-[16px] font-ecatherina font-bold text-[#9B343D] tracking-wide">
              {graduateName}
            </span>
          </div>

          {/* Decorative Washi Tape below letter */}
          <div className="relative w-[115px] h-[32px] mt-2 pointer-events-none">
            <Image
              src="https://w.ladicdn.com/s500x500/69b247cf4f6ddc0012f0ce55/elements-thiep-3-20260722104234-bju2l.png"
              alt="Washi Tape"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* 3. Bottom Watercolor Cloud Assets */}
      <div className="absolute bottom-0 left-0 w-[205px] h-[143px] pointer-events-none z-0">
        <Image
          src="https://w.ladicdn.com/s750x650/69b247cf4f6ddc0012f0ce55/untitled_artwork-1-20260724161904-anzsy.png"
          alt="Watercolor bottom left"
          fill
          className="object-contain"
        />
      </div>
      <div className="absolute bottom-0 right-0 w-[240px] h-[180px] pointer-events-none z-0">
        <Image
          src="https://w.ladicdn.com/s950x750/69b247cf4f6ddc0012f0ce55/untitled_artwork-1-20260724161904-anzsy.png"
          alt="Watercolor bottom right"
          fill
          className="object-contain transform scale-x-[-1]"
        />
      </div>
    </section>
  );
}
