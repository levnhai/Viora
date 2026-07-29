import {
  Cinzel,
  Great_Vibes,
  EB_Garamond,
  Montserrat,
  Playfair_Display,
  Dancing_Script,
  Cormorant_Garamond,
} from "next/font/google";

export const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const ebGaramond = EB_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const playfairDisplay = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const dancingScript = Dancing_Script({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

