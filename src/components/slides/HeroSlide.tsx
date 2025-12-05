import { useEffect, useState } from "react";
import { Sparkles, Zap, TrendingUp, Calendar, Rocket } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AnimatedCounter = ({ target, suffix = "", delay = 0 }: { target: number; suffix?: string; delay?: number }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target, started]);

  return <span>{count}{suffix}</span>;
};

const HeroSlide = () => {
  const { t } = useLanguage();
  const [showRockets, setShowRockets] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Rockets fly in and gather
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 800);
    
    const hideRocketsTimer = setTimeout(() => {
      setShowRockets(false);
    }, 1500);

    return () => {
      clearTimeout(contentTimer);
      clearTimeout(hideRocketsTimer);
    };
  }, []);

  const stats = [
    { label: t.hero.stats.totalTask, value: 150, suffix: "+", icon: Sparkles, color: "text-primary" },
    { label: t.hero.stats.websiteSetup, value: 50, suffix: "+", icon: Zap, color: "text-accent" },
    { label: t.hero.stats.backupDone, value: 40, suffix: "+", icon: TrendingUp, color: "text-success" },
    { label: t.hero.stats.issuesFixed, value: 20, suffix: "+", icon: Sparkles, color: "text-secondary" },
  ];

  // Rocket starting positions (from edges)
  const rocketPositions = [
    { startX: "-100%", startY: "20%", rotate: "45deg" },
    { startX: "200%", startY: "30%", rotate: "-135deg" },
    { startX: "-50%", startY: "150%", rotate: "-45deg" },
    { startX: "150%", startY: "-50%", rotate: "135deg" },
    { startX: "50%", startY: "-100%", rotate: "180deg" },
    { startX: "-80%", startY: "80%", rotate: "30deg" },
  ];

  return (
    <div className="relative h-full flex items-center justify-center px-3 md:px-4 pt-12 md:pt-14 pb-2 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_50%)]" />
      <div className="absolute top-10 left-5 w-32 md:w-72 h-32 md:h-72 bg-primary/20 rounded-full blur-[60px] md:blur-[100px] animate-pulse" />
      <div className="absolute bottom-10 right-5 w-40 md:w-96 h-40 md:h-96 bg-secondary/20 rounded-full blur-[80px] md:blur-[120px] animate-pulse" />
      
      {/* Flying Rockets Animation */}
      {showRockets && (
        <div className="absolute inset-0 pointer-events-none z-20">
          {rocketPositions.map((pos, i) => (
            <div
              key={i}
              className="absolute animate-rocket-fly"
              style={{
                left: pos.startX,
                top: pos.startY,
                animationDelay: `${i * 0.1}s`,
                transform: `rotate(${pos.rotate})`,
              }}
            >
              <Rocket className="w-6 h-6 md:w-10 md:h-10 text-primary drop-shadow-lg" />
              {/* Rocket trail */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-2 h-8 bg-gradient-to-t from-transparent via-accent/50 to-accent rounded-full blur-sm" />
            </div>
          ))}
        </div>
      )}

      {/* Gathering explosion effect */}
      {showContent && !showRockets && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
          <div className="animate-explosion-ring w-32 h-32 md:w-64 md:h-64 rounded-full border-4 border-primary/50" />
        </div>
      )}

      {/* Floating elements - hidden on mobile */}
      <div className="absolute top-20 right-10 animate-float hidden lg:block">
        <div className="card-glass p-3 rounded-xl">
          <Zap className="w-6 h-6 text-accent" />
        </div>
      </div>
      <div className="absolute bottom-32 left-10 animate-float hidden lg:block" style={{ animationDelay: "2s" }}>
        <div className="card-glass p-3 rounded-xl">
          <TrendingUp className="w-6 h-6 text-success" />
        </div>
      </div>

      <div className={`relative z-10 max-w-5xl mx-auto text-center w-full transition-all duration-700 ${showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
        {/* Badge */}
        <div 
          className="inline-flex items-center gap-1.5 md:gap-2 stat-badge mb-3 md:mb-6 text-xs md:text-sm px-3 py-1.5 md:px-4 md:py-2 animate-rocket-item"
          style={{ animationDelay: "0.1s" }}
        >
          <Calendar className="w-3 h-3 md:w-4 md:h-4" />
          <span>{t.hero.badge}</span>
        </div>

        {/* Main title */}
        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold mb-2 md:mb-4 leading-tight">
          <span className="gradient-text inline-block animate-rocket-item" style={{ animationDelay: "0.2s" }}>{t.hero.title1}</span>
          <br />
          <span className="text-foreground inline-block animate-rocket-item" style={{ animationDelay: "0.3s" }}>{t.hero.title2}</span>
        </h1>

        <p 
          className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-4 md:mb-8 max-w-2xl mx-auto px-2 animate-rocket-item"
          style={{ animationDelay: "0.4s" }}
        >
          {t.hero.subtitle}
        </p>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 px-1">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="card-glass rounded-xl md:rounded-2xl p-2.5 md:p-4 hover:scale-105 transition-all duration-300 animate-rocket-item"
              style={{ animationDelay: `${0.5 + index * 0.15}s` }}
            >
              <stat.icon className={`w-4 md:w-6 h-4 md:h-6 ${stat.color} mb-1.5 md:mb-2 mx-auto`} />
              <div className={`text-xl sm:text-2xl md:text-4xl font-extrabold ${stat.color} mb-0.5 md:mb-1`}>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} delay={800 + index * 150} />
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground font-medium leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Hint - hidden on mobile */}
        <div className="mt-3 md:mt-6 animate-pulse hidden md:block">
          <p className="text-xs md:text-sm text-muted-foreground">{t.hero.scrollHint}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSlide;
