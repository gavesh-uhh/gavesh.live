<script lang="ts">
	import { onMount } from 'svelte';
	import Paper from './comps/Paper.svelte';

	let papers: NIBM_Paper[] = $state([]);
	let searchBar: HTMLInputElement;
	let keywordBar: HTMLInputElement;

	const getPapers = async (query: string) => {
		const response = await fetch(getURL(query));
		const data = await response.json();
		return data;
	};

	const getURL = (searchTerm: string) => {
		const baseURL =
			'https://nibmehub.com/opac-service/resources/online/v2/resources?role=4&languageCode=All&catalogueCode=11&pageSize=15&sortBy=id&sortOrder=desc';
		const search = '&title=' + searchTerm;
		return searchTerm ? baseURL + search : baseURL;
	};

	const mountPapers = async () => {
		console.log('Mounting');
		papers = [];
		const searchTerm = searchBar.value || '';
		getPapers(searchTerm).then((data) => {
			let paperSet = data.content;
			for (const x of paperSet) {
				if (!x.id) continue;
				console.log(x);
				papers.push({
					id: x.id,
					title: x.batch + ' ' + x.nibmSubject.name,
					thumbnail: 'https://nibmehub.com/opac-service/resources/downloadimage/' + x.id,
					url: 'https://nibmehub.com/opac-service/pdf/read/' + x.docName
				});
			}
		});
	};

	const downloadAllPapers = async () => {
		papers.forEach(async (paper) => {
			try {
				const keyword = keywordBar.value || '';
				if (keyword && !paper.title.toLowerCase().includes(keyword.toLowerCase())) {
					return;
				}
				const response = await fetch(paper.url);
				const blob = await response.blob();
				const url = window.URL.createObjectURL(blob);
				const link = document.createElement('a');
				link.href = url;
				link.download = paper.title + '.pdf';
				link.click();
				window.URL.revokeObjectURL(url);
			} catch (error) {
				console.error('Error downloading the file:', error);
			}
		});
	};

	onMount(() => {
		mountPapers();
	});
</script>

<svelte:head>
	<title>NIBM : Papers</title>
	<meta name="title" content="NIBM Lecturer Explorer" />
	<meta name="description" content="Sort through today's lectures" />
	<meta name="keywords" content="nibm" />
	<meta name="robots" content="index, follow" />
	<meta name="language" content="English" />
	<meta name="revisit-after" content="4 days" />
	<meta name="author" content="Gavesh Saparamadu" />
</svelte:head>

<div class="flex flex-col items-center gap-4 w-full mx-auto">
	<div class="w-full">
		<h1 class="font-bold mb-2">Search Papers</h1>
		<input
			type="text"
			bind:this={searchBar}
			oninput={mountPapers}
			placeholder="Example: DBMS, ECS"
			class="search-input w-full p-3 placeholder:px-1"
		/>
	</div>
	<div class="flex flex-row justify-end gap-2 w-full">
		<input bind:this={keywordBar} placeholder="Keyword" class="search-input" type="text" />
		<button class="px-4 py-2" onclick={downloadAllPapers}>Download All </button>
	</div>
	<div class="grid gap-4 w-full">
		{#each papers as paper}
			<Paper {paper} />
		{/each}
	</div>
</div>

<style>
	.search-input {
		border-radius: 8px;
		background: linear-gradient(135deg, var(--nibm-navbar-grad), #121212);
		color: #f9f9f9;
		border: 1px solid #333;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
		font-size: 1rem;
	}

	.search-input:focus {
		outline: none;
		border-color: #007bff;
		box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
	}

	button {
		border-radius: 8px;
		background: linear-gradient(135deg, var(--nibm-navbar-grad), #121212);
		color: #f9f9f9;
		border: 1px solid #333;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
		font-size: 1rem;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
		justify-content: center;
		align-content: center;
		width: 100%;
		margin: 0 auto;
	}
</style>
