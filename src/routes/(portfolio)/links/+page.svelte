<script lang="ts">
	import { SquareArrowOutUpRight } from 'lucide-svelte';

	type Link = {
		href: string;
		title: string;
		description?: string;
		logo?: string;
	};
</script>

<div class="flex-1 flex flex-col gap-6">
	{#snippet link(link: Link)}
		<div class="flex flex-col gap-0">
			<div class="flex items-center gap-2">
				<a
					data-sveltekit-preload-data="hover"
					href={link.href}
					class="hover:underline underline-offset-2">{link.title}</a
				>
				<SquareArrowOutUpRight class="w-4 h-4" />
			</div>
			{#if link.description}
				<p class="max-w-[400px] text-muted-foreground">{link.description}</p>
			{/if}
		</div>
	{/snippet}

	<h1 class="font-semibold text-muted-foreground">Links</h1>
	<div class="flex flex-col gap-6">
		{@render link({
			href: '/nibm',
			title: 'NIBM Lecturer Explorer',
			description:
				'Easier way of viewing lectures. Easily sort through and view where lectures are happening.'
		})}
		{@render link({
			href: '/links',
			title: 'Music History',
			description: 'View my music history and popular tracks.'
		})}
	</div>
</div>
