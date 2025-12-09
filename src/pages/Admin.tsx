import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { useAdminRole } from "@/hooks/useAdminRole";
import {
  useProfile,
  useLinks,
  useSocialLinks,
  useUpdateProfile,
  useCreateLink,
  useUpdateLink,
  useDeleteLink,
  useCreateSocialLink,
  useUpdateSocialLink,
  useDeleteSocialLink,
  uploadAvatar,
  Link,
  SocialLink,
} from "@/hooks/useProfile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import {
  Plus,
  Trash2,
  Save,
  LogOut,
  Upload,
  Eye,
  Link as LinkIcon,
  User,
  Share2,
  ShieldAlert,
} from "lucide-react";

// URL validation schema - blocks javascript: and data: URLs
const urlSchema = z.string()
  .min(1, "الرابط مطلوب")
  .refine(
    (url) => {
      const lowerUrl = url.toLowerCase().trim();
      return !lowerUrl.startsWith("javascript:") && !lowerUrl.startsWith("data:");
    },
    "رابط غير صالح"
  )
  .refine(
    (url) => {
      // Allow hash links for internal navigation
      if (url.startsWith("#")) return true;
      // Validate URL format
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    },
    "رابط غير صالح - يجب أن يبدأ بـ https://"
  );

const linkSchema = z.object({
  label: z.string().min(1, "العنوان مطلوب").max(100, "العنوان طويل جداً"),
  url: urlSchema,
});

const socialLinkSchema = z.object({
  platform: z.string().min(1),
  url: urlSchema,
});

