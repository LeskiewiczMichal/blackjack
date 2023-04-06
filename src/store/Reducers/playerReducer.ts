import { PlayerState, Card } from "types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { useDispatch } from "react-redux";

import { calculateScore } from "store/Reducers/Functions/calculateScore";
import { addCardHandler } from "store/Reducers/Functions/addCardHandler";



const initialState: PlayerState = {
    cards: [],
    score: 0,
    balance: 1000,
};

export const playerSlice = createSlice({
    name: "player",
    initialState: initialState,
    reducers: {
        addCard: (state, action) => {
            // const dispatch = useDispatch();
            state.cards = addCardHandler({ cards: state.cards }, action.payload);
            state.score = calculateScore({ cards: state.cards });
        },
        setPlayerScore: (state, action) => {
            state.score = action.payload;
        },
        playerLost: (state, action: PayloadAction<number>) => {
            state.balance -= action.payload;
            state.score = 0;
            state.cards = [];
        }

    }

})

export const { addCard, setPlayerScore, playerLost } = playerSlice.actions;

export default playerSlice.reducer;