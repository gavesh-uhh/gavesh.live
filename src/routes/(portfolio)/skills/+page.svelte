<script>
	import Tech from './comp/Tech.svelte';
</script>

<div class="flex-1 flex flex-col gap-3">
	<h1 class="font-semibold text-muted-foreground">Skills</h1>
	<div class="flex flex-wrap gap-2 max-w-[800px] border-l-2 pl-4 border-white/40">
		<Tech techStack={'java'} techName={'Java'} />
		<Tech techStack={'csharp'} techName={'C#'} />
		<Tech techStack={'c'} techName={'Clang'} />
		<Tech techStack={'typescript'} techName={'Typescript'} />
		<Tech techStack={'javascript'} techName={'Javascript'} />
		<Tech techStack={'python'} techName={'Python'} />
	</div>
	<div class="flex flex-wrap gap-2 max-w-[800px] border-l-2 pl-4 border-white/40">
		<Tech techStack={'svelte'} techName={'Svelte'} />
		<Tech techStack={'react'} techName={'React'} />
		<Tech techStack={'html5'} techName={'HTML & CSS'} />
		<Tech techStack={'tailwindcss'} techName={'Tailwind'} />
	</div>
	<div class="flex flex-wrap gap-2 max-w-[800px] border-l-2 pl-4 border-white/40">
		<Tech techStack={'git'} techName={'Git'} />
		<Tech techStack={'linux'} techName={'Linux'} />
		<Tech techStack={'docker'} techName={'Docker'} invert={false} />
		<Tech techStack={'neovim'} techName={'Neovim'} />
		<Tech techStack={'arduino'} techName={'Arduino'} />
	</div>
</div>

<style>
</style>
