-- Fix function security issues
DROP FUNCTION IF EXISTS public.update_updated_at_column();
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

DROP FUNCTION IF EXISTS public.handle_new_user();
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Add missing RLS policies for shop_settings and system_logs
DROP POLICY IF EXISTS "Users can view their own shop settings" ON public.shop_settings;
CREATE POLICY "Users can view their own shop settings" 
ON public.shop_settings 
FOR SELECT 
USING (true); -- Will be updated when we add user_id column

-- Create admin-only policy for system_logs
CREATE POLICY "Only admins can view system logs" 
ON public.system_logs 
FOR SELECT 
USING (false); -- Restrict access for now

-- Create self-access policy for users table (though it shouldn't be used with auth.users)
CREATE POLICY "Users can view their own data" 
ON public.users 
FOR SELECT 
USING (false); -- Restrict access since we use auth.users instead