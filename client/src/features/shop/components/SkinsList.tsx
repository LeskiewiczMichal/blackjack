import "./skinsList.css";

import { useAppSelector, useAppDispatch } from "hooks/hooks";
import { getSkins } from "../services/getSkins";
import { getSkinPreview } from "../services/getSkinPreview";

export default function SkinsList() {
  const dispatch = useAppDispatch();
  const skins = useAppSelector((state) => state.shop.skins);
  const ownedSkins = useAppSelector((state) => state.shop.ownedSkins);

  if (!skins) {
    dispatch(getSkins());
  }

//   FILTER SKINS THAT ARE OWNED

// filter getting only the skins that are in ownedSkins
//   let filteredSkins;
//   if (ownedSkins) {
//     filteredSkins = skins?.filter((skin) =>
//       ownedSkins.find((ownedSkin) => ownedSkin.id === skin.id),
//     );
//   }

  return (
    <section className="skins-list--container">
      {skins?.map((skin) => (
        <button
          type="button"
          className="skins-list--button"
          key={skin.id}
          onClick={async () => dispatch(getSkinPreview(skin.id))}
        >
          {skin.name} {skin.category}
        </button>
      ))}
    </section>
  );
}
