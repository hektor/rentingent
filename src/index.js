import Navigo from 'navigo';
import handlebars, { compile } from 'handlebars';
import update from './helpers/update';

import './styles/main.sass';
import routes from './routes';
import { Koten } from './pages/Kot';
import User from './pages/User';

// Partials
const navHeader = require('./partials/header-nav.hbs');
const infoHeader = require('./partials/header-info.hbs');
const footer = require('./partials/footer.hbs');

// Firebase
const { getInstance } = require('./firebase/firebase');
const firebase = getInstance();

const currentUser = new User();
const userType = currentUser.getUserType();
console.log(userType);

// Register partials
handlebars.registerPartial('header-nav', compile(navHeader)({}));
handlebars.registerPartial('header-info', compile(infoHeader)({}));
handlebars.registerPartial(
  'footer',
  compile(footer)({ text: 'Template made with love by GDM Ghent' })
);

// Router logic to load the correct template when needed
const router = new Navigo('http://localhost:8080/', true, '#');

// routes.forEach(route => {
//   router.on(route.path, () => {
//     route.view();
//     router.updatePageLinks();
//   });
// });

const links = document.getElementsByTagName('a');
console.log(links);

routes.forEach(route => {
  router.on(route.path, () => {
    route.view();
    router.updatePageLinks();
  });
});

router.on(
  '/user/edit',
  () => {
    // show user edit page
  },
  {
    before: function(done, params) {
      // doing some async operation
      done();
    },
    after: function(params) {
      // after resolving
    },
    leave: function(params) {
      // when you are going out of the that route
    }
  }
);

// This catches all non-existing routes and redirects back to the home
router.notFound(() => {
  router.navigate('/404');
});

router.resolve();

window.onload = () => {
  router.navigate(window.location.hash.split('/')[1]);
};
