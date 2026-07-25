"use client";

import { Header } from "@/widgets/header/ui/Header";
import { HeroSection } from "./components/HeroSection";
import { PainPointsSection } from "./components/PainPointsSection";
import { AboutServiceSection } from "./components/AboutServiceSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { FeaturedTemplatesSection } from "./components/FeaturedTemplatesSection";
import { ComparisonSection } from "./components/ComparisonSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { FaqSection } from "./components/FaqSection";
import { FinalCtaSection } from "./components/FinalCtaSection";
import { LandingFooter } from "./components/LandingFooter";

export function LandingPage() {
  const handleConsultRequest = () => {
    const el = document.getElementById("dang-ky-tu-van");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div 
      className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-pink-500 selection:text-white"
      style={{ fontFamily: "'Be Vietnam Pro', 'Inter', system-ui, -apple-system, sans-serif" }}
    >
      {/* 1. Header Sticky */}
      <Header onOpenRequest={handleConsultRequest} />

      {/* 2. Main Landing Page 12 Sections */}
      <main className="flex-1">
        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: Vấn đề khách hàng */}
        <PainPointsSection />

        {/* Section 3: Giới thiệu dịch vụ & Thống kê */}
        <AboutServiceSection />

        {/* Section 4: Những gì bạn nhận được (Features) */}
        <FeaturesSection />

        {/* Section 5: Quy trình sử dụng (4 bước) */}
        <HowItWorksSection />

        {/* Section 6: Thư viện mẫu nổi bật */}
        <FeaturedTemplatesSection />

        {/* Section 7: So sánh thiệp truyền thống vs thiệp online */}
        <ComparisonSection />

        {/* Section 8: Đánh giá khách hàng */}
        <TestimonialsSection />

        {/* Section 10: Câu hỏi thường gặp */}
        <FaqSection />

        {/* Section 11: CTA cuối trang & Form đăng ký tư vấn */}
        <FinalCtaSection />
      </main>

      {/* 3. Footer */}
      <LandingFooter />
    </div>
  );
}
