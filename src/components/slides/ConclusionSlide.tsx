import { Trophy, Target, TrendingUp, Star, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";

// Mini Naruto SVG Component
const MiniNaruto = ({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) => (
  <div className={`relative ${className}`} style={style}>
    {/* Body */}
    <div className="w-6 h-8 md:w-8 md:h-10 bg-gradient-to-b from-orange-400 to-orange-500 rounded-t-full relative">
      {/* Head */}
      <div className="absolute -top-4 md:-top-5 left-1/2 -translate-x-1/2 w-5 h-5 md:w-7 md:h-7 bg-[#FFE4B5] rounded-full">
        {/* Hair */}
        <div className="absolute -top-1 left-0 right-0 h-3 md:h-4 bg-yellow-400 rounded-t-full" />
        <div className="absolute -top-1 -left-1 w-2 h-3 md:w-3 md:h-4 bg-yellow-400 rounded-full transform -rotate-12" />
        <div className="absolute -top-1 -right-1 w-2 h-3 md:w-3 md:h-4 bg-yellow-400 rounded-full transform rotate-12" />
        {/* Headband */}
        <div className="absolute top-1 left-0 right-0 h-1.5 md:h-2 bg-blue-600 flex items-center justify-center">
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-300 rounded-sm" />
        </div>
        {/* Face marks */}
        <div className="absolute top-2 md:top-3 left-0.5 flex flex-col gap-0.5">
          <div className="w-1 h-px bg-gray-800" />
          <div className="w-1 h-px bg-gray-800" />
          <div className="w-1 h-px bg-gray-800" />
        </div>
        <div className="absolute top-2 md:top-3 right-0.5 flex flex-col gap-0.5">
          <div className="w-1 h-px bg-gray-800" />
          <div className="w-1 h-px bg-gray-800" />
          <div className="w-1 h-px bg-gray-800" />
        </div>
        {/* Eyes */}
        <div className="absolute top-2.5 md:top-3 left-1 w-1 h-1 bg-blue-600 rounded-full" />
        <div className="absolute top-2.5 md:top-3 right-1 w-1 h-1 bg-blue-600 rounded-full" />
        {/* Smile */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-0.5 border-b-2 border-gray-800 rounded-full" />
      </div>
    </div>
    {/* Sparkle effect */}
    <Sparkles className="absolute -top-6 -right-2 w-3 h-3 md:w-4 md:h-4 text-yellow-400 animate-pulse" />
  </div>
);

const ConclusionSlide = () => {
  const { t } = useLanguage();
  const [showNarutos, setShowNarutos] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [narutoCount, setNarutoCount] = useState(1);

  useEffect(() => {
    // Shadow clone jutsu effect - narutos multiply
    const clone1 = setTimeout(() => setNarutoCount(3), 300);
    const clone2 = setTimeout(() => setNarutoCount(6), 600);
    const clone3 = setTimeout(() => setNarutoCount(9), 900);
    const contentTimer = setTimeout(() => setShowContent(true), 1000);
    const hideTimer = setTimeout(() => setShowNarutos(false), 2200);
    
    return () => {
      clearTimeout(clone1);
      clearTimeout(clone2);
      clearTimeout(clone3);
      clearTimeout(contentTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const performanceItems = [
    { icon: Target, label: t.conclusion.performance.focus, value: "100%" },
    { icon: TrendingUp, label: t.conclusion.performance.improvement, value: "↑" },
    { icon: Star, label: t.conclusion.performance.rating, value: "⭐⭐⭐⭐⭐" },
  ];

  // Naruto positions for shadow clone effect
  const narutoPositions = [
    { x: "50%", y: "50%", delay: 0 },
    { x: "30%", y: "40%", delay: 0.1 },
    { x: "70%", y: "40%", delay: 0.15 },
    { x: "20%", y: "55%", delay: 0.2 },
    { x: "80%", y: "55%", delay: 0.25 },
    { x: "40%", y: "65%", delay: 0.3 },
    { x: "60%", y: "65%", delay: 0.35 },
    { x: "25%", y: "35%", delay: 0.4 },
    { x: "75%", y: "35%", delay: 0.45 },
  ];

  return (
    <div className="h-full flex items-center px-3 md:px-4 pt-12 md:pt-14 pb-2 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-primary/10 rounded-full blur-[100px] md:blur-[150px]" />
      
      {/* Naruto Shadow Clone Animation */}
      {showNarutos && (
        <div className="absolute inset-0 pointer-events-none z-20">
          {/* Smoke poof effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-smoke-poof">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/30 animate-smoke-expand"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    left: `${Math.cos(i * 72 * Math.PI / 180) * 20}px`,
                    top: `${Math.sin(i * 72 * Math.PI / 180) * 20}px`,
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Narutos appearing */}
          {narutoPositions.slice(0, narutoCount).map((pos, i) => (
            <div
              key={i}
              className="absolute animate-naruto-appear"
              style={{
                left: pos.x,
                top: pos.y,
                transform: "translate(-50%, -50%)",
                animationDelay: `${pos.delay}s`,
              }}
            >
              <MiniNaruto className="animate-naruto-jump" style={{ animationDelay: `${pos.delay + 0.5}s` }} />
            </div>
          ))}
          
          {/* "Kage Bunshin no Jutsu!" text */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 animate-jutsu-text">
            <span className="text-xs md:text-sm font-bold text-orange-500 whitespace-nowrap">
              影分身の術!
            </span>
          </div>
        </div>
      )}
      
      <div className={`max-w-3xl mx-auto relative z-10 w-full transition-all duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        {/* Section header */}
        <div className="text-center mb-3 md:mb-6">
          <span 
            className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-semibold mb-2 md:mb-3 animate-naruto-item"
            style={{ animationDelay: "0s" }}
          >
            {t.conclusion.badge}
          </span>
          <h2 
            className="text-xl sm:text-2xl md:text-4xl font-extrabold mb-1 md:mb-2 animate-naruto-item"
            style={{ animationDelay: "0.1s" }}
          >
            {t.conclusion.title} <span className="gradient-text">{t.conclusion.titleHighlight}</span>
          </h2>
        </div>

        {/* Summary card */}
        <div 
          className="card-glass rounded-2xl md:rounded-3xl p-4 md:p-8 glow-primary animate-naruto-item"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-5">
            <Trophy className="w-6 h-6 md:w-10 md:h-10 text-accent animate-float" />
            <div className="text-4xl sm:text-5xl md:text-7xl font-extrabold gradient-text">150+</div>
          </div>
          
          <p className="text-center text-sm md:text-lg text-muted-foreground mb-3 md:mb-5">
            {t.conclusion.totalTasks}
          </p>

          {/* Category tags */}
          <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 mb-4 md:mb-6">
            {t.conclusion.categories.map((tag, index) => (
              <span
                key={tag}
                className="px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-muted text-foreground text-[10px] md:text-xs font-medium hover:bg-primary/20 hover:text-primary transition-colors cursor-default animate-naruto-item"
                style={{ animationDelay: `${0.3 + index * 0.05}s` }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Performance indicators */}
          <div className="grid grid-cols-3 gap-2 md:gap-3">
            {performanceItems.map((item, index) => (
              <div 
                key={item.label} 
                className="text-center p-2 md:p-3 rounded-lg md:rounded-xl bg-card/50 animate-naruto-item"
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                <item.icon className="w-4 h-4 md:w-5 md:h-5 text-primary mx-auto mb-1 md:mb-2" />
                <div className="text-xs md:text-base font-bold text-foreground">{item.value}</div>
                <div className="text-[10px] md:text-xs text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing message */}
        <div 
          className="text-center mt-3 md:mt-5 animate-naruto-item"
          style={{ animationDelay: "0.8s" }}
        >
          <div className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-1.5 md:py-2 rounded-full bg-success/10 text-success text-xs md:text-sm font-semibold">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-success animate-pulse" />
            {t.conclusion.status}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConclusionSlide;
