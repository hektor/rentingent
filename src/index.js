import Navigo from 'navigo';
import handlebars, { compile } from 'handlebars';
import update from './helpers/update';

import './styles/main.sass';
import routes from './routes';

// Import User class
import User from './pages/User';

// Partials
const navHeader = require('./partials/header-nav.handlebars');
const infoHeader = require('./partials/header-info.handlebars');
const footer = require('./partials/footer.handlebars');

// Firebase
const { getInstance } = require('./firebase/firebase');
const firebase = getInstance();

const currentUser = new User();
const userType = currentUser.getUserType();

// Register partials
handlebars.registerPartial('header-nav', compile(navHeader)({}));
handlebars.registerPartial('header-info', compile(infoHeader)({}));
handlebars.registerPartial(
  'footer',
  compile(footer)({ text: 'Template made with love by GDM Ghent' })
);

window.onload = () => {
  initRouter();
  // GETTING CURRENT USER FROM INDEXEDDB (FIREBASE AUTO STORES IT THERE)

  // const request = window.indexedDB.open('firebaseLocalStorageDb');
  // request.onerror = error => {
  //   console.log(error.target.errorCode);
  // };
  // request.onsuccess = e => {
  //   const db = e.target.result;
  //   db
  //     .transaction('firebaseLocalStorage')
  //     .objectStore('firebaseLocalStorage')
  //     .openCursor().onsuccess = function(event) {
  //     const cursor = event.target.result;
  //     const user = cursor.value.value;
  //   };
  // };

  firebase.auth().onAuthStateChanged(user => {
    if (user !== null) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.clear();
    }
  });
};

// ROUTER LOGIC TO LOAD THE CORRECT TEMPLATE WHEN NEEDED
const router = new Navigo(window.location.origin, true);
const initRouter = () => {
  routes.forEach(route => {
    router.on(route.path, () => {
      if (currentUser.getUser() && currentUser.getUser().emailVerified) {
        console.log('All routes available');
        route.view();
      } else if (currentUser.getUser()) {
        console.log('All routes available but please activate');
        route.view();
      } else {
        router.navigate('/');
        routes[0].view();
        console.log('All routes blocked except login');
      }
      router.updatePageLinks();
    });
  });
  router.resolve();

  // This catches all non-existing routes and redirects back to the home
  router.notFound(() => {
    router.navigate('404');
  });
  router.navigate(window.location.hash.split('/')[1]);
};
export { router };
