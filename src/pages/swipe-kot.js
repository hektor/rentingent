// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import update from '../helpers/update';

// Import Kot class
import { Kot } from './Kot';
import { Koten } from './Kot';

// Import the template to use
const zoekKotTemplate = require('../templates/swipe-kot.handlebars');

// Firebase
const { getInstance } = require('../firebase/firebase');
const firebase = getInstance();
const database = firebase.database();

// Router
import { router } from '../index';

export default () => {
  let koten = new Koten();
  koten.getAllKoten().then(koten => {
    update(compile(zoekKotTemplate)({ koten }));
  });
};
