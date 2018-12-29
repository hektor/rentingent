// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import update from '../helpers/update';
import { authCheck, getUserType } from '../helpers/auth-check';

// Import the template to use
const favouritesTemplate = require('../templates/favourites.hbs');

// Firebase
const { getInstance } = require('../firebase/firebase');
const firebase = getInstance();
const database = firebase.database();

// Import Kot Class
import { Koten } from './Kot';

export default () => {
  Promise.all([authCheck(), getUserType()]).then(userResults => {
    const user = userResults[0];
    const userType = userResults[1];
    if (user && userType === 'student') {
      let koten = new Koten();
      koten.getAllFavourites().then(favs => {
        update(compile(favouritesTemplate)({ favs }));
        const removeBtns = document.querySelectorAll(
          '.kot__btn__remove-from-favorites'
        );
        Array.from(removeBtns).forEach((removeBtn, i) => {
          removeBtn.addEventListener('click', e => {
            let fav = favs[i];
            fav.removeFromFavourites();
            removeBtn.parentElement.parentElement.style.display = 'none';
          });
        });
      });
    } else {
      console.log('only for students');
    }
  });
};
