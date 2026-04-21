import "./home.css";

import useAuthStore from "../../../stores/useAuthStore.js";
import HomeInside from "./HomeInside.jsx";
import HomeOutside from "./HomeOutside.jsx";

function Home() {
  const accessTokenData = useAuthStore((state) => state.accessTokenData);
  return accessTokenData ? <HomeInside /> : <HomeOutside />;
}
export default Home;
