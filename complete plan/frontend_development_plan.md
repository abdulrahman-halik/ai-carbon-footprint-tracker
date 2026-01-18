# Frontend Development Plan: AI-Powered Environmental Impact Tracker

**Project:** AI-Powered Personalized Environmental Impact Tracker
**Tech Stack:** Next.js 16 (App Router), Tailwind CSS 4, JavaScript (JSX)
**Architecture:** Feature-Based Architecture
**Objective:** Build a responsive, cognitive-science-driven user interface that promotes sustainable behavior change.

---

## Design Theme & Visuals
**Reference**: Based on the provided UI design.

![Design Reference](/home/abdul/.gemini/antigravity/brain/5021767d-34a3-4233-9de9-458511ddf0ec/uploaded_image_1768414597909.png)

### Color Palette
- **Primary Brand**:
    - `Primary Green`: `#22C55E` (Tailwind `green-500` approx) - For main actions, progress, and branding.
    - `Light Green Accent`: `#D1FAE5` or `#ECFDF5` (Tailwind `green-100/50`) - For backgrounds on active items/icons.
- **Backgrounds**:
    - `Main Background`: `#F9FAFB` or `#F3F4F6` (Tailwind `gray-50/100`) - Soft off-white canvas.
    - `Card Surface`: `#FFFFFF` (White) - For content containers.
- **Typography & Text**:
    - `Headings`: `#111827` (Tailwind `gray-900`) - High contrast dark gray/black.
    - `Body`: `#4B5563` (Tailwind `gray-600`) - Readable medium gray.
    - `Subtext`: `#9CA3AF` (Tailwind `gray-400`) - For secondary info.

### Visual Language
- **Corner Radius**: Large rounded corners (`rounded-2xl` / `20px`) for a friendly, modern feel.
- **Spacing**: Generous whitespace (`p-6` or `p-8` in cards).
- **Shadows**: Soft, diffused shadows (`shadow-sm` or `shadow-md`) to lift cards off the background.
- **Icons**: Simple, outlined icons (likely Lucide or Heroicons) with distinct background circles.

---

## Development Standards
**Error Handling**:
- **Standard Practice**: Use `try { } catch { }` blocks with `async/await` for significant asynchronous operations. This ensures that errors are handled safely and the program does not crash, maintaining a robust user experience.

## Phase 1: Project Initialization
**Goal:** Initialize the Next.js application and establish the basic runtime environment.

- [ ] **Initialize Next.js Project**:
    - Run `npx create-next-app@latest` with Next.js 16.
    - Select **JavaScript** (Not TypeScript), **ESLint**, and **App Router**.
    - Verify the development server runs correctly (`npm run dev`).
- [ ] **Git Initialization**:
    - Initialize git repository.
    - Create initial commit.

## Phase 2: Architecture Configuration & Tooling
**Goal:** Configure the folder structure and install necessary styling libraries.

- [ ] **Feature-Based Folder Structure**:
    - Create `/src/features` (for self-contained features like `auth`, `dashboard`).
    - Create `/src/components` (for shared global components).
    - Create `/src/lib` (for utilities) and `/src/hooks` (global hooks).
    - Configure `jsconfig.json` for absolute imports (`@/*`).
- [ ] **Tailwind CSS 4 Setup**:
    - Install Tailwind CSS 4.
    - Verify Tailwind integration by testing a simple utility class.
- [ ] **Form Validation**:
    - Install **Zod** for schema validation.

## Phase 3: Design System Foundation
**Goal:** Define the visual language including colors, typography, and global variables.

- [ ] **Global CSS Variables**:
    - Configure `globals.css` (or `index.css`) with CSS variables for the eco-theme.
    - Define variables for: Forest Green, Earth Brown, Alert Red, and surface colors.
- [ ] **Icon System Integration**:
    - Install **Lucide React** or **Heroicons**.
    - Create a wrapper component for consistent icon sizing/coloring.

## Phase 4: Shared Component Library
**Goal:** Build the reusable "dumb" components that will be used across features.

- [ ] **Atomic UI Components (`src/components/ui`)**:
    - Build `Button.jsx` (with variants: primary, secondary, ghost).
    - Build `Input.jsx` and `Label.jsx`.
    - Build `Card.jsx` (container with premium styling).
    - Build `Modal.jsx` and `Badge.jsx`.
- [ ] **Styling Utilities**:
    - Implement reusable classes for Glassmorphism effects.

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

