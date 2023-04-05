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
        deal: (state, { payload: dispatch }) => {
            if (state.currentBet < 1) { return };
            state.inGame = true;
            // Add two initial cards to player
            
            for (let i = 0; i < 2; i++) {
                // let card = state.cards.splice(Math.floor(Math.random() * state.cards.length), 1)[0];
                // console.log(card);
                // dispatch(addCard(card));
                // card = state.cards.splice(Math.floor(Math.random() * state.cards.length), 1)[0];
                // dispatch(dealerAddCard(card));
            }
        }
        
        
    }
})

export const { incremenetBet, clearBet, deal } = tableSlice.actions;

export default tableSlice.reducer;

