import { combineReducers } from "redux";
import  tableReducer from "../Reducers/tableReducer";

const rootReducer = combineReducers({
    table: tableReducer,
});

export default rootReducer;