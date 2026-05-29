import { Hex } from "@cafe/shared/util/hex.js";
import { BASE_HEX_MAP, SPELL_TARGET_TYPES, TARGET_OPTIONS } from "../config.js";
import Controller from "../controller.js";

class CardController extends Controller {
  constructor(game) {
    super(game);
  }

  init() {}

  resolveCard(playerID, cardID, target) {
    const card = this.game.playerController.getCardInHand(playerID, cardID);
    if (!card) return;
    card.onPlay(this.game, target);
  }

  burnCard(playerID, cardID) {
    const card = this.game.playerController.getCardInHand(playerID, cardID);
    if (!card) return;
    card.onBurn(this.game, card);
  }

  getLegalTargets(playerID, card) {
    //NONE - Return empty Array
    if (!card.playable || card.targetType === SPELL_TARGET_TYPES.NONE)
      return [];
    //HEX - Return all tiles (for now)
    if (card.targetType === SPELL_TARGET_TYPES.HEX) {
      let tiles = [...this.game.boardController.model.hexList];
      //Check options - empty only, free spawn only
      const targetOptions = card?.targetOptions;
      if (targetOptions.includes(TARGET_OPTIONS.EMPTY)) {
        tiles = tiles.filter(
          (val) => !this.game.unitController.getUnitAtHex(val),
        );
      }

      if (targetOptions.includes(TARGET_OPTIONS.SPAWN)) {
        const isFirstPlayer =
          this.game.playerController.isFirstPlayer(playerID);
        const baseHex = BASE_HEX_MAP.get(isFirstPlayer ? 0 : 1);
        const spawns = [];
        Hex.directions.forEach((dir) => spawns.push(baseHex.add(dir)));
        const unusedSpawns = spawns.filter(
          (val) =>
            !this.game.boardController.SpawnInfo.keys().some((key) =>
              key.isEqual(val),
            ),
        );

        tiles = tiles.filter((val) =>
          unusedSpawns.some((spawn) => spawn.isEqual(val)),
        );
      }
      return tiles;
    }

    //UNIT - Return all units (for now)
    if (card.targetType === SPELL_TARGET_TYPES.UNIT) {
      let units = [...this.game.unitController.units];
      //Check options - friendly only
      const targetOptions = card?.targetOptions;
      if (targetOptions.includes(TARGET_OPTIONS.FRIENDLY))
        units = units.filter((unit) =>
          this.game.unitController.isFriendly(playerID, unit.id),
        );
      return units;
    }
  }
}
export default CardController;
