<script lang="ts">
	import CardRow from '../components/CardRow.svelte';
	import { Card } from '../models/Card';
	import { querystring } from 'svelte-spa-router';
	import { Form } from 'sveltestrap';
	let card = new Card()
	try {
		card = Card.fromBase64($querystring);
	} catch {} finally {}
</script>

<h1>{card.title}</h1>
<p>{card.description}</p>
<p>Total score: {card.score()}/{card.maxScore()}</p>

{#if card.rows.length == 0}
	<p>No valid Scratchee card was found.</p>
{:else}
	<Form on:submit={e=>e.preventDefault()}>
		{#each card.rows as row, index}
			<CardRow bind:row={row} designMode={false} {index}/>
		{/each}
	</Form>
{/if}
