// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import update from '../helpers/update';
import User from './User';

// Import the template to use
const mijnKotenTemplate = require('../templates/mijn-koten.hbs');

export default () => {
  // check if user is kotbaas
  const currentUser = new User();
  currentUser.getCurrentUserType().then(userType => {
    if (userType === 'student') {
      console.log('add router here');
    } else if (userType === 'kotbaas') {
      // only get koten for this kotbaas
      update(compile(mijnKotenTemplate)({}));
    }
  });
};
