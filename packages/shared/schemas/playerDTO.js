import * as z from "zod";

const PlayerDTO = z.object({
  id: z.string(),
});

export default PlayerDTO;
