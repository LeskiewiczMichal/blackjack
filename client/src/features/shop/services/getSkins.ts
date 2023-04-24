import { Skin } from "types.d";
import { AppThunk } from "store/store";
import { setSkins } from "store/reducers/shopReducer";

const getSkins = (): AppThunk => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:9000/skins", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const { skins } = await response.json();
    if (!skins) {
      throw new Error("Skins not found");
    }

    const skinsArray: Skin[] = skins.map((skin: any) => {
      return {
        // eslint-disable-next-line no-underscore-dangle
        id: skin._id,
        name: skin.name,
        price: skin.price,
        category: skin.category,
      };
    });

    dispatch(setSkins(skinsArray));
  } catch (error: any) {
    // TODO: Handle error
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

export { getSkins };
