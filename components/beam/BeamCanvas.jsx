// components/beam/BeamCanvas.jsx
import React, { useMemo } from "react";
import { clamp, fmt } from "./utils";

function uniqSorted(nums) {
  return Array.from(new Set(nums)).sort((a, b) => a - b);
}

export default function BeamCanvas({
  darkMode,
  L,
  loads,
  highlightX = null,
  height = 420,
  svgRef = null, // <-- NOVO: ref para exportar
}) {
  const W = 1100;
  const H = height;

  const padX = 70;
  const beamY = Math.round(H * 0.6);

  const x0 = padX;
  const x1 = W - padX;

  const Lsafe = Math.max(0.001, Number(L) || 0.001);
  const scale = (x1 - x0) / Lsafe;

  const colors = useMemo(() => {
    if (darkMode) {
      return {
        bg: "#0f111a",
        grid: "rgba(255,255,255,0.035)",
        beam: "#CBD5E1",
        support: "#94A3B8",
        dimMain: "#22d3ee",
        dimSub: "rgba(255,255,255,0.62)",
        dimTextBg: "rgba(15,17,26,0.95)",
        point: "#A78BFA",
        dist: "#FB7185",
        text: "rgba(255,255,255,0.90)",
        hint: "rgba(255,255,255,0.55)",
        highlight: "#34D399",
      };
    }
    return {
      bg: "#ffffff",
      grid: "rgba(0,0,0,0.05)",
      beam: "#0f172a",
      support: "#334155",
      dimMain: "#0369a1",
      dimSub: "#334155",
      dimTextBg: "rgba(255,255,255,0.95)",
      point: "#6d28d9",
      dist: "#be185d",
      text: "#0f172a",
      hint: "rgba(0,0,0,0.55)",
      highlight: "#059669",
    };
  }, [darkMode]);

  const pointLoads = useMemo(
    () => (loads || []).filter((l) => l.type === "P"),
    [loads],
  );
  const distLoads = useMemo(
    () => (loads || []).filter((l) => l.type === "D"),
    [loads],
  );

  const crowded = pointLoads.length >= 7;
  const veryCrowded = pointLoads.length >= 12;

  const labelEvery = useMemo(() => {
    if (pointLoads.length <= 6) return 1;
    if (pointLoads.length <= 10) return 2;
    if (pointLoads.length <= 16) return 3;
    return 4;
  }, [pointLoads.length]);

  const dimEvery = useMemo(() => {
    if (pointLoads.length <= 5) return 1;
    if (pointLoads.length <= 10) return 2;
    return 3;
  }, [pointLoads.length]);

  function xPx(xm) {
    return x0 + clamp(Number(xm) || 0, 0, Lsafe) * scale;
  }

  const pointsForDimsAll = useMemo(() => {
    const pts = [0, ...pointLoads.map((p) => clamp(p.x, 0, Lsafe)), Lsafe];
    return uniqSorted(pts);
  }, [pointLoads, Lsafe]);

  const pointsForDimsReduced = useMemo(() => {
    if (pointsForDimsAll.length <= 3) return pointsForDimsAll;
    if (!crowded) return pointsForDimsAll;

    const mid = pointsForDimsAll.slice(1, -1);
    const keep = mid.filter((_, i) => i % dimEvery === 0);
    return [0, ...keep, Lsafe];
  }, [pointsForDimsAll, crowded, dimEvery, Lsafe]);

  function Dim({ xa, xb, y, text, color, bold = false }) {
    const tick = bold ? 10 : 8;
    const bal = bold ? 12 : 10;
    const mid = (xa + xb) / 2;
    const fontSize = bold ? 13 : 12;

    return (
      <g>
        <line
          x1={xa}
          y1={y - bal}
          x2={xa}
          y2={y + bal}
          stroke={color}
          strokeWidth={bold ? 2 : 1.5}
        />
        <line
          x1={xb}
          y1={y - bal}
          x2={xb}
          y2={y + bal}
          stroke={color}
          strokeWidth={bold ? 2 : 1.5}
        />

        <line
          x1={xa}
          y1={y}
          x2={xb}
          y2={y}
          stroke={color}
          strokeWidth={bold ? 2 : 1.5}
        />

        <line
          x1={xa - tick}
          y1={y + tick}
          x2={xa + tick}
          y2={y - tick}
          stroke={color}
          strokeWidth={bold ? 2.5 : 2}
        />
        <line
          x1={xb - tick}
          y1={y + tick}
          x2={xb + tick}
          y2={y - tick}
          stroke={color}
          strokeWidth={bold ? 2.5 : 2}
        />

        <rect
          x={mid - 85}
          y={y - 30}
          width={170}
          height={22}
          fill={colors.dimTextBg}
          opacity={0.96}
          rx={6}
        />
        <text
          x={mid}
          y={y - 14}
          textAnchor="middle"
          fontSize={fontSize}
          fill={color}
          fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas"
          style={{ fontWeight: bold ? 700 : 600 }}
        >
          {text}
        </text>
      </g>
    );
  }

  const arrowTop = veryCrowded ? beamY - 80 : beamY - 115;
  const arrowStroke = veryCrowded ? 2 : 3;
  const arrowHead = veryCrowded ? 6 : 7;

  return (
    <div className="w-full">
      <svg
        ref={svgRef} // <-- NOVO
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto rounded-xl border border-slate-800"
        style={{
          background: colors.bg,
          boxShadow: darkMode
            ? "0 0 0 1px rgba(148,163,184,0.10) inset"
            : "0 0 0 1px rgba(15,23,42,0.08) inset",
        }}
      >
        {/* grid */}
        <g>
          {Array.from({ length: 16 }).map((_, i) => {
            const gx = (i / 15) * W;
            return (
              <line
                key={`gx-${i}`}
                x1={gx}
                y1={0}
                x2={gx}
                y2={H}
                stroke={colors.grid}
                strokeWidth={1}
              />
            );
          })}
          {Array.from({ length: 9 }).map((_, i) => {
            const gy = (i / 8) * H;
            return (
              <line
                key={`gy-${i}`}
                x1={0}
                y1={gy}
                x2={W}
                y2={gy}
                stroke={colors.grid}
                strokeWidth={1}
              />
            );
          })}
        </g>

        {/* hint */}
        <text
          x={x0}
          y={28}
          fontSize={12}
          fill={colors.hint}
          fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas"
        >
          Viga biapoiada • Cotas dinâmicas • Reações + Momento solicitante
          máximo
        </text>

        {/* viga */}
        <line
          x1={x0}
          y1={beamY}
          x2={x1}
          y2={beamY}
          stroke={colors.beam}
          strokeWidth={8}
          strokeLinecap="round"
          opacity={0.95}
        />

        {/* apoios */}
        <g opacity={0.95}>
          <polygon
            points={`${x0},${beamY + 2} ${x0 - 22},${beamY + 40} ${x0 + 22},${beamY + 40}`}
            fill={colors.support}
          />
          <line
            x1={x0 - 34}
            y1={beamY + 40}
            x2={x0 + 34}
            y2={beamY + 40}
            stroke={colors.support}
            strokeWidth={4}
          />
          <text
            x={x0}
            y={beamY + 62}
            textAnchor="middle"
            fontSize={12}
            fill={colors.text}
            fontFamily="ui-monospace, SFMono-Regular"
          >
            A
          </text>

          <polygon
            points={`${x1},${beamY + 2} ${x1 - 22},${beamY + 40} ${x1 + 22},${beamY + 40}`}
            fill={colors.support}
          />
          <line
            x1={x1 - 34}
            y1={beamY + 40}
            x2={x1 + 34}
            y2={beamY + 40}
            stroke={colors.support}
            strokeWidth={4}
          />
          <text
            x={x1}
            y={beamY + 62}
            textAnchor="middle"
            fontSize={12}
            fill={colors.text}
            fontFamily="ui-monospace, SFMono-Regular"
          >
            B
          </text>
        </g>

        {/* Mmax */}
        {highlightX !== null && Number.isFinite(highlightX) && (
          <g>
            <line
              x1={xPx(highlightX)}
              y1={beamY - 135}
              x2={xPx(highlightX)}
              y2={beamY + 45}
              stroke={colors.highlight}
              strokeWidth={2.5}
              strokeDasharray="8 8"
              opacity={0.9}
            />
            <rect
              x={xPx(highlightX) - 72}
              y={beamY - 155}
              width={144}
              height={22}
              rx={6}
              fill={colors.dimTextBg}
              opacity={0.96}
            />
            <text
              x={xPx(highlightX)}
              y={beamY - 140}
              textAnchor="middle"
              fontSize={12}
              fill={colors.highlight}
              fontFamily="ui-monospace, SFMono-Regular"
              style={{ fontWeight: 700 }}
            >
              x(Mmax) = {fmt(highlightX, 2)} m
            </text>
          </g>
        )}

        {/* cota total */}
        <Dim
          xa={x0}
          xb={x1}
          y={beamY + 125}
          text={`Vão Total: ${fmt(Lsafe, 2)} m`}
          color={colors.dimMain}
          bold
        />

        {/* cotas parciais */}
        {pointsForDimsReduced.length > 2 && (
          <g>
            {pointsForDimsReduced.slice(0, -1).map((p, i) => {
              const pn = pointsForDimsReduced[i + 1];
              if (Math.abs(pn - p) < 1e-6) return null;
              return (
                <Dim
                  key={`${p}-${pn}`}
                  xa={xPx(p)}
                  xb={xPx(pn)}
                  y={beamY + 78}
                  text={`${fmt(pn - p, 2)} m`}
                  color={colors.dimSub}
                />
              );
            })}
          </g>
        )}

        {/* distribuídas */}
        {distLoads.map((d) => {
          const xa = xPx(d.x1);
          const xb = xPx(d.x2);

          const yTop = beamY - (veryCrowded ? 55 : 70);
          const yBottom = beamY;

          const width = Math.max(2, xb - xa);
          const n = Math.max(3, Math.floor(width / (veryCrowded ? 65 : 55)));
          const step = width / (n - 1);

          return (
            <g key={d.id} opacity={0.95}>
              <rect
                x={xa}
                y={yTop}
                width={width}
                height={yBottom - yTop}
                fill="transparent"
                stroke={colors.dist}
                strokeWidth={2}
              />

              {Array.from({ length: n }).map((_, i) => {
                const x = xa + i * step;
                return (
                  <g key={`darr-${d.id}-${i}`}>
                    <line
                      x1={x}
                      y1={yTop}
                      x2={x}
                      y2={yBottom - 10}
                      stroke={colors.dist}
                      strokeWidth={2}
                    />
                    <polygon
                      points={`${x},${yBottom} ${x - 6},${yBottom - 10} ${
                        x + 6
                      },${yBottom - 10}`}
                      fill={colors.dist}
                    />
                  </g>
                );
              })}

              <rect
                x={(xa + xb) / 2 - 85}
                y={yTop - 30}
                width={170}
                height={20}
                rx={6}
                fill={colors.dimTextBg}
                opacity={0.92}
              />
              <text
                x={(xa + xb) / 2}
                y={yTop - 16}
                textAnchor="middle"
                fontSize={12}
                fill={colors.dist}
                fontFamily="ui-monospace, SFMono-Regular"
                style={{ fontWeight: 700 }}
              >
                q = {fmt(d.value, 2)} kgf/m
              </text>
            </g>
          );
        })}

        {/* pontuais */}
        {pointLoads.map((p, idx) => {
          const x = xPx(p.x);
          const showLabel = idx % labelEvery === 0;
          const yText = arrowTop - 12;

          return (
            <g key={p.id} opacity={0.95}>
              <line
                x1={x}
                y1={arrowTop}
                x2={x}
                y2={beamY - 12}
                stroke={colors.point}
                strokeWidth={arrowStroke}
              />
              <polygon
                points={`${x},${beamY} ${x - arrowHead},${beamY - 14} ${
                  x + arrowHead
                },${beamY - 14}`}
                fill={colors.point}
              />

              {showLabel && (
                <g>
                  <rect
                    x={x - 62}
                    y={yText - 16}
                    width={124}
                    height={18}
                    rx={6}
                    fill={colors.dimTextBg}
                    opacity={0.9}
                  />
                  <text
                    x={x}
                    y={yText - 3}
                    textAnchor="middle"
                    fontSize={12}
                    fill={colors.point}
                    fontFamily="ui-monospace, SFMono-Regular"
                    style={{ fontWeight: 700 }}
                  >
                    {fmt(p.value, 2)} kgf
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* legenda quando lotado */}
        {veryCrowded && (
          <g>
            <rect
              x={x0}
              y={H - 40}
              width={W - 2 * x0}
              height={26}
              rx={10}
              fill={colors.dimTextBg}
              opacity={0.92}
            />
            <text
              x={W / 2}
              y={H - 22}
              textAnchor="middle"
              fontSize={12}
              fill={colors.hint}
              fontFamily="ui-monospace, SFMono-Regular"
            >
              Visual simplificado: {pointLoads.length} cargas pontuais (labels
              reduzidos para evitar sobreposição)
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
