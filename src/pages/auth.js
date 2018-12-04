// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import update from '../helpers/update';

// Import the template to use
const authTemplate = require('../templates/auth.handlebars');

const { getInstance } = require('../firebase/firebase');
const firebase = getInstance();

export default () => {
  //===============| GOOGLE AUTH FUNCTIONALITY |============== //
  //Check if the user is signed in
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      //firebase.auth().signOut();
      console.log(
        `Logged in: ${
          user.displayName !== null ? user.displayName : user.email
        }`
      );
      if (user.emailVerified === true) {
        console.log('Welcome activated user');
      } else if (user.emailVerified === false) {
        user
          .sendEmailVerification()
          .then(response => {})
          .catch(error => {});
        firebase.auth().signOut();
      }
    } else {
      // Update DOM and get DOM elements
      update(compile(authTemplate)({}));
      console.log('Please Sign In / Sign Up');
      const signTypeBtn = document.querySelector(
        '.auth__form__header__indicator'
      );
      const signTypeEl = document.querySelector(
        '.auth__form__header__signtype'
      );
      const signInBtn = document.querySelector('.auth__submit__signin');
      const signUpBtn = document.querySelector('.auth__submit__signup');
      const registerFormEl = document.querySelector('.auth__register');
      const googleAuthBtn = document.querySelector('.auth__provider__google');
      const emailEl = document.querySelector('.auth__input__email');
      const passwordEl = document.querySelector('.auth__input__password');

      // SIGN TYPE SWITCHER
      signTypeBtn.addEventListener('click', e => {
        if (signTypeEl.textContent === 'up') {
          signTypeEl.textContent = 'in';
          signUpBtn.style.display = 'none';
          signInBtn.style.display = 'block';
          registerFormEl.style.display = 'none';
        } else if (signTypeEl.textContent === 'in') {
          signTypeEl.textContent = 'up';
          signInBtn.style.display = 'none';
          signUpBtn.style.display = 'block';
          registerFormEl.style.display = 'block';
        }
      });

      //Sign In
      signInBtn.addEventListener('click', e => {
        e.preventDefault();
        const email = emailEl.value;
        const password = passwordEl.value;
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(response => {
            console.log(response);
            console.log(`Welcome back, ${email}!`);
          })
          // catch errors from auth promise
          .catch(error => {
            console.log(error.message);
          });
      });

      // Sign Up
      signUpBtn.addEventListener('click', e => {
        e.preventDefault();
        const email = emailEl.value;
        const password = passwordEl.value;
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(response => {
            console.log(response);
            console.log(`Welcome, ${email}!`);
          })
          // catch errors from auth promise
          .catch(error => {
            console.log(error.message);
          });
      });

      // Sign In w/ Provider - Google
      googleAuthBtn.addEventListener('click', e => {
        e.preventDefault();
        console.log('Google authentication...');
        let provider = new firebase.auth().GoogleAuthProvider();
        firebase
          .auth()
          .signInWithPopup(provider)
          .then(result => {
            console.log('successful google account link');
          })
          .catch(error => {
            console.log(error.message);
          });
      });

      // Sign In w/ Provider - Facebook
    }
  });
};
