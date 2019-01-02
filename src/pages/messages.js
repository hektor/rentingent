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

// Import classes
import User from '../helpers/User';
export default () => {
  Promise.all([authCheck(), getUserType()]).then(userResults => {
    const user = userResults[0];
    const userType = userResults[1];
    if (user) {
      const kotbaas = userType === 'kotbaas' ? true : false;
      update(compile(messagesTemplate)({ kotbaas }));
      const newMessageBtn = document.querySelector('.btn__new-message__toggle');
      const newMessageEl = document.querySelector('.message__form');
      const chooseReceiverEl = document.querySelector(
        '.messages__dropdown__choose-receiver'
      );

      new User().getAllUsers('kotbaas').then(users => {
        users.forEach(user => {
          const option = document.createElement('option');
          option.text = user.first_name;
          chooseReceiverEl.add(option);
        });
      });

      const sendMessage = (text, user) => {
        const receiver =
          chooseReceiverEl.options[chooseReceiverEl.selectedIndex].text;
        const message = {
          body: text,
          sender: user.uid,
          sender_name: user.displayName,
          receiver: receiver,
          created_on: new Date().getTime()
        };
        if (message.receiver !== null) {
          return database
            .ref(`/conversation`)
            .push(message)
            .catch(error => {
              console.log(error);
            });
        }
      };

      newMessageBtn.addEventListener('click', e => {
        e.preventDefault();
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
      getMessages(user);
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

const displayMessage = (message, user) => {
  const messageEl = document.createElement('div');
  const messageSenderEl = document.createElement('h3');
  const messageTimeEl = document.createElement('span');
  const messageBodyEl = document.createElement('p');

  messageEl.setAttribute('class', 'message');
  messageSenderEl.setAttribute('class', 'message__sender');
  messageTimeEl.setAttribute('class', 'message__time');
  messageBodyEl.setAttribute('class', 'message__body');

  if (message.sender === user.uid) {
    messageSenderEl.setAttribute('class', 'message__my-message');
  } else {
    messageSenderEl.setAttribute('class', 'message__sender');
  }

  messageSenderEl.append(message.senderName);
  messageTimeEl.append(message.createdOn);
  messageBodyEl.append(message.body);

  messageEl.appendChild(messageSenderEl);
  messageEl.appendChild(messageTimeEl);
  messageEl.appendChild(messageBodyEl);

  document.querySelector('.messages').appendChild(messageEl);
};

const getMessages = user => {
  const callback = snap => {
    const data = snap.val();
    const message = {
      body: data.body,
      sender: data.sender,
      senderName: data.sender_name,
      createdOn: data.created_on
    };
    displayMessage(message, user);
  };

  database
    .ref('/conversation/')
    .limitToLast(5)
    .on('child_added', callback);
  database
    .ref('/conversation/')
    .limitToLast(5)
    .on('child_changed', callback);
};
