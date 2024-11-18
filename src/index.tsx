import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'
import { Provider } from 'react-redux';
import { store } from './redux/store';
import reportWebVitals from './reportWebVitals';

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
