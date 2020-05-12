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
</style>
