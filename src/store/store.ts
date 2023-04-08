// Libraries
import { configureStore } from "@reduxjs/toolkit";

// Reducers
import tableReducer from "./Reducers/tableReducer";
import playerReducer from "./Reducers/playerReducer";
import dealerReducer from "./Reducers/dealerReducer";

export const store = configureStore({
  reducer: {
    table: tableReducer,
    player: playerReducer,
    dealer: dealerReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
