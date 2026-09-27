interface GraduationHeroProps {
  firstName: string;
  lastName: string;
  recipient: string;
  monthText?: string;
  eventDate?: string;
}

const COL_X = [0, 33.4, 63, 99.2, 131.5, 166.1, 198.4];
const ROW_Y = [97.8, 117.8, 138.4, 159.4, 180.3, 201];

export function GraduationHero({
  firstName,
  lastName,
  recipient,
  monthText,
  eventDate,
}: GraduationHeroProps) {
  const getCalendarData = () => {
    let d = new Date(2026, 8, 26);
    if (eventDate) {
      if (typeof eventDate === "string") {
        if (eventDate.includes("-")) {
          const parts = eventDate.split("T")[0].split("-");
          if (parts.length === 3) {
            const y = parseInt(parts[0], 10);
            const m = parseInt(parts[1], 10) - 1;
            const day = parseInt(parts[2], 10);
            if (!isNaN(y) && !isNaN(m) && !isNaN(day)) {
              d = new Date(y, m, day);
            }
          }
        } else if (eventDate.includes("/")) {
          const parts = eventDate.split("/");
          if (parts.length === 3) {
            const day = parseInt(parts[0], 10);
            const m = parseInt(parts[1], 10) - 1;
            const y = parseInt(parts[2], 10);
            if (!isNaN(y) && !isNaN(m) && !isNaN(day)) {
              d = new Date(y, m, day);
            }
          }
        }
      } else {
        const parsed = new Date(eventDate);
        if (!isNaN(parsed.getTime())) {
          d = parsed;
        }
      }
    }
    const year = d.getFullYear();
    const month = d.getMonth();
    const selectedDay = d.getDate();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const firstDayDow = (new Date(year, month, 1).getDay() + 6) % 7; // 0 = Mon, 6 = Sun

    const days: Array<{ day: number; col: number; row: number; x: number; y: number }> = [];
    let heartPos = { left: 250.5, top: 151.6 };

    for (let day = 1; day <= totalDays; day++) {
      const slot = firstDayDow + (day - 1);
      const col = slot % 7;
      const row = Math.floor(slot / 7);
      const x = COL_X[col];
      const y = ROW_Y[row] !== undefined ? ROW_Y[row] : (ROW_Y[ROW_Y.length - 1] + (row - (ROW_Y.length - 1)) * 20);

      days.push({ day, col, row, x, y });

      if (day === selectedDay) {
        heartPos = {
          left: x + 89.05 - 4.5,
          top: y - 6.5,
        };
      }
    }

    const calculatedMonthText = monthText || `Tháng ${month + 1}`;

    return { days, heartPos, selectedDay, calculatedMonthText };
  };

  const { days, heartPos, selectedDay, calculatedMonthText } = getCalendarData();

  return (
    <div id="SECTION5" className="ladi-section" suppressHydrationWarning>
      <div className="ladi-section-background"></div>
      <div className="ladi-container">
        <div id="BOX28" className="ladi-element"><div className="ladi-box"></div></div>
        
        {/* Mũ cử nhân nét vẽ */}
        <div id="IMAGE234" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>
        
        {/* Trái tim nét vẽ to */}
        <div id="IMAGE261" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>
        
        {/* Ngôi sao lấp lánh trên trái */}
        <div id="IMAGE264" className="ladi-element animate-sparkle-glow"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>

        {/* Nhóm Thẻ Lịch Tháng */}
        <div id="GROUP205" className="ladi-element">
          <div className="ladi-group">
            <div id="GROUP188" className="ladi-element">
              <div className="ladi-group">
                <div id="IMAGE227" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>
                <div id="HEADLINE287" className="ladi-element"><h3 className="ladi-headline">{calculatedMonthText}</h3></div>
                <div id="GROUP182" className="ladi-element">
                  <div className="ladi-group">
                    <div id="HEADLINE33" className="ladi-element"><h3 className="ladi-headline">MON</h3></div>
                    <div id="HEADLINE34" className="ladi-element"><h3 className="ladi-headline">TUE</h3></div>
                    <div id="HEADLINE35" className="ladi-element"><h3 className="ladi-headline">WED</h3></div>
                    <div id="HEADLINE36" className="ladi-element"><h3 className="ladi-headline">THU</h3></div>
                    <div id="HEADLINE37" className="ladi-element"><h3 className="ladi-headline">FRI</h3></div>
                    <div id="HEADLINE38" className="ladi-element"><h3 className="ladi-headline">SAT</h3></div>
                    <div id="HEADLINE39" className="ladi-element"><h3 className="ladi-headline">SUN</h3></div>
                  </div>
                </div>

                {/* Các ngày trong tháng được render tự động */}
                {days.map((item) => (
                  <div
                    key={item.day}
                    className="ladi-element"
                    style={{
                      position: "absolute",
                      width: "23px",
                      top: `${item.y}px`,
                      left: `${item.x + 89.05}px`,
                      zIndex: 3,
                    }}
                  >
                    <h3
                      className="ladi-headline"
                      style={{
                        fontFamily: "'Hastegi', sans-serif",
                        fontSize: "12px",
                        fontWeight: item.day === selectedDay ? "bold" : "normal",
                        lineHeight: 1.6,
                        color: "rgb(155, 52, 61)",
                        textAlign: "center",
                      }}
                    >
                      {item.day}
                    </h3>
                  </div>
                ))}
              </div>
            </div>

            {/* Trái tim khoanh đúng ngày được chọn */}
            <div
              id="SHAPE1"
              className="ladi-element animate-calendar-heart"
              style={{
                position: "absolute",
                width: "32.4px",
                height: "32.4px",
                left: `${heartPos.left}px`,
                top: `${heartPos.top}px`,
                zIndex: 4,
                pointerEvents: "none",
                transition: "all 0.3s ease",
              }}
            >
              <div className="ladi-shape">
                <svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%" fill="rgba(155, 52, 61, 1)">
                  <path d="m480-121-41-37q-105.77-97.12-174.88-167.56Q195-396 154-451.5T96.5-552Q80-597 80-643q0-90.15 60.5-150.58Q201-854 290-854q57 0 105.5 27t84.5 78q42-54 89-79.5T670-854q89 0 149.5 60.42Q880-733.15 880-643q0 46-16.5 91T806-451.5Q765-396 695.88-325.56 626.77-255.12 521-158l-41 37Zm0-79q101.24-93 166.62-159.5Q712-426 750.5-476t54-89.14q15.5-39.13 15.5-77.72 0-66.14-42-108.64T670.22-794q-51.52 0-95.37 31.5T504-674h-49q-26-56-69.85-88-43.85-32-95.37-32Q224-794 182-751.5t-42 108.82q0 38.68 15.5 78.18 15.5 39.5 54 90T314-358q66 66 166 158Zm0-297Z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Tên Tân Cử Nhân: ĐẶNG + Mai Trang (Chạy từ DƯỚI lên) */}
        <div id="HEADLINE347" className="ladi-element anim-from-bottom"><h3 className="ladi-headline">{firstName}</h3></div>
        <div id="HEADLINE348" className="ladi-element anim-from-bottom"><h3 className="ladi-headline">{lastName}</h3></div>

        {/* Tiêu đề mời với hiệu ứng xuất hiện từng chữ theo hướng */}
        <div id="GROUP203" className="ladi-element">
          <div className="ladi-group">
            {/* 1. "Thân mời" - Chạy từ TRÊN xuống */}
            <div id="HEADLINE345" className="ladi-element anim-from-top"><h3 className="ladi-headline">Thân mời</h3></div>
            {/* 2. "Cả nhà iu" / Tên người nhận - Chạy từ TRÁI sang */}
            <div id="HEADLINE276" className="ladi-element anim-from-left"><h3 className="ladi-headline">{recipient}</h3></div>
            {/* 3. "đến tham dự..." - Chạy từ PHẢI sang */}
            <div id="HEADLINE277" className="ladi-element anim-from-right"><h3 className="ladi-headline">đến tham dự lễ tốt nghiệp của tân cử nhân</h3></div>
          </div>
        </div>

        {/* Mây góc */}
        <div id="IMAGE268" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>
        <div id="IMAGE236" className="ladi-element animate-sparkle-glow"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>
        <div id="IMAGE269" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>
        
        {/* Con dấu sáp đỏ */}
        <div id="IMAGE231" className="ladi-element animate-float-breathe"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>

        {/* Film Strip 4 ảnh */}
        <div id="GROUP180" className="ladi-element filmstrip-interactive">
          <div className="ladi-group">
            <div id="BOX74" className="ladi-element"><div className="ladi-box"></div></div>
            <div id="BOX75" className="ladi-element"><div className="ladi-box"></div></div>
            <div id="BOX76" className="ladi-element"><div className="ladi-box"></div></div>
            <div id="BOX77" className="ladi-element"><div className="ladi-box"></div></div>
            <div id="BOX78" className="ladi-element"><div className="ladi-box"></div></div>
          </div>
        </div>

        {/* Nơ ruy băng hồng */}
        <div id="IMAGE230" className="ladi-element animate-float-breathe"><div id="ruybang" className="ladi-image"><div className="ladi-image-background"></div></div></div>
        <div id="IMAGE270" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>
      </div>
    </div>
  );
}
