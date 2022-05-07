<script>
  import { Router, Route } from 'svelte-routing'
  import AuthPage from '../pages/auth.page.svelte'
  import Home from '../pages/home.page.svelte'
  import FindRoom from '../pages/find-room.page.svelte'
  import MapPage from '../pages/map.page.svelte'
  import Messages from '../pages/messages.page.svelte'
  import MyRooms from '../pages/my-rooms.page.svelte'
  import AddRoom from '../pages/add-room.page.svelte'
  import Swipe from '../pages/swipe.page.svelte'
  import Favourites from '../pages/favourites.page.svelte'
  import Settings from '../pages/settings.page.svelte'
  import NotFound from '../pages/404.page.svelte'

  const hideSplashScreen = () => {
    setTimeout(() => {
      document.querySelector('.app-loading').remove()
    }, 300)
  }

  hideSplashScreen()
</script>

<Router>
  <Route path="/" component={Home} />
  <Route path="/auth" component={AuthPage} />
  <Route path="/find-room" component={FindRoom} />
  <Route path="/map" component={MapPage} />
  <Route path="/messages" component={Messages} />
  <Route path="/my-rooms" component={MyRooms} />
  <Route path="/add-room" component={AddRoom} />
  <Route path="/swipe" component={Swipe} />
  <Route path="/favourites" component={Favourites} />
  <Route path="/settings" component={Settings} />
  <Route path="/not-found" component={NotFound} />
</Router>
