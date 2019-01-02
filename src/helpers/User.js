// Firebase
const { getInstance } = require('../firebase/firebase');
const firebase = getInstance();
const database = firebase.database();

export default class User {
  constructor() {
    this.users = [];
  }
  getAllUsers() {
    return new Promise((resolve, reject) => {
      database
        .ref('/user')
        .once('value')
        .then(snapshot => {
          let users = [];
          snapshot.forEach(user => {
            users.push(new User(user.val(), user.key));
            this.users.push(user.val());
          });
          resolve(users);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
