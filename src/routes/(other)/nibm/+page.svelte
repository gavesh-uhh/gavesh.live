<script lang="ts">
	import { Loader2, Trash } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import LectureTab from './comps/LectureTab.svelte';
	let lectures: Lecture[] = $state([]);
	let currentDate: Date;

	let loaded = $state(false);
	let searchTerm = $state('');
	let offset = $state(0);

	onMount(async () => {
		currentDate = new Date();
		const response = await fetch('/api/nibm?limit=5&date=' + currentDate);
		const json = await response.json();
		const data = json.data;
		data.forEach((element: Lecture) => {
			lectures = [...lectures, element];
		});
		loaded = true;
	});

	const getDay = (offset: number): string => {
		const newDate = new Date(currentDate);
		newDate.setDate(newDate.getDate() + offset);
		return newDate.toLocaleDateString('en-US', { weekday: 'long' });
	};

	const getRandomQuote = () => {
		const quotes = [
			'This loading screen is brought to you by bad optimization.',
			'Still faster than your internet connection.',
			'Fun fact: Loading screens load nothing.',
			'Patience is a feature, not a bug.',
			'Yes, this is necessary. Trust us.',
			'The progress bar isn’t stuck—it’s meditating.',
			'This loading bar is purely decorative.',
			'Almost there... or maybe not.',
			'Time flies when you’re not staring at a loading screen.'
		];
		return quotes[Math.floor(Math.random() * quotes.length)];
	};
</script>

<svelte:head>
	<title>NIBM Lecture Explorer</title>
	<meta name="title" content="NIBM Lecturer Explorer" />
	<meta name="description" content="Sort through today's lectures" />
	<meta name="keywords" content="nibm" />
	<meta name="robots" content="index, follow" />
	<meta name="language" content="English" />
	<meta name="revisit-after" content="4 days" />
	<meta name="author" content="Gavesh Saparamadu" />
</svelte:head>

<div class="h-full flex-1 flex gap-4 flex-col">
	<div>
		<h1 class="text-3xl font-bold">NIBM Explorer</h1>
		<p class="text-muted-foreground">Easily sort through pages of lectures.</p>
	</div>
	<div class="mt-2 flex-1 flex flex-row gap-2">
		<button
			class="tag"
			onclick={() => {
				searchTerm = 'DSE24.2F';
			}}
			aria-current={searchTerm === 'DSE24.2F' ? 'true' : null}>DSE24.2F</button
		>
		<button
			class="tag"
			onclick={() => {
				searchTerm = 'REPEATERS';
			}}
			aria-current={searchTerm === 'REPEATERS' ? 'true' : null}>Repeating Exams</button
		>
	</div>

	<div class="flex flex-row gap-2 items-center">
		<input
			class="bg-muted rounded-lg w-full h-10 px-4"
			bind:value={searchTerm}
			type="text"
			placeholder="Search (Example - DSE24.2F)"
		/>
		<button
			onclick={() => {
				searchTerm = '';
			}}
			class="p-2 rounded-lg bg-destructive flex items-center justify-center h-10 w-10"
		>
			<Trash class="w-4 h-4 opacity-50 text-white" />
		</button>
	</div>
	{#if loaded}
		<div class="flex flex-row items-center justify-center gap-2">
			<button
				class="offset"
				aria-current={offset == 0 ? 'true' : null}
				onclick={() => {
					offset = 0;
				}}>Today</button
			>
			<button
				class="offset"
				aria-current={offset == 1 ? 'true' : null}
				onclick={() => {
					offset = 1;
				}}>Tomorrow</button
			>

			<button
				class="offset"
				aria-current={offset == 2 ? 'true' : null}
				onclick={() => {
					offset = 2;
				}}>Next {getDay(2)}</button
			>
		</div>
	{/if}
	<div class="flex flex-col gap-2">
		{#if loaded}
			{#each lectures as lecture}
				{#if lecture.branch?.startsWith(searchTerm)}
					{#if lecture.offset === offset}
						<LectureTab {lecture} />
					{/if}
				{:else if searchTerm === ''}
					{#if lecture.offset === offset}
						<LectureTab {lecture} />
					{/if}
				{/if}
			{/each}
		{:else}
			<div class="mt-10 flex-1 h-full justify-center gap-2 items-center flex">
				<h1>Loading ({getRandomQuote()})</h1>
				<Loader2 class="animate-spin" />
			</div>
		{/if}
	</div>
	{#if loaded}
		<footer>
			<p class="text-muted-foreground text-xs">{currentDate}</p>
		</footer>
	{/if}
</div>

<style>
	.offset[aria-current='true'] {
		@apply bg-blue-900;
	}

	.offset {
		@apply px-4 py-2 rounded-3xl text-xs sm:text-base;
		@apply bg-muted;
		transition: all 150ms ease-out;
	}

	.tag {
		@apply px-4 py-2 rounded-3xl text-xs sm:text-base;
		@apply bg-muted;
		transition: all 150ms ease-out;
	}

	.tag[aria-current='true'] {
		@apply bg-yellow-500 text-black;
	}
</style>
