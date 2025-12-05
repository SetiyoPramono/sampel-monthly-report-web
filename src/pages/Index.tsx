import { useState, useCallback, useEffect, useRef } from "react";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ControlPanel from "@/components/ControlPanel";
import SlideNavigation from "@/components/SlideNavigation";
import SlideTransition from "@/components/SlideTransition";
import HeroSlide from "@/components/slides/HeroSlide";
import AchievementsSlide from "@/components/slides/AchievementsSlide";
import ProblemSlide from "@/components/slides/ProblemSlide";
import InnovationSlide from "@/components/slides/InnovationSlide";
import ConclusionSlide from "@/components/slides/ConclusionSlide";

const slides = [
  { id: "hero", component: HeroSlide },
  { id: "achievements", component: AchievementsSlide },
  { id: "problems", component: ProblemSlide },
  { id: "innovations", component: InnovationSlide },
  { id: "conclusion", component: ConclusionSlide },
];

const PresentationContent = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | "initial">("initial");
  const prevSlideRef = useRef(0);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < slides.length && index !== currentSlide) {
      setDirection(index > currentSlide ? "right" : "left");
      prevSlideRef.current = currentSlide;
      setCurrentSlide(index);
    }
  }, [currentSlide]);

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide - 1);
  }, [currentSlide, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const CurrentSlideComponent = slides[currentSlide].component;

  return (
    <main className="h-screen bg-background overflow-hidden relative flex flex-col">
      <ControlPanel />
      
      {/* Slide content with creative transitions */}
      <div className="flex-1 overflow-hidden relative">
        {/* Background transition effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        
        <SlideTransition slideKey={currentSlide} direction={direction}>
          <CurrentSlideComponent />
        </SlideTransition>
      </div>

      <SlideNavigation
        currentSlide={currentSlide}
        totalSlides={slides.length}
        onPrev={prevSlide}
        onNext={nextSlide}
        onGoTo={goToSlide}
      />
    </main>
  );
};

const Index = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <PresentationContent />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default Index;