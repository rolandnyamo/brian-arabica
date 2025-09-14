# Brian's Arabica — Straight from Uganda

A single-page, animated landing site built with Next.js, Tailwind CSS, and Framer Motion.
All visuals are **generated SVG assets** (no external images), themed with Ugandan-inspired colors
and patterns. Includes WhatsApp and Email CTAs, plus an optional contact form backed by Nodemailer.

## Quick Start

```bash
# 1) Install dependencies
npm install

# 2) Copy env and edit
cp .env.example .env.local
# Set NEXT_PUBLIC_WHATSAPP_NUMBER and NEXT_PUBLIC_CONTACT_EMAIL at minimum.
# (Optional) Configure SMTP_* and CONTACT_TO_EMAIL to enable server-side email sending.

# 3) Run locally
npm run dev

# 4) Build & start
npm run build && npm start
```

## Deploying

- **Vercel**: Create a new project from this folder, add your environment variables in the dashboard, deploy.
- **Netlify/Static hosts**: This project is SSR by default. If you want a static export, you can refactor to static-only or use Vercel for best results.

## Customize

- Edit copy and product specs in `app/page.jsx` (look for `PRODUCTS` array).
- Replace the generated SVGs in `public/images/` if you later get real photos.
- Colors & fonts are configured via Tailwind (`tailwind.config.js`) and `app/layout.jsx`.

## Contact Endpoints

- WhatsApp button deep links to: `https://wa.me/<NEXT_PUBLIC_WHATSAPP_NUMBER>`
- Email button uses: `mailto:<NEXT_PUBLIC_CONTACT_EMAIL>`
- Contact form posts to `/api/contact`:
  - If SMTP is configured, it relays to `CONTACT_TO_EMAIL`.
  - If not, it returns 202 Accepted with a friendly message and logs to server console.

## Notes

- All assets are lightweight SVGs so LCP remains fast. Animations use Framer Motion and CSS.
- No analytics are included by default. Add your tool of choice easily.
- This is generic data; edit sections for exact specs, MOQs, and compliance statements as they finalize.
