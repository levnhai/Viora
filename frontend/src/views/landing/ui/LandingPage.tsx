'use client';

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Header } from "@/widgets/header/ui/Header";
import { Hero } from "@/widgets/hero/ui/Hero";
import { FeaturesList } from "@/widgets/features-list/ui/FeaturesList";
import { TemplatesList } from "@/widgets/templates-list/ui/TemplatesList";
import { HowItWorks } from "@/widgets/how-it-works/ui/HowItWorks";
import { Testimonials } from "@/widgets/testimonials/ui/Testimonials";
import { Pricing } from "@/widgets/pricing/ui/Pricing";
import { FaqList } from "@/widgets/faq/ui/FaqList";
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
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Header onOpenRequest={() => handleStartCreating(1)} />
      
      <Hero 
        onOpenRequest={() => handleStartCreating(1)}
        onOpenDemo={() => onPreviewDemo(1)}
      />
      
      <div className="border-y border-border bg-secondary/30 py-4 text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground/60 font-medium">
          {["Zalo", "Facebook Messenger", "Gmail", "Viber", "WhatsApp"].map((p) => (
            <span key={p} className="flex items-center gap-1.5">
              🔗 {p}
            </span>
          ))}
        </div>
      </div>

      <FeaturesList />

      <TemplatesList 
        onPreviewDemo={onPreviewDemo}
        onUseTemplate={(tplId) => handleStartCreating(tplId)}
      />

      <HowItWorks onOpenRequest={() => handleStartCreating(1)} />

      <Testimonials />

      <Pricing onSelectPlan={(planName) => navigate(`/create?templateId=1&plan=${encodeURIComponent(planName)}`)} />

      {/* SECTION CTA FOR REGISTER */}
      <section id="dang-ky-tu-van" className="py-24 bg-card border-t border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <p className="text-xs text-accent uppercase tracking-widest font-semibold">Tự thiết kế dễ dàng</p>
          <h2 className="text-4xl text-foreground font-medium" style={{ fontFamily: "'EB Garamond', serif" }}>
            Bắt đầu thiết kế thiệp cưới của riêng bạn ngay bây giờ
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            Chọn một trong những mẫu thiệp cưới cao cấp của chúng tôi, tự chỉnh sửa thông tin, tải hình ảnh và xem trước giao diện trực quan 100% miễn phí.
          </p>
          <div className="pt-4">
            <button
              onClick={() => handleStartCreating(1)}
              className="bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-medium hover:opacity-90 active:scale-[0.98] transition-all inline-flex items-center gap-2 cursor-pointer border-0 text-sm"
            >
              Thiết kế thiệp miễn phí <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <FaqList />

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground">
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, white 0%, transparent 60%), radial-gradient(circle at 80% 20%, white 0%, transparent 50%)",
              }}
            />
            <p className="text-sm uppercase tracking-widest opacity-70 mb-4">
              Sẵn sàng chưa?
            </p>
            <h2
              className="text-4xl sm:text-5xl mb-6"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              Tạo thiệp mời online ngay hôm nay
            </h2>
            <p className="text-sm opacity-75 max-w-md mx-auto mb-8">
              Miễn phí hoàn toàn để bắt đầu. Không cần đăng ký trước. Tạo thiệp trực quan trong 5 phút.
            </p>
            <button 
              onClick={() => handleStartCreating(1)}
              className="bg-primary-foreground text-primary px-9 py-4 rounded-xl font-medium hover:opacity-90 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer border-0"
            >
              Tạo thiệp miễn phí <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

