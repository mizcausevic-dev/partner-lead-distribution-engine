# Partner Lead Distribution Engine Architecture

## Service Overview

Partner Lead Distribution Engine models an internal operational service used by channel teams, partnerships, revenue operations, and sales operations to move leads to the right partners without breaking SLA expectations or territory rules.

It centralizes:

- lead records and routing posture
- partner specialization and capacity
- territory governance
- routing rules
- distribution history
- attribution context

## Request Flow

1. A lead scenario is submitted to an analysis endpoint.
2. The request body is validated with Zod.
3. The service reviews territory alignment, specialization fit, capacity, attribution confidence, and remaining SLA time.
4. The service returns issues, passed checks, routing posture, and recommended next action.
5. Teams use dashboard, routing-rule, and distribution-event endpoints to coordinate channel operations.

## Endpoint Map

- `GET /health`
- `GET /api/leads`
- `GET /api/leads/:id`
- `GET /api/partners`
- `GET /api/territories`
- `GET /api/routing-rules`
- `GET /api/distribution-events`
- `GET /api/dashboard/summary`
- `POST /api/analyze/routing`
- `POST /api/analyze/capacity`
- `POST /api/analyze/attribution`

## Routing Model

### Routing Review

The routing workflow scores:

- territory alignment
- specialization fit
- partner capacity
- SLA posture
- attribution confidence
- account size and partner tier fit

### Channel Governance and Fairness

The routing model prioritizes:

- valid regional coverage
- product and industry expertise
- fairness balancing across qualified partners
- SLA protection before assignment
- escalation when no safe partner fit exists

## Security Notes

- Requests are validated before service logic runs.
- Configuration remains environment-driven.
- Error responses are centralized and consistent.
- CI, Dependabot, and CodeQL support ongoing repository hygiene.

## Future Production Upgrades

- persist routing history and partner utilization in PostgreSQL
- integrate CRM and MAP event ingestion
- add weighted fairness controls by partner tier and recent assignments
- support exclusion rules, compliance flags, and account-based ownership constraints
- add closed-loop attribution and routed-lead performance outcomes
