import { eventEmitter } from "@cafe/shared/eventEmitter.js";
import UnitSpawnedEffect from "../effect/effects/unitSpawned.effect";
import UnitMovedEffect from "../effect/effects/unitMoved.effect";
import UnitDiedEffect from "../effect/effects/unitDied.effect";
import UnitDamagedEffect from "../effect/effects/unitDamaged.effect";
import UnitModifiedEffect from "../effect/effects/unitModified.effect";

class PawnModel {
  constructor(options) {
    this.id = options.id;
    this.playerID = options.playerID;
    this.cardID = options.cardID;

    this.hex = options.hex;

    this.maxHp = options.unitData.hp ?? 0;
    this.hp = options.unitData.hp ?? 0;

    this.abilities = options.unitData.abilities ?? []
    this.modifiers = [];
  }

  get Health() {
    let hpBonus = 0;
    this.modifiers.forEach((m) => {
      if (m.name === "Unit Stat" && m.stat === UNIT_STATS.HEALTH)
        hpBonus += m.amount;
    });
    return this.hp + hpBonus;
  }

  onSpawn(controller) {
    
    this.abilities.forEach((ability) => ability.init());

    const effect = new UnitSpawnedEffect(unit, hex);
    controller.eventEmitter.emit("sim:effect", effect);
  }

  onMove(controller, hex) {
    this.hex = hex;
    
    const effect = new UnitMovedEffect(this.id, hex);
    controller.eventEmitter.emit("sim:effect", effect);
  }

  onDamage(controller, amount) {
    this.hp -= amount;
    const effect = new UnitDamagedEffect(this.id, amount);
    controller.eventEmitter.emit("sim:effect", effect);
    if (this.hp <= 0) this.onDestroy(controller);
  }

  onDestroy(controller) {
    const effect = new UnitDiedEffect(this.id);
    controller.eventEmitter.emit("sim:effect", effect);
  }

  onModify(modifier) {
    this.modifiers.push(modifier);

    const effect = new UnitModifiedEffect(this.id, modifier);
    controller.eventEmitter.emit("sim:effect", effect);
  }

  onSpellcast(controller, spell) {}
}
export default PawnModel;
