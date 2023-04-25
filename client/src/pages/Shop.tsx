import "./styles/shop.scss";

import { SkinsList, SkinDisplay } from "features/shop/index";
import { useAppSelector } from "hooks/hooks";
import { BackButton } from "features/interface";

export default function Shop() {
  const user = useAppSelector((state) => state.auth.user);
  const balance = useAppSelector((state) => state.player.balance);

  return (
    <main className="shop">
      <section className="shop--products">
        {user && (
          <h4>
            <i>Your balance</i>: {balance}$
          </h4>
        )}
        <SkinsList />
      </section>
      <section className="shop--preview">
        <SkinDisplay />
      </section>
      <BackButton />
    </main>
  );
}
