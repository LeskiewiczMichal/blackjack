import { AppThunk } from "store/store";
import { loginSuccess, loginFailure } from "store/reducers/authReducer";

export type LoginUserProps = {
  email: string;
  password: string;
};

const loginUser =
  (userData: LoginUserProps): AppThunk =>
  async (dispatch) => {
    try {
      const response = await fetch("http://localhost:9000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData),
      });

      const { user } = await response.json();
      dispatch(
        loginSuccess({ username: user.username, balance: user.balance }),
      );
    } catch (error: any) {
      // TODO: Handle error
      // eslint-disable-next-line no-console
      console.error(error);
      dispatch(loginFailure(error.response.data.message));
    }
  };

export { loginUser };
