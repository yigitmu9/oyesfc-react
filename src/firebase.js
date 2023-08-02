// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase, onValue, ref} from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD40fric7XGkUEJ2jHrWkemZeIXZX1wl5w",
    authDomain: "oyesfc-stats.firebaseapp.com",
    projectId: "oyesfc-stats",
    storageBucket: "oyesfc-stats.appspot.com",
    messagingSenderId: "848270966972",
    appId: "1:848270966972:web:61d337689207541e7350b9",
    measurementId: "G-M0RK20C28Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
const distanceRef = ref(db)
let data
onValue(distanceRef, (snapshot) => {
    data = snapshot.val();
})
export const databaseData = data