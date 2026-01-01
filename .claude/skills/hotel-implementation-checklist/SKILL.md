---
name: hotel-implementation-checklist
description: Ensures hotel feature implementations meet all requirements before marking tasks complete. Use when finishing a feature implementation, before creating commits, or during code review to verify completeness.
allowed-tools: Read, Grep, Glob, Bash
---

# Hotel Implementation Checklist

## Purpose
This Skill provides a comprehensive checklist to ensure hotel features are fully implemented, tested, and ready for production before marking tasks as complete.

## Pre-Completion Validation

Before marking ANY hotel feature implementation as complete, verify ALL items in this checklist.

---

## 1. Functional Requirements ✅

### Core Functionality
- [ ] All user stories from spec.md are implemented
- [ ] All acceptance criteria pass
- [ ] Happy path works end-to-end
- [ ] Error paths are handled gracefully
- [ ] Edge cases are covered

### Hotel-Specific Features
- [ ] Room booking flow works (search → select → confirm → payment)
- [ ] Availability checks are accurate (no double-booking)
- [ ] Date validations work (check-out > check-in, past dates rejected)
- [ ] Guest information is captured and validated
- [ ] Booking confirmation is generated
- [ ] Status transitions are enforced (pending → confirmed → checked-in → checked-out)

---

## 2. Data Layer ✅

### Database Schema
- [ ] All tables/collections are created
- [ ] Indexes are added for frequently queried fields (dates, room_id, guest_id)
- [ ] Foreign key constraints are in place
- [ ] Default values are set where needed
- [ ] Enum/check constraints validate status fields

### Data Validation
- [ ] Required fields are enforced (NOT NULL)
- [ ] Data types are correct (dates, decimals for prices)
- [ ] String lengths have limits (prevent abuse)
- [ ] Email/phone formats are validated
- [ ] Unique constraints prevent duplicates (booking reference, room number)

### Migrations
- [ ] Migration script is created and tested
- [ ] Rollback script is available
- [ ] Existing data is migrated if applicable
- [ ] Seed data is provided for testing

---

## 3. API Layer ✅

### Endpoints
- [ ] All endpoints from spec.md are implemented
- [ ] HTTP methods are correct (GET, POST, PUT, DELETE)
- [ ] Request validation works (400 for invalid input)
- [ ] Response format matches spec (JSON structure)
- [ ] Error responses are consistent (status codes + messages)

### API Documentation
- [ ] Endpoints are documented (comments or OpenAPI/Swagger)
- [ ] Request/response examples are provided
- [ ] Authentication requirements are stated
- [ ] Rate limiting is documented (if applicable)

### Security
- [ ] Authentication is enforced (JWT, session, etc.)
- [ ] Authorization checks prevent unauthorized access
- [ ] SQL injection is prevented (parameterized queries)
- [ ] XSS is prevented (input sanitization)
- [ ] CSRF protection is enabled (for state-changing operations)
- [ ] Sensitive data is not logged (passwords, payment details)

---

## 4. Business Logic ✅

### Calculations
- [ ] Price calculation is accurate (room rate × nights + taxes + fees)
- [ ] Discounts/promotions are applied correctly
- [ ] Refund amounts follow cancellation policy
- [ ] Date range calculations handle edge cases (same-day, long-term)

### Rules Enforcement
- [ ] Minimum/maximum stay requirements work
- [ ] Check-in/check-out time restrictions are enforced
- [ ] Blackout dates are respected
- [ ] Room capacity limits are validated (max guests)
- [ ] Cancellation policies are applied based on timing

### Concurrency
- [ ] Race conditions are handled (simultaneous bookings)
- [ ] Optimistic locking prevents conflicts (if applicable)
- [ ] Transactions ensure atomicity (booking + payment)

---

## 5. User Interface ✅

### Functionality
- [ ] All UI components render correctly
- [ ] Forms submit and validate properly
- [ ] Loading states are shown during async operations
- [ ] Success/error messages are displayed
- [ ] Navigation works (back buttons, breadcrumbs)

