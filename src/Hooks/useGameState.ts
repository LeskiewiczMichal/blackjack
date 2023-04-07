import { RootState } from "store/store";

import { useSelector, useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "./hooks";
// import {  } from "store/Reducers/playerReducer";
import { setGameFinished } from "store/Reducers/tableReducer";
import { showCards } from "store/Reducers/dealerReducer";

const useGameState = () => {
    const dispatch = useAppDispatch();
    
    const finishGame = () => {
        showCards();
        dispatch(setGameFinished(true));
        
    }


    return { finishGame };
}

export default useGameState;