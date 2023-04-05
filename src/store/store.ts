import { configureStore } from '@reduxjs/toolkit';
import tableReducer from './Reducers/tableReducer';
import { TableState } from '../types';


export interface RootState {
    table: TableState,
}

export default configureStore({
    reducer: {
        table: tableReducer,
    }
});