### User Experience
- [ ] Date pickers are intuitive (calendar widget)
- [ ] Validation errors are clear and actionable
- [ ] Confirmation dialogs prevent accidental actions
- [ ] Disabled states are visually distinct
- [ ] Tooltips explain complex fields

### Responsive Design
- [ ] Layout works on mobile, tablet, desktop
- [ ] Touch targets are appropriately sized (44×44px minimum)
- [ ] Text is readable on all screen sizes
- [ ] Images scale properly

### Accessibility
- [ ] Keyboard navigation works (tab order)
- [ ] Screen reader labels are present (aria-label)
- [ ] Color contrast meets WCAG AA standards
- [ ] Focus indicators are visible
- [ ] Error messages are associated with form fields

### Theme Support
- [ ] Light mode looks correct
- [ ] Dark mode looks correct (if applicable)
- [ ] Colors match design system
- [ ] Fonts and spacing are consistent

---

## 6. Testing ✅

### Unit Tests
- [ ] Business logic functions have unit tests
- [ ] Edge cases are tested (boundary dates, zero/negative values)
- [ ] Mock external dependencies (payment gateway, email service)
- [ ] Code coverage is >80% for critical paths

### Integration Tests
- [ ] API endpoints are tested end-to-end
- [ ] Database queries return expected results
- [ ] Authentication/authorization is tested
- [ ] Error scenarios are tested (404, 409, 500)

### UI Tests
- [ ] Critical user flows have E2E tests (booking flow)
- [ ] Form validation is tested
- [ ] Error states are tested

### Manual Testing
- [ ] Feature tested in development environment
- [ ] Feature tested in staging environment (if available)
- [ ] Cross-browser testing done (Chrome, Firefox, Safari)
- [ ] Mobile device testing done

---

## 7. Error Handling ✅

### User-Facing Errors
- [ ] Validation errors show helpful messages
- [ ] Network errors are caught and displayed
- [ ] Server errors show user-friendly messages (not stack traces)
- [ ] Retry mechanisms are available for transient failures

### Logging
- [ ] Errors are logged with sufficient context
- [ ] Log levels are appropriate (ERROR, WARN, INFO)
- [ ] Sensitive data is redacted from logs
- [ ] Correlation IDs track requests across services

### Monitoring
- [ ] Error alerts are configured (if using monitoring tools)
- [ ] Dashboards track feature usage (if using analytics)

---

## 8. Performance ✅

### Database Queries
- [ ] N+1 queries are eliminated (use joins or eager loading)
- [ ] Indexes speed up common queries
- [ ] Pagination is implemented for large result sets
- [ ] Query execution time is <500ms for common operations

### Caching
- [ ] Frequently accessed data is cached (room availability)
- [ ] Cache invalidation works correctly (on booking creation/cancellation)
- [ ] TTL (time-to-live) is appropriate

### Frontend
- [ ] Images are optimized (compressed, lazy-loaded)
- [ ] Bundle size is reasonable (code splitting if needed)
- [ ] API calls are debounced/throttled (search as you type)

---

## 9. Documentation ✅

### Code Documentation
- [ ] Complex functions have comments explaining "why"
- [ ] Public APIs have docstrings (JSDoc, Python docstrings)
- [ ] README is updated with new setup instructions (if needed)

### User Documentation
- [ ] Feature usage is documented (how to book a room)
- [ ] Admin workflows are documented (how to manage bookings)
- [ ] FAQs cover common questions

### Developer Documentation
- [ ] Architecture decisions are recorded (ADRs if significant)
- [ ] Database schema is diagrammed (ERD)
- [ ] API endpoints are listed (Postman collection, Swagger)

---

## 10. Deployment Readiness ✅

### Configuration
- [ ] Environment variables are documented (.env.example)
- [ ] Secrets are not committed to version control
- [ ] Feature flags are configured (if using gradual rollout)

