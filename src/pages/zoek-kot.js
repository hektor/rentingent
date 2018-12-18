// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import update from '../helpers/update';
import firebase from 'firebase'; // @@@TODO --> make global functions for firebase / create an instance of firebase here

// Import the template to use
const zoekKotTemplate = require('../templates/zoek-kot.handlebars');

export default () => {
  // Data to be passed to the template
  const name = 'RentInGent';
  // Return the compiled template to the router
  update(compile(zoekKotTemplate)({ name }));

  // add firebase data to client side (indexed db)
  // check if data is yet to be added
  const ref = firebase.database().ref('/kot');
  ref.once('value', snapshot => {
    snapshot.forEach(kot => {
      const kotKey = kot.key;
      const kotData = kot.val();
    });
  });
};
