// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import update from '../helpers/update';

// Import the template to use
const kotToevoegenTemplate = require('../templates/kot-toevoegen.handlebars');

export default () => {
  // Data to be passed to the template
  const name = 'Rent@Gent';
  // Return the compiled template to the router
  update(compile(kotToevoegenTemplate)({ name }));
};
