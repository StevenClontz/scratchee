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
        outline = true;
        if (correct) {
            color = "primary";
            fullLabel = label+"✓";
        } else {
            color = "danger";
            fullLabel = label+"✗";
        }
    } else {
        color = "secondary";
        outline = false;
        fullLabel = label+"?";
    }
</script>

<Button on:click
        {outline}
        {color}
        {disabled}>
        {fullLabel}
</Button>