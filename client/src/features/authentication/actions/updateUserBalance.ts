import { AppThunk } from "store/store";
import { setBalance } from "store/reducers/playerReducer";

const updateUserBalance = (): AppThunk => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:9000/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { user } = await response.json();
    console.log(user);
    // dispatch(setBalance(user.balance));
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export { updateUserBalance };
