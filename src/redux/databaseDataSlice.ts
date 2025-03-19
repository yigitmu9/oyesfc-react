import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allData: null,
    filteredData: null,
    loadingData: true
};

const databaseDataSlice = createSlice({
    name: 'databaseData',
    initialState,
    reducers: {
        updateData: (state, action) => {
            state.allData = action.payload.allData;
            state.filteredData = action.payload.filteredData;
            state.loadingData = action.payload.loadingData;
        },
    },
});

export const { updateData } = databaseDataSlice.actions;
export default databaseDataSlice.reducer;
