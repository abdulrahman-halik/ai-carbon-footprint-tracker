# Phase 8: Authenticated Main Layout & Navigation

**Goal:** Build the secure application shell that houses the dashboard for logged-in users, ensuring a responsive and consistent experience.

## Key Features

### 1. Feature Structure (`features/layout`)

- **`DashboardShell.jsx`** (Layout Wrapper):
    -   Acts as the main container for all authenticated pages.
    -   **Responsive Strategy**:
        -   **Desktop**: Renders `Sidebar` on the left (fixed) and `Header` at the top.
        -   **Mobile**: Renders `Header` at the top and `BottomNav` fixed at the bottom.
        -   **Content Area**: Scrollable area with proper padding (`p-4` or `p-6`) and `max-w-7xl` constraint.

- **`Header.jsx`** (Top Navbar):
    -   **Branding**: Logo on mobile (hidden on desktop if sidebar is present).
    -   **Global Actions**:
        -   **Dark Mode Toggle**: Manual switch (Sun/Moon icons) to override system preference.
        -   **Notifications**: Bell icon with a badge for unread alerts.
        -   **User Menu**: Avatar dropdown with "Profile", "Settings", and "Sign Out" options.

- **`Sidebar.jsx`** (Desktop Navigation):
    -   **Collapsible**: (Optional) Allow expanding/collapsing for more screen real estate.
    -   **Navigation Items**:
        -   Dashboard (Home)
        -   Emissions (Charts)
        -   Actions (Logging)
        -   Social (Leaderboard)
        -   Simulate (What-If)
    -   **Active State**: Visual highlight (bg-green-50 text-green-700) for current route.

- **`BottomNav.jsx`** (Mobile Navigation):
    -   **Fixed Position**: Sticky at the bottom of the viewport.
    -   **Items**: Limited to top primary actions (Dashboard, Log, Profile, offset by specific icons).
    -   **Design**: Clean, touch-friendly touch targets (44px+).

- **`Footer.jsx`**:
    -   Standard copyright and secondary links (Terms, Privacy), visible at the bottom of the content area.

### 2. State & Logic

-   **Active Route Detection**:
    -   Use `usePathname()` from `next/navigation` to highlight the active link in Sidebar/BottomNav.
-   **Layout State**:
    -   Manage sidebar open/close state (if collapsible) using local state or context.

### 3. Styling & Theme

-   **Backgrounds**: Use `bg-gray-50` (or dark mode equivalent) for the main canvas.
-   **Consistency**: Ensure navigation elements match the "Eco-Theme" (Primary Green highlights).
