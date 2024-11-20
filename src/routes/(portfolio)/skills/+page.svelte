<script>
	import Tech from './comp/Tech.svelte';
</script>

<div class="flex-1 flex flex-col gap-5">
	<h1 class="font-semibold text-muted-foreground">Skills</h1>
	<div class="flex flex-wrap gap-2">
		<Tech techStack={'java'} techName={'Java'} />
		<Tech techStack={'javascript'} techName={'Javascript'} />
		<Tech techStack={'typescript'} techName={'Typescript'} />
		<Tech techStack={'c'} techName={'Clang'} />
		<Tech techStack={'csharp'} techName={'C#'} />
	</div>
	<div class="w-full flex py-4 justify-center items-center">
		<hr class="opacity-15 min-w-[150px] w-[80%]" />
	</div>
	<div class="flex flex-wrap gap-2">
		<Tech techStack={'svelte'} techName={'Svelte'} />
		<Tech techStack={'react'} techName={'React'} />
	</div>
	<div class="w-full flex py-4 justify-center items-center">
		<hr class="opacity-15 min-w-[150px] w-[80%]" />
	</div>

	<div class="flex flex-wrap gap-2">
		<Tech techStack={'git'} techName={'Git'} />
		<Tech techStack={'linux'} techName={'Linux'} />
		<Tech techStack={'docker'} techName={'Docker'} invert={false} />
		<Tech techStack={'neovim'} techName={'Neovim'} />
	</div>
</div>

<style>
</style>
