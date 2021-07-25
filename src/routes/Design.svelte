<script lang="ts">
	import CardRow from '../components/CardRow.svelte';
    import { Button } from 'sveltestrap';
	let designMode = true;
	let answers = [1,3,0,2,1];
	let remove = function() {
		answers.pop();
		answers = answers;
	}
	let add = function() {
		answers.push(0);
		answers = answers;
	}
</script>

<h1>Scratchee</h1>
<p>Design your Scratchee card below.</p>

<pre>{answers}</pre>

{#each answers as answer, i}
	<CardRow bind:answer={answer} {designMode} label={String(i+1)}/>
{/each}
<Button color="primary" on:click={add}>Add Row</Button>
{#if answers.length>1}
	<Button color="danger" on:click={remove}>Remove Row</Button>
{/if}
