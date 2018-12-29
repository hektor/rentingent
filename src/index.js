import Navigo from 'navigo';
import handlebars, { compile } from 'handlebars';

import './styles/main.sass';
import routes from './routes';

// Partials
const navHeader = require('./partials/header-nav.hbs');
const infoHeader = require('./partials/header-info.hbs');
const footer = require('./partials/footer.hbs');

// Firebase
const { getInstance } = require('./firebase/firebase');
const firebase = getInstance();

// Register partials
handlebars.registerPartial('header-nav', compile(navHeader)({}));
handlebars.registerPartial('header-info', compile(infoHeader)({}));
handlebars.registerPartial(
  'footer',
  compile(footer)({ text: 'Template made with love by GDM Ghent' })
);

// Router logic to load the correct template when needed
const router = new Navigo(window.location.origin, true, '#');
routes.forEach(route => {
  router.on(route.path, () => {
    route.view();
    router.updatePageLinks();
  });
});

// This catches all non-existing routes and redirects back to the home
router.notFound(() => {
  router.navigate('/404');
});

router.resolve();

window.onload = () => {
  router.navigate(window.location.hash.split('/')[1]);
};
