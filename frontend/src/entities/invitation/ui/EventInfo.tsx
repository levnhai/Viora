import { Clock, MapPin } from "lucide-react";
import { FadeIn } from "@/shared/ui/FadeIn";
import { SectionHeading } from "./SectionHeading";
import { WeddingEvent } from "../model/types";

interface EventInfoProps {
  events?: WeddingEvent[];
  groomFatherName?: string;
  groomMotherName?: string;
  brideFatherName?: string;
  brideMotherName?: string;
}

export function EventInfo({
  events,
  groomFatherName,
  groomMotherName,
  brideFatherName,
  brideMotherName,
}: EventInfoProps) {
  if (!events || events.length === 0) return null;

  return (
    <section className="py-20 px-4 max-w-3xl mx-auto">
      <FadeIn><SectionHeading en="Event" vi="Thông tin hôn lễ" /></FadeIn>

      {/* Parents Section */}
      {(groomFatherName || groomMotherName || brideFatherName || brideMotherName) && (
        <FadeIn delay={50}>
          <div className="grid grid-cols-2 gap-4 text-sm mb-12 max-w-2xl mx-auto text-muted-foreground">
            <div className="text-center space-y-1 border-r border-primary/20">
              <h4 className="font-semibold uppercase tracking-wider text-xs mb-1 text-primary">Đại diện Nhà Trai</h4>
              {groomFatherName && <p>Bố: {groomFatherName}</p>}
              {groomMotherName && <p>Mẹ: {groomMotherName}</p>}
            </div>
            <div className="text-center space-y-1">
              <h4 className="font-semibold uppercase tracking-wider text-xs mb-1 text-primary">Đại diện Nhà Gái</h4>
              {brideFatherName && <p>Bố: {brideFatherName}</p>}
              {brideMotherName && <p>Mẹ: {brideMotherName}</p>}
            </div>
          </div>
        </FadeIn>
      )}

      {/* Events Cards */}
      <FadeIn delay={100}>
        <div className={`grid grid-cols-1 ${events.length > 1 ? 'sm:grid-cols-2' : 'max-w-md mx-auto'} gap-6`}>
          {events.map((ev, i) => (
            <div key={i} className="bg-card rounded-2xl p-7 shadow-sm border border-primary/20 text-center flex flex-col justify-between">
              <div>
                <div className="text-3xl mb-4">{ev.title.toUpperCase().includes("VU QUY") ? "🌸" : "💐"}</div>
                <h3 className="text-xl mb-4 text-primary" style={{ fontFamily: "'EB Garamond', serif" }}>{ev.title}</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center gap-2">
                    <Clock size={13} className="text-primary" />
                    <span>{ev.time} · {ev.date}</span>
                  </div>
                  <div className="flex items-start justify-center gap-2">
                    <MapPin size={13} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-left">{ev.locationName} — {ev.address}</span>
                  </div>
                </div>
              </div>
              {ev.mapUrl && (
                <a 
                  href={ev.mapUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="mt-6 inline-block text-xs px-3 py-2 rounded-lg text-center font-medium hover:opacity-90 transition-opacity bg-primary/10 text-primary"
                >
                  📍 Xem bản đồ đường đi
                </a>
              )}
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
