<script lang="ts">
    import { Button } from 'sveltestrap';
    export let label = "?";
    export let revealed = false;
    export let correct = false;
    export let designMode = false;
    let fullLabel = "??";
    let color = "dark";
    let outline = false;
    $: {
        if (revealed || designMode) {
            outline = true;
            if (correct) {
                color = "success";
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
    }
</script>

<Button on:click
        {outline}
        {color}>
        {fullLabel}
</Button>