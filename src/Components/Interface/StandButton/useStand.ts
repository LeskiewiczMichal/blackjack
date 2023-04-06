import { useAppDispatch } from "Hooks/hooks"
import { showCards } from "store/Reducers/dealerReducer"

const useStand = () => {
    const dispatch = useAppDispatch();

    const handleStand = () => {
        dispatch(showCards());
    }

    return { handleStand };
}

export default useStand;