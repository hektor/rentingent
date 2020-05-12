<script>
  import { Router, Link, Route } from "svelte-routing";
  import Home from '../pages/home.page.svelte'
</script>

<Router>
  <div>
    <Route path="/" component={Home} />
  </div>
</Router>
