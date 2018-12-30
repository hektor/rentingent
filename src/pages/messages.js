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
      update(compile(messagesTemplate)({ kotbaas }));
      const newMessageBtn = document.querySelector('.btn__new-message__toggle');
      const newMessageEl = document.querySelector('.message__form');

      newMessageBtn.addEventListener('click', e => {
        newMessageEl.classList.toggle('hidden');
      });
      newMessageEl.addEventListener('submit', e => {
        e.preventDefault();
        const message = document.querySelector('.new-message__input').value;
        if (message !== '') {
          sendMessage(message, user);
        }
      });
      requestNotificationPermission();
      getMessages();
      //spawnNotification('New message', 'hello world');
    }
  });

  const requestNotificationPermission = () => {
    if (window.Notification && Notification.permission !== 'granted') {
      Notification.requestPermission(status => {
        status === 'granted'
          ? spawnNotification('Thank you,', 'Notifications are now enabled')
          : console.log('Notifications blocked');
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

const sendMessage = (text, user) => {
  const message = {
    message: text,
    sender: user.uid,
    created_on: new Date().getTime()
  };
  return database
    .ref(`/conversation/${user.uid}`)
    .push(message)
    .catch(error => {
      console.log(error);
    });
};

function getMessages() {
  // Loads the last 12 messages and listen for new ones.
  const callback = snap => {
    var data = snap.val();
    console.log(data);
    //displayMessage(snap.key, data.message, data.sender, data.created_on);
  };

  database
    .ref('/conversation/')
    .limitToLast(12)
    .on('child_added', callback);
  database
    .ref('/conversation/')
    .limitToLast(12)
    .on('child_changed', callback);
}
