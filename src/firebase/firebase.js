const firebaseInstance = require('firebase');

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyBUQyEJkCLbtVhy4sg6PtaQ4qP0mTbHlD0',
  authDomain: 'mobdev1-project-hektormisplon.firebaseapp.com',
  databaseURL: 'https://mobdev1-project-hektormisplon.firebaseio.com',
  projectId: 'mobdev1-project-hektormisplon',
  storageBucket: 'mobdev1-project-hektormisplon.appspot.com',
  messagingSenderId: '29752707741'
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
export { initFirebase, getInstance };
