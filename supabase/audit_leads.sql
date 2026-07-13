-- Run this in the Supabase SQL editor to create the audit_leads table.

create table if not exists public.audit_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  business_name text not null,
  industry text not null,
  monthly_calls integer not null,
  missed_call_rate numeric not null,
  average_customer_value numeric not null,
  conversion_rate numeric not null,
  annual_revenue_at_risk numeric not null,
  annual_revenue_recovery numeric not null,
  first_name text not null,
  email text not null,
  phone text,
  notes text,
  status text not null default 'New'
);

alter table public.audit_leads enable row level security;

create policy "Allow anonymous audit lead inserts"
  on public.audit_leads
  for insert
  to anon
  with check (true);

-- For existing deployments, run:
-- alter table public.audit_leads add column if not exists status text not null default 'New';
