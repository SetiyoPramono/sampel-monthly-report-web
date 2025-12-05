import { Code2 } from "lucide-react";

interface MasTyoLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

const MasTyoLogo = ({ size = "md", showText = true, className = "" }: MasTyoLogoProps) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative group">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
        
        {/* Logo container */}
        <div className={`relative ${sizeClasses[size]} bg-gradient-to-br from-primary via-accent to-secondary rounded-lg flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300`}>
          <Code2 className="w-2/3 h-2/3 text-primary-foreground" />
          
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent rounded-lg" />
        </div>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold ${textSizeClasses[size]} gradient-text leading-tight`}>
            MasTyo
          </span>
          {size !== "sm" && (
            <span className="text-[10px] text-muted-foreground tracking-wider uppercase">
              Web Dev
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default MasTyoLogo;
