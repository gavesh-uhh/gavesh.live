<script>
	import { Coffee, SquareArrowOutUpRight } from 'lucide-svelte';
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
