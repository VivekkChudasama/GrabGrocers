import Firebase from 'firebase';  

const firebaseConfig = {
  apiKey: "************",
  authDomain: "*********",
  databaseURL: "*******",
  projectId: "**********",
  storageBucket: "*************",
  messagingSenderId: "*************",
  appId: "**********"
};
  
let app = Firebase.initializeApp(config);  
export const fb = app.database(); 