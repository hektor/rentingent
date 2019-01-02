// Pages (js)
import HomeView from './pages/home';
import AuthView from './pages/auth';
import ZoekKotView from './pages/zoek-kot';
import MapboxView from './pages/mapbox-example';
import MessagesView from './pages/messages';
import MijnKotenView from './pages/mijn-koten';
import KotToevoegenView from './pages/kot-toevoegen';
import SwipeKotView from './pages/swipeview';
import FavouritesView from './pages/favourites';
import settingsView from './pages/settings';
import pageNotFoundView from './pages/404';

export default [
  { path: '/', view: HomeView },
  { path: '/auth', view: AuthView },
  { path: '/zoek-kot', view: ZoekKotView },
  { path: '/mapbox', view: MapboxView },
  { path: '/messages', view: MessagesView },
  { path: '/mijn-koten', view: MijnKotenView },
  { path: '/kot-toevoegen', view: KotToevoegenView },
  { path: '/swipeview', view: SwipeKotView },
  { path: '/favourites', view: FavouritesView },
  { path: '/settings', view: settingsView },
  { path: '/404', view: pageNotFoundView }
];
