// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import update from '../helpers/update';
import '../index';
import { stringify } from 'querystring';

// Import the template to use
const studentHomeTemplate = require('../templates/student-home.handlebars');
const kotbaasHomeTemplate = require('../templates/kotbaas-home.handlebars');

export default () => {
  // Data to be passed to the template

  const user = 'user';
  // Return the compiled template to the router

  // check user-type here and load home page accordingly

  // check if user is activated - if not, load activation-home.handlebars

  update(compile(studentHomeTemplate)({ user }));

  class RenderKot {
    constructor(name, status) {
      //  Eigenschappen kot
      //    Huurprijs
      //    Waarborg
      //    Type [Kamer, Studio, ...]
      //    Oppervlakte
      //    Verdieping
      //    Aantal personen
      //    Toilet [Prive, Gedeeld, Niet aanwezig]
      //    Douche [Prive, Gedeeld, Niet aanwezig]
      //    Bad [Prive, Gedeeld, Niet aanwezig]
      //    Keuken [Prive, Gedeeld, Niet aanwezig]
      //    Bemeubeld [Ja, Nee]
      //    Indien Ja, omschrijving van meubels
      //    Foto's
      //    Adres - Coordinaten
      //    Totaal aantal entiteiten in het pand
      //    Vrije ingave - beschrijving - opmerkingen
      //    Kotbaas
      this.name = name;
      this.status = status;
      this.totalPrice = totalPrice;
      this.warranty = warranty;
      this.type = type;
      this.surface = surface;
      this.floor = floor;
      this.numOfPersons = numOfPersons;
      this.hasToilet = hasToilet;
      this.hasShower = hasShower;
      this.hasBath = hasBath;
      this.hasKitchen = hasKitchen;
      this.hasFurniture = hasFurniture;
      this.pictures = pictures;
      this.address = address;
      this.coords = coords;
      this.numOfRoomsInBuilding = numOfRoomsInBuilding;
      this.description = propertyOwner;
      this.propertyOwner = propertyOwner;
    }
  }
};
