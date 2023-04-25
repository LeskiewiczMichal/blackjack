import "./styles/login.scss";
import { useNavigate } from "react-router-dom";

import { LoginForm } from "features/authentication/index";
import SeperatorLine from "components/SeperatorLine";

export default function Login() {
  const navigate = useNavigate();

  return (
    <main className="login-page">
      <section className="login-page--singin">
        <h1>Login to your account</h1>
        <LoginForm />
        <SeperatorLine text="OR" />
        <button
          className="login-page--offline-button"
          type="button"
          onClick={() => navigate("/menu")}
        >
          Play Offline
        </button>
      </section>
      <section className="login-page--register">
        <h1>New around here?</h1>
        <h3>Create an account</h3>
        <button
          className="login-page--register-button"
          type="button"
          onClick={() => navigate("/profile/register")}
        >
          Register
        </button>
      </section>
    </main>
  );
}
