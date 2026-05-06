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

const useCardList = (cardID) => {
  const sprite = useMemo(() => {
    if (!cardID) return _def;
    // return cardID % 3 == 0 ? _13 : cardID % 2 == 0 ? _12 : _14;
    switch (cardID) {
      case 1:
        return _01;
      case 2:
        return _12;
      case 3:
        return _13;
      case 4:
        return _14;
      case 5:
        return _15;
      case 6:
        return _16;
      case 7:
        return _07;
      case 8:
        return _08;
      case 9:
        return _09;
      case 10:
        return _10;
      case 11:
        return _11;
      default:
        return _def.png;
    }
  }, [cardID]);

  return sprite;
};

export default useCardList;
