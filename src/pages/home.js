// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import update from '../helpers/update';
import authCheck from '../helpers/auth-check';
import User from './User';

const { getInstance } = require('../firebase/firebase');
const firebase = getInstance();

// Import the template to use
const homeTemplate = require('../templates/home.hbs');

export default () => {
  authCheck().then(user => {
    user = new User();
    user
      .getCurrentUserType()
      .then(userType => {
        // check user-type here and load home page accordingly
        if (userType === 'student') {
          update(compile(homeTemplate)({}));
        } else if (userType === 'kotbaas') {
          let kotbaas = true;
          update(compile(homeTemplate)({ kotbaas }));
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
  });
};
