<script lang="ts">
	import CardRow from '../components/CardRow.svelte';
    import { ButtonToolbar, Button } from 'sveltestrap';
	import { Form, FormGroup, Input, Label } from 'sveltestrap';
	import QrCode from 'svelte-qrcode';
	let answers = [0,0,0,0,0];
	let title = "A Scratchee Card";
	let description = "Scratch your Scratchee Card below.";
	let remove = function() {
		answers.pop();
		answers = answers;
	}
	let add = function() {
		answers.push(0);
		answers = answers;
	}
	$: cardObject = {
		"answers": answers,
		"title": title,
		"description": description,
	}
	$: cardUrl = location.protocol+"//"+location.host+location.pathname+"#/card?"+btoa(JSON.stringify(cardObject));
	let cardUrlPreview = location.protocol+"//"+location.host+location.pathname+"#/card?...";
</script>


<h1>
	Scratchee Designer
	<small class="text-muted">α.1</small>
</h1>


<Form on:submit={e=>e.preventDefault()}>
	<FormGroup>
		<Label for="cardTitle">Title</Label>
		<Input
		  type="text"
		  id="cardTitle"
		  placeholder="My Scratchee Card"
		  bind:value={title}
		/>
	</FormGroup>
	<FormGroup>
	  <Label for="cardDescription">Description</Label>
	  <Input type="textarea" id="cardDescription" bind:value={description} />
	</FormGroup>
	<FormGroup>
		<ButtonToolbar>
			<Button color="primary" on:click={add}>Add Row</Button>
			<Button disabled={answers.length==1} color="danger" on:click={remove}>Remove Row</Button>
		</ButtonToolbar>
	</FormGroup>
	<FormGroup>
		{#each answers as answer, index}
			<CardRow bind:answer={answer} designMode={true} {index}/>
		{/each}
	</FormGroup>
</Form>

<p>
	Share this QR Code to distribute card:
</p>

<QrCode value={cardUrl}/>

<p>
	<a href={cardUrl} target="_blank">
		{cardUrlPreview}
	</a>
</p>