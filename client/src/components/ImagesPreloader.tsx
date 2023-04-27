import { Themes } from "types.d";
import { useEffect } from "react";
import { useAppDispatch } from "hooks/hooks";
import { preloadImage } from "utils/preloadImage";
import {
  preloadDefaultCards,
  preloadThemeCards,
  preloadChips,
} from "utils/preloads";
import { setLoadingScreen } from "store/reducers/helperReducer";

// const preloadAssets = (): AppThunk => async (dispatch) => {
//   const promises = [];

//   console.log("1");
//   promises.push(dispatch(preloadImage("../features/table/assets/table.png")));
//   console.log("2");
//   promises.push(dispatch(preloadDefaultCards()));
//   console.log("3");
//   promises.push(dispatch(preloadThemeCards(Themes.DARK)));
//   console.log("4");
//   promises.push(dispatch(preloadThemeCards(Themes.NEON)));
//   console.log("5");
//   promises.push(dispatch(preloadChips(Themes.DEFAULT)));
//   console.log("6");
//   promises.push(dispatch(preloadChips(Themes.DARK)));
//   console.log("7");
//   promises.push(dispatch(preloadChips(Themes.NEON)));
//   console.log("8");

//   // eslint-disable-next-line no-promise-executor-return
//   // promises.push(await new Promise((resolve) => setTimeout(resolve, 1000))); // Wait for animation to end)

//   return Promise.all(promises);
// };

export default function ImagesPreloader() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleLoad = async () => {
      try {
        await dispatch(setLoadingScreen(true));
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const results = await Promise.all([
          dispatch(preloadImage("../features/table/assets/table.png")),
          dispatch(preloadDefaultCards()),
          dispatch(preloadThemeCards(Themes.DARK)),
          dispatch(preloadThemeCards(Themes.NEON)),
          dispatch(preloadChips(Themes.DEFAULT)),
          dispatch(preloadChips(Themes.DARK)),
          dispatch(preloadChips(Themes.NEON)),
          // eslint-disable-next-line no-promise-executor-return
          // new Promise<void>((resolve) => setTimeout(resolve, 1000)),
        ]);
      } catch (error) {
        console.log(error);
      } finally {
        // handle results as necessary
        await dispatch(setLoadingScreen(false));
      }
    };
    handleLoad();
  }, []);

  return null;
}
