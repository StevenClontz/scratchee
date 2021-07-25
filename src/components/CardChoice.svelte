<script lang="ts">
    import { Button } from 'sveltestrap';
    export let label = "?";
    export let revealed = false;
    export let correct = false;
    export let designMode = false;
    let color="secondary";
    let outline = false;
    if (revealed || designMode) {
        outline = true;
        if (correct) {
            color = "success";
            label += "✓";
        } else {
            color = "danger";
            label += "✗";
        }
    } else {
        label += "?";
    }
</script>

<Button on:click
        {outline}
        {color}>
        {label}{correct}
</Button>