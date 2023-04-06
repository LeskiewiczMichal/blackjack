import { TableState, TableAction, Action } from "../../types.d"
import { generateCards } from "./Functions/generateCards"
import { createSlice } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"

import { addCard  } from "./playerReducer"
import { addCard as dealerAddCard } from "./dealerReducer"


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
            // Add two initial cards to player
            
            
        }
        
        
    }
})

export const { incremenetBet, clearBet, deal, drawCard } = tableSlice.actions;

export default tableSlice.reducer;

