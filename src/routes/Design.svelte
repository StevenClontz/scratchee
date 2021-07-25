<script lang="ts">
	import CardRow from '../components/CardRow.svelte';
    import { ButtonToolbar, Button } from 'sveltestrap';
	let answers = [0,0,0,0,0];
	let remove = function() {
		answers.pop();
		answers = answers;
	}
	let add = function() {
		answers.push(0);
		answers = answers;
	}
	$: designUrl = "#/card?"+JSON.stringify(answers);
</script>


<h1>Scratchee Designer</h1>
<p>Design your Scratchee Card below.</p>

<ButtonToolbar>
	<Button color="primary" on:click={add}>Add Row</Button>
	<Button disabled={answers.length==1} color="danger" on:click={remove}>Remove Row</Button>
</ButtonToolbar>

{#each answers as answer, index}
	<CardRow bind:answer={answer} designMode={true} {index}/>
{/each}

<p><a href={designUrl}>Scratch this card.</a></p>
