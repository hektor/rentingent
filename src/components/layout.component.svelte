<script>
  import Header from './header.component.svelte'

  const userType = 'student'
</script>

<div class="container">
  <Header {userType} />
  <slot />
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .page {
  }
</style>
