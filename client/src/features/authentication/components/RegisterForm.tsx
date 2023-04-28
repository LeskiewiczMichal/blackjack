import "./loginForm.scss";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import Button, { ButtonColors, ButtonTypes } from "components/Button";
import { registerUser } from "../services/registerUser";

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (user) {
    return <Navigate to="/menu" />;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Email validation regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError(null);

    const userData = {
      username,
      email,
      password,
    };
    dispatch(registerUser(userData));

    navigate("/");
  };

  return (
    <form className="login-form">
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={username}
        onChange={(event) => handleChange(event)}
        required
      />
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
        text="Sign up"
        color={ButtonColors.GREEN}
        type={ButtonTypes.SUBMIT}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)}
      />
      {error && <p className="error">{error}</p>}
    </form>
  );
}
