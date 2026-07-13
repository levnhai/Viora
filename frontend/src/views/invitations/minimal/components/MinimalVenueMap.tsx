import { FadeIn } from "@/shared/ui/FadeIn";
import { WeddingEvent } from "@/entities/invitation/model/types";
import { MapPin } from "lucide-react";

interface MinimalVenueMapProps {
  event: WeddingEvent;
}

export function MinimalVenueMap({ event }: MinimalVenueMapProps) {
  // Always render for demo purposes, if no mapUrl, use a fallback map for Ninh Binh Legend
  const defaultMapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3741.0116668749845!2d105.975432074558!3d20.341147011039864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31367a14e9f31efb%3A0x88924b4f177c424a!2sNinh%20Binh%20Legend%20Hotel!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s";
  
  const mapUrl = event.mapUrl || defaultMapUrl;

  return (
    <section className="py-12 px-4 text-center">
      <FadeIn>
        <h2 className="text-xl text-[rgb(225,188,124)] font-serif uppercase tracking-widest mb-4">
          TIỆC CƯỚI SẼ TỔ CHỨC TẠI
        </h2>
        <p className="text-[rgb(225,188,124)] font-serif text-sm px-4 md:px-12 mb-8 leading-relaxed">
          {event.locationName}, {event.address}
        </p>
      </FadeIn>
      <FadeIn delay={100}>
        <div className="max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-[rgb(225,188,124)]/30 h-64 sm:h-80 relative bg-[#001005] mb-6">
          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="relative z-10"
          ></iframe>
        </div>
        
      </FadeIn>
    </section>
  );
}
