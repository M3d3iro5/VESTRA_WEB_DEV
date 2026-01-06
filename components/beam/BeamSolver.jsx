// components/beam/BeamSolver.jsx
import React, { useMemo, useRef, useState } from "react";
import { AlertTriangle, Plus, Trash2, RefreshCw, Download } from "lucide-react";
import BeamCanvas from "./BeamCanvas";
import { solveBeam } from "./beamMath";
import { DEFAULTS } from "./beamTypes";
import { fmt, toNumber, uid, clamp } from "./utils";

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function getSvgString(svgEl) {
  const serializer = new XMLSerializer();
  let source = serializer.serializeToString(svgEl);

  // garante namespaces
  if (!source.match(/^<svg[^>]+xmlns=/)) {
    source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  if (!source.match(/^<svg[^>]+"http:\/\/www\.w3\.org\/1999\/xlink"/)) {
    source = source.replace(
      /^<svg/,
      '<svg xmlns:xlink="http://www.w3.org/1999/xlink"',
    );
  }
  return source;
}

async function exportSvg(svgEl, filename = "vestra_viga.svg") {
  const svgString = getSvgString(svgEl);
  const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  downloadBlob(blob, filename);
}

async function exportPng(svgEl, filename = "vestra_viga.png", scale = 2) {
  const svgString = getSvgString(svgEl);
  const svgBlob = new Blob([svgString], {
    type: "image/svg+xml;charset=utf-8",
  });
  const url = URL.createObjectURL(svgBlob);

  const img = new Image();
  img.decoding = "async";

  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
    img.src = url;
  });

  const vb = svgEl.viewBox.baseVal;
  const w = (vb && vb.width) || svgEl.clientWidth || 1100;
  const h = (vb && vb.height) || svgEl.clientHeight || 420;

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(w * scale);
  canvas.height = Math.round(h * scale);

  const ctx = canvas.getContext("2d");
  // fundo branco opcional (pra PNG ficar “documento”)
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  URL.revokeObjectURL(url);

  const blob = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/png", 1.0),
  );
  downloadBlob(blob, filename);
}

