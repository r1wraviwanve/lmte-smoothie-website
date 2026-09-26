-- ==============================================================================
-- ROHIT DANDAWATE WEBSITE & ADMIN CMS SCHEMA
-- Phase 2 (Database) + Phase 3 (Admin CMS Foundation)
-- Migration: 20260926000001_initial_schema.sql
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "citext";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUMS
DO $$ BEGIN
  CREATE TYPE content_status AS ENUM ('draft', 'in_review', 'published', 'archived');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('super_admin', 'admin', 'editor', 'viewer');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE social_platform AS ENUM ('facebook', 'x', 'youtube', 'instagram', 'linkedin', 'whatsapp');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE image_aspect_ratio AS ENUM ('4/5', '4/6', '1/1', '3/4', '21/9', '16/9');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE content_language AS ENUM ('mr', 'en');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE open_behaviour AS ENUM ('image', 'document', 'detail');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE initiative_status AS ENUM ('ongoing', 'completed', 'planned');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE media_type AS ENUM ('news', 'interview', 'podcast', 'video', 'tv', 'print', 'digital', 'press_statement', 'social_video');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE media_platform AS ENUM ('youtube', 'facebook', 'instagram', 'x', 'website', 'other');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE thumbnail_mode AS ENUM ('auto_youtube', 'uploaded', 'generated');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE media_orientation AS ENUM ('landscape', 'portrait');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE video_category AS ENUM ('interview', 'speech', 'awareness', 'event', 'discussion', 'campaign');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE document_visibility AS ENUM ('public', 'private');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE concern_status AS ENUM ('new', 'under_review', 'representation_made', 'authority_response', 'resolved', 'closed');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE request_status AS ENUM ('new', 'in_progress', 'completed', 'archived');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 3. COMMON FUNCTIONS & TRIGGERS
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. USERS & ROLES TABLE (app_users synced with auth.users)
CREATE TABLE IF NOT EXISTS public.app_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email CITEXT NOT NULL UNIQUE,
  role user_role NOT NULL DEFAULT 'viewer',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  mfa_enforced BOOLEAN NOT NULL DEFAULT FALSE,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER app_users_updated_at
  BEFORE UPDATE ON public.app_users
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 5. SITE PROFILE (Singleton id = 1)
CREATE TABLE IF NOT EXISTS public.site_profile (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  full_name TEXT NOT NULL,
  display_first_name TEXT NOT NULL DEFAULT 'ROHIT',
  display_last_name TEXT NOT NULL DEFAULT 'Dandawate',
  designation TEXT NOT NULL DEFAULT 'Education & Social Impact Activist',
  tagline TEXT,
  hero_video_path TEXT,
  hero_poster_path TEXT,
  hero_overlay_opacity NUMERIC(3,2) NOT NULL DEFAULT 0.35,
  portrait_1_path TEXT NOT NULL,
  portrait_1_alt TEXT NOT NULL,
  portrait_2_path TEXT,
  portrait_2_alt TEXT,
  intro_paragraph_1 JSONB NOT NULL,
  intro_paragraph_2 JSONB NOT NULL,
  story_video_path TEXT,
  story_poster_path TEXT,
  story_youtube_id TEXT,
  about_eyebrow TEXT NOT NULL DEFAULT 'About',
  about_heading TEXT NOT NULL,
  about_heading_accent TEXT,
  about_paragraph_1 JSONB,
  about_paragraph_2 JSONB,
  about_statement JSONB,
  about_banner_path TEXT,
  about_banner_alt TEXT,
  expertise_eyebrow TEXT NOT NULL DEFAULT 'Expertise',
  expertise_heading TEXT NOT NULL,
  expertise_heading_accent TEXT,
  expertise_paragraph_1 JSONB,
  expertise_paragraph_2 JSONB,
  topics_label TEXT NOT NULL DEFAULT 'Topics of Focus:',
  journey_heading TEXT NOT NULL DEFAULT 'Through the',
  journey_heading_accent TEXT NOT NULL DEFAULT 'years',
  long_bio JSONB,
  mission TEXT,
  vision TEXT,
  philosophy TEXT,
  press_bio_short TEXT,
  press_bio_long TEXT,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  show_phone BOOLEAN NOT NULL DEFAULT FALSE,
  office_address TEXT,
  show_address BOOLEAN NOT NULL DEFAULT FALSE,
  footer_display_name TEXT NOT NULL DEFAULT 'Rohit Dandawate',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER site_profile_updated_at
  BEFORE UPDATE ON public.site_profile
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Public View for site profile (Hides sensitive contact information)
CREATE OR REPLACE VIEW public.public_site_profile AS
SELECT
  id,
  full_name,
  display_first_name,
  display_last_name,
  designation,
  tagline,
  hero_video_path,
  hero_poster_path,
  hero_overlay_opacity,
  portrait_1_path,
  portrait_1_alt,
  portrait_2_path,
  portrait_2_alt,
  intro_paragraph_1,
  intro_paragraph_2,
  story_video_path,
  story_poster_path,
  story_youtube_id,
  about_eyebrow,
  about_heading,
  about_heading_accent,
  about_paragraph_1,
  about_paragraph_2,
  about_statement,
  about_banner_path,
  about_banner_alt,
  expertise_eyebrow,
  expertise_heading,
  expertise_heading_accent,
  expertise_paragraph_1,
  expertise_paragraph_2,
  topics_label,
  journey_heading,
  journey_heading_accent,
  long_bio,
  mission,
  vision,
  philosophy,
  press_bio_short,
  press_bio_long,
  contact_email,
  CASE WHEN show_phone THEN contact_phone ELSE NULL END AS contact_phone,
  CASE WHEN show_address THEN office_address ELSE NULL END AS office_address,
  footer_display_name,
  updated_at
FROM public.site_profile
WHERE id = 1;

-- 6. SOCIAL LINKS
CREATE TABLE IF NOT EXISTS public.social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform social_platform NOT NULL,
  url TEXT NOT NULL CHECK (url LIKE 'https://%'),
  label TEXT,
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  show_in_header BOOLEAN NOT NULL DEFAULT TRUE,
  show_in_footer BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER social_links_updated_at
  BEFORE UPDATE ON public.social_links
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 7. IMPACT AREAS (Topics of Focus & Areas of Work)
CREATE TABLE IF NOT EXISTS public.impact_areas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug CITEXT NOT NULL UNIQUE,
  short_description TEXT,
  overview JSONB,
  involvement JSONB,
  hero_image_path TEXT,
  icon TEXT,
  is_topic BOOLEAN NOT NULL DEFAULT TRUE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER impact_areas_updated_at
  BEFORE UPDATE ON public.impact_areas
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 8. SITE SETTINGS (Singleton id = 1)
CREATE TABLE IF NOT EXISTS public.site_settings (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  site_name TEXT NOT NULL DEFAULT 'Rohit Dandawate',
  theme JSONB NOT NULL DEFAULT '{"default": "dark", "allow_toggle": true}'::jsonb,
  default_og_image TEXT,
  ga4_id TEXT,
  whatsapp_number TEXT,
  copyright_name TEXT NOT NULL DEFAULT 'Rohit Dandawate',
  impact_counters JSONB NOT NULL DEFAULT '[
    {
      "id": "representations",
      "label": "Public Representations",
      "value": 150,
      "suffix": "+",
      "description": "More than 150 public representations and interventions addressing issues concerning education, student welfare, parent concerns, school accountability and children’s well-being.",
      "source": "Official Petitions & Representations",
      "verified": false
    }
  ]'::jsonb,
  notification_emails JSONB DEFAULT '[]'::jsonb,
  response_window_text TEXT DEFAULT 'We usually respond within 48-72 business hours.',
  concern_disclaimer_text TEXT,
  consent_text TEXT,
  consent_text_version TEXT DEFAULT '1.0',
  privacy_policy TEXT,
  terms TEXT,
  disclaimer TEXT,
  maintenance_mode BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 9. SEO SETTINGS & REDIRECTS
CREATE TABLE IF NOT EXISTS public.seo_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  route CITEXT NOT NULL UNIQUE,
  title TEXT,
  description TEXT,
  og_image_path TEXT,
  noindex BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER seo_settings_updated_at
  BEFORE UPDATE ON public.seo_settings
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE IF NOT EXISTS public.redirects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_path CITEXT NOT NULL UNIQUE,
  to_path TEXT NOT NULL,
  code INT NOT NULL DEFAULT 301 CHECK (code IN (301, 302, 307, 308)),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. JOURNEY MILESTONES
CREATE TABLE IF NOT EXISTS public.journey_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  body TEXT,
  start_year INT NOT NULL,
  start_month INT CHECK (start_month BETWEEN 1 AND 12),
  end_year INT,
  end_month INT CHECK (end_month BETWEEN 1 AND 12),
  is_current BOOLEAN NOT NULL DEFAULT FALSE,
  image_path TEXT NOT NULL,
  image_alt TEXT NOT NULL,
  image_aspect image_aspect_ratio NOT NULL DEFAULT '4/5',
  grayscale_default BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INT NOT NULL DEFAULT 0,
  status content_status NOT NULL DEFAULT 'draft',
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_journey_status_year ON public.journey_milestones(status, start_year DESC, sort_order);

CREATE TRIGGER journey_milestones_updated_at
  BEFORE UPDATE ON public.journey_milestones
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 11. DOCUMENTS LIBRARY
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT,
  topic TEXT,
  document_date DATE,
  file_path TEXT NOT NULL,
  mime TEXT,
  size_bytes BIGINT,
  visibility document_visibility NOT NULL DEFAULT 'public',
  download_count INT NOT NULL DEFAULT 0,
  status content_status NOT NULL DEFAULT 'draft',
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER documents_updated_at
  BEFORE UPDATE ON public.documents
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 12. REPRESENTATIONS & CATEGORIES
CREATE TABLE IF NOT EXISTS public.representation_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug CITEXT NOT NULL UNIQUE,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.representations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  number INT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  title_alt TEXT,
  language content_language NOT NULL DEFAULT 'mr',
  category_id UUID NOT NULL REFERENCES public.representation_categories(id) ON DELETE RESTRICT,
  representation_date DATE NOT NULL,
  summary TEXT NOT NULL,
  body JSONB,
  authority TEXT,
  clipping_image_path TEXT NOT NULL,
  clipping_image_alt TEXT NOT NULL,
  source_publication TEXT,
  source_url TEXT,
  document_id UUID REFERENCES public.documents(id) ON DELETE SET NULL,
  open_behaviour open_behaviour NOT NULL DEFAULT 'detail',
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  status content_status NOT NULL DEFAULT 'draft',
  search_vector TSVECTOR,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_representations_status_date ON public.representations(status, representation_date DESC);
CREATE INDEX IF NOT EXISTS idx_representations_category ON public.representations(category_id);
CREATE INDEX IF NOT EXISTS idx_representations_search ON public.representations USING GIN(search_vector);

CREATE OR REPLACE FUNCTION representations_search_vector_trigger()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('simple', COALESCE(NEW.title, '')), 'A') ||
    setweight(to_tsvector('simple', COALESCE(NEW.title_alt, '')), 'B') ||
    setweight(to_tsvector('simple', COALESCE(NEW.summary, '')), 'C') ||
    setweight(to_tsvector('simple', COALESCE(NEW.authority, '')), 'D');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_representations_search
  BEFORE INSERT OR UPDATE ON public.representations
  FOR EACH ROW EXECUTE FUNCTION representations_search_vector_trigger();

