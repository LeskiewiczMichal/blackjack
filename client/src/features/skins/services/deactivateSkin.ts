import { AppThunk } from "store/store";
import { updateSkinsState } from "../actions/updateSkinsState";

const deactivateSkin =
  (skinId: string): AppThunk =>
  async (dispatch) => {
    try {
      const response = await fetch(`/skins/deactivate/${skinId}`, {
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

export { deactivateSkin };
