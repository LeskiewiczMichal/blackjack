import { AppThunk } from "store/store";
import { updateSkinsState } from "../actions/updateSkinsState";

const getUserSkins = (): AppThunk => async (dispatch) => {
  try {
    const response = await fetch("/users/skins", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const { ownedSkins, activeSkins } = await response.json();
    if (!ownedSkins || !activeSkins) {
      throw new Error("Skins not found");
    }

    await dispatch(updateSkinsState({ ownedSkins, activeSkins }));
  } catch (error: any) {
    console.error(error);
  }
};

export { getUserSkins };
