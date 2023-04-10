import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { setAnimationOn } from "store/reducers/tableReducer";
import { deal } from "actions/deal";

export default function DealButton() {
  const dispatch = useAppDispatch();
  const currentBet = useAppSelector((state) => state.table.currentBet);
  const animationOn = useAppSelector((state) => state.table.animationOn);

  const isDisabled: boolean = currentBet === 0 || animationOn;

  const dealHandler = async () => {
    await dispatch(setAnimationOn(true));
    await dispatch(deal());
    await dispatch(setAnimationOn(false));
  };

  return (
    <button
      type="button"
      className={`UI--button UI--deal-button ${
        isDisabled ? "UI--button-disabled" : ""
      }`}
      onClick={dealHandler}
      disabled={isDisabled}
    >
      DEAL
    </button>
  );
}
