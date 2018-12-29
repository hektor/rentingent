// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import update from '../helpers/update';
import { authCheck, getUserType } from '../helpers/auth-check';

// Import the template to use
const pageNotFoundTemplate = require('../templates/404.hbs');

export default () => {
  Promise.all([authCheck(), getUserType()]).then(userResults => {
    const user = userResults[0];
    const userType = userResults[1];
    if (user) {
      let kotbaas = userType === 'kotbaas' ? true : false;
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
          update(compile(pageNotFoundTemplate)({ kotbaas, weather }));
        })
        .catch(error => {
          console.log(error);
          update(compile(pageNotFoundTemplate)({ kotbaas }));
        });
    }
  });
};
