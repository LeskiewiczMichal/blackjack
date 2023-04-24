import "./backButton.css";

import { Link } from "react-router-dom";

export default function BackButton() {
  return (
    <Link to="/menu">
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button type="button" className="back--button" />
    </Link>
  );
}
