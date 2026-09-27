interface GraduationFooterProps {
  footerImage?: string;
}

export function GraduationFooter({ footerImage }: GraduationFooterProps) {
  return (
    <div
      id="SECTION12"
      className="ladi-section"
      suppressHydrationWarning
      style={{
        paddingBottom: "50px",
        marginBottom: "30px",
      }}
    >
      <div className="ladi-section-background"></div>
      <div className="ladi-container">
        <div id="BOX26" className="ladi-element">
          <div
            className="ladi-box"
            style={footerImage ? { backgroundImage: `url(${footerImage})` } : undefined}
          ></div>
        </div>
        <div id="HEADLINE92" className="ladi-element">
          <h3 className="ladi-headline">
            <br />
            <span>Sự hiện diện của bạn chính là món quà ý nghĩa nhất,</span>
            <br />
            <span>và mình vô cùng trân quý trong ngày vui này.</span>
          </h3>
        </div>
        <div id="HEADLINE94" className="ladi-element"><h3 className="ladi-headline">Thank you!</h3></div>
      </div>
    </div>
  );
}
