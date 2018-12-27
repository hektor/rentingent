// // Firebase
const { getInstance } = require('../firebase/firebase');
const firebase = getInstance();
const database = firebase.database();

export default class User {
  constructor() {}

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          resolve(user);
        } else {
          reject(console.error('could not get current user'));
        }
      });
    });
  }

  getCurrentUserType() {
    return this.getCurrentUser().then(user => {
      return new Promise((resolve, reject) => {
        database
          .ref(`/user/${user.uid}`)
          .once('value')
          .then(snapshot => {
            const userType = snapshot.val().user_type;
            resolve(userType);
          })
          .catch(error => {
            reject(error);
          });
      });
    });
  }
}
