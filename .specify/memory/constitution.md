# The Evolution of Todo - Project Constitution

<!--
Sync Impact Report:
Version: 1.0.0 → Initial ratification
Modified principles: N/A (initial creation)
Added sections:
  - Core Principles (7 principles)
  - Technology Stack
  - Development Workflow
  - Governance
Removed sections: N/A
Templates requiring updates:
  ✅ plan-template.md - Constitution Check section aligns with principles
  ✅ spec-template.md - User story prioritization aligns with phased approach
  ✅ tasks-template.md - Task organization aligns with incremental delivery
Follow-up TODOs: None
-->

## Core Principles

### I. Phased Evolution Architecture

This project follows a three-phase evolutionary approach:
- **Phase I**: In-memory Python console CLI (5 core features: Add, View, Update, Delete, Mark complete/incomplete)
- **Phase II**: Full-stack web application with persistence (Next.js 16+, FastAPI, Neon Postgres, Better Auth)
- **Phase III**: AI chatbot interface via MCP server (OpenAI Agents SDK, stateless architecture)

**Rationale**: Each phase builds upon the previous, ensuring working software at every milestone while incrementally adding complexity. Code from earlier phases is reused and extended, not rewritten.

### II. Spec-Driven Development (SDD) Mandatory

Every feature starts with a detailed specification before any implementation:
- Specifications MUST be created in `/specs-history/` (Phase I) or `/specs/` (Phase II/III)
- Workflow: Spec → Plan → Tasks → Implementation
- All specs MUST include user stories, edge cases, and acceptance criteria
- No code without an approved spec

**Rationale**: SDD ensures clear requirements, reduces rework, and provides documentation traceability. The spec acts as a contract between architect and implementer.

### III. Five Core Features (Immutable)

Exactly 5 todo features MUST be implemented across all phases:
1. **Add task** (title + description)
2. **View all tasks** (with status)
3. **Update task** (by ID)
4. **Delete task** (by ID)
5. **Mark complete/incomplete** (toggle status)

**Rationale**: These 5 features define the minimum viable product. No additional features may be added without constitutional amendment. This constraint prevents scope creep and maintains focus.

### IV. Clean Architecture & Code Quality

Code MUST follow these standards:
- **Structure**: `/src` for source code, proper directory organization per phase
- **OOP Principles**: Proper separation of concerns, single responsibility
- **Input Validation**: All user inputs validated before processing
- **User Experience**: Console UI (Phase I), Web UI (Phase II/III) must be intuitive and error-friendly
- **No Hardcoded Values**: Configuration via environment variables (`.env`)

**Rationale**: Clean architecture ensures maintainability as the project evolves through three phases. Code written in Phase I should inform Phase II design.

### V. Multi-User Isolation & Security

From Phase II onwards, MUST enforce:
- **Authentication**: Better Auth with JWT tokens for cross-service communication
- **Authorization**: All API endpoints MUST verify JWT; reject with 401 if invalid
- **User Isolation**: Users MUST only access their own tasks (filtered by `user_id`)
- **Database Security**: Foreign key constraints (`tasks.user_id` → `users.id`)
- **Secret Management**: Never commit secrets; use `.env` for `BETTER_AUTH_SECRET`, `DATABASE_URL`, etc.

**Rationale**: Multi-user support requires strict security from the start. Retrofitting security is error-prone; building it into Phase II architecture prevents vulnerabilities.

### VI. Monorepo Structure (Phase II/III)

Phase II and III MUST use monorepo structure:
```
/.spec-kit/config.yaml
/specs/
  ├── overview.md
  ├── features/task-crud.md
  ├── api/rest-endpoints.md
  ├── database/schema.md
  └── ui/
/frontend/
  ├── src/
  ├── CLAUDE.md
  └── ...
/backend/
  ├── src/
  ├── CLAUDE.md
  └── ...
```

**Rationale**: Monorepo keeps all code, specs, and configuration in one repository, simplifying dependency management and ensuring consistent versioning across frontend/backend.

### VII. Stateless & Scalable (Phase III)

Phase III chatbot MUST be stateless:
- **No in-memory state**: Conversation history stored in database (`conversations`, `messages` tables)
- **Request flow**: POST `/api/{user_id}/chat` → Fetch history from DB → Agent processes → Store response → Return
- **MCP Tools**: Expose 5 core features as stateless tools with `user_id` parameter
- **Resumability**: Conversations MUST resume correctly after server restart

**Rationale**: Stateless architecture enables horizontal scaling and prevents data loss on restart. Essential for production-grade AI services.

