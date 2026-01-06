const ClothesIllustration = () => {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full max-w-md"
    >
      {/* Clothes hanger with shirt */}
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        {/* Hanger hook */}
        <path d="M200 60 C200 45, 210 40, 210 40 C215 38, 218 42, 215 48" />
        {/* Hanger bar */}
        <path d="M140 100 L200 60 L260 100" />
        
        {/* Shirt outline */}
        <path d="M140 100 L120 130 L145 140 L150 120 L150 200 L250 200 L250 120 L255 140 L280 130 L260 100" />
        <path d="M150 120 L175 115 L200 120 L225 115 L250 120" />
        
        {/* Shirt details - collar */}
        <path d="M180 100 L200 120 L220 100" />
        
        {/* Pocket */}
        <rect x="165" y="140" width="25" height="20" rx="2" />
      </g>

      {/* Hanging pants */}
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
        <path d="M280 220 L280 200 L340 200 L340 220" />
        <path d="M285 220 L290 320" />
        <path d="M335 220 L330 320" />
        <path d="M285 220 L335 220" />
        <path d="M300 220 L305 280" />
        <path d="M320 220 L315 280" />
      </g>

      {/* Weaving loom suggestion */}
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className="text-muted-foreground/60">
        {/* Loom frame */}
        <rect x="50" y="240" width="120" height="100" rx="3" />
        {/* Vertical threads */}
        <line x1="70" y1="250" x2="70" y2="330" />
        <line x1="90" y1="250" x2="90" y2="330" />
        <line x1="110" y1="250" x2="110" y2="330" />
        <line x1="130" y1="250" x2="130" y2="330" />
        <line x1="150" y1="250" x2="150" y2="330" />
        {/* Horizontal weave lines */}
        <path d="M60 270 Q80 265, 100 270 Q120 275, 140 270 Q155 267, 160 270" />
        <path d="M60 290 Q80 295, 100 290 Q120 285, 140 290 Q155 293, 160 290" />
        <path d="M60 310 Q80 305, 100 310 Q120 315, 140 310 Q155 307, 160 310" />
      </g>

      {/* Decorative leaves */}
      <g stroke="currentColor" strokeWidth="1.2" fill="none" className="text-primary/40">
        <path d="M320 80 Q340 70, 350 90 Q340 100, 320 80" />
        <path d="M330 85 L345 75" />
        
        <path d="M60 180 Q40 170, 30 190 Q40 200, 60 180" />
        <path d="M50 185 L35 175" />
        
        <path d="M350 350 Q370 340, 380 360 Q370 370, 350 350" />
        <path d="M360 355 L375 345" />
      </g>

      {/* Heart symbol */}
      <g stroke="currentColor" strokeWidth="1.5" fill="none" className="text-accent">
        <path d="M200 360 C190 350, 175 350, 175 365 C175 380, 200 395, 200 395 C200 395, 225 380, 225 365 C225 350, 210 350, 200 360" />
      </g>

      {/* Recycling arrows hint */}
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/50">
        <path d="M360 180 A30 30 0 0 1 380 210" />
        <path d="M378 205 L380 210 L385 207" />
        <path d="M380 240 A30 30 0 0 1 360 210" />
        <path d="M362 215 L360 210 L355 213" />
      </g>
    </svg>
  );
};

export default ClothesIllustration;
