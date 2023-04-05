import { configureStore } from '@reduxjs/toolkit';

// Reducers
import tableReducer from './Reducers/tableReducer';
import playerReducer from './Reducers/playerReducer';
import dealerReducer from './Reducers/dealerReducer';

// States
import { TableState } from '../types';
import { PlayerState } from '../types';
import { DealerState } from '../types';

export interface RootState {
    table: TableState,
    player: PlayerState,
    dealer: DealerState,
}

export default configureStore({
    reducer: {
        table: tableReducer,
        player: playerReducer,
        dealer: dealerReducer,
    }
});
