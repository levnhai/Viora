import { FadeIn } from "@/shared/ui/FadeIn";
import { Heart } from "lucide-react";

interface CoupleSpotlightProps {
  groomName: string;
  brideName: string;
  groomImage?: string;
  brideImage?: string;
}

export function CoupleSpotlight({ 
  groomName, 
  brideName, 
  groomImage = "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=800&fit=crop&auto=format",
  brideImage = "https://images.unsplash.com/photo-1549417229-aa67d3263c09?w=600&h=800&fit=crop&auto=format"
}: CoupleSpotlightProps) {
  return (
    <section className="py-24 px-4 bg-background overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16 space-y-2">
            <span className="text-primary text-xs uppercase tracking-[0.25em] font-semibold">Gặp gỡ cặp đôi</span>
            <h2 className="text-3xl font-light text-foreground" style={{ fontFamily: "'EB Garamond', serif" }}>
              Chú Rể & Cô Dâu
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-12 bg-border" />
              <Heart size={12} className="text-primary" fill="currentColor" />
              <div className="h-px w-12 bg-border" />
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 items-center">
          {/* GROOM SPOTLIGHT */}
          <FadeIn delay={100} className="flex flex-col items-center text-center space-y-5">
            <div className="relative group cursor-pointer">
              {/* Decorative background outline */}
              <div className="absolute -inset-3 rounded-[999px_999px_0_0] border border-primary/20 scale-[0.98] group-hover:scale-100 group-hover:border-primary/50 transition-all duration-700" />
              
              {/* Arch Frame */}
              <div className="w-64 h-88 rounded-[999px_999px_0_0] overflow-hidden shadow-lg border border-border relative">
                <img 
                  src={groomImage} 
                  alt={groomName} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
            
            <div className="space-y-2 max-w-xs">
              <h3 className="text-3xl text-primary" style={{ fontFamily: "'Great Vibes', cursive" }}>
                {groomName}
              </h3>
              <p className="text-2xs uppercase tracking-widest text-muted-foreground font-semibold">Chú rể</p>
              <p className="text-xs leading-relaxed text-muted-foreground italic px-2">
                "Được gặp em, yêu em và đồng hành cùng em trong cuộc đời là niềm hạnh phúc lớn nhất của anh."
              </p>
            </div>
          </FadeIn>

          {/* BRIDE SPOTLIGHT */}
          <FadeIn delay={200} className="flex flex-col items-center text-center space-y-5">
            <div className="relative group cursor-pointer">
              {/* Decorative background outline */}
              <div className="absolute -inset-3 rounded-[999px_999px_0_0] border border-primary/20 scale-[0.98] group-hover:scale-100 group-hover:border-primary/50 transition-all duration-700" />
              
              {/* Arch Frame */}
              <div className="w-64 h-88 rounded-[999px_999px_0_0] overflow-hidden shadow-lg border border-border relative">
                <img 
                  src={brideImage} 
                  alt={brideName} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
            
            <div className="space-y-2 max-w-xs">
              <h3 className="text-3xl text-primary" style={{ fontFamily: "'Great Vibes', cursive" }}>
                {brideName}
              </h3>
              <p className="text-2xs uppercase tracking-widest text-muted-foreground font-semibold">Cô dâu</p>
              <p className="text-xs leading-relaxed text-muted-foreground italic px-2">
                "Cảm ơn anh vì đã luôn bao dung, yêu thương và mang lại nụ cười rạng rỡ nhất cho em mỗi ngày."
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
