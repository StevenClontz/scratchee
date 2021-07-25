<script lang="ts">
    import { ButtonToolbar, Button } from 'sveltestrap';
    import CardChoice from "./CardChoice.svelte";
    export let answer=0;
    export let index=0;
    let label = (index+1).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    })
    export let designMode=false;
    export let reveals = [];
    $: if (designMode) {
        reveals = [0,1,2,3];
    }
    export let score = 0;
    $: answered = reveals.includes(answer)
    $: if (!answered) {
        score = 0; 
    } else if (reveals.length == 1) {
        score = 4;
    } else if (reveals.length == 2) {
        score = 2;
    } else if (reveals.length == 3) {
        score = 1;
    } else {
        score = 0;
    }
    let choiceClick = (index:number) => () => {
        if (designMode) {
            answer=index;
        } else if (!reveals.includes(index)) {
            reveals.push(index)
            reveals=reveals
        }
    }
</script>

<ButtonToolbar>
    <Button disabled color="light">{label}.</Button>
    {#each ["A","B","C","D"] as l,i}
        <CardChoice disabled={answered&&!designMode} revealed={reveals.includes(i)} correct={answer==i} on:click={choiceClick(i)} label={l}/>
    {/each}
    {#if !designMode}
        <Button disabled color="light">Points: {score}/4</Button>
    {/if}
</ButtonToolbar>