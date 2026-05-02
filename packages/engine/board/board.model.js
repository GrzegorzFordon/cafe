// import { eventEmitter } from "../../../../util/eventEmitter.js";
// import FakeEffect from "../effect.fake";

class BoardModel {
  constructor() {
    this.tiles = [];
    this.units = [];
  }

  setupBoard(options) {
    this.tiles = options.tiles;

    //takes in size?
    //populate tiles array
  }

  // spawnUnit()
}

export default BoardModel;

/**
 * constructor(){
 * this.x = x
 * }
 * 
 * get foo(){
 * return "bar";
 * }
 *
 * init(){
 * }
 */
