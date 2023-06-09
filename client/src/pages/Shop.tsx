import "./styles/shop.scss";

import { Routes } from "types.d";
import { SkinsList, SkinDisplay } from "features/shop/index";
import { useAppSelector } from "hooks/hooks";
import { BackButton } from "features/interface";

export default function Shop() {
  const user = useAppSelector((state) => state.auth.user);
  const balance = useAppSelector((state) => state.player.balance);

  return (
    <main className="shop">
      <section className="shop--products">
        {user ? (
          <h4>
            <i>Your balance</i>: {balance}$
          </h4>
        ) : (
          <h4>
            <i>You need be logged in to buy something</i>
          </h4>
        )}
        <SkinsList />
      </section>
      <section className="shop--preview">
        <SkinDisplay />
      </section>
      <BackButton route={Routes.MENU} />
    </main>
  );
}
