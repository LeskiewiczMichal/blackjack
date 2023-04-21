import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./Game";
import Login from "./Login";
import Register from "./Register";
import Menu from "./Menu";
import Shop from "./Shop";

export default function RouteSwitch() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile/login" element={<Login />} />
        <Route path="/profile/register" element={<Register />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/game" element={<Game />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </BrowserRouter>
  );
}
