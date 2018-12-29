// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import update from '../helpers/update';
import authCheck from '../helpers/auth-check';

// Import the template to use
const messagesTemplate = require('../templates/messages.hbs');

// Firebase
const { getInstance } = require('../firebase/firebase');
const firebase = getInstance();
const database = firebase.database();

export default () => {
  authCheck().then(user => {
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

    function sendMessage(message) {}
    update(compile(messagesTemplate)({}));
  });
};
