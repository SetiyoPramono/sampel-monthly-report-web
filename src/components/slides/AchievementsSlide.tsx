import { Globe, Database, Shield, Mail, Clock, FileCode, Plug, Train } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const icons = [Globe, Database, Shield, Mail, Clock, FileCode, Plug];
const colors = [
  { text: "text-primary", gradient: "from-primary/20 to-primary/5" },
  { text: "text-success", gradient: "from-success/20 to-success/5" },
  { text: "text-accent", gradient: "from-accent/20 to-accent/5" },
  { text: "text-secondary", gradient: "from-secondary/20 to-secondary/5" },
  { text: "text-primary", gradient: "from-primary/20 to-primary/5" },
  { text: "text-success", gradient: "from-success/20 to-success/5" },
  { text: "text-accent", gradient: "from-accent/20 to-accent/5" },
];
const counts = ["50+", "40+", "✓", "✓", "✓", "✓", "✓"];

const AchievementsSlide = () => {
  const { t } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showTrain, setShowTrain] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const contentTimer = setTimeout(() => setShowContent(true), 600);
    const trainTimer = setTimeout(() => setShowTrain(false), 1800);
    return () => {
      clearTimeout(contentTimer);
      clearTimeout(trainTimer);
    };
  }, []);

  return (
    <div className="h-full flex items-center px-3 md:px-4 pt-12 md:pt-14 pb-2 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--success)/0.08),transparent_60%)]" />
      
      {/* Train Animation */}
      {showTrain && (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
          {/* Train track */}
          <div className="absolute bottom-1/3 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-muted-foreground/30 to-transparent" />
          <div className="absolute bottom-1/3 left-0 right-0 flex gap-8 animate-track-move">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="w-4 h-2 bg-muted-foreground/20 rounded-sm flex-shrink-0" />
            ))}
          </div>
          
          {/* Train */}
          <div className="absolute bottom-1/3 animate-train-enter">
            <div className="flex items-end">
              {/* Locomotive */}
              <div className="relative">
                <Train className="w-12 h-12 md:w-20 md:h-20 text-primary transform -scale-x-100" />
                {/* Steam */}
                <div className="absolute -top-4 left-2 flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i}
                      className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-muted-foreground/40 animate-steam"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
              {/* Wagons */}
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i}
                  className="w-8 h-6 md:w-12 md:h-10 bg-gradient-to-b from-accent to-accent/70 rounded-t-lg mx-0.5 animate-wagon-bounce"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      
      <div className={`max-w-6xl mx-auto relative z-10 w-full transition-all duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        {/* Section header */}
        <div className="text-center mb-3 md:mb-6">
          <span 
            className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-success/10 text-success text-xs md:text-sm font-semibold mb-2 md:mb-3 animate-train-item"
            style={{ animationDelay: "0.1s" }}
          >
            {t.achievements.badge}
          </span>
          <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold mb-1 md:mb-2 animate-train-item" style={{ animationDelay: "0.2s" }}>
            {t.achievements.title} <span className="gradient-text">{t.achievements.titleHighlight}</span>
          </h2>
          <p className="text-muted-foreground text-xs md:text-sm max-w-xl mx-auto hidden sm:block animate-train-item" style={{ animationDelay: "0.3s" }}>
            {t.achievements.subtitle}
          </p>
        </div>

        {/* Achievement cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
          {t.achievements.items.slice(0, 7).map((item, index) => {
            const Icon = icons[index];
            const color = colors[index];
            return (
              <div
                key={item.title}
                className={`card-glass rounded-xl p-2.5 md:p-4 cursor-pointer transition-all duration-300 bg-gradient-to-br ${color.gradient} animate-train-item`}
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div 
                  className="transition-transform duration-300"
                  style={{ transform: hoveredIndex === index ? "scale(1.02)" : "scale(1)" }}
                >
                  <div className="flex items-center justify-between mb-2 md:mb-3">
                    <div className={`p-1.5 md:p-2 rounded-lg bg-card ${color.text}`}>
                      <Icon className="w-3.5 h-3.5 md:w-5 md:h-5" />
                    </div>
                    <span className={`text-base md:text-xl font-extrabold ${color.text}`}>
                      {counts[index]}
                    </span>
                  </div>
                  <h3 className="text-xs md:text-sm font-bold text-foreground mb-0.5 md:mb-1 line-clamp-1">{item.title}</h3>
                  <p className="text-[10px] md:text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                  
                  {/* Progress bar visual */}
                  <div className="mt-2 md:mt-3 h-0.5 md:h-1 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-700"
                      style={{ 
                        width: hoveredIndex === index ? "100%" : "75%",
                        background: `linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary) / 0.5))`
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AchievementsSlide;
