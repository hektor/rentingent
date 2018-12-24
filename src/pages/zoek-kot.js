// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import update from '../helpers/update';

// Import Kot class
import Kot from './Kot';

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

  const ref = database.ref('/kot');
  ref.once('value', snapshot => {
    let koten = [];
    snapshot.forEach(kot => {
      const kotKey = kot.key;
      const kotData = kot.val();
      koten.push(new Kot(kotData));
    });
    // Pass koten to template - Return the compiled template to the router
    update(compile(zoekKotTemplate)({ koten }));
    filterKoten(koten);
  });
};
