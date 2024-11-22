<script lang="ts">
	const {
		techStack,
		techName,
		invert
	}: { techStack: string; techName: string; invert?: boolean | null } = $props();
</script>

<div
	class="flex flex-row items-center px-6 py-3 ring-1 ring-border w-fit gap-8 rounded-3xl hover:rounded-2xl bg-muted/25 hover:bg-muted/50 transition-all duration-300 cursor-pointer"
>
	<h1 class="text-muted-foreground">{techName}</h1>
	<img
		alt={techStack}
		class={`w-[30px] h-[30px] rounded-md ${invert == true ? 'invert' : ''}`}
		src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${techStack}/${techStack}-original.svg`}
	/>
</div>
