// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import update from '../helpers/update';

// Import Kot class
import { Kot } from './Kot';

// Import the template to use
const zoekKotTemplate = require('../templates/zoek-kot.handlebars');
// Firebase
const { getInstance } = require('../firebase/firebase');
const firebase = getInstance();
const database = firebase.database();

export default () => {
  function dynamicSort(filterBy) {
    const sortOrder = 1;
    return function(a, b) {
      let result =
        a[filterBy] < b[filterBy] ? -1 : a[filterBy] > b[filterBy] ? 1 : 0;
      console.log(result * sortOrder);
      return result * sortOrder;
    };
  }

  const filterKoten = koten => {
    const filterByEl = document.querySelector('.zoek-kot__filter__dropdown');
    filterByEl.addEventListener('change', e => {
      const filterByValue = filterByEl.options[filterByEl.selectedIndex].text;
      switch (filterByValue) {
        case 'Price':
          console.log('price');
          dynamicSort(filterByValue);
          console.log();
          console.log(dynamicSort(filterByValue));
          break;
        case 'Type':
          console.log('type');
          break;
        case 'Surface':
          console.log('surface');
          break;
      }
    });

    // - Type
    // - Huurprijs (van x - x)
    // - Oppervlakte
    // - Afstand (van x - x) @@@ pass in distance
  };

  getKoten().then(koten => {
    update(compile(zoekKotTemplate)({ koten }));
  });
};

const getKoten = () => {
  return new Promise((resolve, reject) => {
    database
      .ref('/kot')
      .once('value')
      .then(snapshot => {
        let koten = [];
        snapshot.forEach(kot => {
          koten.push(new Kot(kot.val()));
        });
        resolve(koten);
      })
      .catch(error => {
        reject(error);
      });
  });
};

import { KotenGent } from './Kot';
const koten = new KotenGent();
const koten2 = koten.getKoten();
koten2.then(kot => {
  console.log(kot);
});
