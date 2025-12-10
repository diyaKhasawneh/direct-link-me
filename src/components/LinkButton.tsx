import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface LinkButtonProps {
  href: string;
  icon: LucideIcon;
  label: string;
  delay?: number;
  boxColor?: string | null;
  textColor?: string | null;
}

const LinkButton = ({ href, icon: Icon, label, delay = 0, boxColor, textColor }: LinkButtonProps) => {
  const hasCustomColors = boxColor || textColor;
  
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl",
        "border border-link-border",
        "font-medium text-lg",
        "hover:scale-[1.02] hover:shadow-xl",
        "transition-all duration-300 ease-out",
        "animate-fade-up",
        !hasCustomColors && "bg-link text-card-foreground hover:bg-link-hover"
      )}
      style={{ 
        animationDelay: `${delay}ms`,
        ...(boxColor && { backgroundColor: boxColor }),
        ...(textColor && { color: textColor }),
      }}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </a>
  );
};

export default LinkButton;