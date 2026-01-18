## Phase 4a: Public Application Architecture (Unauthenticated Experience)
**Goal:** Create a rich, engaging experience for public users to educate and convert them.

- [ ] **Public Application Layout (`features/public-layout`)**:
    - `PublicHeader.jsx`: Navigation specific to public pages (Home, Learn, About, Projects, Login).
    - `PublicFooter.jsx`: Rich footer with sitemap and mission.
- [ ] **Landing Page (`/page.jsx`)**:
    - **Hero Section**: Immersive visuals, value proposition, "Get Started" CTA.
    - **Feature Highlights**: Scroll-triggered animations showing app capabilities.
    - **Social Proof**: Running counters (e.g., "kg of CO2 saved").
- [ ] **Educational Hub (`/learn`)**:
    - **Goal**: SEO-rich content to educate users on sustainability.
    - `ArticleCard.jsx`, `CategoryFilter.jsx`.
    - Static markdown rendering for performance.
- [ ] **Carbon Offset Projects Showcase (`/projects`)**:
    - **Goal**: Show real-world impact transparency.
    - `ProjectGallery.jsx`: Grid view of certified projects.
    - `ProjectDetailModal.jsx`: Pop-up details for specific initiatives.
- [ ] **Simple Footprint Estimator (`/estimator`)**:
    - **Goal**: A "lite" calculator (teaser) requiring no login.
    - 5-question wizard that gives a rough impact score.
    - "Unlock Full Report" CTA driving registration.
- [ ] **About & Mission (`/about`)**:
    - Storytelling page with team profiles and mission statement.

## Authenticated Application Architecture
**Note:** All phases below require user authentication (Protected Routes).
