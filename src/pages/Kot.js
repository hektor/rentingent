// Firebase
const { getInstance } = require('../firebase/firebase');
const firebase = getInstance();
const database = firebase.database();

export default class Kot {
  constructor(kot) {
    // kot constructor function
    this.kot = kot;
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
  }
  addToFavorites() {}
  shareOnSocial() {}
  addToDatabase() {
    const ref = database.ref('kot/');
    ref.push(this.kot);
  }
}
