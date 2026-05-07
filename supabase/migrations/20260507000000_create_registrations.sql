create table public.registrations (
	id uuid primary key default gen_random_uuid(),
	user_id uuid not null unique references auth.users (id) on delete cascade,

	full_name text not null check (length(trim(full_name)) > 0),
	nisn text not null unique check (nisn ~ '^[0-9]{10}$'),
	birth_place text not null check (length(trim(birth_place)) > 0),
	birth_date date not null check (birth_date <= current_date),
	gender text not null check (gender in ('male', 'female')),
	address text not null check (length(trim(address)) > 0),
	phone text not null check (length(trim(phone)) > 0),
	email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
	prior_school text not null check (length(trim(prior_school)) > 0),
	target_program text not null check (length(trim(target_program)) > 0),

	father_name text not null check (length(trim(father_name)) > 0),
	father_occupation text not null check (length(trim(father_occupation)) > 0),
	father_phone text not null check (length(trim(father_phone)) > 0),
	father_email text check (father_email is null or father_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
	father_address text not null check (length(trim(father_address)) > 0),

	mother_name text not null check (length(trim(mother_name)) > 0),
	mother_occupation text not null check (length(trim(mother_occupation)) > 0),
	mother_phone text not null check (length(trim(mother_phone)) > 0),
	mother_email text check (mother_email is null or mother_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
	mother_address text not null check (length(trim(mother_address)) > 0),

	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

create index registrations_created_at_idx on public.registrations (created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
	new.updated_at = now();
	return new;
end;
$$;

create trigger set_registrations_updated_at
	before update on public.registrations
	for each row
	execute function public.set_updated_at();

revoke all on public.registrations from public;
revoke all on public.registrations from anon;
revoke all on public.registrations from authenticated;

grant select on public.registrations to authenticated;
grant insert (
	user_id,
	full_name,
	nisn,
	birth_place,
	birth_date,
	gender,
	address,
	phone,
	email,
	prior_school,
	target_program,
	father_name,
	father_occupation,
	father_phone,
	father_email,
	father_address,
	mother_name,
	mother_occupation,
	mother_phone,
	mother_email,
	mother_address
) on public.registrations to authenticated;
grant update (
	full_name,
	nisn,
	birth_place,
	birth_date,
	gender,
	address,
	phone,
	email,
	prior_school,
	target_program,
	father_name,
	father_occupation,
	father_phone,
	father_email,
	father_address,
	mother_name,
	mother_occupation,
	mother_phone,
	mother_email,
	mother_address
) on public.registrations to authenticated;

alter table public.registrations enable row level security;

create policy "Applicants can insert their own registration"
	on public.registrations
	for insert
	to authenticated
	with check (auth.uid() = user_id);

create policy "Applicants can read their own registration"
	on public.registrations
	for select
	to authenticated
	using (auth.uid() = user_id);

create policy "Applicants can update their own registration"
	on public.registrations
	for update
	to authenticated
	using (auth.uid() = user_id)
	with check (auth.uid() = user_id);
