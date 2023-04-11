import { useAppDispatch } from "hooks/hooks";
import { clearTable } from "actions/clearTable";

export default function NewBetButton() {
  const dispatch = useAppDispatch();

  const newBetHandler = async () => {
    await dispatch(clearTable());
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
