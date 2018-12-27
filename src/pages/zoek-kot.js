// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import update from '../helpers/update';

// Import the template to use
const zoekKotTemplate = require('../templates/zoek-kot.hbs');

// Import Kot class
import { Koten } from './Kot';

export default () => {
  let loading;
  update(compile(zoekKotTemplate)({ loading }));
  let koten = new Koten();
  koten
    .getAllKoten()
    .then(koten => {
      update(compile(zoekKotTemplate)({ koten }));
      console.log(koten);
      const addToLikeBtns = document.querySelectorAll(
        '.kot__btn__add-to-favorites'
      );
      Array.from(addToLikeBtns).forEach((addToLikeBtn, i) => {
        addToLikeBtn.addEventListener('click', e => {
          let kot = koten[i];
          kot.addToFavourites();
        });
      });
    })
    .then(() => {
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
            koten.filterByType('Studio').then(koten => {
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
  // - Type
  // - Afstand (van x - x) @@@ pass in distance
};
