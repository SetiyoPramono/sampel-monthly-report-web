import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface SlideNavigationProps {
  currentSlide: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (index: number) => void;
}

const SlideNavigation = ({ currentSlide, totalSlides, onPrev, onNext, onGoTo }: SlideNavigationProps) => {
  const { t } = useLanguage();

  return (
    <div className="flex-shrink-0 z-50 px-3 py-2 md:px-4 md:py-3 bg-gradient-to-t from-background via-background/95 to-transparent">
      <div className="max-w-4xl mx-auto">
        {/* Progress dots */}
        <div className="flex justify-center gap-1.5 md:gap-2 mb-2 md:mb-3">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => onGoTo(index)}
              className={`h-2 md:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-primary w-5 md:w-8 shadow-lg shadow-primary/50"
                  : "bg-muted w-2 md:w-3 hover:bg-muted-foreground/50"
              }`}
              aria-label={`${t.navigation.slide} ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between gap-2 md:gap-4">
          <button
            onClick={onPrev}
            disabled={currentSlide === 0}
            className="flex items-center gap-1 md:gap-2 px-3 py-2 md:px-5 md:py-2.5 rounded-lg md:rounded-xl bg-card border border-border hover:border-primary/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 group"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="text-xs md:text-sm font-semibold text-foreground hidden sm:inline">{t.navigation.prev}</span>
          </button>

          <div className="text-center">
            <span className="text-xs md:text-sm text-muted-foreground">
              {currentSlide + 1} / {totalSlides}
            </span>
          </div>

          <button
            onClick={onNext}
            disabled={currentSlide === totalSlides - 1}
            className="flex items-center gap-1 md:gap-2 px-3 py-2 md:px-5 md:py-2.5 rounded-lg md:rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 group shadow-lg shadow-primary/30"
          >
            <span className="text-xs md:text-sm font-semibold hidden sm:inline">{t.navigation.next}</span>
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlideNavigation;