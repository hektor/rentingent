import Navigo from 'navigo';
import handlebars, { compile } from 'handlebars';
import update from './helpers/update';

import './styles/main.sass';
import routes from './routes';

// // Import User class
// import User from './pages/User';

// Partials
const navHeader = require('./partials/header-nav.handlebars');
const infoHeader = require('./partials/header-info.handlebars');
const footer = require('./partials/footer.handlebars');

// Firebase
const { getInstance } = require('./firebase/firebase');
const firebase = getInstance();

// const currentUser = new User();
// const userType = currentUser.getUserType();

// Register partials
handlebars.registerPartial('header-nav', compile(navHeader)({}));
handlebars.registerPartial('header-info', compile(infoHeader)({}));
handlebars.registerPartial(
  'footer',
  compile(footer)({ text: 'Template made with love by GDM Ghent' })
);

console.log(firebase.auth().currentUser);

// Router logic to load the correct template when needed
const router = new Navigo(window.location.origin, true);

routes.forEach(route => {
  router.on(route.path, () => {
    route.view();
    router.updatePageLinks();
  });
});

let user = false;
router.hooks({
  before: function(done, params) {
    if (!user) {
      router.navigate('/auth');
      routes[1].view();
      done(false);
    } else {
      done();
    }
  },
  after: function(params) {}
});

// This catches all non-existing routes and redirects back to the home
router.notFound(() => {
  router.navigate('/404');
});

window.onload = () => {
  router.navigate(window.location.hash.split('/')[1]);
};

router.resolve();
