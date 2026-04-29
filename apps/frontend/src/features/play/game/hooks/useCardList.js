import { useMemo } from "react";
import bolt from "../assets/cards/bolt.png";
import golgari_guildmage from "../assets/cards/golgari_guildmage.png";
import grixis_panorama from "../assets/cards/grixis_panorama.png";
import reanimate from "../assets/cards/reanimate.png";
import swarm_intelligence from "../assets/cards/swarm_intelligence.png";
const useCardList = (cardID) => {
  const sprite = useMemo(
    () =>
      cardID == 1
        ? bolt
        : cardID == 2
          ? golgari_guildmage
          : cardID == 3
            ? grixis_panorama
            : cardID == 4
              ? reanimate
              : swarm_intelligence,
    [cardID],
  );

  return sprite;
};

export default useCardList;
