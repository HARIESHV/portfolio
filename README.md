# HARIESH.V — Portfolio

Personal portfolio for Hariesh V, Full Stack Developer & Generative AI Enthusiast.

A single-page React site with an Express contact API. Swiss-editorial visual
system: predominantly white, black and signal red, self-hosted variable type,
scrolling reveals, and a fully accessible project dialog.

---

## Stack

**Client** — React 19, Vite 7, Tailwind CSS v4, Framer Motion 12, Lucide icons
**Server** — Express 5, MongoDB (Mongoose 8), Resend, Zod 4, Helmet, express-rate-limit
**Tooling** — ESLint 9 flat config, npm workspaces

No Next.js. No CSS-in-JS runtime. No UI component library.

---

## Repository layout

```
portfolio/
├── package.json              # npm workspaces root, shared scripts
├── client/
│   ├── public/               # static, copied verbatim to dist/
│   │   ├── Hariesh-V-Resume.pdf
│   │   ├── images/           # og-image, projects/*.svg, hariesh-profile.*
│   │   └── fonts/            # self-hosted Outfit Variable + JetBrains Mono
│   ├── scripts/
│   │   └── check-assets.mjs  # probes public/, writes asset manifest
│   ├── src/
│   │   ├── components/       # Navbar, Hero, ProjectCard, ProjectModal, …
│   │   │   ├── sections/     # About, Skills, Projects, Education, …
│   │   │   └── ui/           # Button, ActionLink, Tag, Section, Icon
│   │   ├── data/             # single source of truth for all content
│   │   ├── hooks/
│   │   ├── lib/              # api client, motion presets, validation, styles
│   │   └── index.css         # design tokens + base layer
│   └── vercel.json           # static hosting config
└── server/
    └── src/
        ├── config/           # env validation, Mongo connection
        ├── controllers/      # contact + health
        ├── middleware/       # terminal error handler, 404
        ├── models/           # Mongoose schema
        ├── routes/
        ├── services/         # Resend notification
        ├── utils/            # AppError, schema, escaping
        └── server.js
```

---

## Getting started

```bash
npm install                 # installs both workspaces
cp server/.env.example server/.env
cp client/.env.example client/.env
npm run dev                 # client :5173, server :5000
```

The client proxies nothing. `VITE_API_URL` points directly at the Express
service, so the backend must be running for the contact form to work.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Runs client and server together |
| `npm run dev:client` / `npm run dev:server` | One side only |
| `npm run build` | Production client build to `client/dist` |
| `npm run preview` | Serves the built client on :4173 |
| `npm start` | Runs the server in production mode |
| `npm run lint` | ESLint across both workspaces |
| `npm run assets --workspace client` | Re-probes `public/` and rewrites the manifest |

`predev` and `prebuild` run the asset probe automatically.

---

## Environment

### `server/.env`

| Variable | Required | Notes |
| --- | --- | --- |
| `MONGODB_URI` | yes | Must start with `mongodb`. Validated at boot |
| `RESEND_API_KEY` | yes | Must start with `re_` |
| `CONTACT_EMAIL` | no | Inbox for notifications. Defaults to the profile address |
| `RESEND_FROM_EMAIL` | no | Verified sender. Defaults to the Resend onboarding address |
| `CLIENT_URL` | no | Included in the CORS allow-list. Defaults to `http://localhost:5173` |
| `ALLOWED_ORIGINS` | no | Comma-separated extra origins |
| `PORT` | no | Defaults to `5000` |
| `NODE_ENV` | no | Defaults to `development` |

The server **refuses to start** on a missing or malformed value, and the error
names the offending variable. It never logs a value.

### `client/.env`

| Variable | Required | Notes |
| --- | --- | --- |
| `VITE_API_URL` | no | Public base URL of the API, ending in `/api` |
| `VITE_SITE_URL` | no | Absolute origin used for canonical and Open Graph URLs |

Only `VITE_`-prefixed variables reach the browser bundle. `MONGODB_URI` and
`RESEND_API_KEY` are server-only and are never referenced in client code.

A malformed `VITE_SITE_URL` fails the build rather than shipping a broken
canonical tag.

---

## API

### `GET /api/health`

