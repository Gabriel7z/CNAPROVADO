-- CNAPROVADO — rode isto no SQL Editor do Supabase (uma vez).
-- Não cola a chave service_role em lugar nenhum do site.

create table if not exists public.perfis (
  id uuid primary key references auth.users (id) on delete cascade,
  apelido text not null default 'Concurseiro',
  avatar text not null default '🎯',
  mostrar_rank boolean not null default true,
  migrated boolean not null default false,
  anki jsonb not null default '{}'::jsonb,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

create table if not exists public.respostas (
  id bigint generated always as identity primary key,
  usuario_id uuid not null references public.perfis (id) on delete cascade,
  materia text not null,
  qid integer not null,
  acertou boolean not null,
  ts timestamptz not null default now()
);

create table if not exists public.baterias (
  id bigint generated always as identity primary key,
  usuario_id uuid not null references public.perfis (id) on delete cascade,
  materia text not null,
  acertos integer not null,
  total integer not null,
  ts timestamptz not null default now()
);

create table if not exists public.stats (
  usuario_id uuid not null references public.perfis (id) on delete cascade,
  materia_id text not null,
  acertos integer not null default 0,
  erros integer not null default 0,
  tentativas integer not null default 0,
  melhor_percentual integer not null default 0,
  primary key (usuario_id, materia_id)
);

create index if not exists respostas_usuario_materia_idx
  on public.respostas (usuario_id, materia, ts desc);

create index if not exists baterias_usuario_idx
  on public.baterias (usuario_id, ts desc);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.perfis (id, apelido, avatar)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data->>'apelido', ''), 'Concurseiro'),
    coalesce(nullif(new.raw_user_meta_data->>'avatar', ''), '🎯')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.on_resposta()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.stats (
    usuario_id, materia_id, acertos, erros, tentativas, melhor_percentual
  )
  values (
    new.usuario_id,
    new.materia,
    case when new.acertou then 1 else 0 end,
    case when new.acertou then 0 else 1 end,
    1,
    0
  )
  on conflict (usuario_id, materia_id) do update
    set acertos = public.stats.acertos + excluded.acertos,
        erros = public.stats.erros + excluded.erros,
        tentativas = public.stats.tentativas + 1;
  return new;
end;
$$;

drop trigger if exists respostas_stats on public.respostas;
create trigger respostas_stats
  after insert on public.respostas
  for each row execute procedure public.on_resposta();

create or replace function public.on_bateria()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  pct integer;
begin
  pct := round(100.0 * new.acertos / nullif(new.total, 0))::integer;
  insert into public.stats (
    usuario_id, materia_id, acertos, erros, tentativas, melhor_percentual
  )
  values (new.usuario_id, new.materia, 0, 0, 0, coalesce(pct, 0))
  on conflict (usuario_id, materia_id) do update
    set melhor_percentual = greatest(public.stats.melhor_percentual, excluded.melhor_percentual);
  return new;
end;
$$;

drop trigger if exists baterias_stats on public.baterias;
create trigger baterias_stats
  after insert on public.baterias
  for each row execute procedure public.on_bateria();

create or replace function public.ranking_publico(
  p_materia text default 'dadm',
  p_min integer default 10
)
returns table (
  posicao integer,
  apelido text,
  avatar text,
  acertos integer,
  erros integer,
  tentativas integer,
  percentual integer,
  melhor_percentual integer,
  sou_eu boolean
)
language sql
security definer
set search_path = public
as $$
  select
    row_number() over (
      order by
        (100.0 * s.acertos / nullif(s.tentativas, 0)) desc,
        s.tentativas desc,
        p.apelido asc
    )::integer as posicao,
    p.apelido,
    p.avatar,
    s.acertos,
    s.erros,
    s.tentativas,
    round(100.0 * s.acertos / nullif(s.tentativas, 0))::integer as percentual,
    s.melhor_percentual,
    (s.usuario_id = auth.uid()) as sou_eu
  from public.stats s
  join public.perfis p on p.id = s.usuario_id
  where p.mostrar_rank = true
    and s.materia_id = p_materia
    and s.tentativas >= p_min
  limit 50;
$$;

alter table public.perfis enable row level security;
alter table public.respostas enable row level security;
alter table public.baterias enable row level security;
alter table public.stats enable row level security;

drop policy if exists perfis_select on public.perfis;
drop policy if exists perfis_insert on public.perfis;
drop policy if exists perfis_update on public.perfis;
create policy perfis_select on public.perfis
  for select using (id = auth.uid());
create policy perfis_insert on public.perfis
  for insert with check (id = auth.uid());
create policy perfis_update on public.perfis
  for update using (id = auth.uid()) with check (id = auth.uid());

drop policy if exists respostas_select on public.respostas;
drop policy if exists respostas_insert on public.respostas;
create policy respostas_select on public.respostas
  for select using (usuario_id = auth.uid());
create policy respostas_insert on public.respostas
  for insert with check (usuario_id = auth.uid());

drop policy if exists baterias_select on public.baterias;
drop policy if exists baterias_insert on public.baterias;
create policy baterias_select on public.baterias
  for select using (usuario_id = auth.uid());
create policy baterias_insert on public.baterias
  for insert with check (usuario_id = auth.uid());

drop policy if exists stats_select on public.stats;
create policy stats_select on public.stats
  for select using (usuario_id = auth.uid());

grant usage on schema public to anon, authenticated;
grant select, insert, update on public.perfis to authenticated;
grant select, insert on public.respostas to authenticated;
grant select, insert on public.baterias to authenticated;
grant select on public.stats to authenticated;
grant execute on function public.ranking_publico(text, integer) to anon, authenticated;
grant usage, select on all sequences in schema public to authenticated;
