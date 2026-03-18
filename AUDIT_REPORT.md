# Codebase Audit Report

Date: 2026-03-18
Repository: Beat-Gurus

## Scope

This audit focused on:
- Build reliability
- Front-end accessibility
- Performance and bundle health
- Basic operational readiness

## Checks Run

- `npm run build` ✅ (production build succeeds)
- `npx tsc --noEmit` ✅ (type-check pass for current configuration)
- `npm audit --omit=dev --json` ⚠️ (registry audit endpoint returned HTTP 403 in this environment)

## Findings

### 1) Large hero logo asset included in production bundle (High)
- The hero imports `images/logo.png` directly, so it is bundled for every first-page load.
- Production output shows this image emitted at ~8.3 MB (`dist/assets/logo-*.png`), which is very heavy for LCP and mobile users.

**Recommendation**
- Replace the source PNG with a compressed WebP/AVIF variant.
- Add responsive sizes where appropriate.
- Target < 300 KB for the initial above-the-fold logo image.

### 2) Global cursor suppression impacts usability/accessibility (Medium)
- `html, body` are globally set to `cursor: none`, and buttons also hide cursor.
- This can hurt discoverability and is especially problematic if the custom cursor fails, is blocked, or runs on constrained devices.

**Recommendation**
- Keep native cursor by default; enable custom cursor only for enhanced pointer contexts.
- Ensure fallback for reduced-motion and assistive-tech scenarios.

### 3) FAQ accordion is mouse-only semantic interaction (Medium)
- Accordion toggles are implemented on clickable containers (`motion.div`) without button semantics.
- Keyboard and screen-reader users may not get proper focus/interaction behavior.

**Recommendation**
- Use actual `<button>` elements for triggers.
- Add `aria-expanded`, `aria-controls`, and an associated panel `id`.

### 4) Video play control uses a clickable `div` with incomplete keyboard handling (Medium)
- Play trigger is a `div` with `role="button"` and Enter handling only.
- Space key activation and stronger semantics are missing.

**Recommendation**
- Replace with a `<button>` element and proper accessible labeling.
- Support both Enter and Space activation by default through native button behavior.

### 5) Contact form currently has no real submission path (Low)
- On submit, data is only logged to console and followed by an alert/reset.
- No API integration, validation strategy, spam prevention, or error handling exists.

**Recommendation**
- Integrate with backend/form service endpoint.
- Add validation, loading/error/success states, and abuse protection (e.g., honeypot + rate limiting/CAPTCHA).

### 6) Missing automated quality gates in package scripts (Low)
- `package.json` only defines `dev`, `build`, and `preview` scripts.
- No linting, tests, or accessibility checks are enforced in CI/dev scripts.

**Recommendation**
- Add scripts for `lint`, `test`, and optionally `format` + `typecheck`.
- Run checks in CI before deployment.

## Suggested Prioritized Remediation Plan

1. Compress/replace `images/logo.png` and verify LCP + transfer size.
2. Convert FAQ and video interaction controls to semantic buttons.
3. Re-enable native cursor fallback and constrain custom cursor behavior.
4. Implement a production-ready contact submission flow.
5. Add lint/test scripts and wire them into CI.

