interface GraduateStoryProps {
  graduateName: string;
  storyContent?: string;
}

export function GraduateStory({ graduateName, storyContent }: GraduateStoryProps) {
  return (
    <div id="SECTION13" className="ladi-section" suppressHydrationWarning>
      <div className="ladi-section-background"></div>
      <div className="ladi-container">
        <div id="BOX31" className="ladi-element"><div className="ladi-box"></div></div>
        <div id="HEADLINE278" className="ladi-element"><h3 className="ladi-headline">My story</h3></div>
        <div id="IMAGE273" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>
        <div id="IMAGE274" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>

        {/* Thẻ thư giấy vintage */}
        <div id="GROUP176" className="ladi-element">
          <div className="ladi-group">
            <div id="IMAGE216" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>
            <div id="GROUP206" className="ladi-element">
              <div className="ladi-group">
                <div id="HEADLINE292" className="ladi-element">
                  <h3 className="ladi-headline">
                    {storyContent ? (
                      storyContent.split("\n").map((line, idx) => (
                        <span key={idx}>
                          {line}
                          <br />
                        </span>
                      ))
                    ) : (
                      <>
                        <span>Một hành trình đã khép lại bằng những ngày tháng đáng nhớ, từ những bỡ ngỡ ban đầu đến lúc trưởng thành hơn sau từng bài học, thử thách và trải nghiệm.</span>
                        <br /><br />
                        <span>Có những ngày mệt mỏi, có cả những lần muốn dừng bước, nhưng nhờ sự đồng hành của gia đình, thầy cô và bạn bè, mình đã đi đến cột mốc hôm nay. Tấm bằng tốt nghiệp không chỉ là kết quả của những năm tháng nỗ lực, mà còn là dấu mốc mở ra một hành trình mới với nhiều ước mơ và cơ hội đang chờ phía trước.</span>
                      </>
                    )}
                  </h3>
                </div>
                <div id="HEADLINE293" className="ladi-element"><h3 className="ladi-headline">{graduateName}</h3></div>
                <div id="IMAGE220" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>
              </div>
            </div>
          </div>
        </div>

        {/* Polaroid kẹp nghiêng */}
        <div id="GROUP171" className="ladi-element">
          <div className="ladi-group">
            <div id="IMAGE218" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>
            <div id="BOX63" className="ladi-element"><div className="ladi-box"></div></div>
          </div>
        </div>
        <div id="IMAGE217" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>
      </div>
    </div>
  );
}
