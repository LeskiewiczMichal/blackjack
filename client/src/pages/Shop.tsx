import "./game.css";
import "./shop.css";

import { SkinsList, SkinDisplay } from "features/shop/index";
import { useAppSelector } from "hooks/hooks";
import { Navigate } from "react-router-dom";
import { BackButton } from "features/interface";
// import { useNavigate } from "react-router-dom";

export default function Shop() {
  //   const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const balance = useAppSelector((state) => state.player.balance);

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <main className="shop">
      <BackButton />
      <section className="shop--products">
        <h4>Your balance: {balance}</h4>
        <SkinsList />
      </section>
      <section className="shop--preview">
        <SkinDisplay />
      </section>
    </main>
  );
}
