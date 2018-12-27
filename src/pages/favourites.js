// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import update from '../helpers/update';

// Import the template to use
const favouritesTemplate = require('../templates/favourites.hbs');

// Firebase
const { getInstance } = require('../firebase/firebase');
const firebase = getInstance();
const database = firebase.database();

// Import Kot Class
import { Koten } from './Kot';

export default () => {
  let loading;
  update(compile(favouritesTemplate)({ loading }));
  let koten = new Koten();
  koten.getAllFavourites().then(favourites => {
    console.log(favourites);
    update(compile(favouritesTemplate)({ favourites }));
  });
};
