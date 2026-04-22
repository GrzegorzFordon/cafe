import * as z from "zod";

const Room = z.object({
  owner: z.string(),
});

export default Room;
