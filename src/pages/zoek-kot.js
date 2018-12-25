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
          case 'By price (ascending)':
            koten.sortByPrice(1).then(koten => {
              update(compile(zoekKotTemplate)({ koten }));
            });
            break;
          case 'By price (descending)':
            koten.sortByPrice(-1).then(koten => {
              update(compile(zoekKotTemplate)({ koten }));
            });
            break;
          case 'By type':
            koten.filterByType('Kamer').then(koten => {
              console.log(koten);
              update(compile(zoekKotTemplate)({ koten }));
            });
            break;
          case 'By surface (ascending)':
            koten.sortBySurface(1).then(koten => {
              update(compile(zoekKotTemplate)({ koten }));
            });
            break;
          case 'By surface (descending)':
            koten.sortBySurface(-1).then(koten => {
              update(compile(zoekKotTemplate)({ koten }));
            });
            break;
        }
      });
    });
  // - Afstand (van x - x) @@@ pass in distance
};
