// // Firebase
const { getInstance } = require('../firebase/firebase');
const firebase = getInstance();
const database = firebase.database();

export default class User {
  constructor() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.uid = this.user ? this.user.uid : null;
    this.userType = this.getUserType();
    // this.userEmail = user.email;
    // this.userEmailVerified = user.emailVerified;
  }

  getUser() {
    return this.user;
  }

  getUserType() {
    if (this.uid) {
      database.ref(`/user/${this.uid}`).on('value', snapshot => {
        localStorage.setItem('currentUserType', snapshot.val().user_type);
      });
    }
  }
}
