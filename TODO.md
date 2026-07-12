# TODO - Migración Base44 -> Supabase (sin cambiar UX)

- [ ] Crear cliente Supabase compartido (`src/lib/supabaseClient.js`)
- [ ] Reemplazar implementación de `src/api/base44Client.js` con adaptador compatible usando Supabase
- [ ] Actualizar `src/lib/AuthContext.jsx` para remover dependencia de `@base44/sdk/dist/utils/axios-client`
- [ ] Probar flujo auth (login/register/reset/admin login/logout)
- [ ] Probar CRUD categorías/productos + stats
- [ ] Probar rutas públicas (home/catalog/detail) y estados de error
