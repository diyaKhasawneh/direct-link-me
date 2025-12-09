-- Add slug column to profiles for unique public URLs
ALTER TABLE public.profiles 
ADD COLUMN slug text UNIQUE;

-- Create index for faster slug lookups
CREATE INDEX idx_profiles_slug ON public.profiles(slug);

-- Update existing profile with a default slug
UPDATE public.profiles SET slug = 'main' WHERE slug IS NULL;