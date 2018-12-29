// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import update from '../helpers/update';
import { authCheck, getUserType } from '../helpers/auth-check';

// Import the template to use
const messagesTemplate = require('../templates/messages.hbs');

// Firebase
const { getInstance } = require('../firebase/firebase');
const firebase = getInstance();
const database = firebase.database();

export default () => {
  Promise.all([authCheck(), getUserType()]).then(userResults => {
    const user = userResults[0];
    const userType = userResults[1];
    if (user) {
      let kotbaas = userType === 'kotbaas' ? true : false;
      // get messages from db
      const createdOn = new Date().getTime();
      console.log(createdOn);
      database
        .ref(`/conversation/`)
        .once('value')
        .then(snapshot => {
          snapshot.forEach(chat => {
            console.log(chat.val());
          });
        });
      update(compile(messagesTemplate)({ kotbaas }));
      requestNotificationPermission();
      spawnNotification('New message', 'hello world');
    }
  });

  const requestNotificationPermission = () => {
    if (window.Notification && Notification.permission !== 'granted') {
      Notification.requestPermission(status => {
        if (Notification.permission !== status) {
          Notification.permission = status;
        }
      });
    }
  };

  const spawnNotification = (title, message) => {
    const options = {
      body: message,
      icon: '../../images/rent-in-gent.svg'
    };
    new Notification(title, options);
  };
};
