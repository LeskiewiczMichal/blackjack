import "./skinDisplay.scss";

import "../../interface/components/chip.scss";
import "../../table/components/card.scss";
import "../../interface/components/UI.scss";
import { SkinCategories } from "types.d";
import { useAppSelector, useAppDispatch } from "hooks/hooks";
import { buySkin } from "../services/buySkin";

export default function SkinDisplay() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);
  const skin = useAppSelector((state) => state.shop.skinPreview);
  const balance = useAppSelector((state) => state.player.balance);

  if (!skin) {
    return null;
  }

  const isDisabled = balance < skin.price;

  const handleBuy = async () => {
    await dispatch(buySkin(skin.id));
  };

  let itemPreview: JSX.Element | null = null;
  if (skin.category === SkinCategories.CHIPS) {
    itemPreview = <div className={`chip chip-hundred--${skin.name}`} />;
  } else if (skin.category === SkinCategories.CARDS) {
    itemPreview = <div className={`card HEARTSA--${skin.name} `} />;
  } else if (skin.category === SkinCategories.INTERFACE_BACKGROUND) {
    itemPreview = (
      <div
        className={`interface--background--${skin.name}`}
        style={{ width: "100px", height: "100px" }}
      />
    );
  }

  return (
    <>
      {itemPreview}
      <h4 className="skin-display--text">
        <i>Name</i>: {skin.name}
      </h4>
      <h4 className="skin-display--text">
        <i>Price</i>: {skin.price}$
      </h4>
      {user && (
        <button
          type="button"
          className="skin-display--button"
          onClick={async () => handleBuy()}
          disabled={isDisabled}
        >
          Buy
        </button>
      )}
    </>
  );
}
