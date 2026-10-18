---
name: museu-catolica-angular
description: Develop and maintain the Museu da UNICAP digital collection and BI front end, following Angular official guidance, the MUSEU-CATOLICA/PROTÓTIPO reference, the project's MVP business rules, security requirements, and an explicit plan-and-approval workflow.
compatibility: opencode
metadata:
  project: museu-catolica
  stack: angular
  language: typescript
---

# Museu da UNICAP — Angular Front-End Engineering Skill

## 1. Mission and operating principles

Build a maintainable, accessible, secure, responsive Angular front end for the Museu de Arqueologia e Ciências Naturais da UNICAP's Digital Collection and Business Intelligence system.

Every change must:
- Respect the approved business rules and MVP scope in the project's requirements document.
- Use `MUSEU-CATOLICA/PROTÓTIPO` as the primary visual and interaction reference.
- Follow current official Angular documentation and the conventions already established by the repository.
- Keep application code, identifiers, filenames, comments, and technical documentation in English. User-facing interface copy should be in Brazilian Portuguese unless the prototype or the user explicitly requires another language.
- Prepare for integration with a back-end API; never present mock data as real persisted data.
- Prefer the simplest design that meets the requirements while preserving readability, testability, security, accessibility, and future changeability.
- Explain the rationale for architectural and implementation decisions.
- Obtain explicit user approval before changing project files.

## 2. Mandatory plan → approval → implementation → report workflow

This workflow is mandatory for every implementation task, including seemingly small changes.

### Phase A — Inspect and understand

Before proposing code:
1. Inspect the repository structure, `package.json`, Angular version, build/test/lint scripts, existing routing, component style, state-management approach, API services, environment configuration, and design system.
2. Inspect the relevant screens, assets, flows, and interactions under `MUSEU-CATOLICA/PROTÓTIPO`.
3. Locate and read the project's MVP/business-rules document. Search the repository for the supplied DOCX or an equivalent requirements file. Do not assume the file's name or location.
4. Identify the requirements and acceptance criteria affected by the requested change.
5. Identify uncertainties, contradictions, missing API contracts, and risks. Do not silently invent business rules.

Do not edit files during inspection.

### Phase B — Present a plan

Before implementation, present a concise but sufficiently detailed plan in Portuguese, including:

1. **Understanding:** what will be changed and why.
2. **Requirements:** applicable business rules and acceptance criteria.
3. **Prototype reference:** which prototype screen or interaction will be followed.
4. **Files:** files to create, modify, or remove, with the purpose of each.
5. **Implementation:** proposed components, services, types, validation, API flow, and state handling.
6. **UX/accessibility:** responsive behavior, loading/empty/error/success states, keyboard and assistive-technology considerations.
7. **Security:** relevant risks and mitigations.
8. **Tests:** checks and tests to run.
9. **Trade-offs:** important alternatives and why the proposed option is preferable.

The plan must explain **why** the proposed approach is appropriate, not merely list tasks.

### Phase C — Request explicit permission

End the plan by asking the user to approve it before making changes. For example:

> **May I implement this plan?** I will not modify files until you explicitly approve it.

Wait for an unambiguous affirmative response. Silence, a new question, or an ambiguous response is not approval.

If the user requests a change to the plan, revise it and request approval again. Approval applies only to the described scope. If implementation reveals a materially different approach, new files with significant impact, a business-rule conflict, a dependency installation, a destructive action, or a security-sensitive decision, stop and ask for approval before proceeding beyond the approved scope.

### Phase D — Implement the approved plan

After approval:
1. Make only the approved changes.
2. Explain important implementation decisions as you work, especially non-obvious choices.
3. Preserve unrelated user changes. Never overwrite or discard existing work.
4. Do not run destructive commands, delete user data, reset branches, or alter Git history without explicit approval.
5. Do not install or upgrade dependencies without explaining why and asking for approval.
6. Do not claim that a test passed unless it was actually executed and its result observed.

### Phase E — Verify and report

At completion, provide a final report in Portuguese with:
- What was implemented.
- Which files were created or changed.
- How the implementation follows the prototype and business requirements.
- The key technical decisions and their rationale.
- Tests/checks actually executed and their real results.
- Known limitations, assumptions, mock data, missing API endpoints, and remaining work.
- Any requirement that could not be fulfilled and why.

Clearly distinguish **implemented**, **tested**, **not tested**, and **pending back-end integration**.

## 3. Source-of-truth hierarchy and conflict handling

Use this order when making decisions:

