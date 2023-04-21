import { Skin } from "types";
import { AppThunk } from "store/store";
import { setOwnedSkins, setActiveSkins } from "store/reducers/shopReducer";

export type UpdateSkinsStateProps = {
  ownedSkins: Skin[];
  activeSkins: Skin[];
};

const updateSkinsState =
  (props: UpdateSkinsStateProps): AppThunk =>
  async (dispatch) => {
    const { ownedSkins, activeSkins } = props;

    const ownedSkinsArray: Skin[] = ownedSkins.map((skin: any) => {
      return {
        // eslint-disable-next-line no-underscore-dangle
        id: skin._id,
        name: skin.name,
        price: skin.price,
        prevImage: skin.prevImage,
        category: skin.category,
      };
    });

    const activeSkinsArray: Skin[] = activeSkins.map((skin: any) => {
      return {
        // eslint-disable-next-line no-underscore-dangle
        id: skin._id,
        name: skin.name,
        price: skin.price,
        prevImage: skin.prevImage,
        category: skin.category,
      };
    });

    await dispatch(setOwnedSkins(ownedSkinsArray));
    await dispatch(setActiveSkins(activeSkinsArray));
  };

export { updateSkinsState };
