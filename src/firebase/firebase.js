const firebaseInstance = require('firebase');

// Initialize Firebase
// TODO: Replace with your project's config
const config = {
  apiKey: 'AIzaSyD3gkEeqHgu-VwYBYNIKfZlV7L1w_D_kR4',
  authDomain: 'gdm-signup-proj.firebaseapp.com',
  databaseURL: 'https://gdm-signup-proj.firebaseio.com',
  projectId: 'gdm-signup-proj',
  storageBucket: 'gdm-signup-proj.appspot.com',
  messagingSenderId: '52666332181',
};

let instance = null;

const initFirebase = () => {
  instance = firebaseInstance.initializeApp(config);
};

const getInstance = () => {
  if (!instance) {
    initFirebase();
  }
  return instance;
};
export {
  initFirebase,
  getInstance,
};
