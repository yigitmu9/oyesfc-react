import {onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {auth, loadWebsite} from "../firebase";
import {SnackbarTypes} from "../constants/constants";

export async function getWeather(openWeatherType?: any, latitude?: any, longitude?: any) {
    const apiKey = '92168351d1aaa4db88e8f39e9216e249';
    const url = `https://api.openweathermap.org/data/2.5/${openWeatherType}?lat=${latitude}&lon=${longitude}&APPID=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

export const checkAuthState = () => {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            unsubscribe();
            if (user) {
                try {
                    const response: any = await loadWebsite('firebaseUID');
                    const userName = Object.entries(response?.users)?.find((x: any) => x[1] === user?.uid)?.[0];
                    const isCaptain = Object.entries(response?.captain)?.some((x: any) => x[1] === user?.uid);
                    const userEmail = user?.email;
                    const userId = user?.uid;
                    resolve({
                        signedIn: true,
                        success: true,
                        userName: userName,
                        isCaptain: isCaptain,
                        email: userEmail,
                        id: userId
                    });
                } catch (error: any) {
                    const errorResponse = {
                        open: true,
                        status: SnackbarTypes.error,
                        message: error?.message,
                        duration: 18000
                    };
                    resolve({
                        success: false,
                        signedIn: false,
                        error: errorResponse
                    });
                }
            } else {
                resolve({
                    signedIn: false,
                    success: true
                });
            }
        });
    });
}

export const signOutUser = () => {
    return new Promise((resolve, reject) => {
        signOut(auth)
            .then(() => {
                resolve({
                    success: true
                });
            })
            .catch((error) => {
                reject({
                    success: false,
                    error: error
                });
            });
    });
}


export const signInUser = (email?: any, password?: any) => {
    return new Promise((resolve) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                resolve({
                    success: true
                });
            })
            .catch((error) => {
                resolve({
                    success: false,
                    error: error
                });
            });
    });
}