## Phase 5: Authentication & Onboarding
**Goal:** Implement secure user access screens processes.

- [ ] **Feature Structure (`features/auth`)**:
    - `LoginForm.jsx`, `RegisterForm.jsx`, `authService.js`.
- [ ] **Logic & State**:
    - Implement `useAuth` hook (using **React Context**) for managing user session modules.
- [ ] **Routes**:
    - Create `/app/(auth)/login/page.jsx`.
    - Create `/app/(auth)/register/page.jsx`.

## Phase 6: User Onboarding Wizard Structure
**Goal:** Create the multi-step container for the initial user assessment.

- [ ] **Feature Structure (`features/onboarding`)**:
    - `WizardLayout.jsx` (Progress bar, step navigation).
    - `OnboardingProvider.jsx` (Context for wizard state).
- [ ] **Navigation Logic**:
    - Implement "Next" and "Back" step transitions.
    - Handle state preservation between steps.

## Phase 7: Profiling Data Modules
**Goal:** Implement the specific assessment forms for data collection.

- [ ] **Components (`features/onboarding`)**:
    - `PersonalityStep.jsx` (HEXACO assessment interactions).
    - `BehaviorStageStep.jsx` (TTM stage selection cards).
- [ ] **Interactive Elements**:
    - specialized sliders and selection cards.

## Phase 8: Authenticated Main Layout & Navigation
**Goal:** Build the application shell that houses the dashboard for logged-in users.

- [ ] **Feature Structure (`features/layout`)**:
    - `Header.jsx` (Main Navbar, User profile, notifications, manual dark mode toggle).
    - `Footer.jsx` (Copyright, secondary links, and branding).
    - `Sidebar.jsx` (Desktop side navigation).
    - `BottomNav.jsx` (Mobile navigation).
- [ ] **Responsive Shell**:
    - Implement the `DashboardShell.jsx` layout wrapper.

## Phase 9: Emissions Visualization Engine
**Goal:** Visualizing carbon data (Principle 1 & 3).

- [ ] **Feature Structure (`features/emissions`)**:
    - `EmissionSparkline.jsx`, `ImpactVisualizer.jsx`.
- [ ] **Charts Integration**:
    - Setup **Chart.js**.
    - Implement clean, responsive charts for emissions data.

## Phase 10: Behavioral Context Visualization
**Goal:** Provide comparisons and goal tracking (Principles 2 & 5).

- [ ] **Feature Structure (`features/behavior`)**:
    - `GoalThermometer.jsx`, `NeighborhoodComparison.jsx`.
- [ ] **Visual Components**:
    - Animated progress bars for goals.
    - Comparison visuals (User vs Average).

## Phase 11: Social Engagement System
**Goal:** Leverage social proof (Principle 4).

- [ ] **Feature Structure (`features/social`)**:
    - `Leaderboard.jsx`, `PeerComparison.jsx`.
- [ ] **UI Elements**:
    - Ranked list components.
    - Detail views for peer stats.

## Phase 12: Activity Logging System
**Goal:** Frictionless data input interface.

- [ ] **Feature Structure (`features/tracking`)**:
    - `ActivityLogWizard.jsx`, `TransportInput.jsx`, `DietInput.jsx`.
- [ ] **UX Optimization**:
    - Icon-based selectors.
    - Immediate visual feedback on input.

## Phase 13: AI Recommendations Interface
**Goal:** Display personalized insights.

- [ ] **Feature Structure (`features/recommendations`)**:
    - `NudgeFeed.jsx`, `NudgeCard.jsx`.
- [ ] **Interaction**:
    - Dismiss/Accept handlers for recommendation cards.

## Phase 14: Interactive Simulation Tools
**Goal:** Enable "What-If" scenarios (Principle 6).

- [ ] **Feature Structure (`features/simulation`)**:
    - `SimulatorTool.jsx`, `ScenarioSlider.jsx`.
- [ ] **Dynamic Logic**:
    - Sliders that trigger client-side recalculations of charts.

## Phase 15: Final Optimization & Deployment
**Goal:** Performance tuning, accessibility, and production build.

- [ ] **Performance**:
    - Lazy loading (`React.lazy`) for heavy components.
- [ ] **Accessibility**:
    - Final ARIA audit and keyboard navigation check.
- [ ] **Production**:
    - Final `npm run build` and smoke test.
