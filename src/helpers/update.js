import Navigo from 'navigo';

const update = content => {
  // Get the app container
  const app = document.getElementById('app');
  // Replace the content with the new content
  app.innerHTML = content;

  // Renew router and update page links
  const router = new Navigo(window.location.origin, true, '#');
  router.updatePageLinks();
};

export default update;
