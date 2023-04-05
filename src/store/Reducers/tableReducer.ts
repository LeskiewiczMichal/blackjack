import { TableState, TableAction, Action } from "../../types.d"
import { Player } from "../../Classes/Player"
import { Dealer } from "../../Classes/Dealer"
import { generateCards } from "./Functions/generateCards"
// import { createAction, createReducer } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

const dealer = new Dealer();
const player = new Player()
const cards = generateCards();

const initialState: TableState = {
    currentBet: 0,
    cards: cards,
    // dealer: dealer,
    // player: player,
}

export const tableSlice = createSlice({
    name: "table",
    initialState: initialState,
    reducers: {
        incremenetBet: (state) => {
            state.currentBet += 1;
        }
    }
})

export const { incremenetBet } = tableSlice.actions;

export default tableSlice.reducer;


// const deal = createAction(Action.DEAL, (payload: { bet: number, balance: number }) => ({
//     payload: {
//         bet: payload.bet,
//         balance: payload.balance
//         }
//     })
// )

// const tableReducer = createReducer(initialState, (builder) => {
//     builder
//         .addCase(deal, (state, action) => {
//             state.bet = action.payload.bet
//             state.player.balance = action.payload.balance
//         })
//         // .addCase(Action.BET, (state, action) => {
//         //     state.bet = action.payload.value.reduce((acc, val) => acc + val, 0)
//         // })
// })
// export default tableReducer;
// export default function tableReducer(state = initialState, action: TableAction): TableState {
//     switch (action.type) {
//         case Action.DEAL:
//             return {
//                 ...state,
//                 bet: action.payload.bet,
//                 player: {
//                     ...state.player,
//                     balance: action.payload.balance,
//                 },
//             }
//         case Action.BET:
//             return {
//                 ...state,
//                 bet: action.payload.value.reduce((acc, val) => acc + val, 0)
//             }
//         default:
//             return state
//     }
// }