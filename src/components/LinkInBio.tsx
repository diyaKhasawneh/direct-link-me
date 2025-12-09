import {
  MessageCircle,
  Star,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  Link as LinkIconLucide,
} from "lucide-react";
import { LucideIcon } from "lucide-react";
import ProfileAvatar from "./ProfileAvatar";
import LinkButton from "./LinkButton";
import SocialIcon from "./SocialIcon";
import { useProfileBySlug, useProfile, useLinks, useSocialLinks } from "@/hooks/useProfile";
import spaBackground from "@/assets/spa-background.jpg";

const iconMap: Record<string, LucideIcon> = {
  "message-circle": MessageCircle,
  star: Star,
  "map-pin": MapPin,
  link: LinkIconLucide,
};

const socialIconMap: Record<string, LucideIcon> = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
  linkedin: Linkedin,
  tiktok: Instagram,
  snapchat: MessageCircle,
};

interface LinkInBioProps {
  slug?: string;
}

const LinkInBio = ({ slug }: LinkInBioProps) => {
  // Use slug-based query if slug provided, otherwise fallback to default profile
  const { data: slugProfile, isLoading: slugLoading } = useProfileBySlug(slug);
  const { data: defaultProfile, isLoading: defaultLoading } = useProfile();
  
  const profile = slug ? slugProfile : defaultProfile;
  const profileLoading = slug ? slugLoading : defaultLoading;

  const { data: links = [], isLoading: linksLoading } = useLinks(profile?.id);
  const { data: socialLinks = [], isLoading: socialLoading } = useSocialLinks(profile?.id);

  const isLoading = profileLoading || linksLoading || socialLoading;

  // Show 404 for invalid slugs
  if (!isLoading && slug && !profile) {
    return (
      <div
        className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative overflow-hidden"
        dir="rtl"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${spaBackground})` }}
        />
        <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />
        <div className="relative z-10 text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">الصفحة غير موجودة</h1>
          <p className="text-foreground/80">البروفايل المطلوب غير متوفر</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative overflow-hidden"
      dir="rtl"
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${spaBackground})` }}
      />
      <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />

      {/* Content container */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center gap-6">
        {isLoading ? (
          <div className="text-foreground animate-pulse">جاري التحميل...</div>
        ) : (
          <>
            {/* Profile section */}
            <ProfileAvatar
              name={profile?.name || "الاسم"}
              imageUrl={profile?.avatar_url || undefined}
            />

            <div
              className="text-center space-y-2 animate-fade-up"
              style={{ animationDelay: "100ms" }}
            >
              <h1 className="text-2xl md:text-3xl font-bold text-foreground text-shadow">
                {profile?.name || "اسم المشروع"}
              </h1>
              <p className="text-foreground/80 text-sm md:text-base text-shadow">
                {profile?.tagline || "وصف المشروع"}
              </p>
            </div>

            {/* Links section */}
            <div className="w-full space-y-4 mt-4">
              {links.map((link, index) => {
                const IconComponent = iconMap[link.icon || "link"] || LinkIconLucide;
                return (
                  <LinkButton
                    key={link.id}
                    href={link.url}
                    icon={IconComponent}
                    label={link.label}
                    delay={200 + index * 100}
                  />
                );
              })}
            </div>

            {/* Social icons */}
            {socialLinks.length > 0 && (
              <div
                className="flex items-center gap-4 mt-6 animate-fade-up"
                style={{ animationDelay: "600ms" }}
              >
                {socialLinks.map((social) => {
                  const IconComponent = socialIconMap[social.platform] || Facebook;
                  return (
                    <SocialIcon
                      key={social.id}
                      href={social.url}
                      icon={IconComponent}
                      label={social.platform}
                    />
                  );
                })}
              </div>
            )}

            {/* Footer */}
            <p
              className="text-foreground/50 text-xs mt-8 animate-fade-in"
              style={{ animationDelay: "800ms" }}
            >
              صنع بـ ❤️
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LinkInBio;