1. Explicit user instructions and approved implementation plan.
2. Confirmed business rules and acceptance criteria in the project's requirements document.
3. Existing architecture and established conventions in the repository.
4. Relevant screens and behavior in `MUSEU-CATOLICA/PROTÓTIPO`.
5. Current official Angular documentation and established security/accessibility guidance.
6. Engineering judgment, clearly identified as such.

A prototype is a visual and interaction reference; it does not automatically approve every field or feature depicted in it. The requirements document distinguishes mandatory requirements from pending decisions and suggestions.

If the prototype, requirements document, existing code, or user request conflict:
- Describe the exact conflict and its consequences.
- Identify whether it is a visual discrepancy, business-rule decision, architectural decision, or scope change.
- Propose a preferred resolution and alternatives.
- Ask the user before implementing a resolution that changes business behavior or approved scope.

### Technology discrepancy: Angular versus the project document

The MVP document currently describes the front end as **React and JavaScript**, while this skill requests **Angular**.

- If the repository is already an Angular project, continue using its Angular stack and follow Angular best practices.
- If the repository is React-based or the project has not selected a framework, do not silently migrate or create a second front-end stack.
- Explain the discrepancy and ask the user to confirm Angular as the intended technology before scaffolding, migrating, or making framework-level changes.
- Do not interpret this skill as authorization to rewrite the existing project.

## 4. Angular engineering standards

Consult the official Angular documentation relevant to the task, using the version appropriate to the project. Prefer current official guidance over outdated tutorials. Start with:
- https://angular.dev/style-guide
- https://angular.dev/best-practices
- https://angular.dev/best-practices/security
- https://angular.dev/best-practices/a11y
- https://angular.dev/guide/forms
- https://angular.dev/guide/http
- https://angular.dev/guide/routing

Follow the existing project conventions when they are sound and consistent. Do not perform unrelated refactors just to impose a personal style.

### Components and templates
- Keep components focused on presentation and interaction orchestration.
- Move reusable business-independent logic, data access, and transformations into appropriate services or pure functions.
- Keep templates readable; move complicated expressions and multi-step logic into TypeScript.
- Prefer small, cohesive components over giant components with many unrelated responsibilities.
- Use Angular template syntax and APIs supported by the installed Angular version. Do not copy APIs from a newer version without verifying compatibility.
- Avoid direct DOM manipulation and `ElementRef` unless there is a justified need; prefer Angular templates, bindings, and supported APIs.
- Do not use `bypassSecurityTrust...` to silence security issues. Treat any use as a high-risk exception requiring justification and explicit review.
- Use semantic HTML before adding ARIA. Add accessible names and ARIA attributes where necessary.
- Manage focus for dialogs and navigation where appropriate; support keyboard operation and visible focus.
- Keep component styles scoped and avoid global styling unless it belongs in the shared design system.

### TypeScript and naming
- Write code identifiers, filenames, comments, and technical documentation in English.
- Use descriptive names that convey domain intent; avoid unexplained abbreviations.
- Use the repository's established Angular naming and file organization conventions.
- Prefer explicit domain types and interfaces over `any`.
- Model optional values explicitly and handle `null`/`undefined` safely.
- Avoid unsafe type assertions and non-null assertions unless the invariant is clear and documented.
- Use `readonly` where it communicates stable references and is compatible with the design.
- Avoid duplicate logic; extract shared behavior only when it genuinely improves clarity or reuse.
- Do not add abstractions, base classes, generic frameworks, or state-management libraries without a demonstrated need.

### Reactivity and state
- Follow the reactive approach already used by the project.
- Where appropriate for the installed Angular version, use Signals for local synchronous UI state and RxJS for asynchronous streams and event composition.
- Do not mix Signals, RxJS, and third-party state libraries without a clear boundary and reason.
- Avoid manual subscriptions that can leak. Prefer `async` pipe, supported interop utilities, or lifecycle-aware cleanup.
- Derive UI state from a single source of truth instead of maintaining redundant, potentially inconsistent state.

### Forms and validation
- Choose reactive forms or the existing project form approach based on complexity and consistency. For multi-field forms with conditional validation, prefer typed reactive forms when appropriate.
- Separate field-level validation, form-level validation, and server-side validation errors.
- Show clear, localized validation messages near the relevant fields.
- Preserve entered values when a request fails, unless there is a specific security or business reason not to.
- Disable duplicate submissions while a request is in progress.
- Do not treat front-end validation as a replacement for back-end validation.
- Use accessible labels, instructions, error associations, and keyboard behavior.
- Never show a success state until the API confirms successful completion.

