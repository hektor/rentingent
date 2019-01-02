// Firebase
const { getInstance } = require('../firebase/firebase');
const firebase = getInstance();
const database = firebase.database();

export default class User {
  constructor() {
    this.users = [];
  }
  getAllUsers(byUserType) {
    return new Promise((resolve, reject) => {
      database
        .ref('/user')
        .once('value')
        .then(snapshot => {
          let users = [];
          if (byUserType) {
            users.map(user => {
              console.log(user);
            });
          } else {
            snapshot.forEach(user => {
              users.push(new User(user.val(), user.key));
              this.users.push(user.val());
            });
          }
          resolve(users);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  }
}
