<script>
	import favicon from '$lib/assets/favicon.svg';
	import '../styles/styleguide.css';
	import Navbar from "$lib/components/Navbar.svelte";
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>


{@render children()}
<Navbar />