import "./styles/login.scss";

import { Routes } from "types.d";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "features/authentication/index";
import Button, { ButtonColors, ButtonTypes } from "components/Button";
import SeperatorLine from "components/SeperatorLine";

export default function Login() {
  const navigate = useNavigate();

  return (
    <main className="login-page">
      <section className="login-page--singin">
        <h1>Login to your account</h1>
        <LoginForm />
        <SeperatorLine text="OR" />
        <Button
          text="Play Offline"
          color={ButtonColors.GREEN}
          onClick={() => navigate(Routes.MENU)}
          type={ButtonTypes.BUTTON}
        />
      </section>
      <section className="login-page--register">
        <h1>New around here?</h1>
        <h3>Create an account</h3>
        <Button
          text="Register"
          color={ButtonColors.RED}
          onClick={() => navigate(Routes.REGISTER)}
          type={ButtonTypes.BUTTON}
        />
      </section>
    </main>
  );
}
