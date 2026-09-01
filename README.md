# YOR FEELINGS // anonymous campus signal

YOR FEELINGS is a KIIT-oriented conversation surface for anonymous onboarding, threads, reactions, reporting, mood pulse, and a local demo path. It is a portfolio-scale reference implementation: privacy, moderation, and AI claims must be independently validated before real-world use.

## Evidence contract

| Surface | State | Boundary |
| --- | --- | --- |
| Landing + demo routes | `DEMO` | A guided preview of the conversation flow. |
| Authentication | `EXPERIMENTAL` | OTP and NextAuth paths exist; configure email delivery and test recovery before launch. |
| Moderation + sentiment | `EXPERIMENTAL` | AI helpers are code paths, not a safety guarantee. |
| Socket.io realtime | `EXPERIMENTAL` | Requires the server runtime and a live multi-client check. |
| Repository build | `VERIFIED` | The Next build is the packaging check; it does not prove production readiness. |
| Privacy/security review | `PLANNED` | Consent, retention, abuse response, and institutional approval remain release gates. |
| Seed/demo behavior | `REPORTED` | Local development fallback behavior is described in source, not a live service SLA. |

The visual source of truth is [`design/yor-tokens.json`](./design/yor-tokens.json). Run `npm run design:check` after changing the shell or landing surface.

## Features in the repository

- OTP login for the configured campus email domain
- anonymous onboarding, threads, messages, reactions, and reports
- Socket.io hooks for live thread/presence behavior
- AI moderation, sentiment, and mood aggregation helpers
- pulse globe, therapy/support card, and a small game route
- Prisma schema and server routes under `app/api`

## Run locally

```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

The custom server starts the app at the port selected by the runtime. Copy `.env.example` to `.env`; configure `DATABASE_URL`, `NEXTAUTH_SECRET`, and an email provider for non-development OTP delivery. In development, the OTP route may expose a `devOtp` response when no email service is configured; never rely on that behavior in production.

## Verification

```bash
npm run design:check
npm run build
```

The browser check should include `/`, `/demo`, `/login`, and `/threads` in a fresh session. Realtime, email delivery, Prisma persistence, AI provider responses, and external deployment health need environment-backed checks.

## YOR visual system

- void `#000000` and graphite `#050505`
- crimson `#e84b4b`, deep crimson `#671515`, signal `#ff8a7f`
- warm white `#f5eaea`, muted gray `#c4c4c4`
- field gradient `#671515` → `#8c1616` → `#2a0505`
- grid/noise texture, mono annotations, serif hierarchy, explicit state labels

Good conversation infrastructure should make room for uncertainty: a protected feeling, a moderation suggestion, and a verified fact are different things.
