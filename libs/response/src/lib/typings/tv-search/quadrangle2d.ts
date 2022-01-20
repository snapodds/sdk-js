import { Point2d } from './point2d';

/**
 * A quadrangle on 2D plane.
 */
export interface Quadrangle2d {
  /**
   * The first point of this quadrangle.
   */
  a: Point2d;

  /**
   * The second point of this quadrangle.
   */
  b: Point2d;

  /**
   * The third point of this quadrangle.
   */
  c: Point2d;

  /**
   * The fourth point of this quadrangle.
   */
  d: Point2d;
}
