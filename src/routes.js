// Pages
import HomeView from './pages/home';
import AuthView from './pages/auth';
import ZoekKotView from './pages/zoek-kot';
import AboutView from './pages/about';
import MapboxView from './pages/mapbox-example';
import MessagesView from './pages/messages';
import KotToevoegenView from './pages/kot-toevoegen';
import SwipeKotView from './pages/swipeview';
import pageNotFoundView from './pages/404';

export default [
  { path: '/home', view: HomeView },
  { path: '/auth', view: AuthView },
  { path: '/zoek-kot', view: ZoekKotView },
  { path: '/about', view: AboutView },
  { path: '/mapbox', view: MapboxView },
  { path: '/messages', view: MessagesView },
  { path: '/kot-toevoegen', view: KotToevoegenView },
  { path: '/swipeview', view: SwipeKotView },
  { path: '/404', view: pageNotFoundView }
];
