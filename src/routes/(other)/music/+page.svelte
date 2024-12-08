<script lang="ts">
	import { onMount } from 'svelte';

	type MusicResponse = {
		name: string;
		artist: string;
		album: string;
		cover: string;
	};

	const music: MusicResponse[] = $state([]);

	onMount(async () => {
		const response = await fetch('/api/lastfm');
		const data = await response.json();
		const tracks = data.tracks;
		tracks.forEach(
			(track: {
				name: any;
				artist: { [x: string]: any };
				album: { [x: string]: any };
				image: { [x: string]: any }[];
			}) => {
				music.push({
					name: track.name,
					artist: track.artist['#text'],
					album: track.album['#text'],
					cover: track.image[3]['#text']
				});
			}
		);
	});
</script>

<div class="parent">
	<div class="flex flex-col gap-4">
		<h1>Recent Tracks (Scroll Horizontally)</h1>
		<div
			class="flex flex-col sm:flex-row gap-6 sm:gap-12 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
		>
			{#each music as m}
				<div class="flex-shrink-0 flex flex-row gap-4 max-w-[600px]">
					<img
						src={m.cover}
						alt="music cover"
						class="rounded-lg w-20 sm:w-40 h-20 sm:h-40 object-cover"
					/>
					<div>
						<h1 class="text-lg sm:text-2xl font-bold">{m.name}</h1>
						<h1 class="text-muted-foreground">by {m.artist}</h1>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.parent {
		scrollbar-width: none;
	}
	.parent {
		-ms-overflow-style: none;
	}
	::-webkit-scrollbar,
	::-webkit-scrollbar-button {
		display: none;
	}
</style>
