//put zod model here that has the cardid, effect, etc
import * as z from "zod";

const BURN_TYPES = ["POWER", "SPEED", "SHORE", "PAY", "MOVE"];

const CardSchema = z.object({
  cardID: z.string(),
  name: z.string(),
  speed: z.number(),
  burns: z.enum(BURN_TYPES),
  //art link
});

const UnitCardSchema = z.object({
  ...CardSchema,
  atk: z.number(),
  hp: z.number(),
  speed: z.number(),
});

const SpellCardSchema = z.object({
  ...CardSchema,
  //??
});

/**
 * speed up - the next action has +2 speed
 * power up - the next attack this turn has +2 power
 * shore up - the next defense this turn has +3 power
 * pay up - gain an additional action
 * move up - the next move can go further
 * 
 * multiples
 * 
 **/

/**
 * cardID could be 0U00 (set,type,count)
 */
