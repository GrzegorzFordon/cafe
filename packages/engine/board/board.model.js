import { eventEmitter } from "../../../../util/eventEmitter";
import FakeEffect from "../effect.fake";

class BoardModel {
  constructor() {
    this.tiles = [];
    this.units = [];
  }

  setupBoard() {
    //takes in size?
    //populate tiles array
  }
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
