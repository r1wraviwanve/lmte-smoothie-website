-- ==============================================================================
-- ROHIT DANDAWATE WEBSITE SEED DATA
-- Imports current homepage content as draft / unverified rows
-- ==============================================================================

-- 1. SITE PROFILE (Singleton id = 1)
INSERT INTO public.site_profile (
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
  contact_email,
  contact_phone,
  show_phone,
  office_address,
  show_address,
  footer_display_name
) VALUES (
  1,
  'Rohit Dandawate',
  'ROHIT',
  'Dandawate',
  'Education & Social Impact Activist',
  'Advocacy Leadership With a Human Purpose',
  '/videos/Rohit_Animated_Video.mp4',
  '/videos/Rohit_Animated_Video_Poster.jpg',
  0.35,
  '/images/rohit_homepage.png',
  'Rohit Portrait 1',
  '/images/Rohit_image2.png',
  'Rohit Portrait 2',
  '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Rohit Dandawate"},{"type":"text","text":" is an education and social impact activist working to make schools safer, healthier and more accountable to the families they serve. "},{"type":"text","marks":[{"type":"bold"}],"text":"Rohit Dandawate is the President of the Global Parents Teachers Association (GPTA)"},{"type":"text","text":", a platform that brings parents, teachers and institutions into one conversation about the everyday realities of education, from classroom safety and school food to student wellbeing."}]}]}'::jsonb,
  '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Over years of public work across Maharashtra, Rohit has raised concerns, filed representations and built awareness on issues that affect children long before they reach the headlines. His approach is simple: listen to parents, verify the facts, engage the institution, and follow through until something changes."}]}]}'::jsonb,
  '/videos/Rohit_My_Story.mp4',
  '/videos/Rohit_Animated_Video_Poster.jpg',
  'About',
  'Advocacy Leadership',
  'With a Human Purpose',
  '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Rohit Dandawate has built his career at the intersection of education reform, child safety, and institutional accountability."}]}]}'::jsonb,
  '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"His journey includes extensive fieldwork, policy advocacy, and community mobilization. He has led groundbreaking initiatives to ensure schools adhere to safety norms, nutrition standards, and transparent fee structures, always placing the welfare of the child at the center of his work."}]}]}'::jsonb,
  '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Rohit is the President of the GPTA"},{"type":"text","text":", a platform empowering parents and teachers to actively shape the educational ecosystem."}]}]}'::jsonb,
  '/images/Rohit_about.png',
  'Rohit Dandawate in Discussion',
  'Expertise',
  'Speaking About the',
  'Future of Education',
  '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Rohit brings together years of grassroots activism, policy understanding, and community leadership."}]}]}'::jsonb,
  '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"As a speaker on education issues, he explores the realities of modern schooling and asks how institutions can remain aligned with the fundamental needs of children and families."}]}]}'::jsonb,
  'Topics of Focus:',
  'Through the',
  'years',
  'contact@rohitdandawate.org',
  '+91 98000 00000',
  false,
  'Mumbai / Pune, Maharashtra, India',
  false,
  'Rohit Dandawate'
)
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  display_first_name = EXCLUDED.display_first_name,
  display_last_name = EXCLUDED.display_last_name,
  designation = EXCLUDED.designation,
  hero_video_path = EXCLUDED.hero_video_path,
  hero_poster_path = EXCLUDED.hero_poster_path,
  portrait_1_path = EXCLUDED.portrait_1_path,
  portrait_2_path = EXCLUDED.portrait_2_path,
  story_video_path = EXCLUDED.story_video_path,
  about_banner_path = EXCLUDED.about_banner_path;

-- 2. SOCIAL LINKS (imported as is_verified = false)
INSERT INTO public.social_links (platform, url, label, is_verified, is_active, show_in_header, show_in_footer, sort_order)
VALUES
  ('facebook', 'https://www.facebook.com/rohit.dandwate?rdid=3svfsWNPgqObBqHc&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1QFSPzE3bP%2F', 'Facebook', false, true, true, true, 1),
  ('x', 'https://x.com/dandwaterohit', 'Twitter (X)', false, true, true, true, 2),
  ('youtube', 'https://www.youtube.com/@gpta8006', 'YouTube', false, true, true, true, 3),
  ('instagram', 'https://www.instagram.com/rohit_dandwate', 'Instagram', false, true, true, true, 4)
