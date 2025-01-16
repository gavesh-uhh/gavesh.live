<script lang="ts">
	import { goto } from '$app/navigation';

	let { children, data } = $props();
	let pathname = $derived(data.pathname);

	// commit: hehe
	if (Math.random() < 0.01) {
		goto('https://www.youtube.com/watch?v=rdlrtFOACz8');
	}
</script>

<div>
	<div class="pb-1 pt-1 flex gap-2 items-center mb-3">
		<a href="/nibm/help" class="icon" aria-current={pathname === '/nibm/help' ? 'true' : null}>?</a>
		<a href="/nibm" aria-current={pathname === '/nibm' ? 'true' : null}>Stats</a>
		<a href="/nibm/lectures" aria-current={pathname === '/nibm/lectures' ? 'true' : null}
			>Lectures</a
		>
	</div>
	<div class="">
		{@render children()}
	</div>
</div>

<svelte:head>
	<title>NIBM : Stats</title>
	<meta name="title" content="NIBM Lecturer Explorer" />
	<meta name="description" content="Sort through today's lectures" />
	<meta name="keywords" content="nibm" />
	<meta name="robots" content="index, follow" />
	<meta name="language" content="English" />
	<meta name="revisit-after" content="4 days" />
	<meta name="author" content="Gavesh Saparamadu" />
</svelte:head>

<style>
	@property --nibm-navbar-grad {
		syntax: '<color>';
		initial-value: #2e2e2e9f;
		inherits: false;
	}

	a.icon {
		@apply px-4 py-2 rounded-3xl;
	}

	a {
		background: linear-gradient(135deg, var(--nibm-navbar-grad), #121212);
		color: #f9f9f9;
		border: 1px solid #333;
		border-radius: 0.75rem;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
		transition: all 150ms linear;
		@apply px-6 py-2 rounded-3xl;
		opacity: 60%;
	}

	a[aria-current='true'] {
		@apply font-bold;
		@apply px-8;
		--nibm-navbar-grad: #2e2e2eff;
		opacity: 100%;
	}

	a.icon[aria-current='true'] {
		@apply font-bold;
		@apply px-4 py-2 rounded-3xl;
		--nibm-navbar-grad: #2e2e2eff;
		opacity: 100%;
	}
</style>
