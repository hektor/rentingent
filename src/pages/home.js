// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import update from '../helpers/update';
import { authCheck, getUserType } from '../helpers/auth-check';

import Navigo from 'navigo';

// Firebase
const { getInstance } = require('../firebase/firebase');
const firebase = getInstance();

// Import the template to use
const homeTemplate = require('../templates/home.hbs');

export default () => {
  Promise.all([authCheck(), getUserType()])
    .then(userResults => {
      const user = userResults[0];
      const userType = userResults[1];
      const displayName = user.displayName;
      const kotbaas = userType === 'kotbaas' ? true : false;
      if (user) {
        update(compile(homeTemplate)({ kotbaas, displayName }));
      } else {
        console.log('no user logged in');
      }
    })
    .then(() => {
      const router = new Navigo(window.location.origin, true, '#');
      const logOutBtn = document.querySelector('.btn__sign-out');
      logOutBtn.addEventListener('click', e => {
        firebase
          .auth()
          .signOut()
          .then(() => {
            localStorage.clear();
            router.navigate('/auth');
          });
      });
    });
};
