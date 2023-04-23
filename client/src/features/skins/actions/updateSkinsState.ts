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

    // TODO: Refactor this
    // eslint-disable-next-line no-restricted-syntax
    for (const skin of activeSkinsArray) {
      const category = skin.category as SkinCategories;

      if (category === SkinCategories.CHIPS) {
        activeSkinsObject.chips = skin;
      } else if (category === SkinCategories.CARDS) {
        activeSkinsObject.cards = skin;
      } else if (category === SkinCategories.INTERFACE_BACKGROUND) {
        activeSkinsObject.interfaceBackground = skin;
      }
    }

    await dispatch(setOwnedSkins(ownedSkinsArray));
    await dispatch(setActiveSkins(activeSkinsObject));
  };

export { updateSkinsState };
