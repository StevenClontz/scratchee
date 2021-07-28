<script lang="ts">
	import routes from './routes';
	import Router from 'svelte-spa-router'
	import { Container } from 'sveltestrap';
</script>

<Container class="pt-3">
	
	<Router {routes} />

</Container>