### Dependencies
- [ ] New dependencies are added to package.json/requirements.txt
- [ ] Dependency versions are pinned (avoid floating versions)
- [ ] Vulnerabilities are checked (npm audit, safety)

### Database
- [ ] Migration is tested in staging
- [ ] Rollback plan is documented
- [ ] Backup is taken before migration (production)

### Monitoring
- [ ] Health check endpoint includes new feature (if applicable)
- [ ] Logs are centralized (Elasticsearch, CloudWatch, etc.)
- [ ] Metrics are tracked (bookings created, cancellations, errors)

---

## 11. Compliance and Legal ✅

### Data Privacy
- [ ] GDPR compliance (if applicable): user can view/export/delete data
- [ ] PII (personally identifiable information) is encrypted at rest
- [ ] Payment data follows PCI DSS (if handling cards directly)

### Terms of Service
- [ ] Cancellation policy is displayed before booking
- [ ] Terms and conditions are linked
- [ ] User consent is captured (checkboxes)

---

## 12. Code Quality ✅

### Code Review
- [ ] Code is reviewed by at least one peer
- [ ] Linter passes (ESLint, Pylint, etc.)
- [ ] Formatter is applied (Prettier, Black, etc.)
- [ ] No compiler warnings

### Best Practices
- [ ] DRY (Don't Repeat Yourself): no duplicate logic
- [ ] SOLID principles are followed
- [ ] Functions are small and focused (single responsibility)
- [ ] Variable/function names are descriptive

### Security Audit
- [ ] No hardcoded credentials
- [ ] No console.log() with sensitive data in production
- [ ] Dependencies are up-to-date (no critical vulnerabilities)

---

## How to Use

Invoke this Skill when:
1. **Finishing a feature**: "Run the implementation checklist"
2. **Before committing**: "Check if this is ready to commit"
3. **During code review**: "Validate this implementation against the checklist"
4. **Pre-deployment**: "Is this feature deployment-ready?"

## Review Process

1. **Read the feature implementation**
   ```
   Use Glob to find feature files: src/**/<feature>*
   Use Read to examine key files
   ```

2. **Check test files**
   ```
   Use Glob to find: **/*.test.*, **/*.spec.*
   Use Bash to run tests: npm test or pytest
   ```

3. **Verify database**
   ```
   Use Grep to find migration files: **/migrations/**
   Use Read to check schema definitions
   ```

4. **Validate documentation**
   ```
   Use Read to check: README.md, docs/**
   ```

5. **Run linters and formatters**
   ```
   Use Bash: npm run lint, npm run format
   ```

6. **Generate compliance report**
   - ✅ **Completed**: Items fully implemented
   - ⚠️ **Partial**: Items partially done (specify what's missing)
   - ❌ **Missing**: Items not addressed
   - 🔄 **Follow-up**: Items to address in future iterations

## Output Format

```
## Implementation Checklist Results

### ✅ Completed (85%)
- All functional requirements implemented
- Database schema with indexes
- API endpoints with validation
- Unit tests with 85% coverage
- UI components render correctly

### ⚠️ Partial (10%)
- Integration tests exist but don't cover all error paths
- Documentation has setup instructions but missing API examples

### ❌ Missing (5%)
- E2E tests for booking flow
- Performance testing not done

### 🔄 Recommended Follow-ups
1. Add E2E tests before production deployment
2. Document API with Swagger/OpenAPI
3. Add monitoring dashboard for booking metrics
```

## Integration with SDD-RI Workflow

This checklist aligns with:
- **Spec (spec.md)**: Validates all requirements are implemented
- **Plan (plan.md)**: Ensures architectural decisions are followed
- **Tasks (tasks.md)**: Confirms all tasks are truly complete
- **Constitution**: Enforces project standards

Use this Skill as the **final gate** before:
- Marking tasks as complete in tasks.md
- Creating git commits
- Submitting pull requests
- Deploying to production
