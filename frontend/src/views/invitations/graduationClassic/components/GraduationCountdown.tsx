import { useState, useEffect } from "react";

interface GraduationCountdownProps {
  weddingDate?: string;
  weddingTime?: string;
}

function parseTargetTimestamp(dateStr?: string, timeStr?: string): number {
  const defaultTs = new Date(2026, 8, 26, 9, 0, 0).getTime();
  if (!dateStr || !dateStr.trim()) return defaultTs;

  let cleanDate = dateStr.trim();
  if (cleanDate.includes("T")) {
    cleanDate = cleanDate.split("T")[0];
  }

  let hours = 9;
  let minutes = 0;

  if (timeStr && timeStr.trim()) {
    const tStr = timeStr.trim();
    const isPM = /pm/i.test(tStr);
    const isAM = /am/i.test(tStr);
    const match = tStr.match(/(\d{1,2}):(\d{2})/);
    if (match) {
      let h = parseInt(match[1], 10);
      minutes = parseInt(match[2], 10);
      if (isPM && h < 12) h += 12;
      if (isAM && h === 12) h = 0;
      hours = h;
    }
  }

  let year = 2026;
  let month = 9;
  let day = 26;

  if (cleanDate.includes("-")) {
    const parts = cleanDate.split("-").map((p) => parseInt(p, 10));
    if (parts.length === 3 && !parts.some(isNaN)) {
      if (parts[0] > 1000) {
        year = parts[0];
        month = parts[1];
        day = parts[2];
      } else {
        month = parts[0];
        day = parts[1];
        year = parts[2];
      }
    }
  } else if (cleanDate.includes("/")) {
    const parts = cleanDate.split("/").map((p) => parseInt(p, 10));
    if (parts.length === 3 && !parts.some(isNaN)) {
      if (parts[2] > 1000) {
        day = parts[0];
        month = parts[1];
        year = parts[2];
      } else if (parts[0] > 1000) {
        year = parts[0];
        month = parts[1];
        day = parts[2];
      }
    }
  }

  const d = new Date(year, month - 1, day, hours, minutes, 0);
  const ts = d.getTime();
  return isNaN(ts) ? defaultTs : ts;
}

export function GraduationCountdown({
  weddingDate = "2026-07-26",
  weddingTime = "09:00",
}: GraduationCountdownProps) {
  const [countdown, setCountdown] = useState({
    days: "16",
    hours: "23",
    minutes: "14",
    seconds: "48",
  });

  useEffect(() => {
    const target = parseTargetTimestamp(weddingDate, weddingTime);

    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff > 0) {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);
        setCountdown({
          days: isNaN(d) ? "00" : String(d).padStart(2, "0"),
          hours: isNaN(h) ? "00" : String(h).padStart(2, "0"),
          minutes: isNaN(m) ? "00" : String(m).padStart(2, "0"),
          seconds: isNaN(s) ? "00" : String(s).padStart(2, "0"),
        });
      } else {
        setCountdown({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [weddingDate, weddingTime]);

  return (
    <div id="SECTION15" className="ladi-section" suppressHydrationWarning>
      <div className="ladi-section-background"></div>
      <div className="ladi-container">
        <div id="IMAGE94" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>
        
        {/* Polaroid ảnh */}
        <div id="GROUP192" className="ladi-element">
          <div className="ladi-group">
            <div id="BOX82" className="ladi-element"><div className="ladi-box"></div></div>
            <div id="BOX83" className="ladi-element"><div className="ladi-box"></div></div>
          </div>
        </div>

        {/* Thẻ Lịch trình */}
        <div id="GROUP196" className="ladi-element">
          <div className="ladi-group">
            <div id="BOX84" className="ladi-element"><div className="ladi-box"></div></div>
            <div id="GROUP195" className="ladi-element">
              <div className="ladi-group">
                <div id="LINE14" className="ladi-element"><div className="ladi-line"><div className="ladi-line-container"></div></div></div>
                <div id="HEADLINE115" className="ladi-element"><h3 className="ladi-headline">Lịch trình</h3></div>
                <div id="GROUP116" className="ladi-element">
                  <div className="ladi-group">
                    <div id="BOX41" className="ladi-element"><div className="ladi-box"></div></div>
                    <div id="IMAGE126" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>
                    <div id="GROUP115" className="ladi-element">
                      <div className="ladi-group">
                        <div id="HEADLINE220" className="ladi-element"><h3 className="ladi-headline">08:00</h3></div>
                        <div id="HEADLINE221" className="ladi-element"><h3 className="ladi-headline">Làm lễ tốt nghiệp</h3></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="GROUP118" className="ladi-element">
                  <div className="ladi-group">
                    <div id="IMAGE131" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>
                    <div id="BOX43" className="ladi-element"><div className="ladi-box"></div></div>
                    <div id="GROUP117" className="ladi-element">
                      <div className="ladi-group">
                        <div id="HEADLINE222" className="ladi-element"><h3 className="ladi-headline">08:30</h3></div>
                        <div id="HEADLINE223" className="ladi-element"><h3 className="ladi-headline">Chụp ảnh kỷ niệm</h3></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Khối Countdown */}
        <div id="BOX88" className="ladi-element"><div className="ladi-box"></div></div>
        <div id="GROUP169" className="ladi-element">
          <div className="ladi-group">
            <div id="HEADLINE288" className="ladi-element"><h3 className="ladi-headline">COUNTDOWN</h3></div>
            <div id="GROUP170" className="ladi-element">
              <div className="ladi-group">
                <div id="COUNTDOWN5" className="ladi-element">
                  <div className="ladi-countdown" suppressHydrationWarning>
                    <div id="COUNTDOWN_ITEM17" className="ladi-element"><div className="ladi-countdown-background"></div><div className="ladi-countdown-text"><span>{countdown.days}</span></div></div>
                    <div id="COUNTDOWN_ITEM18" className="ladi-element"><div className="ladi-countdown-background"></div><div className="ladi-countdown-text"><span>{countdown.hours}</span></div></div>
                    <div id="COUNTDOWN_ITEM19" className="ladi-element"><div className="ladi-countdown-background"></div><div className="ladi-countdown-text"><span>{countdown.minutes}</span></div></div>
                    <div id="COUNTDOWN_ITEM20" className="ladi-element"><div className="ladi-countdown-background"></div><div className="ladi-countdown-text"><span>{countdown.seconds}</span></div></div>
                  </div>
                </div>
                <div id="HEADLINE289" className="ladi-element"><h3 className="ladi-headline">:</h3></div>
                <div id="HEADLINE290" className="ladi-element"><h3 className="ladi-headline">:</h3></div>
                <div id="HEADLINE291" className="ladi-element"><h3 className="ladi-headline">:</h3></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
