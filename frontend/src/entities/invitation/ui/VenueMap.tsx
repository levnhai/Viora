import { MapPin } from "lucide-react";
import { FadeIn } from "@/shared/ui/FadeIn";
import { SectionHeading } from "./SectionHeading";

interface VenueMapProps {
  locationName?: string;
  address?: string;
  mapUrl?: string;
}

export function VenueMap({ locationName, address, mapUrl }: VenueMapProps) {
  if (!locationName && !address) return null;

  const isEmbed = mapUrl && (mapUrl.includes("google.com/maps/embed") || mapUrl.includes("maps.google.com/maps"));

  return (
    <section className="py-20 px-4 max-w-3xl mx-auto">
      <FadeIn><SectionHeading en="Map" vi="Đường đến với chúng mình" /></FadeIn>
      <FadeIn delay={100}>
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border" style={{ borderColor: "rgba(201,130,142,0.2)" }}>
          {isEmbed ? (
            <div className="relative h-64 sm:h-80 bg-[#ede2d8]">
              <iframe
                title="Wedding venue map"
                src={mapUrl}
                width="100%" height="100%"
                style={{ border: 0, filter: "sepia(20%) saturate(80%)" }}
                allowFullScreen loading="lazy"
              />
            </div>
          ) : null}
          <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              {locationName && <p className="font-medium text-sm" style={{ fontFamily: "'EB Garamond', serif", color: "#2c1810" }}>{locationName}</p>}
              {address && <p className="text-xs mt-0.5" style={{ color: "#7a5c4f" }}>{address}</p>}
            </div>
            {mapUrl && (
              <a href={mapUrl} target="_blank" rel="noopener noreferrer"
                className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#8b3a52" }}>
                <MapPin size={14} /> Chỉ đường
              </a>
            )}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
