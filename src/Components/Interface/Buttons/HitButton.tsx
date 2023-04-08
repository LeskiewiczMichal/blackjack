import { useAppDispatch } from "Hooks/hooks";
import { hit } from "Actions/hit";

export default function HitButton() {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(hit());
  };

  return (
    <button
      type="button"
      className="UI--button UI--hit-button"
      onClick={handleClick}
    >
      Hit
    </button>
  );
}
