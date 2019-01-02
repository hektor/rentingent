// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import update from '../helpers/update';
import { authCheck, getUserType } from '../helpers/auth-check';
import { Koten } from './Kot';

// Import the template to use
const mijnKotenTemplate = require('../templates/mijn-koten.hbs');

export default () => {
  Promise.all([authCheck(), getUserType()]).then(userResults => {
    const user = userResults[0];
    const userType = userResults[1];
    if (user && userType === 'kotbaas') {
      let koten = new Koten();
      koten.getKotenByUser(user.uid).then(koten => {
        renderDom(koten);
      });
    } else {
      console.log('only for kotbaas');
    }
  });
};

function renderDom(koten) {
  update(compile(mijnKotenTemplate)({ koten }));
  console.log(koten);
  const removeBtns = document.querySelectorAll('.kot__btn__remove');
  const optionsBtns = document.querySelectorAll('.kot__btn__options');
  removeBtns.forEach((removeBtn, i) => {
    removeBtn.addEventListener('click', e => {
      console.log(koten);
      let kot = koten[i];
      kot.removeFromDatabase();
      removeBtn.parentElement.parentElement.style.display = 'none';
    });
  });
  optionsBtns.forEach((removeBtn, i) => {
    removeBtn.addEventListener('click', e => {
      console.log(koten);
      let kot = koten[i];
      kot.removeFromDatabase();
      removeBtn.parentElement.parentElement.style.display = 'none';
    });
  });
}
