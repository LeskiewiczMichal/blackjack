import { useAppDispatch } from "Hooks/hooks"
import { newBet } from "store/Reducers/tableReducer"

const useNewBet = () => {
    const dispatch = useAppDispatch();

    const handleNewBet = () => {
        dispatch(newBet());
    }

    return { handleNewBet };
}

export default useNewBet;