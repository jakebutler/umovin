Here’s a 4-week sprint plan based on the Umovin PRD, optimized for an MVP release with a small product/dev team (2–5 people). The plan assumes 2-week sprints and targets the MVP feature set outlined in the PRD.

⸻

🏃‍♂️ Sprint Plan – Umovin MVP

Sprint	Dates	Focus	Key Deliverables




⸻

📦 Sprint 0 (Prep & Planning)

Dates: Apr 22 – Apr 26, 2025
Focus: Design, planning, tooling setup

Deliverables:
	•	Finalize UX flow (survey → plan → calendar)
	•	Wireframes for:
	•	Intake survey
	•	Workout plan viewer
	•	Calendar link interface
	•	Define JSON schemas for:
	•	Intake input
	•	LLM plan output
	•	Select and configure:
	•	LLM provider (OpenAI, Claude, or hosted)
	•	Backend stack (e.g. FastAPI + PostgreSQL)
	•	Create shared Notion/Linear board for issue tracking
	•	Dev environment setup: repo, CI/CD, env vars

⸻

🚀 Sprint 1: Core Intake & Program Generation

Dates: Apr 29 – May 10, 2025
Focus: Intake form, LLM integration, backend structure

Deliverables:
	•	Intake form UI (React)
	•	Data model for user inputs (backend)
	•	Intake submission API
	•	LLM prompt engine
	•	First working LLM-generated JSON plan (via API)
	•	Validation layer for output
	•	Unit tests for intake and plan generation

Stretch Goals:
	•	Error handling + fallback template if LLM fails
	•	Caching logic for common inputs

⸻

🧩 Sprint 2: Workout Plan Display & Calendar Links

Dates: May 13 – May 24, 2025
Focus: Workout UI and public Google Calendar integration

Deliverables:
	•	Frontend plan viewer with week-by-week sessions
	•	Backend logic to generate Google Calendar event URLs
	•	“Add to Google Calendar” buttons per session
	•	Utility to convert time zone-aware timestamps → RFC3339
	•	Styling + responsive layout for workout cards

Stretch Goals:
	•	Frontend session filtering (by focus or difficulty)
	•	Weekly view toggle or export button

⸻

🧪 Sprint 3: QA, Dashboard, Regeneration Flow

Dates: May 27 – June 7, 2025
Focus: Final polish + light dashboard

Deliverables:
	•	Basic user dashboard (view current plan, regenerate plan)
	•	“Regenerate” button (w/ warning and overwrite)
	•	Test coverage across endpoints and flows
	•	Error pages and loading states
	•	Browser testing (Chrome, Firefox, Safari, mobile)

Stretch Goals:
	•	Feedback capture (emoji or 1–5 rating after workout)
	•	Save calendar export status in DB

⸻

🧼 Sprint 4: Polish & Beta Launch

Dates: June 10 – June 21, 2025
Focus: Deployment, stability, content

Deliverables:
	•	Production deployment to Vercel or Render
	•	Plan examples for marketing/demo
	•	Landing page + FAQ + “How It Works”
	•	Beta sign-up list and invite flow
	•	Internal usage analytics (event clicks, LLM usage)
	•	Final bug fixes and testing

⸻

🧠 Roles (example breakdown)

Role	Example Tasks
Product	Define flows, approve copy, prioritize bug fixes
Frontend Dev	Build UI for survey, plan viewer, calendar links
Backend Dev	Intake APIs, LLM logic, calendar URL generation
QA / Tester	Edge case testing, mobile, broken sessions
Designer	Wireframes, icons, illustrations for sessions



⸻

Let me know if you’d like this exported as a Linear board, Jira backlog, or shared Google Sheet — or if you want a version for a mobile-first MVP instead.
