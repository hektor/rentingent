import Navigo from 'navigo';
import handlebars, { compile } from 'handlebars';
import './styles/main.sass';
import routes from './routes';

// Partials
const header = require('./partials/header.handlebars');
const footer = require('./partials/footer.handlebars');

const { getInstance } = require('./firebase/firebase');
const firebase = getInstance();

// Register the partial components
handlebars.registerPartial('header', compile(header)({ title: 'RentInGent' }));
handlebars.registerPartial(
  'footer',
  compile(footer)({ text: 'Template made with love by GDM Ghent' })
);

// Router logic to load the correct template when needed
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
