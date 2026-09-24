"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { WeddingData } from "@/entities/invitation/model/types";
import { useWeddingMusic, useGuestbook } from "@/shared/lib/hooks";

interface LiveViewProps {
  weddingData: WeddingData;
  guestName?: string;
}

export function LiveView({ weddingData, guestName }: LiveViewProps) {
  const [mounted, setMounted] = useState(false);
  const rawName = weddingData.brideName || weddingData.groomName || "Đặng Mai Trang";
  const graduateName = rawName;
  const getFormattedNames = (fullName: string) => {
    const trimmed = fullName.trim();
    const parts = trimmed.split(/\s+/);
    if (parts.length > 1) {
      const lastName = parts[0].toUpperCase();
      const firstName = parts.slice(1).join(" ");
      return { lastName, firstName };
    }
    return { lastName: "ĐẶNG", firstName: trimmed || "Mai Trang" };
  };
  const { lastName, firstName } = getFormattedNames(rawName);
  const recipient = guestName?.trim() || "Cả nhà iu";

  const musicSource =
    weddingData.musicUrl?.trim() ||
    "https://lamiwedding.io.vn/storage/music-1/a-little-dream-of-me-lyrics-video-cam-on-nguoi-da-thuc-cung-toi-ost-mp3cutnet.mp3";
  const { playing, togglePlay, autoPlayOnce, audioRef } = useWeddingMusic(musicSource);
  const { handleSendMessage } = useGuestbook(weddingData.slug);

  // Countdown logic
  const [countdown, setCountdown] = useState({ days: "16", hours: "23", minutes: "14", seconds: "48" });

  useEffect(() => {
    setMounted(true);
    const prevBodyBg = document.body.style.backgroundColor;
    const prevHtmlBg = document.documentElement.style.backgroundColor;
    document.body.style.backgroundColor = "#EEDDDD";
    document.documentElement.style.backgroundColor = "#EEDDDD";
    return () => {
      document.body.style.backgroundColor = prevBodyBg;
      document.documentElement.style.backgroundColor = prevHtmlBg;
    };
  }, []);

  useEffect(() => {
    const target = new Date("2026-07-26T09:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff > 0) {
        setCountdown({
          days: String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, "0"),
          hours: String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
          minutes: String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, "0"),
          seconds: String(Math.floor((diff / 1000) % 60)).padStart(2, "0"),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Gallery slider logic
  const galleryImages = weddingData.galleryImages?.length
    ? weddingData.galleryImages
    : [
        "https://w.ladicdn.com/s650x700/69b247cf4f6ddc0012f0ce55/1784774421170_3379540865962086579_g2668429489759155549_987364ad977145acecd0b9ccee916950-20260723163343-c0hna.jpg",
        "https://w.ladicdn.com/s650x700/69b247cf4f6ddc0012f0ce55/1784774421188_3379540865962086579_g2668429489759155549_fe35cc6df98c1db7d8bc02d16a94ec2b-20260723163344-wkfcw.jpg",
        "https://w.ladicdn.com/s650x700/69b247cf4f6ddc0012f0ce55/1784774421208_3379540865962086579_g2668429489759155549_a296b5a3fa8d575c9bb0d8e874836f32-20260723163435-0sug9.jpg",
        "https://w.ladicdn.com/s650x700/69b247cf4f6ddc0012f0ce55/1784774421263_3379540865962086579_g2668429489759155549_8ee5c45ee5a08ba393a4a2ec8db2f7ab-20260723163500-2ay81.jpg",
      ];
  const [currentGalleryIdx, setCurrentGalleryIdx] = useState(0);

  // RSVP Form logic
  const [rsvpName, setRsvpName] = useState(guestName || "");
  const [rsvpAttend, setRsvpAttend] = useState("Tôi chắc chắn sẽ đến");
  const [rsvpMsg, setRsvpMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmitRsvp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;
    setSubmitting(true);
    await handleSendMessage(rsvpName, `[Xác nhận: ${rsvpAttend}] ${rsvpMsg}`);
    setSubmitting(false);
    setShowPopup(true);
  };

  useEffect(() => {
    const handleFirstInteraction = () => {
      autoPlayOnce();
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true });
    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [autoPlayOnce]);

  if (!mounted) {
    return (
      <div className="w-full min-h-screen bg-[#F8F6F3] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#8F323B] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div
      className="w-full min-h-screen flex justify-center template-graduation-wrapper"
      style={{ backgroundColor: "#EEDDDD" }}
    >
      <div
        className="ladi-wraper template-graduation-14"
        style={{
          backgroundColor: "rgb(248, 246, 243)",
          boxShadow: "0 10px 45px rgba(143, 50, 59, 0.15)",
        }}
        suppressHydrationWarning
      >

      {/* Scoped CSS for Graduation Template */}
      <style id="ladipage-grad-styles">{`

.ladi-wraper {
  width: 100%;
  max-width: 420px;
  min-height: 100vh;
  margin: 0 auto;
  position: relative;
  background-color: #F8F6F3;
  box-shadow: 0 10px 45px rgba(143, 50, 59, 0.15);
  overflow-x: hidden;
  -webkit-text-size-adjust: 100%;
}
.ladi-section {
  width: 100%;
  position: relative;
  margin-left: auto;
  margin-right: auto;
}
.ladi-container {
  width: 420px;
  margin: 0 auto;
  position: relative;
  height: 100%;
}
.ladi-element {
  position: absolute;
}
.ladi-image {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.ladi-image-background {
  background-repeat: no-repeat;
  background-position: left top;
  background-size: cover;
  background-origin: content-box;
  position: absolute;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.ladi-box {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.ladi-group {
  position: absolute;
  width: 100%;
  height: 100%;
}
.ladi-headline {
  width: 100%;
  display: inline-block;
  background-size: cover;
  background-position: center center;
  word-break: break-word;
  margin: 0;
  padding: 0;
}
.ladi-shape {
  position: absolute;
  width: 100%;
  height: 100%;
}
.ladi-shape svg {
  width: 100%;
  height: 100%;
}
.ladi-button {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
}
.ladi-button-background {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}
.ladi-button-headline {
  position: absolute;
  width: 100%;
  display: table;
  height: 100%;
  text-align: center;
}
.ladi-button-headline p {
  display: table-cell;
  vertical-align: middle;
  margin: 0;
}
.ladi-form {
  position: absolute;
  width: 100%;
  height: 100%;
}
.ladi-form-item {
  position: absolute;
  width: 100%;
  height: 100%;
}
.ladi-form-control {
  background-color: transparent;
  width: 100%;
  height: 100%;
  padding: 0 12px;
  color: inherit;
  font-size: inherit;
  border: none;
  outline: none;
}
textarea.ladi-form-control {
  padding: 8px 12px;
  resize: none;
}
.ladi-line {
  position: absolute;
  width: 100%;
  height: 100%;
}
.ladi-line-container {
  border-top: 1px solid rgb(155, 52, 61);
  width: 100%;
  height: 0px;
}
.ladi-countdown {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
}
.ladi-countdown-text {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}



@font-face {
  font-family: 'Daytonica';
  src: url('/fonts/graduation/daytonica.ttf') format('truetype');
  font-display: swap;
}
@font-face {
  font-family: 'Hastegi';
  src: url('/fonts/graduation/hastegi.otf') format('opentype');
  font-display: swap;
}
@font-face {
  font-family: 'LoraCustom';
  src: url('/fonts/graduation/lora.ttf') format('truetype');
  font-display: swap;
}
@font-face {
  font-family: 'NVNErotique';
  src: url('/fonts/graduation/nvnerotique.ttf') format('truetype');
  font-display: swap;
}
@font-face {
  font-family: 'MorginaItalic';
  src: url('/fonts/graduation/morgina.ttf') format('truetype');
  font-display: swap;
}
@font-face {
  font-family: 'UVNHoaTay';
  src: url('/fonts/graduation/uvnhoatay.ttf') format('truetype'),
       url('/fonts/uvn-hoa-tay-1.ttf') format('truetype');
  font-display: swap;
}
@font-face {
  font-family: 'Ralsihten';
  src: url('/fonts/graduation/ralsihten.ttf') format('truetype');
  font-display: swap;
}
@font-face {
  font-family: 'Ecatherina';
  src: url('/fonts/graduation/ecatherina.otf') format('opentype');
  font-display: swap;
}
@font-face {
  font-family: 'Ergisa';
  src: url('/fonts/graduation/ergisa.otf') format('opentype');
  font-display: swap;
}

a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,button,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,input,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,select,small,span,strike,strong,sub,summary,sup,table,tbody,td,textarea,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;outline:0;font-size:100%;font:inherit;vertical-align:baseline;box-sizing:border-box;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}a{text-decoration:none}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:'';content:none}table{border-collapse:collapse;border-spacing:0}.ladi-loading{z-index:900000000000;position:fixed;width:100%;height:100%;top:0;left:0;background-color:rgba(0,0,0,.1)}.ladi-loading .loading{width:80px;height:80px;top:0;left:0;bottom:0;right:0;margin:auto;overflow:hidden;position:absolute}.ladi-loading .loading div{position:absolute;width:6px;height:6px;background:#fff;border-radius:50%;animation:ladi-loading 1.2s linear infinite}.ladi-loading .loading div:nth-child(1){animation-delay:0s;top:37px;left:66px}.ladi-loading .loading div:nth-child(2){animation-delay:-.1s;top:22px;left:62px}.ladi-loading .loading div:nth-child(3){animation-delay:-.2s;top:11px;left:52px}.ladi-loading .loading div:nth-child(4){animation-delay:-.3s;top:7px;left:37px}.ladi-loading .loading div:nth-child(5){animation-delay:-.4s;top:11px;left:22px}.ladi-loading .loading div:nth-child(6){animation-delay:-.5s;top:22px;left:11px}.ladi-loading .loading div:nth-child(7){animation-delay:-.6s;top:37px;left:7px}.ladi-loading .loading div:nth-child(8){animation-delay:-.7s;top:52px;left:11px}.ladi-loading .loading div:nth-child(9){animation-delay:-.8s;top:62px;left:22px}.ladi-loading .loading div:nth-child(10){animation-delay:-.9s;top:66px;left:37px}.ladi-loading .loading div:nth-child(11){animation-delay:-1s;top:62px;left:52px}.ladi-loading .loading div:nth-child(12){animation-delay:-1.1s;top:52px;left:62px}@keyframes ladi-loading{0%,100%,20%,80%{transform:scale(1)}50%{transform:scale(1.5)}}.ladipage-message{position:fixed;width:100%;height:100%;top:0;left:0;z-index:10000000000;background:rgba(0,0,0,.3)}.ladipage-message .ladipage-message-box{width:400px;max-width:calc(100% - 50px);height:160px;border:1px solid rgba(0,0,0,.3);background-color:#fff;position:fixed;top:calc(50% - 155px);left:0;right:0;margin:auto;border-radius:10px}.ladipage-message .ladipage-message-box span{display:block;background-color:rgba(6,21,40,.05);color:#000;padding:12px 15px;font-weight:600;font-size:16px;line-height:16px;border-top-left-radius:10px;border-top-right-radius:10px}.ladipage-message .ladipage-message-box .ladipage-message-text{display:-webkit-box;font-size:14px;padding:0 20px;margin-top:16px;line-height:20px;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis;word-break:break-word}.ladipage-message .ladipage-message-box .ladipage-message-close{display:block;position:absolute;right:15px;bottom:10px;margin:0 auto;padding:10px 0;border:none;width:80px;text-transform:uppercase;text-align:center;color:#000;background-color:#e6e6e6;border-radius:5px;text-decoration:none;font-size:14px;line-height:14px;font-weight:600;cursor:pointer;outline:0}.lightbox-screen{display:none;position:fixed;width:100%;height:100%;top:0;left:0;bottom:0;right:0;margin:auto;z-index:9000000080;background:#7f7f7f;user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none}.lightbox-screen *{user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none}.lightbox-screen img{-webkit-user-drag:none;-khtml-user-drag:none;-moz-user-drag:none;-o-user-drag:none;user-drag:none;pointer-events:auto}.lightbox-screen .lightbox-close{position:absolute;z-index:9000000090;cursor:pointer}.lightbox-screen .lightbox-hidden{display:none}.lightbox-screen .lightbox-close{width:16px;height:16px;margin:10px;background-repeat:no-repeat;background-position:center center;background-image:url("data:image/svg+xml;utf8, %3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22%23fff%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M23.4144%202.00015L2.00015%2023.4144L0.585938%2022.0002L22.0002%200.585938L23.4144%202.00015Z%22%3E%3C%2Fpath%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.00015%200.585938L23.4144%2022.0002L22.0002%2023.4144L0.585938%202.00015L2.00015%200.585938Z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E")}.lightbox-screen img.lightbox-item{max-width:none}.lightbox-gallery-track{touch-action:none;display:flex;align-items:center;justify-content:center}.lightbox-gallery-track .lightbox-gallery-preview,.lightbox-gallery-track .lightbox-item{will-change:transform;backface-visibility:hidden;margin:0!important;transform-origin:center center;position:absolute;left:50%;top:50%}.lightbox-nav-btn{position:fixed;top:50%;transform:translateY(-50%);width:50px;height:50px;background-color:rgba(0,0,0,.5);color:#fff;border-radius:50%;display:flex;justify-content:center;align-items:center;cursor:pointer;z-index:9999;user-select:none;font-size:24px;font-weight:700}.lightbox-nav-btn:hover{background-color:rgba(0,0,0,.8)}.lightbox-prev{left:20px}.lightbox-next{right:20px}*{-webkit-tap-highlight-color:#fff0}.overflow-hidden{overflow:hidden}.ladi-transition{transition:all 150ms linear 0s}.z-index-1{z-index:1}.opacity-0{opacity:0}.height-0{height:0!important}.pointer-events-none{pointer-events:none}.transition-parent-collapse-height{transition:height 150ms linear 0s}.transition-parent-collapse-top{transition:top 150ms linear 0s}.transition-readmore{transition:height 350ms linear 0s}.transition-collapse{transition:height 150ms linear 0s}body.grab{cursor:grab}.ladi-wraper{width:100%;min-height:100%;overflow:hidden;touch-action:manipulation}.ladi-container{position:relative;margin:0 auto;height:100%}.ladi-overlay{position:absolute;top:0;left:0;height:100%;width:100%;pointer-events:none}.ladi-element{position:absolute}@media (hover: hover) {.ladi-check-hover {opacity: 0;}}.ladi-section {margin: 0 auto;position: relative;}.ladi-section[data-tab-id]{display: none;}.ladi-section.selected[data-tab-id]{display: block;}.ladi-section .ladi-section-background {position: absolute;width: 100%;height: 100%;top: 0;left: 0;pointer-events: none;overflow: hidden;}.ladi-gallery {position: absolute;width: 100%;height: 100%;overflow: hidden;}.ladi-gallery .ladi-gallery-view {position: absolute;overflow: hidden;}.ladi-gallery .ladi-gallery-view > .ladi-gallery-view-item {background-size: cover;background-repeat: no-repeat;background-position: center center;width: 100%;height: 100%;position: relative;display: none;transition: transform 500ms ease-in-out;-webkit-backface-visibility: hidden;backface-visibility: hidden;-webkit-perspective: 1000px;perspective: 1000px;}.ladi-gallery .ladi-gallery-view > .ladi-gallery-view-item.play-video {cursor: pointer;}.ladi-gallery .ladi-gallery-view > .ladi-gallery-view-item.play-video:after {content: '';position: absolute;top: 0;left: 0;right: 0;bottom: 0;margin: auto;width: 60px;height: 60px;background: url(https://w.ladicdn.com/source/ladipage-play.svg?v=1.0) no-repeat center center;background-size: contain;pointer-events: none;cursor: pointer;}.ladi-gallery .ladi-gallery-view > .ladi-gallery-view-item.next, .ladi-gallery .ladi-gallery-view > .ladi-gallery-view-item.selected.right {left: 0;transform: translate3d(100%, 0, 0);}.ladi-gallery .ladi-gallery-view > .ladi-gallery-view-item.prev, .ladi-gallery .ladi-gallery-view > .ladi-gallery-view-item.selected.left {left: 0;transform: translate3d(-100%, 0, 0);}.ladi-gallery .ladi-gallery-view > .ladi-gallery-view-item.next.left, .ladi-gallery .ladi-gallery-view > .ladi-gallery-view-item.prev.right, .ladi-gallery .ladi-gallery-view > .ladi-gallery-view-item.selected {left: 0;transform: translate3d(0, 0, 0);}.ladi-gallery .ladi-gallery-view > .selected, .ladi-gallery .ladi-gallery-view > .next, .ladi-gallery .ladi-gallery-view > .prev {display: block;}.ladi-gallery .ladi-gallery-view > .selected {left: 0;}.ladi-gallery .ladi-gallery-view > .next, .ladi-gallery .ladi-gallery-view > .prev {position: absolute;top: 0;width: 100%;}.ladi-gallery .ladi-gallery-view > .next {left: 100%;}.ladi-gallery .ladi-gallery-view > .prev {left: -100%;}.ladi-gallery .ladi-gallery-view > .next.left, .ladi-gallery .ladi-gallery-view > .prev.right {left: 0;}.ladi-gallery .ladi-gallery-view > .selected.left {left: -100%;}.ladi-gallery .ladi-gallery-view > .selected.right {left: 100%;}.ladi-gallery .ladi-gallery-control {position: absolute;overflow: hidden;}.ladi-gallery .ladi-gallery-view .ladi-gallery-view-arrow {position: absolute;top: calc(50% - (33px) / 2);cursor: pointer;z-index: 90000040;}.ladi-gallery .ladi-gallery-view .ladi-gallery-view-arrow-left {left: 5px;transform: rotateY(180deg);-webkit-transform: rotateY(180deg);}.ladi-gallery .ladi-gallery-view .ladi-gallery-view-arrow-right {right: 5px;}.ladi-gallery .ladi-gallery-control .ladi-gallery-control-arrow {position: absolute;cursor: pointer;z-index: 90000040;}.ladi-gallery .ladi-gallery-control .ladi-gallery-control-box {position: relative;}.ladi-gallery .ladi-gallery-control .ladi-gallery-control-box .ladi-gallery-control-item {background-size: cover;background-repeat: no-repeat;background-position: center center;float: left;position: relative;cursor: pointer;filter: invert(15%);}.ladi-gallery .ladi-gallery-control .ladi-gallery-control-box .ladi-gallery-control-item.play-video:after {content: '';position: absolute;top: 0;left: 0;right: 0;bottom: 0;margin: auto;width: 30px;height: 30px;background: url(https://w.ladicdn.com/source/ladipage-play.svg?v=1.0) no-repeat center center;background-size: contain;pointer-events: none;cursor: pointer;}.ladi-gallery .ladi-gallery-control .ladi-gallery-control-box .ladi-gallery-control-item:hover {filter: none;}.ladi-gallery .ladi-gallery-control .ladi-gallery-control-box .ladi-gallery-control-item.selected {filter: none;}.ladi-gallery .ladi-gallery-control .ladi-gallery-control-box .ladi-gallery-control-item:last-child {margin-right: 0 !important;margin-bottom: 0 !important;;}.ladi-gallery .ladi-gallery-view .ladi-gallery-view-arrow, .ladi-gallery .ladi-gallery-control .ladi-gallery-control-arrow {width: 33px;height: 33px;background-repeat: no-repeat;background-position: center center;background-image: url("data:image/svg+xml;utf8, %3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22%23000%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7.00015%200.585938L18.4144%2012.0002L7.00015%2023.4144L5.58594%2022.0002L15.5859%2012.0002L5.58594%202.00015L7.00015%200.585938Z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E");}.ladi-gallery.ladi-gallery-bottom .ladi-gallery-view {top: 0;width: 100%;}.ladi-gallery.ladi-gallery-bottom .ladi-gallery-control {width: 100%;bottom: 0;}.ladi-gallery.ladi-gallery-bottom .ladi-gallery-control .ladi-gallery-control-arrow {top: calc(50% - (33px) / 2);}.ladi-gallery.ladi-gallery-bottom .ladi-gallery-control .ladi-gallery-control-arrow-left {left: 0px;transform: rotateY(180deg) scale(0.6);-webkit-transform: rotateY(180deg) scale(0.6);}.ladi-gallery.ladi-gallery-bottom .ladi-gallery-control .ladi-gallery-control-arrow-right {right: 0px;transform: scale(0.6);-webkit-transform: scale(0.6);}.ladi-gallery.ladi-gallery-bottom .ladi-gallery-control .ladi-gallery-control-box {display: -webkit-inline-flex;display: inline-flex;left: 0;transition: left 150ms ease-in-out;}.ladi-box {position: absolute;width: 100%;height: 100%;overflow: hidden;}#SECTION_POPUP .ladi-container {z-index: 90000070;}#SECTION_POPUP .ladi-container > .ladi-element {z-index: 90000070;position: fixed;display: none;}#SECTION_POPUP .ladi-container > .ladi-element[data-fixed-close="true"] {position: relative !important;}#SECTION_POPUP .ladi-container > .ladi-element.hide-visibility {display: block !important;visibility: hidden !important;}#SECTION_POPUP .popup-close {position: absolute;right: 0px;top: 0px;z-index: 9000000080;cursor: pointer;width: 16px;height: 16px;margin: 10px;background-repeat: no-repeat;background-position: center center;background-image: url("data:image/svg+xml;utf8, %3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22%23000%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M23.4144%202.00015L2.00015%2023.4144L0.585938%2022.0002L22.0002%200.585938L23.4144%202.00015Z%22%3E%3C%2Fpath%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.00015%200.585938L23.4144%2022.0002L22.0002%2023.4144L0.585938%202.00015L2.00015%200.585938Z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E");}.ladi-popup {position: absolute;width: 100%;height: 100%;}.ladi-popup .ladi-popup-background {height: 100%;width: 100%;pointer-events: none;}.ladi-countdown {position: absolute;width: 100%;height: 100%;display: flex;}.ladi-countdown .ladi-countdown-background {position: absolute;width: 100%;height: 100%;top: 0;left: 0;background-size: inherit;background-attachment: inherit;background-origin: inherit;display: table;pointer-events: none;}.ladi-countdown .ladi-countdown-text {position: absolute;width: 100%;height: 100%;text-decoration: inherit;display: table;pointer-events: none;}.ladi-countdown .ladi-countdown-text span {display: table-cell;vertical-align: middle;}.ladi-countdown > .ladi-element {text-decoration: inherit;background-size: inherit;background-attachment: inherit;background-origin: inherit;position: relative;display: inline-block;}.ladi-countdown > .ladi-element:last-child {margin-right: 0px !important;}.ladi-button{position:absolute;width:100%;height:100%;overflow:hidden}.ladi-button:active{transform:translateY(2px);transition:transform .2s linear}.ladi-button .ladi-button-background{height:100%;width:100%;pointer-events:none;transition:inherit}.ladi-button>.ladi-button-headline,.ladi-button>.ladi-button-shape{width:100%!important;height:100%!important;top:0!important;left:0!important;display:table;user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none}.ladi-button>.ladi-button-shape .ladi-shape{margin:auto;top:0;bottom:0}.ladi-button>.ladi-button-headline .ladi-headline{display:table-cell;vertical-align:middle}.ladi-checkout-product-cart-icon .ladi-cart-number{position:absolute;top:-2px;right:-7px;background:#f36e36;text-align:center;min-width:18px;min-height:18px;font-size:12px;font-weight:700;color:#fff;border-radius:100%;z-index:90000000;padding:3px 4px}.ladi-checkout-product-add-to-cart .ladi-button .loading-dots{width:100%;height:100%;top:0;left:0;position:absolute;display:flex;align-items:center;justify-content:center}.ladi-checkout-product-add-to-cart .ladi-button .loading-dots p{display:inline-block;font-size:32px;line-height:1;animation:.6s infinite loading}.ladi-checkout-product-add-to-cart .ladi-button .loading-dots p:first-child{animation-delay:0s}.ladi-checkout-product-add-to-cart .ladi-button .loading-dots p:nth-child(2){animation-delay:.2s}.ladi-checkout-product-add-to-cart .ladi-button .loading-dots p:nth-child(3){animation-delay:.4s}@keyframes loading{0%,100%{opacity:0}50%{opacity:1}}.ladi-form .ladi-form-checkout-bump-offer-check.multiple.checked:before,.ladi-form .ladi-form-checkout-payment-check.multiple.checked:before{--url:url("data:image/svg+xml,%0A%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M18.71%207.20998C18.617%207.11625%2018.5064%207.04186%2018.3846%206.99109C18.2627%206.94032%2018.132%206.91418%2018%206.91418C17.868%206.91418%2017.7373%206.94032%2017.6154%206.99109C17.4936%207.04186%2017.383%207.11625%2017.29%207.20998L9.84%2014.67L6.71%2011.53C6.61348%2011.4367%206.49954%2011.3634%206.37468%2011.3142C6.24983%2011.265%206.1165%2011.2409%205.98232%2011.2432C5.84814%2011.2455%205.71573%2011.2743%205.59265%2011.3278C5.46957%2011.3812%205.35824%2011.4585%205.265%2011.555C5.17176%2011.6515%205.09845%2011.7654%205.04924%2011.8903C5.00004%2012.0152%204.97591%2012.1485%204.97823%2012.2827C4.98055%2012.4168%205.00928%2012.5492%205.06277%2012.6723C5.11627%2012.7954%205.19348%2012.9067%205.29%2013L9.13%2016.84C9.22296%2016.9337%209.33356%2017.0081%209.45542%2017.0589C9.57728%2017.1096%209.70799%2017.1358%209.84%2017.1358C9.97201%2017.1358%2010.1027%2017.1096%2010.2246%2017.0589C10.3464%2017.0081%2010.457%2016.9337%2010.55%2016.84L18.71%208.67998C18.8115%208.58634%2018.8925%208.47269%2018.9479%208.34619C19.0033%208.21969%2019.0319%208.08308%2019.0319%207.94498C19.0319%207.80688%2019.0033%207.67028%2018.9479%207.54378C18.8925%207.41728%2018.8115%207.30363%2018.71%207.20998Z%22%20fill%3D%22%231852FA%22%2F%3E%0A%3C%2Fsvg%3E%0A");pointer-events:none;top:-1px;left:-1px;transform:none}.ladi-form,.ladi-form .ladi-form-item-container{position:absolute;width:100%;height:100%}.ladi-form>.ladi-element,.ladi-form>.ladi-element .ladi-form-item-container,.ladi-form>.ladi-element .ladi-form-item-container .ladi-form-item .ladi-form-checkbox-item span[data-checked=true],.ladi-form>.ladi-element .ladi-form-item-container .ladi-form-item .ladi-form-control:not(.ladi-form-control-select){text-transform:inherit;text-decoration:inherit;text-align:inherit;letter-spacing:inherit;color:inherit;background-size:inherit;background-attachment:inherit;background-origin:inherit}.ladi-form .ladi-button>.ladi-button-headline{color:initial;font-size:initial;font-weight:initial;text-transform:initial;text-decoration:initial;font-style:initial;text-align:initial;letter-spacing:initial;line-height:initial}.ladi-form [data-form-checkout-item=bump_offer] .ladi-form-item,.ladi-form>[data-quantity=true] .ladi-form-item-container{overflow:hidden}.ladi-form>.ladi-element .ladi-form-item-container .ladi-form-item{text-transform:inherit;text-decoration:inherit;text-align:inherit;letter-spacing:inherit;color:inherit}.ladi-form>.ladi-element .ladi-form-item-container .ladi-form-item-background{background-size:inherit;background-attachment:inherit;background-origin:inherit}.ladi-form>.ladi-element .ladi-form-item-container .ladi-form-item .ladi-form-control-select{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-size:9px 6px!important;background-position:right .5rem center;background-repeat:no-repeat;padding-right:24px;text-transform:inherit;text-align:inherit;letter-spacing:inherit;color:inherit;background-size:inherit;background-attachment:inherit;background-origin:inherit}.ladi-form>.ladi-element .ladi-form-item-container .ladi-form-item .ladi-form-checkbox-item,.ladi-form>.ladi-element .ladi-form-item-container .ladi-form-item .ladi-form-checkbox-item span[data-checked=false]{text-transform:inherit;text-align:inherit;letter-spacing:inherit;background-size:inherit;background-attachment:inherit;background-origin:inherit;color:inherit}.ladi-form>.ladi-element .ladi-form-item-container .ladi-form-item .ladi-form-control-select-2{width:calc(100% / 2 - 5px);max-width:calc(100% / 2 - 5px);min-width:calc(100% / 2 - 5px)}.ladi-form>.ladi-element .ladi-form-item-container .ladi-form-item .ladi-form-control-select-2:nth-child(3),.ladi-form>.ladi-element .ladi-form-item-container .ladi-form-item .ladi-form-control-select-3:nth-child(3),.ladi-form>.ladi-element .ladi-form-item-container .ladi-form-item .ladi-form-control-select-3:nth-child(4){margin-left:7.5px}.ladi-form>.ladi-element .ladi-form-item-container .ladi-form-item .ladi-form-control-select-3{width:calc(100% / 3 - 5px);max-width:calc(100% / 3 - 5px);min-width:calc(100% / 3 - 5px)}.ladi-form>.ladi-element .ladi-form-item-container .ladi-form-item .ladi-form-control-select option{color:initial}.ladi-form>.ladi-element .ladi-form-item-container .ladi-form-item .ladi-form-control-select:not([data-selected=""]){text-decoration:inherit}.ladi-form>.ladi-element .ladi-form-item-container .ladi-form-item .ladi-form-checkbox-item{text-decoration:inherit;vertical-align:middle}.ladi-form>.ladi-element .ladi-form-item-container .ladi-form-item .ladi-form-checkbox-box-item{display:inline-block;width:fit-content}.ladi-form>.ladi-element .ladi-form-item-container .ladi-form-item .ladi-form-checkbox-item span{user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none}.ladi-form .ladi-form-item-title-value{font-weight:700;word-break:break-word}.ladi-form .ladi-form-label-container{position:relative;width:100%}.ladi-form .ladi-form-control-file{background-repeat:no-repeat;background-position:calc(100% - 5px) center}.ladi-form .ladi-form-label-container .ladi-form-label-item{display:inline-block;cursor:pointer;position:relative;border-radius:0!important;user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none}.ladi-form .ladi-form-label-container .ladi-form-label-item.image{background-size:cover;background-repeat:no-repeat;background-position:center}.ladi-form .ladi-form-label-container .ladi-form-label-item.no-value{display:none!important}.ladi-form .ladi-form-label-container .ladi-form-label-item.text.disabled{opacity:.35}.ladi-form .ladi-form-label-container .ladi-form-label-item.image.disabled{opacity:.2}.ladi-form .ladi-form-label-container .ladi-form-label-item.color.disabled{opacity:.15}.ladi-form .ladi-form-label-container .ladi-form-label-item.selected:before{content:'';width:0;height:0;bottom:-1px;right:-1px;position:absolute;border-width:0 0 15px 15px;border-color:transparent;border-style:solid}.ladi-form .ladi-form-label-container .ladi-form-label-item.selected:after{content:'';background-image:url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 12 12' viewBox='0 0 12 12' x='0' fill='%23fff' y='0'%3E%3Cg%3E%3Cpath d='m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");background-repeat:no-repeat;background-position:bottom right;width:7px;height:7px;bottom:0;right:0;position:absolute}.ladi-form .ladi-form-item{width:100%;height:100%;position:absolute}.ladi-form .ladi-form-item-background{position:absolute;width:100%;height:100%;top:0;left:0;pointer-events:none}.ladi-form .ladi-form-item.ladi-form-checkbox{height:auto;padding:0 5px}.ladi-form .ladi-form-item .ladi-form-control{background-color:transparent;min-width:100%;min-height:100%;max-width:100%;max-height:100%;width:100%;height:100%;padding:0 5px;color:inherit;font-size:inherit;border:none}.ladi-form .ladi-form-item.ladi-form-checkbox.ladi-form-checkbox-vertical .ladi-form-checkbox-item{margin-top:0!important;margin-left:0!important;margin-right:0!important;display:flex;align-items:center;border:none}.ladi-form .ladi-form-item.ladi-form-checkbox.ladi-form-checkbox-horizontal .ladi-form-checkbox-item{margin-top:0!important;margin-left:0!important;margin-right:10px!important;display:inline-flex;align-items:center;border:none;position:relative}.ladi-form .ladi-form-item.ladi-form-checkbox .ladi-form-checkbox-item input{margin-right:5px;display:block}.ladi-form .ladi-form-item.ladi-form-checkbox .ladi-form-checkbox-item span{cursor:default;word-break:break-word}.ladi-form .ladi-form-item textarea.ladi-form-control{resize:none;padding:5px}.ladi-form .ladi-button{cursor:pointer}.ladi-form .ladi-button .ladi-headline{cursor:pointer;user-select:none}.ladi-form .ladi-element .ladi-form-otp::-webkit-inner-spin-button,.ladi-form .ladi-element .ladi-form-otp::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.ladi-form .ladi-element .ladi-form-item .button-get-code{display:none;position:absolute;right:0;top:0;bottom:0;margin:auto 0;line-height:initial;padding:5px 10px;height:max-content;cursor:pointer;user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none}.ladi-form .ladi-element .ladi-form-item .button-get-code.hide-visibility{display:block!important;visibility:hidden!important}.ladi-form .ladi-form-checkout-bump-offer-product.option-2,.ladi-form .ladi-form-item.otp-resend .button-get-code,.ladi-form [data-form-checkout-item=payment] .ladi-form-checkout-payment-content div>span{display:block}.ladi-form .ladi-form-item.otp-countdown:before{content:attr(data-countdown-time) "s";position:absolute;top:0;bottom:0;margin:auto 0;height:max-content;line-height:initial}.ladi-form [data-variant=true] select option[disabled]{background:#fff;color:#b8b8b8!important}.ladi-google-recaptcha-checkbox{position:absolute;display:inline-block;transform:translateY(-100%);margin-top:-5px;z-index:90000010}.ladi-element[data-form-checkout-item]{padding:0}.ladi-form .ladi-form-checkout-title{margin-bottom:8px}.ladi-form .ladi-element[data-form-checkout-item] .ladi-form-item,.ladi-form .ladi-element[data-form-checkout-item] .ladi-form-item-container{height:auto!important;position:unset!important}.ladi-form .ladi-form-checkout-box{gap:12px;display:flex;flex-flow:column;margin:8px 12px;margin-top:14px!important;padding-bottom:14px;border-left:none!important;border-right:none!important;border-top:none!important;border-radius:0!important}.ladi-form .ladi-form-checkout-box:last-child{border:none!important;padding-bottom:4px}.ladi-form .ladi-form-checkout-box:first-child,.ladi-form .ladi-form-checkout-bump-offer-product .item-product:first-child{margin-top:0}.ladi-form .ladi-form-checkout-payment-item{display:flex;flex-flow:row;gap:12px;align-items:center;--check-size:18px;--width-quantity:65px}.ladi-form .ladi-form-checkout-payment-check{--border-size:1px;width:var(--check-size);height:var(--check-size);flex:0 0 var(--check-size);border:var(--border-size) solid;border-radius:100%;display:block;position:relative}.ladi-form .ladi-form-checkout-payment-check.checked:before{content:"";width:calc(var(--check-size)/ 2);height:calc(var(--check-size)/ 2);border-radius:inherit;display:block;position:absolute;top:0;left:0;transform:translate(calc(50% - var(--border-size)),calc(50% - var(--border-size)))}.ladi-form .ladi-form-checkout-bump-offer-check.multiple,.ladi-form .ladi-form-checkout-payment-check.multiple{border-radius:4px}.ladi-form .ladi-form-checkout-payment-check.multiple.checked:before{content:"";-webkit-mask-image:var(--url);mask-image:var(--url);width:var(--check-size);height:var(--check-size);-webkit-mask-size:var(--check-size);mask-size:var(--check-size);background-color:#fff;position:absolute}.ladi-form .ladi-form-checkout-payment-content,.ladi-form .ladi-form-checkout-product-content{display:flex;flex-flow:row;--gap:10px;gap:var(--gap);align-items:center;width:calc(100% - var(--width-quantity) - var(--check-size) - var(--gap) * 2)}.ladi-form .ladi-form-checkout-payment-content img,.ladi-form .ladi-form-checkout-product-content img{width:36px;max-height:36px;border-radius:4px}.ladi-form .ladi-form-checkout-payment-content div,.ladi-form .ladi-form-checkout-product-content div{display:flex;flex-flow:column}.ladi-form .ladi-form-checkout-payment-content div>span,.ladi-form .ladi-form-checkout-product-content div>span{font-size:inherit}.ladi-form .ladi-form-checkout-payment-content div>span.small,.ladi-form .ladi-form-checkout-product-content div>span.small{font-size:80%;opacity:.8}.ladi-form .ladi-form-checkout-payment-content div .price.price-compare,.ladi-form .ladi-form-checkout-product-content div .price.price-compare{display:flex;align-items:center;gap:8px;flex-direction:row!important}.ladi-form .ladi-form-checkout-payment-quantity,.ladi-form .ladi-form-checkout-product-quantity{position:relative;--icon-size:calc(var(--check-size) * 0.8)}.ladi-form .ladi-form-checkout-payment-quantity input,.ladi-form .ladi-form-checkout-product-quantity input{padding:4px calc(var(--check-size)) 4px 8px;border-radius:8px;position:relative;width:var(--width-quantity);min-height:34px;border:1px solid;background-color:transparent;top:0;left:0;display:block}.ladi-form .ladi-form-checkout-payment-quantity input::-webkit-inner-spin-button,.ladi-form .ladi-form-checkout-payment-quantity input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.ladi-form .ladi-form-checkout-payment-quantity .up{width:var(--icon-size);height:var(--icon-size);top:-1px;right:5px;cursor:pointer;display:block;position:absolute}.ladi-form .ladi-form-checkout-payment-quantity .up:before{content:'';--url:url("data:image/svg+xml,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3.14645%206.14645C3.34171%205.95118%203.65829%205.95118%203.85355%206.14645L8%2010.2929L12.1464%206.14645C12.3417%205.95118%2012.6583%205.95118%2012.8536%206.14645C13.0488%206.34171%2013.0488%206.65829%2012.8536%206.85355L8.35355%2011.3536C8.15829%2011.5488%207.84171%2011.5488%207.64645%2011.3536L3.14645%206.85355C2.95118%206.65829%202.95118%206.34171%203.14645%206.14645Z%22%20fill%3D%22black%22%20transform%3D%22rotate(180%208%208)%22%2F%3E%3C%2Fsvg%3E");-webkit-mask-image:var(--url);mask-image:var(--url);display:block;position:absolute;width:var(--icon-size);height:var(--icon-size);pointer-events:none;top:4px;left:2px;-webkit-mask-size:var(--icon-size);mask-size:var(--icon-size)}.ladi-form .ladi-form-checkout-payment-quantity .down{width:var(--icon-size);height:var(--icon-size);right:5px;cursor:pointer;display:block;position:absolute;bottom:3px}.ladi-form .ladi-form-checkout-payment-quantity .down:before{content:'';--url:url("data:image/svg+xml,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3.14645%206.14645C3.34171%205.95118%203.65829%205.95118%203.85355%206.14645L8%2010.2929L12.1464%206.14645C12.3417%205.95118%2012.6583%205.95118%2012.8536%206.14645C13.0488%206.34171%2013.0488%206.65829%2012.8536%206.85355L8.35355%2011.3536C8.15829%2011.5488%207.84171%2011.5488%207.64645%2011.3536L3.14645%206.85355C2.95118%206.65829%202.95118%206.34171%203.14645%206.14645Z%22%20fill%3D%22black%22%2F%3E%0A%3C%2Fsvg%3E");-webkit-mask-image:var(--url);mask-image:var(--url);display:block;position:absolute;width:var(--icon-size);height:var(--icon-size);pointer-events:none;left:2px;-webkit-mask-size:var(--icon-size);mask-size:var(--icon-size)}.ladi-form [data-form-checkout-item=payment] .ladi-form-item{display:table}.ladi-form [data-form-checkout-item=payment] .ladi-form-item .ladi-form-checkout-payment-content{width:calc(100% - 18px)}.ladi-form [data-form-checkout-item=payment] .ladi-form-item .ladi-form-checkout-payment-content div{display:table-cell;vertical-align:middle;padding:0 6px;cursor:pointer;width:100%;position:relative}.ladi-form [data-form-checkout-item=payment] .ladi-form-item .ladi-form-checkout-payment-content div.arrow:before{content:'';--url:url("data:image/svg+xml,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6.14645%203.14645C6.34171%202.95118%206.65829%202.95118%206.85355%203.14645L11.3536%207.64645C11.5488%207.84171%2011.5488%208.15829%2011.3536%208.35355L6.85355%2012.8536C6.65829%2013.0488%206.34171%2013.0488%206.14645%2012.8536C5.95118%2012.6583%205.95118%2012.3417%206.14645%2012.1464L10.2929%208L6.14645%203.85355C5.95118%203.65829%205.95118%203.34171%206.14645%203.14645Z%22%20fill%3D%22black%22%2F%3E%0A%3C%2Fsvg%3E");-webkit-mask-image:var(--url);mask-image:var(--url);position:absolute;width:20px;height:20px;top:0;right:0;bottom:0;display:block;margin:auto;-webkit-mask-size:100%;mask-size:100%}.ladi-form [data-form-checkout-item=total_price]{display:flex;flex-flow:column;gap:3px;justify-content:center}.ladi-form [data-form-checkout-item=total_price] .line{display:inline-flex;justify-content:space-between;align-items:center}.ladi-form [data-form-checkout-item=total_price] .title-number-price.big,.ladi-form [data-form-checkout-item=total_price] .title-price.big{font-weight:700;font-size:130%}.ladi-form [data-form-checkout-item=total_price] .title-number-price{font-size:115%}.ladi-form [data-form-checkout-item=total_price] .space{border-top:1px solid;margin:15px 0 10px}.ladi-form .ladi-form-checkout-bump-offer-checkbox{display:flex;flex-flow:row;gap:8px;padding:8px;margin:12px 8px 0;border-radius:8px;align-items:center;--check-size-bumpoffer:18px;--width-quantity-bumpoffer:60px}.ladi-form .ladi-form-checkout-bump-offer-checkbox.checkbox-bump-offer-1{background-color:#3c72f9;margin:0}.ladi-form .ladi-form-checkout-bump-offer-checkbox.checkbox-bump-offer-1 p{color:#fff}.ladi-form .ladi-form-checkout-bump-offer-checkbox.checkbox-bump-offer-2{background-color:#fde298;margin:12px 0 4px}.ladi-form .ladi-form-checkout-bump-offer-checkbox.checkbox-bump-offer-3{background-color:#f3f4f5;margin:8px 0 0;padding:4px 8px;width:max-content}.ladi-form .ladi-form-checkout-bump-offer-checkbox.checkbox-bump-offer-3 .ladi-form-checkout-bump-offer-check{width:12px;height:12px;flex:0 0 12px}.ladi-form .ladi-form-checkout-bump-offer-check{--border-size:1px;width:var(--check-size-bumpoffer);height:var(--check-size-bumpoffer);flex:0 0 var(--check-size-bumpoffer);border:var(--border-size) solid #cfd3d8;background-color:#fff;border-radius:100%;display:block;position:relative}.ladi-form .ladi-form-checkout-bump-offer-check.checked:before{content:"";width:calc(var(--check-size-bumpoffer)/ 2);height:calc(var(--check-size-bumpoffer)/ 2);border-radius:inherit;display:block;position:absolute;top:0;left:0;transform:translate(calc(50% - var(--border-size)),calc(50% - var(--border-size)))}.ladi-form .ladi-form-checkout-bump-offer-check.multiple.checked:before{content:"";-webkit-mask-image:var(--url);mask-image:var(--url);width:var(--check-size-bumpoffer);height:var(--check-size-bumpoffer);-webkit-mask-size:var(--check-size-bumpoffer);mask-size:var(--check-size-bumpoffer);background-color:#000;position:absolute}.ladi-form .ladi-form-checkout-bump-offer-checkbox.checkbox-bump-offer-3 .ladi-form-checkout-bump-offer-check.multiple.checked:before{top:-5px;left:-3px}.ladi-form .ladi-form-checkout-bump-offer-product{display:flex;flex-flow:row;gap:16px;margin:8px 12px;align-items:center;border-left:none!important;border-right:none!important;border-top:none!important;border-radius:0!important}.ladi-form .ladi-form-checkout-bump-offer-product.option-1{display:block!important;padding-bottom:8px}.ladi-form .ladi-form-item:last-child .ladi-form-checkout-bump-offer-product{border:none!important}.ladi-form .ladi-form-checkout-bump-offer-product .item-product{display:flex;gap:16px;align-items:flex-start;margin-top:16px;margin-bottom:12px}.ladi-form .ladi-form-checkout-bump-offer-product .item-product:last-child{margin-bottom:0}.ladi-form .ladi-form-checkout-bump-offer-product .item-product img{width:48px;height:48px;border-radius:4px;overflow:hidden}.ladi-form .ladi-form-checkout-bump-offer-product .item-product .item-product-title{font-size:90%;opacity:.6}.ladi-form .ladi-form-checkout-bump-offer-product .item-product .item-product-description{color:#9fa7b1;text-overflow:ellipsis;overflow:hidden;-webkit-line-clamp:2;display:-webkit-box;-webkit-box-orient:vertical}.ladi-form .ladi-form-checkout-bump-offer-product .item-detail{display:flex;flex-direction:column}.ladi-form .ladi-form-checkout-bump-offer-product .item-detail .shock-promotion-label{background-color:#ef9300;width:max-content;border-radius:4px;padding:2px 8px;color:#fff;margin-bottom:4px;font-weight:600}.ladi-form .ladi-form-checkout-bump-offer-product .item-detail .pr-name{font-weight:400;font-size:120%;line-height:1.4}.ladi-form .ladi-form-checkout-bump-offer-product .item-detail .pr-price{font-weight:400;line-height:1.4}.ladi-form .ladi-form-checkout-bump-offer-product .item-detail span a{text-decoration:line-through;opacity:.6}.ladi-form .ladi-form-checkout-bump-offer-product .item-detail .special{background-color:#e01a1a;padding:2px 8px;margin-right:6px;color:#fff;border-radius:4px;font-size:80%}.ladi-form [data-form-checkout-item=coupon_code] .content-discount-block{padding:12px;border-radius:4px;display:flex;align-items:center;justify-content:space-between}.ladi-form [data-form-checkout-item=coupon_code] .ladi-form-item{display:flex;align-items:center;justify-content:space-between}.ladi-form [data-form-checkout-item=coupon_code] .content-discount-block .title{display:flex;align-items:center;gap:8px}.ladi-form [data-form-checkout-item=coupon_code] .content-discount-block .placeholder span,.ladi-form [data-form-checkout-item=coupon_code] .content-discount-block .title span{font-weight:400;font-size:100%;line-height:1.4}.ladi-form [data-form-checkout-item=coupon_code] .content-discount-block .title i{width:16px;height:16px;mask-image:url(https://w.ladicdn.com/ladiui/icons/ldicon-discount-coupon.svg);display:inline-block;mask-size:cover}.ladi-form [data-form-checkout-item=coupon_code] .content-discount-block .placeholder{display:flex;align-items:center;gap:8px;cursor:pointer}.ladi-form [data-form-checkout-item=coupon_code] .content-discount-block .placeholder i{width:16px;height:16px;mask-image:url(https://w.ladicdn.com/ladiui/icons/new-ldicon-arrow-left.svg);display:inline-block;mask-size:cover;background-color:#6d6d6d!important}.ladi-form > .ladi-element .ladi-form-item-container .ladi-form-item .ladi-form-control-select {background-image: url("data:image/svg+xml;utf8, %3Csvg%20width%3D%2232%22%20height%3D%2224%22%20viewBox%3D%220%200%2032%2024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpolygon%20points%3D%220%2C0%2032%2C0%2016%2C24%22%20style%3D%22fill%3A%20rgb(0%2C%200%2C%200)%22%3E%3C%2Fpolygon%3E%3C%2Fsvg%3E");}.ladi-group {position: absolute;width: 100%;height: 100%;}.ladi-shape {position: absolute;width: 100%;height: 100%;pointer-events: none;}.ladi-shape .ladi-cart-number {position: absolute;top: -2px;right: -7px;background: #f36e36;text-align: center;width: 18px;height: 18px;line-height: 18px;font-size: 12px;font-weight: bold;color: #fff;border-radius: 100%;}.ladi-image {position: absolute;width: 100%;height: 100%;overflow: hidden;}.ladi-image .ladi-image-background {background-repeat: no-repeat;background-position: left top;background-size: cover;background-attachment: scroll;background-origin: content-box;position: absolute;margin: 0 auto;width: 100%;height: 100%;pointer-events: none;} .ladi-headline {width: 100%;display: inline-block;word-break: break-word;background-size: cover;background-position: center center;}.ladi-headline a {text-decoration: underline;}.ladi-line {position: relative;}.ladi-line .ladi-line-container {border-bottom: 0 !important;border-right: 0 !important;width: 100%;height: 100%;}a[data-action] {user-select: none;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;cursor: pointer;}a:visited {color: inherit;}a:link {color: inherit;}[data-opacity="0"] {opacity: 0;}[data-hidden="true"] {display: none;}[data-action="true"] {cursor: pointer;}.ladi-hidden {display: none;}.ladi-animation {-webkit-animation-fill-mode: both;animation-fill-mode: both;}.ladi-animation-hidden {visibility: hidden !important;opacity: 0 !important;}.element-click-selected {cursor: pointer;}.is-2nd-click {cursor: pointer;}.ladi-button-shape.is-2nd-click, .ladi-accordion-shape.is-2nd-click {z-index: 3;}.backdrop-popup {display: none;position: fixed;top: 0;left: 0;right: 0;bottom: 0;z-index: 90000060;}.backdrop-dropbox {display: none;position: fixed;top: 0;left: 0;right: 0;bottom: 0;z-index: 90000040;}.ladi-lazyload {background-image: none !important;}.ladi-list-paragraph ul li.ladi-lazyload:before {background-image: none !important;}.ladi-element.ladi-auto-scroll {overflow-x: auto;overflow-y: hidden;width: 100% !important;left: 0 !important;-webkit-overflow-scrolling: touch;}[data-hint]:not([data-timeout-id-copied]):before, [data-hint]:not([data-timeout-id-copied]):after {display: none !important;}.ladi-section.ladi-auto-scroll {overflow-x: auto;overflow-y: hidden;-webkit-overflow-scrolling: touch;}.ladi-gallery .ladi-gallery-view > .ladi-gallery-view-item {transition: transform 300ms ease-in-out;}
/* Ladipage animation media queries removed */
.ladi-wraper {margin: 0 auto; width: 420px;}@font-face {font-family: "TESQSSRUdVTEFSLlRURg";src: url("https://w.ladicdn.com/69b247cf4f6ddc0012f0ce55/lora-regular-20260324093249-s769z.ttf") format("truetype");}@font-face {font-family: "VVZOSGhVGFMSdGY";src: url("https://w.ladicdn.com/69b247cf4f6ddc0012f0ce55/uvnhoatay1-20260323154552-_frsi.ttf") format("truetype");}@font-face {font-family: "MUZUViWSVAtSEFTVEVHSSPVEY";src: url("https://w.ladicdn.com/69b247cf4f6ddc0012f0ce55/1ftv-vip-hastegi-20260324093932-mdxk5.otf")}@font-face {font-family: "MUZUViWSVAtUmFsclodGVuLnRZg";src: url("https://w.ladicdn.com/69b247cf4f6ddc0012f0ce55/1ftv-vip-ralsihten-20260623134451-stjy6.ttf") format("truetype");}@font-face {font-family: "MUZUVlZJUEvcmdpbmEtSXRhbGljLnRZg";src: url("https://w.ladicdn.com/69b247cf4f6ddc0012f0ce55/1ftvvipmorgina-italic-20260724112004-t75nr.ttf") format("truetype");}@font-face {font-family: "MUZUViWSVAtRVJHSVNBLVJFRVMQVIgKDEpLkURg";src: url("https://w.ladicdn.com/69b247cf4f6ddc0012f0ce55/1ftv-vip-ergisa-regular-1-20260323154552-z0mmx.otf")}@font-face {font-family: "QkhOIEJQIEVDQVRIRVJJTkEgTUVESVVNLkURg";src: url("https://w.ladicdn.com/69b247cf4f6ddc0012f0ce55/bhn-bp-ecatherina-medium-20260710113427-et7r3.otf")}@font-face {font-family: "TlZORXJvdGlxdWUtQmsZCdGY";src: url("https://w.ladicdn.com/69b247cf4f6ddc0012f0ce55/nvnerotique-bold-20260724112056-ufvcy.ttf") format("truetype");}@font-face {font-family: "TUotVklQLURheXRvbmljYSAoMSkudHRm";src: url("https://w.ladicdn.com/69b247cf4f6ddc0012f0ce55/mj-vip-daytonica-1-20260724112035-7ihbf.ttf") format("truetype");}
#SECTION5{height: 757.5px;}#BOX28{width: 420px; height: 758px;top: -0.5px; left: 0px;}#BOX28 > .ladi-box,#BOX79 > .ladi-box,#BOX31 > .ladi-box,#BOX86 > .ladi-box,#BOX87 > .ladi-box{background-color: rgb(248, 246, 243);}#IMAGE234{width: 70.7798px; height: 52.483px;top: 300px; left: 296px;}#IMAGE234 > .ladi-image > .ladi-image-background{width: 246.044px; height: 246.044px;top: -68.3723px; left: -106.892px;background-image: url("https://w.ladicdn.com/s550x550/69b247cf4f6ddc0012f0ce55/elements-thiep-17-20260723043335-d3sit.png");}#IMAGE234.ladi-animation > .ladi-image,#IMAGE261.ladi-animation > .ladi-image,#HEADLINE287.ladi-animation > .ladi-headline,#HEADLINE347.ladi-animation > .ladi-headline,#HEADLINE258.ladi-animation > .ladi-headline,#HEADLINE350.ladi-animation > .ladi-headline,#SECTION23.ladi-animation,#HEADLINE280.ladi-animation > .ladi-headline,#HEADLINE115.ladi-animation > .ladi-headline,#HEADLINE220.ladi-animation > .ladi-headline,#HEADLINE222.ladi-animation > .ladi-headline,#HEADLINE288.ladi-animation > .ladi-headline,#HEADLINE278.ladi-animation > .ladi-headline,#HEADLINE293.ladi-animation > .ladi-headline,#HEADLINE351.ladi-animation > .ladi-headline,#HEADLINE344.ladi-animation > .ladi-headline,#HEADLINE343.ladi-animation > .ladi-headline,#HEADLINE93.ladi-animation > .ladi-headline,#HEADLINE92.ladi-animation > .ladi-headline,#HEADLINE94.ladi-animation > .ladi-headline,#HEADLINE271.ladi-animation > .ladi-headline,#HEADLINE95.ladi-animation > .ladi-headline,#HEADLINE96.ladi-animation > .ladi-headline{animation-name: fadeInUp; animation-delay: 1s; animation-duration: 1s; animation-iteration-count: 1;}#IMAGE261{width: 151.623px; height: 141.094px;top: 282px; left: 92.474px;}#IMAGE261 > .ladi-image > .ladi-image-background{width: 214.799px; height: 211.641px;top: -49.4882px; left: -22.1117px;background-image: url("https://w.ladicdn.com/s550x550/69b247cf4f6ddc0012f0ce55/elements-thiep-18-20260723043335-ueahl.png");}#IMAGE261 > .ladi-image{transform: rotate(16deg);}#IMAGE264,#IMAGE264 > .ladi-image > .ladi-image-background{width: 44px; height: 44px;}#IMAGE264{top: 28.483px; left: 25px;}#IMAGE264 > .ladi-image > .ladi-image-background,#GROUP188,#IMAGE227,#HEADLINE33,#HEADLINE303,#HEADLINE309,#HEADLINE316,#HEADLINE323,#HEADLINE330,#IMAGE236 > .ladi-image > .ladi-image-background,#BOX39,#HEADLINE258,#IMAGE237,#IMAGE238,#IMAGE206 > .ladi-image > .ladi-image-background,#BOX82,#GROUP195,#HEADLINE222,#HEADLINE288,#COUNTDOWN5,#BOX31,#IMAGE216,#HEADLINE292,#IMAGE218,#IMAGE218 > .ladi-image > .ladi-image-background,#IMAGE259,#IMAGE259 > .ladi-image > .ladi-image-background,#BOX87,#FORM_ITEM13,#BOX26,#GROUP157,#HEADLINE271,#IMAGE192 > .ladi-image > .ladi-image-background,#IMAGE193 > .ladi-image > .ladi-image-background,#IMAGE194 > .ladi-image > .ladi-image-background,#POPUP1,#POPUP2,#IMAGE69,#HEADLINE97{top: 0px; left: 0px;}#IMAGE264 > .ladi-image > .ladi-image-background{background-image: url("https://w.ladicdn.com/s350x350/69b247cf4f6ddc0012f0ce55/elements-thiep-20-20260723043335-lpzap.png");}#GROUP205,#GROUP188,#IMAGE227{width: 331.526px; height: 225px;}#GROUP205{top: 362.483px; left: 88.474px;}#GROUP188.ladi-animation > .ladi-group,#GROUP191.ladi-animation > .ladi-group{animation-name: fadeInRight; animation-delay: 1s; animation-duration: 1s; animation-iteration-count: 1;}#IMAGE227 > .ladi-image > .ladi-image-background{width: 486.399px; height: 486.399px;top: -159.714px; left: -87.1164px;background-image: url("https://w.ladicdn.com/s800x800/69b247cf4f6ddc0012f0ce55/elements-thiep-13-20260723040541-8nxzz.png");}#HEADLINE287{width: 88px;top: 20.775px; left: 155.76px;}#HEADLINE287 > .ladi-headline{font-family: 'UVNHoaTay'; font-size: 28.26px; line-height: 1.6; color: rgb(155, 52, 61); text-align: center;}#GROUP182,#GROUP184,#GROUP185,#GROUP186{width: 221.42px; height: 19.0001px;}#GROUP182{top: 70.758px; left: 89.0499px;}#HEADLINE33,#HEADLINE34,#HEADLINE36,#HEADLINE37,#HEADLINE38,#HEADLINE39,#HEADLINE303,#HEADLINE305,#HEADLINE306,#HEADLINE307,#HEADLINE308,#HEADLINE309,#HEADLINE310,#HEADLINE312,#HEADLINE313,#HEADLINE314,#HEADLINE315,#HEADLINE316,#HEADLINE317,#HEADLINE319,#HEADLINE320,#HEADLINE321,#HEADLINE322,#HEADLINE323,#HEADLINE324,#HEADLINE326,#HEADLINE327,#HEADLINE328,#HEADLINE329,#HEADLINE330,#HEADLINE331{width: 23px;}#HEADLINE33 > .ladi-headline,#HEADLINE34 > .ladi-headline,#HEADLINE35 > .ladi-headline,#HEADLINE36 > .ladi-headline,#HEADLINE37 > .ladi-headline,#HEADLINE38 > .ladi-headline,#HEADLINE39 > .ladi-headline,#HEADLINE303 > .ladi-headline,#HEADLINE304 > .ladi-headline,#HEADLINE305 > .ladi-headline,#HEADLINE306 > .ladi-headline,#HEADLINE307 > .ladi-headline,#HEADLINE308 > .ladi-headline,#HEADLINE309 > .ladi-headline,#HEADLINE310 > .ladi-headline,#HEADLINE311 > .ladi-headline,#HEADLINE312 > .ladi-headline,#HEADLINE313 > .ladi-headline,#HEADLINE314 > .ladi-headline,#HEADLINE315 > .ladi-headline,#HEADLINE316 > .ladi-headline,#HEADLINE317 > .ladi-headline,#HEADLINE318 > .ladi-headline,#HEADLINE319 > .ladi-headline,#HEADLINE320 > .ladi-headline,#HEADLINE321 > .ladi-headline,#HEADLINE322 > .ladi-headline,#HEADLINE323 > .ladi-headline,#HEADLINE324 > .ladi-headline,#HEADLINE325 > .ladi-headline,#HEADLINE326 > .ladi-headline,#HEADLINE327 > .ladi-headline,#HEADLINE328 > .ladi-headline,#HEADLINE329 > .ladi-headline,#HEADLINE330 > .ladi-headline,#HEADLINE331 > .ladi-headline,#HEADLINE332 > .ladi-headline{font-family: 'Hastegi'; font-size: 12px; font-weight: bold; line-height: 1.6; color: rgb(155, 52, 61); text-align: center;}#HEADLINE34,#HEADLINE310,#HEADLINE317,#HEADLINE324,#HEADLINE331{top: 0.0001px; left: 33.3943px;}#HEADLINE35,#HEADLINE304,#HEADLINE311,#HEADLINE318,#HEADLINE325,#HEADLINE332{width: 30px;}#HEADLINE35,#HEADLINE311,#HEADLINE318,#HEADLINE325,#HEADLINE332{top: 0.0001px; left: 61.8886px;}#HEADLINE36,#HEADLINE312,#HEADLINE319,#HEADLINE326{top: 0.0001px; left: 99.165px;}#HEADLINE37,#HEADLINE313,#HEADLINE320,#HEADLINE327{top: 0.0001px; left: 131.453px;}#HEADLINE38,#HEADLINE314,#HEADLINE321,#HEADLINE328{top: 0.0001px; left: 166.131px;}#HEADLINE39,#HEADLINE315,#HEADLINE322,#HEADLINE329{top: 0.0001px; left: 198.42px;}#GROUP183{width: 188.026px; height: 19px;top: 97.758px; left: 122.444px;}#HEADLINE304{top: 0px; left: 28.4943px;}#HEADLINE305{top: 0px; left: 65.7707px;}#HEADLINE306{top: 0px; left: 98.0587px;}#HEADLINE307{top: 0px; left: 132.737px;}#HEADLINE308{top: 0px; left: 165.026px;}#GROUP184{top: 116.758px; left: 89.0499px;}#GROUP185{top: 137.395px; left: 89.0499px;}#GROUP186{top: 158.395px; left: 89.0499px;}#GROUP187{width: 91.8886px; height: 19.0001px;top: 180.335px; left: 89.0499px;}#SHAPE1{width: 32.4063px; height: 32.4063px;top: 151.611px; left: 250.526px;}#SHAPE1.ladi-animation > .ladi-shape{animation-iteration-count: infinite;}#SHAPE1 svg:last-child{fill: rgb(155, 52, 61);}#HEADLINE347{width: 360px;top: 169.5px; left: 25px;}#HEADLINE347 > .ladi-headline{font-family: 'UVNHoaTay'; font-size: 39.43px; line-height: 1.6; color: rgb(155, 52, 61); text-align: center;}#HEADLINE348{width: 248px;top: 154.773px; left: 81px;}#HEADLINE348 > .ladi-headline{font-family: 'MorginaItalic'; font-size: 24.65px; line-height: 1.6; color: rgb(155, 52, 61); text-transform: uppercase; text-align: left;}#HEADLINE348.ladi-animation > .ladi-headline,#GROUP192.ladi-animation > .ladi-group{animation-name: fadeInDown; animation-delay: 1s; animation-duration: 1s; animation-iteration-count: 1;}#HEADLINE348 > .ladi-headline:hover,#HEADLINE275 > .ladi-headline:hover,#HEADLINE277 > .ladi-headline:hover,#HEADLINE276 > .ladi-headline:hover,#BOX41 > .ladi-box:hover,#BOX43 > .ladi-box:hover,#BOX26 > .ladi-box:hover{opacity: 1;}#HEADLINE275{width: 288px;top: 103.5px; left: -415.5px;}#HEADLINE275 > .ladi-headline{font-family: 'Hastegi'; font-size: 22px; line-height: 1.6; color: rgb(155, 52, 61); text-align: center;}#LINE33{width: 350px;top: 169.5px; left: -450px;}#LINE33 > .ladi-line > .ladi-line-container,#LINE34 > .ladi-line > .ladi-line-container,#LINE35 > .ladi-line > .ladi-line-container,#LINE36 > .ladi-line > .ladi-line-container,#LINE37 > .ladi-line > .ladi-line-container,#LINE5 > .ladi-line > .ladi-line-container{border-top: 1px solid rgb(155, 52, 61); border-right: 1px solid rgb(155, 52, 61); border-bottom: 1px solid rgb(155, 52, 61); border-left: 0px !important;}#LINE33 > .ladi-line,#LINE34 > .ladi-line,#LINE35 > .ladi-line,#LINE36 > .ladi-line,#LINE37 > .ladi-line,#LINE14 > .ladi-line,#LINE5 > .ladi-line{width: 100%;}#LINE33 > .ladi-line,#LINE34 > .ladi-line,#LINE35 > .ladi-line,#LINE36 > .ladi-line,#LINE37 > .ladi-line,#LINE5 > .ladi-line{padding: 8px 0px;}#GROUP203{width: 430px; height: 107.227px;top: 28.483px; left: -5px;}#GROUP203.ladi-animation > .ladi-group{animation-name: bounceInDown; animation-delay: 1s; animation-duration: 1s; animation-iteration-count: 1;}#HEADLINE345{width: 122px;top: 0px; left: 160px;}#HEADLINE345 > .ladi-headline{font-family: 'Hastegi'; font-size: 23.35px; line-height: 1.6; color: rgb(143, 50, 59); text-align: center;}#HEADLINE277{width: 331px;top: 71.227px; left: 55.5px;}#HEADLINE277 > .ladi-headline{font-family: 'Hastegi'; font-size: 22.59px; line-height: 1.6; color: rgb(155, 52, 61); text-align: center;}#HEADLINE276{width: 430px;top: 14.21px; left: 0px;}#HEADLINE276 > .ladi-headline{font-family: 'MorginaItalic'; font-size: 40.47px; line-height: 1.6; color: rgb(155, 52, 61); text-align: center;}#IMAGE268{width: 155.502px; height: 197.889px;top: 599.111px; left: 264.498px;}#IMAGE268 > .ladi-image > .ladi-image-background{width: 409.403px; height: 284.308px;top: -117.521px; left: -254.629px;background-image: url("https://w.ladicdn.com/s750x600/69b247cf4f6ddc0012f0ce55/untitled_artwork-1-20260724161904-anzsy.png");}#IMAGE236,#IMAGE236 > .ladi-image > .ladi-image-background,#IMAGE126{width: 59px; height: 59px;}#IMAGE236{top: 644.483px; left: 264.498px;}#IMAGE236 > .ladi-image > .ladi-image-background{background-image: url("https://w.ladicdn.com/s400x400/69b247cf4f6ddc0012f0ce55/elements-thiep-20-20260723043335-lpzap.png");}#IMAGE269,#IMAGE270{width: 147.445px; height: 117.889px;}#IMAGE269{top: -0.5px; left: 272.555px;}#IMAGE269 > .ladi-image > .ladi-image-background,#IMAGE270 > .ladi-image > .ladi-image-background{width: 340.242px; height: 236.279px;top: 1.29259px; left: -1.8315px;background-image: url("https://w.ladicdn.com/s650x550/69b247cf4f6ddc0012f0ce55/untitled_artwork-1-20260724161904-anzsy.png");}#IMAGE269 > .ladi-image,#IMAGE274 > .ladi-image{transform: perspective(1000px) rotateY(180deg);}#IMAGE231{width: 61.133px; height: 57.0937px;top: 357px; left: 358.867px;}#IMAGE231 > .ladi-image > .ladi-image-background{width: 112.731px; height: 112.731px;top: -30.2861px; left: -23.5558px;}#IMAGE231 > .ladi-image > .ladi-image-background,#IMAGE275 > .ladi-image > .ladi-image-background{background-image: url("https://w.ladicdn.com/s450x450/69b247cf4f6ddc0012f0ce55/elements-thiep-16-20260723042420-yfzqc.png");}#IMAGE231.ladi-animation > .ladi-image{animation-name: swing; animation-delay: 1s; animation-duration: 1s; animation-iteration-count: infinite;}#GROUP180{width: 146.005px; height: 348px;top: 308px; left: 19px;}#GROUP180.ladi-animation > .ladi-group,#GROUP190.ladi-animation > .ladi-group{animation-name: fadeInLeft; animation-delay: 1s; animation-duration: 1s; animation-iteration-count: 1;}#BOX74{width: 138.683px; height: 348px;top: 0px; left: 6.0297px;}#BOX74 > .ladi-box{background-color: rgb(143, 50, 59);}#BOX74 > .ladi-box,#BOX75 > .ladi-box,#BOX76 > .ladi-box,#BOX77 > .ladi-box,#BOX78 > .ladi-box{transform: rotate(-5deg);}#BOX75,#BOX76,#BOX77{width: 127.485px; height: 66.3267px;}#BOX75{top: 7.75248px; left: 0px;}#BOX75 > .ladi-box,#BOX76 > .ladi-box,#BOX77 > .ladi-box,#BOX78 > .ladi-box,#BOX80 > .ladi-box,#BOX81 > .ladi-box,#BOX26 > .ladi-box{border-radius: 0px;}#BOX75 > .ladi-box{background-image: url("https://w.ladicdn.com/s450x400/69b247cf4f6ddc0012f0ce55/1784774421095_3379540865962086579_g2668429489759155549_8721e77d7d67642915c9dcc9826a12ad-20260723165058-ggql4.jpg"); background-size: cover; background-origin: content-box; background-position: center top; background-repeat: repeat; background-attachment: scroll;}#BOX76{top: 81.8317px; left: 6.0297px;}#BOX76 > .ladi-box{background-image: url("https://w.ladicdn.com/s450x400/69b247cf4f6ddc0012f0ce55/1784774420865_3379540865962086579_g2668429489759155549_413711b4854d368a30f70a56b02885f9-20260723162942-nks-y.jpg"); background-size: cover; background-origin: content-box; background-position: center top; background-repeat: repeat; background-attachment: scroll;}#BOX77{top: 155.911px; left: 11.6287px;}#BOX77 > .ladi-box{background-image: url("https://w.ladicdn.com/s450x400/69b247cf4f6ddc0012f0ce55/1784774420902_3379540865962086579_g2668429489759155549_a0ec76fc41ab4cb7fe89b922273e566b-20260723164135-vgsle.jpg"); background-size: cover; background-origin: content-box; background-position: center top; background-repeat: repeat; background-attachment: scroll;}#BOX78{width: 127.485px; height: 70.3267px;top: 229.99px; left: 18.5198px;}#BOX78 > .ladi-box{background-image: url("https://w.ladicdn.com/s450x400/69b247cf4f6ddc0012f0ce55/1784774420884_3379540865962086579_g2668429489759155549_fd36d587f191f01454f7c7ef8dba84a8-20260723162943-87qvy.jpg"); background-size: cover; background-origin: content-box; background-position: center top; background-repeat: repeat; background-attachment: scroll;}#IMAGE230{width: 113.633px; height: 150px;top: 560px; left: 136px;}#IMAGE230 > .ladi-image > .ladi-image-background{width: 245.399px; height: 245.399px;top: -51.981px; left: -73.7403px;background-image: url("https://w.ladicdn.com/s550x550/69b247cf4f6ddc0012f0ce55/elements-thiep-15-20260723042342-eu6mv.png");}#IMAGE230.ladi-animation > .ladi-image{animation-name: swing; animation-delay: 1s; animation-duration: 1s; animation-iteration-count: 1;}#IMAGE270{top: 644.483px; left: 0px;}#IMAGE270 > .ladi-image,#IMAGE276 > .ladi-image{transform: perspective(1000px) rotate(180deg) rotateY(180deg);}#SECTION20{height: 634.8px;}#BOX39{width: 420px; height: 634.8px;}#BOX39 > .ladi-box{background-image: url("https://w.ladicdn.com/s750x950/69b247cf4f6ddc0012f0ce55/1784774421244_3379540865962086579_g2668429489759155549_bd3bf0e9785e52879b42599a3e903bf0-20260723163235-ckaby.jpg"); background-size: cover; background-origin: content-box; background-position: center top; background-repeat: repeat; background-attachment: scroll;filter: brightness(91%);}#GROUP204{width: 511px; height: 166px;top: 457.5px; left: -41.166px;}#GROUP204.ladi-animation > .ladi-group{animation-name: fadeIn; animation-delay: 1s; animation-duration: 1s; animation-iteration-count: 1;}#HEADLINE258,#HEADLINE350{width: 464px;}#HEADLINE258 > .ladi-headline,#HEADLINE350 > .ladi-headline{font-family: 'Ralsihten'; font-size: 65px; line-height: 1.6; color: rgb(255, 255, 255); text-align: center;}#HEADLINE350{top: 62px; left: 47px;}#SECTION23{height: 764px;}#BOX79{width: 420px; height: 763px;top: 1px; left: 0px;}#IMAGE239{width: 119.33px; height: 88.483px;top: 18.7px; left: 291px;}#IMAGE239 > .ladi-image > .ladi-image-background{width: 414.814px; height: 414.815px;top: -115.271px; left: -180.213px;background-image: url("https://w.ladicdn.com/s750x750/69b247cf4f6ddc0012f0ce55/elements-thiep-17-20260723043335-d3sit.png");}#IMAGE246{width: 200px; height: 113.7px;top: 490.3px; left: 659px;}#IMAGE246 > .ladi-image > .ladi-image-background{width: 200px; height: 366.4px;top: 55px; left: -6px;background-image: url("https://w.ladicdn.com/s550x700/69b247cf4f6ddc0012f0ce55/thiep-phuong-anh-element_0034_3-20250930175154-0qzlj-20260410154609-hfizv.png");}#IMAGE246 > .ladi-image{transform: rotate(180deg); filter: hue-rotate(124deg);}#IMAGE271{width: 218.735px; height: 174.889px;top: 21.7px; left: -25.735px;}#IMAGE271 > .ladi-image > .ladi-image-background{width: 504.75px; height: 350.521px;top: 1.91756px; left: -2.71703px;}#IMAGE271 > .ladi-image > .ladi-image-background,#IMAGE276 > .ladi-image > .ladi-image-background{background-image: url("https://w.ladicdn.com/s850x700/69b247cf4f6ddc0012f0ce55/untitled_artwork-1-20260724161904-anzsy.png");}#IMAGE271 > .ladi-image{transform: perspective(1000px) rotate(270deg) rotateY(180deg);}#IMAGE240{width: 189.134px; height: 176px;top: 18.7px; left: -52.104px;}#IMAGE240 > .ladi-image > .ladi-image-background{width: 267.94px; height: 264px;top: -61.7313px; left: -27.582px;background-image: url("https://w.ladicdn.com/s600x600/69b247cf4f6ddc0012f0ce55/elements-thiep-18-20260723043335-ueahl.png");}#GROUP190,#IMAGE237{width: 227.378px; height: 226px;}#GROUP190{top: 78.76px; left: 25px;}#IMAGE237 > .ladi-image > .ladi-image-background{width: 278.366px; height: 276.988px;top: -26.1829px; left: -28.939px;background-image: url("https://w.ladicdn.com/s600x600/69b247cf4f6ddc0012f0ce55/elements-thiep-21-20260723043659-q0sm0.png");}#BOX80{width: 185.921px; height: 187.034px;top: 19.2991px; left: 17.9453px;}#BOX80 > .ladi-box{background-image: url("https://w.ladicdn.com/s500x500/69b247cf4f6ddc0012f0ce55/1784774421170_3379540865962086579_g2668429489759155549_987364ad977145acecd0b9ccee916950-20260723163343-c0hna.jpg"); background-size: cover; background-origin: content-box; background-position: center top; background-repeat: repeat; background-attachment: scroll;transform: rotate(-4deg);}#GROUP191,#IMAGE238{width: 206.166px; height: 206.24px;}#GROUP191{top: 123.26px; left: 201px;}#IMAGE238 > .ladi-image > .ladi-image-background{width: 243.761px; height: 246.189px;top: -13.3402px; left: -20.6166px;background-image: url("https://w.ladicdn.com/s550x550/69b247cf4f6ddc0012f0ce55/elements-thiep-22-20260723043659-i1icc.png");}#BOX81{width: 171.616px; height: 171.617px;top: 15.8373px; left: 18.4773px;}#BOX81 > .ladi-box{background-image: url("https://w.ladicdn.com/s500x500/69b247cf4f6ddc0012f0ce55/1784774421188_3379540865962086579_g2668429489759155549_fe35cc6df98c1db7d8bc02d16a94ec2b-20260723163344-wkfcw.jpg"); background-size: cover; background-origin: content-box; background-position: center top; background-repeat: repeat; background-attachment: scroll;transform: rotate(3deg);}#IMAGE272{width: 142.929px; height: 181.889px;top: 620px; left: 277.071px;}#IMAGE272 > .ladi-image > .ladi-image-background{width: 376.301px; height: 261.321px;top: -108.019px; left: -234.041px;background-image: url("https://w.ladicdn.com/s700x600/69b247cf4f6ddc0012f0ce55/untitled_artwork-1-20260724161904-anzsy.png");}#GROUP161{width: 531px; height: 280.667px;top: 428.367px; left: -50.104px;}#HEADLINE279,#HEADLINE282{width: 311px;}#HEADLINE279{top: 132px; left: 108.425px;}#HEADLINE279 > .ladi-headline{font-family: 'Hastegi'; font-size: 17px; line-height: 1.6; color: rgb(155, 52, 61); text-align: center;}#HEADLINE280{width: 531px;top: 162px; left: 0px;}#HEADLINE280 > .ladi-headline{font-family: 'Hastegi'; font-size: 19px; font-weight: bold; line-height: 1.6; color: rgb(155, 52, 61); text-transform: uppercase; text-align: center;}#HEADLINE281{width: 398px;top: 200px; left: 67.5px;}#HEADLINE281 > .ladi-headline{font-family: 'Hastegi'; font-size: 15px; line-height: 1.6; color: rgb(155, 52, 61); text-align: center;}#GROUP162{width: 311px; height: 43.9996px;top: 236.667px; left: 111px;}#GROUP162.ladi-animation > .ladi-group{animation-name: pulse; animation-delay: 1s; animation-duration: 1s; animation-iteration-count: infinite;}#IMAGE206,#IMAGE206 > .ladi-image > .ladi-image-background{width: 15.714px; height: 21.9996px;}#IMAGE206{top: 0px; left: 147.643px;}#IMAGE206 > .ladi-image > .ladi-image-background{background-image: url("https://w.ladicdn.com/s350x350/69b247cf4f6ddc0012f0ce55/icon-20260324140918-giyhc-20260419105542-__jwz.png");}#HEADLINE282{top: 21.9996px; left: 0px;}#HEADLINE282 > .ladi-headline{font-family: 'Hastegi'; font-size: 14px; line-height: 1.6; color: rgb(155, 52, 61); text-transform: uppercase; text-align: center;}#HEADLINE283{width: 414px;top: 0px; left: 55.5px;}#HEADLINE283 > .ladi-headline{font-family: 'Hastegi'; font-size: 17px; line-height: 1.6; color: rgb(155, 52, 61); text-transform: uppercase; text-align: center;}#GROUP163{width: 408px; height: 141px;top: 35px; left: 57.5px;}#GROUP164,#GROUP165{width: 200px; height: 60px;}#GROUP164{top: 29px; left: 0px;}#LINE34,#LINE35,#LINE36,#LINE37{width: 114px;}#LINE34,#LINE36{top: 0px; left: 48px;}#LINE35,#LINE37{top: 43px; left: 48px;}#HEADLINE284,#HEADLINE285,#HEADLINE286,#HEADLINE97,#HEADLINE99,#HEADLINE100{width: 200px;}#HEADLINE284,#HEADLINE285{top: 17px; left: 0px;}#HEADLINE284 > .ladi-headline,#HEADLINE285 > .ladi-headline{font-family: 'Hastegi'; font-size: 20px; line-height: 1.6; color: rgb(155, 52, 61); text-transform: uppercase; text-align: center;}#GROUP165{top: 29px; left: 208px;}#HEADLINE286{top: 0px; left: 111px;}#HEADLINE286 > .ladi-headline{font-family: 'Hastegi'; font-size: 88px; line-height: 1.6; color: rgb(155, 52, 61); text-transform: uppercase; text-align: center;}#IMAGE278{width: 350.483px; height: 145.483px;top: 262.093px; left: 39.0925px;}#IMAGE278 > .ladi-image > .ladi-image-background{width: 350.483px; height: 354.483px;top: -82px; left: -2px;background-image: url("https://w.ladicdn.com/s700x700/69b247cf4f6ddc0012f0ce55/elements-thiep-23-20260724164451-n06q3.png");}#SECTION15{height: 765.005px;}#IMAGE94{width: 420px; height: 769.609px;top: -2px; left: 0px;}#IMAGE94 > .ladi-image > .ladi-image-background{width: 1154.41px; height: 769.609px;top: 2px; left: -327px;background-image: url("https://w.ladicdn.com/s1500x1100/69b247cf4f6ddc0012f0ce55/1784774420902_3379540865962086579_g2668429489759155549_a0ec76fc41ab4cb7fe89b922273e566b-20260723164135-vgsle.jpg");}#GROUP192,#BOX82{width: 332.295px; height: 219px;}#GROUP192{top: 133.7px; left: 38.1965px;}#BOX82 > .ladi-box{background-color: rgb(241, 243, 244);}#BOX82 > .ladi-box,#BOX83 > .ladi-box{transform: rotate(-7deg);}#BOX83{width: 312.89px; height: 200.519px;top: 8.31646px; left: 9.70253px;}#BOX83 > .ladi-box{background-image: url("https://w.ladicdn.com/s650x550/69b247cf4f6ddc0012f0ce55/1784774421282_3379540865962086579_g2668429489759155549_b51099674a1a446418e09c1ce9583f82-20260723163459-8uaxv.jpg"); background-size: cover; background-origin: content-box; background-position: center top; background-repeat: repeat; background-attachment: scroll;}#GROUP196{width: 387.455px; height: 212px;top: 352.7px; left: 32.545px;}#GROUP196.ladi-animation > .ladi-group{animation-name: fadeInUp; animation-delay: 1.2s; animation-duration: 1.2s; animation-iteration-count: 1;}#BOX84{width: 321.674px; height: 212px;top: 0px; left: 29.6515px;}#BOX84 > .ladi-box{background-color: rgb(255, 231, 237);}#BOX84 > .ladi-box,#HEADLINE115 > .ladi-headline,#HEADLINE220 > .ladi-headline,#HEADLINE221 > .ladi-headline,#HEADLINE222 > .ladi-headline,#HEADLINE223 > .ladi-headline{transform: rotate(7deg);}#GROUP195{width: 387.455px; height: 197px;}#LINE14{width: 242px;top: 121px; left: 62.455px;}#LINE14 > .ladi-line > .ladi-line-container{border-top: 2px solid rgb(155, 52, 61); border-right: 2px solid rgb(155, 52, 61); border-bottom: 2px solid rgb(155, 52, 61); border-left: 0px !important;}#LINE14 > .ladi-line{transform: rotate(7deg); padding: 8px 0px;}#HEADLINE115{width: 381px;top: 0px; left: 6.455px;}#HEADLINE115 > .ladi-headline{font-family: 'UVNHoaTay'; font-size: 43.86px; line-height: 1.6; color: rgb(155, 52, 61); text-align: center;}#GROUP116,#GROUP118{width: 209px; height: 123px;}#GROUP116{top: 58px; left: 0px;}#GROUP116.ladi-animation > .ladi-group{animation-name: fadeInUp; animation-delay: 1.2s; animation-duration: 1.3s; animation-iteration-count: 1;}#BOX41,#BOX43{width: 8.5px; height: 8.5px;}#BOX41{top: 59.25px; left: 107.205px;}#BOX41 > .ladi-box,#BOX43 > .ladi-box{border-width: 2px; border-radius: 90px; border-color: rgb(0, 0, 0);}#BOX41 > .ladi-box,#BOX43 > .ladi-box,#FORM4 .ladi-form [data-form-checkout-item="product"] .ladi-form-checkout-payment-check.multiple.checked:before,#FORM4 .ladi-form [data-form-checkout-item="product"] .ladi-form-checkout-payment-check:not(.multiple).checked:before,#FORM4 .ladi-form [data-form-checkout-item="payment"] .ladi-form-checkout-payment-check.checked:before,#FORM4 .ladi-form [data-form-checkout-item="fee_shipping"] .ladi-form-checkout-payment-check.checked:before,#FORM4 .ladi-form-item-container .ladi-form-quantity .button,#FORM4 .ladi-form [data-form-checkout-item="coupon_code"] .content-discount-block .placeholder i,#FORM4 .ladi-form-checkout-payment-quantity .up:before,#FORM4 .ladi-form-checkout-payment-quantity .down:before,#FORM4 [data-form-checkout-item="payment"] .ladi-form-item .ladi-form-checkout-payment-content div:before,#BUTTON5 > .ladi-button > .ladi-button-background{background-color: rgb(155, 52, 61);}#IMAGE126{top: 0px; left: 93.455px;}#IMAGE126 > .ladi-image > .ladi-image-background{width: 134.164px; height: 134.164px;top: -37.9863px; left: -37.1781px;background-image: url("https://w.ladicdn.com/s450x450/69b247cf4f6ddc0012f0ce55/elements-thiep-9-20260722120523-a4d--.png");}#IMAGE126 > .ladi-image,#IMAGE131 > .ladi-image{transform: rotate(7deg); filter: hue-rotate(124deg);}#GROUP115{width: 209px; height: 47px;top: 76px; left: 0px;}#HEADLINE220{width: 143px;top: 0px; left: 38px;}#HEADLINE220 > .ladi-headline,#HEADLINE222 > .ladi-headline{font-family: 'Hastegi'; font-size: 16px; line-height: 1.6; color: rgb(155, 52, 61); text-transform: uppercase; text-align: center;}#HEADLINE221,#HEADLINE222,#HEADLINE223{width: 209px;}#HEADLINE221{top: 26px; left: 0px;}#HEADLINE221 > .ladi-headline,#HEADLINE223 > .ladi-headline,#HEADLINE292 > .ladi-headline{font-family: 'Hastegi'; font-size: 13px; line-height: 1.6; color: rgb(155, 52, 61); text-align: center;}#GROUP118{top: 74px; left: 133.325px;}#GROUP118.ladi-animation > .ladi-group{animation-name: fadeInUp; animation-delay: 1.3s; animation-duration: 1.3s; animation-iteration-count: 1;}#IMAGE131{width: 56px; height: 56px;top: 0px; left: 88px;}#IMAGE131 > .ladi-image > .ladi-image-background{width: 119.102px; height: 119.102px;top: -30.7431px; left: -30.8244px;background-image: url("https://w.ladicdn.com/s450x450/69b247cf4f6ddc0012f0ce55/elements-thiep-11-20260722120615-pouzt.png");}#BOX43{top: 60px; left: 107.75px;}#GROUP117{width: 209px; height: 49px;top: 74px; left: 0px;}#HEADLINE223{top: 28px; left: 0px;}#BOX88{width: 420px; height: 161.396px;top: 607.609px; left: 0px;}#BOX88 > .ladi-box{background-image: linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(2, 2, 2, 0.66) 100%); background-color: initial; background-size: initial; background-origin: initial; background-position: initial; background-repeat: initial; background-attachment: initial;-webkit-background-clip: initial;}#GROUP169{width: 410px; height: 110px;top: 623.005px; left: 5px;}#HEADLINE288{width: 410px;}#HEADLINE288 > .ladi-headline{font-family: 'Ergisa'; font-size: 33px; line-height: 1.6; color: rgb(255, 255, 255); text-align: center;}#GROUP170,#COUNTDOWN5{width: 320px; height: 57px;}#GROUP170{top: 53px; left: 52px;}#GROUP170.ladi-animation > .ladi-group{animation-name: flash; animation-delay: 1s; animation-duration: 3.5s; animation-iteration-count: infinite;}#COUNTDOWN5 > .ladi-countdown{font-family: 'Hastegi'; font-size: 40px; font-weight: bold; color: rgb(255, 255, 255); text-align: center;}#COUNTDOWN5 > .ladi-countdown > .ladi-element{width: 25%; height: 100%;}#HEADLINE289,#HEADLINE290,#HEADLINE291{width: 32px;}#HEADLINE289{top: 3.5px; left: 75.9998px;}#HEADLINE289 > .ladi-headline,#HEADLINE290 > .ladi-headline,#HEADLINE291 > .ladi-headline{font-size: 25px; font-weight: bold; line-height: 1.6; color: rgb(255, 255, 255); text-align: left;}#HEADLINE290{top: 3.5px; left: 153px;}#HEADLINE291{top: 3.5px; left: 234px;}#SECTION13{height: 656.8px;}#BOX31{width: 420px; height: 688.8px;}#HEADLINE278{width: 555px;top: 34.495px; left: -61.166px;}#HEADLINE278 > .ladi-headline{font-family: 'UVNHoaTay'; font-size: 56px; line-height: 1.6; color: rgb(155, 52, 61); text-align: center;}#IMAGE273{width: 205.76px; height: 142.889px;top: 537.251px; left: 0px;}#IMAGE273 > .ladi-image > .ladi-image-background{width: 444.278px; height: 308.525px;top: -162.551px; left: 1.0288px;background-image: url("https://w.ladicdn.com/s750x650/69b247cf4f6ddc0012f0ce55/untitled_artwork-1-20260724161904-anzsy.png");}#IMAGE274{width: 286.4px; height: 198.889px;top: 463.748px; left: 133.6px;}#IMAGE274 > .ladi-image > .ladi-image-background{width: 618.395px; height: 429.441px;top: -226.256px; left: 1.432px;background-image: url("https://w.ladicdn.com/s950x750/69b247cf4f6ddc0012f0ce55/untitled_artwork-1-20260724161904-anzsy.png");}#GROUP176,#IMAGE216{width: 323.166px; height: 437.484px;}#GROUP176{top: 129.882px; left: 48.417px;}#GROUP176.ladi-animation > .ladi-group{animation-name: flipInY; animation-delay: 1s; animation-duration: 1s; animation-iteration-count: 1;}#IMAGE216 > .ladi-image > .ladi-image-background{width: 459.394px; height: 460.233px;top: -4.94731px; left: -60.958px;background-image: url("https://w.ladicdn.com/s800x800/69b247cf4f6ddc0012f0ce55/elements-thiep-8-20260722112936-_cok1.png");}#GROUP206{width: 292px; height: 350.093px;top: 34.4715px; left: 15.583px;}#HEADLINE293{width: 244px;top: 262px; left: 12.821px;}#HEADLINE293 > .ladi-headline{font-family: 'UVNHoaTay'; font-size: 15px; font-weight: bold; line-height: 1.6; color: rgb(155, 52, 61); text-align: center;}#HEADLINE292{width: 292px;}#IMAGE220{width: 112.832px; height: 31.593px;top: 318.5px; left: 89.584px;}#IMAGE220 > .ladi-image > .ladi-image-background{width: 174.89px; height: 174.89px;top: -3.38496px; left: -38.363px;background-image: url("https://w.ladicdn.com/s500x500/69b247cf4f6ddc0012f0ce55/elements-thiep-3-20260722104234-bju2l.png");}#IMAGE220 > .ladi-image,#IMAGE260 > .ladi-image{filter: hue-rotate(123deg);}#GROUP171,#IMAGE218,#IMAGE218 > .ladi-image > .ladi-image-background{width: 137.5px; height: 206.8px;}#GROUP171{top: 402.866px; left: 291.5px;}#GROUP171.ladi-animation > .ladi-group{animation-name: rotateInDownRight; animation-delay: 1.2s; animation-duration: 1.2s;}#IMAGE218 > .ladi-image > .ladi-image-background{background-image: url("https://w.ladicdn.com/s450x550/69b247cf4f6ddc0012f0ce55/thiep-ng-anh-element_0017_8-20251010190009-nhnpd-20260719163851-kns-a.png");}#IMAGE218 > .ladi-image{transform: rotate(9deg);}#BOX63{width: 116px; height: 152px;top: 18px; left: 12.75px;}#BOX63 > .ladi-box{background-image: url("https://w.ladicdn.com/s450x500/69b247cf4f6ddc0012f0ce55/1784774421263_3379540865962086579_g2668429489759155549_8ee5c45ee5a08ba393a4a2ec8db2f7ab-20260723163500-2ay81.jpg"); background-size: cover; background-origin: content-box; background-position: center center; background-repeat: repeat; background-attachment: scroll;transform: rotate(12deg);}#IMAGE217{width: 76.0421px; height: 86px;top: 101.366px; left: 333.362px;}#IMAGE217 > .ladi-image > .ladi-image-background{width: 183.768px; height: 181.958px;top: -33.4947px; left: -60.6526px;background-image: url("https://w.ladicdn.com/s500x500/69b247cf4f6ddc0012f0ce55/elements-thiep-6-20260722110649-uratr.png");}#IMAGE217.ladi-animation > .ladi-image{animation-name: fadeInUp; animation-delay: 1.1s; animation-duration: 1.1s; animation-iteration-count: 1;}#SECTION24{height: 750.1px;}#BOX86{width: 420px; height: 718.1px;top: 32px; left: 0px;}#GROUP202,#IMAGE259,#IMAGE259 > .ladi-image > .ladi-image-background{width: 324.041px; height: 479.2px;}#GROUP202{top: 171.295px; left: 47.9795px;}#IMAGE259 > .ladi-image > .ladi-image-background{background-image: url("https://w.ladicdn.com/s650x800/69b247cf4f6ddc0012f0ce55/sn-ha-vi-copy_0003_28-20260409163115-cr2wh-20260723051213-v9hei.png");}#GALLERY4{width: 299.671px; height: 392.755px;top: 16.101px; left: 12.185px;}#GALLERY4 > .ladi-gallery{border-width: 1px; border-style: solid; border-color: rgba(255, 255, 255, 0);}#GALLERY4 .ladi-gallery .ladi-gallery-view .ladi-gallery-view-arrow,#GALLERY4 .ladi-gallery .ladi-gallery-control .ladi-gallery-control-arrow{background-image: url("data:image/svg+xml;utf8, %3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22rgba(255%2C%20255%2C%20255%2C%201)%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7.00015%200.585938L18.4144%2012.0002L7.00015%2023.4144L5.58594%2022.0002L15.5859%2012.0002L5.58594%202.00015L7.00015%200.585938Z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E");}#GALLERY4 > .ladi-gallery > .ladi-gallery-view{height: calc(100% + 0px);}#GALLERY4 > .ladi-gallery > .ladi-gallery-control,#SECTION_POPUP{height: 0px;}#GALLERY4 > .ladi-gallery > .ladi-gallery-control{display: none;}#GALLERY4 > .ladi-gallery > .ladi-gallery-control > .ladi-gallery-control-box > .ladi-gallery-control-item{width: 0px; height: 0px;margin-right: 0px;}#GALLERY4 .ladi-gallery .ladi-gallery-view-item[data-index="0"]{background-image: url("https://w.ladicdn.com/s600x700/69b247cf4f6ddc0012f0ce55/1784774421207_3379540865962086579_g2668429489759155549_71b2b5cc2bcacd5f768e5326672dd240-20260723164950-hh5qm.jpg");}#GALLERY4 .ladi-gallery .ladi-gallery-control-item[data-index="0"]{background-image: url("https://w.ladicdn.com/s400x400/69b247cf4f6ddc0012f0ce55/1784774421207_3379540865962086579_g2668429489759155549_71b2b5cc2bcacd5f768e5326672dd240-20260723164950-hh5qm.jpg");}#GALLERY4 .ladi-gallery .ladi-gallery-view-item[data-index="1"]{background-image: url("https://w.ladicdn.com/s600x700/69b247cf4f6ddc0012f0ce55/1784774420787_3379540865962086579_g2668429489759155549_a8531f9f1720db53f2fcb1f991cb04ac-20260723164950-axhdc.jpg");}#GALLERY4 .ladi-gallery .ladi-gallery-control-item[data-index="1"]{background-image: url("https://w.ladicdn.com/s400x400/69b247cf4f6ddc0012f0ce55/1784774420787_3379540865962086579_g2668429489759155549_a8531f9f1720db53f2fcb1f991cb04ac-20260723164950-axhdc.jpg");}#GALLERY4 .ladi-gallery .ladi-gallery-view-item[data-index="2"]{background-image: url("https://w.ladicdn.com/s600x700/69b247cf4f6ddc0012f0ce55/1784774420769_3379540865962086579_g2668429489759155549_866381819e8cf33e46b29372d0ecc246-20260723164949-3rnhh.jpg");}#GALLERY4 .ladi-gallery .ladi-gallery-control-item[data-index="2"]{background-image: url("https://w.ladicdn.com/s400x400/69b247cf4f6ddc0012f0ce55/1784774420769_3379540865962086579_g2668429489759155549_866381819e8cf33e46b29372d0ecc246-20260723164949-3rnhh.jpg");}#GALLERY4 .ladi-gallery .ladi-gallery-view-item[data-index="3"]{background-image: url("https://w.ladicdn.com/s600x700/69b247cf4f6ddc0012f0ce55/1784774420807_3379540865962086579_g2668429489759155549_d7f1e73197f6161b0e5c8962da2bf832-20260723164949-eankz.jpg");}#GALLERY4 .ladi-gallery .ladi-gallery-control-item[data-index="3"]{background-image: url("https://w.ladicdn.com/s400x400/69b247cf4f6ddc0012f0ce55/1784774420807_3379540865962086579_g2668429489759155549_d7f1e73197f6161b0e5c8962da2bf832-20260723164949-eankz.jpg");}#GALLERY4 .ladi-gallery .ladi-gallery-view-item[data-index="4"]{background-image: url("https://w.ladicdn.com/s600x700/69b247cf4f6ddc0012f0ce55/1784774421151_3379540865962086579_g2668429489759155549_829e3ab52a38144b274932bbc50fc518-20260723164948-x1e4a.jpg");}#GALLERY4 .ladi-gallery .ladi-gallery-control-item[data-index="4"]{background-image: url("https://w.ladicdn.com/s400x400/69b247cf4f6ddc0012f0ce55/1784774421151_3379540865962086579_g2668429489759155549_829e3ab52a38144b274932bbc50fc518-20260723164948-x1e4a.jpg");}#GALLERY4 .ladi-gallery .ladi-gallery-view-item[data-index="5"]{background-image: url("https://w.ladicdn.com/s600x700/69b247cf4f6ddc0012f0ce55/1784774420826_3379540865962086579_g2668429489759155549_4a910fce4a34907ad9caa4de0cc772c6-20260723164947-cpzu1.jpg");}#GALLERY4 .ladi-gallery .ladi-gallery-control-item[data-index="5"]{background-image: url("https://w.ladicdn.com/s400x400/69b247cf4f6ddc0012f0ce55/1784774420826_3379540865962086579_g2668429489759155549_4a910fce4a34907ad9caa4de0cc772c6-20260723164947-cpzu1.jpg");}#GALLERY4 .ladi-gallery .ladi-gallery-view-item[data-index="6"]{background-image: url("https://w.ladicdn.com/s600x700/69b247cf4f6ddc0012f0ce55/1784774420939_3379540865962086579_g2668429489759155549_a9f03c151e1df85e97b4a897055c790e-20260723164946-ncrq-.jpg");}#GALLERY4 .ladi-gallery .ladi-gallery-control-item[data-index="6"]{background-image: url("https://w.ladicdn.com/s400x400/69b247cf4f6ddc0012f0ce55/1784774420939_3379540865962086579_g2668429489759155549_a9f03c151e1df85e97b4a897055c790e-20260723164946-ncrq-.jpg");}#GALLERY4 .ladi-gallery .ladi-gallery-view-item[data-index="7"]{background-image: url("https://w.ladicdn.com/s600x700/69b247cf4f6ddc0012f0ce55/1784774421017_3379540865962086579_g2668429489759155549_5e2aee26215ce6ed515ab40ccac24cba-20260723164945-eb5-b.jpg");}#GALLERY4 .ladi-gallery .ladi-gallery-control-item[data-index="7"]{background-image: url("https://w.ladicdn.com/s400x400/69b247cf4f6ddc0012f0ce55/1784774421017_3379540865962086579_g2668429489759155549_5e2aee26215ce6ed515ab40ccac24cba-20260723164945-eb5-b.jpg");}#GALLERY4 .ladi-gallery .ladi-gallery-view-item[data-index="8"]{background-image: url("https://w.ladicdn.com/s600x700/69b247cf4f6ddc0012f0ce55/1784774420692_3379540865962086579_g2668429489759155549_447e39fa2a253bf228822ae2776ff3dd-20260723164945-_exf6.jpg");}#GALLERY4 .ladi-gallery .ladi-gallery-control-item[data-index="8"]{background-image: url("https://w.ladicdn.com/s400x400/69b247cf4f6ddc0012f0ce55/1784774420692_3379540865962086579_g2668429489759155549_447e39fa2a253bf228822ae2776ff3dd-20260723164945-_exf6.jpg");}#IMAGE260{width: 246.416px; height: 68.9966px;top: 663.103px; left: 86.7925px;}#IMAGE260 > .ladi-image > .ladi-image-background{width: 381.946px; height: 381.946px;top: -7.39248px; left: -83.7817px;background-image: url("https://w.ladicdn.com/s700x700/69b247cf4f6ddc0012f0ce55/elements-thiep-3-20260722104234-bju2l.png");}#IMAGE275{width: 62.2037px; height: 58.0937px;top: 145.348px; left: 186.11px;}#IMAGE275 > .ladi-image > .ladi-image-background{width: 114.705px; height: 114.705px;top: -30.8165px; left: -23.9684px;}#HEADLINE351{width: 498px;top: 590.55px; left: -39.0205px;}#HEADLINE351 > .ladi-headline{font-family: 'MorginaItalic'; font-size: 30.59px; font-weight: bold; line-height: 1.6; color: rgb(155, 52, 61); text-align: center;}#IMAGE276{width: 236px; height: 163.889px;top: 23.34px; left: 0px;}#IMAGE276 > .ladi-image > .ladi-image-background{width: 509.572px; height: 353.868px;top: -186.441px; left: 1.18px;}#IMAGE277{width: 267.547px; height: 171.229px;top: 5.837px; left: 152.453px;}#IMAGE277 > .ladi-image > .ladi-image-background{width: 577.688px; height: 401.172px;top: -211.362px; left: 1.33773px;background-image: url("https://w.ladicdn.com/s900x750/69b247cf4f6ddc0012f0ce55/untitled_artwork-1-20260724161904-anzsy.png");}#IMAGE277 > .ladi-image{transform: rotate(180deg);}#HEADLINE344{width: 317px;top: 56.066px; left: 112px;}#HEADLINE344 > .ladi-headline{font-family: 'Daytonica'; font-size: 52px; line-height: 1.6; color: rgb(155, 52, 61); text-align: center;}#HEADLINE343{width: 280px;top: 16.566px; left: 35.895px;}#HEADLINE343 > .ladi-headline{font-family: 'NVNErotique'; font-size: 58px; font-weight: bold; line-height: 1.6; color: rgb(155, 52, 61); text-transform: uppercase; text-align: left;}#SECTION11{height: 384px;}#BOX87{width: 420px; height: 384px;}#HEADLINE93{width: 375px;top: 7px; left: 22.5px;}#HEADLINE93 > .ladi-headline{font-family: 'Hastegi'; font-size: 14.24px; line-height: 1.6; color: rgb(155, 52, 61); text-align: center;}#FORM4{width: 353.139px; height: 232px;top: 111.122px; left: 33.4305px;}#FORM4 > .ladi-form{font-family: 'Hastegi'; font-size: 12px; line-height: 1.6; color: rgb(155, 52, 61);}#FORM4 .ladi-form .ladi-form-checkout-payment-item{--check-size: calc(12px * 1.5); --width-quantity: calc(12px * 2.5 + 30px);}#FORM4 .ladi-form .ladi-form-item.ladi-form-checkbox .ladi-form-checkbox-item span[data-checked="false"],#FORM4 .ladi-form .ladi-form-item.ladi-form-checkbox .ladi-form-checkbox-item .ladi-editing,#FORM4 .ladi-form .ladi-form-item.ladi-form-checkbox .ladi-form-checkbox-item .ladi-editing::placeholder,#FORM4 .ladi-form .ladi-survey-option .ladi-survey-option-label,#FORM4 .ladi-form-item .ladi-form-control::placeholder,#FORM4 .ladi-form-item select.ladi-form-control[data-selected=""],#FORM4 .ladi-form-checkout-payment-quantity input{color: rgb(155, 52, 61);}#FORM4:hover .overlay-checkout{display: flex !important;}#FORM4 .ladi-form-item{padding-left: 5px; padding-right: 5px;}#FORM4 .ladi-form-item.otp-countdown:before{right: 10px;}#FORM4 .ladi-form-item.ladi-form-checkbox{padding-left: 10px; padding-right: 10px;}#FORM4 .ladi-form-item-container .ladi-form-item .ladi-form-control-select{background-image: url("data:image/svg+xml;utf8, %3Csvg%20width%3D%2232%22%20height%3D%2224%22%20viewBox%3D%220%200%2032%2024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpolygon%20points%3D%220%2C0%2032%2C0%2016%2C24%22%20style%3D%22fill%3A%20rgb(155%2C%2052%2C%2061)%22%3E%3C%2Fpolygon%3E%3C%2Fsvg%3E");}#FORM4 .ladi-survey-option{text-align: left;}#FORM4 .ladi-form-item-container,#FORM4 .ladi-form-checkout-box,#FORM4 .ladi-form-checkout-bump-offer-product,#FORM4 .ladi-form-label-container .ladi-form-label-item{border-width: 1px; border-radius: 22px; border-style: solid; border-color: rgb(155, 52, 61);}#FORM4 .ladi-form-item-container .ladi-form-item.ladi-form-quantity{width: calc(100% + 1px);}#FORM4 .ladi-form [data-form-checkout-item="total_price"] .space,#FORM4 .ladi-form-checkout-payment-quantity input{border-color: rgb(155, 52, 61);}#FORM4 .ladi-form-checkout-payment-quantity input{width: 65px;}#FORM4 .ladi-form-item-background{border-radius: 21px;background-color: rgba(255, 255, 255, 0);}#BUTTON5{width: 353.139px; height: 35.4118px;top: 196.588px; left: 0px;}#BUTTON5 > .ladi-button > .ladi-button-background{opacity: 0.88;}#BUTTON5 > .ladi-button{border-radius: 22px;}#BUTTON_TEXT5{width: 353px;top: 10.2176px; left: 0px;}#BUTTON_TEXT5 > .ladi-headline{font-family: 'Hastegi'; font-size: 17px; font-weight: bold; line-height: 1.6; color: rgb(255, 255, 255); text-align: center;}#FORM_ITEM13{width: 353.139px; height: 39.7353px;}#FORM_ITEM13 .ladi-form-item,#FORM_ITEM14 .ladi-form-item,#FORM_ITEM15 .ladi-form-item{background-image: none !important;}#FORM_ITEM14{width: 353.139px; height: 90.5291px;top: 49.9529px; left: 0px;}#FORM_ITEM15{width: 353.139px; height: 35px;top: 150.482px; left: 0px;}#SECTION12{height: 321px;}#SECTION12 > .ladi-section-background{filter: hue-rotate(55deg);}#BOX26{width: 420px; height: 292px;}#BOX26 > .ladi-box{background-image: url("https://w.ladicdn.com/s750x600/69b247cf4f6ddc0012f0ce55/1784774421226_3379540865962086579_g2668429489759155549_67374fa20fb5dc9eecc3b6f189ef526d-20260723165006-li8sm.jpg"); background-size: cover; background-origin: content-box; background-position: center center; background-repeat: repeat; background-attachment: scroll;filter: brightness(66%);}#HEADLINE92,#HEADLINE94{width: 403px;}#HEADLINE92{top: 144.886px; left: 8.5px;}#HEADLINE92 > .ladi-headline{font-family: 'Hastegi'; font-size: 14.24px; line-height: 1.6; color: rgb(255, 255, 255); text-align: center;}#HEADLINE94{top: 212.886px; left: 17px;}#HEADLINE94 > .ladi-headline{font-family: 'UVNHoaTay'; font-size: 40px; line-height: 1.6; color: rgb(255, 255, 255); text-align: center;}#GROUP158{width: 402px; height: 27px;top: 293px; left: 9px;}#GROUP157{width: 338.25px; height: 27px;}#HEADLINE271{width: 291px;}#HEADLINE271 > .ladi-headline{font-family: 'Hastegi'; font-size: 17px; line-height: 1.6; color: rgb(155, 52, 61); text-align: left;}#IMAGE192,#IMAGE192 > .ladi-image > .ladi-image-background,#IMAGE193,#IMAGE193 > .ladi-image > .ladi-image-background,#IMAGE194,#IMAGE194 > .ladi-image > .ladi-image-background{width: 25.75px; height: 25.75px;}#IMAGE192{top: 0px; left: 312.5px;}#IMAGE192 > .ladi-image > .ladi-image-background{background-image: url("https://w.ladicdn.com/s350x350/69b247cf4f6ddc0012f0ce55/cd2e9935902867e76efbc4148ddb247e-20260420021708-csxqc.jpg");}#IMAGE192 > .ladi-image,#IMAGE193 > .ladi-image,#IMAGE194 > .ladi-image{border-radius: 2px;}#IMAGE192 > .ladi-image{filter: brightness(114%);}#IMAGE193{top: 0px; left: 344.5px;}#IMAGE193 > .ladi-image > .ladi-image-background{background-image: url("https://w.ladicdn.com/s350x350/69b247cf4f6ddc0012f0ce55/fb274227765103cbaf48900263276c81-20260420022328-sa30m.jpg");}#IMAGE193 > .ladi-image{filter: brightness(88%) hue-rotate(19deg);}#IMAGE194{top: 0px; left: 376.25px;}#IMAGE194 > .ladi-image > .ladi-image-background{background-image: url("https://w.ladicdn.com/s350x350/69b247cf4f6ddc0012f0ce55/52f62f6c4d45dfe4bce7743e1bae22b3-20260420022355-vxqjm.jpg");}#IMAGE194 > .ladi-image{filter: brightness(116%);}#POPUP1{width: 420px; height: 400px;}#POPUP1,#POPUP2{right: 0px; bottom: 0px; margin: auto;}#POPUP1 > .ladi-popup > .ladi-popup-background,#POPUP2 > .ladi-popup > .ladi-popup-background{background-color: rgb(255, 255, 255);}#IMAGE68{width: 424px; height: 250.4px;top: 0px; left: -4px;}#IMAGE68 > .ladi-image > .ladi-image-background{width: 430.26px; height: 286.077px;top: -15px; left: -7px;background-image: url("https://w.ladicdn.com/s750x600/69b247cf4f6ddc0012f0ce55/1784774421226_3379540865962086579_g2668429489759155549_67374fa20fb5dc9eecc3b6f189ef526d-20260723165006-li8sm.jpg");}#HEADLINE95,#HEADLINE96{width: 351px;}#HEADLINE95{top: 277.5px; left: 39px;}#HEADLINE95 > .ladi-headline{font-family: 'Hastegi'; font-size: 14px; line-height: 1.6; color: rgb(155, 52, 61); text-align: center;}#HEADLINE96{top: 332px; left: 39px;}#HEADLINE96 > .ladi-headline{font-family: 'UVNHoaTay'; font-size: 33px; line-height: 1.6; color: rgb(155, 52, 61); text-align: center;}#POPUP2{width: 420px; height: 496px;}#IMAGE69{width: 420px; height: 277.4px;}#IMAGE69 > .ladi-image > .ladi-image-background{width: 505.731px; height: 691.84px;top: -98px; left: -49.6667px;background-image: url("https://w.ladicdn.com/s850x1000/69b247cf4f6ddc0012f0ce55/mq1a9202-copy-20260418143717-u5piu.jpg");}#IMAGE70{width: 136.546px; height: 147.4px;top: 306.3px; left: 23px;}#IMAGE70 > .ladi-image > .ladi-image-background{width: 146.116px; height: 219.174px;top: -68.3836px; left: -10.7553px;background-image: url("https://w.ladicdn.com/s450x550/69b247cf4f6ddc0012f0ce55/mq1a9263-copy-20260418141933-gwbyc.jpg");}#GROUP55{width: 298px; height: 98.2px;top: 298.3px; left: 174px;}#HEADLINE97 > .ladi-headline{font-family: 'UVNHoaTay'; font-size: 33px; line-height: 1.6; color: rgb(155, 52, 61); text-align: left;}#HEADLINE98{width: 298px;top: 53px; left: 0px;}#HEADLINE98 > .ladi-headline{font-family: 'Hastegi'; font-size: 26px; line-height: 1.6; color: rgb(155, 52, 61); text-align: left;}#LINE5{width: 228px;top: 81.2px; left: 0px;}#HEADLINE99{top: 388.7px; left: 174px;}#HEADLINE99 > .ladi-headline{font-family: 'Hastegi'; font-size: 31px; line-height: 1.6; color: rgb(155, 52, 61); text-align: left;}#HEADLINE100{top: 422.5px; left: 174px;}#HEADLINE100 > .ladi-headline{font-family: 'Hastegi'; font-size: 29px; line-height: 1.6; color: rgb(155, 52, 61); text-align: left;}
body.lazyload .ladi-overlay, body.lazyload .ladi-box, body.lazyload .ladi-button-background, body.lazyload .ladi-collection-item:before, body.lazyload .ladi-countdown-background, body.lazyload .ladi-form-item-background, body.lazyload .ladi-form-label-container .ladi-form-label-item.image, body.lazyload .ladi-frame-background, body.lazyload .ladi-gallery-view-item, body.lazyload .ladi-gallery-control-item, body.lazyload .ladi-headline, body.lazyload .ladi-image-background, body.lazyload .ladi-image-compare, body.lazyload .ladi-list-paragraph ul li:before, body.lazyload .ladi-section-background, body.lazyload .ladi-survey-option-background, body.lazyload .ladi-survey-option-image, body.lazyload .ladi-tabs-background, body.lazyload .ladi-video-background, body.lazyload .ladi-banner, body.lazyload .ladi-spin-lucky-screen, body.lazyload .ladi-spin-lucky-start {background-image: none !important;}

  .music-btn {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.4s ease, box-shadow 0.4s ease;
    background: #ffffff;
    box-shadow: 0 2px 12px rgba(0,0,0,0.12);
    z-index: 999;
    outline: none;
  }
  .music-btn.playing {
    background: #FFF3E0;
    box-shadow: 0 2px 16px rgba(255,160,0,0.25);
  }
  .music-btn svg { width: 24px; height: 24px; transition: color 0.4s; }
  .icon-muted   { display: block; color: #999; }
  .icon-playing { display: none;  color: #333; }
  .music-btn.playing .icon-muted   { display: none; }
  .music-btn.playing .icon-playing { display: block; }


#ruybang {
  transform-origin: top center;
  animation: swayRibbon 4s ease-in-out infinite;
}

@keyframes swayRibbon {
  0%, 100% {
    transform: rotate(-3deg);
  }
  50% {
    transform: rotate(3deg);
  }
}


                                
                            
@-webkit-keyframes fadeInUp {0% {opacity: 0;-webkit-transform: translateY(20px);transform: translateY(20px);}100% {opacity: 1;-webkit-transform: translateY(0);transform: translateY(0);}}@keyframes fadeInUp {0% {opacity: 0;-webkit-transform: translateY(20px);-ms-transform: translateY(20px);transform: translateY(20px);}100% {opacity: 1;-webkit-transform: translateY(0);-ms-transform: translateY(0);transform: translateY(0);}}@-webkit-keyframes fadeInRight {0% {opacity: 0;-webkit-transform: translateX(20px);transform: translateX(20px);}100% {opacity: 1;-webkit-transform: translateX(0);transform: translateX(0);}}@keyframes fadeInRight {0% {opacity: 0;-webkit-transform: translateX(40px);-ms-transform: translateX(40px);transform: translateX(40px);}100% {opacity: 1;-webkit-transform: translateX(0);-ms-transform: translateX(0);transform: translateX(0);}}@-webkit-keyframes fadeInDown {0% {opacity: 0;-webkit-transform: translateY(-20px);transform: translateY(-20px);}100% {opacity: 1;-webkit-transform: translateY(0);transform: translateY(0);}}@keyframes fadeInDown {0% {opacity: 0;-webkit-transform: translateY(-20px);-ms-transform: translateY(-20px);transform: translateY(-20px);}100% {opacity: 1;-webkit-transform: translateY(0);-ms-transform: translateY(0);transform: translateY(0);}}@-webkit-keyframes bounceInDown {0% {opacity: 0;-webkit-transform: translateY(-2000px);transform: translateY(-2000px);}60% {opacity: 1;-webkit-transform: translateY(30px);transform: translateY(30px);}80% {-webkit-transform: translateY(-10px);transform: translateY(-10px);}100% {opacity: 1;-webkit-transform: translateY(0);transform: translateY(0);}}@keyframes bounceInDown {0% {opacity: 0;-webkit-transform: translateY(-2000px);-ms-transform: translateY(-2000px);transform: translateY(-2000px);}60% {opacity: 1;-webkit-transform: translateY(30px);-ms-transform: translateY(30px);transform: translateY(30px);}80% {-webkit-transform: translateY(-10px);-ms-transform: translateY(-10px);transform: translateY(-10px);}100% {opacity: 1;-webkit-transform: translateY(0);-ms-transform: translateY(0);transform: translateY(0);}}@-webkit-keyframes swing {20% {-webkit-transform: rotate(15deg);transform: rotate(15deg);}40% {-webkit-transform: rotate(-10deg);transform: rotate(-10deg);}60% {-webkit-transform: rotate(5deg);transform: rotate(5deg);}80% {-webkit-transform: rotate(-5deg);transform: rotate(-5deg);}100% {opacity: 1;-webkit-transform: rotate(0);transform: rotate(0);}}@keyframes swing {20% {-webkit-transform: rotate(15deg);-ms-transform: rotate(15deg);transform: rotate(15deg);}40% {-webkit-transform: rotate(-10deg);-ms-transform: rotate(-10deg);transform: rotate(-10deg);}60% {-webkit-transform: rotate(5deg);-ms-transform: rotate(5deg);transform: rotate(5deg);}80% {-webkit-transform: rotate(-5deg);-ms-transform: rotate(-5deg);transform: rotate(-5deg);}100% {opacity: 1;-webkit-transform: rotate(0);-ms-transform: rotate(0);transform: rotate(0);}}@-webkit-keyframes fadeInLeft {0% {opacity: 0;-webkit-transform: translateX(-20px);transform: translateX(-20px);}100% {opacity: 1;-webkit-transform: translateX(0);transform: translateX(0);}}@keyframes fadeInLeft {0% {opacity: 0;-webkit-transform: translateX(-20px);-ms-transform: translateX(-20px);transform: translateX(-20px);}100% {opacity: 1;-webkit-transform: translateX(0);-ms-transform: translateX(0);transform: translateX(0);}}@-webkit-keyframes flipInY {0% {-webkit-transform: perspective(400px) rotateY(90deg);transform: perspective(400px) rotateY(90deg);opacity: 0;}40% {-webkit-transform: perspective(400px) rotateY(-10deg);transform: perspective(400px) rotateY(-10deg);}70% {-webkit-transform: perspective(400px) rotateY(10deg);transform: perspective(400px) rotateY(10deg);}100% {opacity: 1;-webkit-transform: perspective(400px) rotateY(0);transform: perspective(400px) rotateY(0);opacity: 1;}}@keyframes flipInY {0% {-webkit-transform: perspective(400px) rotateY(90deg);-ms-transform: perspective(400px) rotateY(90deg);transform: perspective(400px) rotateY(90deg);opacity: 0;}40% {-webkit-transform: perspective(400px) rotateY(-10deg);-ms-transform: perspective(400px) rotateY(-10deg);transform: perspective(400px) rotateY(-10deg);}70% {-webkit-transform: perspective(400px) rotateY(10deg);-ms-transform: perspective(400px) rotateY(10deg);transform: perspective(400px) rotateY(10deg);}100% {opacity: 1;-webkit-transform: perspective(400px) rotateY(0);-ms-transform: perspective(400px) rotateY(0);transform: perspective(400px) rotateY(0);opacity: 1;}}@-webkit-keyframes rotateInDownRight {0% {-webkit-transform-origin: right bottom;transform-origin: right bottom;-webkit-transform: rotate(90deg);transform: rotate(90deg);opacity: 0;}100% {opacity: 1;-webkit-transform-origin: right bottom;transform-origin: right bottom;-webkit-transform: rotate(0);transform: rotate(0);opacity: 1;}}@keyframes rotateInDownRight {0% {-webkit-transform-origin: right bottom;-ms-transform-origin: right bottom;transform-origin: right bottom;-webkit-transform: rotate(90deg);-ms-transform: rotate(90deg);transform: rotate(90deg);opacity: 0;}100% {opacity: 1;-webkit-transform-origin: right bottom;-ms-transform-origin: right bottom;transform-origin: right bottom;-webkit-transform: rotate(0);-ms-transform: rotate(0);transform: rotate(0);opacity: 1;}}@-webkit-keyframes flash {0%, 100%, 50% {opacity: 1;}25%, 75% {opacity: 0;}}@keyframes flash {0%, 100%, 50% {opacity: 1;}25%, 75% {opacity: 0;}}@-webkit-keyframes fadeIn {0% {opacity: 0;}100% {opacity: 1;}}@keyframes fadeIn {0% {opacity: 0;}100% {opacity: 1;}}@-webkit-keyframes pulse {0% {-webkit-transform: scale(1);transform: scale(1);}50% {-webkit-transform: scale(1.1);transform: scale(1.1);}100% {opacity: 1;-webkit-transform: scale(1);transform: scale(1);}}@keyframes pulse {0% {-webkit-transform: scale(1);-ms-transform: scale(1);transform: scale(1);}50% {-webkit-transform: scale(1.1);-ms-transform: scale(1.1);transform: scale(1.1);}100% {opacity: 1;-webkit-transform: scale(1);-ms-transform: scale(1);transform: scale(1);}}

.ladi-animation-hidden,
.ladi-animation,
.ladi-hidden,
[class*='ladi-animation'],
.ladi-section,
.ladi-element,
.ladi-group,
.ladi-headline,
.ladi-image,
.ladi-box,
#SECTION23,
#HEADLINE220,
#HEADLINE222,
#HEADLINE271 {
  opacity: 1 !important;
  visibility: visible !important;
  pointer-events: auto !important;
}
.ladi-image-background {
  opacity: 1 !important;
  visibility: visible !important;
}


/* Z-Index & Color fix for text and stickers visibility */
.ladi-container > .ladi-element {
  z-index: 2;
}
#BOX28, #BOX39, #BOX79, #BOX88, #BOX31, #BOX86, #BOX87, #BOX26 {
  z-index: 0 !important;
}
.ladi-group, .ladi-headline, .ladi-image, .ladi-shape, .ladi-form, .ladi-button {
  z-index: 2;
}

/* Ensure typography colors match exact specification */
.ladi-headline {
  color: rgb(155, 52, 61);
}
#HEADLINE345 > .ladi-headline {
  color: rgb(143, 50, 59) !important;
}

/* White texts */
#HEADLINE258 > .ladi-headline,
#HEADLINE350 > .ladi-headline,
#HEADLINE288 > .ladi-headline,
#COUNTDOWN5,
#COUNTDOWN5 span,
#HEADLINE289 > .ladi-headline,
#HEADLINE290 > .ladi-headline,
#HEADLINE291 > .ladi-headline,
#BUTTON_TEXT5 > .ladi-headline,
#HEADLINE92 > .ladi-headline,
#HEADLINE94 > .ladi-headline {
  color: rgb(255, 255, 255) !important;
}

/* Outer background: Dusty Rose Pastel */
html,
body,
.template-graduation-wrapper {
  background-color: #EEDDDD !important;
}

/* Invitation card background: Cream */
.ladi-wraper,
.ladi-wraper.template-graduation-14,
#SECTION5, #SECTION23, #SECTION13, #SECTION24, #SECTION11 {
  background-color: rgb(248, 246, 243) !important;
}

#BOX28 > .ladi-box, #BOX79 > .ladi-box, #BOX31 > .ladi-box, #BOX86 > .ladi-box, #BOX87 > .ladi-box {
  background-color: rgb(248, 246, 243) !important;
}

#HEADLINE347 > .ladi-headline {
  font-family: 'UVNHoaTay', 'Daytonica', cursive, serif !important;
}


      `}</style>

      {/* ========================================================================= */}
      {/* SECTION 5: Header, Film Strip, Calendar                                   */}
      {/* ========================================================================= */}
      <div id="SECTION5" className="ladi-section">
        <div className="ladi-section-background"></div>
        <div className="ladi-container">
          <div id="BOX28" className="ladi-element"><div className="ladi-box"></div></div>
          
          {/* Mũ cử nhân nét vẽ */}
          <div id="IMAGE234" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>
          
          {/* Trái tim nét vẽ to */}
          <div id="IMAGE261" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>
          
          {/* Ngôi sao lấp lánh trên trái */}
          <div id="IMAGE264" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>

          {/* Nhóm Thẻ Lịch Tháng 9 */}
          <div id="GROUP205" className="ladi-element">
            <div className="ladi-group">
              <div id="GROUP188" className="ladi-element">
                <div className="ladi-group">
                  <div id="IMAGE227" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>
                  <div id="HEADLINE287" className="ladi-element"><h3 className="ladi-headline">Tháng 9</h3></div>
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
                  <div id="GROUP183" className="ladi-element">
                    <div className="ladi-group">
                      <div id="HEADLINE303" className="ladi-element"><h3 className="ladi-headline">1</h3></div>
                      <div id="HEADLINE304" className="ladi-element"><h3 className="ladi-headline">2</h3></div>
                      <div id="HEADLINE305" className="ladi-element"><h3 className="ladi-headline">3</h3></div>
                      <div id="HEADLINE306" className="ladi-element"><h3 className="ladi-headline">4</h3></div>
                      <div id="HEADLINE307" className="ladi-element"><h3 className="ladi-headline">5</h3></div>
                      <div id="HEADLINE308" className="ladi-element"><h3 className="ladi-headline">6</h3></div>
                    </div>
                  </div>
                  <div id="GROUP184" className="ladi-element">
                    <div className="ladi-group">
                      <div id="HEADLINE309" className="ladi-element"><h3 className="ladi-headline">7</h3></div>
                      <div id="HEADLINE310" className="ladi-element"><h3 className="ladi-headline">8</h3></div>
                      <div id="HEADLINE311" className="ladi-element"><h3 className="ladi-headline">9</h3></div>
                      <div id="HEADLINE312" className="ladi-element"><h3 className="ladi-headline">10</h3></div>
                      <div id="HEADLINE313" className="ladi-element"><h3 className="ladi-headline">11</h3></div>
                      <div id="HEADLINE314" className="ladi-element"><h3 className="ladi-headline">12</h3></div>
                      <div id="HEADLINE315" className="ladi-element"><h3 className="ladi-headline">13</h3></div>
                    </div>
                  </div>
                  <div id="GROUP185" className="ladi-element">
                    <div className="ladi-group">
                      <div id="HEADLINE316" className="ladi-element"><h3 className="ladi-headline">14</h3></div>
                      <div id="HEADLINE317" className="ladi-element"><h3 className="ladi-headline">15</h3></div>
                      <div id="HEADLINE318" className="ladi-element"><h3 className="ladi-headline">15</h3></div>
                      <div id="HEADLINE319" className="ladi-element"><h3 className="ladi-headline">17</h3></div>
                      <div id="HEADLINE320" className="ladi-element"><h3 className="ladi-headline">18</h3></div>
                      <div id="HEADLINE321" className="ladi-element"><h3 className="ladi-headline">19</h3></div>
                      <div id="HEADLINE322" className="ladi-element"><h3 className="ladi-headline">20</h3></div>
                    </div>
                  </div>
                  <div id="GROUP186" className="ladi-element">
                    <div className="ladi-group">
                      <div id="HEADLINE323" className="ladi-element"><h3 className="ladi-headline">21</h3></div>
                      <div id="HEADLINE324" className="ladi-element"><h3 className="ladi-headline">22</h3></div>
                      <div id="HEADLINE325" className="ladi-element"><h3 className="ladi-headline">23</h3></div>
                      <div id="HEADLINE326" className="ladi-element"><h3 className="ladi-headline">24</h3></div>
                      <div id="HEADLINE327" className="ladi-element"><h3 className="ladi-headline">25</h3></div>
                      <div id="HEADLINE328" className="ladi-element"><h3 className="ladi-headline">26</h3></div>
                      <div id="HEADLINE329" className="ladi-element"><h3 className="ladi-headline">27</h3></div>
                    </div>
                  </div>
                  <div id="GROUP187" className="ladi-element">
                    <div className="ladi-group">
                      <div id="HEADLINE330" className="ladi-element"><h3 className="ladi-headline">28</h3></div>
                      <div id="HEADLINE331" className="ladi-element"><h3 className="ladi-headline">29</h3></div>
                      <div id="HEADLINE332" className="ladi-element"><h3 className="ladi-headline">30</h3></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Trái tim khoanh ngày 26 */}
              <div id="SHAPE1" className="ladi-element">
                <div className="ladi-shape">
                  <svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%" fill="rgba(155, 52, 61, 1)">
                    <path d="m480-121-41-37q-105.77-97.12-174.88-167.56Q195-396 154-451.5T96.5-552Q80-597 80-643q0-90.15 60.5-150.58Q201-854 290-854q57 0 105.5 27t84.5 78q42-54 89-79.5T670-854q89 0 149.5 60.42Q880-733.15 880-643q0 46-16.5 91T806-451.5Q765-396 695.88-325.56 626.77-255.12 521-158l-41 37Zm0-79q101.24-93 166.62-159.5Q712-426 750.5-476t54-89.14q15.5-39.13 15.5-77.72 0-66.14-42-108.64T670.22-794q-51.52 0-95.37 31.5T504-674h-49q-26-56-69.85-88-43.85-32-95.37-32Q224-794 182-751.5t-42 108.82q0 38.68 15.5 78.18 15.5 39.5 54 90T314-358q66 66 166 158Zm0-297Z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Tên Tân Cử Nhân: ĐẶNG + Mai Trang */}
          <div id="HEADLINE347" className="ladi-element"><h3 className="ladi-headline">{firstName}</h3></div>
          <div id="HEADLINE348" className="ladi-element"><h3 className="ladi-headline">{lastName}</h3></div>

          {/* Tiêu đề mời */}
          <div id="GROUP203" className="ladi-element">
            <div className="ladi-group">
              <div id="HEADLINE345" className="ladi-element"><h3 className="ladi-headline">Thân mời<br/></h3></div>
              <div id="HEADLINE276" className="ladi-element"><h3 className="ladi-headline">{recipient}</h3></div>
              <div id="HEADLINE277" className="ladi-element"><h3 className="ladi-headline">đến tham dự lễ tốt nghiệp của tân cử nhân</h3></div>
            </div>
          </div>

          {/* Mây góc */}
          <div id="IMAGE268" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>
          <div id="IMAGE236" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>
          <div id="IMAGE269" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>
          
          {/* Con dấu sáp đỏ */}
          <div id="IMAGE231" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>

          {/* Film Strip 4 ảnh */}
          <div id="GROUP180" className="ladi-element">
            <div className="ladi-group">
              <div id="BOX74" className="ladi-element"><div className="ladi-box"></div></div>
              <div id="BOX75" className="ladi-element"><div className="ladi-box"></div></div>
              <div id="BOX76" className="ladi-element"><div className="ladi-box"></div></div>
              <div id="BOX77" className="ladi-element"><div className="ladi-box"></div></div>
              <div id="BOX78" className="ladi-element"><div className="ladi-box"></div></div>
            </div>
          </div>

          {/* Nơ ruy băng hồng */}
          <div id="IMAGE230" className="ladi-element"><div id="ruybang" className="ladi-image"><div className="ladi-image-background"></div></div></div>
          <div id="IMAGE270" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 20: Ảnh chân dung Mai Trang Full Bleed + Text Overlay             */}
      {/* ========================================================================= */}
      <div id="SECTION20" className="ladi-section">
        <div className="ladi-section-background"></div>
        <div className="ladi-container">
          <div id="BOX39" className="ladi-element"><div className="ladi-box"></div></div>
          <div id="GROUP204" className="ladi-element">
            <div className="ladi-group">
              <div id="HEADLINE258" className="ladi-element"><h3 className="ladi-headline">One journey ends,</h3></div>
              <div id="HEADLINE350" className="ladi-element"><h3 className="ladi-headline">another begins</h3></div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 23: Cặp ảnh Tem Vintage + Địa điểm & Thời gian                   */}
      {/* ========================================================================= */}
      <div id="SECTION23" className="ladi-section">
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
              <div id="HEADLINE279" className="ladi-element"><h3 className="ladi-headline">Tổ chức tại<br/></h3></div>
              <div id="HEADLINE280" className="ladi-element"><h3 className="ladi-headline">học viện báo chí và tuyên truyền</h3></div>
              <div id="HEADLINE281" className="ladi-element"><h3 className="ladi-headline">36 Xuân Thủy, Cầu Giấy, Hà Nội<br/></h3></div>
              <a
                href="https://maps.google.com/?q=Học+viện+Báo+chí+và+Tuyên+truyền+36+Xuân+Thủy+Cầu+Giấy+Hà+Nội"
                target="_blank"
                rel="noopener noreferrer"
                id="GROUP162"
                className="ladi-element"
              >
                <div className="ladi-group">
                  <div id="IMAGE206" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>
                  <div id="HEADLINE282" className="ladi-element"><h3 className="ladi-headline">Chỉ đường<br/></h3></div>
                </div>
              </a>
              <div id="HEADLINE283" className="ladi-element">
                <h3 className="ladi-headline">lễ tốt nghiệp&nbsp;Được tổ chức <br/>vào <span style={{ fontWeight: "bold" }}>09:00, chủ nhật</span><br/></h3>
              </div>
              <div id="GROUP163" className="ladi-element">
                <div className="ladi-group">
                  <div id="GROUP164" className="ladi-element">
                    <div className="ladi-group">
                      <div id="LINE34" className="ladi-element"><div className="ladi-line"><div className="ladi-line-container"></div></div></div>
                      <div id="LINE35" className="ladi-element"><div className="ladi-line"><div className="ladi-line-container"></div></div></div>
                      <div id="HEADLINE284" className="ladi-element"><h3 className="ladi-headline">tháng 7<br/></h3></div>
                    </div>
                  </div>
                  <div id="GROUP165" className="ladi-element">
                    <div className="ladi-group">
                      <div id="LINE36" className="ladi-element"><div className="ladi-line"><div className="ladi-line-container"></div></div></div>
                      <div id="LINE37" className="ladi-element"><div className="ladi-line"><div className="ladi-line-container"></div></div></div>
                      <div id="HEADLINE285" className="ladi-element"><h3 className="ladi-headline">năm 2026<br/></h3></div>
                    </div>
                  </div>
                  <div id="HEADLINE286" className="ladi-element"><h3 className="ladi-headline">26<br/></h3></div>
                </div>
              </div>
            </div>
          </div>
          <div id="IMAGE278" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 15: Lịch trình (Timeline) & Countdown                              */}
      {/* ========================================================================= */}
      <div id="SECTION15" className="ladi-section">
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
                          <div id="HEADLINE221" className="ladi-element"><h3 className="ladi-headline">Làm lễ tốt nghiệp<br/></h3></div>
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
                          <div id="HEADLINE223" className="ladi-element"><h3 className="ladi-headline">Chụp ảnh kỷ niệm<br/></h3></div>
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
                    <div className="ladi-countdown">
                      <div id="COUNTDOWN_ITEM17" className="ladi-element"><div className="ladi-countdown-background"></div><div className="ladi-countdown-text"><span suppressHydrationWarning>{mounted ? countdown.days : "16"}</span></div></div>
                      <div id="COUNTDOWN_ITEM18" className="ladi-element"><div className="ladi-countdown-background"></div><div className="ladi-countdown-text"><span suppressHydrationWarning>{mounted ? countdown.hours : "23"}</span></div></div>
                      <div id="COUNTDOWN_ITEM19" className="ladi-element"><div className="ladi-countdown-background"></div><div className="ladi-countdown-text"><span suppressHydrationWarning>{mounted ? countdown.minutes : "14"}</span></div></div>
                      <div id="COUNTDOWN_ITEM20" className="ladi-element"><div className="ladi-countdown-background"></div><div className="ladi-countdown-text"><span suppressHydrationWarning>{mounted ? countdown.seconds : "48"}</span></div></div>
                    </div>
                  </div>
                  <div id="HEADLINE289" className="ladi-element"><h3 className="ladi-headline">:<br/></h3></div>
                  <div id="HEADLINE290" className="ladi-element"><h3 className="ladi-headline">:<br/></h3></div>
                  <div id="HEADLINE291" className="ladi-element"><h3 className="ladi-headline">:<br/></h3></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 13: My Story + Thư giấy Vintage                                    */}
      {/* ========================================================================= */}
      <div id="SECTION13" className="ladi-section">
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
                  <div id="HEADLINE293" className="ladi-element"><h3 className="ladi-headline">{graduateName}</h3></div>
                  <div id="HEADLINE292" className="ladi-element">
                    <h3 className="ladi-headline">
                      Một hành trình đã khép lại bằng những ngày tháng đáng nhớ, từ những bỡ ngỡ ban đầu đến lúc trưởng thành hơn sau từng bài học, thử thách và trải nghiệm.<br/><br/>
                      Có những ngày mệt mỏi, có cả những lần muốn dừng bước, nhưng nhờ sự đồng hành của gia đình, thầy cô và bạn bè, mình đã đi đến cột mốc hôm nay. Tấm bằng tốt nghiệp không chỉ là kết quả của những năm tháng nỗ lực, mà còn là dấu mốc mở ra một hành trình mới với nhiều ước mơ và cơ hội đang chờ phía trước.<br/>
                    </h3>
                  </div>
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

      {/* ========================================================================= */}
      {/* SECTION 24: ALBUM of graduate                                             */}
      {/* ========================================================================= */}
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
                      onClick={() => setCurrentGalleryIdx((p) => (p === 0 ? galleryImages.length - 1 : p - 1))}
                    ></div>
                    <div
                      className="ladi-gallery-view-arrow ladi-gallery-view-arrow-right"
                      onClick={() => setCurrentGalleryIdx((p) => (p === galleryImages.length - 1 ? 0 : p + 1))}
                    ></div>
                    <div
                      className="ladi-gallery-view-item selected"
                      style={{
                        backgroundImage: `url("${galleryImages[currentGalleryIdx]}")`,
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

      {/* ========================================================================= */}
      {/* SECTION 11: RSVP Form (Xác nhận tham dự)                                   */}
      {/* ========================================================================= */}
      <div id="SECTION11" className="ladi-section">
        <div className="ladi-section-background"></div>
        <div className="ladi-container">
          <div id="BOX87" className="ladi-element"><div className="ladi-box"></div></div>
          <div id="HEADLINE93" className="ladi-element">
            <h3 className="ladi-headline">
              Rất mong có bạn đến chung vui cùng mình!<br/>
              Xin vui lòng xác nhận sự có mặt của bạn để mình chuẩn bị đón tiếp một cách chu đáo nhất.<br/>
              Xin cảm ơn!&nbsp;<br/>
            </h3>
          </div>

          <div id="FORM4" className="ladi-element">
            <form onSubmit={handleSubmitRsvp} className="ladi-form">
              <div id="BUTTON5" className="ladi-element" onClick={() => {
                const form = document.querySelector('.ladi-form') as HTMLFormElement;
                if (form) form.requestSubmit();
              }}>
                <div className="ladi-button">
                  <div className="ladi-button-background"></div>
                  <div id="BUTTON_TEXT5" className="ladi-element ladi-button-headline">
                    <p className="ladi-headline">{submitting ? "ĐANG GỬI..." : "XÁC NHẬN"}</p>
                  </div>
                </div>
              </div>

              {/* Tên khách mời */}
              <div id="FORM_ITEM13" className="ladi-element">
                <div className="ladi-form-item-container">
                  <div className="ladi-form-item-background"></div>
                  <div className="ladi-form-item">
                    <input
                      name="name"
                      required
                      className="ladi-form-control"
                      type="text"
                      placeholder="Tên của bạn"
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Lời chúc */}
              <div id="FORM_ITEM14" className="ladi-element">
                <div className="ladi-form-item-container">
                  <div className="ladi-form-item-background"></div>
                  <div className="ladi-form-item">
                    <textarea
                      name="message"
                      className="ladi-form-control"
                      placeholder="Gửi lời chúc đến tân cử nhân"
                      value={rsvpMsg}
                      onChange={(e) => setRsvpMsg(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Bạn sẽ đến chứ? */}
              <div id="FORM_ITEM15" className="ladi-element">
                <div className="ladi-form-item-container">
                  <div className="ladi-form-item-background"></div>
                  <div className="ladi-form-item">
                    <select
                      name="form_item10"
                      className="ladi-form-control ladi-form-control-select"
                      value={rsvpAttend}
                      onChange={(e) => setRsvpAttend(e.target.value)}
                    >
                      <option value="Tôi chắc chắn sẽ đến">Tôi chắc chắn sẽ đến</option>
                      <option value="Xin lỗi tôi bận rồi">Xin lỗi tôi bận rồi</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 12: Thank You! + Footer                                           */}
      {/* ========================================================================= */}
      <div id="SECTION12" className="ladi-section">
        <div className="ladi-section-background"></div>
        <div className="ladi-container">
          <div id="BOX26" className="ladi-element"><div className="ladi-box"></div></div>
          <div id="HEADLINE92" className="ladi-element">
            <h3 className="ladi-headline"><br/>Sự hiện diện của bạn chính là món quà ý nghĩa nhất,<br/>và mình vô cùng trân quý trong ngày vui này.<br/></h3>
          </div>
          <div id="HEADLINE94" className="ladi-element"><h3 className="ladi-headline">Thank you!</h3></div>
          <div id="GROUP158" className="ladi-element">
            <div className="ladi-group">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" id="GROUP157" className="ladi-element">
                <div className="ladi-group">
                  <div id="HEADLINE271" className="ladi-element"><h3 className="ladi-headline">LAMI WEDDING INVITATION<br/></h3></div>
                  <div id="IMAGE192" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></div>
                </div>
              </a>
              <a href="https://zalo.me" target="_blank" rel="noopener noreferrer" id="IMAGE193" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" id="IMAGE194" className="ladi-element"><div className="ladi-image"><div className="ladi-image-background"></div></div></a>
            </div>
          </div>
        </div>
      </div>

      {/* POPUP Xác nhận thành công */}
      {showPopup && (
        <div id="SECTION_POPUP" className="ladi-section" style={{ position: "fixed", inset: 0, zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="backdrop-popup" onClick={() => setShowPopup(false)} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)" }}></div>
          <div id="POPUP1" className="ladi-element" style={{ position: "relative", zIndex: 1000 }}>
            <div className="ladi-popup">
              <div className="ladi-popup-background"></div>
              <div id="HEADLINE95" className="ladi-element" style={{ position: "static", padding: "20px", textAlign: "center" }}>
                <h3 className="ladi-headline" style={{ color: "#8F323B" }}>Cảm ơn bạn đã dành thời gian phản hồi.<br/>Mình vô cùng trân quý sự quan tâm của bạn.<br/></h3>
              </div>
              <button
                onClick={() => setShowPopup(false)}
                style={{
                  margin: "10px auto 20px auto",
                  display: "block",
                  padding: "8px 24px",
                  borderRadius: "20px",
                  backgroundColor: "#8F323B",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Music Button matching exact position (bottom: 24px, right: 24px, size: 48px) */}
      <button
        onClick={togglePlay}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border ${
          playing
            ? "bg-[#FFF3E0] text-[#8F323B] border-[#8F323B]/30"
            : "bg-white text-[#8F323B] border-slate-200"
        }`}
        aria-label={playing ? "Tắt nhạc" : "Bật nhạc"}
        title={playing ? "Tắt nhạc" : "Bật nhạc"}
      >
        {playing ? (
          <Volume2 className="w-5 h-5 text-[#8F323B] animate-pulse" />
        ) : (
          <VolumeX className="w-5 h-5 text-[#8F323B]/70" />
        )}
      </button>

      {/* Audio Tag */}
      <audio ref={audioRef} loop preload="auto">
        <source src={musicSource} type="audio/mpeg" />
      </audio>
    </div>
    </div>
  );
}
