"use client";

import { useState } from "react";
import { ArrowRight, Type, Palette, AlignCenter, Music, Upload, Eye } from "lucide-react";
import iphone15ProFrame from "@/shared/assets/image/frame/iphone15_pro.png";

export function EditorDemo() {
  const [demoColor, setDemoColor] = useState("#db2777");
  const [demoFont, setDemoFont] = useState("'EB Garamond', serif");
  const [demoGroom, setDemoGroom] = useState("Văn An");
  const [demoBride, setDemoBride] = useState("Thu Bình");

  return (
    <section className="py-24 bg-[#faf6f0]/30 border-t border-b border-[#e2d8cf]/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Cột trái: Văn bản & CTA */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <p className="text-xs text-[#db2777] uppercase tracking-widest font-bold flex items-center gap-1.5">
              <span>🌸</span> TRẢI NGHIỆM EDITOR
            </p>
            <h2 
              className="text-4xl text-[#2c1810] font-bold leading-tight flex flex-col items-start gap-y-1"
              style={{ fontFamily: "'EB Garamond', serif" }}
            >
              <span>Chỉnh sửa dễ dàng</span>
              <span className="text-[#db2777] font-normal text-4xl sm:text-5xl" style={{ fontFamily: "'Great Vibes', cursive" }}>với giao diện trực quan</span>
            </h2>
            <p className="text-sm text-[#7a5c4f]/80 leading-relaxed font-light">
              Kéo thả linh hoạt, thay đổi chi tiết từ phông chữ, màu sắc chủ đạo, âm nhạc cho đến album ảnh cưới và xem trước kết quả hiển thị thực tế ngay lập tức.
            </p>
            
            <div className="pt-2">
              <a 
                href="/create"
                className="bg-[#db2777] hover:bg-[#c2185b] text-white px-7 py-3.5 rounded-full font-semibold text-xs transition-all inline-flex items-center gap-2 cursor-pointer border-0 shadow-md shadow-pink-600/10 no-underline"
              >
                Dùng thử ngay <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Cột phải: Mockup Laptop Trực quan tương tác */}
          <div className="lg:col-span-7 flex justify-center w-full">
            <div className="w-full max-w-[620px] relative">
              {/* Vỏ Laptop ngoài (Màn hình) */}
              <div className="bg-[#1e1916] rounded-t-2xl p-3 shadow-2xl border border-white/10 relative">
                {/* Màn hình trong */}
                <div className="bg-white rounded-lg overflow-hidden border border-[#e2d8cf] relative flex flex-col h-[340px]">
                  
                  {/* Thanh menu Editor */}
                  <div className="bg-[#faf6f0] border-b border-[#e2d8cf]/60 px-3 py-2 flex items-center justify-between text-2xs">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-[#db2777]">🌸</span>
                      <span className="font-bold tracking-wider text-[#2c1810]" style={{ fontFamily: "'Cinzel', serif" }}>VIORA EDITOR</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="bg-white border border-[#e2d8cf] text-[#7a5c4f]/70 px-2 py-0.5 rounded text-[9px] font-medium flex items-center gap-1 cursor-pointer">
                        <Eye size={10} /> Xem thử
                      </button>
                      <button className="bg-[#db2777] text-white px-2.5 py-0.5 rounded text-[9px] font-semibold cursor-pointer border-0">
                        Xuất bản
                      </button>
                    </div>
                  </div>

                  {/* Vùng làm việc chính của Editor */}
                  <div className="flex-1 flex overflow-hidden">
                    
                    {/* Sidebar trái: Biểu mẫu nhập liệu */}
                    <div className="w-1/4 border-r border-[#e2d8cf]/50 bg-[#faf6f0]/40 p-2.5 space-y-2.5 text-left text-[9px] overflow-y-auto">
                      <p className="font-bold text-[#2c1810] uppercase tracking-wider text-[8px] border-b border-[#e2d8cf]/60 pb-1">Nội dung</p>
                      
                      <div className="space-y-1">
                        <label className="text-[#7a5c4f]/70 font-medium block">Tên Chú rể</label>
                        <input 
                          type="text" 
                          value={demoGroom}
                          onChange={(e) => setDemoGroom(e.target.value)}
                          className="w-full px-1.5 py-1 border border-[#e2d8cf] rounded text-[9px] bg-white outline-none focus:border-[#db2777]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[#7a5c4f]/70 font-medium block">Tên Cô dâu</label>
                        <input 
                          type="text" 
                          value={demoBride}
                          onChange={(e) => setDemoBride(e.target.value)}
                          className="w-full px-1.5 py-1 border border-[#e2d8cf] rounded text-[9px] bg-white outline-none focus:border-[#db2777]"
                        />
                      </div>

                      <div className="pt-1 space-y-1">
                        <p className="text-[#7a5c4f]/80 font-semibold flex items-center gap-1"><Music size={10} /> Nhạc nền</p>
                        <div className="p-1.5 bg-white border border-[#e2d8cf] rounded flex items-center justify-between text-[8px] text-[#7a5c4f]/60">
                          <span className="truncate">Beautiful In White.mp3</span>
                          <span className="text-[#db2777] font-bold">✔</span>
                        </div>
                      </div>

                      <div className="pt-1 space-y-1">
                        <p className="text-[#7a5c4f]/80 font-semibold flex items-center gap-1"><Upload size={10} /> Album ảnh</p>
                        <div className="border border-dashed border-[#db2777]/30 rounded p-2 text-center text-[#db2777] cursor-pointer bg-pink-50/20 hover:bg-pink-50/50 transition-colors">
                          + Tải ảnh lên
                        </div>
                      </div>
                    </div>

                    {/* Vùng xem trước ở giữa */}
                    <div className="flex-1 bg-gray-50 p-3 flex justify-center items-center overflow-hidden relative">
                      <div className="absolute inset-0 bg-[#fdf6ef]/30" />
                      
                      {/* Giả lập màn hình thiệp cưới di động */}
                      <div className="w-[120px] h-[240px] relative z-10 scale-105 transition-all drop-shadow-md">
                        {/* Ảnh Frame iPhone 15 Pro nằm ở lớp dưới */}
                        <img 
                          src={iphone15ProFrame.src} 
                          alt="iPhone 15 Pro Frame" 
                          className="absolute inset-0 w-full h-full object-fill pointer-events-none z-10"
                        />

                        {/* Màn hình trong (nằm đè lên trên frame, thụt vào để lộ viền bezel đen) */}
                        <div className="absolute inset-[5px] rounded-[15px] overflow-hidden flex flex-col justify-between z-20 bg-white p-1 pb-2">
                          {/* Dynamic Island tự vẽ đè lên trên cùng */}
                          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-2 bg-black rounded-full z-40 flex items-center justify-center pointer-events-none scale-[0.6]">
                            <span className="w-0.5 h-0.5 rounded-full bg-[#111] absolute right-2" />
                          </div>
                          {/* Ảnh nền */}
                          <div 
                            className="absolute inset-0 bg-cover bg-center opacity-85"
                            style={{
                              backgroundImage: `url('https://images.unsplash.com/photo-1519225495810-7512c696505a?q=80&w=200&auto=format&fit=crop')`,
                            }}
                          />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50 z-1" />
                        
                        <div className="relative z-10 text-center text-white text-[5px] uppercase tracking-widest">
                          The Wedding Of
                        </div>
                        
                        <div className="relative z-10 text-center text-white space-y-0.5">
                          <h4 className="text-[9px] font-bold" style={{ fontFamily: demoFont, color: demoColor }}>
                            {demoGroom}
                          </h4>
                          <p className="text-[6px] italic" style={{ fontFamily: demoFont }}>&amp;</p>
                          <h4 className="text-[9px] font-bold" style={{ fontFamily: demoFont, color: demoColor }}>
                            {demoBride}
                          </h4>
                        </div>

                        <div className="relative z-10">
                          <div className="bg-white/90 backdrop-blur-2xs rounded py-1 px-1.5 shadow-xs flex justify-between text-[#db2777] scale-90">
                            {["32d", "14h", "45m"].map((v, i) => (
                              <div key={i} className="text-center flex-1">
                                <p className="text-[7px] font-bold leading-none">{v}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                    {/* Sidebar phải: Công cụ thiết kế nhanh */}
                    <div className="w-1/4 border-l border-[#e2d8cf]/50 bg-[#faf6f0]/40 p-2.5 space-y-2.5 text-left text-[9px] overflow-y-auto">
                      <p className="font-bold text-[#2c1810] uppercase tracking-wider text-[8px] border-b border-[#e2d8cf]/60 pb-1">Tùy chỉnh</p>

                      {/* Chọn font */}
                      <div className="space-y-1">
                        <p className="text-[#7a5c4f]/80 font-semibold flex items-center gap-1"><Type size={10} /> Phông chữ</p>
                        {[
                          { name: "EB Garamond", font: "'EB Garamond', serif" },
                          { name: "Playfair Display", font: "'Playfair Display', serif" },
                          { name: "Outfit", font: "'Outfit', sans-serif" },
                        ].map((f) => (
                          <button
                            key={f.name}
                            onClick={() => setDemoFont(f.font)}
                            className={`w-full py-1 px-1.5 rounded border text-[8px] text-left transition-all cursor-pointer ${
                              demoFont === f.font 
                                ? "border-[#db2777] bg-pink-50/40 font-bold text-[#db2777]" 
                                : "border-[#e2d8cf] bg-white text-[#7a5c4f]/80 hover:border-[#db2777]/30"
                            }`}
                            style={{ fontFamily: f.font }}
                          >
                            {f.name}
                          </button>
                        ))}
                      </div>

                      {/* Chọn màu */}
                      <div className="space-y-1">
                        <p className="text-[#7a5c4f]/80 font-semibold flex items-center gap-1"><Palette size={10} /> Màu chủ đạo</p>
                        <div className="flex gap-1.5 pt-1">
                          {[
                            { hex: "#db2777", name: "Rose" },
                            { hex: "#2d5a27", name: "Green" },
                            { hex: "#7a5c4f", name: "Classic" },
                            { hex: "#7c3aed", name: "Purple" },
                          ].map((c) => (
                            <button
                              key={c.hex}
                              onClick={() => setDemoColor(c.hex)}
                              className={`w-5 h-5 rounded-full border cursor-pointer transition-transform ${
                                demoColor === c.hex 
                                  ? "scale-110 ring-2 ring-[#db2777]/30 border-white" 
                                  : "border-gray-200"
                              }`}
                              style={{ backgroundColor: c.hex }}
                              title={c.name}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Khoảng cách */}
                      <div className="space-y-1">
                        <p className="text-[#7a5c4f]/80 font-semibold flex items-center gap-1"><AlignCenter size={10} /> Căn chỉnh</p>
                        <div className="h-1 bg-[#e2d8cf] rounded-full relative mt-2">
                          <div className="absolute left-0 top-0 h-full bg-[#db2777] w-2/3 rounded-full" />
                          <div className="absolute left-2/3 -top-1 w-2.5 h-2.5 bg-white border border-[#db2777] rounded-full shadow-sm" />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Phần đế Laptop */}
              <div className="bg-[#dedede] h-2.5 w-[104%] -ml-[2%] rounded-b-lg shadow-xl relative z-10 border-b-2 border-gray-400/30" />
              <div className="bg-[#b3b3b3] h-1.5 w-1/4 mx-auto rounded-b-md shadow-md relative z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
