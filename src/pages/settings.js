// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import update from '../helpers/update';
import { authCheck } from '../helpers/auth-check';

// Import the template to use
const settingsTemplate = require('../templates/settings.hbs');

// Firebase
const { getInstance } = require('../firebase/firebase');
const firebase = getInstance();
const database = firebase.database();

export default () => {
  authCheck().then(user => {
    if (user) {
      update(compile(settingsTemplate)({ user }));
      document.querySelector('.btn__accept').addEventListener('click', e => {
        e.preventDefault();
        const displayName = document.querySelector(
          '.setting__display-name__input'
        ).value;
        const firstName = document.querySelector('.setting__first-name__input')
          .value;
        const lastName = document.querySelector('.setting__last-name__input')
          .value;
        const phoneNumber = document.querySelector('.setting__phone__input')
          .value;
        applySettings(user, displayName, firstName, lastName, phoneNumber);
      });
    }
  });
};

const applySettings = (user, displayName, firstName, lastName, phoneNumber) => {
  user.updateProfile({ displayName: displayName });
  database
    .ref(`/user/${user.uid}`)
    .update({ first_name: firstName, last_name: lastName, phone: phoneNumber });
  document.querySelector('.settings__applied').classList.toggle('hidden');
  document.querySelector('.btn__accept').classList.toggle('hidden');
  console.log(document.querySelector('.settings__applied').classList);
};
