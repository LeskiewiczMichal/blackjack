import "./backButton.scss";

import { Routes } from "types.d";
import { Link } from "react-router-dom";
import { useAppDispatch } from "hooks/hooks";
import { muteAudio } from "./SoundButton";

type BackButtonProps = {
  route: Routes;
};

export default function BackButton(props: BackButtonProps) {
  const dispatch = useAppDispatch();
  const { route } = props;

  return (
    <Link to={route}>
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
