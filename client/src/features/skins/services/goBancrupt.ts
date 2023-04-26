import { AppThunk } from "store/store";
import { setBalance } from "store/reducers/playerReducer";
import { updateSkinsState } from "../actions/updateSkinsState";

const goBancrupt = (): AppThunk => async (dispatch) => {
  try {
    const response = await fetch(`/users/bancrupt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Skin not found");
    }

    await dispatch(updateSkinsState({ ownedSkins: [], activeSkins: [] }));
    await dispatch(setBalance(1000));
  } catch (error: any) {
    console.error(error);
  }
};

export { goBancrupt };
