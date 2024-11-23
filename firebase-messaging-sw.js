/* eslint-disable no-restricted-globals */
import {getMessaging} from "firebase/messaging";
import {initializeApp} from "firebase/app";
import { onBackgroundMessage } from 'firebase/messaging/sw'

const firebaseConfig = {
    apiKey: "AIzaSyD40fric7XGkUEJ2jHrWkemZeIXZX1wl5w",
    authDomain: "oyesfc-stats.firebaseapp.com",
    projectId: "oyesfc-stats",
    storageBucket: "oyesfc-stats.appspot.com",
    messagingSenderId: "848270966972",
    appId: "1:848270966972:web:61d337689207541e7350b9",
    measurementId: "G-M0RK20C28Y"
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

onBackgroundMessage(messaging, (payload) => {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon,
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});
