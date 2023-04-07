import { createAsyncThunk } from "@reduxjs/toolkit";
import { deal } from "store/Reducers/tableReducer"
import { playerDrawCard } from "./playerUtils";
import { dealerDrawCard } from "./dealerUtils";


export const makeDeal = createAsyncThunk(
    'table/deal',
    async (_, { dispatch }) => {
        await dispatch(deal());
        for (let i = 0; i < 2; i++) {
            await dispatch(playerDrawCard());
            await dispatch(dealerDrawCard());
            // let randomCard2: Card = cards[Math.floor(Math.random() * cards.length)];
            // await dispatch(drawCard(randomCard2));
            // if (i === 0) {
            //     randomCard2 = { ...randomCard2, faceUp: false };
            // }
            // await dispatch(dealerAddCard(randomCard2));
        }
    }
);