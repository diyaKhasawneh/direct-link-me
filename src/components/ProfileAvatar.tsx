import { cn } from "@/lib/utils";

interface ProfileAvatarProps {
  name: string;
  imageUrl?: string;
}

const ProfileAvatar = ({ name, imageUrl }: ProfileAvatarProps) => {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2);

  return (
    <div className="relative animate-fade-in">
      <div
        className={cn(
          "w-28 h-28 rounded-full overflow-hidden",
          "bg-cream border-4 border-gold/30",
          "flex items-center justify-center",
          "avatar-glow shadow-2xl"
        )}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-3xl font-bold text-card-foreground/80">
            {initials}
          </span>
        )}
      </div>
      {/* Decorative ring */}
      <div className="absolute inset-0 rounded-full border-2 border-gold/20 scale-110" />
    </div>
  );
};

export default ProfileAvatar;
