-- Add image column to products table for scraped images
ALTER TABLE public.products 
ADD COLUMN image TEXT;