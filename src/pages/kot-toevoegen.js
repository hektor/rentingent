// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import update from '../helpers/update';
import { authCheck, getUserType } from '../helpers/auth-check';

// Import the template to use
const kotToevoegenTemplate = require('../templates/kot-toevoegen.hbs');

// Firebase
const { getInstance } = require('../firebase/firebase');
const firebase = getInstance();

// Import Kot constructor function
import { Kot } from './Kot';

export default () => {
  Promise.all([authCheck(), getUserType()]).then(userResults => {
    const user = userResults[0];
    const userType = userResults[1];
    if (user && userType === 'kotbaas') {
      loadTemplate(user);
    }
  });
  // load DOM - event listeners
  function loadTemplate(user) {
    update(compile(kotToevoegenTemplate)({ name }));
    document.querySelector('.kot__add').addEventListener('submit', e => {
      e.preventDefault();
      submitForm(user);
    });
  }
};

// return input values - trim values
function getInput(key) {
  return document
    .querySelector(`.kot__input__${key}`)
    .value.toString()
    .trim();
}
// get input (+user uid) and store in db
function submitForm(user) {
  const image = document.querySelector('.kot__input__image').files[0];
  const fileName = 'test';

  const kot = {
    Naam: getInput('name'),
    Straat: getInput('street'),
    Huisummer: getInput('street-number'),
    Plaats: getInput('city'),
    Status: getInput('status'),
    Waarborg: getInput('warranty'),
    Verdieping: getInput('floor'),
    'Privé toilet': getInput('toilet'),
    'Privé keuken': getInput('kitchen'),
    'Privé douche': getInput('shower'),
    Opties: getInput('furniture'),
    'Totale prijs': getInput('total-price'),
    Type: getInput('type'),
    Oppervlakte: getInput('surface'),
    kotbaas: user.uid
  };

  new Kot(kot).addToDatabase(kot, image);
  const messageEl = document.querySelector('.kot__add__message');
  messageEl.textContent = 'Kot toegevoegd!';
}
