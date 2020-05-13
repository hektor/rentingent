<script>
import Header from './header.component.svelte'
export let withHeader;
</script>

{#if withHeader}<Header/>{/if}
<slot />
