import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Header } from "@/widgets/header/ui/Header";
import { Hero } from "@/widgets/hero/ui/Hero";
import { FeaturesList } from "@/widgets/features-list/ui/FeaturesList";
import { TemplatesList } from "@/widgets/templates-list/ui/TemplatesList";
import { HowItWorks } from "@/widgets/how-it-works/ui/HowItWorks";
import { Testimonials } from "@/widgets/testimonials/ui/Testimonials";
import { Pricing } from "@/widgets/pricing/ui/Pricing";
import { FaqList } from "@/widgets/faq/ui/FaqList";
import { Footer } from "@/widgets/footer/ui/Footer";
import { RequestForm } from "@/features/submit-invitation-request/ui/RequestForm";
import { RequestModal } from "@/features/submit-invitation-request/ui/RequestModal";

interface LandingPageProps {
  onPreviewDemo: (tplId: number) => void;
}

export function LandingPage({ onPreviewDemo }: LandingPageProps) {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState(1);
  const [selectedPlanName, setSelectedPlanName] = useState("Cặp đôi");

  const triggerRequestModal = (tplId: number, planName: string = "Cặp đôi") => {
    setSelectedTemplateId(tplId);
    setSelectedPlanName(planName);
    setIsRequestModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Header onOpenRequest={() => triggerRequestModal(1, "Cặp đôi")} />
      
      <Hero 
        onOpenRequest={() => triggerRequestModal(1, "Miễn phí")}
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
        onUseTemplate={(tplId) => triggerRequestModal(tplId, "Cặp đôi")}
      />

      <HowItWorks onOpenRequest={() => triggerRequestModal(1, "Miễn phí")} />

      <Testimonials />

      <Pricing onSelectPlan={(planName) => triggerRequestModal(1, planName)} />

      {/* SECTION FORM */}
      <section id="dang-ky-tu-van" className="py-24 bg-card border-t border-b border-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs text-accent uppercase tracking-widest mb-2">Đăng ký</p>
            <h2 className="text-4xl text-foreground font-medium" style={{ fontFamily: "'EB Garamond', serif" }}>
              Liên Hệ Làm Thiệp Cưới
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
              Nhập thông tin của bạn để chúng tôi tư vấn và tạo bản thiệp cưới mẫu miễn phí cho bạn tham khảo.
            </p>
          </div>
          
          <div className="bg-background/40 backdrop-blur-sm rounded-2xl border border-border p-8 shadow-sm">
            <RequestForm 
              preSelectedTemplateId={selectedTemplateId}
              preSelectedPlanName={selectedPlanName}
            />
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
              Miễn phí hoàn toàn để bắt đầu. Không cần thẻ ngân hàng. Tạo thiệp
              trong 5 phút.
            </p>
            <button 
              onClick={() => triggerRequestModal(1, "Miễn phí")}
              className="bg-primary-foreground text-primary px-9 py-4 rounded-xl font-medium hover:opacity-90 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              Tạo thiệp miễn phí <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <Footer />

      <RequestModal 
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        preSelectedTemplateId={selectedTemplateId}
        preSelectedPlanName={selectedPlanName}
      />
    </div>
  );
}
