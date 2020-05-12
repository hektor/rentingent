<script>
  import { Router, Route } from "svelte-routing";
  import Auth from '../pages/auth.page.svelte'
  import Home from '../pages/home.page.svelte'
</script>

<Router>
  <Route path="/" component={Home} />
  <Route path="/auth" component={Auth} />
</Router>
