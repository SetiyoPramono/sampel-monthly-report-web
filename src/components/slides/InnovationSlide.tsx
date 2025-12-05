import { Lightbulb, Bot, LayoutDashboard, Palette, Lock, BookOpen, Fish } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";

const icons = [Bot, LayoutDashboard, Palette, Lock, BookOpen];

const InnovationSlide = () => {
  const { t } = useLanguage();
  const [showFish, setShowFish] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [fishMouthOpen, setFishMouthOpen] = useState(false);

  useEffect(() => {
    // Fish swims in
    const mouthTimer = setTimeout(() => setFishMouthOpen(true), 600);
    const contentTimer = setTimeout(() => setShowContent(true), 900);
    const fishTimer = setTimeout(() => setShowFish(false), 2000);
    
    return () => {
      clearTimeout(mouthTimer);
      clearTimeout(contentTimer);
      clearTimeout(fishTimer);
    };
  }, []);

  return (
    <div className="h-full flex items-center px-3 md:px-4 pt-12 md:pt-14 pb-2 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--secondary)/0.1),transparent_50%)]" />
      
      {/* Fish Animation */}
      {showFish && (
        <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
          {/* Bubbles */}
          <div className="absolute">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-bubble"
                style={{
                  left: `${-30 + Math.random() * 60}px`,
                  bottom: `${-50 + i * 20}px`,
                  animationDelay: `${i * 0.15}s`,
                }}
              >
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-secondary/40 border border-secondary/60" />
              </div>
            ))}
          </div>
          
          {/* Fish */}
          <div className="animate-fish-swim relative">
            <Fish 
              className={`w-24 h-24 md:w-40 md:h-40 text-secondary transition-transform duration-300 ${fishMouthOpen ? 'scale-110' : 'scale-100'}`} 
            />
            {/* Fish eye glow */}
            <div className="absolute top-1/3 left-1/3 w-2 h-2 md:w-3 md:h-3 rounded-full bg-accent animate-pulse" />
            
            {/* Items coming out of fish mouth */}
            {fishMouthOpen && (
              <div className="absolute left-full top-1/2 -translate-y-1/2 flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="animate-fish-spit"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="w-4 h-4 md:w-6 md:h-6 rounded-lg bg-gradient-to-br from-secondary to-primary" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className={`max-w-5xl mx-auto relative z-10 w-full transition-all duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        {/* Section header */}
        <div className="text-center mb-3 md:mb-6">
          <span 
            className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-secondary/10 text-secondary text-xs md:text-sm font-semibold mb-2 md:mb-3 animate-fish-item"
            style={{ animationDelay: "0s" }}
          >
            {t.innovations.badge}
          </span>
          <h2 
            className="text-xl sm:text-2xl md:text-4xl font-extrabold mb-1 md:mb-2 animate-fish-item"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="text-foreground">{t.innovations.title} </span>
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-secondary)" }}>
              {t.innovations.titleHighlight}
            </span>
          </h2>
          <p 
            className="text-muted-foreground text-xs md:text-sm max-w-xl mx-auto hidden sm:block animate-fish-item"
            style={{ animationDelay: "0.2s" }}
          >
            {t.innovations.subtitle}
          </p>
        </div>

        {/* Innovation cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
          {t.innovations.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <div
                key={item.title}
                className="group relative animate-fish-item"
                style={{ animationDelay: `${0.3 + index * 0.12}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative card-glass rounded-xl p-2.5 md:p-4 h-full hover:border-secondary/50 transition-all duration-300 group-hover:-translate-y-1">
                  <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                    <div className="p-1.5 md:p-2 rounded-lg bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                      <Icon className="w-4 h-4 md:w-5 md:h-5 text-secondary" />
                    </div>
                    <Lightbulb className="w-3 h-3 md:w-4 md:h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-xs md:text-sm font-bold text-foreground mb-0.5 md:mb-1 line-clamp-1">{item.title}</h3>
                  <p className="text-[10px] md:text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InnovationSlide;
