import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialIconProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

const SocialIcon = ({ href, icon: Icon, label }: SocialIconProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "w-12 h-12 rounded-full flex items-center justify-center",
        "bg-card-foreground/10 backdrop-blur-sm",
        "text-foreground hover:text-gold",
        "hover:scale-110 hover:bg-card-foreground/20",
        "transition-all duration-300"
      )}
    >
      <Icon className="w-5 h-5" />
    </a>
  );
};

export default SocialIcon;