## Technology Stack

### Phase I: Console CLI
- **Language**: Python 3.13+
- **Package Manager**: UV (`uv init`, `uv add`, `uv run`)
- **Storage**: In-memory (data lost on restart)
- **Structure**: `/src` with OOP design

### Phase II: Full-Stack Web
- **Frontend**: Next.js 16+ (App Router, Tailwind CSS, TypeScript)
- **Backend**: FastAPI (Python 3.13+)
- **Database**: Neon Postgres (managed PostgreSQL)
- **ORM**: SQLModel (for FastAPI)
- **Authentication**: Better Auth (JWT-based)
- **Deployment**: Docker Compose for local development

### Phase III: AI Chatbot
- **Frontend**: OpenAI ChatKit UI (domain allowlist configuration)
- **Backend**: FastAPI + OpenAI Agents SDK
- **MCP Server**: Official MCP SDK (Python)
- **AI Features**: Natural language task management, tool chaining, error handling
- **Database Extensions**: `conversations`, `messages` tables

**Constraints**:
- No technology substitutions without constitutional amendment
- All dependencies MUST be declared in `pyproject.toml` (Python) or `package.json` (Next.js)

## Development Workflow

### Workflow Enforcement (All Phases)

1. **Specification Phase**:
   - Create detailed spec: user stories, edge cases, acceptance criteria
   - Store in `/specs-history/` (Phase I) or `/specs/` (Phase II/III)
   - Get user/architect approval before proceeding

2. **Planning Phase**:
   - Generate implementation plan: task breakdown, dependencies, file structure
   - Document architecture decisions (consider ADRs for significant choices)
   - Identify potential risks and mitigation strategies

3. **Implementation Phase**:
   - Delegate to Claude Code: "Implement @specs/.../spec.md following CLAUDE.md"
   - Follow spec exactly; no deviation without updating spec first
   - Commit frequently with clear messages

4. **Testing Phase**:
   - Phase I: Console demo of all 5 features
   - Phase II: Automated tests for API endpoints, manual frontend testing
   - Phase III: Test NL commands, conversation resumption, MCP tool invocation

5. **Iteration Phase**:
   - Review implementation against spec
   - If issues found: update spec, re-plan, re-implement
   - Never patch without updating the spec

### Commit Standards

- **Message Format**: `<type>: <description>` (e.g., `feat: add task creation endpoint`)
- **Types**: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`
- **Frequency**: Commit after each logical unit of work (per task or sub-task)

### Repository Structure

- **Phase I**: Single repository with `constitution.md`, `/specs-history`, `/src`, `README.md`, `CLAUDE.md`
- **Phase II/III**: Extend Phase I repo to monorepo structure
- **Specs History**: ALL spec iterations stored in `/specs-history` (Phase I) or `/specs` (Phase II/III) for traceability

## Governance

### Constitutional Authority

This constitution supersedes all other practices, conventions, or assumptions. When in doubt, refer to this document.

### Amendment Process

1. **Proposal**: Document proposed change with rationale and impact analysis
2. **Review**: Evaluate against project goals and existing phases
3. **Approval**: Requires explicit user consent
4. **Migration**: Update all dependent specs, plans, and code
5. **Version Bump**: Follow semantic versioning (see below)

### Versioning

- **MAJOR**: Backward-incompatible changes (e.g., removing a core feature, changing phase structure)
- **MINOR**: New principle, section, or technology addition that doesn't break existing work
- **PATCH**: Clarifications, typo fixes, non-semantic refinements

### Compliance Review

- All PRs MUST verify compliance with this constitution
- Spec deviations MUST be documented and justified
- Complexity MUST be justified against constitutional principles
- Use `CLAUDE.md` for runtime development guidance specific to each subproject

### Prompt History Records (PHR)

- Every user input MUST be recorded verbatim in a PHR after completion
- PHR routing (all under `history/prompts/`):
  - Constitution updates → `history/prompts/constitution/`
  - Feature-specific work → `history/prompts/<feature-name>/`
  - General work → `history/prompts/general/`
- PHRs MUST include: ID, title, stage, date, full prompt, response summary, files modified

### Architecture Decision Records (ADR)

- When significant decisions are made (framework choice, data model, API design), suggest: "📋 Architectural decision detected: <brief>. Document? Run `/sp.adr <title>`"
- Never auto-create ADRs; require user consent
- ADR significance test: long-term impact + multiple alternatives + cross-cutting scope

**Version**: 1.0.0 | **Ratified**: 2025-12-28 | **Last Amended**: 2025-12-28
