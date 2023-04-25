import "./styles/shop.scss";

import { SkinsList, SkinDisplay } from "features/shop/index";
import { useAppSelector } from "hooks/hooks";
import { Navigate } from "react-router-dom";
import { BackButton } from "features/interface";

export default function Shop() {
  const user = useAppSelector((state) => state.auth.user);
  const balance = useAppSelector((state) => state.player.balance);

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <main className="shop">
      <section className="shop--products">
        <h4>
          <i>Your balance</i>: {balance}$
        </h4>
        <SkinsList />
      </section>
      <section className="shop--preview">
        <SkinDisplay />
      </section>
      <BackButton />
    </main>
  );
}
