import Navigo from 'navigo';
import routes from '../routes';

const { getInstance } = require('../firebase/firebase');
const firebase = getInstance();
const database = firebase.database();

const authCheck = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        resolve(user);
      } else {
        router.navigate('/auth');
        reject(console.error('could not get current user'));
      }
    });
  });
};

const getUserType = () => {
  return authCheck().then(user => {
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
};

// Returns true if a user is signed-in.
// function isUserSignedIn() {
//   return !!firebase.auth().currentUser;
// }

export default authCheck;
export { authCheck, getUserType };
