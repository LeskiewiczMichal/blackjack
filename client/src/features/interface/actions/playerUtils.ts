import {
  Card,
  TableState,
  PlayerState,
  HelperSliceState,
  AuthReducerState,
} from "types.d";
import { AppThunk } from "store/store";
import { Howl } from "howler";
import { drawCard } from "store/reducers/tableReducer";
import {
  addCard,
  setPlayerScore,
  setBalance,
} from "store/reducers/playerReducer";
import { calculateScore } from "utils/calculateScore";
import sound from "assets/sounds/draw_card.mp3";
import { setUserBalance } from "../services/setUserBalance";

const drawSound = new Howl({
  src: [sound],
});

// Get's a random card from the deck on the table, adds it to player's hand and updates the score
const playerDrawCard = (): AppThunk => async (dispatch, getState) => {
  const { soundsPlaying } = getState().helpers as HelperSliceState;
  if (soundsPlaying) {
    drawSound.play();
  }
  const { cards } = getState().table as TableState;

  const randomCard: Card = cards[Math.floor(Math.random() * cards.length)]; // Get a random card from the deck
  await dispatch(drawCard(randomCard));
  await dispatch(addCard(randomCard));

  const { cards: playerCards } = getState().player as PlayerState;
  await dispatch(setPlayerScore(calculateScore({ cards: playerCards })));

  // eslint-disable-next-line no-promise-executor-return
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for animation to end
};

const playerSetBalance =
  (newBalance: number): AppThunk =>
  async (dispatch, getState) => {
    const { user } = getState().auth as AuthReducerState;

    if (user) {
      // Update user's balance on the server
      await dispatch(setUserBalance(newBalance));
    } else {
      await dispatch(setBalance(newBalance));
    }
  };

export { playerDrawCard, playerSetBalance };
