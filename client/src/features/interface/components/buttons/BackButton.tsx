import "./backButton.scss";

import { Link } from "react-router-dom";
import { useAppDispatch } from "hooks/hooks";
import { muteAudio } from "./SoundButton";

export default function BackButton() {
  const dispatch = useAppDispatch();

  return (
    <Link to="/menu">
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        type="button"
        className="back--button"
        onClick={async () => {
          await dispatch(muteAudio());
        }}
      />
    </Link>
  );
}
