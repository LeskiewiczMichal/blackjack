import { useAppDispatch } from "Hooks/hooks";
import { clearTable } from "Actions/clearTable";

export default function NewBetButton() {
  const dispatch = useAppDispatch();

  const newBetHandler = () => {
    dispatch(clearTable());
  };

  return (
    <button
      type="button"
      className="UI--button UI--newBet-button"
      onClick={newBetHandler}
    >
      NEW BET
    </button>
  );
}
