import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { WeddingData } from "@/entities/invitation/model/types";

interface GraduationGalleryProps {
  weddingData: WeddingData;
}

export function GraduationGallery({ weddingData }: GraduationGalleryProps) {
  const images = weddingData.galleryImages && weddingData.galleryImages.length > 0
    ? weddingData.galleryImages
    : [
        "https://w.ladicdn.com/s650x700/69b247cf4f6ddc0012f0ce55/1784774421170_3379540865962086579_g2668429489759155549_987364ad977145acecd0b9ccee916950-20260723163343-c0hna.jpg",
        "https://w.ladicdn.com/s650x700/69b247cf4f6ddc0012f0ce55/1784774421188_3379540865962086579_g2668429489759155549_fe35cc6df98c1db7d8bc02d16a94ec2b-20260723163344-wkfcw.jpg",
        "https://w.ladicdn.com/s650x700/69b247cf4f6ddc0012f0ce55/1784774421208_3379540865962086579_g2668429489759155549_a296b5a3fa8d575c9bb0d8e874836f32-20260723163435-0sug9.jpg",
        "https://w.ladicdn.com/s650x700/69b247cf4f6ddc0012f0ce55/1784774421263_3379540865962086579_g2668429489759155549_8ee5c45ee5a08ba393a4a2ec8db2f7ab-20260723163500-2ay81.jpg",
      ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full relative min-h-[750px] flex flex-col items-center bg-[#F8F6F3] overflow-hidden pt-10 pb-12 px-4">
      {/* Watercolor Background Blobs */}
      <div className="absolute top-2 left-0 w-[236px] h-[164px] pointer-events-none z-0">
        <Image
          src="https://w.ladicdn.com/s850x700/69b247cf4f6ddc0012f0ce55/untitled_artwork-1-20260724161904-anzsy.png"
          alt="Watercolor top left"
          fill
          className="object-contain transform rotate-180 scale-x-[-1]"
        />
      </div>
      <div className="absolute top-0 right-0 w-[268px] h-[172px] pointer-events-none z-0">
        <Image
          src="https://w.ladicdn.com/s900x750/69b247cf4f6ddc0012f0ce55/untitled_artwork-1-20260724161904-anzsy.png"
          alt="Watercolor top right"
          fill
          className="object-contain transform rotate-180"
        />
      </div>

      {/* 1. Header: ALBUM + of graduate + Wax Seal */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-[140px] mb-4">
        {/* ALBUM */}
        <h2 className="text-[52px] sm:text-[58px] font-erotique font-bold uppercase text-[#9B343D] tracking-wider leading-none">
          ALBUM
        </h2>

        {/* of graduate */}
        <span className="text-[46px] sm:text-[52px] font-daytonica text-[#9B343D] leading-tight -mt-4">
          of graduate
        </span>

        {/* Wax Seal Bow Stamp */}
        <div className="absolute top-[88px] w-[62px] h-[58px] pointer-events-none z-20">
          <Image
            src="https://w.ladicdn.com/s450x450/69b247cf4f6ddc0012f0ce55/elements-thiep-16-20260723042420-yfzqc.png"
            alt="Wax Seal Bow"
            fill
            className="object-contain drop-shadow-sm"
          />
        </div>
      </div>

      {/* 2. Main Gallery Slider Container */}
      <div className="relative z-10 w-full max-w-[340px] flex flex-col items-center mt-6">
        {/* Photo Card with Rounded corners and shadow */}
        <div className="relative w-full aspect-[4/5] bg-white p-2 rounded-2xl shadow-xl border border-rose-100 overflow-hidden">
          <div className="relative w-full h-full rounded-xl overflow-hidden">
            <Image
              src={images[currentIndex]}
              alt={`Gallery slide ${currentIndex + 1}`}
              fill
              sizes="340px"
              priority
              className="object-cover transition-opacity duration-300"
            />
          </div>

          {/* Navigation Arrow: Left */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#9B343D] flex items-center justify-center shadow-md transition-all active:scale-90 z-20"
            aria-label="Ảnh trước"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Navigation Arrow: Right */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#9B343D] flex items-center justify-center shadow-md transition-all active:scale-90 z-20"
            aria-label="Ảnh kế tiếp"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Caption: Mai Trang PR41 */}
        <h3 className="text-[28px] sm:text-[31px] font-morgina font-bold text-[#9B343D] text-center mt-4">
          Mai Trang PR41
        </h3>

        {/* Decorative Washi Tape below caption */}
        <div className="relative w-[246px] h-[69px] -mt-1 pointer-events-none">
          <Image
            src="https://w.ladicdn.com/s700x700/69b247cf4f6ddc0012f0ce55/elements-thiep-3-20260722104234-bju2l.png"
            alt="Washi Tape"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
