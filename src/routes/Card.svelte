<script lang="ts">
	import CardRow from '../components/CardRow.svelte';
	import { querystring } from 'svelte-spa-router';
	import { Form, FormGroup } from 'sveltestrap';
	let card = {"answers":[],"title":"???","description":"???"};
	let rows = [];
    try {
		card = JSON.parse(atob($querystring));
    } catch {
		card = {"answers":[],"title":"???","description":"???"};
	} finally {
		rows = card.answers.map( answer => {
			return {"answer":answer ,"score": 0}
		})
	}
	$: total = rows.reduce((total, row) => total + (row["score"] || 0), 0);
</script>

<h1>{card.title}</h1>
<p>{card.description}</p>
<p>Total score: {total}</p>

{#if rows.length == 0}
	<p>No valid card was found.</p>
{:else}
<Form on:submit={e=>e.preventDefault()}>
	<FormGroup>
		{#each rows as row, index}
			<CardRow answer={row.answer} designMode={false} {index} bind:score={row.score}/>
		{/each}
	</FormGroup>
</Form>
{/if}
