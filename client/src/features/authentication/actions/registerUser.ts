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
      const response = await fetch("http://localhost:9000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      //   const newUserData = {
      //     email: userData.email,
      //     password: userData.password,
      //   };
      //   dispatch(loginUser(newUserData));

      // eslint-disable-next-line no-console
      console.log(data);
    } catch (error) {
      // TODO: Handle error
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

export { registerUser };

// export const createUserSuccess = (data) => {
//     return {
//       type: 'CREATE_USER_SUCCESS',
//       payload: data
//     };
//   };

//   export const createUserFailure = (error) => {
//     return {
//       type: 'CREATE_USER_FAILURE',
//       payload: error
//     };
//   };
