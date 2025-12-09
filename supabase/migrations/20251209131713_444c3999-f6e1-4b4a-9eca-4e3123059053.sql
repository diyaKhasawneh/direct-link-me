-- Create a public view that excludes user_id from profiles
CREATE VIEW public.public_profiles AS
SELECT id, name, tagline, avatar_url, slug, created_at, updated_at
FROM public.profiles;

-- Grant access to the view for anonymous and authenticated users
GRANT SELECT ON public.public_profiles TO anon, authenticated;

-- Add a comment explaining the view's purpose
COMMENT ON VIEW public.public_profiles IS 'Public-safe view of profiles that excludes user_id to prevent identity correlation attacks';