<script lang="ts">
	let { children, data } = $props();
	let pathname = $derived(data.pathname);
</script>

<div>
	<div class="pb-4 flex gap-2 items-center">
		<h1 class="items-center pr-2 font-bold text-blue-500 italic">NIBM</h1>
		<a href="/nibm" aria-current={pathname === '/nibm' ? 'true' : null}>Home</a>
		<a href="/nibm/lectures" aria-current={pathname === '/nibm/lectures' ? 'true' : null}
			>Lectures</a
		>
	</div>
	<div>
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
	a {
		transition: all 150ms linear;
		@apply bg-white text-black rounded-3xl px-6 py-2;
		opacity: 60%;
	}

	a[aria-current='true'] {
		@apply font-bold;
		@apply px-8;
		opacity: 100%;
	}
</style>
