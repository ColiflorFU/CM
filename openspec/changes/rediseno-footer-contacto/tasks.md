# Tasks: Rediseño Footer y Sección de Contacto

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~750 (300 CSS + 456 HTML) |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR 1 → PR 2 |
| Delivery strategy | ask-on-risk |
| Chain strategy | feature-branch-chain |
| Decision needed before apply | Yes |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: feature-branch-chain
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | CSS rewrite + index.html footer & contact | PR 1 | Base = tracker branch; all meaningful logic |
| 2 | Replicate footer to 4 remaining HTMLs | PR 2 | Base = PR 1 branch; mechanical copy, verify identity |

## Phase 1: CSS Foundation

- [x] 1.1 Add CSS vars to `:root` in `styles.css` (`--footer-bg: #f8f8f8`, `--grid-line`, `--grid-cell: 32px`, `--bracket-color`)
- [x] 1.2 Add `.grid-bg` utility class with composite `background-image` grid lines at 32px intervals
- [x] 1.3 Add `.footer-grid` 5-col layout (`2fr 1fr 1fr 1fr 1fr`, gap 64px, padding 72px 96px 64px) + `.footer-cta-col` with `grid-column: 1 / 3`
- [x] 1.4 Add `.cta-btn` base styles (270×52px, transparent, 1px solid var(--bracket-color)) + `.cta-btn::before`/`::after` + `.cta-btn-inner::before`/`::after` for 4 corner L-brackets at 12×12px offset -23px
- [x] 1.5 Add `.scroll-top-fab` (44×44px circle, black bg, white SVG chevron, fixed bottom-right, z-index 100)
- [x] 1.6 Add `.footer-col`, `.footer-label` + social links (20px, 600w), address, disclaimer (11px, rgba(0,0,0,0.35)) typography

## Phase 2: Footer HTML — index.html

- [x] 2.1 Replace `<footer>` block in `index.html` with new 5-column structure: CTA (headline + corner-bracket button + microcopy) spans cols 1–2, Social col (Síguenos + Instagram/LinkedIn), Address col (Find Us + email/phone), Disclaimer col (copyright), and scroll-to-top FAB
- [x] 2.2 Preserve `id="contact"` on new `<footer>` element

## Phase 3: Contact Section Refresh — index.html

- [x] 3.1 Update `.contact-faq-grid` gap to 80px and refine spacing in `styles.css`
- [x] 3.2 Apply spacing/typography refinements to contact section HTML in `index.html` (same form + FAQ structure, no validation changes)

## Phase 4: Cross-Page Replication

- [x] 4.1 Replace footer in `proyecto-torre.html` with identical new block (nav links point to `index.html#`)
- [x] 4.2 Replace footer in `proyecto-residencia.html`
- [x] 4.3 Replace footer in `proyecto-casa-campo.html`
- [x] 4.4 Replace footer in `project-template.html`

## Phase 5: Cleanup — Remove Old CSS

- [x] 5.1 Delete old footer classes from `styles.css`: `.footer-cta`, `.footer-top`, `.footer-brand`, `.footer-nav`, `.footer-main`, `.footer-cta-copy`, `.footer-button`, `.footer-up`, `.footer-contact`, `.footer-contact-block`, `.footer-social`, `.footer-bottom` (and their hover/child selectors)
- [x] 5.2 Delete responsive overrides for old footer classes (lines ~1616–1651)

## Phase 6: Responsive + Verification

- [x] 6.1 Add responsive overrides at 1100px: CTA full-width, social/address/disclaimer in `repeat(3,1fr)`, brackets scale to 10×10px offset -20px
- [x] 6.2 Add responsive overrides at 760px: stack all columns 1fr, footer padding 40px 24px, gap 32px, brackets 8×8px offset -17px, FAB bottom 16px right 16px
- [x] 6.3 Diff all 5 HTML footer blocks — must be structurally identical
- [x] 6.4 Visual check: grid lines on `#f8f8f8`, 4 L-brackets offset outside border, FAB fixed bottom-right, contact form + FAQ accordion unchanged
