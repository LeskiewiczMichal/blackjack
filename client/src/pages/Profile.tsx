/* eslint-disable @typescript-eslint/no-use-before-define */
import "./styles/profile.scss";
import { Skin, Routes, ActiveSkinsSlice } from "types.d";

import { useAppSelector, useAppDispatch } from "hooks/hooks";
import { activateSkin } from "features/skins/services/activateSkin";
import { deactivateSkin } from "features/skins/services/deactivateSkin";
import { filterSkins } from "utils/filterSkins";
import { BackButton } from "features/interface";
import {
  ProfileInfo,
  SkinsCollection,
  NotLoggedInInfo,
} from "features/profile";

export default function Profile() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);
  const ownedSkins = useAppSelector((state) => state.shop.ownedSkins);
  const activeSkins = useAppSelector((state) => state.skins);

  let activeSkinsArray: Skin[] = []; // Array of active skins to render
  let filteredOwnedSkins: Skin[] = [];

  if (ownedSkins && activeSkins) {
    activeSkinsArray = createActiveSkinsArray(activeSkins);
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
            <ProfileInfo />
            <section className="profile--collections-wrapper">
              <SkinsCollection
                skinsArray={activeSkinsArray}
                callback={handleDeactivateSkin}
                header="Active skins:"
              />
              <SkinsCollection
                skinsArray={filteredOwnedSkins}
                callback={handleActivateSkin}
                header="Owned skins:"
              />
            </section>
          </>
        ) : (
          <NotLoggedInInfo />
        )}
      </section>
    </div>
  );
}

function createActiveSkinsArray(activeSkins: ActiveSkinsSlice): Skin[] {
  const activeSkinsArray: Skin[] = [];

  if (activeSkins.cards) {
    activeSkinsArray.push(activeSkins.cards);
  }
  if (activeSkins.chips) {
    activeSkinsArray.push(activeSkins.chips);
  }
  if (activeSkins.interfaceBackground) {
    activeSkinsArray.push(activeSkins.interfaceBackground);
  }

  return activeSkinsArray;
}
