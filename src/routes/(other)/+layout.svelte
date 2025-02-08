<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte';
	import '../../app.css';
	let { children } = $props();
</script>

<div class="p-6 sm:p-8 flex flex-col gap-4 min-h-screen">
	<div class="flex flex-row justify-between items-center">
		<a href="/" class="flex flex-row gap-2 items-center">
			<ArrowLeft class="w-4 h-4" />
			Home</a
		>
		<h1 class="text-muted-foreground text-xs">❤️ Made by Gavesh</h1>
	</div>
	<div>
		<hr class="opacity-30 p-0 m-0" />
	</div>
	{@render children()}
</div>
