import Navigo from 'navigo';
import handlebars, { compile } from 'handlebars';
import './styles/main.sass';
import routes from './routes';

// Partials
const navHeader = require('./partials/header-nav.handlebars');
const footer = require('./partials/footer.handlebars');
const infoHeader = require('./partials/header-info.handlebars');

const { getInstance } = require('./firebase/firebase');
const firebase = getInstance();

// REGISTER THE PARTIAL COMPONENTS
// Headers
handlebars.registerPartial(
  'header-nav',
  compile(navHeader)({ title: 'RentInGent' })
);
handlebars.registerPartial(
  'header-info',
  compile(infoHeader)({ title: 'RentInGent' })
);
handlebars.registerPartial(
  'footer',
  compile(footer)({ text: 'Template made with love by GDM Ghent' })
);

// ROUTER LOGIC TO LOAD THE CORRECT TEMPLATE WHEN NEEDED
const router = new Navigo(window.location.origin, true);
function createRoutes(loggedIn, activated) {
  routes.forEach(route => {
    router.on(route.path, () => {
      if (loggedIn && activated) {
        console.log('All routes available');
        route.view();
      } else if (loggedIn) {
        console.log('All routes available but please activate');
        route.view();
      } else {
        router.navigate('/');
        routes[0].view();
        console.log('All routes blocked except login');
      }
    });
  });
  router.resolve();
}

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    if (user.emailVerified) {
      createRoutes(true, true);
      console.log({ 'User logged in': user });
    } else if (user.emailVerified !== true) {
      createRoutes(true, false);
      console.log({ 'User logged in but not activated': user });
    }
  } else {
    createRoutes(false);
    console.log({ 'User NOT logged in': user });
  }
});

// @@TODO create a user class?
class User {
  constructor(emailVerified) {
    this.emailVerified = emailVerified;
  }
  checkIfVerified() {
    console.log(this.emailVerified ? 'Verified' : 'NOT Verified');
    return this.emailVerified;
  }
}

// This catches all non-existing routes and redirects back to the home
router.notFound(() => {
  router.navigate('/404');
});

// Page linking functionality (elements with href attr)
window.onload = () => {
  document.onclick = e => {
    if (e.target.getAttribute('href') !== null) {
      e.preventDefault();
      router.navigate(e.target.getAttribute('href'));
    }
  };
};

document.querySelector('.btn__sign-out').addEventListener('click', e => {
  firebase.auth().signOut();
});
