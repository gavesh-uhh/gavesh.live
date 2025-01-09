<script lang="ts">
	import { onMount } from 'svelte';
	import { ForkKnife, Book, Presentation, Pen } from 'lucide-svelte';

	let loaded = false;
	let currentDate: Date | null = null;
	let lectures: Lecture[] = [];
	let cafeteriaStatus: string = 'Loading';
	let libraryStatus: string = 'Loading';
	let lectureCount: number = 0;
	let examCount: number = 0;

	onMount(async () => {
		currentDate = new Date();
		const response = await fetch('/api/nibm?limit=5&date=' + currentDate.toISOString());
		const json = await response.json();
		lectures = json.data;

		sortLectureExams(lectures);
		predictCafetariaStatus(lectures);
		predictLibraryStatus(lectures);

		loaded = true;
	});

	const sortLectureExams = (lectures: Lecture[]) => {
		lectures.forEach((lecture) => {
			if (lecture.offset !== 0) return;
			if (lecture.exam) {
				examCount += 1;
			} else {
				lectureCount += 1;
			}
		});
	};

	const predictCafetariaStatus = (lectures: Lecture[]) => {
		if (currentDate == null) return;
		const currentHour = currentDate.getHours();
		let busyCount = 0;

		lectures.forEach((lecture) => {
			if (lecture.time == null) return;
			const [start, end] = lecture.time.split(' - ').map(cleanTime);
			const restStart = end;
			const restEnd = end + lecture.offset - 1;
			if (currentHour >= restStart && currentHour < restEnd) {
				busyCount++;
			}
		});

		if (busyCount > 10) {
			cafeteriaStatus = 'Overflowing';
		} else if (busyCount > 5) {
			cafeteriaStatus = 'Full';
		} else if (busyCount > 3) {
			cafeteriaStatus = 'Moderate';
		} else if (busyCount > 0) {
			cafeteriaStatus = 'Low';
		} else {
			cafeteriaStatus = 'Empty';
		}
	};

	const predictLibraryStatus = (lectures: Lecture[]) => {
		if (currentDate == null) return;
		const currentHour = currentDate.getHours();
		let examsInProgress = 0;

		lectures.forEach((lecture) => {
			if (!lecture.exam || lecture.time == null) return;
			const [start, end] = lecture.time.split(' - ').map(cleanTime);
			if (currentHour >= start && currentHour < end) {
				examsInProgress++;
			}
		});

		if (examsInProgress > 5) {
			libraryStatus = 'Very Busy';
		} else if (examsInProgress > 2) {
			libraryStatus = 'Busy';
		} else if (examsInProgress > 0) {
			libraryStatus = 'Relavitely Free';
		} else {
			libraryStatus = 'Quiet';
		}
	};

	const cleanTime = (time: string): number => {
		const sanitizedTime = time.replace(/am|pm/i, '').trim();
		const [hour, minute] = sanitizedTime.split(':').map(Number);
		return hour + minute / 60;
	};
</script>

<div>
	<div class="container">
		<div class="status-card">
			<h1 class="status-header">
				<Presentation class="w-4 h-4" />
				Total Lectures
			</h1>
			<h1 class="status-value">{lectureCount}</h1>
		</div>

		<div class="status-card">
			<h1 class="status-header">
				<Pen class="w-4 h-4" />
				Exams Today
			</h1>
			<h1 class="status-value">{examCount}</h1>
		</div>

		<div class="status-card">
			<h1 class="status-header">
				<ForkKnife class="w-4 h-4" />
				Cafeteria Status
			</h1>
			<h1 class="status-value">{cafeteriaStatus}</h1>
		</div>

		<div class="status-card">
			<h1 class="status-header">
				<Book class="w-4 h-4" />
				Library Status
			</h1>
			<h1 class="status-value">{libraryStatus}</h1>
		</div>
	</div>
	<div class="mt-4 opacity-25 text-xs">
		<p>
			<strong>Disclaimer:</strong> The statuses displayed for the cafeteria and library are predictions
			based on currently available data. This tool is currently still on development.
		</p>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: start;
	}

	.status-card {
		flex: 1 1 200px;
		min-width: 250px;
		max-width: 400px;
		background: linear-gradient(135deg, #2e2e2e9f, #121212);
		color: #f9f9f9;
		border: 1px solid #333;
		border-radius: 0.75rem;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: start;
		padding: 1rem;
	}

	.status-header {
		display: flex;
		gap: 4px;
		align-items: center;
		font-size: 1rem;
		color: #cccccc;
	}

	.status-value {
		font-size: 2rem;
		font-weight: 700;
		color: #ffffff;
		text-align: center;
	}
</style>

