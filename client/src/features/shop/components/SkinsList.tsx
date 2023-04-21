import "./skinsList.css";
import { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "hooks/hooks";
import { getSkins } from "../services/getSkins";

export default function SkinsList() {
    const skins = useAppSelector((state) => state.shop.skins);

  return (
    <section>
      {/* {skins?.map((skin) => (
        <div key={skin.id} className="skin--container">
      ))} */}
    </section>
  );
}
