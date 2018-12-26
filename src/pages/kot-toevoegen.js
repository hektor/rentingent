// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import update from '../helpers/update';

// Import Kot constructor function
import Kot from './Kot';

// Import the template to use
const kotToevoegenTemplate = require('../templates/kot-toevoegen.handlebars');

export default () => {
  // Data to be passed to the template
  const name = 'Rent@Gent';

  // Return the compiled template to the router
  update(compile(kotToevoegenTemplate)({ name }));

  const kotAddBtn = document.querySelector('.kot__add__submit');
  kotAddBtn.addEventListener('click', e => {
    const kot = {
      Naam: document.querySelector('.kot__name__input').value,
      Straat: document.querySelector('.kot__street__input').value,
      Huisnummer: document.querySelector('.kot__street-number__input').value,
      Plaats: document.querySelector('.kot__city__input').value,
      Status: document.querySelector('.kot__status__input').value,
      Waarborg: document.querySelector('.kot__warranty__input').value,
      Verdieping: document.querySelector('.kot__floor__input').value,
      'Privé toilet': document.querySelector('.kot__has-toilet__input').value,
      'Privé keuken': document.querySelector('.kot__has-kitchen__input').value,
      'Privé douche': document.querySelector('.kot__has-shower__input').value,
      Opties: document.querySelector('.kot__has-furniture__input').value,
      'Totale prijs': document.querySelector('.kot__total-price__input').value,
      Type: document.querySelector('.kot__type__input').value,
      Oppervlakte: document.querySelector('.kot__surface__input').value
    };
    const kotAddMessage = document.querySelector('.kot__add__message');
    kotAddMessage.textContent = checkFields(kot);
  });

  function checkFields(kot) {
    let message;
    for (let field in kot) {
      const value = kot[field];
      if (value === '') {
        message = 'Vul alle velden in';
      } else {
        new Kot(kot).addToDatabase();
        message = 'Kot toegevoegd!';
      }
      return message;
    }
  }
};
