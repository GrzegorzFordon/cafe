// import * as z from "zod";

// export const PlayerModel = z.object({
//   heroID: z.string(),
//   deck: z.array(),
//   hand: z.array(),
//   discard: z.array(),
//   units: z.array(),
// });

class PlayerModel {
  constructor(options) {
    // this.id = 
    this.hand = [];
    this.deck = [];
    this.discard = [];
  }
}

export default PlayerModel;
