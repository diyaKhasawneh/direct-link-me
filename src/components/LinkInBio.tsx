import { MessageCircle, Star, MapPin, Facebook, Instagram } from "lucide-react";
import ProfileAvatar from "./ProfileAvatar";
import LinkButton from "./LinkButton";
import SocialIcon from "./SocialIcon";
import spaBackground from "@/assets/spa-background.jpg";

const LinkInBio = () => {
  const profileData = {
    name: "حمام شهرزاد للسيدات",
    tagline: "حكاية من ألف ليلة وليلة...في عالم من الاسترخاء والجمال",
  };

  const links = [
    {
      href: "https://wa.me/1234567890",
      icon: MessageCircle,
      label: "WhatsApp",
    },
    {
      href: "#reviews",
      icon: Star,
      label: "تقييماتكم",
    },
    {
      href: "#location",
      icon: MapPin,
      label: "موقعنا",
    },
  ];

  const socials = [
    {
      href: "https://facebook.com",
      icon: Facebook,
      label: "Facebook",
    },
    {
      href: "https://instagram.com",
      icon: Instagram,
      label: "Instagram",
    },
  ];

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
        {/* Profile section */}
        <ProfileAvatar name={profileData.name} />

        <div className="text-center space-y-2 animate-fade-up" style={{ animationDelay: "100ms" }}>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground text-shadow">
            {profileData.name}
          </h1>
          <p className="text-foreground/80 text-sm md:text-base text-shadow">
            {profileData.tagline}
          </p>
        </div>

        {/* Links section */}
        <div className="w-full space-y-4 mt-4">
          {links.map((link, index) => (
            <LinkButton
              key={link.label}
              href={link.href}
              icon={link.icon}
              label={link.label}
              delay={200 + index * 100}
            />
          ))}
        </div>

        {/* Social icons */}
        <div
          className="flex items-center gap-4 mt-6 animate-fade-up"
          style={{ animationDelay: "600ms" }}
        >
          {socials.map((social) => (
            <SocialIcon
              key={social.label}
              href={social.href}
              icon={social.icon}
              label={social.label}
            />
          ))}
        </div>

        {/* Footer */}
        <p
          className="text-foreground/50 text-xs mt-8 animate-fade-in"
          style={{ animationDelay: "800ms" }}
        >
          صنع بـ ❤️
        </p>
      </div>
    </div>
  );
};

export default LinkInBio;