ON CONFLICT DO NOTHING;

-- 3. IMPACT AREAS (Topics of Focus)
INSERT INTO public.impact_areas (title, slug, short_description, is_topic, is_active, sort_order)
VALUES
  ('Child Safety & School Audits', 'child-safety-school-audits', 'Auditing campus transport, fire safety, and building security norms across private and public schools.', true, true, 1),
  ('Parent-Teacher Collaboration', 'parent-teacher-collaboration', 'Building constructive, institutionalized dialogue between families and educators for student success.', true, true, 2),
  ('Education Policy Reform', 'education-policy-reform', 'Active representation to education ministries and local authorities on regulatory compliance.', true, true, 3),
  ('Institutional Accountability', 'institutional-accountability', 'Ensuring transparency in fee regulations, curriculum execution, and student welfare standards.', true, true, 4),
  ('Student Mental & Physical Wellbeing', 'student-wellbeing', 'Promoting mandatory playgrounds, nutritious canteens, and stress-free school environments.', true, true, 5)
ON CONFLICT (slug) DO NOTHING;

-- 4. SITE SETTINGS
INSERT INTO public.site_settings (
  id,
  site_name,
  theme,
  copyright_name,
  impact_counters,
  response_window_text
) VALUES (
  1,
  'Rohit Dandawate',
  '{"default": "dark", "allow_toggle": true}'::jsonb,
  'Rohit Dandawate',
  '[
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
  'We usually respond within 48-72 business hours.'
)
ON CONFLICT (id) DO UPDATE SET
  impact_counters = EXCLUDED.impact_counters,
  theme = EXCLUDED.theme;

-- 5. JOURNEY MILESTONES (Draft with [PLACEHOLDER] in label)
INSERT INTO public.journey_milestones (
  label,
  title,
  description,
  start_year,
  is_current,
  image_path,
  image_alt,
  image_aspect,
  grayscale_default,
  sort_order,
  status
) VALUES
  (
    '[PLACEHOLDER] GPTA Founded',
    'President, GPTA',
    'Leading the Global Parents Teachers Association to revolutionize the dialogue between parents and educational institutions across the state.',
    2022,
    true,
    '/images/White_dress.png',
    'GPTA Founded',
    '4/5',
    true,
    1,
    'draft'
  ),
  (
    '[PLACEHOLDER] School Safety Campaign',
    'School Safety Advocate',
    'Spearheaded multiple public campaigns addressing critical gaps in school transport, fire safety, and campus security.',
    2018,
    false,
    '/images/rohit_homepage.png',
    'Safety Campaign',
    '4/6',
    true,
    2,
    'draft'
  ),
  (
    '[PLACEHOLDER] Grassroots Organizing',
    'Community Mobilizer',
    'Worked at the grassroots level organizing parents to audit school fee structures and demand transparency in educational expenses.',
    2015,
    false,
    '/images/Community_mobilizer.png',
    'Early Activism',
    '1/1',
    true,
    3,
    'draft'
  )
ON CONFLICT DO NOTHING;

-- 6. REPRESENTATION CATEGORIES & REPRESENTATIONS
INSERT INTO public.representation_categories (name, slug, sort_order)
VALUES
  ('School Infrastructure', 'school-infrastructure', 1),
  ('DCPR 2034 Compliance', 'dcpr-2034-compliance', 2),
  ('Student Welfare', 'student-welfare', 3)
ON CONFLICT (slug) DO NOTHING;

DO $$
DECLARE
  cat_infra UUID;
  cat_dcpr UUID;
  cat_welfare UUID;
