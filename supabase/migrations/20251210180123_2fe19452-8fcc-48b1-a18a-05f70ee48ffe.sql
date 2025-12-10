-- Add color customization fields to profiles table
ALTER TABLE public.profiles
ADD COLUMN box_color text DEFAULT '#ffffff',
ADD COLUMN box_text_color text DEFAULT '#1a1a2e',
ADD COLUMN icon_color text DEFAULT '#d4a574',
ADD COLUMN icon_bg_color text DEFAULT '#1a1a2e';