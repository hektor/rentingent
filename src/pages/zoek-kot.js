// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import update from '../helpers/update';

// Import Kot class
import { Kot } from './Kot';
import { Koten } from './Kot';

// Import the template to use
const zoekKotTemplate = require('../templates/zoek-kot.handlebars');

// Firebase
const { getInstance } = require('../firebase/firebase');
const firebase = getInstance();
const database = firebase.database();

// Router
import { router } from '../index';

export default () => {
  let koten = new Koten();
  koten
    .getAllKoten()
    .then(koten => {
      update(compile(zoekKotTemplate)({ koten }));
    })
    .then(e => {
      const filterByEl = document.querySelector('.zoek-kot__filter__dropdown');
      filterByEl.addEventListener('change', e => {
        const filterByValue = filterByEl.options[filterByEl.selectedIndex].text;
        switch (filterByValue) {
          case 'Price':
            koten.sortByPrice().then(koten => {
              update(compile(zoekKotTemplate)({ koten }));
            });
            break;
          case 'Type':
            console.log('type');
            break;
          case 'Surface':
            console.log('surface');
            break;
        }
      });
    });

  // - Type
  // - Huurprijs (van x - x)
  // - Oppervlakte
  // - Afstand (van x - x) @@@ pass in distance

  // getAllKoten().then(koten => {
  //   update(compile(zoekKotTemplate)({ koten }));
};
