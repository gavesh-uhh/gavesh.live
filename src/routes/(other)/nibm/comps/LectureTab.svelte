<script lang="ts">
	let { lecture }: { lecture: Lecture } = $props();

	const trimToLength = (str: string, length: number): string => {
		if (str.length <= length) return str;
		return str.slice(0, length) + '...';
	};

	const trimLengths = {
		default: 45,
		sm: 25,
		md: 20
	};
</script>

<div class="ring-1 relative p-4 rounded-lg ring-muted bg-muted/25">
	{#if lecture.exam}
		<div class="exam-grad"></div>
		<div class="emoticon absolute top-0 left-0 w-full h-full flex flex-row">
			<img
				src="https://media.tenor.com/Kp3Q2HiVUFQAAAAM/cat-on-fire-sitting.gif"
				class="exam-cat"
				alt=""
			/>
		</div>
	{/if}
	<div class="flex items-center w-full justify-between z-20">
		<h1 class="text-muted-foreground text-[10px] sm:text-xs md:text-sm text-right">
			{#if lecture.branch === 'SOC'}
				<span class="text-blue-500">{lecture.branch} | </span>
			{:else if lecture.branch == 'NIC'}
				<span class="text-yellow-500">{lecture.branch} | </span>
			{:else}
				<span class="text-green-500">{lecture.branch} | </span>
			{/if}
			{lecture.batch}
		</h1>
	</div>
	<div class="flex items-center gap-1 w-full justify-between z-20">
		<h1 class="text-sm sm:text-base md:text-lg font-medium">
			<span class="inline sm:hidden">
				{trimToLength(lecture.class as string, trimLengths.md)}
			</span>
			<span class="hidden sm:inline md:hidden">
				{trimToLength(lecture.class as string, trimLengths.sm)}
			</span>
			<span class="hidden md:inline">
				{trimToLength(lecture.class as string, trimLengths.default)}
			</span>
		</h1>
		<h1 class="text-muted-foreground text-[10px] sm:text-xs md:text-sm text-right">
			{lecture.lecturer}
		</h1>
	</div>
	<div class="flex items-center w-full mt-2 justify-between z-20">
		<h1 class="text-muted-foreground text-[10px] sm:text-xs md:text-sm">{lecture.floor}</h1>
		<h1 class="text-muted-foreground text-xs sm:text-sm md:text-base text-right">{lecture.time}</h1>
	</div>
</div>

<style>
	.exam-grad {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		@apply rounded-lg;
		background: rgb(162, 29, 29);
		background: linear-gradient(0deg, rgba(162, 29, 29, 0.5) -50%, rgba(0, 0, 0, 0) 80%);
	}

	.exam-cat {
		z-index: 0;
		position: absolute;
		right: 0;
		height: 100%;
		width: 20%;
		min-width: 100px;
		@apply rounded-r-lg;
		opacity: 0.4;
		object-fit: cover;
		mask-image: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
		-webkit-mask-image: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
	}
</style>
