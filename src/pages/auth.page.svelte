<script>
  import Layout from '../components/layout.component.svelte'
  import SignIn from '../components/signin.component.svelte'
  import SignUp from '../components/signup.component.svelte'
  import Button from '../components/button.component.svelte'

  let authType = 'in';

  const handleSignin = () => console.log("sign in")
  const handleSignup = () => console.log("sign up")
  const handleSubmit = e => authType === 'in' ? handleSignin() : handleSignup()

  /* 
  * Toggle sign up or sign in */
  const toggleAuthType = () => {authType = (authType === 'in' ? 'up' : 'in')}
</script>

<Layout>
  <div class="auth-type-toggle">
    {#if authType === 'in'}
      <span>New to RentInGent?</span>
      <Button outline color="#fff" on:click={toggleAuthType} title="Create account" />
    {:else}
      <span>Already have an account?</span>
      <Button outline color="#fff" on:click={toggleAuthType} title="Sign in" />
    {/if}
  </div>
  <div class="page">
    <form class="auth-form" on:submit|preventDefault={handleSubmit}>
      <div class="auth-form_helper" />
      <div class="auth-provider_group">
        <button class="auth-provider auth-provider_google"><img src="assets/icons/google.svg" alt="google-logo"></button>
        <button class="auth-provider auth-provider_facebook"><img src="assets/icons/facebook.svg" alt="facebook-logo"></button>
      </div>
      <div class="auth-form_header">
        <h1>Sign <span class="auth-type-toggle-indicator" on:click={toggleAuthType}>{authType}</span></h1>
      </div>
      {#if authType === 'in'}
        <SignIn />
      {:else}
        <SignUp />
      {/if}
    </form>
  </div>
</Layout>

<style>

.page {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: var(--gradient-light);
}

.auth-form {
  display: flex;
  flex-direction: column;
  background: #fff;
  min-height: 62vh;
  padding: 0 6vw;
}

.auth-provider_group {
  position: relative;
  height: 5rem;
  top: -1.5rem;
}

.auth-provider {
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  background: #fff;
  border: none;
  box-shadow: 0 .5rem 1rem 0px rgba(0,0,0,.05);
  cursor: pointer;
  margin-right: .25rem;
}

.auth-provider > img {
  height: 100%;
  width: 100%;
}

.auth-type-toggle {
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 0 2rem;
}

.auth-type-toggle > * {
  flex: 1;
}

h1 { color: var(--color-1);}

.auth-type-toggle-indicator {
  position: absolute;
  text-align: center;
  margin-left: .25rem;
  background: var(--gradient-light);
  width: 3rem;
  height: 3rem;
  border-radius: 1.5rem;
  cursor: pointer;
}

</style>
