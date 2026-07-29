import { GsapReveal } from "@/shared/ui/GsapReveal";
import { WeddingEvent } from "@/entities/invitation/model/types";
import { MapPin } from "lucide-react";
import { extractIframeSrc } from "@/shared/lib/utils/string";

interface MinimalVenueMapProps {
  event: WeddingEvent;
  primaryColor?: string;
  textColor?: string;
  fontFamily?: string;
}

export function MinimalVenueMap({
  event,
  primaryColor,
  textColor,
  fontFamily,
}: MinimalVenueMapProps) {
  const pColor = textColor || "rgb(225,188,124)";
  const tColor = primaryColor || "rgb(225,188,124)";

  const defaultMapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3741.0116668749845!2d105.975432074558!3d20.341147011039864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31367a14e9f31efb%3A0x88924b4f177c424a!2sNinh%20Binh%20Legend%20Hotel!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s";

  const rawMapUrl = event.mapUrl || defaultMapUrl;
  const mapUrl = extractIframeSrc(rawMapUrl);

  return (
    <section className="sm:py-24 px-4 text-center">
      <GsapReveal direction="up" distance={30}>
        <h2
          className="text-xl font-serif font-bold uppercase tracking-widest mb-2"
          style={{ color: pColor, fontFamily }}
        >
          TIỆC CƯỚI SẼ TỔ CHỨC TẠI
        </h2>
        <p
          className="font-serif text-sm px-4 md:px-12 mb-8 leading-relaxed"
          style={{
            color: pColor,
            fontFamily: "Baskerville, 'Times New Roman', serif",
          }}
        >
          {event.locationName}, {event.address}
        </p>
      </GsapReveal>
      <GsapReveal delay={0.2} direction="up" distance={40}>
        <div
          className="max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-2xl border h-64 sm:h-80 relative bg-[#001005] mb-6"
          style={{ borderColor: pColor }}
        >
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
      </GsapReveal>
    </section>
  );
}
