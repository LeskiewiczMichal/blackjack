import "./insurancePopup.style.css";
import { useAppDispatch } from "hooks/hooks";
import { setPopUpActive } from "store/reducers/tableReducer";
import { betInsurance } from "../actions/betInsurance";

export default function InsurancePopup() {
  const dispatch = useAppDispatch();

  const handleYes = () => {
    dispatch(betInsurance());
    dispatch(setPopUpActive(false));
  };

  const handleNo = () => {
    dispatch(setPopUpActive(false));
  };

  return (
    <div className="insurance-popup--container">
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
