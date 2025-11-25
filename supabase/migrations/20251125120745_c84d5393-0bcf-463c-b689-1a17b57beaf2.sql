-- Create index on updated_at for sorting performance
CREATE INDEX IF NOT EXISTS idx_reports_updated_at ON public.reports(updated_at DESC);

-- Create index on created_at for sorting performance
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON public.reports(created_at DESC);

-- Create GIN index for full-text search on multiple text columns
CREATE INDEX IF NOT EXISTS idx_reports_search ON public.reports USING gin(
  to_tsvector('simple', 
    coalesce(name, '') || ' ' || 
    coalesce(lastname, '') || ' ' || 
    coalesce(address, '') || ' ' || 
    coalesce(reporter_name, '') || ' ' ||
    coalesce(health_condition, '') || ' ' ||
    coalesce(help_needed, '') || ' ' ||
    coalesce(additional_info, '')
  )
);

-- Create index on phone array for searching
CREATE INDEX IF NOT EXISTS idx_reports_phone ON public.reports USING gin(phone);

-- Create index on urgency_level for filtering
CREATE INDEX IF NOT EXISTS idx_reports_urgency_level ON public.reports(urgency_level);