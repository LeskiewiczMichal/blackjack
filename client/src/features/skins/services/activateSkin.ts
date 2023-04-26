import { AppThunk } from "store/store";
import { updateSkinsState } from "../actions/updateSkinsState";

const activateSkin =
  (skinId: string): AppThunk =>
  async (dispatch) => {
    try {
      const response = await fetch(`/skins/activate/${skinId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Skin not found");
      }

      const { ownedSkins, activeSkins } = await response.json();
      if (!ownedSkins || !activeSkins) {
        throw new Error("Skins not found");
      }

      await dispatch(updateSkinsState({ ownedSkins, activeSkins }));
    } catch (error: any) {
      console.error(error);
    }
  };

export { activateSkin };
