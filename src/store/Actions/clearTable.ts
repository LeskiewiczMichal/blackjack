import { createAsyncThunk } from "@reduxjs/toolkit";

// Dont do anything besides dispatchin 'table/clearTable'
export const clearTable = createAsyncThunk(
    'table/clearTable',
    async (_, { dispatch }) => {
        dispatch({ type: 'table/clearTable' });
    }
);