<script>
  import { Router, Route } from "svelte-routing";
  import Auth from '../pages/auth.page.svelte'
  import Home from '../pages/home.page.svelte'

  const hideSplashScreen = () => {
    setTimeout(() => {
      const loader = document.querySelector(".app-loading").remove()
    }, 300);
  }

  hideSplashScreen();

</script>

<Router>
  <Route path="/" component={Home} />
  <Route path="/auth" component={Auth} />
</Router>
