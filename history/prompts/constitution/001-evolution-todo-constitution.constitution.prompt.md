---
id: 001
title: Evolution of Todo Constitution Ratification
stage: constitution
date: 2025-12-28
surface: agent
model: claude-sonnet-4-5
feature: none
branch: main
user: Dell
command: /sp.constitution
labels: ["constitution", "three-phase", "todo-app", "initial-ratification"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:
 - None
---

## Prompt

```text
 "The Evolution of Todo"  Phase I: In-Memory Python Console App Project Constitution:

Build a CLI todo app storing tasks in memory (lost on restart).

Implement exactly 5 features: Add task (title+description), View all tasks with status, Update task by ID, Delete task by ID, Mark complete/incomplete.

Use UV for dependency management, Python 3.13+.

Follow clean code: /src structure, proper OOP, input validation, user-friendly console UI.

Repo structure: Constitution file, /specs-history (all spec iterations), /src (code), README.md (UV setup: uv init, uv add, uv run), CLAUDE.md (your instructions).

Workflow Enforcement:

First, create initial spec in /specs-history/phase1-initial.spec.md detailing features, user stories, edge cases.

Generate detailed plan: tasks breakdown, dependencies.

Delegate to Claude Code: "Implement @specs-history/phase1-initial.spec.md following CLAUDE.md".

Iterate: Review output, update spec if needed, re-implement.

Test all 5 features in console demo.

Success Criteria: Working console app demoing all 5 features. Push to GitHub repo provided by user. Phase II: Todo Full-Stack Web App, evolving Phase I console app into multi-user web app with persistence. Use Agentic Dev Stack: spec → plan → tasks → Claude Code implementation. Monorepo structure mandatory.

Project Constitution:

Transform to full-stack: Next.js 16+ frontend (App Router, Tailwind, TypeScript), FastAPI backend, Neon Postgres DB, Better Auth (JWT for cross-service auth).

Reuse 5 core features as REST API: GET/POST/PUT/DELETE/PATCH /api/{user_id}/tasks/* with user isolation via JWT.

Auth flow: Frontend Better Auth issues JWT → Backend verifies shared secret → Filter by user_id.

Monorepo: /.spec-kit/config.yaml, /specs (overview.md, features/task-crud.md, api/rest-endpoints.md, database/schema.md, ui/), root/frontend/backend CLAUDE.md files as specified.

DB: users (Better Auth), tasks (user_id FK, title, desc, completed, timestamps).

Secure all endpoints: 401 without JWT, user-only data.

Workflow Enforcement:

Extend Phase 1 repo: Add monorepo structure per guide.

Write layered specs: @specs/features/task-crud.md (user stories), @specs/api/rest-endpoints.md (endpoints), @specs/database/schema.md (schema).

Plan: Backend first (FastAPI+SQLModel), then Frontend (Next.js API client in /lib/api.ts), integrate auth.

Delegate: "Implement @specs/features/task-crud.md per backend/frontend CLAUDE.md".

Environment: BETTER_AUTH_SECRET shared, DATABASE_URL for Neon.

Success Criteria: Deployable monorepo with authenticated multi-user CRUD, docker-compose for local dev.

Phase 3 Constitution Prompt
You are the lead AI architect for Phase III: Todo AI Chatbot, adding natural language interface atop Phase II via MCP server. Agentic Dev Stack only: spec → plan → tasks → Claude Code. Stateless architecture essential.

Project Constitution:

Frontend: OpenAI ChatKit UI (configure domain allowlist, NEXT_PUBLIC_OPENAI_DOMAIN_KEY).

Backend: FastAPI + OpenAI Agents SDK (agent invokes MCP tools), Official MCP SDK server exposing 5 tools (add_task, list_tasks(status), complete_task, delete_task, update_task).

DB extensions: conversations (user_id, id), messages (conversation_id, role, content).

Stateless chat: POST /api/{user_id}/chat → Fetch history → Agent runs → Invoke MCP tools → Store response → Return.

Agent smarts: Parse NL ("add task buy groceries" → add_task), chain tools (list then delete), confirm actions, handle errors.

Reuse Phase II auth/DB/API, expose as MCP tools with user_id param.

Workflow Enforcement:

Extend Phase II monorepo: Add /specs/features/chatbot.md, /specs/api/chat-endpoint.md, /specs/mcp-tools.md.

Spec MCP tools exactly: params/returns/examples as listed.

Plan: MCP server → Agents SDK integration → Chat endpoint → ChatKit frontend.

Delegate: "Implement @specs/mcp-tools.md as stateless MCP server", then "Build agent @specs/features/chatbot.md".

Test NL commands, conversation resumption post-restart.

Success Criteria: Working chatbot managing tasks via speech, scalable stateless server, full specs history.
```

## Response snapshot

Created the initial project constitution (v1.0.0) for "The Evolution of Todo" three-phase project.

**Constitution Structure:**
- **7 Core Principles**: Phased Evolution Architecture, SDD Mandatory, Five Core Features (Immutable), Clean Architecture & Code Quality, Multi-User Isolation & Security, Monorepo Structure, Stateless & Scalable
- **Technology Stack**: Defined for all three phases (Phase I: Python+UV, Phase II: Next.js+FastAPI+Neon, Phase III: OpenAI Agents+MCP)
- **Development Workflow**: Spec → Plan → Tasks → Implementation → Testing → Iteration
- **Governance**: Amendment process, versioning policy, compliance review, PHR/ADR requirements

**Key Constitutional Mandates:**
1. Exactly 5 features (Add, View, Update, Delete, Mark complete/incomplete) - immutable across all phases
2. Spec-Driven Development (SDD) - no code without approved spec
3. Security-first from Phase II (Better Auth JWT, user isolation, no secrets in code)
4. Monorepo structure for Phase II/III
5. Stateless architecture for Phase III AI chatbot

**Template Consistency:**
- ✅ plan-template.md: Constitution Check section aligns
- ✅ spec-template.md: User story prioritization aligns
- ✅ tasks-template.md: Task organization aligns

File written to: `.specify/memory/constitution.md`

## Outcome

- ✅ Impact: Initial constitution ratified (v1.0.0) defining three-phase todo app evolution with 7 core principles, technology stack constraints, and governance rules
- 🧪 Tests: None (documentation update)
- 📁 Files: 1 file created (.specify/memory/constitution.md)
- 🔁 Next prompts: Create Phase I initial spec (/sp.specify), Generate Phase I plan (/sp.plan), or review constitution for amendments
- 🧠 Reflection: Constitution successfully captures three-phase architecture, enforces SDD workflow, and establishes immutable 5-feature constraint to prevent scope creep

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): Manual review - PASS (all placeholders filled, no unresolved tokens, semantic versioning correct)
- Prompt variant (if applicable): N/A (initial ratification)
- Next experiment (smallest change to try): Monitor constitution compliance during Phase I implementation; assess if any principles need PATCH refinements based on real-world usage