### Routing and performance
- Follow the existing routing structure and protect administrative routes only as a user-experience measure; real authorization must be enforced by the back end.
- Use lazy loading for appropriate feature boundaries, particularly larger administrative sections.
- Avoid premature optimization. Measure or identify a credible bottleneck before introducing caching, complex state, or performance machinery.
- Avoid unnecessary change detection work, repeated API requests, and expensive computations in templates.
- Use pagination, filtering, or server-side aggregation when data volume and API capabilities warrant it.
- Ensure loading states and cancellation/cleanup behavior are sensible for asynchronous operations.

### Tests and quality
- Follow the repository's test framework and existing patterns.
- Test business-relevant behavior, not only implementation details.
- Cover valid input, invalid input, boundary values, loading, API failure, and successful submission where applicable.
- Test that API failures do not display false success.
- Run available formatting, linting, type-checking, unit tests, and production build when feasible.
- Report unavailable scripts or failures accurately; do not hide or work around failing checks without explanation.

## 5. Prototype-first UI/UX process

For each screen or component:
1. Locate the corresponding prototype under `MUSEU-CATOLICA/PROTÓTIPO`.
2. Inspect its layout, hierarchy, colors, typography, spacing, content, controls, feedback, and responsive behavior.
3. Reproduce the intended visual language without copying inaccessible or technically fragile implementation choices.
4. Compare the implementation against the prototype after coding, using screenshots or browser inspection if the environment supports it.
5. Document deliberate deviations and obtain approval when they alter the approved design or interaction.

### UX quality criteria
- Prioritize clarity, predictable behavior, and task completion over decorative effects.
- Establish visual hierarchy with consistent typography, spacing, alignment, and component states.
- Provide visible feedback for actions, validation, loading, success, empty results, and errors.
- Prevent accidental duplicate submissions and destructive actions.
- Use responsive layouts suitable for desktop, tablet, mobile, and kiosk/totem contexts as relevant to the screen.
- Design touch targets and controls for tablet/totem interaction; do not assume a mouse or hover state.
- Avoid relying on color alone to communicate status.
- Use clear Brazilian Portuguese interface text for museum visitors and staff, while keeping code in English.
- Respect accessibility: contrast, readable text, semantic controls, labels, keyboard navigation, focus visibility, and meaningful screen-reader announcements.
- Avoid unnecessary steps, excessive fields, confusing labels, and visual clutter.
- Use consistent design tokens/components where the project already has them.
- Avoid adding animations that distract from the task or make the interface less accessible; respect reduced-motion preferences where applicable.

## 6. Business rules for the Museu da UNICAP MVP

Read the full project requirements document before changing a form or domain behavior. The rules below are a baseline extracted from the current MVP document; the document and subsequently approved decisions remain authoritative.

### 6.1 Check-in
- Visit type is required.
- The primary visitor's age range is required.
- Visitor quantity must be greater than zero.
- An individual visit must represent exactly one person.
- School groups must provide participant quantity.
- The system/back end generates the date and time; do not trust a client clock as authoritative.
- Each visit receives a unique protocol generated by the responsible back end.
- Email and phone are optional unless an approved decision changes this.
- Contact data must not be used for communication without consent.
- Consent to communication must be recorded separately from satisfaction feedback.
- Show confirmation only after successful API persistence.
- Initial visit types: individual, family, school group, and cultural/academic/research.

### 6.2 Satisfaction survey
- Rating is required and must be an integer from 1 to 5.
- Initial labels: 1 = Very poor, 2 = Poor, 3 = Average, 4 = Good, 5 = Excellent. Display them in Brazilian Portuguese in the UI.
- Topics are optional; zero, one, or multiple topics may be selected.
- A topic must not be repeated in the same evaluation.
- Anonymous satisfaction submissions must be allowed; do not require personal information.
- Date/time and protocol or unique identifier are generated by the system/back end.
- Record terminal identity when applicable and supported by the API contract.
- Retrieve active satisfaction topics from `GET /api/v1/topicos-satisfacao`; do not maintain a conflicting hard-coded official list in the UI.
- Initial topics in the document include historical collection, guides/mediators, accessibility, climate control, lighting, architecture, pedagogical curation, and route signage. The document says the official list still requires validation.
- Show a thank-you/confirmation state only after successful submission.

