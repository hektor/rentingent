// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import update from '../helpers/update';
import config from '../config';

// Import the template to use
const pageNotFoundTemplate = require('../templates/404.hbs');

export default () => {
  // Data to be passed to the template
  fetch(
    'http://api.openweathermap.org/data/2.5/forecast?id=2797657&APPID=c60aca6c405a0eb94a5d41504ecc8737'
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      const weather = {
        temp: (data.list[5].main.temp - 273.15).toFixed(1),
        description: data.list[5].weather[0].description
      };
      // Return the compiled template to the router
      update(compile(pageNotFoundTemplate)({ weather }));
    })
    .catch(error => {
      console.log(error);
      // Return the compiled template to the router
      update(compile(pageNotFoundTemplate));
    });
};
