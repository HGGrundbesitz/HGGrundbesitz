# Supabase-Einrichtung für HG Grundbesitz

1. Im neuen Supabase-Projekt unter **SQL Editor** alle Dateien aus `supabase/migrations` in aufsteigender Reihenfolge ausführen.
2. Den Admin unter **Authentication > Users** anlegen. Das allein gibt noch keinen Dashboard-Zugriff.
3. In `supabase/add-admin.sql` UUID und E-Mail des Auth-Benutzers einsetzen und das SQL einmal ausführen. Dadurch wird der Benutzer der internen Admin-Tabelle zugeordnet.
4. `supabase/verify-setup.sql` ausführen. Die Abfragen müssen Tabellen, RLS-Policies und Storage-Bucket anzeigen.
5. Werte aus `.env.example` in `.env.local` eintragen und den Entwicklungsserver neu starten.

## Sicherheit

- `SUPABASE_SECRET_KEY`, `OPENAI_API_KEY` und `RESEND_API_KEY` sind ausschließlich serverseitig.
- Niemals Secret Keys mit `NEXT_PUBLIC_` benennen oder in Git committen.
- Öffentliche Formularzugriffe bleiben durch RLS und kontrollierte API-Routen begrenzt.
- Admin-Zugriffe benötigen sowohl eine gültige Supabase-Sitzung als auch einen Eintrag in der Admin-Tabelle.