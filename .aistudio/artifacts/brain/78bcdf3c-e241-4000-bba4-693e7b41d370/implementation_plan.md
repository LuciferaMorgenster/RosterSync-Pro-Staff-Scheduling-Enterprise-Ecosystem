# RosterSync Pro – Staff Scheduling & Enterprise Ecosystem Hub

A high-performance, bilingual (English & Dutch) staff scheduling and roster management application featuring an interactive weekly drag-and-drop shift planner, multi-department team management, and a unified integration data bridge with **TalentPulse-HRIS**, **Kopilot-Projects**, and **BoekhoudGemak**. The application includes complete search engine optimization (SEO), social media sharing cards (OpenGraph/Twitter), a dedicated generated cover image, a bilingual README.md, and direct developer sponsor/support integration.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural decisions were aligned via interactive clarification and are locked into the plan:

- **Confirmed Decision 1 – Scheduler Interface**: Interactive weekly shift grid with drag-and-drop shift assignment, department filtering, shift creation/editing modals, conflict detection, and weekly hours calculation.
- **Confirmed Decision 2 – Connected Apps Ecosystem**: Unified data bridge syncing employee directory and contract roles from **TalentPulse-HRIS**, project assignments and milestone task shifts from **Kopilot-Projects**, and direct timesheet/payroll cost calculation exports to **BoekhoudGemak**.
- **Confirmed Decision 3 – Multilingual Support**: English as the default primary language, with first-class Dutch (*Nederlands*) toggleable instantaneously with complete translation coverage across UI labels, shift terms, export summaries, and documentation.
- **Confirmed Decision 4 – SEO, Cover Image & OpenGraph**: Production-ready OpenGraph tags for LinkedIn and Facebook, Twitter card metadata, Schema.org WebApplication structured data, canonical dynamic URLs, and a high-resolution generated cover image embedded in both social previews and the bilingual `README.md`.
- **Confirmed Decision 5 – PayPal Sponsorship & GitHub Publishing**: In-app Support/Sponsor modal and header link directing to `luciferamorgenster@gmail.com` via PayPal, plus a GitHub publish assistant modal with complete Git commit/remote instructions for repository deployment.

---

## 1. Overview & Core Concept

- **What It Does**: RosterSync Pro streamlines staff scheduling for shift-based businesses, retail, healthcare, and project-based teams. Managers can schedule weekly shifts across departments, resolve scheduling conflicts, adjust employee working hours, and harmonize staff records across HR, Project Management, and Accounting apps.
- **Target Audience / Persona**: Shift managers, HR administrators, project leads, and operations directors who require an intuitive weekly roster planner that syncs effortlessly with existing business software.
- **Key Value**: Eliminates double entry and scheduling chaos by bridging employee records (TalentPulse-HRIS), billable project allocations (Kopilot-Projects), and wage calculations (BoekhoudGemak) inside a single, responsive workspace.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Weekly Shift Scheduling & Drag-and-Drop**:
   - The user opens the interactive weekly roster grid (Monday to Sunday) segmented by department (e.g., Engineering & Dev, Operations, Customer Care, Logistics).
   - The user drags shift cards between team members or days, or clicks any slot to launch the **Shift Editor Modal** (adjust start/end time, role, project assignment, lunch break, and notes).
   - Real-time badges indicate weekly allocated hours versus contracted hours (e.g., 36h / 40h) with instant overtime and conflict detection (double booking, minimum rest violation).

2. **Connected Ecosystem Bridge (TalentPulse, Kopilot, BoekhoudGemak)**:
   - **TalentPulse-HRIS Hub**: View imported employee profiles, departments, contract hours, sick leave, and vacation status; trigger instant resync or add employees.
   - **Kopilot-Projects Link**: Assign specific shifts to project milestones, client deliverables, and billable budget codes; view project-allocated labor hours.
   - **BoekhoudGemak Payroll & Cost Export**: Calculate weekly gross wages based on hourly rates and overtime premiums; download one-click SEPA/payroll JSON/CSV and trigger direct accounting bridge sync.

