import { createBrowserRouter } from "react-router-dom";
import Layout from "../common/pages/Layout/Layout.jsx";
import NotFound from "../common/pages/NotFound/NotFound.jsx";
import Home from "../common/pages/Home/Home.jsx";
import About from "../common/pages/AboutPage.jsx";
import Auth from "../features/auth/AuthPage.jsx";
import CardList from "../common/pages/CardList/CardList.jsx";
import DeckBuilder from "../common/pages/Deckbuilder/DeckBuilder.jsx";
import HeroBios from "../common/pages/HeroBios/HeroBios.jsx";
import HowTo from "../common/pages/HowTo/HowTo.jsx";
import Multiplayer from "../features/play/game/GamePage.jsx";
import Profile from "../common/pages/Profile/Profile.jsx";
import Shop from "../common/pages/Shop/Shop.jsx";
import SoloRun from "../common/pages/SoloRun/SoloRun.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Lobby from "../features/play/lobby/LobbyPage.jsx";
import PlayPage from "../features/play/PlayPage.jsx";

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
          { path: "/play", element: <PlayPage /> },
        ],
      },
    ],
  },
]);

export default router;
