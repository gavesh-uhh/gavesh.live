<script lang="ts">
	import '../../app.css';
	import Background from './comp/Background.svelte';
	import Header from './comp/Header.svelte';
	import Navigation from './comp/Navigation.svelte';
	import { fade } from 'svelte/transition';
	let { children, data } = $props();
	let pathname = $derived(data);
</script>

<svelte:head>
	<title>Gavesh Saparamadu</title>
</svelte:head>

<div class="relative py-10 px-8 sm:py-20 sm:px-16 flex flex-col min-h-screen gap-6">
	<div class="z-20 flex flex-col gap-6">
		<Background />
		<Header />
		<Navigation />
		<hr class="opacity-25" />
		{#key pathname}
			<div in:fade={{ duration: 450, delay: 0 }} out:fade={{ duration: 0, delay: 0 }}>
				{@render children()}
			</div>
		{/key}
	</div>
</div>
