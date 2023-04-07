// Types
import { PlayerType } from "types.d";
import { RootState } from "store/store";

// Libraries
import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";

// Functions
import { showCards } from "store/Reducers/dealerReducer";
import { setGameFinished } from "store/Reducers/tableReducer";
import { setBalance } from "store/Reducers/playerReducer";
import { dealerDrawCard } from "./dealerUtils";

type Winner = PlayerType | null;

// End game and check who won
export const finishGame = createAsyncThunk(
    "game/finishGame",
    async (_, { getState ,dispatch  }) => {        
        await dispatch(showCards()); // Flip dealer's hidden card
        await dispatch(setGameFinished(true)); // Set gameFinished to true

        let state = getState() as RootState;

        // If player did go over 21, he already lost
        if (state.player.score > 21) {
            await dispatch(playerLost());
            return;
        }

        // Dealer draws cards untill he's score is 17 or more
        let dealerScore = state.dealer.score;
        while (dealerScore < 17) {
            await dispatch(dealerDrawCard());
            state = getState() as RootState;
            dealerScore = state.dealer.score;
        }

        // Chechking game's result - if dealer did go over 21 and if not comparing with player
        const winner: Winner = unwrapResult(await dispatch(checkGameResult()));
        if (winner === PlayerType.PLAYER) {
            await dispatch(playerWon());
        } else if (winner === PlayerType.DEALER) {
            await dispatch(playerLost());
        } else {
            console.log("draw");
        }
    }
);

// Returns type of player who won or null if it's a draw
const checkGameResult = createAsyncThunk(
    "game/checkGameResult",
    async (_, { getState }): Promise<Winner> => {
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

// Add's money to player's account
const playerWon = createAsyncThunk(
    "game/playerWon",
    async (_, { getState, dispatch }) => {
        const state = getState() as RootState;
        const bet = state.table.currentBet;
        const balance = state.player.balance;
        dispatch(setBalance(balance + bet));
    }
);

// Remove's money from player's account
const playerLost = createAsyncThunk(
    "game/playerWon",
    async (_, { getState, dispatch }) => {
        const state = getState() as RootState;
        const bet = state.table.currentBet;
        const balance = state.player.balance;
        dispatch(setBalance(balance - bet));
    }
);
