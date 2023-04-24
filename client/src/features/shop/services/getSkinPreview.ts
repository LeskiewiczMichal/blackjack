import { AppThunk } from "store/store";
import { setSkinPreview } from "store/reducers/shopReducer";

const getSkinPreview =
  (skinId: string): AppThunk =>
  async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:9000/skins/${skinId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const { skin } = await response.json();
      if (!skin) {
        throw new Error("Skin not found");
      }

      const skinPreview = {
        // eslint-disable-next-line no-underscore-dangle
        id: skin._id,
        name: skin.name,
        price: skin.price,
        category: skin.category,
      };

      dispatch(setSkinPreview(skinPreview));
    } catch (error: any) {
      console.error(error);
    }
  };

export { getSkinPreview };
