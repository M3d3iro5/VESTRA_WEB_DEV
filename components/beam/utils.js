// components/beam/utils.js

export function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

export function uid(prefix = "id") {
  // Next/Browser OK
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `${prefix}_${crypto.randomUUID()}`;
  }
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

export function toNumber(v, fallback = 0) {
  if (v === null || v === undefined) return fallback;
  const s = String(v).replace(",", ".");
  const n = Number(s);
  return Number.isFinite(n) ? n : fallback;
}

export function fmt(n, digits = 2) {
  if (!Number.isFinite(n)) return "-";
  return n.toFixed(digits);
}
