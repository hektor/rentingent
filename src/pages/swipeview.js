// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import update from '../helpers/update';
import { authCheck, getUserType } from '../helpers/auth-check';

// Import Kot class
import { Koten } from '../helpers/Kot';

// Import the template to use
const swipeKotTemplate = require('../templates/swipeview.hbs');

// Firebase
const { getInstance } = require('../firebase/firebase');
const firebase = getInstance();
const database = firebase.database();

export default () => {
  Promise.all([authCheck(), getUserType()]).then(userResults => {
    const user = userResults[0];
    const userType = userResults[1];
    if (user && userType === 'student') {
      let i = 0;
      function swipeView(index) {
        let koten = new Koten();
        if (i >= koten.length) {
          update(compile(swipeKotTemplate));
        }
        koten.getAllKoten().then(koten => {
          i = index;
          let kot = koten[i];
          update(compile(swipeKotTemplate)({ kot }));
          const kotLikeBtn = document.querySelector('.btn__swipe-kot__like');
          const kotDislikeBtn = document.querySelector(
            '.btn__swipe-kot__dislike'
          );
          kotLikeBtn.addEventListener('click', e => {
            kot.addToFavourites(true);
            i += 1;
            swipeView(i);
            console.log(i, { like: e });
          });
          kotDislikeBtn.addEventListener('click', e => {
            i += 1;
            swipeView(i);
            console.log(i, { dislike: e });
          });
        });
      }
      swipeView(i);
    } else {
      console.log('only for students');
    }
  });
};
