// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import update from '../helpers/update';
import firebase from 'firebase'; // @@@TODO --> make global functions for firebase / create an instance of firebase here

// Import the template to use
const zoekKotTemplate = require('../templates/zoek-kot.handlebars');

export default () => {
  function dynamicSort(filterBy) {
    const sortOrder = 1;
    return function(a, b) {
      let result =
        a[filterBy] < b[filterBy] ? -1 : a[filterBy] > b[filterBy] ? 1 : 0;
      console.log(result * sortOrder);
      return result * sortOrder;
    };
  }

  const filterKoten = koten => {
    const filterByEl = document.querySelector('.zoek-kot__filter__dropdown');
    filterByEl.addEventListener('change', e => {
      const filterByValue = filterByEl.options[filterByEl.selectedIndex].text;
      switch (filterByValue) {
        case 'Price':
          console.log('price');
          dynamicSort(filterByValue);
          console.log()
          console.log(dynamicSort(filterByValue));
          break;
        case 'Type':
          console.log('type');
          break;
        case 'Surface':
          console.log('surface');
          break;
      }
    });

    // - Type
    // - Huurprijs (van x - x)
    // - Oppervlakte
    // - Afstand (van x - x) @@@ pass in distance
  };

  // const name = 'RentInGent';
  const ref = firebase.database().ref('/kot');
  ref.once('value', snapshot => {
    // Data to be passed to the template
    let koten = [];
    snapshot.forEach(kot => {
      const kotKey = kot.key;
      const kotData = kot.val();
      koten.push(new Kot(kotData));
    });
    // Return the compiled template to the router
    update(compile(zoekKotTemplate)({ koten }));
    filterKoten(koten);
  });
};

// kot constructor function
function Kot(kot) {
  this.name = kot['Naam'];
  this.status = kot['Status'];
  this.totalPrice = kot['Totale prijs'];
  this.warranty = kot['Waarborg'];
  this.type = kot['Type'];
  this.surface = kot['Oppervlakte'];
  this.floor = kot['Verdieping'];
  // this.numOfPersons = totaal aantal personen in gebouw;
  this.hasToilet = kot['Privé toilet'];
  this.hasShower = kot['Privé douche'];
  // this.hasBath = bad aanwezig;
  this.hasKitchen = kot['Privé keuken'];
  this.hasFurniture = kot['Opties'];
  // this.pictures = foto's van het kot;
  this.address = kot['Straat'] + ' ' + kot['Huisummer'];
  this.city = kot['Plaats'];
  // this.coords = coords;
  // this.numOfRoomsInBuilding = numOfRoomsInBuilding;
  // this.description = propertyOwner;
  // this.propertyOwner = propertyOwner;

  this.filter = filterOn => {
    switch (filterOn) {
      case 'type':
        console.log('filter on type');
        break;
      case 'price':
        console.log('filter on price');
        break;
      case 'surface':
        console.log('filter on surface');
        break;
      case 'distance':
        console.log('filter on distance');
        break;
      default:
        console.log('filter on default');
        break;
    }
  };
  this.addToFavorites = () => {};
  this.shareOnSocial = () => {};
}
