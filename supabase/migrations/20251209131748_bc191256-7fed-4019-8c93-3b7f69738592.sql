-- Fix the security definer view issue by making it use invoker security
ALTER VIEW public.public_profiles SET (security_invoker = on);