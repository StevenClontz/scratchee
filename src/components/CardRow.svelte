<script lang="ts">
    import { Label, FormGroup, Button, Row } from 'sveltestrap';
    import { Row as RowCls } from "../models/Card";
    import CardChoice from "./CardChoice.svelte";
    export let row:RowCls=new RowCls();
    export let index=0;
    let label = (index+1).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    })
    export let designMode=false;
    let choiceClick = (index:number) => () => {
        if (designMode) {
            row.answer=index;
        } else {
            row.scratch(index); row=row;
        }
    }
</script>

<FormGroup>
    <Label>{label}.</Label>
    {#each ["A","B","C","D","E"] as l,i}
        <CardChoice
            disabled={!designMode && row.answered()}
            scratched={designMode || row.scratches.has(i)}
            correct={row.hasAnswer(i)}
            on:click={choiceClick(i)}
            label={l}/>
    {/each}
    {#if !designMode}
        <Label>Points: {row.score()}/10</Label>
    {/if}
</FormGroup>