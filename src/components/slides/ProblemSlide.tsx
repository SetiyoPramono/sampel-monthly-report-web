import { useState, useEffect } from "react";
import { AlertTriangle, CheckCircle2, ChevronRight, Wrench, CloudRain } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ProblemSlide = () => {
  const { t } = useLanguage();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [showRain, setShowRain] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const contentTimer = setTimeout(() => setShowContent(true), 500);
    const rainTimer = setTimeout(() => setShowRain(false), 2000);
    return () => {
      clearTimeout(contentTimer);
      clearTimeout(rainTimer);
    };
  }, []);

  return (
    <div className="h-full flex items-center px-3 md:px-4 pt-12 md:pt-14 pb-2 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--accent)/0.08),transparent_60%)]" />
      
      {/* Rain/Falling Animation */}
      {showRain && (
        <div className="absolute inset-0 pointer-events-none z-20">
          {/* Clouds */}
          <div className="absolute top-0 left-1/4 animate-cloud-float">
            <CloudRain className="w-16 h-16 md:w-24 md:h-24 text-muted-foreground/40" />
          </div>
          <div className="absolute top-4 right-1/4 animate-cloud-float" style={{ animationDelay: "0.5s" }}>
            <CloudRain className="w-12 h-12 md:w-20 md:h-20 text-muted-foreground/30" />
          </div>
          
          {/* Falling items */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-fall-drop"
              style={{
                left: `${5 + (i * 6.5)}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${0.8 + Math.random() * 0.4}s`,
              }}
            >
              <div className="w-2 h-8 md:w-3 md:h-12 bg-gradient-to-b from-accent/60 to-transparent rounded-full" />
            </div>
          ))}
        </div>
      )}
      
      <div className={`max-w-3xl mx-auto relative z-10 w-full transition-all duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        {/* Section header */}
        <div className="text-center mb-3 md:mb-6">
          <span 
            className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-accent/10 text-accent text-xs md:text-sm font-semibold mb-2 md:mb-3 animate-fall-item"
            style={{ animationDelay: "0s" }}
          >
            {t.problems.badge}
          </span>
          <h2 
            className="text-xl sm:text-2xl md:text-4xl font-extrabold mb-1 md:mb-2 animate-fall-item"
            style={{ animationDelay: "0.1s" }}
          >
            {t.problems.title} <span className="gradient-text-accent">{t.problems.titleHighlight}</span>
          </h2>
          <p 
            className="text-muted-foreground text-xs md:text-sm max-w-xl mx-auto hidden sm:block animate-fall-item"
            style={{ animationDelay: "0.2s" }}
          >
            {t.problems.subtitle}
          </p>
        </div>

        {/* Problem cards - Interactive */}
        <div className="space-y-1.5 md:space-y-2 max-h-[45vh] md:max-h-[50vh] overflow-y-auto pr-1 custom-scrollbar">
          {t.problems.items.map((item, index) => (
            <div
              key={index}
              className={`card-glass rounded-lg md:rounded-xl p-2.5 md:p-4 cursor-pointer transition-all duration-300 animate-fall-item ${
                expandedIndex === index ? "border-accent/50 glow-accent" : ""
              }`}
              style={{ animationDelay: `${0.3 + index * 0.08}s` }}
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              <div className="flex items-center gap-2 md:gap-3">
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center ${
                    expandedIndex === index ? "bg-accent/20" : "bg-destructive/10"
                  } transition-colors`}>
                    {expandedIndex === index ? (
                      <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-success" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-destructive" />
                    )}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground text-xs md:text-sm">{item.problem}</h3>
                  <div className={`overflow-hidden transition-all duration-300 ${
                    expandedIndex === index ? "max-h-16 opacity-100 mt-1.5" : "max-h-0 opacity-0"
                  }`}>
                    <div className="flex items-center gap-1.5 text-success">
                      <Wrench className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                      <span className="text-[10px] md:text-xs">{item.solution}</span>
                    </div>
                  </div>
                </div>

                <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${
                  expandedIndex === index ? "rotate-90" : ""
                }`} />
              </div>
            </div>
          ))}
        </div>

        {/* Success meter */}
        <div 
          className="mt-3 md:mt-4 card-glass rounded-xl p-3 md:p-4 animate-fall-item"
          style={{ animationDelay: "0.8s" }}
        >
          <div className="flex items-center justify-between mb-2 md:mb-3">
            <span className="text-xs md:text-sm font-bold">{t.problems.successRate}</span>
            <span className="text-base md:text-xl font-extrabold text-success">100%</span>
          </div>
          <div className="h-2 md:h-2.5 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-1000"
              style={{ 
                width: "100%",
                background: "linear-gradient(90deg, hsl(var(--success)), hsl(var(--primary)))"
              }}
            />
          </div>
          <p className="text-[10px] md:text-xs text-muted-foreground mt-2 hidden sm:block">
            {t.problems.successMessage}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProblemSlide;
