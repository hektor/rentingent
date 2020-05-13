<script>
  export let title;
  export let type;
  export let name;
  export let outline = false;
  export let fg = 'var(--color-5)';
  export let bg = "var(--color-1)"
</script>

<button 
  class:outline 
  on:click name={name} 
  style="--fg-color:{fg}; --bg-color:{bg}"
  type={type}
>
  {title}
</button>
  
<style>
  button {
    padding: 1rem;
    border-radius: 0.25rem;
    font-size: 1.25rem;
    margin: 2rem 0;
    text-align: left;
    border: none;
    font-family: inherit;
    color: var(--fg-color);
    background: var(--bg-color);
    cursor: pointer;
  }

  .outline {
    border: 2px solid var(--fg-color);
    background: transparent;
    color: var(--fg-color);
  }
</style>
