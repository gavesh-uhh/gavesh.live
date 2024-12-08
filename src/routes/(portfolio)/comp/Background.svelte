<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	class Star {
		x: number;
		y: number;
		radius: number;
		speed: number;
		ctx: CanvasRenderingContext2D | null;

		constructor(canvas: HTMLCanvasElement, x: number, y: number, radius: number, speed: number) {
			this.x = x;
			this.y = y;
			this.radius = radius;
			this.speed = speed;
			this.ctx = canvas.getContext('2d');
		}

		update() {
			this.y += this.speed;
			if (this.y > canvas.height) {
				this.y = 0;
				this.x = Math.random() * canvas.width;
			}
		}

		draw() {
			if (!this.ctx) return;
			this.ctx.beginPath();
			this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
			this.ctx.fillStyle = 'white';
			this.ctx.fill();
		}
	}

	class Comet {
		x: number;
		y: number;
		radius: number;
		speedX: number;
		speedY: number;
		tailLength: number;
		ctx: CanvasRenderingContext2D | null;

		constructor(
			canvas: HTMLCanvasElement,
			x: number,
			y: number,
			radius: number,
			speedX: number,
			speedY: number,
			tailLength: number
		) {
			this.x = x;
			this.y = y;
			this.radius = radius;
			this.speedX = speedX;
			this.speedY = speedY;
			this.tailLength = tailLength;
			this.ctx = canvas.getContext('2d');
		}

		update() {
			this.x += this.speedX;
			this.y += this.speedY;
			if (this.x > canvas.width || this.y > canvas.height) {
				this.x = Math.random() * canvas.width * 0.5;
				this.y = -50;
			}
		}

		draw() {
			if (!this.ctx) return;
			const gradient = this.ctx.createLinearGradient(
				this.x,
				this.y,
				this.x - this.tailLength * this.speedX,
				this.y - this.tailLength * this.speedY
			);
			gradient.addColorStop(0, '#ffffff50');
			gradient.addColorStop(1, 'transparent');
			this.ctx.beginPath();
			this.ctx.fillStyle = '#ffffff50';
			this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
			this.ctx.fill();
			this.ctx.beginPath();
			this.ctx.strokeStyle = gradient;
			this.ctx.lineWidth = this.radius;
			this.ctx.moveTo(this.x, this.y);
			this.ctx.lineTo(
				this.x - this.tailLength * this.speedX,
				this.y - this.tailLength * this.speedY
			);
			this.ctx.stroke();
		}
	}

	function getChance(chance: number): boolean {
		return Math.random() < chance;
	}

	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		const starCount = 200;
		const cometCount = 5;
		const objects: (Star | Comet)[] = [];

		for (let i = 0; i < starCount; i++) {
			const x = Math.random() * canvas.width;
			const y = Math.random() * canvas.height;
			const radius = Math.random() * 1;
			const speed = Math.random() * 0.1;
			objects.push(new Star(canvas, x, y, radius, speed));
		}

		for (let i = 0; i < cometCount; i++) {
			const x = Math.random() * canvas.width;
			const y = Math.random() * canvas.height * 0.5;
			const radius = Math.random() * 2;
			const speedX = Math.random() * 2 + 1;
			const speedY = Math.random() * 0.5 + 0.5;
			const tailLength = Math.random() * 50 + 50;
			// 10% chance
			if (getChance(0.1)) objects.push(new Comet(canvas, x, y, radius, speedX, speedY, tailLength));
		}

		function animate() {
			if (!ctx) return;
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			objects.forEach((obj) => {
				obj.update();
				obj.draw();
			});
			requestAnimationFrame(animate);
		}

		animate();
	});
</script>

<div
	class="z-[-10] pointer-events-none overflow-hidden left-0 top-0 opacity-100 blur-xs h-screen fixed w-full"
>
	<canvas bind:this={canvas}></canvas>
</div>

