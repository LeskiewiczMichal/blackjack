import { configureStore } from '@reduxjs/toolkit';

// Reducers
import tableReducer from './Reducers/tableReducer';
import playerReducer from './Reducers/playerReducer';

// States
import { TableState } from '../types';
import { PlayerState } from '../types';


export interface RootState {
    table: TableState,
    player: PlayerState,
}

export default configureStore({
    reducer: {
        table: tableReducer,
        player: playerReducer,
    }
});
