# sj-reservas-turismo

Sistema de reservas, disponibilidad y precios por temporada para cabañas y hosterías de Calingasta, Iglesia, Valle Fértil y otros destinos sanjuaninos.

**Por qué ahora:** La demanda llega en picos: ~60-65% de ocupación promedio en verano 2026 con picos del 100% en fiestas y eventos deportivos.

## Estado

| Etapa | Qué hay |
| --- | --- |
| Base (actual) | Estructura estándar, base de datos lista, reglas de negocio en `src/lib/reservas.ts` con tests (noches, superposición de reservas, precio con recargo de temporada alta y ocupación). |
| Prototipo funcional (siguiente) | Pantallas de carga y consulta sobre la base. |
| Producción | Login, varias cuentas, deploy. |

## Requisitos

- Node.js 20.9 o superior.
- Nada más para desarrollo: la base es un Postgres embebido (PGlite) en `./.data`.

## Empezar

```bash
npm install
cp .env.example .env.local   # opcional en desarrollo
npm run dev                  # prepara la base y abre http://localhost:3000
```

## Scripts

| Script | Qué hace |
| --- | --- |
| `npm run dev` | Prepara la base y levanta el servidor de desarrollo |
| `npm run build` | Compilación de producción |
| `npm start` | Sirve la compilación de producción |
| `npm test` | Tests de las reglas de negocio (Vitest) |
| `npm run lint` / `npm run typecheck` | Calidad de código |
| `npm run check` | Typecheck + lint + tests juntos |
| `npm run db:generate` | Genera una migración SQL después de cambiar `src/db/schema.ts` |
| `npm run db:setup` | Aplica las migraciones |

## Estructura

```
src/
  app/          Pantallas y acciones del servidor
  db/           Esquema (schema.ts) y conexión (index.ts)
  lib/reservas.ts  Reglas de negocio + tests
drizzle/        Migraciones SQL
scripts/        Setup de base
```

## Producción

Definí `DATABASE_URL` con un Postgres real (Supabase, Neon…), corré `npm run db:setup` y desplegá (por ejemplo en Vercel).

## Próximos pasos

1. Alta de unidades y calendario de disponibilidad.
2. Página pública de reservas por alojamiento y cobro de seña.
3. Calendario de eventos de San Juan para sugerir precios en temporada alta.

Estructura compartida con `sj-proveedores-mineros`, `sj-factura-simple`, `sj-alquileres` y `sj-reservas-turismo`.
