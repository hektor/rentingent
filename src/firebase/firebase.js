import firebase from 'firebase/app'
import 'firebase/firebase-firestore'
import 'firebase/firebase-auth'
import 'firebase/firebase-functions'
import 'firebase/firebase-storage'

const config = {
  apiKey: 'AIzaSyBUQyEJkCLbtVhy4sg6PtaQ4qP0mTbHlD0',
  authDomain: 'mobdev1-project-hektormisplon.firebaseapp.com',
  databaseURL: 'https://mobdev1-project-hektormisplon.firebaseio.com',
  projectId: 'mobdev1-project-hektormisplon',
  storageBucket: 'mobdev1-project-hektormisplon.appspot.com',
  messagingSenderId: '29752707741',
}

firebase.initializeApp(config)

const Auth = firebase.auth()
const Store = firebase.firestore()
const Functions = firebase.app().functions()
const Database = firebase.storage()

export { Auth, Store, Functions, Database }