3. **Language Switcher (EN / NL)**:
   - A single-click toggle in the header switches all text seamlessly between **English** and **Nederlands** (preserving active selections and data state).

4. **SEO, Cover Image & Social Share Inspector**:
   - Dedicated interactive SEO & Social Preview inspector where users can preview how the app displays on **LinkedIn**, **Facebook**, and **Twitter/X** with the generated cover image, meta tags, and OpenGraph parameters.

5. **Sponsor & GitHub Publication**:
   - **Support / Sponsor**: Header and footer button opening a clean sponsor card with direct PayPal checkout link to `luciferamorgenster@gmail.com`.
   - **GitHub Publish Assistant**: Integrated modal providing exact terminal commands, git remote setup, and bilingual `README.md` download to push directly to GitHub for `luciferamorgenster@gmail.com`.

### Visual Identity & Theme

- **Aesthetic Direction**: Contemporary enterprise SaaS dashboard inspired by Linear and Stripe — dense, clean, high scannability, no unnecessary visual fluff or fake AI gadgets.
- **Color Palette**:
  - Dominant Canvas (60%): Crisp clean white (`#FFFFFF`) / ultra-subtle off-white background (`#F8FAFC`), paired with dark mode slate (`#0B0F17` / `#111827`).
  - Structural Surfaces (30%): Hairline borders (`#E2E8F0` / `#1F2937`), soft muted panels (`#F1F5F9` / `#1E293B`), refined neutral text hierarchy.
  - Accent Budget (10%): Rich Cobalt Indigo (`#2563EB` / `#3B82F6`) for primary CTAs and active states; emerald (`#059669`) for balanced shifts and payroll approvals; amber (`#D97706`) for overtime warnings.
- **Typography & Hierarchy**:
  - Display & Headings: `Plus Jakarta Sans` for strong structural headers and brand wordmark.
  - Body & UI: `DM Sans` / `Manrope` for crystal-clear readability at 12px–14px.
  - Tabular & Time Data: Tabular figures (`tabular-nums font-mono`) for shift hours, timestamps, employee counts, and payroll wage totals.
- **Anti-Slop Discipline**:
  - No decorative floating cards or meaningless status pulses.
  - Clean unboxed metadata with subtle typographic bullets (`·`).
  - Single-line controls with strict `whitespace-nowrap shrink-0` styling.
  - Top bar follows strict 3-zone contract: Brand wordmark — Navigation links — Primary action.

---

## 3. Key Product Decisions & Trade-Offs

### Decision 1: Hybrid State with LocalStorage Persistence & Unified Bridge Sync
- **Chosen Approach**: Store roster data, employee records, connected app states, and language preferences in browser `localStorage` with reactive state updates and pre-seeded realistic enterprise data.
- **Why**: Allows instant offline operation, zero lag, persistent changes across page refreshes, and full interactivity without requiring external database setup credentials.
- **Alternatives Considered**: In-memory only state (lost on reload) or external server database (unnecessary friction for client-side scheduling).

### Decision 2: Connected Ecosystem Bridge Architecture
- **Chosen Approach**: Build a comprehensive, fully interactive Unified Data Bridge with 3 dedicated integration panels (TalentPulse-HRIS, Kopilot-Projects, BoekhoudGemak). Each panel features live sync actions, record inspectors, sync history logs, payload previews, and bidirectional data propagation into the roster.
- **Why**: Directly satisfies the user's explicit requirement for a working connection between the three apps in their app list.
- **Alternatives Considered**: Static mock logos or simple external links (fails functional depth requirement).

### Decision 3: Bilingual i18n Dictionary Engine
- **Chosen Approach**: A strongly-typed client-side internationalization dictionary with English (`en`) as default and Dutch (`nl`) as secondary language, covering navigation, roster terms, shift dialogs, integration labels, and export reports.
- **Why**: Clean, lightning-fast instant switching without page reload or external API translation latency.

