// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import update from '../helpers/update';
import routes from '../routes';

// Import the template to use
const authTemplate = require('../templates/auth.handlebars');

// Firebase
const { getInstance } = require('../firebase/firebase');
const firebase = getInstance();
const database = firebase.database();

export default () => {
  // Update DOM and get DOM elements
  update(compile(authTemplate)({}));
  const signTypeBtn = document.querySelector('.auth__form__header__indicator');
  const signTypeEl = document.querySelector('.auth__form__header__signtype');
  const signInBtn = document.querySelector('.auth__submit__signin');
  const signUpBtn = document.querySelector('.auth__submit__signup');
  const registerFormEl = document.querySelector('.auth__register');
  const googleAuthBtn = document.querySelector('.auth__provider__google');
  const emailEl = document.querySelector('.auth__input__email');
  const passwordEl = document.querySelector('.auth__input__password');
  const passwordConfirmEl = document.querySelector(
    '.auth__input__password-confirm'
  );
  const formHelperEl = document.querySelector('.auth__form__helper');

  //===============| GOOGLE AUTH FUNCTIONALITY |============== //
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
        routes[1].view();
      })
      // catch errors from auth promise
      .catch(error => {
        console.log(error.message);
        formHelperEl.setAttribute('class', 'auth__form__helper_active');
        formHelperEl.textContent = error.message;
      });
  });

  // Sign Up
  signUpBtn.addEventListener('click', e => {
    e.preventDefault();
    const email = emailEl.value;
    const password = passwordEl.value;
    const passwordConfirm = passwordConfirmEl.value;
    if (password === passwordConfirm) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(response => {
          const user = response.user;
          addUserToDatabase(user);
        })
        // catch errors from auth promise
        .catch(error => {
          formHelperEl.setAttribute('class', 'auth__form__helper_active');
          formHelperEl.textContent = error.message;
          console.log({
            'Error message': error.message,
            'Error Code': error.code
          });
        });
    } else {
      formHelperEl.setAttribute('class', 'auth__form__helper_active');
      formHelperEl.textContent = 'Please make sure the passwords match.';
    }
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

  function addUserToDatabase(user) {
    const userTypeEl = document.getElementById('switch__user-type');
    const userType = userTypeEl.checked ? 'kotbaas' : 'student';

    database.ref('user/' + user.uid).set({
      user_type: userType
    });
  }
  // Sign In w/ Provider - Facebook
};
