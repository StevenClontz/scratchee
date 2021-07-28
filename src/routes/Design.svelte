<script lang="ts">
	import CardRow from '../components/CardRow.svelte';
    import { ButtonToolbar, Button } from 'sveltestrap';
	import { Form, FormGroup, Input, Label } from 'sveltestrap';
	import QrCode from 'svelte-qrcode';
	let newRow = {answer:0};
	let cardData = {
		rows: [...Array(5)].map(()=>Object.assign({},newRow)),
		title: "A Scratchee Card",
		description: "Scratch your Scratchee Card below.",
	};
	let remove = function() {
		cardData.rows = cardData.rows.slice(0,cardData.rows.length-1);
	}
	let add = function() {
		cardData.rows = [...cardData.rows,{...newRow}];
	}
	$: cardUrl = location.protocol+"//"+location.host+location.pathname+"#/card?"+btoa(JSON.stringify(cardData));
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
		    bind:value={cardData.title}
		/>
	</FormGroup>
	<FormGroup>
	    <Label for="cardDescription">Description</Label>
	    <Input 
	        type="textarea" 
		    id="cardDescription" 
			bind:value={cardData.description} 
	    />
	</FormGroup>
	<FormGroup>
		<ButtonToolbar>
			<Button color="primary" on:click={add}>Add Row</Button>
			<Button disabled={cardData.rows.length==1} color="danger" on:click={remove}>Remove Row</Button>
		</ButtonToolbar>
	</FormGroup>
	{#each cardData.rows as row, index}
		<CardRow bind:answer={row.answer} designMode={true} {index}/>
	{/each}
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