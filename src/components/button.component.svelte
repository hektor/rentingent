<script>
  export let title;
  export let type;
  export let name;
</script>

<button name={name} type={type}>{title}</button>

<style>
  button {
    background: none;
    border: none;
    padding: .5rem;
    margin: .25rem;
  }
</style>
