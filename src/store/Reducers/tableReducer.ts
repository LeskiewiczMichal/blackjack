import { TableState, TableAction, Action } from "../../types.d"
import { generateCards } from "./Functions/generateCards"
import { createSlice } from "@reduxjs/toolkit"

const cards = generateCards();

const initialState: TableState = {
    currentBet: 0,
    cards: cards,
}

export const tableSlice = createSlice({
    name: "table",
    initialState: initialState,
    reducers: {
        incremenetBet: (state, action) => {
            state.currentBet += action.payload;
        }
        
    }
})

export const { incremenetBet } = tableSlice.actions;

export default tableSlice.reducer;

