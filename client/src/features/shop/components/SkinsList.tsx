import "./skinsList.css";
import { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "hooks/hooks";
import { getSkins } from "../services/getSkins";

export default function SkinsList() {
  const dispatch = useAppDispatch();
  const skins = useAppSelector((state) => state.shop.skins);

  if (!skins) {
    dispatch(getSkins());
  }

  return (
    <section>
      {skins?.map((skin) => (
        <button type="button" key={skin.id}>
          {skin.name}
        </button>
      ))}
    </section>
  );
}
