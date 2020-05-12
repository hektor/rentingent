<script>
  import Input from '../components/input.component.svelte'
  import Button from '../components/button.component.svelte'
</script>

<Input name="email" title="Email" type="email" required />
<Input name="password" title="Password" type="password" required />
<Button name="signin" title="Sign in" type="submit" />
