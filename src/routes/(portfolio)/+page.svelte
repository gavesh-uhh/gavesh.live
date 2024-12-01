<script lang="ts">
	import { Coffee, SquareArrowOutUpRight } from 'lucide-svelte';

	let responseLoading = $state(false);
	let initialLoaded = $state(false);
	let latestResponse = $state('Testing purposes');

	type GeminiResponse = {
		original: string;
		response: {
			content: string;
			emoji: string;
		};
	};

	const getResponse = async (q: string) => {
		initialLoaded = true;
		responseLoading = true;
		const response = await fetch('/api/gemini?q=' + q);
		const data: GeminiResponse = await response.json();
		latestResponse = data.response.emoji + ' ' + data.response.content;
		responseLoading = false;
	};
</script>

<div class="flex-1 flex flex-col gap-10">
	<div>
		<h1 class="font-semibold text-muted-foreground">About Me</h1>
		<p>
			18-year-old student from <span class="text-blue-500">Colombo, Sri Lanka</span> with an avid love
			for Tech, Software, Aeronautics and Minimalism.
		</p>
	</div>

	<div>
		<h1 class="font-semibold text-muted-foreground">Ask questions with AI</h1>
		<div class="flex gap-4 mt-4">
			<div class="relative w-fit">
				<button
					onclick={() => {
						if (!responseLoading) getResponse('Give a summary about you');
					}}
					class="relative transition-all duration-300 text-xs bg-accent/80 hover:bg-accent/85 ring-2 ring-primary-foreground/70 z-10 px-4 py-2 rounded-lg hover:brightness-110"
				>
					{#if responseLoading}
						<span class="animate-spin">📦</span> Loading ...
					{:else}
						🤔 Who are u?
					{/if}
				</button>
				<div
					class="absolute inset-0 w-full h-full rounded-lg bg-gradient-to-r from-[#4158D0] via-[#C850C0] to-[#FFCC70] blur-sm opacity-100 -z-10 group-hover:animate-pulse"
				></div>
			</div>
			<div class="relative w-fit">
				<button
					onclick={() => {
						if (!responseLoading) getResponse('How old are u?');
					}}
					class="relative transition-all duration-300 text-xs bg-accent/80 hover:bg-accent/85 ring-2 ring-primary-foreground/70 z-10 px-4 py-2 rounded-lg hover:brightness-110"
				>
					{#if responseLoading}
						<span class="animate-spin">📦</span> Loading ...
					{:else}
						🎂 How old are u?
					{/if}
				</button>
				<div
					class="absolute inset-0 w-full h-full rounded-lg bg-gradient-to-r from-[#4158D0] via-[#C850C0] to-[#FFCC70] blur-sm opacity-100 -z-10 group-hover:animate-pulse"
				></div>
			</div>
		</div>
		{#if initialLoaded}
			<div
				class="py-3 px-3 mt-4 rounded-lg w-fit min-w-[200px] border-l-4 border-[rgba(255,255,255,0.5)]"
			>
				<h1>✨ AI Response:</h1>
				{#if !responseLoading}
					<p class="mt-2 text-muted-foreground text-xs max-w-[300px]">{latestResponse}</p>
				{:else}
					<p class="mt-2 text-muted-foreground text-xs">Loading...</p>
				{/if}
			</div>
		{/if}
	</div>

	<div>
		<h1 class="font-semibold text-muted-foreground">Skillset Overview</h1>
		<p>- Generalist, Fullstack</p>
		<p>- Java, C#, C++</p>
		<p>- Svelte, React, Tailwind</p>
	</div>

	<div>
		<h1 class="font-semibold text-muted-foreground">Interests</h1>
		<p>- Embedded Tech</p>
		<p>- AI/ML</p>
	</div>

	<div>
		<h1 class="font-semibold text-muted-foreground">Contact</h1>
		<div class="flex flex-col">
			<div class="py-0">
				<a
					href="https://github.com/gavesh-uhh"
					class="underline-offset-0 hover:underline flex flex-row gap-2 w-fit h-fit items-center"
				>
					<SquareArrowOutUpRight class="w-4 h-4" />
					Github</a
				>
				<a
					href="https://www.linkedin.com/in/gavesh-saparamadu/"
					class="underline-offset-0 hover:underline flex flex-row gap-2 w-fit h-fit items-center"
				>
					<SquareArrowOutUpRight class="w-4 h-4" />
					LinkedIn</a
				>
				<a
					href="https://www.instagram.com/gavesh.uhh/"
					class="underline-offset-0 hover:underline flex flex-row gap-2 w-fit h-fit items-center"
				>
					<img
						src="https://cdn.iconscout.com/icon/free/png-256/free-instagram-logo-icon-download-in-svg-png-gif-file-formats--social-media-pack-logos-icons-1581910.png?f=webp&w=256"
						class="w-4 h-4"
						alt="Instagram Logo"
					/>
					Instagram</a
				>

				<a
					href="https://buymeacoffee.com/gaveshsaparamadu"
					class="underline-offset-0 hover:underline flex flex-row gap-2 w-fit h-fit items-center"
				>
					<Coffee class="w-4 h-4" />
					Buy a Coffee</a
				>
			</div>
		</div>
	</div>
</div>
