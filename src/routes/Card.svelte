<script lang="ts">
	import CardRow from '../components/CardRow.svelte';
	import { querystring } from 'svelte-spa-router';
	import { Form, FormGroup } from 'sveltestrap';
	let cardData = {
		answers: [],
		title: "Unknown Title",
		description: "Unknown description.",
	};
    try {
		cardData = JSON.parse(atob($querystring));
    } finally {}
	let cardRows = (cardData) => {
		return cardData.answers.map( answer => {
			return {"answer":answer ,"score": 0}
		})
	}
	$: total = cardRows(cardData).reduce((total, row) => total + (row["score"] || 0), 0);
</script>

<h1>{cardData.title}</h1>
<p>{cardData.description}</p>
<p>Total score: {total}</p>

{#if cardData.answers.length == 0}
	<p>No valid card was found.</p>
{:else}
	<Form on:submit={e=>e.preventDefault()}>
		{#each cardRows(cardData) as row, index}
			<CardRow answer={row.answer} designMode={false} {index} bind:score={row.score}/>
		{/each}
	</Form>
{/if}
