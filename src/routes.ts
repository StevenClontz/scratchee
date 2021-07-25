import Home from './routes/Home.svelte';
import Design from './routes/Design.svelte';
import Lorem from './routes/Lorem.svelte';
import NotFound from './routes/NotFound.svelte';

export default {
    '/': Home,
    '/design': Design,
    '/lorem/:repeat': Lorem,
    // The catch-all route must always be last
    '*': NotFound
};
