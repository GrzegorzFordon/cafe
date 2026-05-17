import { useMemo } from "react";
import _01 from "../assets/cards/01.png";
import _02 from "../assets/cards/02.png";
import _03 from "../assets/cards/03.png";
import _04 from "../assets/cards/04.png";
import _05 from "../assets/cards/05.png";
import _06 from "../assets/cards/06.png";
import _07 from "../assets/cards/07.png";
import _08 from "../assets/cards/08.png";
import _09 from "../assets/cards/09.png";
import _10 from "../assets/cards/10.png";
import _11 from "../assets/cards/11.png";
import _12 from "../assets/cards/12.png";
import _13 from "../assets/cards/13.png";
import _14 from "../assets/cards/14.png";
import _15 from "../assets/cards/15.png";
import _16 from "../assets/cards/16.png";
import _def from "../assets/cards/def.png";
import _0S01 from "../assets/cards/0S01.png";
import _0S02 from "../assets/cards/0S02.png";
import _pulp from "../assets/cards/pulp01.png";
// import useGameStore from "../stores/useGameStore";

const useCardList = (cardID) => {
  // const gameController = useGameStore((state) => state.gameController);

  // const getCard = (cardID)=>{
  //   const result = gameController.
  // }

  const sprite = useMemo(() => {
    if (!cardID) return _def;
    switch (cardID) {
      case "0U01":
        return _01;
      case "0U02":
        return _pulp;
      case "0U03":
        return _13;
      case "0U04":
        return _14;
      case "0U05":
        return _15;
      case "0U06":
        return _16;
      case "0U07":
        return _07;
      case "0U08":
        return _08;
      case "0U09":
        return _09;
      case "0S01":
        return _0S02;
      default:
        return _def;
    }
  }, [cardID]);

  return sprite;
};

export default useCardList;