const Admin = () => {
  const { isAuthenticated, loading: authLoading, signOut } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdminRole();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: links = [], isLoading: linksLoading } = useLinks(profile?.id);
  const { data: socialLinks = [], isLoading: socialLoading } = useSocialLinks(profile?.id);

  const updateProfile = useUpdateProfile();
  const createLink = useCreateLink();
  const updateLink = useUpdateLink();
  const deleteLink = useDeleteLink();
  const createSocialLink = useCreateSocialLink();
  const updateSocialLink = useUpdateSocialLink();
  const deleteSocialLink = useDeleteSocialLink();

  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [editableLinks, setEditableLinks] = useState<Link[]>([]);
  const [editableSocials, setEditableSocials] = useState<SocialLink[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/auth");
    }
  }, [authLoading, isAuthenticated, navigate]);

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setTagline(profile.tagline || "");
      setAvatarUrl(profile.avatar_url || "");
    }
  }, [profile]);

  useEffect(() => {
    setEditableLinks(links);
  }, [links]);

  useEffect(() => {
    setEditableSocials(socialLinks);
  }, [socialLinks]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;

    setUploading(true);
    try {
      const url = await uploadAvatar(file);
      setAvatarUrl(url);
      await updateProfile.mutateAsync({ id: profile.id, avatar_url: url });
      toast({ title: "تم رفع الصورة بنجاح" });
    } catch (error) {
      toast({ title: "خطأ في رفع الصورة", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!profile) return;
    try {
      await updateProfile.mutateAsync({
        id: profile.id,
        name,
        tagline,
        avatar_url: avatarUrl,
      });
      toast({ title: "تم حفظ البيانات بنجاح" });
    } catch (error) {
      toast({ title: "خطأ في الحفظ", variant: "destructive" });
    }
  };

  const handleAddLink = async () => {
    if (!profile) return;
    try {
      await createLink.mutateAsync({
        profile_id: profile.id,
        label: "رابط جديد",
        url: "https://",
        icon: "link",
        sort_order: editableLinks.length,
        is_active: true,
      });
      toast({ title: "تم إضافة الرابط" });
    } catch (error) {
      toast({ title: "خطأ في إضافة الرابط", variant: "destructive" });
    }
  };

  const handleUpdateLink = async (link: Link) => {
    // Validate before saving
    const validation = linkSchema.safeParse({ label: link.label, url: link.url });
    if (!validation.success) {
      const errorMessage = validation.error.errors[0]?.message || "بيانات غير صالحة";
      toast({ title: errorMessage, variant: "destructive" });
      return;
    }

    try {
      await updateLink.mutateAsync(link);
      toast({ title: "تم تحديث الرابط" });
    } catch (error) {
      toast({ title: "خطأ في التحديث", variant: "destructive" });
    }
  };

  const handleDeleteLink = async (id: string) => {
    try {
      await deleteLink.mutateAsync(id);
      toast({ title: "تم حذف الرابط" });
    } catch (error) {
      toast({ title: "خطأ في الحذف", variant: "destructive" });
    }
  };

  const handleAddSocial = async () => {
    if (!profile) return;
    try {
      await createSocialLink.mutateAsync({
        profile_id: profile.id,
        platform: "instagram",
        url: "https://instagram.com/",
        is_active: true,
        sort_order: editableSocials.length,
      });
      toast({ title: "تم إضافة رابط السوشيال" });
    } catch (error) {
      toast({ title: "خطأ في الإضافة", variant: "destructive" });
    }
  };

  const handleUpdateSocial = async (social: SocialLink) => {
    // Validate before saving
    const validation = socialLinkSchema.safeParse({ platform: social.platform, url: social.url });
    if (!validation.success) {
      const errorMessage = validation.error.errors[0]?.message || "بيانات غير صالحة";
      toast({ title: errorMessage, variant: "destructive" });
      return;
    }

    try {
      await updateSocialLink.mutateAsync(social);
      toast({ title: "تم التحديث" });
    } catch (error) {
      toast({ title: "خطأ في التحديث", variant: "destructive" });
    }
  };

  const handleDeleteSocial = async (id: string) => {
    try {
      await deleteSocialLink.mutateAsync(id);
      toast({ title: "تم الحذف" });
    } catch (error) {
      toast({ title: "خطأ في الحذف", variant: "destructive" });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading || adminLoading || profileLoading || linksLoading || socialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-foreground">جاري التحميل...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background" dir="rtl">
        <div className="text-center space-y-4 p-8">
          <ShieldAlert className="w-16 h-16 text-destructive mx-auto" />
          <h1 className="text-2xl font-bold text-card-foreground">غير مصرح</h1>
          <p className="text-muted-foreground">ليس لديك صلاحية الوصول لهذه الصفحة</p>
          <Button onClick={() => navigate("/")} variant="outline">
            العودة للصفحة الرئيسية
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-card" dir="rtl">
      {/* Header */}
      <header className="bg-primary/10 border-b border-link-border sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-card-foreground">لوحة التحكم</h1>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/")}
              className="border-link-border"
            >
              <Eye className="w-4 h-4 ml-2" />
              معاينة
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="text-destructive"
            >
              <LogOut className="w-4 h-4 ml-2" />
              خروج
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Profile Section */}
        <section className="bg-cream/50 rounded-xl p-6 border border-link-border">
          <div className="flex items-center gap-2 mb-6">
            <User className="w-5 h-5 text-gold" />
            <h2 className="text-lg font-semibold text-card-foreground">معلومات البروفايل</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-link border-4 border-gold/30">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <User className="w-12 h-12" />
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
                <Button
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gold hover:bg-gold/90"
                >
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                {uploading ? "جاري الرفع..." : "اضغط لتغيير الصورة"}
              </p>
            </div>

            {/* Name & Tagline */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-card-foreground">الاسم</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-background/50 border-link-border mt-1"
                />
              </div>
              <div>
                <Label htmlFor="tagline" className="text-card-foreground">الوصف</Label>
                <Input
                  id="tagline"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="bg-background/50 border-link-border mt-1"
                />
              </div>
              <Button onClick={handleSaveProfile} className="bg-gold hover:bg-gold/90">
                <Save className="w-4 h-4 ml-2" />
                حفظ
              </Button>
            </div>
          </div>
        </section>

        {/* Links Section */}
        <section className="bg-cream/50 rounded-xl p-6 border border-link-border">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-gold" />
              <h2 className="text-lg font-semibold text-card-foreground">الروابط</h2>
            </div>
            <Button onClick={handleAddLink} size="sm" className="bg-gold hover:bg-gold/90">
              <Plus className="w-4 h-4 ml-1" />
              إضافة
            </Button>
          </div>

          <div className="space-y-4">
            {editableLinks.map((link) => (
              <div key={link.id} className="flex gap-3 items-center bg-background/50 p-4 rounded-lg border border-link-border">
                <div className="flex-1 grid md:grid-cols-2 gap-3">
                  <Input
                    value={link.label}
                    onChange={(e) =>
                      setEditableLinks((prev) =>
                        prev.map((l) => (l.id === link.id ? { ...l, label: e.target.value } : l))
                      )
                    }
                    placeholder="عنوان الرابط"
                    className="bg-card border-link-border"
                  />
                  <Input
                    value={link.url}
                    onChange={(e) =>
                      setEditableLinks((prev) =>
                        prev.map((l) => (l.id === link.id ? { ...l, url: e.target.value } : l))
                      )
                    }
                    placeholder="الرابط"
                    className="bg-card border-link-border"
                    dir="ltr"
                  />
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleUpdateLink(link)}
                  className="text-gold"
                >
                  <Save className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleDeleteLink(link.id)}
                  className="text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            {editableLinks.length === 0 && (
              <p className="text-muted-foreground text-center py-8">لا يوجد روابط، أضف رابطك الأول</p>
            )}
          </div>
        </section>

        {/* Social Links Section */}
        <section className="bg-cream/50 rounded-xl p-6 border border-link-border">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Share2 className="w-5 h-5 text-gold" />
              <h2 className="text-lg font-semibold text-card-foreground">السوشيال ميديا</h2>
            </div>
            <Button onClick={handleAddSocial} size="sm" className="bg-gold hover:bg-gold/90">
              <Plus className="w-4 h-4 ml-1" />
              إضافة
            </Button>
          </div>

          <div className="space-y-4">
            {editableSocials.map((social) => (
              <div key={social.id} className="flex gap-3 items-center bg-background/50 p-4 rounded-lg border border-link-border">
                <div className="flex-1 grid md:grid-cols-2 gap-3">
                  <select
                    value={social.platform}
                    onChange={(e) =>
                      setEditableSocials((prev) =>
                        prev.map((s) => (s.id === social.id ? { ...s, platform: e.target.value } : s))
                      )
                    }
                    className="px-3 py-2 rounded-md bg-card border border-link-border text-card-foreground"
                  >
                    <option value="facebook">Facebook</option>
                    <option value="instagram">Instagram</option>
                    <option value="twitter">Twitter / X</option>
                    <option value="tiktok">TikTok</option>
                    <option value="snapchat">Snapchat</option>
                    <option value="youtube">YouTube</option>
                    <option value="linkedin">LinkedIn</option>
                  </select>
                  <Input
                    value={social.url}
                    onChange={(e) =>
                      setEditableSocials((prev) =>
                        prev.map((s) => (s.id === social.id ? { ...s, url: e.target.value } : s))
                      )
                    }
                    placeholder="الرابط"
                    className="bg-card border-link-border"
                    dir="ltr"
                  />
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleUpdateSocial(social)}
                  className="text-gold"
                >
                  <Save className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleDeleteSocial(social.id)}
                  className="text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            {editableSocials.length === 0 && (
              <p className="text-muted-foreground text-center py-8">لا يوجد روابط سوشيال</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Admin;
