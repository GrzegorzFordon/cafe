import * as z from "zod";
import PlayerDTO from "./playerDTO.js";

const GameDTO = z.object({
  id: z.string(),
  roomID: z.string(),
  hostId: z.string(),
  players: z.array(PlayerDTO),
});

export default GameDTO;
