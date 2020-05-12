<script>
  import Input from '../components/input.component.svelte'
  import Button from '../components/button.component.svelte'
</script>

<Input name="email" title="Email" type="email" required />
<Input name="password" title="Password" type="password" required />
<Input name="name" title="Full name" type="text" required />
<Button name="signup" title="Sign up" type="submit" />
