import { AppThunk } from "store/store";

export type RegisterUserProps = {
  username: string;
  email: string;
  password: string;
};

const registerUser =
  (userData: RegisterUserProps): AppThunk =>
  async () => {
    try {
      await fetch("/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

export { registerUser };
