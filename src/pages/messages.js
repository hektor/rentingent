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
  messaging.usePublicVapidKey(
    'BP2F8O4RFkxajh5cmYpvZ73VmwB-ZE1Wx8OCY9yXmAQhXL9Xo-RqmWF57JeGS3TKFd-ok63x9wJGN6SdxEhYG3o'
  );
};
