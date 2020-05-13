<script>
  import { Router, Route } from "svelte-routing";
  import Auth from '../pages/auth.page.svelte'
  import Home from '../pages/home.page.svelte'

  const hideSplashScreen = () => {
    setTimeout(() => {
      document.querySelector(".app-loading").classList.remove("app-loading")
    }, 150);
  }

  hideSplashScreen();

</script>

<Router>
  <Route path="/" component={Home} />
  <Route path="/auth" component={Auth} />
</Router>
