<script lang="ts">
	import CardRow from '../components/CardRow.svelte';
	import { querystring } from 'svelte-spa-router';
	import { Form } from 'sveltestrap';
	let cardData = {
		title: "Unknown Title",
		description: "Unknown description.",
		rows: [],
		score: function () {
			return this.rows.reduce((total:number, row:any) => total + (row.score || 0), 0);
		},
		maxScore: function() {
			return this.rows.length*10;
		},
	};
    try {
		cardData = {...cardData, ...JSON.parse(atob($querystring))};
		// scores aren't provided in querystring
		cardData.rows = cardData.rows.map( row => {
			return {...row ,score: 0}
		})
    } catch {} finally {}
</script>

<h1>{cardData.title}</h1>
<p>{cardData.description}</p>
<p>Total score: {cardData.score()}/{cardData.maxScore()}</p>

{#if cardData.rows.length == 0}
	<p>No valid Scratchee card was found.</p>
{:else}
	<Form on:submit={e=>e.preventDefault()}>
		{#each cardData.rows as row, index}
			<CardRow answer={row.answer} designMode={false} {index} bind:score={row.score}/>
		{/each}
	</Form>
{/if}
