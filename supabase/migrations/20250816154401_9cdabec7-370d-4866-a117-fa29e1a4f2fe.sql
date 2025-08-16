-- Create subscription plans table
CREATE TABLE public.subscription_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price INTEGER NOT NULL, -- Price in tenge
  max_products INTEGER, -- NULL for unlimited
  update_frequency TEXT DEFAULT 'manual',
  features TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Insert the subscription plans
INSERT INTO public.subscription_plans (name, price, max_products, update_frequency, features) VALUES
('Starter', 20000, 50, 'manual', ARRAY['Basic monitoring', 'Manual updates']),
('Standard', 40000, 200, 'manual', ARRAY['Advanced monitoring', 'Price alerts']),
('Business', 70000, 500, 'manual', ARRAY['Business features', 'Priority support']),
('Pro', 100000, 1000, 'hourly', ARRAY['Pro features', 'Hourly updates']),
('Enterprise', 0, NULL, '1 minute', ARRAY['Unlimited products', 'Real-time updates', 'Dedicated support']);

-- Create user subscriptions table
CREATE TABLE public.user_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  plan_id UUID REFERENCES public.subscription_plans(id),
  status TEXT NOT NULL DEFAULT 'trial', -- trial, active, expired, cancelled
  trial_end_date TIMESTAMPTZ DEFAULT (now() + interval '7 days'),
  subscription_start TIMESTAMPTZ,
  subscription_end TIMESTAMPTZ,
  payment_method TEXT DEFAULT 'kaspi',
  kaspi_transaction_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policies for subscription_plans (public read)
CREATE POLICY "Everyone can view subscription plans" 
ON public.subscription_plans 
FOR SELECT 
USING (true);

-- Policies for user_subscriptions (user can only see their own)
CREATE POLICY "Users can view their own subscription" 
ON public.user_subscriptions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subscription" 
ON public.user_subscriptions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscription" 
ON public.user_subscriptions 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Function to check user subscription status
CREATE OR REPLACE FUNCTION public.get_user_subscription_status(user_uuid UUID)
RETURNS TABLE (
  has_access BOOLEAN,
  status TEXT,
  plan_name TEXT,
  max_products INTEGER,
  days_remaining INTEGER
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    CASE 
      WHEN us.status = 'active' AND us.subscription_end > now() THEN true
      WHEN us.status = 'trial' AND us.trial_end_date > now() THEN true
      ELSE false
    END as has_access,
    COALESCE(us.status, 'none') as status,
    COALESCE(sp.name, 'No Plan') as plan_name,
    sp.max_products,
    CASE 
      WHEN us.status = 'active' THEN EXTRACT(days FROM us.subscription_end - now())::INTEGER
      WHEN us.status = 'trial' THEN EXTRACT(days FROM us.trial_end_date - now())::INTEGER
      ELSE 0
    END as days_remaining
  FROM public.user_subscriptions us
  LEFT JOIN public.subscription_plans sp ON us.plan_id = sp.id
  WHERE us.user_id = user_uuid
  ORDER BY us.created_at DESC
  LIMIT 1;
  
  -- If no subscription found, return trial status
  IF NOT FOUND THEN
    RETURN QUERY SELECT false, 'none'::TEXT, 'No Plan'::TEXT, 0::INTEGER, 0::INTEGER;
  END IF;
END;
$$;

-- Trigger to automatically create trial subscription for new users
CREATE OR REPLACE FUNCTION public.handle_new_user_subscription()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.user_subscriptions (user_id, status, trial_end_date)
  VALUES (NEW.id, 'trial', now() + interval '7 days');
  RETURN NEW;
END;
$$;

-- Create trigger for new users
CREATE TRIGGER on_auth_user_created_subscription
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_subscription();