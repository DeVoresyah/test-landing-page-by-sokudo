# School Landing Page Design System

This document extracts the reusable visual system from the provided school landing page reference screenshots. The source direction is clean, modern, academic, and technology-focused: white page surfaces, electric blue actions, compact rounded cards, dark textured curriculum bands, polished media blocks, and small vertical section labels.

## Design Principles

- **Academic clarity first:** prioritize readable structure, generous whitespace, and clear hierarchy.
- **Bright institutional base:** default page surfaces are white or near-white, giving the school a trustworthy and open feel.
- **Blue as the action language:** reserve saturated blue for primary actions, selected states, links, pagination, and section tags.
- **Technology-forward contrast:** use deep charcoal bands for curriculum, subject, and skill-building sections.
- **Editorial rhythm:** alternate spacious light sections, logo strips, card grids, media rows, testimonial areas, and dark CTA sections.

## Color Tokens

```css
:root {
  /* Brand */
  --color-brand-50: #eff6ff;
  --color-brand-100: #dbeafe;
  --color-brand-200: #afc9ec;
  --color-brand-300: #6498e2;
  --color-brand-500: #0b58d5;
  --color-brand-600: #0e57d1;
  --color-brand-700: #064ab8;

  /* Neutrals */
  --color-white: #ffffff;
  --color-surface: #f2f2f3;
  --color-surface-raised: #eeeeef;
  --color-border: #e2e2e2;
  --color-border-strong: #d7dbe2;
  --color-muted: #acacac;
  --color-text-muted: #5a5a5b;
  --color-text-secondary: #424346;
  --color-text-primary: #1d1d1e;
  --color-ink: #111214;

  /* Dark sections */
  --color-panel: #1d1e1f;
  --color-panel-soft: #242628;
  --color-panel-border: #364251;

  /* Warm image/accent support */
  --color-warm-700: #44342f;
  --color-warm-500: #8f6a64;
}
```

### Color Usage

- `--color-brand-500` is the primary action color for buttons, tabs, active navigation, badges, sliders, and focus rings.
- `--color-text-primary` is the default text color on light backgrounds.
- `--color-text-muted` is used for captions, metadata, secondary descriptions, and helper text.
- `--color-surface` and `--color-surface-raised` create the soft gray page background and card interiors.
- `--color-panel` is used for dense dark sections, curriculum highlights, subject previews, and high-contrast CTA areas.
- Avoid large blue gradients. The reference uses blue in strong bands and compact controls, not as an all-over theme.

## Typography

Use a modern grotesk/sans font with clean numerals. Recommended stack:

```css
--font-sans: Inter, "SF Pro Display", "SF Pro Text", ui-sans-serif, system-ui, sans-serif;
--font-mono: "JetBrains Mono", "SF Mono", Menlo, Consolas, monospace;
```

### Type Scale

```css
--font-size-xs: 11px;
--font-size-sm: 12px;
--font-size-md: 14px;
--font-size-lg: 16px;
--font-size-xl: 20px;
--font-size-2xl: 28px;
--font-size-3xl: 36px;
--font-size-4xl: 48px;

--line-height-tight: 1.12;
--line-height-title: 1.2;
--line-height-body: 1.55;
```

### Type Usage

- Page hero titles: `48px`, weight `600`, line-height `1.12`.
- Section titles: `28px-36px`, weight `600`, line-height `1.2`.
- Card titles: `18px-20px`, weight `600`.
- Body text: `14px-16px`, weight `400`, line-height `1.55`.
- Captions and metadata: `11px-12px`, weight `400`.
- Numeric stats: `24px-28px`, weight `600`, compact line-height.
- Small technical labels: `12px-14px`, optional monospace only for programming-related labels.

Do not use negative letter spacing. Keep headings crisp and compact.

## Spacing Tokens

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
```

### Layout Spacing

- Page max width: `1120px-1200px`.
- Main section padding desktop: `72px 0`.
- Main section padding mobile: `40px 0`.
- Content gutters desktop: `64px`.
- Content gutters tablet: `32px`.
- Content gutters mobile: `20px`.
- Card padding: `24px`.
- Compact navigation/control padding: `8px-12px`.
- Grid gap: `20px-28px`.

## Radius Tokens

```css
--radius-xs: 4px;
--radius-sm: 6px;
--radius-md: 8px;
--radius-lg: 14px;
--radius-pill: 999px;
```

### Radius Usage

- Buttons: pill radius for primary CTAs.
- Cards and panels: `8px`.
- Media previews: `14px`, matching the rounded image treatment in the references.
- Browser-style media preview surfaces: `10px-14px`.
- Avoid oversized rounded cards unless the component is media-heavy.

## Border And Shadow Tokens

```css
--border-subtle: 1px solid var(--color-border);
--border-strong: 1px solid var(--color-border-strong);

