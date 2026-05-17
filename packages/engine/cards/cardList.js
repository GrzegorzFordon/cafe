import UnitAlice from "./list/units/UnitAlice.js";
import CardModel from "./card.model.js";
import SpellZap from "./list/spells/SpellZap.js";
import UnitPulp from "./list/units/UnitPulp.js";
import UnitB from "./list/units/UnitB.js";
import InfusionA from "./list/infusions/InfusionA.js";
import InfusionB from "./list/infusions/InfusionB.js";
import SpellB from "./list/spells/SpellB.js";
import SpellC from "./list/spells/SpellC.js";
import StructureA from "./list/structures/StructureA.js";
import StructureB from "./list/structures/StructureB.js";
import UpgradeA from "./list/upgrades/UpgradeA.js";
import UpgradeB from "./list/upgrades/UpgradeB.js";

export const CardList = new Map();
CardList.set("0U01", UnitAlice);
CardList.set("0U02", UnitPulp);
CardList.set("0U03", UnitB);

CardList.set("0I01", InfusionA);
CardList.set("0I02", InfusionB);

CardList.set("0S01", SpellZap);
CardList.set("0S02", SpellB);
CardList.set("0S03", SpellC);

CardList.set("0T01", StructureA);
CardList.set("0T02", StructureB);

CardList.set("0G01", UpgradeA);
CardList.set("0G02", UpgradeB);
