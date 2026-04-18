import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout/Layout.jsx";
import NotFound from "../pages/NotFound/NotFound.jsx";
import Home from "../pages/Home/Home.jsx";
import About from "../pages/About/About.jsx";
import Auth from "../pages/Auth/Auth.jsx";
import CardList from "../pages/CardList/CardList.jsx";
import DeckBuilder from "../pages/Deckbuilder/DeckBuilder.jsx";
import HeroBios from "../pages/HeroBios/HeroBios.jsx";
import HowTo from "../pages/HowTo/HowTo.jsx";
import Multiplayer from "../pages/Multiplayer/Multiplayer.jsx";
import Profile from "../pages/Profile/Profile.jsx";
import Shop from "../pages/Shop/Shop.jsx";
import SoloRun from "../pages/SoloRun/SoloRun.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Lobby from "../pages/Lobby/Lobby.jsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/auth", element: <Auth /> },
      { path: "/cards", element: <CardList /> },
      { path: "/heroes", element: <HeroBios /> },
      { path: "/rules", element: <HowTo /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/builder", element: <DeckBuilder /> },
          { path: "/mp", element: <Multiplayer /> },
          { path: "/profile", element: <Profile /> },
          { path: "/shop", element: <Shop /> },
          { path: "/solo", element: <SoloRun /> },
          { path: "/lobby", element: <Lobby /> },
        ],
      },
    ],
  },
]);

export default router;
