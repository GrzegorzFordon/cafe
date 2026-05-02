/**
 * the grid (the tiles) (hash map??)
 * pawns (all, players also have map of their own units) (maybe in tiles)
 * getLegalMoveTargets(player,unit)
 * moveUnit(player,unit,target)
 **/
import Controller from "../controller.js";
import BoardModel from "./board.model.js";

class BoardController extends Controller {
  constructor() {
    super();
    this.model = new BoardModel();
  }

  init(options) {
    this.model = new BoardModel(options);
    // console.log("Board Controller running", this.model);
  }
}

export default BoardController;
