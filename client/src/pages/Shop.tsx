import "./game.css";
import "./shop.css";

import { SkinsList, SkinDisplay } from "features/shop/index";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { Navigate } from "react-router-dom";
import { getSkins } from "features/shop/services/getSkins";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

export default function Shop() {
  //   const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <main className="shop">
      <section className="shop--products">
        <SkinsList />
      </section>
      <section className="shop--preview">
        <SkinDisplay />
      </section>
    </main>
  );
}
