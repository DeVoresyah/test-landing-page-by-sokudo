import type { Action } from 'svelte/action';

export type RevealOptions = {
	delay?: number;
	threshold?: number;
	rootMargin?: string;
	once?: boolean;
};

const SUPPORTS_IO = typeof window !== 'undefined' && 'IntersectionObserver' in window;
const PREFERS_REDUCED =
	typeof window !== 'undefined' &&
	typeof window.matchMedia === 'function' &&
	window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const reveal: Action<HTMLElement, RevealOptions | undefined> = (node, options) => {
	const opts: Required<RevealOptions> = {
		delay: 0,
		threshold: 0.15,
		rootMargin: '0px 0px -10% 0px',
		once: true,
		...(options ?? {})
	};

	node.classList.add('reveal');
	if (opts.delay) node.style.setProperty('--reveal-delay', `${opts.delay}ms`);

	if (!SUPPORTS_IO || PREFERS_REDUCED) {
		node.classList.add('reveal-in');
		return {};
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.add('reveal-in');
					if (opts.once) observer.unobserve(node);
				} else if (!opts.once) {
					node.classList.remove('reveal-in');
				}
			}
		},
		{ threshold: opts.threshold, rootMargin: opts.rootMargin }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
};
