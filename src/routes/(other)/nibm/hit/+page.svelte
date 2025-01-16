<script lang="ts">
	import { PersonStanding, Search } from 'lucide-svelte';
	let inputBind: HTMLInputElement;
	let loading = false;
	let personData: PersonResponse | null = null;

	let count = 0;

	type PersonResponse = {
		active: boolean;
		id: number;
		prefix?: string;
		name: string;
		mobile_phone?: string;
		land_phone?: string;
		address?: string;
		nic?: string;
	};

	const blackListed: String[] = [
		'CODSE242F-005@student.nibm.lk',
		'CODSE242F-012@student.nibm.lk',
		'CODSE242F-014@student.nibm.lk',
		'CODSE242F-026@student.nibm.lk',
		'CODSE242F-056@student.nibm.lk',
		'CODSE242F-064@student.nibm.lk',
		'CODSE242F-074@student.nibm.lk',
		'CODSE242F-057@student.nibm.lk',
		'CODSE242F-097@student.nibm.lk',
		'CODSE242F-009@student.nibm.lk',
		'CODSE242F-037@student.nibm.lk',
		'CODSE242F-052@student.nibm.lk',
		'CODSE242F-110@student.nibm.lk'
	];

	async function searchPeople() {
		loading = true;
		personData = null; // Clear previous data
		const query = inputBind.value.trim();
		if (query === '' || query == null) {
			loading = false;
			return;
		}
		const normalizedQuery = query.trim().toLowerCase();
		if (blackListed.some((email) => email.toLowerCase() === normalizedQuery)) {
			alert('This person is protected by the 2nd Amendment');
			loading = false;
			return;
		}
		personData = await getDetails(query);
		loading = false;
	}

	async function getDetails(email: String): Promise<PersonResponse> {
		let person: PersonResponse = {
			active: false,
			id: -1,
			name: ''
		};
		const response = await fetch(
			`https://nibmehub.com/opac-service/user/userheader/findbyname/${email}`
		);
		const data = await response.json();
		if (data == null) return person;
		console.log(data);
		person.active = data.active;
		person.id = data.id;
		person.name = data.firstName.trim() + ' ' + data.lastName.trim();
		person.mobile_phone = data.mobilePhone;
		person.land_phone = data.landLine;
		person.prefix = data.title?.name;
		person.address = `${data.no ?? ''}, ${data.street ?? ''}, ${data.city ?? ''}`.trim();
		if (person.address.trim() === '') {
			person.address = 'No address provided';
		}
		count++;
		return person;
	}
</script>

<div class="flex flex-col items-center w-100">
	<h1 class="text-bold text-3xl mb-4 flex items-center gap-2">
		<PersonStanding class="inline-block w-6 h-6 opacity-60" />
		Finder
	</h1>
	<div class="flex items-center gap-1 w-full max-w-[500px]">
		<input class="search-input" bind:this={inputBind} type="text" placeholder="Search here..." />
		<button class="search-button" on:click={searchPeople}>
			<Search class="p-[0.25rem]" />
		</button>
	</div>

	{#if loading}
		<p class="mt-4 text-gray-400">Loading...</p>
	{/if}

	{#if personData}
		<div class="person-card mt-4">
			{#if personData.id === -1}
				<h2>Person not found</h2>
			{:else}
				<h2 class="font-bold text-xl mb-2">{personData.prefix ?? ''} {personData.name}</h2>
				<p class="text-gray-300">ID: {personData.id}</p>
				{#if personData.mobile_phone}
					<p class="text-gray-300">Mobile Phone: {personData.mobile_phone}</p>
				{/if}
				{#if personData.land_phone}
					<p class="text-gray-300">Land Phone: {personData.land_phone}</p>
				{/if}
				{#if personData.address}
					<p class="text-gray-300">Address: {personData.address}</p>
				{/if}
				<p class="text-gray-300">
					Status: {personData.active ? 'Student' : 'Inactive Email'}
				</p>
			{/if}
		</div>
	{/if}
</div>

<style>
	.search-input {
		flex: 1;
		padding: 0.75rem;
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
	.search-button {
		background: linear-gradient(135deg, var(--nibm-navbar-grad), #121212);
		color: #f9f9f9;
		border: 1px solid #333;
		border-radius: 0.75rem;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
		transition: all 150ms linear;
		padding: 0.75rem;
	}
	.person-card {
		background: linear-gradient(60deg, #2e2e2e50, #121212);
		color: #f9f9f9;
		padding: 1.5rem;
		border: 1px solid #333;
		border-radius: 0.75rem;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
		width: 100%;
		max-width: 500px;
		text-align: left;
	}
	.person-card h2 {
		color: #f9f9f9;
	}
	.person-card p {
		color: #d3d3d3;
		margin: 0.25rem 0;
	}
</style>
