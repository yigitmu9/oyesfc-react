import {initializeApp} from "firebase/app";
import {getDatabase, onValue, ref} from "firebase/database"
import {getAuth} from "firebase/auth"

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
const db = getDatabase(app);
const distanceRef = ref(db)
export const auth = getAuth(app)
let data;

const getDataFromFirebase = () => {
    return new Promise((resolve) => {
        onValue(distanceRef, (snapshot) => {
            data = snapshot.val();
            resolve(data);
        });
    });
};

export const dataBase = db

export async function loadWebsite() {
    try {
        return await getDataFromFirebase();
    } catch (error) {
        console.error("Failed to get the Firebase data.", error);
    }
}
