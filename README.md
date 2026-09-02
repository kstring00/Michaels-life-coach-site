# GrowthGains

Premium Next.js marketing and conversion site for GrowthGains identity and life-transition coaching.

## Local setup

```bash
npm install
npm run dev
```

## Environment variables

Create `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_CALENDAR_URL=https://your-calendar-embed-url
NEXT_PUBLIC_CONTACT_EMAIL=you@example.com
NEXT_PUBLIC_INSTAGRAM_URL=
NEXT_PUBLIC_LINKEDIN_URL=
NEXT_PUBLIC_TIKTOK_URL=
NEXT_PUBLIC_YOUTUBE_URL=
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=GrowthGains <hello@your-domain.com>
```

The site intentionally contains **no public pricing**. The calendar gracefully falls back to a direct consultation request until `NEXT_PUBLIC_CALENDAR_URL` is connected. The contact API uses Resend's HTTPS API without an additional SDK dependency.

## Content integrity

The site does not fabricate credentials, testimonials or clinical claims. Client stories remain reserved until Michael supplies approved testimonials. The coaching/counseling distinction is written as a scope-of-service explanation, not medical advice.
