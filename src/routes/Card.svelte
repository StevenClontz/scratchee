<script lang="ts">
	import CardRow from '../components/CardRow.svelte';
	import { Card } from '../models/Card';
	import { querystring } from 'svelte-spa-router';
	import { Form, Button, Badge, Alert } from 'sveltestrap';
	let card = new Card()
	try {
		card = Card.fromBase64($querystring);
	} catch {} finally {}
	card.loadState(); card=card;
	$: card.storeState();
	let reset = () => {
		card.reset(); card=card;
		showResetAlert = false;
	}
	let showResetAlert = false;
</script>

<h1>
	{card.title}
</h1>
<p>
	{card.description}
	<small class="text-muted">(ID: {card.id()})</small>
</p>
<p>
	Total score: <strong>{card.score()}/{card.maxScore()}</strong>
	{#if card.resets > 0}
		<Badge color="warning">Resets: {card.resets}</Badge>
	{/if}
</p>

{#if card.rows.length == 0}
	<p>No valid Scratchee card was found.</p>
{:else}
	<Form on:submit={e=>e.preventDefault()}>
		{#each card.rows as row, index}
			<CardRow bind:row={row} designMode={false} {index}/>
		{/each}
	</Form>
	<p>
		<Button outline active={showResetAlert} color="warning" on:click={()=>showResetAlert=!showResetAlert}>Reset</Button>
	</p>
	<Alert color="warning" isOpen={showResetAlert} toggle={() => (showResetAlert = false)}>
		<h6 class="alert-heading text-capitalize">Are you sure?</h6>
	    <p>This will reset this card (ID {card.id()}), but it will be permanently marked as reset and your score may become invalid.</p>
		<Button color="dark" on:click={reset}>I'm sure, reset this card.</Button>
	</Alert>
{/if}
