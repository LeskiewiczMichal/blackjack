import "./styles/profile.scss";
import { Skin, SkinCategories, Routes } from "types.d";

import { useNavigate } from "react-router";
import { useAppSelector, useAppDispatch } from "hooks/hooks";
import { activateSkin } from "features/skins/services/activateSkin";
import { deactivateSkin } from "features/skins/services/deactivateSkin";
import { filterSkins } from "utils/filterSkins";
import { BackButton } from "features/interface";
import SeperatorLine from "components/SeperatorLine";

export default function Profile() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);
  const email = useAppSelector((state) => state.auth.email);
  const ownedSkins = useAppSelector((state) => state.shop.ownedSkins);
  const activeSkins = useAppSelector((state) => state.skins);

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
      <BackButton route={Routes.MENU} />
      <section className="profile--content">
        {user ? (
          <>
            <main className="profile--info">
              <h1>Profile</h1>
              <p>
                <i>Username</i>: {user}
              </p>
              <p>
                <i>Email</i>: {email}
              </p>
            </main>
            <section className="profile--collection-wrapper">
              <section className="profile--collection">
                <h2>Active skins:</h2>
                <section>
                  {activeSkinsArray?.map((skin) => {
                    return (
                      <button
                        type="button"
                        className="profile--collection-skin"
                        key={skin.id}
                        onClick={async () => handleDeactivateSkin(skin.id)}
                      >
                        {skin.name}{" "}
                        {skin.category === SkinCategories.INTERFACE_BACKGROUND
                          ? "Interface"
                          : `${skin.category}`}
                      </button>
                    );
                  })}
                </section>
              </section>
              <section className="profile--collection">
                <h2>Owned skins:</h2>
                <section>
                  {filteredOwnedSkins?.map((skin) => {
                    return (
                      <button
                        type="button"
                        className="profile--collection-skin"
                        key={skin.id}
                        onClick={async () => handleActivateSkin(skin.id)}
                      >
                        {skin.name}{" "}
                        {skin.category === SkinCategories.INTERFACE_BACKGROUND
                          ? "Interface"
                          : `${skin.category}`}
                      </button>
                    );
                  })}
                </section>
              </section>
            </section>
          </>
        ) : (
          <main className="profile--info">
            <h1>Ooops, seems like You are not logged in</h1>
            <button type="button" onClick={() => navigate(Routes.LOGIN)}>
              Sign in
            </button>
            <SeperatorLine text="OR" />
            <button type="button" onClick={() => navigate(Routes.REGISTER)}>
              Create an account
            </button>
          </main>
        )}
      </section>
    </div>
  );
}
