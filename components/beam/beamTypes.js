// components/beam/beamTypes.js

// Estrutura esperada para as cargas:
//
// Pontual:
// { id: "xxx", type: "P", value: 500, x: 2.5 }        // value em kgf, x em m
//
// Distribuída:
// { id: "xxx", type: "D", value: 100, x1: 1, x2: 4 }  // value em kgf/m, intervalo em m
//
// Unidade: use tudo consistente (kgf e kgf/m) e o resultado sairá em kgf e kgf·m.

export const LOAD_TYPES = {
  POINT: "P",
  DIST: "D",
};

export const DEFAULTS = {
  L: 6.0,
};
