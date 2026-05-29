import * as z from "zod";

export const PlayerDTO = z.object({
  id: z.string(),
  // do we send hand, deck, discard, pawns
});

export const GameDTO = z.object({
  id: z.string(),
  roomID: z.string(),
  data: z.json(),
  //players ??
});

export const RoomDTO = z.object({
  id: z.string(),
  hostID: z.string(),
  players: z.array(PlayerDTO), 
  status: z.number(),
});

export const PawnDTO = z.object({
  id: z.string(),
  hex: z.object({ q: z.number, r: z.number, s: z.number }),
  hp: z.number(),
  // status effects (in the form of buffs?)
});

/**
 * board dto not needed for now, it is clear what map is being run
 * N size from room data
 * status effects as their own list (do those need a dto then)
 *
 * if a board dto is needed, it will not have to send over the whole map every time
 */
