import { uniformFloat32 } from "pure-rand/distribution/uniformFloat32";
import { xoroshiro128plus } from "pure-rand/generator/xoroshiro128plus";

const seed = 3234234234234;
const prng = xoroshiro128plus(seed);

export default () => uniformFloat32(prng);
