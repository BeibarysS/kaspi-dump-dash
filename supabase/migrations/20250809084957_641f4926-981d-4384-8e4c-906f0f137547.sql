-- Add additional columns to profiles table for settings
ALTER TABLE public.profiles 
ADD COLUMN company TEXT,
ADD COLUMN phone TEXT,
ADD COLUMN timezone TEXT DEFAULT 'Asia/Almaty';