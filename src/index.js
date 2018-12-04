import Navigo from 'navigo';
import handlebars, { compile } from 'handlebars';
import './styles/main.sass';
import routes from './routes';

// Partials
const header = require('./partials/header.handlebars');
const footer = require('./partials/footer.handlebars');

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
    route.view();
  });
});

// This catches all non-existing routes and redirects back to the home
router.notFound(() => {
  router.navigate('/home');
});

router.resolve();

window.onload = () => {
  document.onclick = e => {
    if (e.target.getAttribute('href') !== null) {
      e.preventDefault();
      router.navigate(e.target.getAttribute('href'));
    }
  };
};
