import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedEra: null,
};

const eraSlice = createSlice({
    name: 'era',
    initialState,
    reducers: {
        changeEra: (state, action) => {
            state.selectedEra = action.payload.selectedEra;
        },
    },
});

export const { changeEra } = eraSlice.actions;
export default eraSlice.reducer;
