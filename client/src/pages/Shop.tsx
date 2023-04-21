import "./game.css";
import "./shop.css";

import { SkinsList } from "features/shop/index";
// import { useNavigate } from "react-router-dom";

export default function Shop() {
  //   const navigate = useNavigate();

  return (
    <main className="shop">
      <section className="shop--products">
        <SkinsList />
      </section>
      <section className="shop--preview">df</section>
    </main>
  );
}
