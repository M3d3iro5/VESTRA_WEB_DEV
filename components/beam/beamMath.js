// components/beam/beamMath.js
import { clamp } from "./utils";

/**
 * Normaliza cargas para ficarem dentro do vão [0, L]
 */
function normalizeLoads(loads, L) {
  const Lsafe = Math.max(0.001, L);

  return (loads || [])
    .map((l) => {
      if (l.type === "P") {
        return { ...l, x: clamp(l.x, 0, Lsafe) };
      }
      let x1 = clamp(l.x1, 0, Lsafe);
      let x2 = clamp(l.x2, 0, Lsafe);
      if (x2 < x1) [x1, x2] = [x2, x1];
      return { ...l, x1, x2 };
    })
    .filter((l) => {
      if (l.type === "P") return true;
      return Math.abs(l.x2 - l.x1) > 1e-9;
    });
}

function totalForce(loads) {
  let sum = 0;
  for (const l of loads) {
    if (l.type === "P") sum += l.value;
    else sum += l.value * (l.x2 - l.x1);
  }
  return sum;
}

function momentAboutA(loads) {
  // Momento das cargas em relação ao apoio A (x=0)
  let m = 0;
  for (const l of loads) {
    if (l.type === "P") {
      m += l.value * l.x;
    } else {
      const W = l.value * (l.x2 - l.x1);
      const xbar = (l.x1 + l.x2) / 2;
      m += W * xbar;
    }
  }
  return m;
}

/**
 * Resolve viga biapoiada:
 * - Reações RA e RB
 * - Momento solicitante máximo |M| (aproximado por varredura)
 *
 * Retorna:
 * { RA, RB, Mmax, xAtMmax }
 */
export function solveBeam(L, loadsInput, nSamples = 600) {
  const Lsafe = Math.max(0.001, L);
  const loads = normalizeLoads(loadsInput, Lsafe);

  const F = totalForce(loads);
  const MA = momentAboutA(loads);

  const RB = MA / Lsafe;
  const RA = F - RB;

  // Momento interno M(x)
  // M(x) = RA*x - Σ P*(x-xi)H(x-xi) - Σ udlContribution
  function M(x) {
    let m = RA * x;

    for (const l of loads) {
      if (l.type === "P") {
        if (x >= l.x) m -= l.value * (x - l.x);
      } else {
        const a = l.x1;
        const b = l.x2;
        const w = l.value;

        if (x <= a) continue;

        if (x < b) {
          // contribuição parcial: w*(x-a)^2/2
          m -= (w * Math.pow(x - a, 2)) / 2;
        } else {
          // contribuição total: W*(x - xbar)
          const W = w * (b - a);
          const xbar = (a + b) / 2;
          m -= W * (x - xbar);
        }
      }
    }

    return m;
  }

  let Mmax = -Infinity;
  let xAtMmax = 0;

  for (let i = 0; i <= nSamples; i++) {
    const x = (i / nSamples) * Lsafe;
    const mx = M(x);
    const abs = Math.abs(mx);
    if (abs > Mmax) {
      Mmax = abs;
      xAtMmax = x;
    }
  }

  // Se não tem carga, evita Infinity
  if (!Number.isFinite(Mmax)) Mmax = 0;

  return { RA, RB, Mmax, xAtMmax };
}
