// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import update from '../helpers/update';

// Import the template to use
const zoekKotTemplate = require('../templates/zoek-kot.hbs');

// Import Kot class
import { Koten } from './Kot';

export default () => {
  let loading;
  let koten = new Koten();
  update(compile(zoekKotTemplate)({ loading }));
  koten
    .getAllKoten()
    .then(koten => {
      console.log(koten);
      renderDom(koten);
    })
    .then(() => {
      const filterByEl = document.querySelector('.zoek-kot__filter__dropdown');
      filterByEl.addEventListener('change', e => {
        console.log(e.target.value);
        const filterByValue = filterByEl.options[filterByEl.selectedIndex].text;
        switch (filterByValue) {
          case 'By price (ascending)':
            koten.sortByPrice(1).then(sortedKoten => {
              //update(compile(zoekKotTemplate)({ koten }));
              renderDom(sortedKoten);
            });
            break;
          case 'By price (descending)':
            koten.sortByPrice(-1).then(sortedKoten => {
              //update(compile(zoekKotTemplate)({ koten }));
              renderDom(sortedKoten);
            });
            break;
          case 'By type':
            koten.filterByType('Studio').then(sortedKoten => {
              //update(compile(zoekKotTemplate)({ koten }));
              renderDom(sortedKoten);
            });
            break;
          case 'By surface (ascending)':
            koten.sortBySurface(1).then(sortedKoten => {
              //update(compile(zoekKotTemplate)({ koten }));
              renderDom(sortedKoten);
            });
            break;
          case 'By surface (descending)':
            koten.sortBySurface(-1).then(sortedKoten => {
              renderDom(sortedKoten);
            });
            break;
        }
      });
    });
  // - Afstand (van x - x) @@@ pass in distance
};

function renderDom(koten) {
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
  const searchBoxEl = document.querySelector('.zoek-kot__search-box');
  searchBoxEl.addEventListener('keyup', e => {
    const term = e.target.value.toLowerCase();
    const kotHeaders = document.querySelectorAll('.kot__header');
    Array.from(kotHeaders).forEach(header => {
      const name = header.firstElementChild.textContent.toLowerCase();
      const address = header.firstElementChild.nextElementSibling.textContent.toLowerCase();
      if (name.indexOf(term) !== -1 || address.indexOf(term) !== -1) {
        header.parentElement.style.display = 'block';
      } else {
        header.parentElement.style.display = 'none';
      }
    });
  });
}
