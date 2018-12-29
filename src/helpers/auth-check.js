import Navigo from 'navigo';
import routes from '../routes';

const { getInstance } = require('../firebase/firebase');
const firebase = getInstance();

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

const getUser = () => {
  Promise.all([authCheck(), userType()]);
};

// Returns true if a user is signed-in.
// function isUserSignedIn() {
//   return !!firebase.auth().currentUser;
// }

export default authCheck;
export { getUser };
