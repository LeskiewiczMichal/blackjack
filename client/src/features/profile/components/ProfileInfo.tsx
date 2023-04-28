import "./profileInfo.scss";
import { useAppSelector } from "hooks/hooks";

export default function ProfileInfo() {
  const user = useAppSelector((state) => state.auth.user);
  const email = useAppSelector((state) => state.auth.email);

  return (
    <main className="profile--info">
      <h1>Profile</h1>
      <p>
        <i>Username</i>: {user}
      </p>
      <p>
        <i>Email</i>: {email}
      </p>
    </main>
  );
}
