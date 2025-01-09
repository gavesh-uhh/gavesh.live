<script lang="ts">
	import { Loader2, Trash, Share } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import LectureTab from './comps/LectureTab.svelte';
	let lectures: Lecture[] = $state([]);
	let currentDate: Date | undefined = $state();
	let currentBranch: string = $state('SOC');
	let loaded = $state(false);
	let searchTerm = $state('');
	let offset = $state(0);

	const toggleBranch = () => {
		const branches = ['SOC', 'NIC', 'SOB', 'all'];
		const currentIndex = branches.indexOf(currentBranch);
		const nextIndex = (currentIndex + 1) % branches.length;
		currentBranch = branches[nextIndex];
	};

	onMount(async () => {
		const urlParams = new URLSearchParams(window.location.search);
		currentBranch = urlParams.get('branch') ?? 'SOC';
		searchTerm = urlParams.get('q') ?? '';
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
		if (currentDate == undefined) return 'Weirday';
		const newDate = new Date(currentDate);
		newDate.setDate(newDate.getDate() + offset);
		return newDate.toLocaleDateString('en-US', { weekday: 'long' });
	};

	const getRandomQuote = () => {
		const quotes = [
			'Why hurry? Your lecturer will start 10 minutes late anyway.',
			'Fun fact: This page is as reliable as the Wi-Fi in the lecture halls.',
			'Almost there... or maybe not.',
			'If this takes too long, blame the admin department.',
			'Loading... because skipping class isn’t an option. Or is it?',
			'Still loading... unlike the uni elevators.'
		];
		return quotes[Math.floor(Math.random() * quotes.length)];
	};

	const validateSearchQuery = (lecture: Lecture): boolean => {
		if (
			lecture.class?.trim().toLowerCase().startsWith(searchTerm.toLowerCase()) ||
			lecture.lecturer?.trim().toLowerCase().startsWith(searchTerm.toLowerCase()) ||
			lecture.batch?.trim().toLowerCase().startsWith(searchTerm.toLowerCase()) ||
			lecture.floor?.trim().toLowerCase().startsWith(searchTerm.toLowerCase()) ||
			lecture.branch?.trim().toLowerCase().startsWith(searchTerm.toLowerCase())
		) {
			return true;
		}
		return false;
	};

	const getBranchColorClass = () => {
		if (currentBranch === 'SOC') return 'bg-blue-500';
		if (currentBranch === 'SOB') return 'bg-green-500';
		if (currentBranch === 'NIC') return 'bg-yellow-500';
		return 'bg-muted';
	};
</script>

<svelte:head>
	<title>NIBM : Lectures</title>
	<meta name="title" content="NIBM Lecturer Explorer" />
	<meta name="description" content="Sort through today's lectures" />
	<meta name="keywords" content="nibm" />
	<meta name="robots" content="index, follow" />
	<meta name="language" content="English" />
	<meta name="revisit-after" content="4 days" />
	<meta name="author" content="Gavesh Saparamadu" />
</svelte:head>

<div class="h-full flex-1 flex gap-4 flex-col">
	<div class="flex-1 flex flex-wrap gap-2">
		<div class="flex-shrink-0">
			<button class="px-2 branch-select {getBranchColorClass()}" onclick={toggleBranch}>
				Branch : {currentBranch.toUpperCase()}
			</button>
		</div>

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
				searchTerm = 'EXAM';
			}}
			aria-current={searchTerm === 'EXAM' ? 'true' : null}>Exams</button
		>
	</div>

	<div class="flex flex-row gap-2 items-center flex-nowrap">
		<input
			class="bg-muted rounded-lg flex-grow h-10 px-4 text-sm"
			bind:value={searchTerm}
			type="text"
			placeholder="Search (Example - DSE24.2F, Harison Hall)"
		/>
		<button
			onclick={() => {
				searchTerm = '';
			}}
			class="p-2 rounded-lg bg-destructive flex-shrink-0 flex items-center justify-center h-10 w-10"
		>
			<Trash class="w-4 h-4 opacity-50 text-white" />
		</button>
	</div>

	{#if loaded}
		<div class="fixed bottom-10 p-4 z-20 left-0 w-full flex items-center justify-center">
			<div
				class=" flex flex-row items-center justify-center gap-2 w-fit p-2 bg-black/80 rounded-3xl"
			>
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
		</div>
	{/if}
	<div class="flex flex-col gap-2">
		{#if loaded}
			{#if lectures.filter((lecture) => validateSearchQuery(lecture) && lecture.offset === offset).length === 0}
				<div class="flex-1 my-10 h-full justify-center gap-4 items-center flex flex-col">
					{#if searchTerm !== ''}
						{#if searchTerm === '3wheel' || searchTerm === 'threewheel'}
							<img
								class="max-w-[200px] rounded-lg"
								src="https://utfs.io/f/TIFafgpE6s0cjQTCkW5AtlqTDP2LFM9ihae3cYfmysz06bxO"
								alt=""
							/>
							<h1>Certified Orugodawatta Moment</h1>
						{:else}
							<h1 class="text-sm text-muted-foreground">No lectures found for "{searchTerm}".</h1>
							<img
								class="max-w-[200px] rounded-lg"
								src="https://media1.tenor.com/m/0EDznml5BDAAAAAC/cat-spinning.gif"
								alt=""
							/>
						{/if}
					{:else}
						<span class="text-muted-foreground">No Lectures Today 👍</span>
					{/if}
				</div>
			{/if}
			{#each lectures as lecture}
				{#if lecture.branch === currentBranch || currentBranch === 'all'}
					{#if validateSearchQuery(lecture)}
						{#if lecture.offset === offset}
							<LectureTab {lecture} />
						{/if}
					{:else if searchTerm === ''}
						{#if lecture.offset === offset}
							<LectureTab {lecture} />
						{/if}
					{/if}
				{/if}
			{/each}
		{:else}
			<div class="mt-10 flex-1 h-full justify-center gap-4 items-center flex flex-col">
				<Loader2 class="animate-spin" />
				<h1 class="text-xs text-muted-foreground">{getRandomQuote()}</h1>
			</div>
		{/if}
	</div>
</div>

<style>
	.branch-select {
		@apply px-5 py-2 rounded-xl text-xs sm:text-base;
		transition: all 150ms ease-out;
	}

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
