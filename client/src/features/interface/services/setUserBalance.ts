import { AppThunk } from "store/store";
import { setBalance } from "store/reducers/playerReducer";

const setUserBalance =
  (newBalance: number): AppThunk =>
  async (dispatch) => {
    try {
      const response = await fetch("http://localhost:9000/users/balance", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies
        body: JSON.stringify({ balance: newBalance }),
      });

      const { user } = await response.json();
      await dispatch(setBalance(user.balance));
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

export { setUserBalance };
