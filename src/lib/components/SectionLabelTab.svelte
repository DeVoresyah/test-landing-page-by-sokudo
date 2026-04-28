<script lang="ts">
	type Props = {
		label: string;
		class?: string;
	};

	let { label, class: className = '' }: Props = $props();
</script>

<!--
	DESIGN.md: small vertical blue tab attached to a section's left edge, with
	rotated uppercase 11–12px label and a 6px right radius. Below md (768px)
	it collapses into a horizontal pill so it stays legible on phones.

	Place inside a `position: relative` parent (e.g. a Section) so the
	desktop variant can absolute-position itself against the viewport edge.
-->
<span class="contents {className}">
	<!-- desktop / tablet: vertical tab on the left edge -->
	<span
		aria-hidden="true"
		class="pointer-events-none absolute top-12 left-0 hidden origin-top-left rotate-180 rounded-r-[6px] bg-primary-500 px-3 py-2 text-[11px] font-semibold tracking-[0.22em] whitespace-nowrap text-white uppercase shadow-button md:inline-block"
		style="writing-mode: vertical-rl;"
	>
		{label}
	</span>

	<!-- mobile: horizontal pill -->
	<span
		class="mb-4 inline-flex items-center rounded-full bg-primary-500 px-3 py-1 text-[11px] font-semibold tracking-[0.22em] text-white uppercase shadow-button md:hidden"
	>
		{label}
	</span>
</span>
