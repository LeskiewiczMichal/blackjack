import "./profile.scss";
import { Skin } from "types.d";

import { Navigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "hooks/hooks";
import { activateSkin } from "features/skins/services/activateSkin";
import { deactivateSkin } from "features/skins/services/deactivateSkin";
import { filterSkins } from "utils/filterSkins";
import { BackButton } from "features/interface";

export default function Profile() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);
  const email = useAppSelector((state) => state.auth.email);
  const ownedSkins = useAppSelector((state) => state.shop.ownedSkins);
  const activeSkins = useAppSelector((state) => state.skins);

  if (!user) {
    return <Navigate to="/" />;
  }

  const activeSkinsArray: Skin[] = []; // Array of active skins to render
  let filteredOwnedSkins: Skin[] = [];
  if (ownedSkins && activeSkins) {
    if (activeSkins.cards) {
      activeSkinsArray.push(activeSkins.cards);
    }
    if (activeSkins.chips) {
      activeSkinsArray.push(activeSkins.chips);
    }
    if (activeSkins.interfaceBackground) {
      activeSkinsArray.push(activeSkins.interfaceBackground);
    }

    filteredOwnedSkins = filterSkins(ownedSkins, activeSkinsArray);
  }

  const handleActivateSkin = async (skinId: string) => {
    await dispatch(activateSkin(skinId));
  };

  const handleDeactivateSkin = async (skinId: string) => {
    await dispatch(deactivateSkin(skinId));
  };

  return (
    <div className="App">
      <BackButton />
      <section className="profile--content">
        <main className="profile--info">
          <h1>Profile</h1>
          <p>Username: {user}</p>
          <p>Email: {email}</p>
        </main>
        <section className="profile--collection">
          <h2>Active skins:</h2>
          {activeSkinsArray?.map((skin) => {
            return (
              <button
                type="button"
                className="profile--collection-skin"
                key={skin.id}
                onClick={async () => handleDeactivateSkin(skin.id)}
              >
                {skin.name} {skin.category}
              </button>
            );
          })}
          <h2>Owned skins:</h2>
          {filteredOwnedSkins?.map((skin) => {
            return (
              <button
                type="button"
                className="profile--collection-skin"
                key={skin.id}
                onClick={async () => handleActivateSkin(skin.id)}
              >
                {skin.name} {skin.category}
              </button>
            );
          })}
        </section>
      </section>
    </div>
  );
}
