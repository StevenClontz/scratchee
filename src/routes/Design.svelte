<script lang="ts">
	import CardRow from '../components/CardRow.svelte';
    import { ButtonToolbar, Button } from 'sveltestrap';
	import { Form, FormGroup, Input, Label } from 'sveltestrap';
    import { TabContent, TabPane } from 'sveltestrap';
	import QrCode from 'svelte-qrcode';
	import { Card } from '../models/Card';
	let card = new Card(
		"A Scratchee Card",
		"Scratch your Scratchee Card below.",
		[0,0,0,0,0]
	)
	let addRow = () => {
		card.addRow(); card=card;
	}
	let removeRow = () => {
		card.removeRow(); card=card;
	}
</script>


<h1>
	Scratchee Designer
	<small class="text-muted">α.1</small>
</h1>

<TabContent>
	<TabPane tabId="design" tab="Design" active>
		<Form on:submit={e=>e.preventDefault()}>
			<FormGroup>
				<Label for="cardTitle">Title</Label>
				<Input
					type="text"
					id="cardTitle"
					placeholder="My Scratchee Card"
					bind:value={card.title}
				/>
			</FormGroup>
			<FormGroup>
				<Label for="cardDescription">Description</Label>
				<Input 
					type="textarea" 
					id="cardDescription" 
					bind:value={card.description} 
				/>
			</FormGroup>
			<FormGroup>
				<ButtonToolbar>
					<Button color="primary" on:click={addRow}>Add Row</Button>
					<Button disabled={card.rows.length==1} color="danger" on:click={removeRow}>Remove Row</Button>
				</ButtonToolbar>
			</FormGroup>
			{#each card.rows as row, index}
				<CardRow bind:row={row} designMode={true} {index}/>
			{/each}
		</Form>
	</TabPane>
	<TabPane tabId="share" tab="Share">
		<QrCode value={card.url()}/>
		<p>
			Link: <a href={card.url()} target="_blank">
				{card.url(true)}
			</a>
		</p>
	</TabPane>
</TabContent>
