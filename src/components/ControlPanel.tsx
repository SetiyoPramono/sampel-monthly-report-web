import { Sun, Moon, Globe } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import MasTyoLogo from "./MasTyoLogo";

const ControlPanel = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  return (
    <>
      {/* Logo - Top Left */}
      <div className="fixed top-2 left-2 md:top-4 md:left-4 z-50">
        <div className="px-2 py-1.5 md:px-3 md:py-2 rounded-xl bg-card/80 backdrop-blur-lg border border-border shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300">
          <MasTyoLogo size="sm" />
        </div>
      </div>

      {/* Controls - Top Right */}
      <div className="fixed top-2 right-2 md:top-4 md:right-4 z-50 flex items-center gap-1.5 md:gap-2">
        {/* Language Toggle */}
        <button
          onClick={() => setLanguage(language === "id" ? "en" : "id")}
          className="flex items-center gap-1 md:gap-2 px-2.5 py-1.5 md:px-4 md:py-2 rounded-full bg-card/80 backdrop-blur-lg border border-border hover:border-primary/50 transition-all duration-300 shadow-lg"
        >
          <Globe className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
          <span className="text-xs md:text-sm font-semibold text-foreground uppercase">{language}</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 md:p-3 rounded-full bg-card/80 backdrop-blur-lg border border-border hover:border-primary/50 transition-all duration-300 shadow-lg"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 md:w-5 md:h-5 text-accent" />
          ) : (
            <Moon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
          )}
        </button>
      </div>
    </>
  );
};

export default ControlPanel;