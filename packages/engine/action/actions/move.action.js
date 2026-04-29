// class MoveAction extends Action {
//   constructor(unitID, coords) {
//     this.unitID = unitID;
//     this.coords = coords;
//   }

//   execute() {
//     //get unit, move it
//   }
// }
// export default MoveAction;

const MoveAction = (unitID, coords) => {
  const lastx, lasty;
  const execute = () => {};
  const undo = () => {};

  return { execute, undo };
};

export default MoveAction;
