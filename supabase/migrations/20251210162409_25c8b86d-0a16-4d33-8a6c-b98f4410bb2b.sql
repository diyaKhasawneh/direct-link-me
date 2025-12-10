-- Add background_url column to profiles table
ALTER TABLE public.profiles ADD COLUMN background_url text;

-- Update the public_profiles view to include background_url
DROP VIEW IF EXISTS public.public_profiles;
CREATE VIEW public.public_profiles WITH (security_invoker = on) AS
SELECT 
  id,
  name,
  slug,
  tagline,
  avatar_url,
  background_url,
  created_at,
  updated_at
FROM public.profiles;