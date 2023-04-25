import "./styles/login.scss";
import { Link } from "react-router-dom";

import { LoginForm } from "features/authentication/index";

export default function Login() {
  return (
    <main className="login-page">
      <section className="login-page--singin">
        <h1>Login to your account</h1>
        <LoginForm />
      </section>
      <section className="login-page--register">
        <h1>New around here?</h1>
        <h3>Create an account</h3>
        <Link to="/profile/register">
          <button className="login-page--register-button" type="button">
            Register
          </button>
        </Link>
      </section>
    </main>
  );
}
