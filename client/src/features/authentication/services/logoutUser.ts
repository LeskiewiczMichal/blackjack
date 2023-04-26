import { AppThunk } from "store/store";
import { logoutSuccess } from "store/reducers/authReducer";

const logoutUser = (): AppThunk => async (dispatch) => {
  try {
    await fetch("/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    await dispatch(logoutSuccess());
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log(error);
    // dispatch(loginFailure("Invalid email or password"));
  }
};

export { logoutUser };
