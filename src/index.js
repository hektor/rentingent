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

routes.forEach(route => {
  router.on(route.path, () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        route.view();
        console.log('User logged in');
      } else if (!user) {
        console.log('User NOT logged in');
        routes[0].view();
      }
    });
  });
});

// This catches all non-existing routes and redirects back to the home
router.notFound(() => {
  router.navigate('/404');
});

window.onload = () => {
  document.onclick = e => {
    if (e.target.getAttribute('href') !== null) {
      e.preventDefault();
      router.navigate(e.target.getAttribute('href'));
    }
  };
};

router.resolve();
