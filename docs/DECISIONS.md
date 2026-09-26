# Technical Decisions

1. **Architecture Pivot - Single Page Application (SPA):** 
   - Based on user request ("i need all website in one single page"), the public-facing website will now be a single, long-scrolling page instead of a multi-page routing structure.
   - All primary navigation links will be converted to anchor links (e.g., `#about`, `#media`, `#contact`) that scroll smoothly to the respective sections on the homepage.
   - For content-heavy modules (like viewing a full article or a detailed initiative case study), we will use either expand-in-place interactions, side-drawers, or dedicated dynamic routes (e.g., `/article/[slug]`) if the content is too long for an in-page modal, but the primary experience will remain anchored to the root `/` page.
   - The Admin CMS will remain a multi-page dashboard.
