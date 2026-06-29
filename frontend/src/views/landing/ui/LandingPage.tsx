'use client';

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Header } from "@/widgets/header/ui/Header";
import { Hero } from "@/widgets/hero/ui/Hero";
import { Stats } from "@/widgets/stats/ui/Stats";
import { TemplatesList } from "@/widgets/templates-list/ui/TemplatesList";
import { HowItWorks } from "@/widgets/how-it-works/ui/HowItWorks";
import { FeaturesList } from "@/widgets/features-list/ui/FeaturesList";
import { EditorDemo } from "@/widgets/editor-demo/ui/EditorDemo";
import { Testimonials } from "@/widgets/testimonials/ui/Testimonials";
import { BlogSection } from "@/widgets/blog-section/ui/BlogSection";
import { Footer } from "@/widgets/footer/ui/Footer";

interface LandingPageProps {
  onPreviewDemo: (tplId: number) => void;
}

export function LandingPage({ onPreviewDemo }: LandingPageProps) {
  const router = useRouter();
  const navigate = (path: string) => router.push(path);

  const handleStartCreating = (tplId: number = 1) => {
    navigate(`/create?templateId=${tplId}`);
  };

  return (
    <div className="min-h-screen bg-[#fffdfb] text-[#2c1810] pb-16 md:pb-0" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      
      {/* 1. Header (Thanh menu) */}
      <Header onOpenRequest={() => handleStartCreating(1)} />
      
      {/* 2. Hero Section (Đầu trang, có cánh hoa đào rơi) */}
      <Hero 
        onOpenRequest={() => handleStartCreating(1)}
        onOpenDemo={() => onPreviewDemo(1)}
      />

      {/* 3. Stats Section (Dải số liệu thống kê) */}
      <Stats />

      {/* 4. Templates List (Kho mẫu thiệp nổi bật) */}
      <TemplatesList 
        onPreviewDemo={onPreviewDemo}
        onUseTemplate={(tplId) => handleStartCreating(tplId)}
      />

      {/* 5. How It Works (Quy trình 4 bước đơn giản) */}
      <HowItWorks />

      {/* 6. Features List (Tính năng nổi bật - Tất cả những gì bạn cần) */}
      <FeaturesList />

      {/* 7. Editor Demo (Trải nghiệm Editor trực quan) */}
      <EditorDemo />

      {/* 8. Testimonials (Ý kiến đánh giá khách hàng) */}
      <Testimonials />

      {/* 9. Blog Section (Bài viết mới - Cẩm nang cưới hỏi) */}
      <BlogSection />

      {/* 10. CTA Section (Kêu gọi tạo thiệp trước Footer) */}
      <section className="py-20 bg-[#fdf6ef]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-pink-50 border border-[#e2d8cf]/40 shadow-sm flex flex-col md:flex-row items-center justify-between p-8 md:p-14">
            
            {/* Hậu cảnh trang trí lá/hoa */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, white 0%, transparent 60%), radial-gradient(circle at 80% 20%, white 0%, transparent 50%)",
              }}
            />

            {/* Văn bản kêu gọi (Bên trái) */}
            <div className="text-left space-y-6 max-w-xl z-10">
              <h2
                className="text-4xl sm:text-5xl text-[#2c1810] font-bold leading-tight flex flex-col items-start gap-y-1"
                style={{ fontFamily: "'EB Garamond', serif" }}
              >
                <span>Sẵn sàng tạo thiệp cưới</span>
                <span className="text-[#db2777] font-normal text-4xl sm:text-5xl" style={{ fontFamily: "'Great Vibes', cursive" }}>của riêng bạn?</span>
              </h2>
              <p className="text-sm text-[#7a5c4f]/80 leading-relaxed font-light">
                Tham gia cùng hơn 5.000+ cặp đôi đã tạo nên thiệp cưới đáng nhớ với Viora. Tạo và chia sẻ nhanh chóng, tiện lợi.
              </p>
              <div className="pt-2">
                <button 
                  onClick={() => handleStartCreating(1)}
                  className="bg-white hover:bg-pink-50 text-[#db2777] border border-[#db2777]/20 px-8 py-3.5 rounded-full font-semibold text-xs shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  Bắt đầu ngay — miễn phí <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Ảnh cặp đôi (Bên phải) */}
            <div className="mt-8 md:mt-0 w-full md:w-1/3 max-w-[280px] aspect-[4/5] rounded-2xl overflow-hidden shadow-lg border-4 border-white/80 rotate-[3deg] transition-transform hover:rotate-0 duration-500 z-10">
              <img 
                src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=400&auto=format&fit=crop" 
                alt="Cô dâu chú rể lãng mạn" 
                className="w-full h-full object-cover"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 11. Footer (Chân trang) */}
      <Footer />
    </div>
  );
}
