<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	let linkExists = $state(true);
	try {
		if (data.url) {
			window.location.href = data.url;
		} else {
			linkExists = false;
		}
	} catch (error) {
		linkExists = false;
	}
</script>

{#if !linkExists}
	<div class="flex-1 h-full items-center flex justify-center flex-col gap-2">
		<h1 class="text-2xl font-bold text-center">404 : Cannot find shortend link?</h1>
		<a href="/" class="underline underline-offset-2">Return To Home</a>
	</div>
{:else}
	<div class="flex-1 h-full items-center flex justify-center flex-col gap-2">
		<h1 class="text-2xl font-bold text-center">Redirecting..</h1>
	</div>
{/if}
