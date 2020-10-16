import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyAV3UcH7VhZtCv6amnaPWpbuiObw_KfAYs",
    authDomain: "chating-a09b0.firebaseapp.com",
    databaseURL: "https://chating-a09b0.firebaseio.com",
    projectId: "chating-a09b0",
    storageBucket: "chating-a09b0.appspot.com",
    messagingSenderId: "589405936379",
    appId: "1:589405936379:web:85a76b7bd534424fa42e5e",
    measurementId: "G-VMKSYES4Q7"
  }

const firebaseApp =  firebase.initializeApp(firebaseConfig)

const db =firebaseApp.firestore()
const auth =firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { provider, auth}
export default db