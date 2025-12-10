import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialIconProps {
  href: string;
  icon: LucideIcon;
  label: string;
  iconColor?: string | null;
  bgColor?: string | null;
}

const SocialIcon = ({ href, icon: Icon, label, iconColor, bgColor }: SocialIconProps) => {
  const hasCustomColors = iconColor || bgColor;
  
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "w-12 h-12 rounded-full flex items-center justify-center",
        "backdrop-blur-sm",
        "hover:scale-110",
        "transition-all duration-300",
        !hasCustomColors && "bg-card-foreground/10 text-foreground hover:text-gold hover:bg-card-foreground/20"
      )}
      style={{
        ...(bgColor && { backgroundColor: bgColor }),
        ...(iconColor && { color: iconColor }),
      }}
    >
      <Icon className="w-5 h-5" />
    </a>
  );
};

export default SocialIcon;