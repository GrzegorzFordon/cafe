import { Hex } from "../../../../../../../packages/shared/util/hex";
import Orientation from "../../../../../../../packages/shared/util/orientation";
import Point from "../../../../../../../packages/shared/util/point";


class Layout {
  constructor(orientation, size, origin) {
    this.orientation = orientation;
    this.size = size;
    this.origin = origin;
  }
  hexToPixel(h) {
    var M = this.orientation;
    var size = this.size;
    var origin = this.origin;
    var x = (M.f0 * h.q + M.f1 * h.r) * size.x;
    var y = (M.f2 * h.q + M.f3 * h.r) * size.y;
    return new Point(x + origin.x, y + origin.y);
  }
  pixelToHexFractional(p) {
    var M = this.orientation;
    var size = this.size;
    var origin = this.origin;
    var pt = new Point((p.x - origin.x) / size.x, (p.y - origin.y) / size.y);
    var q = M.b0 * pt.x + M.b1 * pt.y;
    var r = M.b2 * pt.x + M.b3 * pt.y;
    return new Hex(q, r, -q - r);
  }
  pixelToHexRounded(p) {
    return this.pixelToHexFractional(p).round();
  }
}

Layout.flat = new Orientation(
  3.0 / 2.0,
  0.0,
  Math.sqrt(3.0) / 2.0,
  Math.sqrt(3.0),
  2.0 / 3.0,
  0.0,
  -1.0 / 3.0,
  Math.sqrt(3.0) / 3.0,
  0.0,
);

export default Layout;

/**
 * https://www.redblobgames.com/grids/hexagons/implementation.html
 */
