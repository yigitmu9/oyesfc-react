import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allData: null,
    filteredData: null,
};

const databaseDataSlice = createSlice({
    name: 'databaseData',
    initialState,
    reducers: {
        updateData: (state, action) => {
            state.allData = action.payload.allData;
            state.filteredData = action.payload.filteredData;
        },
    },
});

export const { updateData } = databaseDataSlice.actions;
export default databaseDataSlice.reducer;
