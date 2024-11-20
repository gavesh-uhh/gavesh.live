<script lang="ts">
	let { lecture }: { lecture: Lecture } = $props();
</script>

<div class="ring-1 p-4 rounded-lg ring-muted bg-muted/25">
	<div class="flex items-center w-full justify-between">
		<h1 class="text-muted-foreground text-xs text-right">{lecture.branch}</h1>
	</div>
	<div class="flex items-center gap-1 w-full justify-between">
		<h1 class="text-lg font-medium">{lecture.class}</h1>
		<h1 class="text-muted-foreground text-sm text-right">{lecture.lecturer}</h1>
	</div>
	<div class="flex items-center w-full mt-2 justify-between">
		<h1 class="text-muted-foreground text-xs">{lecture.floor}</h1>
		<h1 class="text-muted-foreground text-sm">{lecture.time}</h1>
	</div>
</div>