CREATE TRIGGER representations_updated_at
  BEFORE UPDATE ON public.representations
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 13. INITIATIVES & CATEGORIES
CREATE TABLE IF NOT EXISTS public.initiative_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug CITEXT NOT NULL UNIQUE,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.initiatives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  title_alt TEXT,
  slug CITEXT NOT NULL UNIQUE,
  subtitle TEXT,
  category_id UUID NOT NULL REFERENCES public.initiative_categories(id) ON DELETE RESTRICT,
  initiative_status initiative_status NOT NULL DEFAULT 'ongoing',
  start_date DATE,
  end_date DATE,
  location TEXT,
  short_description TEXT NOT NULL,
  source_publication TEXT,
  source_url TEXT,
  problem_statement JSONB,
  background JSONB,
  action_taken JSONB,
  outcome JSONB,
  stakeholders TEXT[] DEFAULT ARRAY[]::TEXT[],
  featured_image_path TEXT NOT NULL,
  featured_image_alt TEXT NOT NULL,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  status content_status NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  search_vector TSVECTOR,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_initiatives_status ON public.initiatives(status, sort_order);
CREATE INDEX IF NOT EXISTS idx_initiatives_search ON public.initiatives USING GIN(search_vector);

CREATE OR REPLACE FUNCTION initiatives_search_vector_trigger()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('simple', COALESCE(NEW.title, '')), 'A') ||
    setweight(to_tsvector('simple', COALESCE(NEW.title_alt, '')), 'B') ||
    setweight(to_tsvector('simple', COALESCE(NEW.short_description, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_initiatives_search
  BEFORE INSERT OR UPDATE ON public.initiatives
  FOR EACH ROW EXECUTE FUNCTION initiatives_search_vector_trigger();

CREATE TRIGGER initiatives_updated_at
  BEFORE UPDATE ON public.initiatives
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Initiative updates & Join tables
CREATE TABLE IF NOT EXISTS public.initiative_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  initiative_id UUID NOT NULL REFERENCES public.initiatives(id) ON DELETE CASCADE,
  update_date DATE NOT NULL DEFAULT CURRENT_DATE,
  title TEXT NOT NULL,
  description JSONB,
  document_id UUID REFERENCES public.documents(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.initiative_documents (
  initiative_id UUID NOT NULL REFERENCES public.initiatives(id) ON DELETE CASCADE,
  document_id UUID NOT NULL REFERENCES public.documents(id) ON DELETE CASCADE,
  sort_order INT NOT NULL DEFAULT 0,
  PRIMARY KEY (initiative_id, document_id)
);

CREATE TABLE IF NOT EXISTS public.initiative_representations (
  initiative_id UUID NOT NULL REFERENCES public.initiatives(id) ON DELETE CASCADE,
  representation_id UUID NOT NULL REFERENCES public.representations(id) ON DELETE CASCADE,
  sort_order INT NOT NULL DEFAULT 0,
  PRIMARY KEY (initiative_id, representation_id)
);

-- 14. MEDIA ITEMS & VIDEOS
CREATE TABLE IF NOT EXISTS public.media_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  title_alt TEXT,
  language content_language NOT NULL DEFAULT 'mr',
  media_type media_type NOT NULL DEFAULT 'news',
  platform media_platform NOT NULL,
  category_label TEXT,
  publication_or_channel TEXT NOT NULL,
  publication_logo_path TEXT,
  published_on DATE NOT NULL,
  author TEXT,
  youtube_id TEXT,
  external_url TEXT,
  thumbnail_mode thumbnail_mode NOT NULL DEFAULT 'auto_youtube',
  thumbnail_path TEXT,
  thumbnail_alt TEXT,
  orientation media_orientation NOT NULL DEFAULT 'landscape',
  description TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  related_initiative_id UUID REFERENCES public.initiatives(id) ON DELETE SET NULL,
  related_representation_id UUID REFERENCES public.representations(id) ON DELETE SET NULL,
  status content_status NOT NULL DEFAULT 'draft',
  search_vector TSVECTOR,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT check_url_or_youtube CHECK (youtube_id IS NOT NULL OR external_url IS NOT NULL)
);

CREATE INDEX IF NOT EXISTS idx_media_status_published ON public.media_items(status, published_on DESC);
CREATE INDEX IF NOT EXISTS idx_media_search ON public.media_items USING GIN(search_vector);

CREATE OR REPLACE FUNCTION media_items_search_vector_trigger()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('simple', COALESCE(NEW.title, '')), 'A') ||
    setweight(to_tsvector('simple', COALESCE(NEW.title_alt, '')), 'B') ||
    setweight(to_tsvector('simple', COALESCE(NEW.publication_or_channel, '')), 'C') ||
    setweight(to_tsvector('simple', COALESCE(NEW.description, '')), 'D');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_media_items_search
  BEFORE INSERT OR UPDATE ON public.media_items
  FOR EACH ROW EXECUTE FUNCTION media_items_search_vector_trigger();

CREATE TRIGGER media_items_updated_at
  BEFORE UPDATE ON public.media_items
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Owned Video Library
CREATE TABLE IF NOT EXISTS public.videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug CITEXT NOT NULL UNIQUE,
  youtube_id TEXT NOT NULL,
  category video_category NOT NULL DEFAULT 'speech',
  recorded_on DATE,
  description TEXT,
  transcript TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  status content_status NOT NULL DEFAULT 'draft',
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER videos_updated_at
  BEFORE UPDATE ON public.videos
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE IF NOT EXISTS public.initiative_media (
  initiative_id UUID NOT NULL REFERENCES public.initiatives(id) ON DELETE CASCADE,
  media_item_id UUID NOT NULL REFERENCES public.media_items(id) ON DELETE CASCADE,
  sort_order INT NOT NULL DEFAULT 0,
  PRIMARY KEY (initiative_id, media_item_id)
);

CREATE TABLE IF NOT EXISTS public.initiative_videos (
  initiative_id UUID NOT NULL REFERENCES public.initiatives(id) ON DELETE CASCADE,
  video_id UUID NOT NULL REFERENCES public.videos(id) ON DELETE CASCADE,
  sort_order INT NOT NULL DEFAULT 0,
  PRIMARY KEY (initiative_id, video_id)
);

-- 15. ARTICLES, TAGS & RECOGNITIONS
CREATE TABLE IF NOT EXISTS public.article_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug CITEXT NOT NULL UNIQUE,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug CITEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug CITEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content JSONB NOT NULL,
  category_id UUID REFERENCES public.article_categories(id) ON DELETE SET NULL,
  featured_image_path TEXT,
  featured_image_alt TEXT,
  caption TEXT,
  credit TEXT,
  key_points TEXT[] DEFAULT ARRAY[]::TEXT[],
  reading_time_minutes INT DEFAULT 5,
  status content_status NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  search_vector TSVECTOR,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE IF NOT EXISTS public.article_tags (
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, tag_id)
);

CREATE TABLE IF NOT EXISTS public.initiative_articles (
  initiative_id UUID NOT NULL REFERENCES public.initiatives(id) ON DELETE CASCADE,
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  sort_order INT NOT NULL DEFAULT 0,
  PRIMARY KEY (initiative_id, article_id)
);

CREATE TABLE IF NOT EXISTS public.recognitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  year INT NOT NULL,
  awarded_by TEXT NOT NULL,
  reason TEXT,
  certificate_document_id UUID REFERENCES public.documents(id) ON DELETE SET NULL,
  image_path TEXT,
  source_url TEXT,
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  status content_status NOT NULL DEFAULT 'draft',
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER recognitions_updated_at
  BEFORE UPDATE ON public.recognitions
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 16. GALLERY & EVENTS
CREATE TABLE IF NOT EXISTS public.gallery_albums (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug CITEXT NOT NULL UNIQUE,
  description TEXT,
  cover_image_path TEXT,
  event_date DATE,
  status content_status NOT NULL DEFAULT 'draft',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  album_id UUID NOT NULL REFERENCES public.gallery_albums(id) ON DELETE CASCADE,
  image_path TEXT NOT NULL,
  caption TEXT,
  alt TEXT NOT NULL,
  taken_on DATE,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.initiative_albums (
  initiative_id UUID NOT NULL REFERENCES public.initiatives(id) ON DELETE CASCADE,
  album_id UUID NOT NULL REFERENCES public.gallery_albums(id) ON DELETE CASCADE,
  sort_order INT NOT NULL DEFAULT 0,
  PRIMARY KEY (initiative_id, album_id)
);

CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug CITEXT NOT NULL UNIQUE,
  event_type TEXT,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ,
  venue TEXT,
  city TEXT,
  is_online BOOLEAN NOT NULL DEFAULT FALSE,
  description JSONB,
  registration_url TEXT,
  cover_image_path TEXT,
  status content_status NOT NULL DEFAULT 'draft',
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 17. GPTA PAGE (Singleton id = 1)
CREATE TABLE IF NOT EXISTS public.gpta_page (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  official_name TEXT NOT NULL DEFAULT 'Global Parents Teachers Association',
  logo_path TEXT,
  about JSONB,
  mission TEXT,
  vision TEXT,
  activities JSONB,
  parent_teacher_engagement JSONB,
  video_ids TEXT[] DEFAULT ARRAY[]::TEXT[],
  poster_paths TEXT[] DEFAULT ARRAY[]::TEXT[],
  contact_email TEXT,
  contact_phone TEXT,
  registration_details TEXT,
  show_registration BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER gpta_page_updated_at
  BEFORE UPDATE ON public.gpta_page
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 18. INBOX (Contact, Concerns, Invitations & Notes)
CREATE TABLE IF NOT EXISTS public.contact_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email CITEXT NOT NULL,
  phone TEXT,
  organization TEXT,
  message TEXT NOT NULL,
  status request_status NOT NULL DEFAULT 'new',
  ip_hash TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER contact_requests_updated_at
  BEFORE UPDATE ON public.contact_requests
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE IF NOT EXISTS public.education_concerns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_code TEXT NOT NULL UNIQUE,
  student_name TEXT,
  guardian_name TEXT NOT NULL,
  relationship TEXT NOT NULL,
  contact_email CITEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  school_name TEXT NOT NULL,
  school_district TEXT NOT NULL,
  school_city TEXT NOT NULL,
  concern_category TEXT NOT NULL,
  incident_date DATE,
  description TEXT NOT NULL,
  steps_taken TEXT,
  attachments JSONB DEFAULT '[]'::jsonb,
  consent_given BOOLEAN NOT NULL DEFAULT TRUE,
  consent_text_version TEXT NOT NULL DEFAULT '1.0',
  status concern_status NOT NULL DEFAULT 'new',
  internal_notes TEXT,
  assigned_to UUID REFERENCES public.app_users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER education_concerns_updated_at
  BEFORE UPDATE ON public.education_concerns
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE IF NOT EXISTS public.speaking_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email CITEXT NOT NULL,
  phone TEXT NOT NULL,
  organization TEXT NOT NULL,
  event_name TEXT NOT NULL,
  event_date DATE,
  topic TEXT NOT NULL,
  audience_size INT,
  venue_city TEXT NOT NULL,
  details TEXT,
  status request_status NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER speaking_requests_updated_at
  BEFORE UPDATE ON public.speaking_requests
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE IF NOT EXISTS public.inbox_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT NOT NULL CHECK (entity_type IN ('contact', 'concern', 'speaking')),
  entity_id UUID NOT NULL,
  author_id UUID REFERENCES public.app_users(id) ON DELETE SET NULL,
  author_name TEXT,
  note TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 19. AUDIT LOGS, RATE LIMITS & STORAGE ASSETS
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES public.app_users(id) ON DELETE SET NULL,
  actor_email TEXT,
  action TEXT NOT NULL,
  entity TEXT NOT NULL,
  entity_id TEXT,
  diff JSONB,
  ip_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_actor ON public.audit_logs(actor_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON public.audit_logs(entity, entity_id);

CREATE TABLE IF NOT EXISTS public.rate_limits (
  key TEXT PRIMARY KEY,
  count INT NOT NULL DEFAULT 1,
  expire_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS public.storage_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path TEXT NOT NULL UNIQUE,
  bucket TEXT NOT NULL,
  mime TEXT,
  width INT,
  height INT,
  blurhash TEXT,
  alt TEXT,
  used_by JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 20. RATE LIMITING RPC
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  p_key TEXT,
  p_limit INT,
  p_window_seconds INT
) RETURNS BOOLEAN AS $$
DECLARE
  v_count INT;
BEGIN
  DELETE FROM public.rate_limits WHERE expire_at < NOW();

  INSERT INTO public.rate_limits (key, count, expire_at)
  VALUES (p_key, 1, NOW() + (p_window_seconds || ' seconds')::INTERVAL)
  ON CONFLICT (key) DO UPDATE
    SET count = public.rate_limits.count + 1
  RETURNING count INTO v_count;

  RETURN v_count <= p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 21. ROLE CHECK HELPER FUNCTIONS
CREATE OR REPLACE FUNCTION public.get_user_role(p_user_id UUID)
RETURNS user_role AS $$
DECLARE
  v_role user_role;
BEGIN
  SELECT role INTO v_role FROM public.app_users WHERE id = p_user_id AND is_active = TRUE;
  RETURN v_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.is_admin_or_super()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (public.get_user_role(auth.uid()) IN ('super_admin', 'admin'));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.is_editor_or_above()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (public.get_user_role(auth.uid()) IN ('super_admin', 'admin', 'editor'));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (public.get_user_role(auth.uid()) = 'super_admin');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Sync user from auth.users to app_users automatically
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  v_count INT;
BEGIN
  SELECT COUNT(*) INTO v_count FROM public.app_users;
  -- If this is the very first registered user, make them super_admin!
  INSERT INTO public.app_users (id, email, role, is_active)
  VALUES (
    NEW.id,
    NEW.email,
    CASE WHEN v_count = 0 THEN 'super_admin'::user_role ELSE 'viewer'::user_role END,
    TRUE
  )
  ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 22. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.app_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.impact_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.redirects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journey_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.representation_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.representations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.initiative_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.initiatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.initiative_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.initiative_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.initiative_representations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recognitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gpta_page ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education_concerns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.speaking_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inbox_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.storage_assets ENABLE ROW LEVEL SECURITY;

-- Content Public Read Policies
CREATE POLICY "Public can view active profile" ON public.site_profile FOR SELECT USING (true);
CREATE POLICY "Public can view active settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public can view seo" ON public.seo_settings FOR SELECT USING (true);
CREATE POLICY "Public can view redirects" ON public.redirects FOR SELECT USING (true);
CREATE POLICY "Public can view gpta page" ON public.gpta_page FOR SELECT USING (true);

CREATE POLICY "Public can view verified social links" ON public.social_links
  FOR SELECT USING (is_verified = TRUE AND is_active = TRUE);

CREATE POLICY "Public can view active impact areas" ON public.impact_areas
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Public can view published journey" ON public.journey_milestones
  FOR SELECT USING (status = 'published' AND deleted_at IS NULL);

CREATE POLICY "Public can view public documents" ON public.documents
  FOR SELECT USING (status = 'published' AND visibility = 'public' AND deleted_at IS NULL);

CREATE POLICY "Public can view representation categories" ON public.representation_categories
  FOR SELECT USING (true);

CREATE POLICY "Public can view published representations" ON public.representations
  FOR SELECT USING (status = 'published' AND deleted_at IS NULL);

CREATE POLICY "Public can view initiative categories" ON public.initiative_categories
  FOR SELECT USING (true);

CREATE POLICY "Public can view published initiatives" ON public.initiatives
  FOR SELECT USING (status = 'published' AND deleted_at IS NULL);

CREATE POLICY "Public can view initiative updates" ON public.initiative_updates
  FOR SELECT USING (EXISTS (SELECT 1 FROM public.initiatives WHERE id = initiative_id AND status = 'published' AND deleted_at IS NULL));

CREATE POLICY "Public can view published media items" ON public.media_items
  FOR SELECT USING (status = 'published' AND deleted_at IS NULL);

CREATE POLICY "Public can view published videos" ON public.videos
  FOR SELECT USING (status = 'published' AND deleted_at IS NULL);

CREATE POLICY "Public can view article categories" ON public.article_categories FOR SELECT USING (true);
CREATE POLICY "Public can view tags" ON public.tags FOR SELECT USING (true);

CREATE POLICY "Public can view published articles" ON public.articles
  FOR SELECT USING (status = 'published' AND deleted_at IS NULL);

CREATE POLICY "Public can view published recognitions" ON public.recognitions
  FOR SELECT USING (status = 'published' AND is_verified = TRUE AND deleted_at IS NULL);

CREATE POLICY "Public can view published gallery albums" ON public.gallery_albums
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public can view gallery images" ON public.gallery_images
  FOR SELECT USING (EXISTS (SELECT 1 FROM public.gallery_albums WHERE id = album_id AND status = 'published'));

CREATE POLICY "Public can view published events" ON public.events
  FOR SELECT USING (status = 'published' AND deleted_at IS NULL);

-- Admin & Super Admin full access policies
DO $$
DECLARE
  tbl TEXT;
  tables TEXT[] := ARRAY[
    'app_users', 'site_profile', 'social_links', 'impact_areas', 'site_settings',
    'seo_settings', 'redirects', 'journey_milestones', 'documents',
    'representation_categories', 'representations', 'initiative_categories',
    'initiatives', 'initiative_updates', 'initiative_documents', 'initiative_representations',
    'media_items', 'videos', 'initiative_media', 'initiative_videos',
    'article_categories', 'tags', 'articles', 'article_tags', 'initiative_articles',
    'recognitions', 'gallery_albums', 'gallery_images', 'initiative_albums',
    'events', 'gpta_page', 'contact_requests', 'education_concerns',
    'speaking_requests', 'inbox_notes', 'audit_logs', 'storage_assets'
  ];
BEGIN
  FOREACH tbl IN ARRAY tables LOOP
    EXECUTE format('CREATE POLICY "Admins have full access on %I" ON public.%I FOR ALL TO authenticated USING (public.is_admin_or_super()) WITH CHECK (public.is_admin_or_super());', tbl, tbl);
  END LOOP;
END $$;

-- Editors Draft / Review access policies
CREATE POLICY "Editors can select all content items" ON public.journey_milestones FOR SELECT TO authenticated USING (public.is_editor_or_above());
CREATE POLICY "Editors can insert draft journey" ON public.journey_milestones FOR INSERT TO authenticated WITH CHECK (public.is_editor_or_above() AND status IN ('draft', 'in_review'));
CREATE POLICY "Editors can update draft journey" ON public.journey_milestones FOR UPDATE TO authenticated USING (public.is_editor_or_above()) WITH CHECK (public.is_editor_or_above() AND status IN ('draft', 'in_review'));

CREATE POLICY "Editors can select all representations" ON public.representations FOR SELECT TO authenticated USING (public.is_editor_or_above());
CREATE POLICY "Editors can insert draft representations" ON public.representations FOR INSERT TO authenticated WITH CHECK (public.is_editor_or_above() AND status IN ('draft', 'in_review'));
CREATE POLICY "Editors can update draft representations" ON public.representations FOR UPDATE TO authenticated USING (public.is_editor_or_above()) WITH CHECK (public.is_editor_or_above() AND status IN ('draft', 'in_review'));

CREATE POLICY "Editors can select all initiatives" ON public.initiatives FOR SELECT TO authenticated USING (public.is_editor_or_above());
CREATE POLICY "Editors can insert draft initiatives" ON public.initiatives FOR INSERT TO authenticated WITH CHECK (public.is_editor_or_above() AND status IN ('draft', 'in_review'));
CREATE POLICY "Editors can update draft initiatives" ON public.initiatives FOR UPDATE TO authenticated USING (public.is_editor_or_above()) WITH CHECK (public.is_editor_or_above() AND status IN ('draft', 'in_review'));

CREATE POLICY "Editors can select all media" ON public.media_items FOR SELECT TO authenticated USING (public.is_editor_or_above());
CREATE POLICY "Editors can insert draft media" ON public.media_items FOR INSERT TO authenticated WITH CHECK (public.is_editor_or_above() AND status IN ('draft', 'in_review'));
CREATE POLICY "Editors can update draft media" ON public.media_items FOR UPDATE TO authenticated USING (public.is_editor_or_above()) WITH CHECK (public.is_editor_or_above() AND status IN ('draft', 'in_review'));

-- Inbox Public Submission Policies (Service role / public insert with checks)
CREATE POLICY "Public can submit contact form" ON public.contact_requests
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Public can submit education concerns" ON public.education_concerns
  FOR INSERT TO anon, authenticated WITH CHECK (consent_given = TRUE);

CREATE POLICY "Public can submit speaking requests" ON public.speaking_requests
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- 23. STORAGE BUCKETS SETUP
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('public-media', 'public-media', true, 62914560, ARRAY[
    'image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml',
    'video/mp4', 'video/webm'
  ]),
  ('documents', 'documents', false, 26214400, ARRAY[
    'application/pdf', 'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  ]),
  ('submissions', 'submissions', false, 10485760, ARRAY[
    'application/pdf', 'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg', 'image/png', 'image/webp'
  ])
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Storage Policies
CREATE POLICY "Public can read public-media bucket" ON storage.objects
  FOR SELECT USING (bucket_id = 'public-media');

CREATE POLICY "Admins can manage public-media bucket" ON storage.objects
  FOR ALL TO authenticated USING (bucket_id = 'public-media' AND public.is_admin_or_super())
  WITH CHECK (bucket_id = 'public-media' AND public.is_admin_or_super());

CREATE POLICY "Admins can manage documents bucket" ON storage.objects
  FOR ALL TO authenticated USING (bucket_id = 'documents' AND public.is_admin_or_super())
  WITH CHECK (bucket_id = 'documents' AND public.is_admin_or_super());
