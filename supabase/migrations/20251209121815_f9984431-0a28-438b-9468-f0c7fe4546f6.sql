-- Create profiles table for the link-in-bio page
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'اسم المشروع',
  tagline TEXT DEFAULT 'وصف قصير عن المشروع',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create links table
CREATE TABLE public.links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT DEFAULT 'link',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create social_links table
CREATE TABLE public.social_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;

-- Public read policies (anyone can view the bio page)
CREATE POLICY "Anyone can view profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Anyone can view active links" ON public.links FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view active social links" ON public.social_links FOR SELECT USING (is_active = true);

-- Admin policies (authenticated users can manage)
CREATE POLICY "Authenticated users can insert profiles" ON public.profiles FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update profiles" ON public.profiles FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete profiles" ON public.profiles FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can manage links" ON public.links FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage social links" ON public.social_links FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Create storage bucket for avatars
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);

-- Storage policies
CREATE POLICY "Anyone can view avatars" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Authenticated users can upload avatars" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'avatars');
CREATE POLICY "Authenticated users can update avatars" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'avatars');
CREATE POLICY "Authenticated users can delete avatars" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'avatars');

-- Insert default profile
INSERT INTO public.profiles (name, tagline) VALUES ('حمام شهرزاد للسيدات', 'حكاية من ألف ليلة وليلة...في عالم من الاسترخاء والجمال');

-- Insert default links
INSERT INTO public.links (profile_id, label, url, icon, sort_order) 
SELECT id, 'WhatsApp', 'https://wa.me/1234567890', 'message-circle', 1 FROM public.profiles LIMIT 1;

INSERT INTO public.links (profile_id, label, url, icon, sort_order) 
SELECT id, 'تقييماتكم', '#reviews', 'star', 2 FROM public.profiles LIMIT 1;

INSERT INTO public.links (profile_id, label, url, icon, sort_order) 
SELECT id, 'موقعنا', '#location', 'map-pin', 3 FROM public.profiles LIMIT 1;

-- Insert default social links
INSERT INTO public.social_links (profile_id, platform, url, sort_order)
SELECT id, 'facebook', 'https://facebook.com', 1 FROM public.profiles LIMIT 1;

INSERT INTO public.social_links (profile_id, platform, url, sort_order)
SELECT id, 'instagram', 'https://instagram.com', 2 FROM public.profiles LIMIT 1;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();