BEGIN
  SELECT id INTO cat_infra FROM public.representation_categories WHERE slug = 'school-infrastructure';
  SELECT id INTO cat_dcpr FROM public.representation_categories WHERE slug = 'dcpr-2034-compliance';
  SELECT id INTO cat_welfare FROM public.representation_categories WHERE slug = 'student-welfare';

  INSERT INTO public.representations (
    number,
    title,
    title_alt,
    language,
    category_id,
    representation_date,
    summary,
    authority,
    clipping_image_path,
    clipping_image_alt,
    source_publication,
    open_behaviour,
    is_featured,
    status
  ) VALUES
    (
      1,
      'शाळांना कायमस्वरूपी क्रीडांगण बंधनकारक करा!',
      'Mandatory Permanent Playgrounds for Schools',
      'mr',
      cat_infra,
      '2026-08-06',
      'ग्लोबल पेरेंट्स टीचर्स असोसिएशनने महापालिका आयुक्तांकडे प्रत्येक शाळेत ४०% कायमस्वरूपी क्रीडांगण अनिवार्य करण्याची केलेली अधिकृत मागणी.',
      'Municipal Commissioner',
      '/images/representations/representation_01_sakal_playground.jpg',
      'Sakal Playground Clipping',
      'Sakal',
      'detail',
      true,
      'draft'
    ),
    (
      2,
      'शाळांसाठी क्रीडांगण बंधनकारक करा — मनपाकडे मागणी',
      'Enforce Playground Rules under DCPR 2034',
      'mr',
      cat_dcpr,
      '2026-08-06',
      'डीसिपीआर २०३४ मधील नियम ३८ च्या उल्लंघनाविरुद्ध आणि विद्यार्थ्यांच्या सुरक्षिततेसाठी मनपा आयुक्तांना सादर केलेले अधिकृत निवेदन.',
      'Municipal Commissioner',
      '/images/representations/representation_02_punyanagari_ground.jpg',
      'Punyanagari Ground Clipping',
      'Punyanagari',
      'detail',
      true,
      'draft'
    ),
    (
      3,
      'Playground Regulations & Student Stress Reduction',
      'शालेय क्रीडांगण नियमन आणि विद्यार्थी तणावमुक्ती',
      'en',
      cat_welfare,
      '2026-09-19',
      'Representation on reforming school education landscape, auditing private schools violating playground norms, and prioritizing child physical health.',
      'Education Department / FDA Commissioner',
      '/images/representations/representation_03_midday_mundhe.jpg',
      'Mid-Day Mundhe Clipping',
      'Mid-Day',
      'detail',
      true,
      'draft'
    )
  ON CONFLICT (number) DO NOTHING;
END $$;

-- 7. INITIATIVE CATEGORIES & INITIATIVES
INSERT INTO public.initiative_categories (name, slug, sort_order)
VALUES
  ('Canteen & Nutrition', 'canteen-nutrition', 1),
  ('Child Safety', 'child-safety', 2),
  ('Student Data', 'student-data', 3),
  ('Policy Reform', 'policy-reform', 4),
  ('School Infrastructure', 'school-infra', 5)
ON CONFLICT (slug) DO NOTHING;

DO $$
DECLARE
  cat_nutrition UUID;
  cat_reform UUID;
  cat_infra UUID;
  cat_data UUID;
BEGIN
  SELECT id INTO cat_nutrition FROM public.initiative_categories WHERE slug = 'canteen-nutrition';
  SELECT id INTO cat_reform FROM public.initiative_categories WHERE slug = 'policy-reform';
  SELECT id INTO cat_infra FROM public.initiative_categories WHERE slug = 'school-infra';
  SELECT id INTO cat_data FROM public.initiative_categories WHERE slug = 'student-data';

  INSERT INTO public.initiatives (
    title,
    slug,
    category_id,
    short_description,
    source_publication,
    featured_image_path,
    featured_image_alt,
    is_featured,
    status
  ) VALUES
    (
      'Campus Hygiene & Nutrition Audits',
      'campus-hygiene-nutrition-audits',
      cat_nutrition,
      'Demanding strict monitoring and quarterly compliance reports against high-sugar and fatty food sales in school canteens.',
      'Lokmat',
      '/images/initiatives/action_01_lokmat_canteen.jpg',
      'Campus Hygiene & Nutrition Audits',
      true,
      'draft'
    ),
    (
      'Statewide Junk Food Ban Enforcement',
      'statewide-junk-food-ban-enforcement',
      cat_reform,
      'Sounding the alarm across Maharashtra on the 10-year ban on fast food and HFSS items in school premises.',
      'Times of India',
      '/images/initiatives/action_02_toi_junk_food.jpg',
      'Statewide Junk Food Ban Enforcement',
      true,
      'draft'
    ),
    (
      'FSSAI Safety Act Compliance',
      'fssai-safety-act-compliance',
      cat_nutrition,
      'Pushing for regulatory inspection and legal penalties under Section 56 of FSSAI Act for defaulting school vendors.',
      'Pudhari',
      '/images/initiatives/action_03_pudhari_canteen.jpg',
      'FSSAI Safety Act Compliance',
      true,
      'draft'
    ),
    (
      'School Canteen Oversight Committees',
      'school-canteen-oversight-committees',
      cat_infra,
      'Advocating 30-day inspection drives, school-level food monitoring committees, and active parent oversight.',
      'Mumbai Mirror',
      '/images/initiatives/action_04_mumbai_mirror.jpg',
      'School Canteen Oversight Committees',
      true,
      'draft'
    ),
    (
      'Student Data Privacy & APAAR ID',
      'student-data-privacy-apaar-id',
      cat_data,
      'Public representations seeking statutory clarity and data protection safeguards against student ID data exposure.',
      'Mid-Day',
      '/images/initiatives/action_05_midday_apaar.jpg',
      'Student Data Privacy & APAAR ID',
      true,
      'draft'
    )
  ON CONFLICT (slug) DO NOTHING;
