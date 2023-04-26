import "./styles/register.scss";

import { Routes } from "types.d";
import { RegisterForm } from "features/authentication/index";
import { BackButton } from "features/interface";

export default function Register() {
  return (
    <main className="register-page">
      <h1>Create a new account</h1>
      <RegisterForm />
      <BackButton route={Routes.LOGIN} />
    </main>
  );
}
