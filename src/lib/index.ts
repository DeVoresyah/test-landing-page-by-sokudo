export { default as About } from './components/About.svelte';
export { default as AchievementsSection } from './components/AchievementsSection.svelte';
export { default as BrandStrip } from './components/BrandStrip.svelte';
export { default as Button } from './components/Button.svelte';
export { default as Card } from './components/Card.svelte';
export { default as Container } from './components/Container.svelte';
export { default as CtaBand } from './components/CtaBand.svelte';
export { default as DarkFeatureBand } from './components/DarkFeatureBand.svelte';
export { default as FaqAccordion } from './components/FaqAccordion.svelte';
export { default as Footer } from './components/Footer.svelte';
export { default as Hero } from './components/Hero.svelte';
export { default as Gallery } from './components/Gallery.svelte';
export { default as Lightbox } from './components/Lightbox.svelte';
export { default as Logo } from './components/Logo.svelte';
export { default as Navbar } from './components/Navbar.svelte';
export { default as ProgramsSection } from './components/ProgramsSection.svelte';
export { default as Section } from './components/Section.svelte';
export { default as SectionHeading } from './components/SectionHeading.svelte';
export { default as SectionLabelTab } from './components/SectionLabelTab.svelte';
export { default as StatsStrip } from './components/StatsStrip.svelte';
export { default as TestimonialsCarousel } from './components/TestimonialsCarousel.svelte';
export { default as VirtualTour } from './components/VirtualTour.svelte';

export { reveal } from './actions/reveal';
export type { RevealOptions } from './actions/reveal';

export { createSupabaseBrowserClient } from './supabase/browser';
export type { SupabaseBrowserConfig } from './supabase/types';

export {
	ctaPrimary,
	ctaSecondary,
	misi,
	nav,
	principal,
	sejarah,
	site,
	stats,
	virtualTour,
	visi
} from './config/site';
export type { NavItem, Stat } from './config/site';

export { faqs } from './data/faq';
export type { FaqItem } from './data/faq';

export { gallery, galleryCategories } from './data/gallery';
export type { GalleryCategory, GalleryItem } from './data/gallery';

export { programs } from './data/programs';
export type { Program } from './data/programs';

export { achievements, levelLabels, levelStyles } from './data/achievements';
export type { Achievement, AchievementLevel } from './data/achievements';

export type { BrandLogo } from './components/BrandStrip.svelte';
export type { DarkFeatureItem } from './components/DarkFeatureBand.svelte';
export type { Testimonial } from './components/TestimonialsCarousel.svelte';
