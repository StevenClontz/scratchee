import Home from './routes/Home.svelte';
import Design from './routes/Design.svelte';
import Card from './routes/Card.svelte';
import NotFound from './routes/NotFound.svelte';

export default {
    '/': Home,
    '/design': Design,
    '/card': Card,
    //'/lorem/:repeat': Lorem,
    // The catch-all route must always be last
    '*': NotFound
};
