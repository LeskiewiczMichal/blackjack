import "./game.css";
import "./profile.css";

import { Navigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "hooks/hooks";
import { activateSkin } from "features/skins/services/activateSkin";

export default function Profile() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);
  const email = useAppSelector((state) => state.auth.email);
  const ownedSkins = useAppSelector((state) => state.shop.ownedSkins);
  const activeSkins = useAppSelector((state) => state.shop.activeSkins);

  if (!user) {
    return <Navigate to="/" />;
  }

  let filteredSkins;
  if (activeSkins) {
    // Remove skins that are in acriveSkins from ownedSkins
    filteredSkins = ownedSkins?.filter((ownedSkin) =>
      activeSkins.find((activeSkin) => activeSkin.id === ownedSkin.id),
    );
  }

  return (
    <div className="App">
      <section className="profile--content">
        <main className="profile--info">
          <h1>Profile</h1>
          <p>Username: {user}</p>
          <p>Email: {email}</p>
        </main>
        <section className="profile--collection">
          <h2>Active skins:</h2>
          {activeSkins?.map((skin) => {
            return (
              <button
                type="button"
                className="profile--collection-skin"
                key={skin.id}
              >
                <p>{skin.name}</p>
              </button>
            );
          })}
          <h2>Owned skins:</h2>
          {filteredSkins?.map((skin) => {
            return (
              <button
                type="button"
                className="profile--collection-skin"
                key={skin.id}
                onClick={async () => dispatch(activateSkin(skin.id))}
              >
                <p>{skin.name}</p>
              </button>
            );
          })}
        </section>
      </section>
    </div>
  );
}
