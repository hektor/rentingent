// Pages
import AuthView from './pages/auth';
import HomeView from './pages/home';
import ZoekKotView from './pages/zoek-kot';
import SwipeKotView from './pages/swipe-kot';
import KotToevoegenView from './pages/kot-toevoegen';
import AboutView from './pages/about';
import FirebaseView from './pages/firebase-example';
import MapboxView from './pages/mapbox-example';
import MessagesView from './pages/messages';
import pageNotFoundView from './pages/404';

export default [
  { path: '/home', view: HomeView },
  { path: '/auth', view: AuthView },
  { path: '/zoek-kot', view: ZoekKotView },
  { path: '/kot-toevoegen', view: KotToevoegenView },
  { path: '/swipe-kot', view: SwipeKotView },
  { path: '/about', view: AboutView },
  { path: '/firebase', view: FirebaseView },
  { path: '/mapbox', view: MapboxView },
  { path: '/messages', view: MessagesView },
  { path: '/404', view: pageNotFoundView }
];
