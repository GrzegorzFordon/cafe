import { SPELL_TARGET_TYPES } from "../../config";

class Target {
  constructor(options) {
    this.type = options.type ?? SPELL_TARGET_TYPES.NONE;
    this.object = options.object ?? null;
  }
}
