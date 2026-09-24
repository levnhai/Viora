import Image from "next/image";

export function GraduationFooter() {
  const footerPhoto =
    "https://w.ladicdn.com/s750x600/69b247cf4f6ddc0012f0ce55/1784774421226_3379540865962086579_g2668429489759155549_67374fa20fb5dc9eecc3b6f189ef526d-20260723165006-li8sm.jpg";

  return (
    <footer className="w-full flex flex-col items-center">
      {/* 1. Main Photo Banner with Thank You Message */}
      <div className="w-full relative h-[292px] overflow-hidden flex flex-col items-center justify-end pb-8 px-4 text-center">
        {/* Background Image with 66% brightness */}
        <div className="absolute inset-0 z-0">
          <Image
            src={footerPhoto}
            alt="Thank you graduate"
            fill
            sizes="(max-width: 640px) 100vw, 420px"
            className="object-cover object-center filter brightness-[0.66]"
          />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 w-full flex flex-col items-center drop-shadow-md">
          <p className="text-white text-[14.24px] font-hastegi leading-relaxed max-w-[360px] tracking-wide mb-3">
            Sự hiện diện của bạn chính là món quà ý nghĩa nhất,
            <br />
            và mình vô cùng trân quý trong ngày vui này.
          </p>

          <h3 className="text-white text-[42px] font-hoatay italic leading-tight">
            Thank you!
          </h3>
        </div>
      </div>

      {/* 2. Bottom Brand & Social Bar */}
      <div className="w-full bg-[#F8F6F3] py-4 px-6 flex items-center justify-between border-t border-[#9B343D]/10">
        <span className="text-[14px] sm:text-[15px] font-hastegi font-semibold tracking-wider text-[#9B343D] uppercase">
          VIORA INVITATION
        </span>

        {/* Social Icons matching original asset styling */}
        <div className="flex items-center gap-2">
          <div className="relative w-[26px] h-[26px] rounded-sm overflow-hidden opacity-90 hover:opacity-100 transition-opacity">
            <Image
              src="https://w.ladicdn.com/s350x350/69b247cf4f6ddc0012f0ce55/cd2e9935902867e76efbc4148ddb247e-20260420021708-csxqc.jpg"
              alt="Social Icon 1"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative w-[26px] h-[26px] rounded-sm overflow-hidden opacity-90 hover:opacity-100 transition-opacity">
            <Image
              src="https://w.ladicdn.com/s350x350/69b247cf4f6ddc0012f0ce55/fb274227765103cbaf48900263276c81-20260420022328-sa30m.jpg"
              alt="Social Icon 2"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative w-[26px] h-[26px] rounded-sm overflow-hidden opacity-90 hover:opacity-100 transition-opacity">
            <Image
              src="https://w.ladicdn.com/s350x350/69b247cf4f6ddc0012f0ce55/52f62f6c4d45dfe4bce7743e1bae22b3-20260420022355-vxqjm.jpg"
              alt="Social Icon 3"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
