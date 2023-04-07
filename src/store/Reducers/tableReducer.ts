import { TableState, } from "types.d"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { generateCards } from "./Functions/generateCards"
// import { playerLost } from "./playerReducer"
import { showCards } from "./dealerReducer"


const cards = generateCards();

const initialState: TableState = {
    currentBet: 0,
    cards: cards,
    inGame: false,
    gameFinished: false,
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
            state.gameFinished = false;        
        },
        newBet: (state) => {
            state.inGame = false;
            state.gameFinished = false;
            state.currentBet = 0;
        },
        setGameFinished: (state, action: PayloadAction<boolean>) => {
            state.gameFinished = action.payload;
        },
        setInGame: (state, action: PayloadAction<boolean>) => {
            state.inGame = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // .addCase(playerLost, (state, action) => {
            //     state.gameFinished = true;
            // })
            .addCase(showCards, (state, action) => {
                state.gameFinished = true;
            })
            // .addCase("dealer/lost", (state, action) => {
            //     state.inGame = false;
            // })
    }
})

export const { incremenetBet, clearBet, deal, drawCard, newBet, setGameFinished, setInGame } = tableSlice.actions;

export default tableSlice.reducer;