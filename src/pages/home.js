// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import update from '../helpers/update';

const { getInstance } = require('../firebase/firebase');
const firebase = getInstance();

// Import the template to use
const studentHomeTemplate = require('../templates/student-home.handlebars');
const kotbaasHomeTemplate = require('../templates/kotbaas-home.handlebars');

export default () => {
  // Data to be passed to the template

  const user = 'user';
  // Return the compiled template to the router

  // check user-type here and load home page accordingly

  // check if user is activated - if not, load activation-home.handlebars

  update(compile(studentHomeTemplate)({ user }));
  const logOutBtn = document.querySelector('.btn__sign-out');
  logOutBtn.addEventListener('click', e => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.clear();
      });
  });
};
