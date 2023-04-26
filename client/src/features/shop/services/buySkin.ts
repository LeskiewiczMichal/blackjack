import { AppThunk } from "store/store";
import { updateSkinsState } from "features/skins/index";
import { setBalance } from "store/reducers/playerReducer";

const buySkin =
  (skinId: string): AppThunk =>
  async (dispatch) => {
    try {
      const response = await fetch(`/skins/buy/${skinId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const { ownedSkins, activeSkins, userBalance } = await response.json();

      await dispatch(updateSkinsState({ ownedSkins, activeSkins }));
      await dispatch(setBalance(userBalance));
    } catch (error: any) {
      console.error(error.message);
    }
  };

export { buySkin };
