import { AppThunk } from "store/store";
import { playerDrawCard } from "actions/playerUtils";
import { finishGame } from "actions/finishGame";
import { playerDidSplit, switchHands } from "actions/split";
import { PlayerState } from "types";
import { wrapActionIntoSetActionOn } from "./wrapActionIntoHandler";

// Draw a card for the player
const hit = (): AppThunk => async (dispatch, getState) => {
  await dispatch(playerDrawCard());

  const { score: playerScore } = getState().player as PlayerState;

  // If player score is over 21, hand is lost
  if (playerScore > 21) {
    const splitActive: boolean = await dispatch(playerDidSplit());
    if (splitActive) {
      await dispatch(switchHands());
    } else {
      await dispatch(finishGame());
    }
  }
};

const hitWithSetActionOn = (): AppThunk =>
  wrapActionIntoSetActionOn(async (dispatch) => {
    await dispatch(hit());
  });

export { hitWithSetActionOn as hit };
