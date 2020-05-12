<script>

  import Layout from '../components/layout.component.svelte'
  import SignIn from '../components/signin.component.svelte'
  import SignUp from '../components/signup.component.svelte'

  let email = '';
  let password = '';
  let authType = 'in';

  const handleSubmit = e => {
    console.log(authType)
  }

  const toggleAuthType = () => {authType = (authType === 'in' ? 'up' : 'in')}

</script>

<Layout>
  <h1>Welcome to RentInGent</h1>
  <form class="auth-form" on:submit|preventDefault={handleSubmit}>
    <div class="auth-form_helper" />
    <div class="auth-form_provider-group">
      <button class="auth-provider auth-provider_google"><img src="assets/icons/google.svg" alt="google-logo"></button>
      <button class="auth-provider auth-provider_facebook"><img src="assets/icons/facebook.svg" alt="facebook-logo"></button>
    </div>
    <div class="auth-form_header">
      Sign <span >{authType}</span>
    </div>
    {#if authType === 'in'}
      <SignIn />
      <div class="auth-type-toggle">
        <span>New to RentInGent?</span>
        <button on:click={toggleAuthType}>Create account</button>
      </div>
    {:else}
      <SignUp />
      <div class="auth-type-toggle">
        <span>Already have an account?</span>
        <button on:click={toggleAuthType}>Sign in</button>
      </div>
    {/if}
  </form>
</Layout>

<style>
.auth-form {
  display: flex;
  flex-direction: column;
}

.auth-type-toggle {
  display: flex;
  flex-direction: column;
}
</style>
