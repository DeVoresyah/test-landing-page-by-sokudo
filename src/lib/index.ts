export { default as About } from './components/About.svelte';
export { default as Button } from './components/Button.svelte';
export { default as Card } from './components/Card.svelte';
export { default as Container } from './components/Container.svelte';
export { default as Footer } from './components/Footer.svelte';
export { default as Hero } from './components/Hero.svelte';
export { default as Logo } from './components/Logo.svelte';
export { default as Navbar } from './components/Navbar.svelte';
export { default as Section } from './components/Section.svelte';
export { default as SectionHeading } from './components/SectionHeading.svelte';
export { default as StatsStrip } from './components/StatsStrip.svelte';

export { reveal } from './actions/reveal';
export type { RevealOptions } from './actions/reveal';

export {
	ctaPrimary,
	ctaSecondary,
	misi,
	nav,
	principal,
	sejarah,
	site,
	stats,
	visi
} from './config/site';
export type { NavItem, Stat } from './config/site';
