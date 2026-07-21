import { GsapReveal } from "@/shared/ui/GsapReveal";
import { WeddingData } from "@/entities/invitation/model/types";
import img_5 from "@/shared/assets/image/flower/img_5.webp";
import bgPaper from "@/shared/assets/image/paper/paper1.webp";

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
    brideMotherName,
    groomAddress,
    brideAddress,
    weddingDate,
    weddingTime,
  } = weddingData;

  const textColor = "rgb(124, 106, 96)";

  // Helper to parse date
  const parseDateInfo = (dateStr: string) => {
    if (!dateStr)
      return {
        dayOfWeek: "THỨ BẢY",
        date: "03",
        month: "THÁNG 01",
        year: "2026",
      };
    const d = new Date(dateStr);
    if (isNaN(d.getTime()))
      return {
        dayOfWeek: "THỨ BẢY",
        date: "03",
        month: "THÁNG 01",
        year: "2026",
      };

    const days = [
      "CHỦ NHẬT",
      "THỨ HAI",
      "THỨ BA",
      "THỨ TƯ",
      "THỨ NĂM",
      "THỨ SÁU",
      "THỨ BẢY",
    ];
    return {
      dayOfWeek: days[d.getDay()],
      date: d.getDate().toString().padStart(2, "0"),
      month: `THÁNG ${(d.getMonth() + 1).toString().padStart(2, "0")}`,
      year: d.getFullYear().toString(),
    };
  };

  const dInfo = parseDateInfo(weddingDate);

  return (
    <section
      className="relative pt-12 pb-24 px-4 sm:px-8 mx-4 sm:mx-8 overflow-hidden z-20 -mt-10 bg-center bg-repeat rounded-md"
      style={{
        backgroundColor: "rgb(246, 234, 221)",
        backgroundImage: `url(${bgPaper.src})`,
        backgroundBlendMode: "multiply",
      }}
    >
      {/* Decorative Leaves - Left */}
      <div
        className="absolute top-[30%] -left-[50px] w-[180px] opacity-20 pointer-events-none drop-shadow-md z-0"
        style={{ transform: "rotate(15deg)" }}
      >
        <img
          src={img_5.src || (img_5 as unknown as string)}
          alt=""
          className="w-full h-auto"
        />
      </div>

      {/* Decorative Leaves - Right Bottom */}
      <div
        className="absolute bottom-[-26%] -right-[-49px] w-[180px] opacity-41 pointer-events-none drop-shadow-md z-0"
        style={{ transform: "rotate(44deg) scaleX(-1)" }}
      >
        <img
          src={img_5.src || (img_5 as unknown as string)}
          alt=""
          className="w-full h-auto"
        />
      </div>

      <div className="max-w-xl mx-auto relative z-10 flex flex-col items-center">
        {/* Header */}
        <GsapReveal direction="up" distance={30}>
          <h2
            className="text-xl sm:text-2xl font-bold uppercase tracking-widest mb-8 text-center"
            style={{
              color: textColor,
              fontFamily: '"Lora", "Times New Roman", serif',
            }}
          >
            THÔNG TIN LỄ CƯỚI
          </h2>
        </GsapReveal>

        {/* Parents Info */}
        <GsapReveal
          delay={0.1}
          direction="up"
          distance={40}
          className="flex flex-row justify-center items-stretch w-full mb-10"
          style={{
            color: textColor,
            fontFamily: '"Lora", "Times New Roman", serif',
          }}
        >
          {/* Groom Side */}
          <div className="flex-1 text-center pr-4">
            <p
              className="text-[12px] font-medium mb-1"
              style={{ color: textColor }}
            >
              Ông Bà
            </p>
            <h3
              className="text-[14px] capitalize sm:text-[15px] font-bold mb-1"
              style={{ color: textColor }}
            >
              {groomFatherName || "Lê Văn Bình"}
            </h3>
            <h3
              className="text-[14px] capitalize sm:text-[15px] font-bold mb-2"
              style={{ color: textColor }}
            >
              {groomMotherName || "Trần Thị Hằng"}
            </h3>
            <p
              className="text-[10px] capitalize sm:text-[11px] leading-tight mx-auto max-w-[120px]"
              style={{ color: textColor }}
            >
              {groomAddress || "Quận 1, TP. Hồ Chí Minh"}
            </p>
          </div>

          {/* Divider */}
          <div className="w-[1px] bg-[#7c6a60] opacity-20"></div>

          {/* Bride Side */}
          <div className="flex-1 text-center pl-4">
            <p
              className="text-[12px] font-medium mb-1"
              style={{ color: textColor }}
            >
              Ông Bà
            </p>
            <h3
              className="text-[14px] capitalize sm:text-[15px] font-bold mb-1"
              style={{ color: textColor }}
            >
              {brideFatherName || "Nguyễn Văn Lợi"}
            </h3>
            <h3
              className="text-[14px] capitalize sm:text-[15px] font-bold mb-2"
              style={{ color: textColor }}
            >
              {brideMotherName || "Vũ Thị Thanh"}
            </h3>
            <p
              className="text-[10px] capitalize sm:text-[11px] leading-tight mx-auto max-w-[120px]"
              style={{ color: textColor }}
            >
              {brideAddress || "Quận 3, TP. Hồ Chí Minh"}
            </p>
          </div>
        </GsapReveal>

        {/* Intro Text */}
        <GsapReveal
          delay={0.2}
          direction="up"
          distance={40}
          className="text-center mb-10"
        >
          <p
            className="text-[11px] sm:text-[12px] uppercase tracking-widest leading-relaxed font-medium"
            style={{
              color: textColor,
              fontFamily: '"Lora", "Times New Roman", serif',
            }}
          >
            TRÂN TRỌNG BÁO TIN
            <br />
            LỄ THÀNH HÔN CỦA CON CHÚNG TÔI
          </p>
        </GsapReveal>

        {/* Names */}
        <GsapReveal
          delay={0.3}
          direction="up"
          distance={40}
          className="text-center w-full flex flex-col items-center space-y-6"
        >
          {/* Groom */}
          <div className="flex flex-col items-center">
            <h3
              className="text-4xl sm:text-5xl lg:text-[54px] mb-3"
              style={{ color: textColor, fontFamily: '"Fz Qellia", serif' }}
            >
              {groomName || "Nguyễn Hoàng Nam"}
            </h3>
            <p
              className="text-[10px] uppercase tracking-[0.25em] font-medium"
              style={{ color: textColor }}
            >
              {groomRank || "TRƯỞNG NAM"}
            </p>
          </div>

          {/* Ampersand */}
          <div
            className="text-2xl sm:text-3xl my-2"
            style={{
              color: textColor,
              fontFamily: '"Baskerville", "Times New Roman", serif',
            }}
          >
            &amp;
          </div>

          {/* Bride */}
          <div className="flex flex-col items-center">
            <h3
              className="text-4xl sm:text-5xl lg:text-[54px] mb-3"
              style={{ color: textColor, fontFamily: '"Fz Qellia", serif' }}
            >
              {brideName || "Trần Thảo Vy"}
            </h3>
            <p
              className="text-[10px] uppercase tracking-[0.25em] font-medium"
              style={{ color: textColor }}
            >
              {brideRank || "ÚT NỮ"}
            </p>
          </div>
        </GsapReveal>

        {/* Ceremony Info */}
        <GsapReveal
          delay={0.4}
          direction="up"
          distance={40}
          className="text-center mt-12 w-full flex flex-col items-center"
        >
          <p
            className="text-[12px] sm:text-[13px] uppercase tracking-widest leading-relaxed font-medium mb-6"
            style={{
              color: textColor,
              fontFamily: '"Lora", "Times New Roman", serif',
            }}
          >
            LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI
            <br />
            TƯ GIA
            <br />
            VÀO LÚC
          </p>

          <p
            className="text-3xl mb-6"
            style={{
              color: textColor,
              fontFamily: '"Lora", "Times New Roman", serif',
            }}
          >
            {weddingTime || "09:00"}
          </p>

          <div
            className="flex items-center justify-center gap-4 sm:gap-6 w-full mb-6"
            style={{
              fontFamily: '"Lora", "Times New Roman", serif',
              color: textColor,
            }}
          >
            <span className="text-[12px] uppercase tracking-widest">
              {dInfo.dayOfWeek}
            </span>
            <div className="w-[1px] h-6 bg-[#7c6a60] opacity-30"></div>
            <span className="text-4xl leading-none">{dInfo.date}</span>
            <div className="w-[1px] h-6 bg-[#7c6a60] opacity-30"></div>
            <span className="text-[12px] uppercase tracking-widest">
              {dInfo.month}
            </span>
          </div>

          <p
            className="text-2xl mb-4"
            style={{
              color: textColor,
              fontFamily: '"Lora", "Times New Roman", serif',
            }}
          >
            {dInfo.year}
          </p>

          <p
            className="text-[10px] sm:text-[11px] uppercase tracking-widest font-medium"
            style={{
              color: textColor,
              fontFamily: '"Lora", "Times New Roman", serif',
            }}
          >
            (TỨC NGÀY 15/11 NĂM ẤT TỴ)
          </p>
        </GsapReveal>
      </div>
    </section>
  );
}
