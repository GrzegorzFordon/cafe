import * as z from "zod";
import PlayerDTO from "./playerDTO.js";

export const roomStatus = {
  LOBBY: 0,
  INPROGRESS: 1,
  FINISHED: 2,
};

const RoomDTO = z.object({
  id: z.string(),
  hostID: z.string(),
  players: z.array(PlayerDTO),
  status: z.enum(roomStatus),
});

export default RoomDTO;

/*
  export interface Room {
  code: string;
  hostId: string;
  players: RoomPlayer[];
  gameState: GameState | null;
  createdAt: number;
  settings: RoomSettings;
  lastWinnerId?: string | null;
}
 */
