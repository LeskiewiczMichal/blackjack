import "./loginForm.css";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { Navigate } from "react-router-dom";
import { loginUser, LoginUserProps } from "../actions/loginUser";

export default function LoginForm() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);
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
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Login
      </button>
    </form>
  );
}
