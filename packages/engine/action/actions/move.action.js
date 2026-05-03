import Action from "../action.model";

class MoveAction extends Action {
  constructor(unit, coords) {
    super();
    this.unit = unit;
    this.coords = coords;
  }

  execute() {
    //get unit, move it
  }
}
export default MoveAction;

// const MoveAction = (unitID, coords) => {
//   const lastx, lasty;
//   const execute = () => {};
//   const undo = () => {};

//   return { execute, undo };
// };

// export default MoveAction;
