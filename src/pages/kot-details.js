// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import update from '../helpers/update';

// Import the template to use
const kotDetailsTemplate = require('../templates/kot-details.hbs');

export default () => {
  update(compile(kotDetailsTemplate)({ kot }));
};
