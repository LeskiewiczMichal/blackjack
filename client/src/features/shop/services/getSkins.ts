import { AppThunk } from "store/store";

const getSkins = (): AppThunk => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:9000/skins", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const { skins } = await response.json();
    console.log(skins);
  } catch (error: any) {
    // TODO: Handle error
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

export { getSkins };
