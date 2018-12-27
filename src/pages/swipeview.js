// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import update from '../helpers/update';

// Import Kot class
import { Kot } from './Kot';
import { Koten } from './Kot';

// Import the template to use
const swipeKotTemplate = require('../templates/swipeview.hbs');
const addToFavoritesBtn = document.querySelector('.kot__btn__add-to-favorites');
// Firebase
const { getInstance } = require('../firebase/firebase');
const firebase = getInstance();
const database = firebase.database();

// Router
import { router } from '../index';

export default () => {
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
      const kotDislikeBtn = document.querySelector('.btn__swipe-kot__dislike');
      kotLikeBtn.addEventListener('click', e => {
        kot.addToFavourites();
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
};
