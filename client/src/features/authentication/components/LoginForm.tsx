import "./loginForm.scss";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { Navigate } from "react-router-dom";
import Button, { ButtonColors, ButtonTypes } from "components/Button";
import { loginUser, LoginUserProps } from "../services/loginUser";

export default function LoginForm() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);
  const error = useAppSelector((state) => state.auth.error);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (user) {
    return <Navigate to="/menu" />;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const userData: LoginUserProps = {
      email,
      password,
    };
    dispatch(loginUser(userData));
  };

  return (
    <form className="login-form">
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(event) => handleChange(event)}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(event) => handleChange(event)}
        required
      />
      <Button
        text="Login"
        color={ButtonColors.GREEN}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)}
        type={ButtonTypes.SUBMIT}
      />
      {error && <p className="error">{error}</p>}
    </form>
  );
}
