import "./game.css";
import "./shop.css";

import { SkinsList } from "features/shop/index";
import { useAppDispatch } from "hooks/hooks";
import { getSkins } from "features/shop/services/getSkins";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

export default function Shop() {
  //   const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <main className="shop">
      <section className="shop--products">
        <SkinsList />
      </section>
      <section className="shop--preview">df</section>
    </main>
  );
}
