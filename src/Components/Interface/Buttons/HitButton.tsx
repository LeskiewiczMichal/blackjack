import { useAppDispatch } from "Hooks/hooks";
import { hit } from "Actions/hit";

export default function HitButton() {
  const dispatch = useAppDispatch();

  const hitHandler = async () => {
    await dispatch(hit());
  };

  return (
    <button
      type="button"
      className="UI--button UI--hit-button"
      onClick={hitHandler}
    >
      Hit
    </button>
  );
}
