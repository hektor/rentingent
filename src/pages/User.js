// Firebase

const { getInstance } = require('../firebase/firebase');
const firebase = getInstance();

export default class User {
  constructor() {
    this.user = null;
  }

  setCurrentUser(user) {
    this.user = user;
  }

  getCurrentUser() {
    console.log(this.user);
    return this.user;
  }
}
