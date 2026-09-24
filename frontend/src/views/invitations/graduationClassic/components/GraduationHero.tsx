import Image from "next/image";
import { WeddingData } from "@/entities/invitation/model/types";

interface GraduationHeroProps {
  weddingData: WeddingData;
  guestName?: string;
}

export function GraduationHero({
  weddingData,
  guestName,
}: GraduationHeroProps) {
  const graduateName =
    weddingData.brideName || weddingData.groomName || "Mai Trang";
  const recipient = guestName?.trim() || "Cả nhà iu";

  // 4 photos for the film strip
  const filmPhotos = [
    "https://w.ladicdn.com/s450x400/69b247cf4f6ddc0012f0ce55/1784774421095_3379540865962086579_g2668429489759155549_8721e77d7d67642915c9dcc9826a12ad-20260723165058-ggql4.jpg",
    "https://w.ladicdn.com/s450x400/69b247cf4f6ddc0012f0ce55/1784774420865_3379540865962086579_g2668429489759155549_413711b4854d368a30f70a56b02885f9-20260723162942-nks-y.jpg",
    "https://w.ladicdn.com/s450x400/69b247cf4f6ddc0012f0ce55/1784774420902_3379540865962086579_g2668429489759155549_a0ec76fc41ab4cb7fe89b922273e566b-20260723164135-vgsle.jpg",
    "https://w.ladicdn.com/s450x400/69b247cf4f6ddc0012f0ce55/1784774420884_3379540865962086579_g2668429489759155549_fd36d587f191f01454f7c7ef8dba84a8-20260723162943-87qvy.jpg",
  ];

  const heroMainPhoto =
    weddingData.coverImage ||
    "https://static.ladipage.net/69b247cf4f6ddc0012f0ce55/1784774420884_3379540865962086579_g2668429489759155549_fd36d587f191f01454f7c7ef8dba84a8-20260724163024-ilyzg.jpg";

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* ========================================================================= */}
      {/* SECTION 5: Hero Invitation & Calendar (Exact 420px x 757.5px LadiPage)  */}
      {/* ========================================================================= */}
      <div className="w-[420px] h-[757.5px] relative bg-[#F8F6F3] overflow-hidden">
        {/* Background Clouds */}
        {/* Top Right Watercolor Cloud */}
        <div className="absolute top-[-0.5px] left-[272.5px] w-[147.5px] h-[118px] pointer-events-none z-0 transform scale-x-[-1]">
          <Image
            src="https://w.ladicdn.com/s650x550/69b247cf4f6ddc0012f0ce55/untitled_artwork-1-20260724161904-anzsy.png"
            alt="Cloud top right"
            fill
            className="object-contain"
          />
        </div>

        {/* Bottom Right Watercolor Cloud */}
        <div className="absolute top-[599px] left-[264.5px] w-[155.5px] h-[198px] pointer-events-none z-0">
          <Image
            src="https://w.ladicdn.com/s750x600/69b247cf4f6ddc0012f0ce55/untitled_artwork-1-20260724161904-anzsy.png"
            alt="Cloud bottom right"
            fill
            className="object-contain"
          />
        </div>

        {/* Bottom Left Watercolor Cloud */}
        <div className="absolute top-[644.5px] left-0 w-[147.5px] h-[118px] pointer-events-none z-0 transform rotate-180 scale-x-[-1]">
          <Image
            src="https://w.ladicdn.com/s650x550/69b247cf4f6ddc0012f0ce55/untitled_artwork-1-20260724161904-anzsy.png"
            alt="Cloud bottom left"
            fill
            className="object-contain"
          />
        </div>

        {/* Top Left Sparkle Vector */}
        <div className="absolute top-[28.5px] left-[25px] w-[44px] h-[44px] pointer-events-none z-10">
          <Image
            src="https://w.ladicdn.com/s350x350/69b247cf4f6ddc0012f0ce55/elements-thiep-20-20260723043335-lpzap.png"
            alt="Sparkle Top Left"
            fill
            className="object-contain"
          />
        </div>

        {/* ------------------------------------------------------------- */}
        {/* HEADER TEXT GROUP: Thân mời, Cả nhà iu, Đến tham dự...        */}
        {/* ------------------------------------------------------------- */}
        <div className="absolute top-[40px] left-0 w-[420px] flex flex-col items-center z-10 text-center">
          {/* HEADLINE345: Thân mời */}
          <div
            className="w-[122px] text-center"
            style={{
              fontFamily: "'Hastegi', sans-serif",
              fontSize: "23.35px",
              lineHeight: 1.6,
              color: "rgb(143, 50, 59)",
            }}
          >
            Thân mời
          </div>

          {/* HEADLINE276: Cả nhà iu */}
          <div
            className="w-[430px] text-center -mt-2.5"
            style={{
              fontFamily: "'MorginaItalic', cursive",
              fontSize: "40.47px",
              lineHeight: 1.6,
              color: "rgb(155, 52, 61)",
            }}
          >
            {recipient}
          </div>

          {/* HEADLINE277: đến tham dự lễ tốt nghiệp của tân cử nhân */}
          <div
            className="w-[331px] text-center -mt-1.5"
            style={{
              fontFamily: "'Hastegi', sans-serif",
              fontSize: "22.59px",
              lineHeight: 1.6,
              color: "rgb(155, 52, 61)",
            }}
          >
            đến tham dự lễ tốt nghiệp của tân cử nhân
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* NAME OVERLAY: ĐẶNG (Hastegi) + Mai Trang (UVNHoaTay Thư pháp) */}
        {/* ------------------------------------------------------------- */}
        {/* HEADLINE348: ĐẶNG */}
        <div
          className="absolute top-[182px] left-[81px] w-[248px] text-left z-10"
          style={{
            fontFamily: "'Hastegi', sans-serif",
            fontSize: "24.65px",
            lineHeight: 1.6,
            color: "rgb(155, 52, 61)",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
          }}
        >
          ĐẶNG
        </div>

        {/* HEADLINE347: Mai Trang (Lớn uốn lượn tràn qua ĐẶNG) */}
        <div
          className="absolute top-[186px] left-[25px] w-[360px] text-center z-20 pointer-events-none"
          style={{
            fontFamily: "'UVNHoaTay', cursive",
            fontSize: "62px",
            lineHeight: 1.2,
            color: "rgb(155, 52, 61)",
          }}
        >
          {graduateName}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* DECORATIVE STICKERS: Trái tim lớn & Mũ cử nhân                */}
        {/* ------------------------------------------------------------- */}
        {/* IMAGE261: Trái tim nét vẽ hồng to phía sau */}
        <div className="absolute top-[282px] left-[92.5px] w-[151.6px] h-[141px] pointer-events-none z-0 transform rotate-[16deg] opacity-80">
          <Image
            src="https://w.ladicdn.com/s550x550/69b247cf4f6ddc0012f0ce55/elements-thiep-18-20260723043335-ueahl.png"
            alt="Pink Heart Doodle"
            fill
            className="object-contain"
          />
        </div>

        {/* IMAGE234: Mũ cử nhân nét vẽ chì hồng */}
        <div className="absolute top-[300px] left-[296px] w-[70.8px] h-[52.5px] pointer-events-none z-10">
          <Image
            src="https://w.ladicdn.com/s550x550/69b247cf4f6ddc0012f0ce55/elements-thiep-17-20260723043335-d3sit.png"
            alt="Pink Graduation Cap Doodle"
            fill
            className="object-contain"
          />
        </div>

        {/* ------------------------------------------------------------- */}
        {/* LEFT COLUMN: FILM STRIP 4 ẢNH DỌC (GROUP180)                  */}
        {/* ------------------------------------------------------------- */}
        <div
          className="absolute top-[308px] left-[19px] w-[146px] h-[348px] z-10"
          style={{
            transform: "rotate(-5deg)",
            transformOrigin: "top left",
          }}
        >
          {/* Khung nền đỏ Burgundy: BOX74 */}
          <div className="w-[138.7px] h-[348px] bg-[#8F323B] p-[6px] flex flex-col justify-between shadow-2xl rounded-[1px]">
            {filmPhotos.map((url, idx) => (
              <div
                key={idx}
                className="relative w-full h-[66.3px] bg-[#f8f5f5] overflow-hidden"
              >
                <Image
                  src={url}
                  alt={`Graduation Moment ${idx + 1}`}
                  fill
                  sizes="140px"
                  className="object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>

        {/* IMAGE230: Chiếc Nơ Hồng Rủ Dài Đung Đưa */}
        <div
          id="ruybang"
          className="absolute top-[560px] left-[136px] w-[113.6px] h-[150px] pointer-events-none z-30 animate-sway"
        >
          <Image
            src="https://w.ladicdn.com/s550x550/69b247cf4f6ddc0012f0ce55/elements-thiep-15-20260723042342-eu6mv.png"
            alt="Pink Ribbon Bow"
            fill
            className="object-contain drop-shadow-md"
          />
        </div>

        {/* ------------------------------------------------------------- */}
        {/* RIGHT COLUMN: THẺ LỊCH THÁNG 9 (GROUP205)                     */}
        {/* ------------------------------------------------------------- */}
        <div className="absolute top-[362.5px] left-[88.5px] w-[331.5px] h-[225px] z-10">
          {/* IMAGE227: Nền giấy xé hồng viền deckled edges */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <Image
              src="https://w.ladicdn.com/s800x800/69b247cf4f6ddc0012f0ce55/elements-thiep-13-20260723040541-8nxzz.png"
              alt="Calendar Paper Background"
              fill
              className="object-fill"
            />
          </div>

          {/* HEADLINE287: Tháng 9 */}
          <div
            className="absolute top-[20.8px] left-[155.8px] w-[88px] text-center z-10"
            style={{
              fontFamily: "'UVNHoaTay', cursive",
              fontSize: "28.26px",
              lineHeight: 1.6,
              color: "rgb(155, 52, 61)",
            }}
          >
            Tháng 9
          </div>

          {/* GROUP182: Days Header (MON - SUN) */}
          <div
            className="absolute top-[70.8px] left-[89px] w-[215px] grid grid-cols-7 text-center z-10 font-bold"
            style={{
              fontFamily: "'Hastegi', sans-serif",
              fontSize: "11px",
              color: "rgb(155, 52, 61)",
            }}
          >
            <div>MON</div>
            <div>TUE</div>
            <div>WED</div>
            <div>THU</div>
            <div>FRI</div>
            <div>SAT</div>
            <div>SUN</div>
          </div>

          {/* Calendar Dates Grid (Hastegi, color rgb(155, 52, 61)) */}
          <div
            className="absolute top-[96px] left-[89px] w-[215px] z-10"
            style={{
              fontFamily: "'Hastegi', sans-serif",
              fontSize: "12.5px",
              color: "rgb(155, 52, 61)",
              lineHeight: "22px",
            }}
          >
            {/* Week 1: Empty MON, 1 -> 6 */}
            <div className="grid grid-cols-7 text-center">
              <div />
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
              <div>6</div>
            </div>

            {/* Week 2: 7 -> 13 */}
            <div className="grid grid-cols-7 text-center">
              <div>7</div>
              <div>8</div>
              <div>9</div>
              <div>10</div>
              <div>11</div>
              <div>12</div>
              <div>13</div>
            </div>

            {/* Week 3: 14 -> 20 */}
            <div className="grid grid-cols-7 text-center">
              <div>14</div>
              <div>15</div>
              <div>16</div>
              <div>17</div>
              <div>18</div>
              <div>19</div>
              <div>20</div>
            </div>

            {/* Week 4: 21 -> 27 (26 with heart outline) */}
            <div className="grid grid-cols-7 text-center items-center">
              <div>21</div>
              <div>22</div>
              <div>23</div>
              <div>24</div>
              <div>25</div>
              <div className="relative font-extrabold flex items-center justify-center">
                <span>26</span>
              </div>
              <div>27</div>
            </div>

            {/* Week 5: 28 -> 30 */}
            <div className="grid grid-cols-7 text-center">
              <div>28</div>
              <div>29</div>
              <div>30</div>
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>

          {/* SHAPE1: Trái tim nét vẽ khoanh tròn ngày 26 */}
          <div className="absolute top-[160px] left-[242px] w-[32.4px] h-[32.4px] pointer-events-none z-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="100%"
              viewBox="0 -960 960 960"
              width="100%"
              fill="rgba(155, 52, 61, 1)"
            >
              <path d="m480-121-41-37q-105.77-97.12-174.88-167.56Q195-396 154-451.5T96.5-552Q80-597 80-643q0-90.15 60.5-150.58Q201-854 290-854q57 0 105.5 27t84.5 78q42-54 89-79.5T670-854q89 0 149.5 60.42Q880-733.15 880-643q0 46-16.5 91T806-451.5Q765-396 695.88-325.56 626.77-255.12 521-158l-41 37Zm0-79q101.24-93 166.62-159.5Q712-426 750.5-476t54-89.14q15.5-39.13 15.5-77.72 0-66.14-42-108.64T670.22-794q-51.52 0-95.37 31.5T504-674h-49q-26-56-69.85-88-43.85-32-95.37-32Q224-794 182-751.5t-42 108.82q0 38.68 15.5 78.18 15.5 39.5 54 90T314-358q66 66 166 158Zm0-297Z" />
            </svg>
          </div>
        </div>

        {/* IMAGE231: Con Dấu Sáp Đỏ Nơ Góc Trên Phải Lịch */}
        <div className="absolute top-[357px] left-[358.9px] w-[61.1px] h-[57.1px] pointer-events-none z-20">
          <Image
            src="https://w.ladicdn.com/s450x450/69b247cf4f6ddc0012f0ce55/elements-thiep-16-20260723042420-yfzqc.png"
            alt="Wax Seal Bow Stamp"
            fill
            className="object-contain drop-shadow-sm"
          />
        </div>

        {/* IMAGE236: Ngôi Sao Lấp Lánh Góc Dưới Phải */}
        <div className="absolute top-[644.5px] left-[264.5px] w-[59px] h-[59px] pointer-events-none z-10">
          <Image
            src="https://w.ladicdn.com/s400x400/69b247cf4f6ddc0012f0ce55/elements-thiep-20-20260723043335-lpzap.png"
            alt="Sparkle Bottom Right"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 20: Full Bleed Photo (Exact 420px x 634.8px LadiPage)             */}
      {/* ========================================================================= */}
      <div className="w-[420px] h-[634.8px] relative bg-slate-100 overflow-hidden">
        <Image
          src={heroMainPhoto}
          alt={graduateName}
          fill
          priority
          sizes="420px"
          className="object-cover object-top"
        />

        {/* HEADLINE350: One journey ends, another begins in font Ralsihten */}
        <div
          className="absolute top-[62px] left-[47px] w-[464px] text-center pointer-events-none z-10"
          style={{
            fontFamily: "'Ralsihten', cursive, serif",
            fontSize: "65px",
            lineHeight: 1.2,
            color: "rgb(255, 255, 255)",
            textShadow: "0 2px 8px rgba(0,0,0,0.8)",
          }}
        >
          <div>One journey ends,</div>
          <div className="-mt-3">another begins</div>
        </div>
      </div>
    </div>
  );
}
