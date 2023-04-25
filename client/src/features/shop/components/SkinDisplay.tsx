import "./skinDisplay.scss";

import { useAppSelector, useAppDispatch } from "hooks/hooks";
import { buySkin } from "../services/buySkin";

export default function SkinDisplay() {
  const dispatch = useAppDispatch();

  const skin = useAppSelector((state) => state.shop.skinPreview);
  const balance = useAppSelector((state) => state.player.balance);

  if (!skin) {
    return null;
  }

  const isDisabled = balance < skin.price;

  const handleBuy = async () => {
    await dispatch(buySkin(skin.id));
  };

  return (
    <>
      <div className={`skin-display--image ${skin.name}-${skin.category}`} />
      <h4 className="skin-display--text">
        <i>Name</i>: {skin.name}
      </h4>
      <h4 className="skin-display--text">
        <i>Price</i>: {skin.price}$
      </h4>
      <button
        type="button"
        className="skin-display--button"
        onClick={async () => handleBuy()}
        disabled={isDisabled}
      >
        Buy
      </button>
    </>
  );
}
