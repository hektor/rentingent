// Firebase
const { getInstance } = require('../firebase/firebase');
const firebase = getInstance();
const database = firebase.database();

export default class Kot {
  constructor(kot, key) {
    this.key = key;
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
    this.city = kot['Plaats'];
    this.address = `${kot['Straat']} ${kot['Huisummer']}, ${kot['Plaats']}`;
    // this.coords = coords;
    // this.numOfRoomsInBuilding = numOfRoomsInBuilding;
    // this.description = propertyOwner;
    // this.propertyOwner = propertyOwner;
  }

  addToFavourites() {
    return new Promise((resolve, reject) => {
      database
        .ref(`kot/${this.key}`)
        .update({ favourite: true })
        .then(() => resolve(null))
        .catch(error => reject(error));
    });
  }

  removeFromFavourites() {
    return new Promise((resolve, reject) => {
      database
        .ref(`kot/${this.key}`)
        .update({ favourite: false })
        .then(() => resolve(null))
        .catch(error => reject(error));
    });
  }

  shareOnSocial() {}

  addToDatabase(kot, kotbaas) {
    if (kotbaas !== null) {
      kot.kotbaas = kotbaas;
      const ref = database.ref('kot/');
      ref.push(kot);
    }
  }

  removeFromDatabase() {
    return new Promise((resolve, reject) => {
      database
        .ref(`kot/${this.key}`)
        .remove()
        .then(() => resolve(null))
        .catch(error => reject(error));
    });
  }

  getTotalPrice() {
    return this.totalPrice;
  }
}

class Koten {
  constructor() {
    this.koten = [];
  }

  getAllKoten() {
    return new Promise((resolve, reject) => {
      database
        .ref('/kot')
        .once('value')
        .then(snapshot => {
          let koten = [];
          snapshot.forEach(kot => {
            koten.push(new Kot(kot.val(), kot.key));
            this.koten.push(kot.val());
          });
          resolve(koten);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getKotenByUser(uidUser) {
    return new Promise((resolve, reject) => {
      database
        .ref('/kot')
        .once('value')
        .then(snapshot => {
          let koten = [];
          snapshot.forEach(kot => {
            if (kot.val().kotbaas === uidUser) {
              koten.push(new Kot(kot.val(), kot.key));
            }
          });
          resolve(koten);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getAllFavourites() {
    return new Promise((resolve, reject) => {
      database
        .ref('/kot')
        .once('value')
        .then(snapshot => {
          let koten = [];
          snapshot.forEach(kot => {
            if (kot.val().favourite === true) {
              koten.push(new Kot(kot.val(), kot.key));
            }
          });
          resolve(koten);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  sortByPrice(order) {
    return this.getAllKoten().then(koten => {
      return koten.sort((a, b) =>
        a.totalPrice > b.totalPrice
          ? order
          : b.totalPrice > a.totalPrice
          ? -order
          : 0
      );
    });
  }

  getAllAddreses() {
    return this.getAllKoten().then(koten => {
      let addresses = [];
      koten.map(kot => {
        addresses.push(kot.address);
      });
      return addresses;
    });
  }

  sortBySurface(order) {
    return this.getAllKoten().then(koten => {
      return koten.sort((a, b) =>
        a.surface > b.surface ? order : b.surface > a.surface ? -order : 0
      );
    });
  }

  filterByType(byType) {
    return this.getAllKoten().then(koten => {
      return koten.filter(({ type }) => type.includes(byType));
    });
  }
}

export { Kot, Koten };
