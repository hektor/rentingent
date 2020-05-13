<script>
  export let title;
  export let type;
  export let name;
</script>

<button on:click name={name} type={type}>{title}</button>

<style>
  button {
    padding: 1rem;
    border-radius: 0.25rem;
    border: 1px solid #ccc;
    font-size: 1.25rem;
    margin: 2rem 0;
    text-align: left;
    border: none;
    font-family: inherit;
  }
</style>
