// Libraries
import { AnyAction, ThunkAction, configureStore } from "@reduxjs/toolkit";

// Reducers
import tableReducer from "./reducers/tableReducer";
import playerReducer from "./reducers/playerReducer";
import dealerReducer from "./reducers/dealerReducer";
import helperReducer from "./reducers/helperReducer";

export const store = configureStore({
  reducer: {
    table: tableReducer,
    player: playerReducer,
    dealer: dealerReducer,
    helpers: helperReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
