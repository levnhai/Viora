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
                        <span>Một hành trình đã khép lại bằng những ngày tháng đáng nhớ, từ những buổi học đầu tiên, những lần loay hoay với bài vở, đến những ngày đếm ngược từng khoảnh khắc để chạm tay vào ngày tốt nghiệp. Nhìn lại mới thấy, mình đã đi qua một quãng đường thật dài, có những lúc mệt mỏi, có những lần muốn dừng lại, nhưng cuối cùng vẫn cố gắng để bước tiếp đến hôm nay</span>
                        <br /><br />
                        <span>Và trên hành trình ấy, thật may mắn vì chưa bao giờ phải đi một mình. Cảm ơn gia đình vì luôn là nơi để trở về, cảm ơn thầy cô vì những bài học và sự tận tâm trong suốt những năm tháng qua, cảm ơn bạn bè vì đã cùng nhau tạo nên những ngày tháng tuổi trẻ thật đáng nhớ. Tấm bằng tốt nghiệp hôm nay không chỉ là kết quả của những năm học, mà còn là dấu mốc để bắt đầu một hành trình mới — nơi mỗi người sẽ có một con đường riêng, những lựa chọn riêng và những ước mơ riêng để theo đuổi.</span>
                        <br /><br />
                        <span>Chúc cho tất cả chúng ta, dù sau này đi đâu và trở thành ai, vẫn luôn nhớ về những năm tháng này bằng một nụ cười.</span>
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

        <div id="IMAGE273" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>
        <div id="IMAGE274" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>
      </div>
    </div>
  );
}
