import Navigo from 'navigo';
import handlebars, { compile } from 'handlebars';

import './styles/main.sass';
import routes from './routes';

// Partials
const navHeaderStudent = require('./partials/header-nav-student.hbs');
const navHeaderKotbaas = require('./partials/header-nav-kotbaas.hbs');
const infoHeader = require('./partials/header-info.hbs');

// Register partials
handlebars.registerPartial('header-nav-student', compile(navHeaderStudent)({}));
handlebars.registerPartial('header-nav-kotbaas', compile(navHeaderKotbaas)({}));
handlebars.registerPartial('header-info', compile(infoHeader)({}));

// Router logic to load the correct template when needed
const router = new Navigo(window.location.origin, true, '#');
routes.forEach(route => {
  router.on(route.path, () => {
    route.view();
    router.updatePageLinks();
  });
});

router
  .on({
    'zoek-kot/:id': (params, query) => {
      console.log(params.id);
    }
  })
  .resolve();

// This catches all non-existing routes and redirects back to the home
router.notFound(() => {
  router.navigate('/404');
});

window.onload = () => {
  router.navigate(window.location.hash.split('/')[1]);
  router.navigate('/home');
};

router.resolve();
