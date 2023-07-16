<script>
	import '../app.postcss';
	import { Toaster } from 'svelte-sonner';
</script>

<svelte:head>
	<title>Flex Message Sender</title>
</svelte:head>
<Toaster richColors position="top-right" />

<header class="bg-white">
	<nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
		<div class="flex lg:flex-1 cursor-default">
			<p>Flex Message Sender</p>
		</div>
	</nav>
</header>
<main class="p-6 lg:px-8">
	<slot />
</main>