### Decision 4: Cover Image & Social SEO Asset Strategy
- **Chosen Approach**: Generate a custom, high-fidelity 16:9 banner image via `generate_image` tool depicting a modern SaaS staff schedule interface and team workflow; save it to `/src/assets/images/`, reference it in `index.html` OpenGraph & Twitter tags, display it in the social inspector, and embed it in `README.md`.
- **Why**: Ensures high aesthetic polish and guarantees valid social preview cards on LinkedIn and Facebook.

---

## 4. Technical Architecture & Data Strategy

### Architecture & Component Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                          RosterSync Pro                                │
├────────────────────────────────────────────────────────────────────────┤
│  [TopBar] Brand · Nav Tabs (Roster, Apps, SEO, Export) · Lang · Sponsor│
├────────────────────────────────┬───────────────────────────────────────┤
│          Left Control          │             Main Content              │
├────────────────────────────────┼───────────────────────────────────────┤
│ • Week Navigator (< Week >)    │  [View: Weekly Roster Grid]           │
│ • Department Filter Tabs       │  - Staff rows with contracted hours   │
│ • Shift Statistics & Overtime  │  - Monday–Sunday interactive drop cells│
│ • Add Shift Quick Action       │  - Shift badges with project/app tags │
│                                │                                       │
│ • Ecosystem Status Bridge      │  [View: Connected Apps Bridge]        │
│   ├─ TalentPulse-HRIS (Live)   │  - TalentPulse Employee Sync          │
│   ├─ Kopilot-Projects (Live)   │  - Kopilot Project & Task Link        │
│   └─ BoekhoudGemak (Live)      │  - BoekhoudGemak Payroll & Hours Calc │
│                                │                                       │
│ • Sponsor / Support CTA        │  [View: SEO & Social Preview]         │
│   (PayPal luciferamorgenster)  │  - OpenGraph Meta Tags & Card Preview │
│                                │  - LinkedIn / Facebook Card Mockup    │
│                                │                                       │
│                                │  [View: GitHub Publish Assistant]     │
│                                │  - Git push CLI instructions          │
│                                │  - Bilingual README.md generator      │
└────────────────────────────────┴───────────────────────────────────────┘
```

### Data Model & State Entities

- **Employee**: `id`, `name`, `avatar`, `role`, `department`, `contractHours`, `hourlyRate`, `talentPulseId`, `status`.
- **Shift**: `id`, `employeeId`, `date`, `startTime`, `endTime`, `breakMinutes`, `department`, `projectId`, `kopilotTaskId`, `color`, `notes`, `status` (scheduled, completed, absent).
- **ConnectedApp**:
  - `TalentPulse-HRIS`: Employee sync timestamp, status, active sync rule, employee headcount.
  - `Kopilot-Projects`: Project list (`Alpha Redesign`, `Ops Expansion`, etc.), assigned shifts, billable hours.
  - `BoekhoudGemak`: Total scheduled hours, overtime hours, gross payroll estimate, export batch status.
- **SEO & Social Metadata**:
  - Title, description, OpenGraph tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`), Twitter card tags, Schema.org `WebApplication` JSON-LD.

### Interactive State Transitions

- **Drag / Move Shift**: Mutates shift date and employee allocation with automatic recalculation of daily and weekly employee hour counters.
- **Create / Edit Shift Modal**: Validates start time < end time, checks for overlap conflicts, allows assignment of Kopilot project tag.
- **Sync Apps**: Triggers animated sync state, updates bridge status indicators, generates sync event log entries, and refreshes staff/payroll numbers.
- **Export Payroll**: Generates instant CSV/JSON report for BoekhoudGemak and displays summary dialog.
- **Language Switch**: Flips reactive i18n context between English and Dutch instantly.
