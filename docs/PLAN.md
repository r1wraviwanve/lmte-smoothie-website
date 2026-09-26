# Project Plan: Rohit Dandawate Website

## 1. Project Understanding
Official personal website of **Rohit Dandawate**, President of the Global Parents Teachers Association (GPTA), positioned as an *Education & Social Impact Activist*. The platform serves as a premium public-figure profile, social-impact portfolio, media/press centre, document library, and public engagement hub, fully manageable through a custom admin CMS. 

**Key Objectives:**
- Provide a source-backed, professional representation of Rohit Dandawate's work.
- Facilitate public engagement via secure forms (Contact, Invite, Raise a Concern).
- Present content with a premium, trustworthy, human, and editorial design aesthetic.

## 2. Sitemap
**Public Routes:**
- `/` (Home)
- `/about`
- `/journey`
- `/social-impact`
- `/initiatives`, `/initiatives/[slug]`
- `/articles`, `/articles/category/[slug]`, `/articles/[slug]`
- `/media`, `/media/[slug]`
- `/videos`
- `/recognition`
- `/gallery`, `/gallery/[slug]`
- `/resources`
- `/events`, `/events/[slug]`
- `/gpta`
- `/contact`, `/invite`, `/raise-concern`
- `/search`, `/press-kit`, `/privacy-policy`, `/terms`, `/disclaimer`

**Admin Routes (Protected under `/admin`):**
- `/admin/login`, `/admin/mfa`
- `/admin` (Dashboard)
- CRUD pages for Profile, Journey, Initiatives, Articles, Media, Videos, Recognition, Gallery, Documents, Events, GPTA, SEO, Users, Settings, Audit Logs, Account.
- Inbox views: Contact, Concerns, Invitations, Newsletter.

## 3. Roles
- `super_admin`: Full system access, including user management and system settings.
- `admin`: Full content management, inbox handling, gallery, documents; no system/user config.
- `editor`: Draft creation and editing; cannot publish, delete, or view personal inbox data.
- `viewer`: Read-only access to dashboard and content lists.
- `public`: Anonymous read access to published content and ability to submit forms.

## 4. Architecture
- **Frontend:** Next.js (App Router, RSC) hosted on Vercel. ISR for public pages, dynamic for admin.
- **Backend:** Next.js Server Actions for admin mutations; Route Handlers (`/api/*`) for forms and search.
- **Database:** PostgreSQL on Supabase with Row Level Security (RLS).
- **Authentication:** Supabase Auth (Email + Password + TOTP MFA for admins).
- **Storage:** Supabase Storage (public-media, documents, submissions).
- **Integrations:** Resend (Email), Turnstile (Anti-bot), GA4, Sentry (Monitoring).

## 5. Technology Stack
- **Framework:** Next.js, TypeScript.
- **Styling:** Tailwind CSS, shadcn/ui.
- **Animation:** Framer Motion.
- **Forms/Validation:** react-hook-form, Zod.
- **Rich Text:** Tiptap, isomorphic-dompurify.
- **Database:** PostgreSQL (Supabase), Supabase Auth/Storage.
- **Email:** Resend, React Email.
- **Testing:** Vitest, Playwright.

## 6. Schema
Core entities include:
- `app_users`, `site_profile`, `social_links`, `impact_areas`, `journey_milestones`.
- `initiatives`, `initiative_categories`, `initiative_updates`, and join tables for media/docs/videos/articles/albums.
- `articles`, `article_categories`, `tags`.
- `media_items`, `videos`, `recognitions`, `gallery_albums`, `gallery_images`, `documents`, `events`.
- Inbox: `contact_requests`, `education_concerns`, `speaking_requests`, `inbox_notes`, `newsletter_subscribers`.
- Settings: `gpta_page`, `seo_settings`, `site_settings`, `audit_logs`, `rate_limits`.

## 7. API Structure
**Route Handlers:**
- `POST /api/forms/contact`
- `POST /api/forms/concern`
- `POST /api/forms/invite`
- `POST /api/newsletter/subscribe`
- `GET /api/search`
- `GET /api/documents/[id]/download`
- `POST /api/revalidate`
- `GET /api/og`
- `GET /api/health`

**Server Actions:** Pattern is `authenticate() -> requireRole() -> Zod parse -> service call -> audit log -> revalidate -> ActionResult`.

## 8. UI Structure
- **Design System:** Navy/Gold color palette, Playfair Display (Headings), Manrope (Body), structured spacing/shadows.
- **Components:** shadcn-based modular components (Cards, Forms, Tables, Modals, Lightbox, etc.).
- **States:** Loading skeletons, Empty states, Error states, Success toasts required for all interactions.

## 9. Folder Structure
- `/src/app/(site)`: Public routes.
- `/src/app/admin`: Protected admin routes.
- `/src/app/api`: Route handlers.
- `/src/components`: UI, site, admin, and shared components.
- `/src/server`: Services, actions, auth, and supabase clients.
- `/src/lib`: Utilities and validations.
- `/supabase`: Migrations, seed data, and tests.

## 10. Phase Plan
- **Phase 0:** Plan Checkpoint (Current)
- **Phase 1:** Foundation & Design System
- **Phase 2:** Database Setup
- **Phase 3:** Public Website (Read-only)
- **Phase 4:** Authentication & Admin Shell
- **Phase 5:** Admin CMS Modules
- **Phase 6:** Engagement Forms & Inbox
- **Phase 7:** Security Hardening
- **Phase 8:** Testing (Unit & E2E)
- **Phase 9:** SEO & Performance
- **Phase 10:** Deployment
- **Phase 11:** Documentation

## 11. Deployment Plan
- **Hosting:** Vercel (Next.js app), Supabase (DB/Auth/Storage).
- **CI/CD:** GitHub Actions (Lint -> Typecheck -> Test -> Build -> Playwright -> Vercel).
- **Database Migrations:** Managed via Supabase CLI in CI pipeline.
- **Monitoring & Backups:** Sentry, GA4, Supabase automated backups + manual cron dumps.
