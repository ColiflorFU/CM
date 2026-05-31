# site-footer Specification

## Purpose

Global site footer with architectural grid background, 5-column editorial layout, corner-bracket CTA button, and scroll-to-top FAB. Contact section receives a visual refresh matching the new aesthetic while preserving form and accordion behavior.

## Requirements

### Requirement: 5-Column Grid Layout

The footer MUST render a 5-column CSS grid. The CTA column MUST span the first 2 columns (2fr). Social, Address, and Disclaimer MUST occupy columns 3-5 (1fr each).

#### Scenario: Desktop grid renders at correct widths

- GIVEN the footer is rendered on a viewport ≥ 1024px
- WHEN inspecting the grid container
- THEN the template MUST be `2fr 1fr 1fr 1fr 1fr`
- AND the CTA content MUST span columns 1-2

### Requirement: Architectural Grid Pattern

The footer background MUST display a visible 32px grid pattern at 4% black opacity to establish the architectural design language.

#### Scenario: Grid lines are visible on light background

- GIVEN the footer background is `#f8f8f8`
- WHEN inspecting the CSS
- THEN a composite `background-image` MUST produce horizontal and vertical lines at 32px intervals
- AND line color MUST be `rgba(0,0,0,0.04)`

### Requirement: Corner-Bracket CTA Button

The "DROP US A LINE" button MUST display four L-shaped corner brackets offset ~10px outside each button corner, creating a blueprint crop-mark aesthetic.

#### Scenario: Button renders with four brackets

- GIVEN the footer CTA column
- WHEN the button is inspected
- THEN it MUST be ~270×52px with transparent background and 1px solid `rgba(0,0,0,0.35)` border
- AND each corner MUST have a 12×12px L-shaped bracket offset outside the border

#### Scenario: Button text format

- GIVEN the CTA button
- THEN text MUST read "DROP US A LINE" in uppercase, 14px, weight 600, letter-spacing 0.08em

### Requirement: Scroll-to-Top FAB

The footer MUST include a fixed-position circular button for scrolling to the top of the page.

#### Scenario: FAB visible and positioned correctly

- GIVEN the page has loaded
- WHEN scrolling down beyond the viewport
- THEN a 44×44px circular button MUST be fixed at bottom-right of the viewport
- AND its background MUST be `#000` with a white upward chevron icon

### Requirement: Social, Address, Disclaimer Columns

Columns 3, 4, and 5 MUST display Social links, Address/Find Us, and Disclaimer content respectively.

#### Scenario: Social column lists links

- GIVEN the Social column
- THEN it MUST list Instagram and LinkedIn links at 20px, weight 600

#### Scenario: Address column displays contact info

- GIVEN the Address column
- THEN it MUST show firm address, email, and phone number

#### Scenario: Disclaimer column shows copyright

- GIVEN the Disclaimer column
- THEN it MUST display copyright text at 11-12px, color `rgba(0,0,0,0.35)`

### Requirement: Cross-Page Footer Consistency

The footer MUST be structurally identical across all 5 HTML files.

#### Scenario: All footers match

- GIVEN all 5 HTML pages (index, 3 projects, template)
- WHEN each footer is compared
- THEN structure, classes, and content MUST be identical

### Requirement: Contact Section Visual Refresh

The contact section in index.html MUST preserve its form + FAQ accordion structure while updating visual styling.

#### Scenario: Form validation and handler unchanged

- GIVEN the contact form
- WHEN submitted
- THEN field validation and Formspree handler MUST behave identically to before

#### Scenario: FAQ accordion behavior preserved

- GIVEN the FAQ section
- WHEN a question header is clicked
- THEN the +/– toggle MUST switch and content MUST expand or collapse
- AND default `details`/`summary` behavior MUST remain functional
