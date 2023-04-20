import "./loginForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "hooks/hooks";
import { registerUser } from "../actions/registerUser";

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    const userData = {
      username,
      email,
      password,
    };
    dispatch(registerUser(userData));

    return navigate("/");
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
      <button type="submit" onClick={handleSubmit}>
        Sign up
      </button>
    </form>
  );
}
