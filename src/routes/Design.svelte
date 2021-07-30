<script lang="ts">
	import CardRow from '../components/CardRow.svelte';
    import { ButtonToolbar, Button } from 'sveltestrap';
	import { Form, FormGroup, Input, Label } from 'sveltestrap';
    import { TabContent, TabPane } from 'sveltestrap';
	import QrCode from 'svelte-qrcode';
	import { Card } from '../models/Card';
import { identity } from 'svelte/internal';
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

<p>
	by <a href="https://clontz.org">Steven Clontz</a> | 
	<a href="https://github.com/StevenClontz/scratchee">GitHub</a> |
	<a href="https://sites.google.com/southalabama.edu/tbil">Team-Based Inquiry Learning</a>
</p>

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
		<p>ID: {card.id()}</p>
	</TabPane>
	<TabPane tabId="share" tab="Share">
		<p>
			Scan, tap, or click to share card ID {card.id()}:
		</p>
		<p>
			<a href={card.url()} target="_blank">
				<QrCode value={card.url()}/>
			</a>
		</p>
		<FormGroup>
		    <Input value={card.url()} readonly />
		</FormGroup>
	</TabPane>
</TabContent>

<style>
	a:not(:hover) {
		text-decoration: none;
	}
</style>