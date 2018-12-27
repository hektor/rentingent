// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import update from '../helpers/update';

// Import the template to use
const messagesTemplate = require('../templates/messages.hbs');

// Firebase
const { getInstance } = require('../firebase/firebase');
const firebase = getInstance();
const database = firebase.database();

export default () => {
  update(compile(messagesTemplate)({}));
};

const messaging = firebase.messaging();

messaging.usePublicVapidKey(
  'BP2F8O4RFkxajh5cmYpvZ73VmwB-ZE1Wx8OCY9yXmAQhXL9Xo-RqmWF57JeGS3TKFd-ok63x9wJGN6SdxEhYG3o'
);

messaging
  .requestPermission()
  .then(() => {
    console.log('permission granted');
    return messaging.getToken();
  })
  .then(token => {
    console.log(token);
  })
  .catch(error => {
    console.error(error.message);
  });

messaging.onMessage(payload => {
  const message = document.querySelector('.message');
  console.log(payload);
  let data = {
    message: payload.notification.title,
    timeout: 5000,
    actionHandler() {
      location.reload();
    },
    actionText: 'Reload'
  };
  console.log(data);
  message.textContent = data;
});

// Content-Type: application/json
// Authorization: Bearer ya29.ElqKBGN2Ri_Uz...HnS_uNreA

// {
//   "message":{
//     "token" : "bk3RNwTe3H0:CI2k_HHwgIpoDKCIZvvDMExUdFQ3P1...",
//     "notification" : {
//       "body" : "This is an FCM notification message!",
//       "title" : "FCM Message",
//       }
//    }
// }
