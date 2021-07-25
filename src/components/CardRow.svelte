<script lang="ts">
    import { ButtonToolbar, Button } from 'sveltestrap';
    import CardChoice from "./CardChoice.svelte";
    export let answer=0;
    export let designMode=false;
    export let label="?";
</script>

<ButtonToolbar>
    <Button color="light">{label}.</Button>
    {#each ["A","B","C","D"] as l,i}
        <CardChoice {designMode} revealed={false} correct={answer==i} on:click={()=>answer=i} label={l}/>
    {/each}
</ButtonToolbar>