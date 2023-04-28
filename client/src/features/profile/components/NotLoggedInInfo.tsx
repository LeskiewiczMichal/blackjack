import "./profileInfo.scss";
import { Routes } from "types.d";
import { useNavigate } from "react-router";
import SeperatorLine from "components/SeperatorLine";

export default function NotLoggedInInfo() {
  const navigate = useNavigate();

  return (
    <main className="profile--info">
      <h1>Ooops, seems like You are not logged in</h1>
      <button type="button" onClick={() => navigate(Routes.LOGIN)}>
        Sign in
      </button>
      <SeperatorLine text="OR" />
      <button type="button" onClick={() => navigate(Routes.REGISTER)}>
        Create an account
      </button>
    </main>
  );
}
