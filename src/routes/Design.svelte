<script lang="ts">
	import CardRow from '../components/CardRow.svelte';
    import { ButtonToolbar, Button } from 'sveltestrap';
	let designMode = true;
	let answers = [0,0,0,0,0];
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

<ButtonToolbar>
	<Button color="primary" on:click={add}>Add Row</Button>
	<Button disabled={answers.length==1} color="danger" on:click={remove}>Remove Row</Button>
</ButtonToolbar>

{#each answers as answer, index}
	<CardRow bind:answer={answer} {designMode} {index}/>
{/each}
