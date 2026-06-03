# FAQ Section Specification

## Purpose

The FAQ on index.html currently has 5 real questions but misses common client inquiries. Expanding to 8–10 questions reduces support friction by anticipating what potential clients ask most: timelines, costs, small projects, and the regularization process.

## Requirements

### Requirement: Minimum 8 questions

The FAQ section MUST include at least 8 questions with complete, accurate answers in Spanish.

#### Scenario: Count check

- GIVEN the user opens index.html
- WHEN inspecting details elements under .faq-section
- THEN at least 8 details elements exist
- AND each has a non-empty summary and a non-empty answer

#### Scenario: No duplicate questions

- GIVEN all FAQ questions are compared
- WHEN checked for semantic overlap
- THEN no two questions SHALL ask the same thing with different wording

### Requirement: JSON-LD sync

The FAQPage structured data in application/ld+json MUST include all questions and answers present in the visible FAQ.

#### Scenario: Structured data matches visible content

- GIVEN the user inspects the JSON-LD script in index.html
- WHEN comparing mainEntity items to visible accordion items
- THEN every visible question appears in structured data
- AND every JSON-LD entry has a matching visible details element

### Requirement: Suggested topic coverage

The FAQ SHOULD include questions covering at least 3 of: plazos de entrega, visita a terreno, Ley del Mono benefits, small projects scope, and the regularization process step by step.

#### Scenario: Topic coverage check

- GIVEN the FAQ has 8+ questions
- WHEN reviewing topics covered
- THEN at least 3 of the suggested topics are present with substantive answers
