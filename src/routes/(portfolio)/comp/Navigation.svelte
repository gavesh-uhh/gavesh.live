<script lang="ts">
	import { page } from '$app/stores';
	import { Home, BookOpen, Link, SquareGanttChart } from 'lucide-svelte';
	const currRoute = $derived($page.url.pathname);
</script>

<div class=" flex flex-wrap gap-2 pt-2 w-fit rounded-3xl">
	<a href="/" class="icon" aria-current={currRoute === '/' ? 'page' : null}>
		<Home class="w-4 h-4" />
	</a>
	<a href="/projects" aria-current={currRoute === '/projects' ? 'page' : null}>
		<SquareGanttChart class="w-4 h-4" />
		Projects</a
	>
	<a href="/skills" aria-current={currRoute === '/skills' ? 'page' : null}>
		<BookOpen class="w-4 h-4" />
		Skills</a
	>
	<a href="/links" aria-current={currRoute === '/links' ? 'page' : null}>
		<Link class="w-4 h-4" />
		Links</a
	>
</div>

<style>
	a {
		background: hsl(var(--primary-foreground));
		color: hsl(var(--muted-foreground));
		display: flex;
		align-items: center;
		gap: 1rem;
		@apply px-6 py-2 rounded-3xl;
		transition: all 150ms linear;
	}

	a.icon {
		@apply px-3 py-2 rounded-3xl;
	}

	a[aria-current='page'] {
		@apply bg-accent;
		@apply font-semibold;
		@apply px-10;
	}

	a.icon[aria-current='page'] {
		@apply px-3;
	}

	a:hover {
		background: hsl(var(--muted));
	}
</style>
