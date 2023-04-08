import { useDispatch } from "react-redux";
import { clearBet } from "store/Reducers/tableReducer";

export default function ClearButton() {
  const dispatch = useDispatch();

  const clearHandler = () => {
    dispatch(clearBet());
  };

  return (
    <button
      type="button"
      className="UI--button UI--clear-button"
      onClick={clearHandler}
    >
      CLEAR
    </button>
  );
}
