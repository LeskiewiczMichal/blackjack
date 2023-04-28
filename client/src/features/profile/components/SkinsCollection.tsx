import "./skinsCollection.scss";
import { Skin, SkinCategories } from "types.d";

export type SkinsCollectionProps = {
  callback: (skinId: string) => void;
  skinsArray: Skin[];
  header: string;
};

export default function SkinsCollection(props: SkinsCollectionProps) {
  const { callback, skinsArray, header } = props;

  return (
    <section className="profile--collection">
      <h2>{header}</h2>
      <section>
        {skinsArray?.map((skin) => {
          return (
            <button
              type="button"
              className="profile--collection-skin"
              key={skin.id}
              onClick={async () => callback(skin.id)}
            >
              {skin.name}{" "}
              {skin.category === SkinCategories.INTERFACE_BACKGROUND
                ? "Interface"
                : `${skin.category}`}
            </button>
          );
        })}
      </section>
    </section>
  );
}
