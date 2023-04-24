import { Skin, SkinCategories } from "types.d";
import { AppThunk } from "store/store";
import { setOwnedSkins } from "store/reducers/shopReducer";
import {
  setActiveSkins,
  SetActiveSkinsProps,
} from "store/reducers/activeSkinsReducer";

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

    const activeSkinsObject: SetActiveSkinsProps = {
      chips: null,
      cards: null,
      interfaceBackground: null,
    };

    activeSkinsArray.forEach((skin) => {
      const category = skin.category as SkinCategories;
      switch (category) {
        case SkinCategories.CHIPS:
          activeSkinsObject.chips = skin;
          break;
        case SkinCategories.CARDS:
          activeSkinsObject.cards = skin;
          break;
        case SkinCategories.INTERFACE_BACKGROUND:
          activeSkinsObject.interfaceBackground = skin;
          break;
        default:
          break;
      }
    });

    await dispatch(setOwnedSkins(ownedSkinsArray));
    await dispatch(setActiveSkins(activeSkinsObject));
  };

export { updateSkinsState };
