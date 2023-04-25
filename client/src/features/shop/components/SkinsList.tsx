import "./skinsList.scss";
import { Skin, SkinCategories } from "types.d";

import { useAppSelector, useAppDispatch } from "hooks/hooks";
import { filterSkins } from "utils/filterSkins";
import { getSkins } from "../services/getSkins";
import { getSkinPreview } from "../services/getSkinPreview";

export default function SkinsList() {
  const dispatch = useAppDispatch();
  const skins = useAppSelector((state) => state.shop.skins);
  const ownedSkins = useAppSelector((state) => state.shop.ownedSkins);

  if (!skins) {
    dispatch(getSkins());
  }

  // filter getting only the skins that are in ownedSkins
  let filteredSkins: Skin[] = [];
  if (skins && ownedSkins) {
    filteredSkins = filterSkins(skins, ownedSkins);
  }

  return (
    <section className="skins-list--container">
      {filteredSkins?.map((skin) => (
        <button
          type="button"
          className="skins-list--button"
          key={skin.id}
          onClick={async () => dispatch(getSkinPreview(skin.id))}
        >
          {skin.name}{" "}
          {skin.category === SkinCategories.INTERFACE_BACKGROUND
            ? "Interface Background"
            : `${skin.category}`}
        </button>
      ))}
    </section>
  );
}
