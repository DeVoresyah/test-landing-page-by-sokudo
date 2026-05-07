# School Landing Page

A landing page for an Indonesian high school, built with **SvelteKit 5**, **Tailwind CSS v4**, and deployable to **Cloudflare Pages**.

## Stack

- [SvelteKit 5](https://svelte.dev/) (Svelte 5 runes)
- [Tailwind CSS v4](https://tailwindcss.com/) (config-less, via `@theme` in `src/app.css`)
- TypeScript
- [Inter](https://fonts.google.com/specimen/Inter) and [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) via `@fontsource`
- [Supabase](https://supabase.com/) client helpers for registration and server-side data access
- Vite 6
- `@sveltejs/adapter-cloudflare` (Cloudflare Pages)

## Prerequisites

- **Node.js 20+**
- **pnpm 10** — this project pins `packageManager: pnpm@10.26.2`. Install with:
  ```bash
  npm install -g pnpm@10
  ```

> ⚠️ **Heads-up about the parent directory.** `~/Documents/augment-projects/package.json` declares `packageManager: yarn@1.22.22`, which makes pnpm refuse to run anywhere underneath it. This project works around it by declaring its own `packageManager` field — keep that field intact.

## Getting started

```bash
# 1. Install dependencies
pnpm install

# 2. Copy local environment placeholders
cp .env.example .env

# 3. Fill in Supabase credentials in .env

# 4. Start the dev server (http://localhost:5173)
pnpm dev

# 5. Open in browser automatically
pnpm dev --open
```

## Supabase setup

Create a Supabase project for the school registration backend, then copy credentials from Supabase → Project Settings → API:

```bash
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

- `SUPABASE_URL` and `SUPABASE_ANON_KEY` are safe to expose to browser code and are returned from `src/routes/+layout.server.ts` as `data.supabase` when configured.
- `SUPABASE_SERVICE_ROLE_KEY` is server-only. Never import `$lib/server/supabase` from `.svelte` components or browser modules.
- Local development reads `.env` through SvelteKit. Cloudflare Pages must define the same three variables in the project environment settings; store the service-role key as a secret.
- Browser code can create a client with `createSupabaseBrowserClient(data.supabase)` from `$lib` after checking `data.supabase` is not `null`.
- Server routes and actions should use `createSupabaseServerClient(event)` for anon-policy access or `createSupabaseServiceRoleClient(event)` for trusted admin writes.

## Scripts

| Command            | What it does                                                    |
| ------------------ | --------------------------------------------------------------- |
| `pnpm dev`         | Start the Vite dev server with HMR                              |
| `pnpm build`       | Production build (outputs to `.svelte-kit/cloudflare/`)         |
| `pnpm preview`     | Preview the production build locally                            |
| `pnpm check`       | Run `svelte-check` (type + a11y + Svelte diagnostics)           |
| `pnpm check:watch` | Same as `check`, in watch mode                                  |
| `pnpm format`      | Format with Prettier _(currently broken — see Known issues)_    |
| `pnpm lint`        | Prettier check + ESLint _(currently broken — see Known issues)_ |

## Project structure

```
src/
├── app.css                     # Tailwind v4 entry + @theme tokens (colors, fonts)
├── app.html                    # HTML shell
├── lib/
│   ├── actions/
│   │   └── reveal.ts           # IntersectionObserver scroll-reveal action
│   ├── components/             # All UI sections + primitives
│   │   ├── Button.svelte       # Polymorphic <a>/<button>
│   │   ├── Card.svelte
│   │   ├── Section.svelte
│   │   ├── SectionHeading.svelte
│   │   ├── Hero.svelte
│   │   ├── StatsStrip.svelte
│   │   ├── About.svelte
│   │   ├── ProgramsSection.svelte
│   │   ├── AchievementsSection.svelte
│   │   ├── Gallery.svelte
│   │   ├── Lightbox.svelte
│   │   ├── VirtualTour.svelte
│   │   ├── FaqAccordion.svelte
│   │   └── ...
│   ├── config/
│   │   └── site.ts             # School identity: name, address, phone, hours, socials, mapsQuery
│   ├── data/                   # Section content (typed)
│   │   ├── programs.ts
│   │   ├── achievements.ts
│   │   ├── gallery.ts
│   │   └── faq.ts
│   ├── server/
│   │   └── supabase.ts         # Server-only Supabase client factories
│   ├── supabase/
│   │   ├── browser.ts          # Browser Supabase client factory
│   │   └── types.ts            # Shared Supabase config types
│   └── index.ts                # Re-exports
├── routes/
│   ├── +layout.svelte
│   ├── +layout.server.ts       # Exposes safe Supabase browser config
│   ├── +page.svelte            # Landing page composition
│   └── +page.server.ts         # Contact form action (?/contact)
static/
└── placeholders/               # SVG placeholder imagery
```

## Where to edit content

| Want to change…                                         | Edit…                                                                                                                                                                  |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| School name, address, phone, socials, hours, maps embed | `src/lib/config/site.ts`                                                                                                                                               |
| Programs / jurusan                                      | `src/lib/data/programs.ts`                                                                                                                                             |
| Achievements / prestasi                                 | `src/lib/data/achievements.ts` (one entry should have `featured: true`)                                                                                                |
| Gallery photos                                          | `src/lib/data/gallery.ts` (swap `src` + `srcset` for real assets in `static/`)                                                                                         |
| FAQ items                                               | `src/lib/data/faq.ts`                                                                                                                                                  |
| Design tokens / fonts                                   | `src/app.css` under `@theme` (`--color-brand-*`, `--color-primary-*`, `--color-neutral-*`, `--color-panel-*`, `--color-warm-*`, type, spacing, radius, shadow, motion) |
| Page composition / section order                        | `src/routes/+page.svelte`                                                                                                                                              |

## Deploy to Cloudflare Pages

The Cloudflare adapter is wired up via `wrangler.toml`:

```toml
pages_build_output_dir = ".svelte-kit/cloudflare"
compatibility_date = "2025-04-01"
compatibility_flags = ["nodejs_compat"]
```

**Option A — Cloudflare dashboard (recommended):**

1. Push the repo to GitHub.
2. In Cloudflare → Pages → Create project → connect the repo.
3. Build command: `pnpm build`
4. Build output directory: `.svelte-kit/cloudflare`
5. Set Node version to 20 in environment variables (`NODE_VERSION=20`).
6. Add `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` to Cloudflare Pages environment variables. Keep the service-role key secret.

**Option B — Wrangler CLI:**

```bash
pnpm build
npx wrangler pages deploy .svelte-kit/cloudflare
```

## Known issues

1. **`pnpm lint` and `pnpm format` are broken.** `prettier-plugin-svelte` clashes with the installed Prettier 3.x and throws `TypeError: getVisitorKeys is not a function` on every `.svelte` file. Pre-existing across the repo. Use `pnpm check` to validate code in the meantime.
2. **Native build scripts are intentionally skipped.** `package.json` declares `pnpm.onlyBuiltDependencies: []` (empty allowlist), which blocks _all_ install/post-install scripts — currently `esbuild`, `sharp`, and `workerd`. We don't use `sharp` directly (it's a transitive dep of the Cloudflare adapter and was failing to build from source on macOS), and `esbuild`/`workerd` ship usable prebuilt binaries — `pnpm dev`, `pnpm build`, and `pnpm preview` all work without them. If you specifically need `wrangler dev` with workerd locally, switch the field to `"onlyBuiltDependencies": ["workerd"]` and run `pnpm install` again. You'll see a yellow "Ignored build scripts" warning on every install — that's expected.
3. **Contact form is log-only.** The `?/contact` action in `src/routes/+page.server.ts` validates the payload and `console.log`s it. Wire up an email/CRM provider (Resend, Mailtrap, etc.) before launch.
4. **All copy and imagery is placeholder.** School identity in `site.ts`, programs, achievements, gallery photos, virtual tour embed — all need to be replaced with real data from the school before deploy.

## License

Private / internal.
