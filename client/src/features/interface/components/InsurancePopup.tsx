import "./insurancePopup.scss";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { setPopUpActive } from "store/reducers/tableReducer";
import { betInsurance } from "../actions/betInsurance";

export default function InsurancePopup() {
  const dispatch = useAppDispatch();
  const skin = useAppSelector((state) => state.skins.interfaceBackground);

  const handleYes = () => {
    dispatch(betInsurance());
    dispatch(setPopUpActive(false));
  };

  const handleNo = () => {
    dispatch(setPopUpActive(false));
  };

  let skinClass = "Default";
  if (skin) {
    skinClass = skin.name;
  }

  return (
    <div className={`insurance-popup--container--${skinClass}`}>
      <span className="insurance-text">
        First dealer&apos;s card is an ace. You can make additional insurance
        bet worth half of current bet. If dealer has blackjack, you will get 2:1
        payout on insurance bet.
      </span>
      <div className="insurance-buttons--wrapper">
        <button type="button" className="insurance-button" onClick={handleYes}>
          Yes
        </button>
        <button type="button" className="insurance-button" onClick={handleNo}>
          No
        </button>
      </div>
    </div>
  );
}
