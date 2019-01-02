// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import update from '../helpers/update';
import { authCheck, getUserType } from '../helpers/auth-check';

// Import the template to use
const zoekKotTemplate = require('../templates/zoek-kot.hbs');

// Import Kot class
import { Koten } from './Kot';

export default () => {
  Promise.all([authCheck(), getUserType()]).then(userResults => {
    const user = userResults[0];
    const userType = userResults[1];
    new Koten().getAllKoten().then(koten => {
      renderDom(koten);
    });
    if (user && userType === 'student') {
    } else {
      console.log('only for students');
    }
  });
};

function renderDom(koten) {
  update(compile(zoekKotTemplate)({ koten }));
  const filterByEl = document.querySelector('.zoek-kot__filter__dropdown');
  filterByEl.addEventListener('change', e => {
    console.log(e.target.value);
    const filterByValue = filterByEl.options[filterByEl.selectedIndex].text;
    switch (filterByValue) {
      case 'By price (ascending)':
        renderDom(sortByPrice(koten, 1));
        break;
      case 'By price (descending)':
        renderDom(sortByPrice(koten, -1));
        break;
      case 'By type (room - studio)':
        renderDom(filterByType(koten, 1));
        break;
      case 'By type (studio - room)':
        renderDom(filterByType(koten, -1));
        break;
      case 'By surface (ascending)':
        renderDom(sortBySurface(koten, 1));
        break;
      case 'By surface (descending)':
        renderDom(sortBySurface(koten, -1));
        break;
      default:
        renderDom(koten);
    }
  });
  // - Afstand (van x - x) @@@ pass in distance
  const addToLikeBtns = document.querySelectorAll(
    '.kot__btn__add-to-favourites'
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

function sortByPrice(koten, order) {
  return koten.sort((a, b) =>
    a.totalPrice > b.totalPrice
      ? order
      : b.totalPrice > a.totalPrice
      ? -order
      : 0
  );
}

function filterByType(koten, order) {
  return koten.sort((a, b) => (a.type > b.type ? order : -order));
}

function sortBySurface(koten, order) {
  return koten.sort((a, b) =>
    a.surface > b.surface ? order : b.surface > a.surface ? -order : 0
  );
}
