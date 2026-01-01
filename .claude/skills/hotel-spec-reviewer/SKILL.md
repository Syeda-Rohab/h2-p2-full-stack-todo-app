---
name: hotel-spec-reviewer
description: Reviews hotel feature specifications for completeness, clarity, consistency, and alignment with hotel domain requirements. Use when reviewing spec.md files, feature documentation, or before starting implementation planning.
allowed-tools: Read, Grep, Glob
---

# Hotel Feature Specification Reviewer

## Purpose
This Skill ensures hotel feature specifications are complete, unambiguous, and ready for implementation. It validates specs against hotel industry standards and the project's SDD-RI methodology.

## Review Dimensions

### 1. Completeness Check
Verify the spec includes all required sections:

#### Required Sections
- **Feature Overview**: What problem does this solve?
- **User Stories**: Who benefits and how?
- **Functional Requirements**: What must the system do?
- **Data Model**: What entities and relationships?
- **Business Rules**: What constraints and validations?
- **User Interface**: What screens and interactions?
- **API Contracts**: What endpoints and payloads?
- **Success Criteria**: How do we know it works?

#### Hotel-Specific Requirements
- **Guest Experience**: How does this affect guests?
- **Staff Workflows**: How do staff use this?
- **Operational Impact**: How does this change operations?
- **Reporting Needs**: What data is tracked?

### 2. Clarity and Precision
Check for ambiguity and vagueness:

❌ **Vague**: "The system should handle bookings efficiently"
✅ **Precise**: "The system must confirm or reject a booking request within 2 seconds under normal load"

❌ **Vague**: "Users can manage rooms"
✅ **Precise**: "Staff can create, update, disable, and archive room records. Guests can view available rooms and their amenities."

#### Red Flags
- Words like "should", "might", "probably", "usually"
- Undefined terms (what is a "booking"? "room"? "guest"?)
- Missing error scenarios
- No acceptance criteria
- Absent edge cases

### 3. Consistency Check
Verify alignment across the spec:

- **Terminology**: Same terms used throughout (room vs. accommodation)
- **Data Definitions**: Field names match across UI, API, DB sections
- **User Roles**: Permissions align with stated user types
- **Business Rules**: No contradictions between sections
- **Cross-References**: Links to related features are valid

### 4. Hotel Domain Validation
Ensure the spec reflects hotel industry realities:

#### Room Management
- Room types (Single, Double, Suite, etc.)
- Room status (Available, Occupied, Cleaning, Maintenance, Out-of-Order)
- Amenities (WiFi, TV, Mini-bar, etc.)
- Pricing: base rate, seasonal rates, dynamic pricing

#### Booking Lifecycle
- Inquiry → Reservation → Confirmation → Check-in → Stay → Check-out → Payment
- Cancellation and modification policies
- No-show handling
- Early checkout

#### Guest Management
- Guest profiles (name, contact, preferences, history)
- Loyalty programs
- Special requests (late checkout, extra bed, dietary needs)
- Communication (confirmation emails, reminders)

#### Operational Constraints
- Check-in/check-out times (e.g., 3 PM / 11 AM)
- Minimum/maximum stay requirements
- Blackout dates
- Housekeeping turnaround time

### 5. API and Data Model Review
Validate technical specifications:

#### Data Model
- All entities have primary keys
- Relationships are clearly defined (one-to-many, many-to-many)
- Required vs. optional fields are marked
- Data types are specified (string, int, date, enum)
- Validation rules are stated (min/max length, format)

#### API Contracts
- HTTP methods are appropriate (GET, POST, PUT, DELETE)
- Request/response examples are provided
- Error responses are documented (400, 401, 404, 409, 500)
- Authentication/authorization is specified
- Pagination is defined for list endpoints

### 6. Testability and Acceptance Criteria
Ensure the spec can be validated:

Each requirement should have:
- **Given**: Initial state/preconditions
- **When**: Action/trigger
- **Then**: Expected outcome

Example:
```
Given: A guest has a confirmed booking for Room 101 on March 15
When: The guest attempts to check in on March 15 at 2:45 PM
Then: The system should allow early check-in if the room is ready
```

### 7. Missing Sections Analysis
Check for common omissions:

- **Error Handling**: What happens when things go wrong?
- **Permissions**: Who can do what?
- **Notifications**: What messages are sent when?
- **Audit Trail**: What actions are logged?
- **Migration**: How does existing data transition?
- **Rollback**: How do we undo this feature if needed?

### 8. Constitutional Alignment
Verify the spec adheres to project principles (from `.specify/memory/constitution.md`):

- Code quality standards
- Testing requirements
- Performance benchmarks
- Security practices
- Accessibility guidelines

## Review Process

1. **Load the specification**
   ```
   Use Read to open specs/<feature>/spec.md
   ```

2. **Cross-reference constitution**
   ```
   Use Read to check .specify/memory/constitution.md
   ```

3. **Check related specs**
   ```
   Use Glob to find specs/**/*.md
   Use Grep to search for related features
   ```

4. **Analyze against checklist**
   Run through all 8 review dimensions above

5. **Generate findings report**
   Structure output as:
   - **Critical Gaps**: Must address before planning
   - **Clarifications Needed**: Questions for stakeholder
   - **Enhancements**: Nice-to-have improvements
   - **Compliant Sections**: What's already good

## How to Use

Invoke this Skill by asking:
- "Review this hotel feature spec"
- "Check the room booking spec for completeness"
- "Is this specification ready for planning?"
- "What's missing from this spec?"

## Example Questions to Ask

When gaps are found, suggest clarifying questions:

- "Should guests be able to modify bookings up to 24 hours before check-in, or is there a different cutoff?"
- "What happens if a guest tries to book a room that becomes unavailable between search and confirmation?"
- "How should the system handle partial payments vs. full upfront payment?"
- "Are there different cancellation policies for different room types?"

## Output Format

After review, provide:

### ✅ Strengths
- Well-defined data model
- Clear API contracts with examples
- Comprehensive error scenarios

### ⚠️ Needs Clarification
- Cancellation policy timing is ambiguous
- Role permissions for "Staff" vs "Manager" overlap
- Missing: What happens on payment gateway timeout?

### ❌ Critical Gaps
- No acceptance criteria for booking confirmation
- User interface section is missing
- No migration plan for existing reservations

### 📋 Next Steps
1. Add UI wireframes or mockups
2. Define acceptance criteria for each requirement
3. Clarify cancellation policy timing with stakeholder
