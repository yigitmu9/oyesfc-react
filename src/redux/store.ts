import { configureStore } from '@reduxjs/toolkit';
import credentialsReducer from './credentialsSlice';
import databaseDataReducer from './databaseDataSlice';
import eraReducer from './eraSlice'

export const store = configureStore({
    reducer: {
        credentials: credentialsReducer,
        era: eraReducer,
        databaseData: databaseDataReducer
    },
});
