import "./skinDisplay.css";

import { useAppSelector } from "hooks/hooks";

export default function SkinDisplay() {
  const skin = useAppSelector((state) => state.shop.skinPreview);

  if (!skin) {
    return null;
  }

  return (
    <>
      <div className="skin-display--image neon-chips--image" />
      <h4>{skin.name}</h4>
    </>
  );
}
