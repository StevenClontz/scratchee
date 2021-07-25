<script lang="ts">
    import { Button } from 'sveltestrap';
    export let label = "?";
    export let revealed = false;
    export let correct = false;
    export let disabled = false;
    let fullLabel = "??";
    let color = "dark";
    let outline = false;
    $: if (revealed) {
        if (correct) {
            color = "primary";
            outline = false;
            fullLabel = label+"✓";
        } else {
            color = "danger";
            outline = true;
            fullLabel = label+"✗";
        }
    } else {
        color = "secondary";
        outline = false;
        fullLabel = label+"?";
    }
</script>

<Button on:click
        style="width:3em"
        {outline}
        {color}
        {disabled}>
        {fullLabel}
</Button>
