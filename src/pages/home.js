// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import update from '../helpers/update';
import { authCheck, getUserType } from '../helpers/auth-check';

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
      if (user) {
        if (userType === 'student') {
          update(compile(homeTemplate)({}));
        } else if (userType === 'kotbaas') {
          let kotbaas = true;
          update(compile(homeTemplate)({ kotbaas }));
        }
      }
    })
    .then(() => {
      const logOutBtn = document.querySelector('.btn__sign-out');
      logOutBtn.addEventListener('click', e => {
        firebase
          .auth()
          .signOut()
          .then(() => {
            localStorage.clear();
          });
      });
    });
};
