# Design References — SMA Harapan Bangsa Landing

This file captures the visual directions we considered before building the
shared shell. The actual screenshots couldn't be saved here (the agent that
built TASK-002 didn't have browser access at the time), but the rationale
below is the brief future ticket workers should design against.

## Search corpus

Dribbble queries that surface the right inspiration corpus for this project:

- `school landing page`
- `university website`
- `education landing`
- `sekolah website` (Indonesian, narrower but useful)
- `student portal hero`

## Direction A — Soft, gradient-accented (CHOSEN)

> Clean white canvas, generous whitespace, one bold gradient accent
> (`primary-500 → panel-800`, with `warm-*` as the support accent) used sparingly:
> the headline accent word, the logo mark, the primary CTA. Photography sits in rounded `rounded-3xl`
> frames with a thin gradient border. Stat cards are soft-bordered with
> subtle hover lift.

Why this one:

- Matches the DESIGN.md token direction: brand-blue `primary`, charcoal
  `panel`, and restrained `warm` accents.
- Reads as modern + trustworthy in the Indonesian high-school context —
  important for parents, who are the actual decision-makers for SMA
  enrollment.
- Easy for downstream tickets (Hero, Programs, Gallery) to extend without
  fighting the system.

Inspiration cues from Dribbble: most of the clean SaaS-style education
landings (e.g. Coursera/Brilliant clones) and the more polished Indonesian
school redesigns lean this way.

## Direction B — Editorial, warm + photographic

Big photo hero, serif display headline, ochre/cream palette, lots of body
copy. Skipped because (a) it asks for high-quality original photography we
don't yet have, and (b) the token system now uses warm only as an accent,
not as the dominant surface color.

## Direction C — Playful, illustrated

Custom illustrations of students, soft pastel blobs, hand-drawn
underlines. Skipped because it raises the asset bar significantly (we'd
need a custom illustrator) and skews younger than the SMA audience.

## What this means for the shared primitives

- **Navbar**: white/translucent, sticky, thin shadow on scroll, logo mark
  uses the brand gradient.
- **Footer**: dark `neutral-900` slab with the gradient repeated in the
  logo only — keeps it grounded.
- **Buttons**: pill-shaped (`rounded-full`), gradient or solid primary,
  outlined secondary, transparent ghost.
- **Cards**: white, `rounded-2xl`, soft border (`neutral-200`), hover lift.
- **Section vertical rhythm**: `py-16 lg:py-24` as the baseline so feature
  sections breathe.