```json
{
  "status": "ok",
  "service": "hariesh-v-portfolio-api",
  "timestamp": "2026-01-01T00:00:00.000Z",
  "uptime": 412,
  "database": { "state": "connected", "connected": true, "error": null }
}
```

Returns `200` when MongoDB is reachable, `503` with `"status": "degraded"`
otherwise. The connection string and driver internals are never exposed.

### `POST /api/contact`

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Portfolio enquiry",
  "message": "Ten characters minimum."
}
```

| Status | Meaning |
| --- | --- |
| `201` | Stored in MongoDB, notification sent (or logged as failed) |
| `422` | Field validation failed; `errors` maps field → message |
| `403` | Origin not in the CORS allow-list |
| `413` | Body over 16 kB |
| `429` | Rate limit exceeded (5 per 15 min in production) |
| `503` | Database unavailable |

Flow: validate → honeypot check → persist → notify. A notification failure does
not turn into a visitor-facing error, because the message is already stored and
retrievable; it is logged loudly instead.

---

## Security notes

- Secrets live only in `server/.env` (git-ignored) and the host's secret store.
- CORS is an explicit allow-list. An unlisted `Origin` is rejected with `403`
  rather than reflected back.
- Helmet applies a locked-down CSP (`default-src 'none'`) appropriate to a
  JSON-only API, plus `frame-ancestors 'none'`.
- `trust proxy` is enabled so rate limiting sees real client IPs behind
  Render, Railway or Vercel. Without it, every visitor shares one bucket.
- The contact endpoint is rate limited to 5 submissions per 15 minutes in
  production, and effectively unlimited in development.
- Request bodies are capped at 16 kB.
- Every visitor-facing field is trimmed, stripped of control characters, and
  HTML-escaped before it reaches the email template. `replyTo` and `subject`
  are stripped of CR/LF, so header injection is not possible.
- Unknown request keys are rejected outright.
- A hidden `website` honeypot returns a normal `201` so a bot learns nothing.
- No error response contains a stack trace, Mongo error, or Resend error.

---

## Content

All copy, project descriptions, education and contact details live in
`client/src/data/`. Nothing is hardcoded inside a component.

### Honest placeholders

Nothing is fabricated. Where a real value does not exist, the site degrades
visibly instead of linking to nothing:

| Slot | Current state |
| --- | --- |
| Portrait | **Missing** — falls back to a monogram. Add `client/public/images/hariesh-profile.jpg` (or `.jpeg`/`.png`/`.webp`) |
| Resume | Present: `client/public/Hariesh-V-Resume.pdf` |
| GitHub | No URL — renders as an unavailable control |
| LinkedIn | No URL — renders as an unavailable control |
| Project live/demo links | No URLs — buttons are omitted |
| Certificate PDFs | No files — cards are non-clickable |

`client/scripts/check-assets.mjs` stats the real files in `public/` on every dev
and build, and writes `src/data/generated/assets.json`. The UI reads that
manifest, so a control is enabled only when its file is genuinely on disk.

Project imagery is three abstract SVG compositions, not fabricated screenshots.
Replace them in `client/public/images/projects/` with real captures when
available.

---

## Deployment

**Client** — deploy the `client/` directory as a Vite project (`client/vercel.json`
handles the SPA rewrite, cache headers, and security headers). Set
`VITE_SITE_URL` to the real origin and `VITE_API_URL` to the deployed API.

**Server** — deploy `server/` to any Node host with `npm start`. Set every
required variable in the host's secret store and set `NODE_ENV=production`,
which enables HSTS and the production rate limit.

The two deploy independently. The client is static; the server is stateless
apart from its Mongo connection.

---

## Verification status

Run and passing:

- `npm run lint` — clean across both workspaces
- `npm run build` — 2118 modules, no warnings
- Every asset referenced by `index.html` resolves `200`; SPA deep links return
  `200`
- Health, validation, strict-mode, honeypot, CORS, 413, 404, security-header
  and shutdown behaviour verified against a running server
- `VITE_SITE_URL` precedence and validation verified across three build inputs

Not yet exercised, because it needs real credentials:

- MongoDB persistence against a live cluster
- Actual Resend delivery

Not yet exercised, because the file has not been supplied:

- The real portrait
