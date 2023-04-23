import { Skin } from "types.d";

const filterSkins = (skins: Skin[], toRemove: Skin[]): Skin[] => {
  let filteredSkins: Skin[] = [];

  filteredSkins = skins?.filter(
    (skin) => !toRemove.find((skinFromRemove) => skinFromRemove.id === skin.id),
  );

  return filteredSkins;
};

export { filterSkins };