--shadow-card: 0 12px 30px rgba(17, 18, 20, 0.06);
--shadow-panel: 0 20px 50px rgba(17, 18, 20, 0.12);
--shadow-button: 0 8px 18px rgba(11, 88, 213, 0.24);
```

Use shadows sparingly. Most cards in the reference rely on borders, light gray fills, and whitespace rather than heavy elevation.

## Texture

Dark sections use a subtle grain/noise texture over charcoal. Implement with a low-opacity radial or noise asset, or CSS noise if available.

```css
.surface-dark {
  background-color: var(--color-panel);
  color: var(--color-white);
}
```

Texture should never reduce body text or media readability. Keep dark sections high contrast and avoid heavy grain behind small copy.

## Layout Patterns

### Header

- Height: `72px-80px`.
- White background with a subtle bottom border.
- Logo left, navigation centered or left-center, utility/actions right.
- Active nav item uses `--color-text-primary`; inactive nav uses `--color-text-muted`.
- Primary account/action button uses a blue pill.

### Hero

- Two-column desktop layout: copy/stats/actions on the left, school/media preview on the right.
- Use a large headline, a short body paragraph, one primary CTA, and one text-link secondary action.
- Include compact stats below the CTA row when relevant.
- Keep media rounded and offset slightly with small technical details, but avoid clutter.

### Brand/Tool Strip

- Full-width blue band with white or light logos/icons.
- Height: `96px-120px`.
- Equal spacing between items.
- Use this pattern for school partners, certifications, curriculum platforms, technology partners, or accreditation logos.

### Section Label Tabs

- Small vertical blue tabs attached to the left edge of a section.
- Text is rotated or vertical, uppercase, white, `11px-12px`, weight `600`.
- Radius: right-side `6px`.
- Use sparingly for major sections only.

### Feature Cards

- Three-column grid on desktop; one column on mobile.
- Card background: `--color-surface`.
- Border: `--border-subtle`.
- Radius: `8px`.
- Padding: `24px`.
- Include one simple line icon, a strong title, short body copy, and a circular arrow/action affordance if clickable.
- Highlight key words in blue.

### Dark Feature Band

- Full-width charcoal section with two-column layout.
- Left column: numbered feature list.
- Right column: rounded classroom, lab, student, or curriculum media preview.
- Numeric labels use blue, small size, and tabular alignment.
- Use this for subjects, learning pathways, curriculum benefits, certifications, and hands-on technology skills.

### Media Cards

- Rounded media thumbnails with overlay controls.
- Play/action buttons are white circles with blue icon fills.
- Carousel controls are circular buttons with thin blue borders.
- Active pagination uses a short blue pill; inactive dots are light gray.

### Testimonial/Feedback Cards

- Light gray cards, small body copy, avatar row, role metadata, and rating/accent detail.
- Cards may scroll horizontally on smaller screens.
- Use this pattern for alumni quotes, parent feedback, student stories, teacher notes, or achievement highlights.

### CTA Band

- Dark rounded horizontal band.
- Large white heading on the left.
- Blue pill button on the right.
- Radius: `14px`.
- Padding: `48px-64px`.

### Footer

- White background.
- Logo and short address/status block on the left.
- Compact link columns on the right.
- Bottom legal row with subtle top border.

## Component Tokens

### Buttons

```css
.button-primary {
  min-height: 40px;
  padding: 0 20px;
  border-radius: var(--radius-pill);
  background: var(--color-brand-500);
  color: var(--color-white);
  box-shadow: var(--shadow-button);
}

.button-secondary {
  min-height: 40px;
  padding: 0 16px;
  border-radius: var(--radius-pill);
  color: var(--color-brand-600);
  background: transparent;
}

.button-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--color-brand-600);
  color: var(--color-brand-600);
  background: var(--color-white);
}
```

Button labels should be short and action-oriented. Use icons for direction, language, search, account, video, and carousel actions.

### Cards

```css
.card {
  border: var(--border-subtle);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  padding: var(--space-6);
}
```

Cards should not be nested inside other cards. Use bands or unframed layouts for larger page sections.

### Inputs

```css
.input {
  min-height: 40px;
  border: var(--border-subtle);
  border-radius: var(--radius-sm);
  background: var(--color-white);
  color: var(--color-text-primary);
  padding: 0 var(--space-3);
}

.input:focus {
  outline: 2px solid color-mix(in srgb, var(--color-brand-500) 30%, transparent);
  border-color: var(--color-brand-500);
}
```

### School Page Surfaces

- Main page background: `--color-white`.
- Alternating light sections: `--color-surface` or `--color-surface-raised`.
- Curriculum/subject band: `--color-panel` with white text and subtle grain.
- Partner strip: `--color-brand-500` or `--color-brand-600` with white logos.
- Testimonial area: white background with light gray cards.
- CTA area: dark rounded band with one strong blue action.
- Use photography or video thumbnails as real content, not decoration.

## Motion

- Hover transitions: `140ms ease`.
- Section/media transitions: `220ms ease`.
- Avoid large page animations that distract from school content.
- Buttons may translate `1px` on active press.
- Carousel and tab changes should feel quick and controlled.

```css
--motion-fast: 140ms ease;
--motion-base: 220ms ease;
```

## Responsive Rules

- Collapse two-column sections to one column below `900px`.
- Collapse three-card grids to two columns below `900px`, one column below `640px`.
- Hide or convert vertical section tabs to horizontal pills below `768px`.
- Keep button labels from wrapping where possible; if wrapping is unavoidable, increase height rather than shrinking text with viewport units.
- Maintain stable dimensions for navigation buttons, icon buttons, carousel controls, media cards, and testimonial cards to prevent layout shift.

## Accessibility

- Primary blue on white is acceptable for actions and links; use dark text for long body copy.
- White text on blue bands and charcoal sections should remain high contrast.
- Do not rely on color alone for selected states; pair blue with underline, icon, border, or fill changes.
- All icon-only buttons need accessible labels and hover tooltips.
- Focus states should be visible on keyboard navigation.

## Implementation Notes For School Landing Pages

- Use the light reference style for the hero, why-us section, school profile videos, testimonials, and footer.
- Use the dark band style for subject lists, curriculum details, skill upgrades, or technology learning tracks.
- Keep blue as the shared interaction color across navigation, CTA buttons, vertical section labels, links, and carousel states.
- Use compact cards for benefits, learning outcomes, teacher guidance, student support, testimonials, and achievement summaries.
- Prefer authentic school, classroom, lab, student, and teacher imagery over abstract illustrations.
- Avoid decorative gradient backgrounds, oversized floating cards, and one-color blue/purple interfaces.
