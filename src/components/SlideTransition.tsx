import { ReactNode, useEffect, useState } from "react";

interface SlideTransitionProps {
  children: ReactNode;
  slideKey: number;
  direction: "left" | "right" | "initial";
}

const SlideTransition = ({ children, slideKey, direction }: SlideTransitionProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayContent, setDisplayContent] = useState<ReactNode>(children);
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    if (direction === "initial") {
      setDisplayContent(children);
      setAnimationClass("animate-hero-entrance");
      return;
    }

    setIsAnimating(true);
    
    // Exit animation
    const exitClass = direction === "right" ? "animate-slide-exit-left" : "animate-slide-exit-right";
    setAnimationClass(exitClass);

    // After exit, update content and enter
    const exitTimer = setTimeout(() => {
      setDisplayContent(children);
      const enterClass = direction === "right" ? "animate-slide-enter-right" : "animate-slide-enter-left";
      setAnimationClass(enterClass);
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }, 300);

    return () => clearTimeout(exitTimer);
  }, [slideKey, children, direction]);

  return (
    <div className={`h-full w-full ${animationClass}`}>
      {/* Particle effects during transition */}
      {isAnimating && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary/60 animate-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.05}s`,
                animationDuration: `${0.5 + Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}
      
      {displayContent}
    </div>
  );
};

export default SlideTransition;
