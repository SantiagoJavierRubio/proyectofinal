import admin from 'firebase-admin'
import { firebaseData } from '../../config.js'

admin.initializeApp({
  credential: admin.credential.cert(firebaseData),
  databaseURL: "https://basedeprueba-8e5c0.firebaseio.com"
});

const db = admin.firestore()

export default db