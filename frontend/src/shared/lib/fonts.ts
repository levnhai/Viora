import { Cinzel, Great_Vibes, EB_Garamond, Montserrat, Playfair_Display } from "next/font/google";

export const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "400", "600"],
  display: "swap",
});

export const playfairDisplay = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
