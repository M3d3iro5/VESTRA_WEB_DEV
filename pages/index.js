"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import BeamSolver from "../components/beam";

import {
  Moon,
  Sun,
  Shield,
  Zap,
  Layers,
  Activity,
  Mail,
  User,
  BookOpen,
  Settings,
  Database,
  Ruler,
  Clock,
  Thermometer,
  ArrowUpFromLine,
  Snowflake,
  Bot,
  Terminal,
  Grid,
  Cpu,
  AlertTriangle,
  RefreshCw,
  ChevronRight,
} from "lucide-react";

// Recharts (SSR off, lazy load only when needed)
const AreaChart = dynamic(() => import("recharts").then((m) => m.AreaChart), {
  ssr: false,
  loading: () => (
    <div className="h-[420px] bg-slate-800 rounded animate-pulse" />
  ),
});
const Area = dynamic(() => import("recharts").then((m) => m.Area), {
  ssr: false,
});
const XAxis = dynamic(() => import("recharts").then((m) => m.XAxis), {
  ssr: false,
});
const YAxis = dynamic(() => import("recharts").then((m) => m.YAxis), {
  ssr: false,
});
const CartesianGrid = dynamic(
  () => import("recharts").then((m) => m.CartesianGrid),
  { ssr: false },
);
const Tooltip = dynamic(() => import("recharts").then((m) => m.Tooltip), {
  ssr: false,
});
const ResponsiveContainer = dynamic(
  () => import("recharts").then((m) => m.ResponsiveContainer),
  { ssr: false },
);
const ReferenceLine = dynamic(
  () => import("recharts").then((m) => m.ReferenceLine),
  { ssr: false },
);

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState("metalon");

  // --- PIG ---
  const [pigData, setPigData] = useState([]);

  // Debug: Log para monitorar carregamento
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("[VESTRA] 🚀 Página carregada com sucesso");
      console.log("[VESTRA] ✓ SVG inline ativo (sem requisições externas)");
    }
  }, []);

  // --- METALON ---
  const [width, setWidth] = useState(50); // mm
  const [height, setHeight] = useState(100); // mm
  const [thickness, setThickness] = useState(3.0); // mm
  const [length, setLength] = useState(6.0); // m

  // Engine (densidade)
  const DENSITY = 8000;

  // Memoized calculations para evitar recalcular a cada render
  const metalCalculations = useMemo(() => {
    const H_cm = height / 10;
    const B_cm = width / 10;
    const t_cm = thickness / 10;

    const AreaSec = B_cm * H_cm - (B_cm - 2 * t_cm) * (H_cm - 2 * t_cm);

    const Ixx =
      (B_cm * Math.pow(H_cm, 3) -
        (B_cm - 2 * t_cm) * Math.pow(H_cm - 2 * t_cm, 3)) /
      12;

    const Iyy =
      (H_cm * Math.pow(B_cm, 3) -
        (H_cm - 2 * t_cm) * Math.pow(B_cm - 2 * t_cm, 3)) /
      12;

    const Wxx = Ixx / (H_cm / 2);
    const Wyy = Iyy / (B_cm / 2);

    const rxx = Math.sqrt(Ixx / AreaSec);
    const ryy = Math.sqrt(Iyy / AreaSec);

    const WeightTotal = (AreaSec / 10000) * length * DENSITY;
    const WeightLinear = WeightTotal / length;
    const VolumeMat = (AreaSec / 10000) * length;

    return {
      AreaSec,
      Ixx,
      Iyy,
      Wxx,
      Wyy,
      rxx,
      ryy,
      WeightTotal,
      WeightLinear,
      VolumeMat,
    };
  }, [width, height, thickness, length]);

  const {
    AreaSec,
    Ixx,
    Iyy,
    Wxx,
    Wyy,
    rxx,
    ryy,
    WeightTotal,
    WeightLinear,
    VolumeMat,
  } = metalCalculations;

  const generatePigData = useCallback(() => {
    const data = [];
    const nominalThickness = 12.0;
    for (let i = 0; i <= 20; i++) {
      const corrosion =
        Math.random() > 0.8 ? Math.random() * 4 : Math.random() * 0.5;

      data.push({
        km: (i * 0.5).toFixed(1),
        espessura: nominalThickness,
        perda: Number(corrosion.toFixed(2)),
        restante: Number((nominalThickness - corrosion).toFixed(2)),
      });
    }
    setPigData(data);
  }, []);

  useEffect(() => {
    generatePigData();
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode, generatePigData]);

  const theme = useMemo(() => {
    return {
      page: darkMode
        ? "bg-[#070707] text-slate-200"
        : "bg-slate-50 text-slate-900",
      nav: darkMode
        ? "bg-[#070707]/80 border-slate-900"
        : "bg-white/85 border-slate-200",
      card: darkMode
        ? "bg-[#0f111a] border-slate-900"
        : "bg-white border-slate-200",
      cardSoft: darkMode ? "bg-[#0b0b0b]" : "bg-slate-50",
      pill: darkMode
        ? "bg-purple-900/20 border-purple-500/30 text-purple-300"
        : "bg-slate-100 border-slate-200 text-slate-700",
      link: darkMode ? "hover:text-purple-400" : "hover:text-purple-600",
      tabBase: darkMode
        ? "bg-[#050505] border-slate-900"
        : "bg-slate-50 border-slate-200",
    };
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen transition-colors duration-500 font-sans selection:bg-purple-500 selection:text-white ${theme.page}`}
    >
      {/* NAVBAR */}
      <nav
        className={`fixed w-full z-50 border-b backdrop-blur-xl transition-colors duration-500 ${theme.nav}`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          {/* Brand */}
          <div className="flex items-center gap-3">
            {/* Logo Vestra - Data URI inline (sem requisição HTTP) */}
            <img
              src="data:image/png;base64,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
"
              alt="Vestra Logo"
              width={40}
              height={40}
              className="rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.2)]"
            />

            {/* Nome + domínio */}
            <div className="leading-tight">
              <div className="font-extrabold text-lg tracking-tight flex items-center gap-2">
                VESTRA
                <span
                  className={darkMode ? "text-purple-400" : "text-purple-600"}
                >
                  .ENG
                </span>
                {/* separador */}
                <span className="text-xs font-mono opacity-40 mx-1">•</span>
                {/* domínio */}
                <a
                  href="https://vestraeng.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono opacity-60 hover:opacity-100 transition"
                >
                  vestraeng.com.br
                </a>
              </div>

              <div className="text-[11px] opacity-60 -mt-0.5">
                Engineering Environment
              </div>
            </div>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
            <a href="#simulador" className={`transition ${theme.link}`}>
              Simulador
            </a>
            <a
              href="#ai"
              className={`transition flex items-center gap-1 ${theme.link}`}
            >
              <Bot size={14} /> Vestra AI
            </a>
            <a href="#modulos" className={`transition ${theme.link}`}>
              Módulos
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-colors ${
                darkMode
                  ? "hover:bg-purple-900/20 text-purple-300"
                  : "hover:bg-slate-100 text-slate-700"
              }`}
              aria-label="Alternar tema"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <a
              href="mailto:luiz@vestra.eng.br"
              className={`hidden sm:flex px-5 py-2.5 rounded-xl font-extrabold text-sm shadow-lg transition items-center gap-2 ${
                darkMode
                  ? "bg-slate-100 text-black hover:bg-white hover:scale-[1.03]"
                  : "bg-slate-900 text-white hover:bg-slate-800 hover:scale-[1.03]"
              }`}
            >
              <Mail size={16} /> Contato
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="pt-40 pb-20 px-6 relative overflow-hidden">
        {/* background glow - reduzido no mobile para performance */}
        <div
          className={`absolute -top-24 left-1/2 -translate-x-1/2 w-[1100px] h-[520px] rounded-full blur-[80px] md:blur-[150px] opacity-15 md:opacity-20 pointer-events-none ${
            darkMode ? "bg-purple-600" : "bg-blue-400"
          }`}
        />

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider mb-8 border ${theme.pill}`}
          >
            <Activity size={14} className="animate-pulse text-emerald-400" />
            V2.0 Live • Kernel em tempo real
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05]">
            Da prática industrial <br />
            para o{" "}
            <span
              className={`text-transparent bg-clip-text bg-gradient-to-r ${
                darkMode
                  ? "from-purple-300 to-indigo-300"
                  : "from-purple-700 to-pink-600"
              }`}
            >
              digital
            </span>
            .
          </h1>

          <p className="text-lg md:text-xl opacity-75 mt-7 max-w-3xl mx-auto leading-relaxed font-light">
            Software nascido no chão de fábrica da{" "}
            <strong>Inova Industrial</strong>. Automatize dimensionamentos e
            rotinas técnicas com a precisão de quem projeta máquinas reais.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/sobre"
              className={`px-8 py-4 rounded-2xl font-extrabold text-lg transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 ${
                darkMode
                  ? "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/20"
                  : "bg-slate-900 text-white hover:bg-slate-800"
              }`}
            >
              <User size={18} /> Conheça o Engenheiro
              <ChevronRight size={18} className="opacity-80" />
            </Link>

            <a
              href="#simulador"
              className={`px-8 py-4 rounded-2xl font-extrabold text-lg border transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 ${
                darkMode
                  ? "border-slate-800 bg-[#0f111a] hover:border-purple-500/50"
                  : "border-slate-300 bg-white hover:bg-slate-50"
              }`}
            >
              <Cpu size={18} /> Abrir Simulador
            </a>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl mx-auto">
            <HeroStat
              darkMode={darkMode}
              title="Cálculo instantâneo"
              value="Realtime"
            />
            <HeroStat
              darkMode={darkMode}
              title="Precisão de engenharia"
              value="Tabelas + Física"
            />
            <HeroStat
              darkMode={darkMode}
              title="Vitrine de módulos"
              value="Suite Vestra"
            />
          </div>
        </div>
      </header>

      {/* SIMULADOR */}
      <section id="simulador" className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black mb-3 flex items-center justify-center gap-2">
              <Cpu className="text-purple-500" /> Kernel de Cálculo Vestra
            </h2>
            <p className="opacity-65 max-w-2xl mx-auto">
              Teste a potência dos nossos algoritmos em tempo real — com visual
              técnico e dados confiáveis.
            </p>
          </div>

          <div
            className={`rounded-3xl border shadow-2xl overflow-hidden transition-all duration-500 ${theme.card}`}
          >
            {/* Tabs header */}
            <div className={`flex flex-wrap border-b ${theme.tabBase}`}>
              <TabButton
                darkMode={darkMode}
                active={activeTab === "metalon"}
                onClick={() => setActiveTab("metalon")}
                icon={<Layers size={18} />}
                label="Metalon Builder"
                accent="purple"
              />
              <TabButton
                darkMode={darkMode}
                active={activeTab === "viga"}
                onClick={() => setActiveTab("viga")}
                icon={<Ruler size={18} />}
                label="Viga Expert"
                accent="cyan"
              />
              <TabButton
                darkMode={darkMode}
                active={activeTab === "pig"}
                onClick={() => setActiveTab("pig")}
                icon={<Shield size={18} />}
                label="PIG Analytics"
                accent="blue"
              />
            </div>

            <div className="p-0 min-h-[640px]">
              {/* ABA 1: METALON */}
              {activeTab === "metalon" && (
                <div className="grid lg:grid-cols-12 h-full animate-in fade-in duration-500">
                  {/* Inputs */}
                  <div
                    className={`lg:col-span-3 p-6 border-r flex flex-col gap-8 ${
                      darkMode
                        ? "border-slate-900 bg-[#090909]"
                        : "border-slate-200 bg-slate-50"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-sm font-extrabold uppercase tracking-wider text-purple-400">
                          Geometria
                        </h3>
                        <span className="text-[11px] font-mono opacity-60">
                          mm / m
                        </span>
                      </div>

                      <div className="space-y-6">
                        {[
                          {
                            l: "Altura (H)",
                            v: height,
                            s: setHeight,
                            min: 50,
                            max: 300,
                          },
                          {
                            l: "Largura (B)",
                            v: width,
                            s: setWidth,
                            min: 30,
                            max: 200,
                          },
                          {
                            l: "Espessura (t)",
                            v: thickness,
                            s: setThickness,
                            min: 1.5,
                            max: 12,
                            step: 0.5,
                          },
                          {
                            l: "Comprimento (L)",
                            v: length,
                            s: setLength,
                            min: 1,
                            max: 12,
                            step: 0.5,
                            unit: "m",
                          },
                        ].map((control, idx) => (
                          <RangeControl
                            key={idx}
                            darkMode={darkMode}
                            label={control.l}
                            value={control.v}
                            unit={control.unit || "mm"}
                            min={control.min}
                            max={control.max}
                            step={control.step || 10}
                            onChange={(val) => control.s(val)}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto p-4 rounded-2xl border border-purple-500/20 bg-purple-500/5">
                      <div className="text-xs opacity-60">Densidade do aço</div>
                      <div className="font-mono text-purple-300 font-extrabold text-lg">
                        8000 kg/m³
                      </div>
                      <div className="text-[11px] opacity-60 mt-1">
                        Motor de cálculo calibrado.
                      </div>
                    </div>
                  </div>

                  {/* Visual */}
                  <div
                    className={`lg:col-span-5 p-8 flex flex-col items-center justify-center relative overflow-hidden ${
                      darkMode ? "bg-[#0d0f14]" : "bg-white"
                    }`}
                  >
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: `radial-gradient(${darkMode ? "#2a2a2a" : "#d4d4d4"} 1px, transparent 1px)`,
                        backgroundSize: "20px 20px",
                      }}
                    />

                    <div className="relative z-10">
                      <div
                        className="transition-all duration-300 shadow-[0_0_70px_rgba(168,85,247,0.18)]"
                        style={{
                          width: `${width * 1.5}px`,
                          height: `${height * 1.5}px`,
                          borderWidth: `${thickness}px`,
                          borderStyle: "solid",
                          borderColor: darkMode ? "#a855f7" : "#2563eb",
                          borderRadius: "10px",
                          background: darkMode
                            ? "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))"
                            : "linear-gradient(180deg, rgba(2,6,23,0.04), rgba(2,6,23,0.01))",
                        }}
                      />

                      {/* Cotas */}
                      <div className="absolute -left-10 top-1/2 -translate-y-1/2 text-xs font-mono opacity-60 border-r border-slate-600/60 pr-2 h-full flex items-center">
                        {height}
                      </div>
                      <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs font-mono opacity-60 border-t border-slate-600/60 pt-1 w-full text-center">
                        {width}
                      </div>
                    </div>

                    <div className="absolute bottom-4 text-xs font-mono opacity-40">
                      ESCALA 1.5:1
                    </div>
                  </div>

                  {/* Resultados */}
                  <div
                    className={`lg:col-span-4 p-0 ${
                      darkMode ? "bg-[#0f111a]" : "bg-slate-50"
                    }`}
                  >
                    <div className="grid grid-cols-2 h-full">
                      {[
                        {
                          l: "Peso Total",
                          v: `${WeightTotal.toFixed(2)} kg`,
                          c: "text-emerald-400",
                        },
                        {
                          l: "Peso Linear",
                          v: `${WeightLinear.toFixed(2)} kg/m`,
                          c: "text-emerald-400",
                        },
                        {
                          l: "Área da Seção",
                          v: `${AreaSec.toFixed(2)} cm²`,
                          c: "text-sky-400",
                        },
                        {
                          l: "Volume de Aço",
                          v: `${VolumeMat.toFixed(4)} m³`,
                          c: "text-sky-400",
                        },
                        {
                          l: "Inércia Ix",
                          v: `${Ixx.toFixed(2)} cm⁴`,
                          c: "text-purple-300",
                        },
                        {
                          l: "Inércia Iy",
                          v: `${Iyy.toFixed(2)} cm⁴`,
                          c: "text-purple-300",
                        },
                        {
                          l: "Wxx",
                          v: `${Wxx.toFixed(2)} cm³`,
                          c: "text-orange-300",
                        },
                        {
                          l: "Wyy",
                          v: `${Wyy.toFixed(2)} cm³`,
                          c: "text-orange-300",
                        },
                        {
                          l: "Raio Giro rx",
                          v: `${rxx.toFixed(2)} cm`,
                          c: "text-slate-400",
                        },
                        {
                          l: "Raio Giro ry",
                          v: `${ryy.toFixed(2)} cm`,
                          c: "text-slate-400",
                        },
                      ].map((item, i) => (
                        <MetricCell
                          key={i}
                          darkMode={darkMode}
                          label={item.l}
                          value={item.v}
                          color={item.c}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ABA 2: VIGA (novo solver) */}
              {activeTab === "viga" && (
                <div className="animate-in zoom-in-95 duration-300">
                  <div className={`${darkMode ? "bg-[#0f111a]" : "bg-white"}`}>
                    <BeamSolver darkMode={darkMode} />
                  </div>
                </div>
              )}

              {/* ABA 3: PIG */}
              {activeTab === "pig" && (
                <div className="grid lg:grid-cols-12 h-full animate-in fade-in">
                  {/* Sidebar */}
                  <div
                    className={`lg:col-span-3 p-6 border-r flex flex-col ${
                      darkMode
                        ? "border-slate-900 bg-[#090909]"
                        : "border-slate-200 bg-slate-50"
                    }`}
                  >
                    <h3 className="text-sm font-extrabold uppercase tracking-wider text-blue-400 mb-6">
                      Controle PIG
                    </h3>

                    <div className="mb-6">
                      <div className="text-xs opacity-60 mb-2">
                        Segmento do duto
                      </div>
                      <select
                        className={`w-full rounded-xl p-2.5 text-sm border outline-none ${
                          darkMode
                            ? "bg-[#0f111a] border-slate-800 text-slate-200"
                            : "bg-white border-slate-300 text-slate-900"
                        }`}
                      >
                        <option>Trecho Alpha-01 (km 0–10)</option>
                        <option>Trecho Beta-04 (km 10–25)</option>
                      </select>
                    </div>

                    <button
                      onClick={generatePigData}
                      className="w-full py-3 text-xs font-extrabold border border-blue-500/30 text-blue-400 rounded-xl hover:bg-blue-500/10 transition flex items-center justify-center gap-2 mb-4"
                    >
                      <RefreshCw size={14} /> Simular nova leitura
                    </button>

                    <div className="mt-auto p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                      <div className="flex items-center gap-2 text-red-400 text-xs font-extrabold mb-1">
                        <AlertTriangle size={14} /> ANOMALIA
                      </div>
                      <p className="text-[11px] opacity-70 leading-relaxed">
                        Detectada perda de espessura ~15% no km 4.5.
                        Recomenda-se inspeção visual.
                      </p>
                    </div>
                  </div>

                  {/* Chart */}
                  <div
                    className={`lg:col-span-9 p-6 flex flex-col justify-center ${
                      darkMode ? "bg-[#0f111a]" : "bg-white"
                    }`}
                  >
                    <div className="flex items-end justify-between mb-4">
                      <div>
                        <div className="text-lg font-extrabold text-blue-300">
                          Perfil de corrosão (simulado)
                        </div>
                        <div className="text-xs opacity-60">
                          Linha vermelha: perda • Azul: parede nominal
                        </div>
                      </div>
                      <div className="text-xs font-mono opacity-50">
                        dataset: demo
                      </div>
                    </div>

                    <div className="h-[420px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={pigData}>
                          <defs>
                            <linearGradient
                              id="colorPerda"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#ef4444"
                                stopOpacity={0.85}
                              />
                              <stop
                                offset="95%"
                                stopColor="#ef4444"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>

                          <CartesianGrid
                            strokeDasharray="3 3"
                            opacity={0.1}
                            vertical={false}
                          />
                          <XAxis
                            dataKey="km"
                            stroke="#64748b"
                            tick={{ fontSize: 12 }}
                          />
                          <YAxis
                            stroke="#64748b"
                            tick={{ fontSize: 12 }}
                            unit="mm"
                            domain={[0, 15]}
                          />

                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#000",
                              border: "1px solid #333",
                              fontSize: "12px",
                              borderRadius: "10px",
                            }}
                          />

                          <ReferenceLine
                            y={4}
                            stroke="red"
                            strokeDasharray="3 3"
                            label={{
                              position: "top",
                              value: "Crítico",
                              fill: "red",
                              fontSize: 10,
                            }}
                          />

                          <Area
                            type="monotone"
                            dataKey="espessura"
                            stackId="1"
                            stroke="#3b82f6"
                            fill="#1e3a8a"
                            name="Parede"
                          />
                          <Area
                            type="monotone"
                            dataKey="perda"
                            stackId="2"
                            stroke="#ef4444"
                            fill="url(#colorPerda)"
                            name="Corrosão"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Subtexto de confiança */}
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <TrustPill
              darkMode={darkMode}
              icon={CheckIcon}
              title="Engenharia real"
              desc="Fórmulas e unidades aplicadas como no chão de fábrica."
            />
            <TrustPill
              darkMode={darkMode}
              icon={BoltIcon}
              title="Rápido"
              desc="Simulação instantânea para decisões técnicas."
            />
            <TrustPill
              darkMode={darkMode}
              icon={ShieldIcon}
              title="Confiável"
              desc="Visual técnico, resultados rastreáveis e auditáveis."
            />
          </div>
        </div>
      </section>

      {/* --- COMO FUNCIONA --- */}
      <section className={`px-6 py-16 ${darkMode ? "bg-black" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between gap-8 flex-wrap mb-10">
            <div>
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold border ${
                  darkMode
                    ? "bg-purple-500/10 border-purple-500/20 text-purple-300"
                    : "bg-purple-50 border-purple-200 text-purple-700"
                }`}
              >
                <Cpu size={14} /> Workflow Vestra
              </div>
              <h2 className="text-3xl md:text-4xl font-black mt-4">
                Como funciona na prática
              </h2>
              <p className="opacity-65 mt-2 max-w-2xl">
                Um fluxo simples e direto, igual ao que acontece em engenharia
                industrial: modelar, calcular e documentar.
              </p>
            </div>

            <a
              href="mailto:luiz@vestra.eng.br?subject=Quero%20uma%20demo%20do%20Vestra&body=Ol%C3%A1%20Luiz,%20quero%20uma%20demo%20do%20Vestra.%20Meu%20cen%C3%A1rio%20%C3%A9:%20"
              className={`px-5 py-3 rounded-2xl font-extrabold text-sm border transition flex items-center gap-2 ${
                darkMode
                  ? "border-slate-800 bg-[#0f111a] hover:border-purple-500/50"
                  : "border-slate-300 bg-white hover:bg-slate-50"
              }`}
            >
              Solicitar demo <ChevronRight size={16} className="opacity-70" />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <HowCard
              darkMode={darkMode}
              step="01"
              title="Modele o cenário"
              desc="Defina geometria, cargas e parâmetros. Interface rápida para testar hipóteses."
              icon={Grid}
            />
            <HowCard
              darkMode={darkMode}
              step="02"
              title="Calcule instantâneo"
              desc="Motor matemático confiável com resultados claros (reações, momento, seções)."
              icon={Cpu}
            />
            <HowCard
              darkMode={darkMode}
              step="03"
              title="Documente e aprove"
              desc="Exporte o esquema do cálculo (SVG/PNG) e mantenha rastreabilidade técnica."
              icon={Mail}
            />
          </div>
        </div>
      </section>

      {/* VESTRA AI */}
      <section
        id="ai"
        className={`py-24 border-y ${
          darkMode
            ? "bg-slate-900/30 border-slate-900"
            : "bg-white border-slate-200"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-extrabold mb-6 border border-emerald-500/20">
                <Bot size={14} /> STRUCT-AI V2
              </div>

              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                Seu copiloto de <br /> engenharia.
              </h2>

              <p className="text-lg opacity-75 mb-8 leading-relaxed">
                Pare de procurar normas em PDFs antigos. O Vestra AI conecta-se
                ao banco de dados da sua empresa para responder dúvidas técnicas
                complexas em segundos.
              </p>

              <div className="space-y-4">
                <FeatureRow
                  darkMode={darkMode}
                  icon={<Database className="text-emerald-400 shrink-0" />}
                  title="Busca Semântica"
                  desc="“Qual o rolamento usado no projeto da Nória 03 em 2024?”"
                />
                <FeatureRow
                  darkMode={darkMode}
                  icon={<BookOpen className="text-emerald-400 shrink-0" />}
                  title="Normas Integradas"
                  desc="Consulta automática à ABNT, ASME e CEMA 350."
                />
              </div>
            </div>

            {/* Terminal */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
              <div className="relative rounded-2xl bg-[#0F1115] border border-slate-800 p-1 font-mono text-sm shadow-2xl">
                <div className="bg-[#1A1D24] px-4 py-2 rounded-t-2xl flex items-center gap-2 border-b border-slate-800">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <span className="ml-2 opacity-60 text-xs">
                    vestra_ai_terminal — v2.0.4
                  </span>
                </div>

                <div className="p-6 space-y-6 min-h-[360px]">
                  <div>
                    <span className="text-emerald-400 font-extrabold">
                      eng_luiz@vestra:~$
                    </span>{" "}
                    perguntar --norma CEMA-350
                    <div className="mt-2 text-slate-300">
                      “Qual a recomendação de passo para helicoide 300mm com 15°
                      de inclinação?”
                    </div>
                  </div>

                  <div className="pl-4 border-l-2 border-emerald-500/30">
                    <div className="text-emerald-300 font-extrabold text-xs mb-1 flex items-center gap-2">
                      <Terminal size={14} /> VESTRA AI
                    </div>
                    <p className="opacity-80 leading-relaxed mb-2">
                      Analisando tabelas de fluxo…{" "}
                      <span className="text-green-400">[OK]</span>
                    </p>
                    <p className="opacity-85 leading-relaxed">
                      Para D=300mm e inclinação de 15°, a norma CEMA recomenda o
                      uso de <strong>Passo Curto (Short Pitch)</strong> para
                      evitar retorno de material.
                    </p>
                    <div className="mt-3 bg-slate-800/50 p-3 rounded-xl text-xs text-yellow-200/80 border border-slate-800">
                      Fator de eficiência sugerido: 0.85
                      <br />
                      Rotação máxima segura: 80 RPM
                    </div>
                  </div>

                  <div>
                    <span className="text-emerald-400 font-extrabold">
                      eng_luiz@vestra:~$
                    </span>{" "}
                    <span className="animate-pulse">_</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MÓDULOS */}
      <section
        id="modulos"
        className={`py-24 border-t ${
          darkMode
            ? "bg-[#060606] border-slate-900"
            : "bg-slate-50 border-slate-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14 flex items-end justify-between gap-8 flex-wrap">
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-3 flex items-center gap-3">
                <Grid className="text-purple-500" /> Suite Completa Vestra
              </h2>
              <p className="opacity-65 max-w-2xl">
                Selecione o módulo específico para sua necessidade. Ferramentas
                feitas para engenharia mecânica industrial.
              </p>
            </div>

            <a
              href="mailto:luiz@vestra.eng.br"
              className={`px-5 py-3 rounded-2xl font-extrabold text-sm border transition flex items-center gap-2 ${
                darkMode
                  ? "border-slate-800 bg-[#0f111a] hover:border-purple-500/50"
                  : "border-slate-300 bg-white hover:bg-slate-50"
              }`}
            >
              Solicitar demo <ChevronRight size={16} className="opacity-70" />
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[190px]">
            {/* Estruturas */}
            <ModuleCard
              darkMode={darkMode}
              icon={ArrowUpFromLine}
              title="Viga de Sustentação"
              desc="Cálculo de cabeceiras e vigas principais."
              color="text-purple-300"
              bg="bg-purple-500/10"
              border="hover:border-purple-500/50"
            />
            <ModuleCard
              darkMode={darkMode}
              icon={Grid}
              title="Coluna (Viga I)"
              desc="Dimensionamento de pilares em perfil I."
              color="text-purple-300"
              bg="bg-purple-500/10"
              border="hover:border-purple-500/50"
            />
            <ModuleCard
              darkMode={darkMode}
              icon={Layers}
              title="Coluna (Tubo)"
              desc="Análise crítica de flambagem em perfis tubulares."
              color="text-purple-300"
              bg="bg-purple-500/10"
              border="hover:border-purple-500/50"
            />
            <ModuleCard
              darkMode={darkMode}
              icon={Ruler}
              title="Metalon Builder"
              desc="Propriedades geométricas completas."
              color="text-purple-300"
              bg="bg-purple-500/10"
              border="hover:border-purple-500/50"
            />

            {/* Transporte */}
            <ModuleCard
              darkMode={darkMode}
              icon={Zap}
              title="Nória (Aéreo)"
              desc="Corrente, potência e seleção de motor."
              color="text-yellow-300"
              bg="bg-yellow-500/10"
              border="hover:border-yellow-500/50"
            />
            <ModuleCard
              darkMode={darkMode}
              icon={Settings}
              title="Transp. Helicoidal"
              desc="Conforme CEMA 350: torque e motor."
              color="text-yellow-300"
              bg="bg-yellow-500/10"
              border="hover:border-yellow-500/50"
            />

            {/* Térmica & Gestão */}
            <ModuleCard
              darkMode={darkMode}
              icon={Snowflake}
              title="Câmara Padrão"
              desc="Dimensionamento estrutural de câmara fria."
              color="text-sky-300"
              bg="bg-sky-500/10"
              border="hover:border-sky-500/50"
            />
            <ModuleCard
              darkMode={darkMode}
              icon={Thermometer}
              title="Linhas Frigoríficas"
              desc="Cálculo de linhas que comportam carcaças."
              color="text-sky-300"
              bg="bg-sky-500/10"
              border="hover:border-sky-500/50"
            />
            <ModuleCard
              darkMode={darkMode}
              icon={Clock}
              title="Gestão RH (Ponto)"
              desc="Registro simplificado de ponto no chão de fábrica."
              color="text-pink-300"
              bg="bg-pink-500/10"
              border="hover:border-pink-500/50"
              span="md:col-span-2"
            />
            <ModuleCard
              darkMode={darkMode}
              icon={Database}
              title="Integração IA"
              desc="Banco de dados técnico inteligente."
              color="text-emerald-300"
              bg="bg-emerald-500/10"
              border="hover:border-emerald-500/50"
              span="md:col-span-2"
            />
          </div>
        </div>
      </section>

      {/* --- CTA FINAL --- */}
      <section
        className={`px-6 py-16 ${darkMode ? "bg-[#050505]" : "bg-slate-50"}`}
      >
        <div className="max-w-7xl mx-auto">
          <div
            className={`rounded-3xl border p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 ${
              darkMode
                ? "border-slate-900 bg-[#0f111a]"
                : "border-slate-200 bg-white"
            }`}
          >
            <div>
              <div className="text-sm font-extrabold opacity-70">
                VESTRA.ENG
              </div>
              <h3 className="text-2xl md:text-3xl font-black mt-2">
                Quer levar isso para a sua empresa?
              </h3>
              <p className="opacity-65 mt-3 max-w-2xl">
                Me diga seu cenário (transportadores, estruturas, câmara fria,
                inspeção PIG) e eu adapto o módulo para o seu padrão.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:luiz@vestra.eng.br?subject=Solicitar%20demo%20Vestra&body=Ol%C3%A1%20Luiz,%20quero%20uma%20demo.%20Meu%20cen%C3%A1rio%20%C3%A9:%20"
                className={`px-6 py-3 rounded-2xl font-extrabold text-sm transition flex items-center gap-2 ${
                  darkMode
                    ? "bg-purple-600 hover:bg-purple-500 text-white"
                    : "bg-slate-900 hover:bg-slate-800 text-white"
                }`}
              >
                Solicitar demo <ChevronRight size={16} className="opacity-80" />
              </a>

              <a
                href="#simulador"
                className={`px-6 py-3 rounded-2xl font-extrabold text-sm border transition ${
                  darkMode
                    ? "border-slate-800 bg-black/20 hover:border-purple-500/50"
                    : "border-slate-300 bg-white hover:bg-slate-50"
                }`}
              >
                Voltar ao simulador
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className={`py-14 text-center border-t ${
          darkMode ? "bg-black border-slate-900" : "bg-white border-slate-200"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col items-center gap-3">
            <div className="font-black tracking-tight text-lg">
              VESTRA
              <span
                className={darkMode ? "text-purple-400" : "text-purple-600"}
              >
                .ENG
              </span>
            </div>
            <p className="text-sm opacity-60 max-w-xl">
              Ambiente de engenharia para cálculos industriais, automação e
              inteligência técnica.
            </p>
            <div className="text-xs opacity-45 font-mono">
              VESTRA ENGINEERING ENVIRONMENT © 2025 • Desenvolvido por Luiz
              Medeiros
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ------------------------- COMPONENTES AUXILIARES ------------------------- */

function TabButton({ darkMode, active, onClick, icon, label, accent }) {
  const accentMap = {
    purple: "text-purple-300 border-t-purple-500",
    cyan: "text-cyan-300 border-t-cyan-500",
    blue: "text-blue-300 border-t-blue-500",
  };

  return (
    <button
      onClick={onClick}
      className={`flex-1 px-6 py-5 text-sm font-extrabold transition-all border-r ${
        darkMode ? "border-slate-900" : "border-slate-200"
      } ${
        active
          ? `bg-[#0f111a] border-t-2 ${accentMap[accent]}`
          : darkMode
            ? "opacity-60 hover:opacity-100 hover:bg-slate-900/40"
            : "opacity-70 hover:opacity-100 hover:bg-white"
      }`}
    >
      <div className="flex items-center justify-center gap-2">
        {icon} {label}
      </div>
    </button>
  );
}

function RangeControl({
  darkMode,
  label,
  value,
  unit,
  min,
  max,
  step,
  onChange,
}) {
  return (
    <div>
      <div className="flex justify-between text-xs font-extrabold mb-2 opacity-70">
        <span>{label}</span>
        <span className={darkMode ? "text-slate-100" : "text-slate-900"}>
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-purple-600 ${
          darkMode ? "bg-slate-800" : "bg-slate-200"
        }`}
      />
    </div>
  );
}

function MetricCell({ darkMode, label, value, color }) {
  return (
    <div
      className={`p-4 border-b border-r flex flex-col justify-center ${
        darkMode ? "border-slate-900" : "border-slate-200"
      }`}
    >
      <div className="text-[10px] uppercase font-extrabold opacity-50 mb-1">
        {label}
      </div>
      <div className={`text-xl font-mono font-black ${color}`}>{value}</div>
    </div>
  );
}

function ModuleCard({
  darkMode,
  icon: Icon,
  title,
  desc,
  color,
  bg,
  border,
  span = "",
}) {
  return (
    <div
      className={`p-6 rounded-3xl border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${border} ${span} ${
        darkMode ? "border-slate-900 bg-[#0f111a]" : "border-slate-200 bg-white"
      }`}
    >
      <div
        className={`w-11 h-11 rounded-2xl ${bg} flex items-center justify-center ${color}`}
      >
        <Icon size={22} />
      </div>
      <div>
        <h3
          className={`font-extrabold mb-1 ${darkMode ? "text-slate-100" : "text-slate-900"}`}
        >
          {title}
        </h3>
        <p
          className={`text-xs leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}
        >
          {desc}
        </p>
      </div>
    </div>
  );
}

function HowCard({ darkMode, step, title, desc, icon: Icon }) {
  return (
    <div
      className={`p-6 rounded-3xl border transition ${
        darkMode ? "border-slate-900 bg-[#0f111a]" : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs font-mono opacity-60">STEP {step}</div>
        <div
          className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
            darkMode
              ? "bg-purple-500/10 text-purple-300"
              : "bg-purple-50 text-purple-700"
          }`}
        >
          <Icon size={20} />
        </div>
      </div>
      <div className="font-extrabold text-lg">{title}</div>
      <div
        className={`text-sm mt-2 leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}
      >
        {desc}
      </div>
    </div>
  );
}

function FeatureRow({ darkMode, icon, title, desc }) {
  return (
    <div
      className={`flex gap-4 p-4 rounded-2xl border ${
        darkMode
          ? "bg-slate-800/40 border-slate-800"
          : "bg-slate-50 border-slate-200"
      }`}
    >
      {icon}
      <div>
        <div
          className={`font-extrabold text-sm ${darkMode ? "text-slate-100" : "text-slate-900"}`}
        >
          {title}
        </div>
        <div
          className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-600"}`}
        >
          {desc}
        </div>
      </div>
    </div>
  );
}

function HeroStat({ darkMode, title, value }) {
  return (
    <div
      className={`p-4 rounded-2xl border text-left ${
        darkMode ? "border-slate-900 bg-[#0f111a]" : "border-slate-200 bg-white"
      }`}
    >
      <div className="text-[11px] uppercase font-extrabold opacity-60">
        {title}
      </div>
      <div
        className={`mt-1 font-black text-lg ${darkMode ? "text-slate-100" : "text-slate-900"}`}
      >
        {value}
      </div>
    </div>
  );
}

function TrustPill({ darkMode, icon: Icon, title, desc }) {
  return (
    <div
      className={`p-5 rounded-2xl border flex items-start gap-3 ${
        darkMode ? "border-slate-900 bg-[#0f111a]" : "border-slate-200 bg-white"
      }`}
    >
      <Icon className="mt-0.5" />
      <div>
        <div
          className={`font-extrabold ${darkMode ? "text-slate-100" : "text-slate-900"}`}
        >
          {title}
        </div>
        <div
          className={`text-xs mt-1 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
        >
          {desc}
        </div>
      </div>
    </div>
  );
}

/* Ícones pequenos (evita reimport do lucide todo aqui) */
function CheckIcon(props) {
  return <Shield {...props} size={18} className="text-emerald-400" />;
}
function BoltIcon(props) {
  return <Zap {...props} size={18} className="text-yellow-400" />;
}
function ShieldIcon(props) {
  return <Shield {...props} size={18} className="text-cyan-400" />;
}
