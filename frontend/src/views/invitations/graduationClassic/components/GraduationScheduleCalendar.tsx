import Image from "next/image";
import { MapPin } from "lucide-react";
import { WeddingData } from "@/entities/invitation/model/types";

interface GraduationScheduleCalendarProps {
  weddingData: WeddingData;
}

export function GraduationScheduleCalendar({
  weddingData,
}: GraduationScheduleCalendarProps) {
  const event = weddingData.events?.[0] || {
    title: "Lễ Tốt Nghiệp",
    time: "09:00",
    date: "26/07/2026",
    locationName: "HỌC VIỆN BÁO CHÍ VÀ TUYÊN TRUYỀN",
    address: "36 Xuân Thủy, Cầu Giấy, Hà Nội",
    mapUrl:
      "https://maps.google.com/?q=Học+viện+Báo+chí+và+Tuyên+truyền+36+Xuân+Thủy+Cầu+Giấy+Hà+Nội",
  };

  const mapUrl =
    event.mapUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${event.locationName} ${event.address}`
    )}`;

  const photoLeft =
    weddingData.galleryImages?.[2] ||
    "https://w.ladicdn.com/s500x500/69b247cf4f6ddc0012f0ce55/1784774421170_3379540865962086579_g2668429489759155549_987364ad977145acecd0b9ccee916950-20260723163343-c0hna.jpg";

  const photoRight =
    weddingData.galleryImages?.[3] ||
    "https://w.ladicdn.com/s500x500/69b247cf4f6ddc0012f0ce55/1784774421188_3379540865962086579_g2668429489759155549_fe35cc6df98c1db7d8bc02d16a94ec2b-20260723163344-wkfcw.jpg";

  return (
    <section className="w-full pt-8 pb-12 px-4 flex flex-col items-center text-center relative bg-[#F8F6F3] overflow-hidden">
      {/* Background Pink Smudges */}
      <div className="absolute top-0 left-0 w-36 h-36 bg-[#FFE7ED] rounded-full blur-2xl pointer-events-none opacity-80" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#FFE7ED] rounded-full blur-3xl pointer-events-none opacity-80" />

      {/* Graduation Cap Vector Line Art Top Right */}
      <div className="absolute top-6 right-6 w-14 h-11 pointer-events-none z-10 opacity-75">
        <Image
          src="https://w.ladicdn.com/s550x550/69b247cf4f6ddc0012f0ce55/elements-thiep-17-20260723043335-d3sit.png"
          alt="Cap doodle"
          fill
          className="object-contain"
        />
      </div>

      {/* Heart Doodle Top Left */}
      <div className="absolute top-4 left-4 w-12 h-12 pointer-events-none z-10 opacity-50">
        <Image
          src="https://w.ladicdn.com/s550x550/69b247cf4f6ddc0012f0ce55/elements-thiep-18-20260723043335-ueahl.png"
          alt="Heart doodle"
          fill
          className="object-contain"
        />
      </div>

      {/* Dual Framed Photos in Authentic Vintage Frame Stamps */}
      <div className="relative w-full max-w-[360px] h-[230px] my-2">
        {/* Photo Left with Stamp Border */}
        <div className="absolute left-3 top-2 w-[160px] h-[190px] z-10">
          <div className="relative w-full h-full">
            {/* Photo content inside */}
            <div className="absolute inset-[14px] overflow-hidden rounded-sm -rotate-3 z-0">
              <Image
                src={photoLeft}
                alt="Graduate moment 1"
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>
            {/* Stamp Frame Overlay */}
            <Image
              src="https://w.ladicdn.com/s600x600/69b247cf4f6ddc0012f0ce55/elements-thiep-21-20260723043659-q0sm0.png"
              alt="Vintage Stamp Frame Left"
              fill
              className="object-contain z-10 pointer-events-none"
            />
          </div>
        </div>

        {/* Photo Right with Stamp Border */}
        <div className="absolute right-3 top-4 w-[155px] h-[185px] z-10">
          <div className="relative w-full h-full">
            {/* Photo content inside */}
            <div className="absolute inset-[14px] overflow-hidden rounded-sm rotate-3 z-0">
              <Image
                src={photoRight}
                alt="Graduate moment 2"
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>
            {/* Stamp Frame Overlay */}
            <Image
              src="https://w.ladicdn.com/s550x550/69b247cf4f6ddc0012f0ce55/elements-thiep-22-20260723043659-i1icc.png"
              alt="Vintage Stamp Frame Right"
              fill
              className="object-contain z-10 pointer-events-none"
            />
          </div>
        </div>

        {/* Big Script Overlay: GRADUATION CEREMONY */}
        <div className="absolute -bottom-6 inset-x-0 z-20 flex justify-center pointer-events-none">
          <div
            className="text-white text-[50px] sm:text-[56px] font-ralsihten leading-none"
            style={{
              textShadow:
                "0 2px 8px rgba(143,50,59,0.4), 0 0 12px rgba(155,52,61,0.3)",
            }}
          >
            Graduation
          </div>
        </div>
      </div>

      {/* Ceremony Info Text */}
      <div className="w-full max-w-sm mt-8 flex flex-col items-center z-10">
        <p className="text-[17px] font-hastegi uppercase tracking-wider text-[#9B343D] font-normal">
          LỄ TỐT NGHIỆP ĐƯỢC TỔ CHỨC
        </p>
        <p className="text-[15px] font-hastegi uppercase tracking-wider text-[#9B343D] font-bold mt-0.5">
          VÀO <span className="font-extrabold">09:00, CHỦ NHẬT</span>
        </p>

        {/* THÁNG 7 | 26 | NĂM 2026 */}
        <div className="w-full max-w-[320px] flex items-center justify-between my-2">
          <div className="flex-1 flex items-center">
            <span className="text-[18px] font-hastegi uppercase tracking-wider text-[#9B343D] font-bold">
              THÁNG 7
            </span>
            <div className="flex-1 h-[1px] bg-[#9B343D]/50 ml-2" />
          </div>

          <span className="text-[75px] leading-none font-hastegi font-bold text-[#9B343D] mx-3">
            26
          </span>

          <div className="flex-1 flex items-center">
            <div className="flex-1 h-[1px] bg-[#9B343D]/50 mr-2" />
            <span className="text-[18px] font-hastegi uppercase tracking-wider text-[#9B343D] font-bold">
              NĂM 2026
            </span>
          </div>
        </div>

        {/* Location Info */}
        <div className="mt-1 flex flex-col items-center">
          <span className="text-[17px] font-hastegi italic text-[#9B343D]/90">
            Tổ chức tại
          </span>
          <h3 className="text-[19px] font-hastegi font-bold text-[#9B343D] uppercase tracking-wide mt-1">
            {event.locationName}
          </h3>
          <p className="text-[15px] text-[#9B343D] mt-1 max-w-[300px] leading-snug font-hastegi">
            {event.address}
          </p>

          {/* CHỈ ĐƯỜNG Button */}
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 px-6 py-2 rounded-full border border-[#9B343D] bg-transparent text-[#9B343D] inline-flex items-center gap-2 text-[14px] font-hastegi font-bold uppercase tracking-widest hover:bg-[#9B343D] hover:text-white transition-all shadow-sm active:scale-95"
          >
            <MapPin className="w-4 h-4 fill-current" />
            <span>CHỈ ĐƯỜNG</span>
          </a>
        </div>
      </div>
    </section>
  );
}
