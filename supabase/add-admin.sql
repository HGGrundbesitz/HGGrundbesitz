-- 1. Benutzer zuerst unter Authentication -> Users anlegen.
-- 2. Danach dieses Skript im SQL Editor ausfuehren.

do $$
declare
  target_email text;
  target_user_id uuid;
begin
  foreach target_email in array array[
    'demor123t@gmail.com',
    'nk@hg-grundbesitz.de'
  ] loop
    target_email := lower(target_email);

    select id
    into target_user_id
    from auth.users
    where lower(email) = target_email
    limit 1;

    if target_user_id is null then
      raise exception 'Kein Auth-Benutzer mit E-Mail % gefunden. Zuerst unter Authentication -> Users anlegen.', target_email;
    end if;

    insert into public.admin_users (user_id, email, role, active)
    values (target_user_id, target_email, 'admin', true)
    on conflict (user_id) do update
    set email = excluded.email,
        role = 'admin',
        active = true,
        updated_at = now();
  end loop;
end;
$$;

select user_id, email, role, active, created_at
from public.admin_users
order by created_at;
