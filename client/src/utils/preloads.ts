import { Themes } from "types.d";
import { AppThunk } from "store/store";
import { preloadImage } from "./preloadImage";

const preloadDefaultCards = (): AppThunk => async (dispatch) => {
  const imagesArr: string[] = [];

  for (let i = 2; i <= 10; i++) {
    imagesArr.push(`../features/table/assets/cards/defaultTheme/${i}CLUBS.svg`);
    imagesArr.push(
      `../features/table/assets/cards/defaultTheme/${i}DIAMONDS.svg`,
    );
    imagesArr.push(
      `../features/table/assets/cards/defaultTheme/${i}SPADES.svg`,
    );
    imagesArr.push(
      `../features/table/assets/cards/defaultTheme/${i}HEARTS.svg`,
    );
  }

  // Back
  imagesArr.push(`../features/table/assets/cards/defaultTheme/2B.svg`);

  //   Aces
  imagesArr.push(`../features/table/assets/cards/defaultTheme/ACECLUBS.svg`);
  imagesArr.push(`../features/table/assets/cards/defaultTheme/ACEDIAMONDS.svg`);
  imagesArr.push(`../features/table/assets/cards/defaultTheme/ACESPADES.svg`);
  imagesArr.push(`../features/table/assets/cards/defaultTheme/ACEHEARTS.svg`);

  //   Jacks
  imagesArr.push(`../features/table/assets/cards/defaultTheme/JACKCLUBS.svg`);
  imagesArr.push(
    `../features/table/assets/cards/defaultTheme/JACKDIAMONDS.svg`,
  );

  imagesArr.push(`../features/table/assets/cards/defaultTheme/JACKSPADES.svg`);
  imagesArr.push(`../features/table/assets/cards/defaultTheme/JACKHEARTS.svg`);

  //   Queens
  imagesArr.push(`../features/table/assets/cards/defaultTheme/QUEENCLUBS.svg`);
  imagesArr.push(
    `../features/table/assets/cards/defaultTheme/QUEENDIAMONDS.svg`,
  );
  imagesArr.push(`../features/table/assets/cards/defaultTheme/QUEENSPADES.svg`);
  imagesArr.push(`../features/table/assets/cards/defaultTheme/QUEENHEARTS.svg`);

  //   Kings
  imagesArr.push(`../features/table/assets/cards/defaultTheme/KINGCLUBS.svg`);
  imagesArr.push(
    `../features/table/assets/cards/defaultTheme/KINGDIAMONDS.svg`,
  );
  imagesArr.push(`../features/table/assets/cards/defaultTheme/KINGSPADES.svg`);
  imagesArr.push(`../features/table/assets/cards/defaultTheme/KINGHEARTS.svg`);

  const promises = imagesArr.map(async (imgUrl) => {
    await dispatch(preloadImage(imgUrl));
  });

  return Promise.all(promises).catch((error) => {
    console.error(error);
  });
};

const preloadThemeCards =
  (theme: Themes): AppThunk =>
  async (dispatch) => {
    const imagesArr: string[] = [];
    let themeFolder: string;

    if (theme === Themes.DARK) {
      themeFolder = "darkTheme";
    } else if (theme === Themes.NEON) {
      themeFolder = "neonTheme";
    } else {
      themeFolder = "neonTheme";
    }

    for (let i = 2; i < 10; i++) {
      imagesArr.push(`../features/table/assets/cards/${themeFolder}/${i}C.svg`);
      imagesArr.push(`../features/table/assets/cards/${themeFolder}/${i}D.svg`);
      imagesArr.push(`../features/table/assets/cards/${themeFolder}/${i}S.svg`);
      imagesArr.push(`../features/table/assets/cards/${themeFolder}/${i}H.svg`);
    }

    // Back
    imagesArr.push(`../features/table/assets/cards/${themeFolder}/1B.svg`);

    // Tens
    imagesArr.push(`../features/table/assets/cards/${themeFolder}/TC.svg`);
    imagesArr.push(`../features/table/assets/cards/${themeFolder}/TD.svg`);
    imagesArr.push(`../features/table/assets/cards/${themeFolder}/TS.svg`);
    imagesArr.push(`../features/table/assets/cards/${themeFolder}/TH.svg`);

    //   Aces
    imagesArr.push(`../features/table/assets/cards/${themeFolder}/AC.svg`);
    imagesArr.push(`../features/table/assets/cards/${themeFolder}/AD.svg`);
    imagesArr.push(`../features/table/assets/cards/${themeFolder}/AS.svg`);
    imagesArr.push(`../features/table/assets/cards/${themeFolder}/AH.svg`);

    //   Jacks
    imagesArr.push(`../features/table/assets/cards/${themeFolder}/JC.svg`);
    imagesArr.push(`../features/table/assets/cards/${themeFolder}/JD.svg`);
    imagesArr.push(`../features/table/assets/cards/${themeFolder}/JS.svg`);
    imagesArr.push(`../features/table/assets/cards/${themeFolder}/JH.svg`);

    //   Queens
    imagesArr.push(`../features/table/assets/cards/${themeFolder}/QC.svg`);
    imagesArr.push(`../features/table/assets/cards/${themeFolder}/QD.svg`);
    imagesArr.push(`../features/table/assets/cards/${themeFolder}/QS.svg`);
    imagesArr.push(`../features/table/assets/cards/${themeFolder}/QH.svg`);

    //   Kings
    imagesArr.push(`../features/table/assets/cards/${themeFolder}/KC.svg`);
    imagesArr.push(`../features/table/assets/cards/${themeFolder}/KD.svg`);
    imagesArr.push(`../features/table/assets/cards/${themeFolder}/KS.svg`);
    imagesArr.push(`../features/table/assets/cards/${themeFolder}/KH.svg`);

    const promises = imagesArr.map(async (imgUrl) => {
      await dispatch(preloadImage(imgUrl));
    });

    return Promise.all(promises).catch((error) => {
      console.error(error);
    });
  };

const preloadChips =
  (theme: Themes): AppThunk =>
  async (dispatch) => {
    let themeClass: string = "";

    if (theme === Themes.DEFAULT) {
      themeClass = "";
    } else if (theme === Themes.DARK) {
      themeClass = "_dark";
    } else if (theme === Themes.NEON) {
      themeClass = "_neon";
    }

    const imagesArr: string[] = [];

    imagesArr.push(
      `../features/interface/assets/chips/1_chip${themeClass}.png`,
    );
    imagesArr.push(
      `../features/interface/assets/chips/10_chip${themeClass}.png`,
    );
    imagesArr.push(
      `../features/interface/assets/chips/25_chip${themeClass}.png`,
    );
    imagesArr.push(
      `../features/interface/assets/chips/50_chip${themeClass}.png`,
    );
    imagesArr.push(
      `../features/interface/assets/chips/100_chip${themeClass}.png`,
    );
    imagesArr.push(
      `../features/interface/assets/chips/500_chip${themeClass}.png`,
    );

    const promises = imagesArr.map(async (imgUrl) => {
      await dispatch(preloadImage(imgUrl));
    });

    return Promise.all(promises).catch((error) => {
      console.error(error);
    });
  };

export { preloadDefaultCards, preloadThemeCards, preloadChips };
