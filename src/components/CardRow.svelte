<script lang="ts">
    import { ButtonToolbar } from 'sveltestrap';
    import CardChoice from "./CardChoice.svelte";
    export let answer=0;
    export let designMode=false;
</script>

{answer}
<ButtonToolbar>
    {#each ["A","B","C","D"] as l,i}
        <CardChoice {designMode} revealed={false} correct={answer==i} on:click={()=>answer=i} label={l}/>
    {/each}
</ButtonToolbar>