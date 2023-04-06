import { RootState } from "store/store";

import { useSelector, useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "./hooks";
import { playerLost } from "store/Reducers/playerReducer";

export function useGameState() {
    const dispatch = useAppDispatch();
    const bet = useAppSelector((state: RootState) => state.table.currentBet);

    const lost = () => {
        dispatch(playerLost(bet));
    }
    


    return { lost };
}