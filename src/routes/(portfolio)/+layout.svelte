<script lang="ts">
	import '../../app.css';
	import Header from './comp/Header.svelte';
	import Navigation from './comp/Navigation.svelte';
	import Canvas from './comp/Canvas.svelte';
	import { fade } from 'svelte/transition';
	let { children, data } = $props();
	let pathname = $derived(data);
</script>

<svelte:head>
	<title>Gavesh Saparamadu</title>
</svelte:head>

<div class="py-10 px-8 sm:py-16 sm:px-14 flex flex-col min-h-screen gap-6">
	<Canvas />
	<div class="z-20 flex flex-col gap-6">
		<Header />
		<Navigation />
		<hr class="opacity-35" />
		{#key pathname}
			<div in:fade={{ duration: 450, delay: 0 }} out:fade={{ duration: 0, delay: 0 }}>
				{@render children()}
			</div>
		{/key}
	</div>
</div>
