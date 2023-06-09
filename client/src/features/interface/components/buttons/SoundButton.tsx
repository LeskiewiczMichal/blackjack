import "./soundButton.scss";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { setSoundsPlaying } from "store/reducers/helperReducer";
import background from "assets/sounds/background.mp3";
import { Howl } from "howler";
import { useEffect } from "react";
import { AppThunk } from "store/store";

const sound = new Howl({
  src: [background],
  loop: true,
});

export const muteAudio = (): AppThunk => async (dispatch) => {
  Howler.stop();
  await dispatch(setSoundsPlaying(false));
};

export default function SoundButton() {
  const dispatch = useAppDispatch();
  const soundsPlaying = useAppSelector((state) => state.helpers.soundsPlaying);

  // Play audio in inital render
  useEffect(() => {
    const setState = async () => {
      await dispatch(setSoundsPlaying(true));
    };
    sound.play();
    setState();
  }, []);

  const playAudio = async () => {
    sound.play();
    await dispatch(setSoundsPlaying(true));
  };

  const pauseAudio = async () => {
    Howler.stop();
    await dispatch(setSoundsPlaying(false));
  };

  return soundsPlaying ? (
    <button
      type="button"
      className="sound-button audio-on"
      onClick={pauseAudio}
      aria-label="mute audio"
    />
  ) : (
    <button
      type="button"
      className="sound-button audio-off"
      onClick={playAudio}
      aria-label="play audio"
    />
  );
}
