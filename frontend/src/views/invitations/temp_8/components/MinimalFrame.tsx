export function MinimalFrame() {
  return (
    <div className="absolute inset-x-4 inset-y-6 sm:inset-x-8 sm:inset-y-10 border border-[rgb(225,188,124)]/40 pointer-events-none z-10 flex flex-col justify-between overflow-visible">
      {/* Top Center Ornament */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[rgb(45,4,9)] px-4 flex items-center gap-2 text-[rgb(249,223,223)]">
        <span className="w-1.5 h-1.5 rounded-full bg-[rgb(249,223,223)]" />
        <span className="w-1 h-1 rounded-full bg-[rgb(249,223,223)] opacity-70" />
        <span className="w-8 h-[1px] bg-[rgb(249,223,223)]" />
        <span className="text-xl">❖</span>
        <span className="w-8 h-[1px] bg-[rgb(249,223,223)]" />
        <span className="w-1 h-1 rounded-full bg-[rgb(249,223,223)] opacity-70" />
        <span className="w-1.5 h-1.5 rounded-full bg-[rgb(249,223,223)]" />
      </div>

      {/* Bottom Center Ornament */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-[rgb(45,4,9)] px-4 flex items-center gap-2 text-[rgb(249,223,223)]">
        <span className="w-1.5 h-1.5 rounded-full bg-[rgb(249,223,223)]" />
        <span className="w-1 h-1 rounded-full bg-[rgb(249,223,223)] opacity-70" />
        <span className="w-8 h-[1px] bg-[rgb(249,223,223)]" />
        <span className="text-xl">❖</span>
        <span className="w-8 h-[1px] bg-[rgb(249,223,223)]" />
        <span className="w-1 h-1 rounded-full bg-[rgb(249,223,223)] opacity-70" />
        <span className="w-1.5 h-1.5 rounded-full bg-[rgb(249,223,223)]" />
      </div>

      {/* Top Left Corner */}
      <div className="absolute -top-[2px] -left-[2px] w-16 h-16 sm:w-20 sm:h-20 -translate-x-[40%] -translate-y-[40%]">
        <CornerOrnament />
      </div>
      
      {/* Top Right Corner */}
      <div className="absolute -top-[2px] -right-[2px] w-16 h-16 sm:w-20 sm:h-20 translate-x-[40%] -translate-y-[40%] rotate-90">
        <CornerOrnament />
      </div>

      {/* Bottom Right Corner */}
      <div className="absolute -bottom-[2px] -right-[2px] w-16 h-16 sm:w-20 sm:h-20 translate-x-[40%] translate-y-[40%] rotate-180">
        <CornerOrnament />
      </div>

      {/* Bottom Left Corner */}
      <div className="absolute -bottom-[2px] -left-[2px] w-16 h-16 sm:w-20 sm:h-20 -translate-x-[40%] translate-y-[40%] -rotate-90">
        <CornerOrnament />
      </div>
    </div>
  );
}

function CornerOrnament() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-visible">
      <path d="M 30 100 L 30 40 C 30 30, 40 30, 50 30" stroke="rgb(249,223,223)" strokeWidth="2" fill="none"/>
      <path d="M 100 30 L 40 30 C 30 30, 30 40, 30 50" stroke="rgb(249,223,223)" strokeWidth="2" fill="none"/>
      
      {/* Ornate swirls */}
      <path d="M 50 30 C 60 30, 70 20, 60 10 C 50 0, 40 10, 50 20 C 60 30, 75 40, 90 40" stroke="rgb(249,223,223)" strokeWidth="1" fill="none"/>
      <path d="M 30 50 C 30 60, 20 70, 10 60 C 0 50, 10 40, 20 50 C 30 60, 40 75, 40 90" stroke="rgb(249,223,223)" strokeWidth="1" fill="none"/>
      
      {/* Center piece */}
      <path d="M 25 25 Q 40 10 55 25 Q 40 40 25 25" fill="rgb(249,223,223)" opacity="0.8"/>
      
      {/* Decorative dots */}
      <circle cx="25" cy="25" r="4" fill="rgb(249,223,223)"/>
      <circle cx="60" cy="10" r="2" fill="rgb(249,223,223)"/>
      <circle cx="10" cy="60" r="2" fill="rgb(249,223,223)"/>
      <circle cx="90" cy="40" r="2" fill="rgb(249,223,223)"/>
      <circle cx="40" cy="90" r="2" fill="rgb(249,223,223)"/>
      <circle cx="45" cy="45" r="1.5" fill="rgb(249,223,223)"/>
    </svg>
  );
}
