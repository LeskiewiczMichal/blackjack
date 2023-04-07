import { Card, PlayerType } from "types.d";
import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";

import { showCards, addCard as dealerAddCard } from "store/Reducers/dealerReducer";
import { gameFinished, drawCard } from "store/Reducers/tableReducer";
import { RootState } from "store/store";
import { setBalance } from "store/Reducers/playerReducer";

export const finishGame = createAsyncThunk(
    "game/finishGame",
    async (_, { getState ,dispatch  }) => {        
        await dispatch(showCards()); // Flip dealer's hidden card
        await dispatch(gameFinished(true)); // Set gameFinished to true

        let state = getState() as RootState;

        // If player did go over 21, he lost
        if (state.player.score > 21) {
            await dispatch(playerLost());
            return;
        }

        // Dealer draws cards untill he's score is 17 or more
        let dealerScore = state.dealer.score;
        while (dealerScore < 17) {
            const randomCard: Card = state.table.cards[Math.floor(Math.random() * state.table.cards.length)];
            await dispatch(drawCard(randomCard));
            await dispatch(dealerAddCard(randomCard));            
            dealerScore += randomCard.value;
        }

        // Chechking game's result - dealer going over 21 and than comparing with player
        const winner: PlayerType | null = unwrapResult(await dispatch(checkGameResult()));
        if (winner === PlayerType.PLAYER) {
            await dispatch(playerWon());
        } else if (winner === PlayerType.DEALER) {
            await dispatch(playerLost());
        } else {
            console.log("draw");
        }
    }
);


const checkGameResult = createAsyncThunk(
    "game/checkGameResult",
    async (_, { getState, dispatch }): Promise<PlayerType | null> => {
        const state = getState() as RootState;
        const dealerScore = state.dealer.score;
        const playerScore = state.player.score;

        if (dealerScore > 21 || playerScore > dealerScore) {
            return PlayerType.PLAYER;
        } else if (playerScore < dealerScore) {
            return PlayerType.DEALER;
        }
        return null;
    }
);

const playerWon = createAsyncThunk(
    "game/playerWon",
    async (_, { getState, dispatch }) => {
        const state = getState() as RootState;
        const bet = state.table.currentBet;
        const balance = state.player.balance;
        dispatch(setBalance(balance + bet));
    }
);

const playerLost = createAsyncThunk(
    "game/playerWon",
    async (_, { getState, dispatch }) => {
        const state = getState() as RootState;
        const bet = state.table.currentBet;
        const balance = state.player.balance;
        dispatch(setBalance(balance - bet));
    }
);
