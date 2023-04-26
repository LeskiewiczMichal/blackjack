import { Skin } from "types.d";
import { AppThunk } from "store/store";
import { loginFailure, loginSuccess } from "store/reducers/authReducer";

export type LoginUserProps = {
  email: string;
  password: string;
};

const loginUser =
  (userData: LoginUserProps): AppThunk =>
  async (dispatch) => {
    try {
      const response = await fetch("/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData),
      });

      const { user } = await response.json();
      if (!user) {
        throw new Error("User not found");
      }

      // Extract skins
      const ownedSkins: Skin[] = user.ownedSkins.map((skin: any) => {
        return {
          // eslint-disable-next-line no-underscore-dangle
          id: skin._id,
          name: skin.name,
          price: skin.price,
          category: skin.category,
        };
      });

      const activeSkins: Skin[] = user.activeSkins.map((skin: any) => {
        return {
          // eslint-disable-next-line no-underscore-dangle
          id: skin._id,
          name: skin.name,
          price: skin.price,
          category: skin.category,
        };
      });

      await dispatch(
        loginSuccess({
          username: user.username,
          email: user.email,
          balance: user.balance,
          ownedSkins,
          activeSkins,
        }),
      );
    } catch (error: any) {
      dispatch(loginFailure("Invalid email or password"));
    }
  };

export { loginUser };
