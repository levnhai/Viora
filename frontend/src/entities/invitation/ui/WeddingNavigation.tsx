import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface WeddingNavigationProps {
  groomName: string;
  brideName: string;
  isFixed?: boolean;
}

export function WeddingNavigation({
  groomName,
  brideName,
  isFixed = true,
}: WeddingNavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#cover", label: "Bìa" },
    { href: "#countdown", label: "Đếm Ngược" },
    { href: "#love-story", label: "Câu Chuyện" },
    { href: "#gallery", label: "Album" },
    { href: "#events", label: "Sự Kiện" },
    { href: "#gift", label: "Mừng Cưới" },
    { href: "#guestbook", label: "Lưu Bút" },
  ];

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const initialGroom = groomName.split(" ").pop() || groomName;
  const initialBride = brideName.split(" ").pop() || brideName;

  return (
    <nav
      className={`${isFixed ? "fixed" : "absolute"} top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm border-b border-border py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#cover"
          onClick={(e) => handleLinkClick(e, "#cover")}
          className="text-2xl font-semibold hover:opacity-85 transition-opacity"
          style={{
            fontFamily: "'Great Vibes', cursive",
            color: "var(--primary)",
          }}
        >
          {initialGroom} & {initialBride}
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-xs uppercase tracking-widest font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground hover:text-primary transition-colors border-0 bg-transparent cursor-pointer"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border shadow-lg py-4 flex flex-col items-center gap-4 animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-xs uppercase tracking-widest font-medium text-foreground/80 hover:text-primary py-2 w-full text-center transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
