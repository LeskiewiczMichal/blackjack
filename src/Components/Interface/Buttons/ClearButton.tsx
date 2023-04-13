import { useDispatch } from "react-redux";
import { clearBet } from "store/reducers/tableReducer";
import { useAppSelector } from "hooks/hooks";

export default function ClearButton() {
  const dispatch = useDispatch();
  const actionOn = useAppSelector((state) => state.table.actionOn);

  const isDisabled = actionOn;

  const clearHandler = async () => {
    await dispatch(clearBet());
  };

  return (
    <button
      type="button"
      className="UI--button UI--clear-button"
      onClick={clearHandler}
      disabled={isDisabled}
    >
      CLEAR
    </button>
  );
}
