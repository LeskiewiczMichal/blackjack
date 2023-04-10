import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { hit } from "actions/hit";
import { setAnimationOn } from "store/reducers/tableReducer";

export default function HitButton() {
  const dispatch = useAppDispatch();
  const animationOn = useAppSelector((state) => state.table.animationOn);

  const isDisabled = animationOn;

  const hitHandler = async () => {
    await dispatch(setAnimationOn(true));
    await dispatch(hit());
    await dispatch(setAnimationOn(false));
  };

  return (
    <button
      type="button"
      className="UI--button UI--hit-button"
      onClick={hitHandler}
      disabled={isDisabled}
    >
      HIT
    </button>
  );
}
