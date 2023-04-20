import "./loginForm.css";
import { useState } from "react";

export default function RegisterForm() {
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
      <button type="submit">Sign up</button>
    </form>
  );
}
