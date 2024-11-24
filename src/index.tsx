import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'
import { Provider } from 'react-redux';
import { store } from './redux/store';
import reportWebVitals from './reportWebVitals';
import OneSignal from "react-onesignal";

if (typeof window !== 'undefined') {
    OneSignal.init({
        appId: 'f90d48fc-0a75-407d-bb20-651d11d349de',
        // You can add other initialization options here
        notifyButton: {
            enable: true,
        },
        // Uncomment the below line to run on localhost. See: https://documentation.onesignal.com/docs/local-testing
        allowLocalhostAsSecureOrigin: true
    }).then(r => r);
}

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>
    );
}

// Performans ölçümü yapmak için aşağıdaki gibi bir fonksiyon geçebilirsiniz.
// Daha fazla bilgi için: https://bit.ly/CRA-vitals
reportWebVitals();
