// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import update from '../helpers/update';
import { authCheck, getUserType } from '../helpers/auth-check';
import User from './User';
import { Koten } from './Kot';

// Import the template to use
const mijnKotenTemplate = require('../templates/mijn-koten.hbs');

export default () => {
  Promise.all([authCheck(), getUserType()]).then(userResults => {
    const user = userResults[0];
    const userType = userResults[1];
    if (user && userType === 'kotbaas') {
    } else {
      console.log('only for kotbaas');
    }
  });

  // check if user is kotbaas
  const currentUser = new User();
  currentUser.getCurrentUserType().then(userType => {
    if (userType === 'student') {
      console.log('add router here');
    } else if (userType === 'kotbaas') {
      // only get koten for this kotbaas
      currentUser.getCurrentUser().then(user => {
        let koten = new Koten();
        koten.getKotenByUser(user.uid).then(koten => {
          renderDom(koten);
        });
      });
    }
  });
};

function renderDom(koten) {
  update(compile(mijnKotenTemplate)({ koten }));
  console.log(koten);
  const removeBtns = document.querySelectorAll('.kot__btn__remove');
  const optionsBtns = document.querySelectorAll('.kot__btn__options');
  Array.from(removeBtns).forEach((removeBtn, i) => {
    removeBtn.addEventListener('click', e => {
      console.log(koten);
      let kot = koten[i];
      kot.removeFromDatabase();
      removeBtn.parentElement.parentElement.style.display = 'none';
    });
  });
}
