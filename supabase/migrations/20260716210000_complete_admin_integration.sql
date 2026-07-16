begin;

alter table if exists public.document_facts
  add column if not exists fact_metadata jsonb not null default '{}'::jsonb;

update storage.buckets
set public = false,
    file_size_limit = 15728640,
    allowed_mime_types = array[
      'application/pdf',
      'image/png',
      'image/jpeg',
      'image/webp'
    ]
where id = 'documents';

create or replace function public.prevent_immutable_record_change()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if tg_op = 'DELETE'
    and not exists (
      select 1
      from public.property_requests
      where id = old.request_id
    )
  then
    return old;
  end if;

  raise exception '% is immutable', tg_table_name using errcode = '55000';
end;
$$;

revoke all on function public.prevent_immutable_record_change() from public, anon, authenticated;
grant execute on function public.prevent_immutable_record_change() to service_role;

commit;
