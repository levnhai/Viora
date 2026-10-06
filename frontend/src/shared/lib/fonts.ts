// Các font Google đã được nạp toàn cục qua CSS tại fonts.css.
// Định nghĩa font helper an toàn tương thích 100% với next/font object schema
// mà không cần tải font qua internet trong quá trình build của Vercel (ngăn chặn lỗi TypeError / AbortError khi build).

interface NextFontShim {
  className: string;
  variable: string;
  style: { fontFamily: string };
}

function createFontShim(fontFamily: string, fallback: string = "sans-serif"): NextFontShim {
  const safeClass = `font-${fontFamily.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
  return {
    className: safeClass,
    variable: `--${safeClass}`,
    style: {
      fontFamily: `'${fontFamily}', ${fallback}`,
    },
  };
}

export const pinyonScript = createFontShim("Pinyon Script", "cursive");
export const monsieurLaDoulaise = createFontShim("Monsieur La Doulaise", "cursive");
export const cinzel = createFontShim("Cinzel", "serif");
export const cinzelDecorative = createFontShim("Cinzel Decorative", "serif");
export const alexBrush = createFontShim("Alex Brush", "cursive");
export const greatVibes = createFontShim("Great Vibes", "cursive");
export const ebGaramond = createFontShim("EB Garamond", "serif");
export const montserrat = createFontShim("Montserrat", "sans-serif");
export const playfairDisplay = createFontShim("Playfair Display", "serif");
export const dancingScript = createFontShim("Dancing Script", "cursive");
export const cormorantGaramond = createFontShim("Cormorant Garamond", "serif");



