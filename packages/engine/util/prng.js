import { uniformInt } from "pure-rand/distribution/uniformInt";
import { xoroshiro128plus } from "pure-rand/generator/xoroshiro128plus";

const seed = 42;
const prng = xoroshiro128plus(seed);

export default prng;
