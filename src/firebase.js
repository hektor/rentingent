import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getFunctions } from 'firebase/functions'
import { getDatabase } from 'firebase/database'

import config from './config/firebase'

const app = initializeApp(config)

const auth = getAuth(app)
const store = getFirestore(app)
const functions = getFunctions(app)
const db = getDatabase(app)

export { auth, store, functions, db }
