import { useState } from "react";

interface GraduationGalleryProps {
  galleryImages: string[];
  graduateName: string;
}

export function GraduationGallery({
  galleryImages,
  graduateName,
}: GraduationGalleryProps) {
  const [currentIdx, setCurrentIdx] = useState(0);

  const images = galleryImages.length > 0 ? galleryImages : [
    "https://w.ladicdn.com/s650x700/69b247cf4f6ddc0012f0ce55/1784774421170_3379540865962086579_g2668429489759155549_987364ad977145acecd0b9ccee916950-20260723163343-c0hna.jpg",
  ];

  return (
    <div id="SECTION24" className="ladi-section">
      <div className="ladi-section-background"></div>
      <div className="ladi-container">
        <div id="BOX86" className="ladi-element"><div className="ladi-box"></div></div>
        
        {/* Gallery Slider */}
        <div id="GROUP202" className="ladi-element">
          <div className="ladi-group">
            <div id="IMAGE259" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>
            <div id="GALLERY4" className="ladi-element">
              <div className="ladi-gallery ladi-gallery-bottom">
                <div className="ladi-gallery-view" style={{ cursor: "pointer" }}>
                  <div
                    className="ladi-gallery-view-arrow ladi-gallery-view-arrow-left"
                    onClick={() => setCurrentIdx((p) => (p === 0 ? images.length - 1 : p - 1))}
                  ></div>
                  <div
                    className="ladi-gallery-view-arrow ladi-gallery-view-arrow-right"
                    onClick={() => setCurrentIdx((p) => (p === images.length - 1 ? 0 : p + 1))}
                  ></div>
                  <div
                    className="ladi-gallery-view-item selected"
                    style={{
                      backgroundImage: `url("${images[currentIdx]}")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="IMAGE260" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>
        <div id="IMAGE275" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>
        <div id="HEADLINE351" className="ladi-element"><h3 className="ladi-headline">{graduateName} PR41</h3></div>
        <div id="IMAGE276" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>
        <div id="IMAGE277" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>
        <div id="HEADLINE344" className="ladi-element"><h3 className="ladi-headline">of granduate</h3></div>
        <div id="HEADLINE343" className="ladi-element"><h3 className="ladi-headline">ALBUM</h3></div>
      </div>
    </div>
  );
}
