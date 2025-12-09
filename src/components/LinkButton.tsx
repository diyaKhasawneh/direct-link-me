import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface LinkButtonProps {
  href: string;
  icon: LucideIcon;
  label: string;
  delay?: number;
}

const LinkButton = ({ href, icon: Icon, label, delay = 0 }: LinkButtonProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl",
        "bg-link border border-link-border",
        "text-card-foreground font-medium text-lg",
        "hover:bg-link-hover hover:scale-[1.02] hover:shadow-xl",
        "transition-all duration-300 ease-out",
        "animate-fade-up"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </a>
  );
};

export default LinkButton;
