importScripts('https://www.gstatic.com/firebasejs/5.7.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.7.0/firebase-messaging.js');
// "https://www.gstatic.com/firebasejs/5.7.0/firebase-auth.js"
// "https://www.gstatic.com/firebasejs/5.7.0/firebase-database.js"
// "https://www.gstatic.com/firebasejs/5.7.0/firebase-firestore.js"
// "https://www.gstatic.com/firebasejs/5.7.0/firebase-messaging.js"
// "https://www.gstatic.com/firebasejs/5.7.0/firebase-functions.js"

const config = {
  apiKey: 'AIzaSyBUQyEJkCLbtVhy4sg6PtaQ4qP0mTbHlD0',
  authDomain: 'mobdev1-project-hektormisplon.firebaseapp.com',
  databaseURL: 'https://mobdev1-project-hektormisplon.firebaseio.com',
  projectId: 'mobdev1-project-hektormisplon',
  storageBucket: 'mobdev1-project-hektormisplon.appspot.com',
  messagingSenderId: '29752707741'
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(payload => {
  const title = 'hello world';
  const options = {
    body: payload.data.status
  };
  return self.registration.showNotification(title, options);
});
