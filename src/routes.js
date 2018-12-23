// Pages
import AuthView from './pages/auth';
import HomeView from './pages/home';
import ZoekKotView from './pages/zoek-kot';
import KotToevoegenView from './pages/kot-toevoegen';
import AboutView from './pages/about';
import FirebaseView from './pages/firebase-example';
import MapboxView from './pages/mapbox-example';
import pageNotFoundView from './pages/404';

export default [
  { path: '/', view: AuthView },
  { path: '/home', view: HomeView },
  { path: '/zoek-kot', view: ZoekKotView },
  { path: 'kot-toevoegen', view: KotToevoegenView },
  { path: '/about', view: AboutView },
  { path: '/firebase', view: FirebaseView },
  { path: '/mapbox', view: MapboxView },
  { path: '/404', view: pageNotFoundView }
];
