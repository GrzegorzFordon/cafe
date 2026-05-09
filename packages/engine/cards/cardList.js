//put a map of cardid -> card here
import UnitAlice from "./list/units/UnitAlice";
import CardModel from "./card.model";
import SpellZap from "./list/spells/SpellZap";

export const CardList = new Map();
CardList.set("0U01", UnitAlice);
CardList.set("0U02", CardModel);
CardList.set("0U03", CardModel);
CardList.set("0U04", CardModel);
CardList.set("0U05", CardModel);
CardList.set("0U06", CardModel);
CardList.set("0U07", CardModel);
CardList.set("0U08", CardModel);
CardList.set("0U09", CardModel);
CardList.set("0S01", SpellZap);