### 6.3 Pedagogical evaluation
- Institution name is required.
- Education network is required.
- At least one education cycle/level must be selected.
- Student quantity must be greater than zero.
- Pedagogical ratings must follow the configured scales defined by the approved contract.
- Observations/suggestions must respect the approved character limit. If the limit has not been decided or specified, flag the gap; do not invent a definitive business limit.
- Future-visit interest must be supported.
- A protocol is generated by the back end.
- Certificate issuance and making email mandatory for certificates are out of scope unless explicitly approved.
- Initial education cycles include Elementary School I, Elementary School II, High School, Youth and Adult Education, and Higher Education; use the canonical values agreed with the API contract.

### 6.4 Administration and dashboard
The MVP's minimum analytical views are:
1. Overview of visits.
2. Visitor profile and origin.
3. Satisfaction and evaluated topics.
4. Educational impact of school visits.

The document's initial indicators include:
- Visits: total visits, estimated visitors, visits by day/week/month, visit type, age range, institutional affiliation, municipality and neighborhood, school groups, and institutions served.
- Satisfaction: average rating, positive/negative percentages, rating distribution (1–5), most-selected topics, ratings by period and terminal.
- Educational impact: school groups, estimated students, school network, education cycle, curricular suitability, mediators, materials, interest in future visits, and pedagogical suggestions.
- Contacts/consent: contact count, active consent count, consent percentage, and contacts by visit category.

Do not expose personal data in public charts or use it without a defined purpose. Administrative data must be protected by real back-end authorization. Do not invent metrics or present mock data as live institutional data.

### 6.5 MVP scope
The essential scope includes the three digital forms, responsive interfaces, API integration, data validation, protocol and timestamp handling through the back end, structured data for analysis, essential dashboard indicators, simulated data for testing, basic documentation, standardized error handling, functional/integration/end-to-end testing, and basic privacy/access controls.

Do not add the following as if approved MVP requirements: native mobile apps, automatic certificates, WhatsApp messages, communication campaigns, facial recognition, payments, unauthorized external integrations, AI comment analysis, complete offline mode, definitive institutional infrastructure without authorization, or definitive institutional authentication without UNICAP approval.

### 6.6 Unconfirmed decisions
The project document explicitly leaves some decisions open, including:
- Approved fields and requiredness for the three forms.
- Whether school visits are recorded per group or per student.
- Whether satisfaction is linked to check-in or fully anonymous.
- Official satisfaction topic list.
- Whether pedagogical drafts are supported.
- Whether certificate issuance is in scope.
- Whether a limit of 45 students is a real rule.
- Required dashboard indicators.
- Who can access contacts and how long data is retained.
- Back-end technology, official storage, authentication, deployment, and BI tool.

Do not settle these questions by guessing. Explain the impact, recommend an option when useful, and ask the user or responsible stakeholder for a decision.

## 7. API integration boundary

The front end communicates with the back end through a documented HTTP/JSON API. Keep transport details out of presentation components.

### Expected initial endpoints from the MVP document
- `POST /api/v1/checkins`
- `POST /api/v1/avaliacoes-satisfacao`
- `GET /api/v1/topicos-satisfacao`
- `POST /api/v1/avaliacoes-pedagogicas`
- `GET /api/v1/health`

These are initial documented endpoints, not proof that a working API exists. Verify the actual contract before relying on them.

### Integration rules
- Centralize HTTP calls in feature-oriented services or the established API layer.
- Use explicit request and response interfaces/types.
- Keep base URLs in environment/runtime configuration appropriate to the existing deployment strategy. Never hard-code machine-specific or internal IP addresses.
- Never place secrets, private API keys, passwords, or privileged credentials in front-end code or browser environment files.
- Use an API contract/OpenAPI specification when available. Confirm field names, requiredness, formats, success codes, error shape, authentication, CORS, and pagination before finalizing integration.
- Keep mock data behind a clearly named mock adapter/service or development-only mechanism. Make it obvious in the UI or report when the application is using simulated data.
- Do not silently fall back to mock data after a production API failure; this could misrepresent a failed submission as a successful record.
- Handle network errors, validation errors, unauthorized/forbidden responses, server errors, and timeouts with controlled user-facing messages.
- Do not log personal data, contact details, access tokens, or full request payloads.
- Do not fabricate protocol numbers or claim that a record was saved locally or remotely when it was not.
- Use the API as the authority for business rules and persisted state; client-side validation exists for usability and early feedback, not as a security boundary.

## 8. Security and privacy baseline

Apply least privilege, data minimization, safe defaults, and defense in depth.

