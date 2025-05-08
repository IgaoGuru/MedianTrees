
/**
 * Approximation to the error function.
// Source: Numerical Recipes / Abramowitz–Stegun
 */
function erf(x: number): number {
    const a1 =  0.254829592;
    const a2 = -0.284496736;
    const a3 =  1.421413741;
    const a4 = -1.453152027;
    const a5 =  1.061405429;
    const p  =  0.3275911;
  
    const sign = x < 0 ? -1 : 1;
    x = Math.abs(x);
  
    const t = 1 / (1 + p * x);
    const y = 1 - (
        (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1)
        * t
      ) * Math.exp(-x * x);
  
    return sign * y;
  }

//
// Approximation to inverse error function, erfinv(x).
// Source: https://stackoverflow.com/a/59778675 (Acklam’s approximation)
//
function erfinv(x: number): number {
    const a = [
      0.886226899, -1.645349621, 0.914624893, -0.140543331
    ];
    const b = [
      -2.118377725, 1.442710462, -0.329097515, 0.012229801
    ];
    const c = [
      -1.970840454, -1.624906493, 3.429567803, 1.641345311
    ];
    const d = [
      3.543889200, 1.637067800
    ];
  
    const y = x < 0 ? -x : x;
    let z: number;
  
    if (y <= 0.7) {
      const z2 = y * y;
      z = y * (((a[3] * z2 + a[2]) * z2 + a[1]) * z2 + a[0]) /
              ((((b[3] * z2 + b[2]) * z2 + b[1]) * z2 + b[0]) * z2 + 1);
    } else {
      const w = Math.sqrt(Math.log(1 - y * y));
      z = (((c[3] * w + c[2]) * w + c[1]) * w + c[0]) /
          ((d[1] * w + d[0]) * w + 1);
      if (x < 0) z = -z;
    }
  
    // One Newton–Raphson correction step for extra precision
    const err = erf(z) - x;
    z -= err / ( (2/Math.sqrt(Math.PI)) * Math.exp(-z*z) );
    return z;
  }
  
  /**
   * Inverse standard-normal CDF: Φ⁻¹(p).
   */
  function normalInv(p: number): number {
    if (p <= 0 || p >= 1) {
      throw new Error("p must be in (0,1)");
    }
    // Φ⁻¹(p) = √2 · erfinv(2p − 1)
    return Math.SQRT2 * erfinv(2 * p - 1);
  }
  
  /**
   * Given desired certainty p ∈ (0,1) and median-estimate Y,
   * returns the time t such that P[T ≤ t] = p under LogNormal(median=Y, σ=1).
   *
   *   t = Y * exp(Φ⁻¹(p))
   */
  export function timeToCertainty(p: number, Y: number): number {
    if (Y <= 0) {
      throw new Error("Estimate Y must be positive");
    }
    const z = normalInv(p);
    return Y * Math.exp(z);
  }