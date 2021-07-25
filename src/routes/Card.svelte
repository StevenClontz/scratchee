<script lang="ts">
	import CardRow from '../components/CardRow.svelte';
	let designMode = false;
	let rows = [
		{answer: 0,score: 0},
		{answer: 3,score: 0},
		{answer: 1,score: 0},
		{answer: 2,score: 0},
		{answer: 0,score: 0},
	]
	$: total = rows.reduce((total, row) => total + (row["score"] || 0), 0);
</script>

<h1>Scratchee Card</h1>
<p>Scratch your Scratchee card below.</p>

<p>Total score: {total}</p>

{#each rows as row, index}
	<CardRow answer={row.answer} {designMode} {index} bind:score={row.score}/>
{/each}
