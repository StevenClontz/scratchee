<script lang="ts">
	import CardRow from '../components/CardRow.svelte';
	import {querystring} from 'svelte-spa-router';
	let answerJson = [];
	let rows = [];
    try {
		answerJson = JSON.parse($querystring);
    } catch {
		answerJson = []
	} finally {
		rows = answerJson.map( answer => {
			return {"answer":answer ,"score": 0}
		})
	}
	$: total = rows.reduce((total, row) => total + (row["score"] || 0), 0);
</script>

<h1>Scratchee Card</h1>
<p>Scratch your Scratchee Card below.</p>

<p>Total score: {total}</p>

{#each rows as row, index}
	<CardRow answer={row.answer} designMode={false} {index} bind:score={row.score}/>
{/each}
{#if rows.length == 0}
	<p>No valid card was found.</p>
{/if}

<p><a href="#/design">Design a card.</a></p>