- Collect only data required by the approved museum purpose.
- Treat email, phone, institution/responsible-person details, and free-text observations as potentially sensitive personal information.
- Keep communication consent separate, explicit, and auditable. No preselected consent.
- Do not assume that form submission implies permission for future communication.
- Do not expose contact details in public views, charts, console logs, URLs, analytics events, or error messages.
- Do not store passwords, API secrets, privileged credentials, or long-lived tokens in source code, committed environment files, local storage, or session storage.
- Do not assume route guards secure data. The back end must authorize every protected operation.
- Prefer Angular's built-in template escaping and sanitization. Avoid unsafe HTML rendering, dynamic template compilation, and direct DOM insertion of untrusted content.
- Never disable security controls merely to make integration work. Escalate CORS, authentication, certificate, or authorization issues rather than bypassing them.
- Use HTTPS in deployed environments. Keep development-only exceptions explicit and isolated.
- Follow the back end's authentication/session strategy. For cookie-based authentication, coordinate CSRF/XSRF defenses with the server; do not invent a client-only workaround.
- Avoid leaking internal server details or stack traces to visitors.
- Validate and constrain user-controlled input for the UI and API contract; remember that the back end must validate independently.
- Keep dependencies current within the project's compatibility constraints and review security advisories before proposing upgrades.
- Flag privacy, retention, access-control, consent, or LGPD-related uncertainties for an authorized project decision. Do not claim legal compliance solely because the UI contains a consent checkbox.

## 9. Architecture, maintainability, and scalability

Choose architecture proportional to the current MVP and likely evolution.

- Organize by domain/feature where it improves cohesion, for example `check-in`, `satisfaction`, `pedagogical-evaluation`, and `admin-dashboard`.
- Keep reusable UI primitives separate from domain-specific features when reuse is real.
- Separate presentation, API access, domain types, and reusable validation/formatting logic.
- Avoid duplicating API models across components.
- Avoid coupling form components directly to low-level HTTP details.
- Prefer explicit data flow and small interfaces over hidden side effects.
- Keep configuration environment-specific and documented.
- Use stable identifiers and server-generated protocols; do not treat array positions or display labels as persistent IDs.
- Use canonical values for categories shared with the API and dashboard. Avoid ad hoc spelling variants and hard-coded lists that conflict with server-provided values.
- Document architectural decisions when a choice has meaningful long-term consequences.
- Do not introduce a state-management framework, component library, charting library, or large dependency solely because it is popular. Explain the benefit, cost, bundle impact, licensing/maintenance implications, and obtain approval before adding it.
- Do not expand scope under the guise of future-proofing. Implement the smallest complete flow first.

## 10. Decision explanation standard

For each significant decision, explain:
- **Choice:** what is being done.
- **Reason:** why it fits the requirement.
- **Alternative:** a realistic alternative, where relevant.
- **Trade-off:** what the project gains and what it gives up.
- **Consequence:** how it affects testing, integration, maintenance, security, or future changes.

Keep explanations concise for routine changes. Provide deeper explanations for architecture, security, state management, forms, API contracts, and business rules. Use concrete code examples when they clarify behavior.

## 11. Definition of done

A task is complete only when all applicable items are satisfied:

- [ ] The user approved the implementation plan before files were modified.
- [ ] The relevant prototype was inspected and the UI compared against it.
- [ ] Applicable business rules and acceptance criteria were identified.
- [ ] Code identifiers and technical artifacts are in English.
- [ ] UI text is clear, localized, accessible, and consistent with the prototype.
- [ ] Loading, empty, validation, success, and error states are handled where relevant.
- [ ] API integration uses the agreed contract and does not fake successful persistence.
- [ ] Privacy and security risks were considered.
- [ ] Tests/checks were executed where available and results reported honestly.
- [ ] No unrelated user changes were overwritten.
- [ ] Documentation was updated where necessary.
- [ ] The final report lists changes, rationale, test results, limitations, and pending work.

## 12. Required response format

Before changes:

```text
## Plan
### Understanding
...
### Requirements and prototype
...
### Files affected
...
### Implementation and rationale
...
### UX, accessibility, and security
...
### Tests
...
### Risks and open questions
...

May I implement this plan?
```

After changes:

```text
## Implementation report
### What changed
...
### Files affected
...
### Key decisions and reasons
...
### Business rules covered
...
### Verification
- Executed:
- Results:
- Not executed:
### Limitations and pending integration
...
```

Always communicate with the user in Portuguese unless the user requests another language. Keep code, identifiers, filenames, comments, and technical documentation in English. Never begin implementation before receiving explicit approval for the presented plan.
