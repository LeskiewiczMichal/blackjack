import { Routes as RouteTypes } from "types.d";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./Game";
import Login from "./Login";
import Register from "./Register";
import Menu from "./Menu";
import Shop from "./Shop";
import Profile from "./Profile";

export default function RouteSwitch() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path={RouteTypes.LOGIN} element={<Login />} />
        <Route path={RouteTypes.REGISTER} element={<Register />} />
        <Route path={RouteTypes.MENU} element={<Menu />} />
        <Route path={RouteTypes.GAME} element={<Game />} />
        <Route path={RouteTypes.SHOP} element={<Shop />} />
        <Route path={RouteTypes.PROFILE} element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
