# Design: Rediseño Footer y Sección de Contacto

## Technical Approach

Rewrite footer from dark theme to light editorial (#f8f8f8) with visible 32px CSS grid. New 5-column `2fr 1fr 1fr 1fr 1fr` layout — CTA spans cols 1–2 (big Urbanist headline + corner-bracket button). Corner brackets via wrapper span giving 4 pseudo-element slots. Reusable `.grid-bg` utility class. Contact section: spacing/typography refresh only, same form + FAQ. Identical footer block in all 5 HTMLs.

## Architecture Decisions

| Option | Tradeoffs | Decision |
|--------|-----------|----------|
| **Corner brackets**: wrapper `<span>` inside `<a>` | + 4 pseudo-elements from 2 elements; — extra DOM node | Chosen: clean CSS, no JS, tested across Chrome/Firefox/Safari |
| **Corner brackets**: SVG background | + single element; — offset math in viewBox, harder to maintain | Rejected: pseudo-elements more readable |
| **Grid pattern**: reusable `.grid-bg` class | + composable on any section; — one extra class in HTML | Chosen: future-proof for other sections (out of scope but architected) |
| **Grid pattern**: inline in `.site-footer` | + fewer classes; — not reusable | Rejected: want grid elsewhere later |
| **Breakpoints**: reuse existing 1100px / 760px | + no responsive fragmentation; — spec says 1024px for desktop | Chosen: 1100px maps cleanly to "desktop"; avoids 3rd breakpoint |
| **FAB visibility**: always visible | + simpler; — distracts on long pages | Chosen for launch; can add scroll-gate JS later |

## Data Flow

```
Page load → .grid-bg composite renders grid on #f8f8f8
         → 5-col grid: [CTA spans 2fr] [Social 1fr] [Address 1fr] [Disclaimer 1fr]
         → FAB fixed bottom-right (always visible)
Click FAB → scrollTo({top:0,behavior:'smooth'})
Contact form → same Formspree handler, unchanged
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `styles.css` | Modify | Rewrite ~80 lines footer CSS: .grid-bg, .site-footer, corner brackets, FAB; ~20 lines contact refresh |
| `index.html` | Modify | New footer block + minor contacto spacing |
| `proyecto-torre.html` | Modify | Footer block only |
| `proyecto-residencia.html` | Modify | Footer block only |
| `proyecto-casa-campo.html` | Modify | Footer block only |
| `project-template.html` | Modify | Footer block only |

## Interfaces / Contracts

### New CSS Variables

```css
:root {
    --footer-bg: #f8f8f8;
    --grid-line: rgba(0,0,0,0.04);
    --grid-cell: 32px;
    --bracket-color: rgba(0,0,0,0.35);
}
```

### Grid Utility

```css
.grid-bg {
    background-image:
        linear-gradient(var(--grid-line) 1px, transparent 1px),
        linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
    background-size: var(--grid-cell) var(--grid-cell);
}
```

### Footer HTML Structure

```html
<footer class="site-footer grid-bg" id="contact">
    <div class="container">
        <div class="footer-grid">
            <!-- Col 1-2: CTA -->
            <div class="footer-cta-col">
                <h2 class="footer-headline">Hablemos de tu próximo proyecto</h2>
                <a class="cta-btn" href="mailto:elizabeth@contrerasmartinez.cl">
                    <span class="cta-btn-inner">DROP US A LINE</span>
                </a>
                <p class="footer-cta-micro">Sin compromiso, solo café y buenas ideas.</p>
            </div>
            <!-- Col 3: Social -->
            <div class="footer-col footer-social">
                <span class="footer-label">Síguenos</span>
                <a href="#">Instagram</a>
                <a href="#">LinkedIn</a>
            </div>
            <!-- Col 4: Address -->
            <div class="footer-col footer-address">
                <span class="footer-label">Find Us</span>
                <p>Paseo Ahumada 341, Of. 504<br>Santiago Centro, Chile</p>
                <a href="mailto:elizabeth@contrerasmartinez.cl">elizabeth@contrerasmartinez.cl</a>
                <a href="tel:+56951278937">+56 9 5127 8937</a>
            </div>
            <!-- Col 5: Disclaimer -->
            <div class="footer-col footer-disclaimer">
                <p>&copy; 2026 Contreras Martínez Arquitectura Integral. Todos los derechos reservados.</p>
            </div>
        </div>
        <!-- FAB -->
        <a class="scroll-top-fab" href="#top" aria-label="Volver arriba">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 15V3M9 3L3 9M9 3L15 9" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
        </a>
    </div>
</footer>
```

### Corner Bracket CSS (TL shown; all 4 via wrapper)

Each pseudo: 12×12px at `-23px` from corner (= 10px gap + 12px size + 1px border).

```css
.cta-btn {
    position: relative; display: inline-flex;
    width: 270px; height: 52px;
    border: 1px solid var(--bracket-color);
    background: transparent;
    align-items: center; justify-content: center;
    font: 600 14px/1 "Urbanist", sans-serif;
    letter-spacing: 0.08em; text-transform: uppercase;
    text-decoration: none; color: var(--ink);
}
.cta-btn::before {
    content: ''; position: absolute;
    top: -23px; left: -23px;
    width: 12px; height: 12px;
    border: 1px solid var(--bracket-color);
    border-width: 1px 0 0 1px;  /* TL L-shape */
}
.cta-btn::after {
    top: -23px; right: -23px;
    border-width: 1px 1px 0 0;  /* TR */
}
.cta-btn-inner::before {
    bottom: -23px; left: -23px;
    border-width: 0 0 1px 1px;  /* BL */
}
.cta-btn-inner::after {
    bottom: -23px; right: -23px;
    border-width: 0 1px 1px 0;  /* BR */
}
/* All 4 pseudo-elements share absolute pos + 12×12 box — only border-width varies */
```

### Footer Grid

```css
.footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
    gap: 64px;
    padding: 72px 96px 64px;
}
.footer-cta-col { grid-column: 1 / 3; }
```

### FAB

```css
.scroll-top-fab {
    position: fixed;
    bottom: 32px; right: 32px;
    z-index: 100;
    width: 44px; height: 44px;
    border-radius: 50%;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
}
```

### Contact Section Refresh

Minimal changes: increase `padding: 120px 0` → keep, refine `contact-faq-grid` gap to `80px`, typography same.

## Responsive Strategy

| Viewport | Layout | Brackets | FAB |
|----------|--------|----------|-----|
| ≥ 1100px | 5-col `2fr 1fr 1fr 1fr 1fr` | Full 12×12 offset -23px | Fixed 44px |
| 760–1099px | 2 rows: CTA full-width, then social/address/disclaimer in `repeat(3,1fr)` | Scale to 10×10, offset -20px | Same |
| < 760px | Stack: each column `1fr` | 8×8, offset -17px | Bottom 16px, right 16px |

At < 760px footer padding drops to `40px 24px`, gap to `32px`.

## Testing Strategy

| Layer | What | How |
|-------|------|-----|
| Visual | Grid lines on light bg | Inspect computed `background-image` — 32px composite |
| Visual | 5 columns + CTA spans 2 | Check `grid-template-columns` + `grid-column` |
| Visual | 4 brackets offset correctly | Screenshot — L-shapes visible outside border |
| Functional | FAB navigates to top | Click → `scrollY === 0` |
| Functional | Contact form + FAQ unchanged | Submit validation, click accordion — same behavior |
| Consistency | All 5 footers match | Diff HTML blocks across files |

## Migration / Rollout

No data migration. Old classes removed: `.footer-cta`, `.footer-top`, `.footer-nav`, `.footer-brand`, `.footer-cta-copy`, `.footer-button`, `.footer-up`, `.footer-contact`, `.footer-contact-block`, `.footer-social`, `.footer-bottom`, `.footer-main`. ID `#contact` preserved for anchor links. All 5 files updated in one commit.

## Implementation Order

1. CSS variables (`--footer-bg`, `--grid-line`, etc.) + `.grid-bg` utility
2. Footer HTML block (write once, paste into 5 files)
3. Footer grid + layout CSS
4. Corner bracket button CSS + `::before`/`::after`
5. FAB CSS
6. Contact section visual tweaks (spacing)
7. Responsive overrides at 1100px and 760px
8. Remove old footer CSS classes
9. Verify all 5 footers are structurally identical

## Open Questions

- [ ] Confirm exact email, phone, address, and social link URLs for footer
- [ ] Decide FAB visibility: always present vs. show on scroll past viewport
