import { PlayerState, Card } from "types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { useDispatch } from "react-redux";

import { calculateScore } from "store/Reducers/Functions/calculateScore";
import { addCardHandler } from "store/Reducers/Functions/addCardHandler";
import { newBet } from "store/Reducers/tableReducer";



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
            // state.score = calculateScore({ cards: state.cards });
        },
        setPlayerScore: (state, action: PayloadAction<number>) => {
            state.score = action.payload;
        },
        setBalance: (state, action: PayloadAction<number>) => {
            state.balance = action.payload;
        },
        clearPlayerCards: (state) => {
            state.cards = [];
        }
        // playerLost: (state, action: PayloadAction<number>) => {
        //     state.balance -= action.payload;
        // },
        // playerWon: (state, action: PayloadAction<number>) => {
        //     state.balance += action.payload;
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(newBet, (state) => {
                state.cards = [];
                state.score = 0;
            })
            .addCase("table/clearTable", (state) => {
                state.cards = [];
                state.score = 0;
            })
    }

})

export const { addCard, setPlayerScore, setBalance, clearPlayerCards } = playerSlice.actions;

export default playerSlice.reducer;