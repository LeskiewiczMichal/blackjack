import { TableState, } from "types.d"
import { createSlice } from "@reduxjs/toolkit"

import { generateCards } from "./Functions/generateCards"
import { playerLost } from "./playerReducer"


const cards = generateCards();

const initialState: TableState = {
    currentBet: 0,
    cards: cards,
    inGame: false,
}

export const tableSlice = createSlice({
    name: "table",
    initialState: initialState,
    reducers: {
        incremenetBet: (state, action) => {
            state.currentBet += action.payload;
        },
        clearBet: (state) => {
            state.currentBet = 0;
        },
        drawCard: (state, action) => {
            // Remove card given in action form the deck
            state.cards.splice(state.cards.indexOf(action.payload), 1);
            
        },
        deal: (state) => {
            if (state.currentBet < 1) { return };
            state.inGame = true;            
        },
        endGame: (state) => {
            console.log("OKAY");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(playerLost, (state, action) => {
                state.inGame = false;
                state.currentBet = 0;
            })
            // .addCase("dealer/lost", (state, action) => {
            //     state.inGame = false;
            // })
    }
})

export const { incremenetBet, clearBet, deal, drawCard, endGame } = tableSlice.actions;

export default tableSlice.reducer;