<script>
  export let title;
  export let name;
  export let type;
  export let required;
</script>

<div class="input">
  <label for={name}>{title}</label>
  <input type={type} name={name} {required} autocomplete={type === ('email' || 'password') ? type : 'off'} />
</div>

<style>
  .input {
    display: flex;
    flex-direction: column;
  }

  .input > label {
    padding: 0.5rem 0;
  }

  .input > input {
    padding: 1rem;
    border-radius: 0.25rem;
    border: 1px solid #ccc;
    font-size: 1.25rem;
    font-family: inherit;
    margin-bottom: 0.5rem;
  }
</style>
