# Next Supabase Starter

## Descripción
Starter production-ready para crear landings con waitlist y panel de administración. Incluye Next.js 16, Supabase, Stripe y Resend preconfigurados.

## Para quién
Todo tipo de negocio que quiera lanzar un SaaS o producto con lista de espera.

## Arquitectura
- Next.js 16 con App Router
- Tailwind CSS v4 para estilos
- Supabase para base de datos (tabla `waitlist`)
- shadcn/ui para componentes UI
- Stripe para pagos
- Resend para emails transaccionales
- TypeScript
- Vercel para despliegue
- framer-motion para animaciones
- hls.js para reproducción de vídeo HLS

## shadcn/ui

Instalado y configurado. Los componentes viven en `/components/ui/`.

### Componentes disponibles
| Componente | Ruta | Uso |
|---|---|---|
| Button | `@/components/ui/button` | CTAs, formularios, acciones |
| Card | `@/components/ui/card` | Features, testimonios, paneles |
| Input | `@/components/ui/input` | Formulario de waitlist, settings |
| Table | `@/components/ui/table` | Lista de emails en dashboard |
| Badge | `@/components/ui/badge` | Estados, etiquetas, pills |
| Avatar | `@/components/ui/avatar` | Testimonios, perfil |
| Dialog | `@/components/ui/dialog` | Modales |
| Separator | `@/components/ui/separator` | Divisores visuales |

Para añadir más componentes: `npx shadcn@latest add <nombre>`

## Estructura de carpetas

```
app/
  page.tsx                  # Landing pública (/)
  actions.ts                # Server actions (joinWaitlist)
  layout.tsx
  dashboard/
    layout.tsx              # Layout con sidebar de navegación
    page.tsx                # Overview: stats + 5 recientes
    emails/
      page.tsx              # Tabla completa de emails + export CSV
    settings/
      page.tsx              # Configuración del proyecto
    export-button.tsx       # Client component para exportar CSV
  admin/
    page.tsx                # Panel admin alternativo
    actions.ts

components/
  ui/                       # Componentes shadcn/ui (no modificar directamente)
    button.tsx
    card.tsx
    input.tsx
    table.tsx
    badge.tsx
    avatar.tsx
    dialog.tsx
    separator.tsx
  hero.tsx                  # Hero animado con vídeo HLS y framer-motion
  navbar.tsx                # Navbar fija, dark, responsive
  features.tsx              # Sección features (3 Cards shadcn)
  testimonials.tsx          # Sección testimonios (Avatar + Card)
  footer.tsx                # Footer con columnas de links
  waitlist-form.tsx         # Formulario email (Input + Button shadcn)
  dashboard-sidebar.tsx     # Sidebar del dashboard (client, usePathname)
  tech-stack.tsx            # Grid de tecnologías del stack

lib/
  utils.ts                  # Utilidad cn() para clases Tailwind
  supabase/
    client.ts               # Cliente Supabase (NEXT_PUBLIC_*)
```

## Rutas

| Ruta | Descripción |
|---|---|
| `/` | Landing pública con hero, features, testimonios y waitlist |
| `/dashboard` | Overview con stats y últimos 5 registros |
| `/dashboard/emails` | Tabla completa de emails + exportar CSV |
| `/dashboard/settings` | Configuración del proyecto |

## Variables de entorno

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Configuradas en `.env.local` (local) y en Vercel (production + preview).

## Estado actual
- Landing rediseñada con hero animado (framer-motion + vídeo HLS)
- Formulario de waitlist conectado a Supabase
- Dashboard con navegación sidebar y 3 páginas
- shadcn/ui instalado con 8 componentes configurados
- Deploy en Vercel con variables de entorno configuradas

## Convenciones
- Idioma: español
- Componentes React funcionales con TypeScript siempre
- Variables de entorno en `.env.local` — nunca subir a git
- `"use client"` solo cuando sea necesario (hooks, eventos, framer-motion)
- Preferir Server Components por defecto
- Estilos con Tailwind, nunca CSS inline
- Usar `cn()` de `@/lib/utils` para combinar clases condicionales
- Named exports en componentes (`export function X`), default solo en páginas Next.js
