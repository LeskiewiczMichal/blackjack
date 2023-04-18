import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { hit } from "actions/hit";

export default function HitButton() {
  const dispatch = useAppDispatch();
  const actionOn = useAppSelector((state) => state.table.actionOn);

  const isDisabled = actionOn;

  const hitHandler = async () => {
    await dispatch(hit());
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
