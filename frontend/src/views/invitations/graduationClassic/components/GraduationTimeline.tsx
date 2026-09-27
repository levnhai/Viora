import { getDirectionsMapUrl } from "@/shared/lib/utils/string";

interface GraduationTimelineProps {
  locationName?: string;
  address?: string;
  mapUrl?: string;
  timeStr?: string;
  day?: string;
  month?: string;
  year?: string;
}

export function GraduationTimeline({
  locationName = "học viện báo chí và tuyên truyền",
  address = "36 Xuân Thủy, Cầu Giấy, Hà Nội",
  mapUrl = "https://maps.google.com/?q=Học+viện+Báo+chí+và+Tuyên+truyền+36+Xuân+Thủy+Cầu+Giấy+Hà+Nội",
  timeStr = "11:00, chủ nhật",
  day = "26",
  month = "tháng 7",
  year = "năm 2026",
}: GraduationTimelineProps) {
  const directionsLink = getDirectionsMapUrl(mapUrl, address, locationName);

  return (
    <div id="SECTION23" className="ladi-section" suppressHydrationWarning>
      <div className="ladi-section-background"></div>
      <div className="ladi-container">
        <div id="BOX79" className="ladi-element"><div className="ladi-box"></div></div>
        <div id="IMAGE239" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>
        <div id="IMAGE246" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>
        <div id="IMAGE271" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>
        <div id="IMAGE240" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>

        {/* Cặp ảnh tem vintage */}
        <div id="GROUP190" className="ladi-element">
          <div className="ladi-group">
            <div id="IMAGE237" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>
            <div id="BOX80" className="ladi-element"><div className="ladi-box"></div></div>
          </div>
        </div>
        <div id="GROUP191" className="ladi-element">
          <div className="ladi-group">
            <div id="IMAGE238" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>
            <div id="BOX81" className="ladi-element"><div className="ladi-box"></div></div>
          </div>
        </div>
        <div id="IMAGE272" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>

        {/* Thông tin sự kiện */}
        <div id="GROUP161" className="ladi-element">
          <div className="ladi-group">
            <div id="HEADLINE279" className="ladi-element"><h3 className="ladi-headline">Tổ chức tại</h3></div>
            <div id="HEADLINE280" className="ladi-element"><h3 className="ladi-headline">{locationName}</h3></div>
            <div id="HEADLINE281" className="ladi-element"><h3 className="ladi-headline">{address}</h3></div>
            <a
              href={directionsLink}
              target="_blank"
              rel="noopener noreferrer"
              id="GROUP162"
              className="ladi-element"
            >
              <div className="ladi-group">
                <div id="IMAGE206" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>
                <div id="HEADLINE282" className="ladi-element"><h3 className="ladi-headline">Chỉ đường</h3></div>
              </div>
            </a>
            <div id="HEADLINE283" className="ladi-element">
              <h3 className="ladi-headline">
                <span>Lễ tốt nghiệp được tổ chức</span>
                <br />
                <span>vào </span>
                <span style={{ fontWeight: "bold" }}>{timeStr}</span>
              </h3>
            </div>
            <div id="GROUP163" className="ladi-element">
              <div className="ladi-group">
                <div id="GROUP164" className="ladi-element">
                  <div className="ladi-group">
                    <div id="LINE34" className="ladi-element"><div className="ladi-line"><div className="ladi-line-container"></div></div></div>
                    <div id="LINE35" className="ladi-element"><div className="ladi-line"><div className="ladi-line-container"></div></div></div>
                    <div id="HEADLINE284" className="ladi-element"><h3 className="ladi-headline">{month}</h3></div>
                  </div>
                </div>
                <div id="GROUP165" className="ladi-element">
                  <div className="ladi-group">
                    <div id="LINE36" className="ladi-element"><div className="ladi-line"><div className="ladi-line-container"></div></div></div>
                    <div id="LINE37" className="ladi-element"><div className="ladi-line"><div className="ladi-line-container"></div></div></div>
                    <div id="HEADLINE285" className="ladi-element"><h3 className="ladi-headline">{year}</h3></div>
                  </div>
                </div>
                <div id="HEADLINE286" className="ladi-element"><h3 className="ladi-headline">{day}</h3></div>
              </div>
            </div>
          </div>
        </div>
        <div id="IMAGE278" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>
      </div>
    </div>
  );
}
