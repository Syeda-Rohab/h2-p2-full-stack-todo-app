---
name: hotel-booking-validator
description: Reviews hotel booking system code for completeness, data integrity, reservation logic, availability management, and payment processing. Use when reviewing hotel reservation features, booking workflows, room availability code, or payment integration.
allowed-tools: Read, Grep, Glob
---

# Hotel Booking System Code Validator

## Purpose
This Skill ensures hotel booking features meet the project's standards for reservation handling, availability tracking, payment processing, and data consistency.

## Validation Checklist

When reviewing booking-related code, verify:

### 1. Reservation Data Integrity
- Check-in and check-out dates are validated (check-out > check-in)
- Guest information is complete (name, email, phone)
- Room selection is validated against availability
- Number of guests is within room capacity
- Booking reference/confirmation number is unique

### 2. Availability Management
- Room availability is checked before reservation confirmation
- Calendar conflicts are detected (no double-booking)
- Overbooking prevention is enforced
- Status transitions are valid: `pending` → `confirmed` → `checked-in` → `checked-out`
- Cancelled bookings free up room availability

### 3. Payment Processing
- Total price calculation includes:
  - Base room rate × number of nights
  - Taxes and service fees
  - Additional guest charges
- Payment status is tracked (`pending`, `paid`, `refunded`)
- Refund policies are enforced based on cancellation timing
- Payment gateway integration handles errors gracefully

### 4. Business Logic Rules
- Minimum stay requirements are enforced
- Maximum advance booking period is respected
- Blackout dates are handled
- Special rates (seasonal, promotional) are applied correctly
- Group bookings follow proper allocation rules

### 5. Error Handling
- Invalid date ranges are rejected with clear messages
- Out-of-stock room scenarios fail gracefully
- Payment failures provide actionable feedback
- System errors don't leave bookings in inconsistent state
- Concurrent booking attempts are handled (race conditions)

### 6. Data Persistence
- Booking records are saved atomically
- Failed transactions are rolled back
- Audit trail captures all status changes
- Historical data is preserved (no destructive updates)

### 7. Security Considerations
- User can only view/modify their own bookings (unless admin)
- Payment information is never logged in plaintext
- SQL injection prevention in date/search queries
- XSS prevention in guest input fields

## Review Process

1. **Identify booking-related files**
   ```
   Use Glob to find: **/booking*.*, **/reservation*.*, **/payment*.*
   ```

2. **Check core functions**
   - `createBooking()` or `makeReservation()`
   - `checkAvailability()`
   - `calculateTotalPrice()`
   - `processPayment()`
   - `cancelBooking()`

3. **Verify test coverage**
   - Unit tests for business logic
   - Integration tests for booking flow
   - Edge cases: same-day booking, long-term stays, boundary dates

4. **Review database schema**
   - Proper indexes on date range queries
   - Foreign key constraints
   - Status enum/check constraints

## How to Use

Invoke this Skill by asking:
- "Validate this booking code"
- "Review the reservation feature for issues"
- "Check this booking implementation against best practices"
- "Ensure this payment processing code is secure"

## Example Review Output

After review, provide:
- ✅ **Passed checks**: List compliant areas
- ⚠️ **Warnings**: Potential improvements
- ❌ **Critical issues**: Must-fix problems
- 📝 **Recommendations**: Suggested enhancements