END $$;

-- 8. MEDIA ITEMS
INSERT INTO public.media_items (
  title,
  language,
  media_type,
  platform,
  category_label,
  publication_or_channel,
  published_on,
  youtube_id,
  external_url,
  thumbnail_mode,
  orientation,
  is_featured,
  status
) VALUES
  (
    'ग्लोबल पेरेंट्स टीचर्स असोसिएशन अध्यक्ष रोहित अलका श्यामसुंदर दंडवते यांच्या पत्राची दखल घेत राज्यात सर्वात मोठी कार्यवाही. शाळेच्या उपवरगृहावर (School Canteen) अन्न व औषध प्रशासन (FDA) आयुक्त तुकाराम मुंढे यांच्याकडून नियमावली जाहीर आता शाळेच्या ५० मीटरच्या आवारात चॉकलेट बिस्किटवर बंदी. मुलांच्या आरोग्याच्या दृष्टिकोनातून खूपच चांगली बाब आहे त्याचबरोबर शाळा मुख्याध्यापक व संस्थाचालक यांना नम्र विनंती आहे की शाळेमध्ये फ्रूट डे, व्हेジットेबल डे साजरे होण्यासाठी पुढाकार घ्यावा ही नम्र विनंती.',
    'mr',
    'news',
    'youtube',
    'School Canteen / Student Health',
    'YouTube',
    '2026-08-10',
    'DKexCzTU88w',
    'https://youtu.be/DKexCzTU88w?si=sHGQahOAzQsaG228',
    'auto_youtube',
    'landscape',
    true,
    'draft'
  ),
  (
    'ग्लोबल पेरेंट्स टीचर्स असोसिएशनच्या मागणीला यश — ड्रग्स वर घाव, आता सातवी पासून शाळेत व्यसनमुक्तीचे देणार धडे',
    'mr',
    'news',
    'facebook',
    'Education / Drug Awareness',
    'Facebook',
    '2026-08-08',
    NULL,
    'https://www.facebook.com/share/v/18bpMBaEaF/',
    'generated',
    'landscape',
    true,
    'draft'
  ),
  (
    'ग्लोबल पेरेंट्स टीचर्स असोसिएशनच्या मागणीला यश — ड्रग्स वर घाव, आता सातवी पासून शाळेत व्यसनमुक्तीचे देणार धडे',
    'mr',
    'social_video',
    'youtube',
    'Drug Awareness / Education',
    'YouTube Shorts',
    '2026-08-08',
    '6RP-zSA4jZk',
    'https://youtube.com/shorts/6RP-zSA4jZk?si=HzRH7MjkPgefMhvP',
    'auto_youtube',
    'portrait',
    true,
    'draft'
  ),
  (
    'ग्लोबल पेरेंट्स टीचर्स असोसिएशन अध्यक्ष रोहित अलका श्यामसुंदर दंडवते यांच्या पत्राची दखल घेत राज्यात सर्वात मोठी कार्यवाही — शाळेच्या उपवरगृहावर (School Canteen) अन्न व औषध प्रशासन (FDA) आयुक्त तुकाराम मुंढे यांची करडी नजर',
    'mr',
    'social_video',
    'youtube',
    'School Canteen / Student Health',
    'YouTube Shorts',
    '2026-08-10',
    'ifIpb5MPKHA',
    'https://youtube.com/shorts/ifIpb5MPKHA?si=kHVbiiEPn5L0RVMx',
    'auto_youtube',
    'portrait',
    true,
    'draft'
  )
ON CONFLICT DO NOTHING;