export default function BeamSolver({ darkMode }) {
  const [L, setL] = useState(DEFAULTS.L);
  const [loads, setLoads] = useState([]);

  const svgRef = useRef(null);

  // Pontual
  const [pValue, setPValue] = useState("500");
  const [pX, setPX] = useState("2.5");
  const [pQty, setPQty] = useState("1");
  const [pStep, setPStep] = useState("1.0");

  // Distribuída
  const [dValue, setDValue] = useState("100");
  const [dX1, setDX1] = useState("0");
  const [dX2, setDX2] = useState("");

  const Lsafe = Math.max(0.001, Number(L) || 0.001);

  const results = useMemo(() => solveBeam(Lsafe, loads, 700), [Lsafe, loads]);

  function addPoint() {
    const val = toNumber(pValue, NaN);
    const pos0 = toNumber(pX, NaN);
    const qty = Math.max(1, Math.floor(toNumber(pQty, 1)));
    const step = toNumber(pStep, 0);

    if (!Number.isFinite(val) || !Number.isFinite(pos0)) return;

    const newLoads = [];
    for (let i = 0; i < qty; i++) {
      const pos = clamp(pos0 + i * step, 0, Lsafe);
      newLoads.push({ id: uid("P"), type: "P", value: val, x: pos });
    }
    setLoads((prev) => [...prev, ...newLoads]);
  }

  function addDist() {
    const val = toNumber(dValue, NaN);
    const x1 = toNumber(dX1, NaN);
    const x2 = dX2.trim() === "" ? Lsafe : toNumber(dX2, NaN);

    if (!Number.isFinite(val) || !Number.isFinite(x1) || !Number.isFinite(x2))
      return;

    const a = clamp(Math.min(x1, x2), 0, Lsafe);
    const b = clamp(Math.max(x1, x2), 0, Lsafe);
    if (Math.abs(b - a) < 1e-9) return;

    setLoads((prev) => [
      ...prev,
      { id: uid("D"), type: "D", value: val, x1: a, x2: b },
    ]);
  }

  function removeLoad(id) {
    setLoads((prev) => prev.filter((l) => l.id !== id));
  }

  function clearLoads() {
    setLoads([]);
  }

  function demo() {
    const preset = [
      { id: uid("P"), type: "P", value: 800, x: clamp(1.5, 0, Lsafe) },
      { id: uid("P"), type: "P", value: 500, x: clamp(4.2, 0, Lsafe) },
      {
        id: uid("D"),
        type: "D",
        value: 120,
        x1: clamp(0.5, 0, Lsafe),
        x2: clamp(3.5, 0, Lsafe),
      },
    ];
    setLoads(preset);
  }

  const anyLoad = loads.length > 0;

  const panel = darkMode
    ? "border-slate-900 bg-[#0a0a0a]"
    : "border-slate-200 bg-slate-50";

  return (
    <div className="grid lg:grid-cols-12 h-full animate-in zoom-in-95 duration-300">
      {/* Sidebar */}
      <div
        className={`lg:col-span-3 p-6 border-r flex flex-col gap-6 ${panel}`}
      >
        <div>
          <div className="text-cyan-300 font-extrabold text-lg mb-1">
            Viga Expert
          </div>
          <div className="text-xs opacity-60">
            Biapoiada • Reações + Momento solicitante • Exportação (SVG/PNG)
          </div>
        </div>

        {/* Comprimento */}
        <div className="p-4 rounded-2xl border border-slate-800 bg-black/20">
          <div className="text-xs font-extrabold opacity-70 mb-2">
            Comprimento (m)
          </div>
          <div className="flex gap-2">
            <input
              value={String(L)}
              onChange={(e) => setL(e.target.value)}
              className={`w-full rounded-xl px-3 py-2 text-sm outline-none border ${
                darkMode
                  ? "bg-[#0f111a] border-slate-800 text-slate-200"
                  : "bg-white border-slate-300 text-slate-900"
              }`}
              placeholder="Ex: 6.0"
            />
            <button
              onClick={() => setL((v) => toNumber(v, DEFAULTS.L))}
              className={`px-3 py-2 rounded-xl text-xs font-extrabold border ${
                darkMode
                  ? "border-slate-800 hover:bg-slate-900/40 text-slate-200"
                  : "border-slate-300 hover:bg-slate-200 text-slate-900"
              }`}
              title="Normalizar"
            >
              <RefreshCw size={14} />
            </button>
          </div>
          <div className="text-[11px] opacity-60 mt-2">
            Unidades: <span className="font-mono">kgf</span> e{" "}
            <span className="font-mono">kgf/m</span>
          </div>
        </div>

        {/* Pontual */}
        <div className="p-4 rounded-2xl border border-slate-800 bg-black/20">
          <div className="text-xs font-extrabold opacity-70 mb-3">
            Carga Pontual
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Field
              darkMode={darkMode}
              label="Valor (kgf)"
              value={pValue}
              onChange={setPValue}
            />
            <Field
              darkMode={darkMode}
              label="Posição x (m)"
              value={pX}
              onChange={setPX}
            />
            <Field
              darkMode={darkMode}
              label="Qtd (rep)"
              value={pQty}
              onChange={setPQty}
            />
            <Field
              darkMode={darkMode}
              label="Passo (m)"
              value={pStep}
              onChange={setPStep}
            />
          </div>

          <button
            onClick={addPoint}
            className="mt-3 w-full py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 transition"
          >
            <Plus size={14} /> Adicionar Pontual
          </button>
        </div>

        {/* Distribuída */}
        <div className="p-4 rounded-2xl border border-slate-800 bg-black/20">
          <div className="text-xs font-extrabold opacity-70 mb-3">
            Carga Distribuída
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Field
              darkMode={darkMode}
              label="Valor (kgf/m)"
              value={dValue}
              onChange={setDValue}
            />
            <Field
              darkMode={darkMode}
              label="Início x1 (m)"
              value={dX1}
              onChange={setDX1}
            />
            <div className="col-span-2">
              <Field
                darkMode={darkMode}
                label="Fim x2 (m) (vazio = final)"
                value={dX2}
                onChange={setDX2}
                placeholder="(vazio = L)"
              />
            </div>
          </div>

          <button
            onClick={addDist}
            className="mt-3 w-full py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 border border-pink-500/30 text-pink-300 hover:bg-pink-500/10 transition"
          >
            <Plus size={14} /> Adicionar Distribuída
          </button>
        </div>

        {/* Ações */}
        <div className="flex gap-2">
          <button
            onClick={demo}
            className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold border ${
              darkMode
                ? "border-slate-800 hover:bg-slate-900/40 text-slate-200"
                : "border-slate-300 hover:bg-slate-200 text-slate-900"
            }`}
          >
            Preset Demo
          </button>
          <button
            onClick={clearLoads}
            className="flex-1 py-2.5 rounded-xl text-xs font-extrabold border border-red-500/30 text-red-300 hover:bg-red-500/10 transition flex items-center justify-center gap-2"
          >
            <Trash2 size={14} /> Limpar
          </button>
        </div>

        {!anyLoad && (
          <div className="mt-auto p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl">
            <div className="flex items-center gap-2 text-yellow-300 text-xs font-extrabold mb-1">
              <AlertTriangle size={14} /> SEM CARGAS
            </div>
            <p className="text-[11px] opacity-70">
              Adicione ao menos uma carga para calcular reações e momento.
            </p>
          </div>
        )}
      </div>

      {/* Centro */}
      <div
        className={`lg:col-span-6 p-6 ${darkMode ? "bg-[#0f111a]" : "bg-white"}`}
      >
        {/* Barra superior (Export) */}
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <div>
            <div className="text-sm font-extrabold opacity-90">
              Esquema estrutural
            </div>
            <div className="text-xs opacity-60">
              Exportação do desenho para relatório técnico.
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                if (svgRef.current)
                  exportSvg(svgRef.current, "vestra_viga.svg");
              }}
              className={`px-3 py-2 rounded-xl text-xs font-extrabold border transition flex items-center gap-2 ${
                darkMode
                  ? "border-slate-800 hover:bg-slate-900/40 text-slate-200"
                  : "border-slate-300 hover:bg-slate-100 text-slate-900"
              }`}
              title="Exportar em SVG (vetorial)"
            >
              <Download size={14} /> SVG
            </button>

            <button
              onClick={async () => {
                if (svgRef.current)
                  await exportPng(svgRef.current, "vestra_viga.png", 2);
              }}
              className="px-3 py-2 rounded-xl text-xs font-extrabold border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10 transition flex items-center gap-2"
              title="Exportar em PNG (imagem)"
            >
              <Download size={14} /> PNG
            </button>
          </div>
        </div>

        <BeamCanvas
          darkMode={darkMode}
          L={Lsafe}
          loads={loads}
          highlightX={anyLoad ? results.xAtMmax : null}
          svgRef={svgRef}
        />

        <div className="mt-4 text-xs opacity-60">
          Nota: Momento máximo é estimado por varredura numérica (precisão alta
          para uso interativo).
        </div>

        {/* Lista de cargas */}
        <div
          className={`mt-6 rounded-2xl border ${
            darkMode
              ? "border-slate-900 bg-black/20"
              : "border-slate-200 bg-slate-50"
          }`}
        >
          <div className="px-4 py-3 border-b border-slate-800/40 flex items-center justify-between">
            <div className="text-sm font-extrabold opacity-80">Cargas</div>
            <div className="text-xs opacity-60">{loads.length} item(s)</div>
          </div>

          <div className="p-3 space-y-2 max-h-[260px] overflow-auto">
            {loads.length === 0 && (
              <div className="text-xs opacity-60 px-2 py-6 text-center">
                Nenhuma carga cadastrada.
              </div>
            )}

            {loads.map((l) => {
              const isP = l.type === "P";
              const label = isP
                ? `Pontual: ${fmt(l.value, 2)} kgf em x=${fmt(l.x, 2)} m`
                : `Distrib.: ${fmt(l.value, 2)} kgf/m de x=${fmt(l.x1, 2)} a x=${fmt(l.x2, 2)} m`;

              const color = isP ? "text-purple-300" : "text-pink-300";

              return (
                <div
                  key={l.id}
                  className={`flex items-center justify-between gap-3 px-3 py-2 rounded-xl border ${
                    darkMode
                      ? "border-slate-800 bg-[#0a0a0a]"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className={`text-xs font-mono ${color}`}>{label}</div>
                  <button
                    onClick={() => removeLoad(l.id)}
                    className="p-2 rounded-xl border border-slate-700 hover:bg-red-500/10 hover:border-red-500/30 text-slate-300 hover:text-red-300 transition"
                    title="Remover"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Direita */}
      <div className={`lg:col-span-3 p-6 border-l flex flex-col ${panel}`}>
        <div className="font-extrabold text-xl mb-4 text-cyan-300">
          Resultados
        </div>

        <div className="grid grid-cols-1 gap-3">
          <ResultCard
            darkMode={darkMode}
            title="Reação A (RA)"
            value={`${fmt(results.RA, 2)} kgf`}
            hint="Equilíbrio ΣFy = 0"
            color="text-emerald-300"
          />
          <ResultCard
            darkMode={darkMode}
            title="Reação B (RB)"
            value={`${fmt(results.RB, 2)} kgf`}
            hint="Equilíbrio ΣM(A) = 0"
            color="text-emerald-300"
          />
          <ResultCard
            darkMode={darkMode}
            title="Momento solicitante (Mmax)"
            value={`${fmt(results.Mmax, 2)} kgf·m`}
            hint="Maior |M(x)| no vão"
            color="text-orange-300"
          />
          <ResultCard
            darkMode={darkMode}
            title="Posição do Mmax"
            value={`${fmt(results.xAtMmax, 2)} m`}
            hint="Marcado no desenho"
            color="text-green-300"
          />
        </div>

        <div className="mt-6 p-4 rounded-2xl border border-cyan-500/20 bg-cyan-500/5">
          <div className="text-xs font-extrabold text-cyan-300 mb-1">
            Exportação pronta
          </div>
          <p className="text-[11px] opacity-70 leading-relaxed">
            Use SVG para relatório vetorial e PNG para anexos rápidos em
            e-mail/WhatsApp.
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({ darkMode, label, value, onChange, placeholder }) {
  return (
    <div>
      <div className="text-[11px] opacity-60 mb-1">{label}</div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl px-3 py-2 text-sm outline-none border ${
          darkMode
            ? "bg-[#0f111a] border-slate-800 text-slate-200"
            : "bg-white border-slate-300 text-slate-900"
        }`}
      />
    </div>
  );
}

function ResultCard({ darkMode, title, value, hint, color }) {
  return (
    <div
      className={`p-4 rounded-2xl border ${
        darkMode ? "border-slate-800 bg-[#0f111a]" : "border-slate-200 bg-white"
      }`}
    >
      <div className="text-[11px] uppercase font-extrabold opacity-60 mb-1">
        {title}
      </div>
      <div className={`text-xl font-mono font-black ${color}`}>{value}</div>
      <div className="text-[11px] opacity-60 mt-1">{hint}</div>
    </div>
  );
}
