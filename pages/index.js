"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Moon,
  Sun,
  CheckCircle,
  Shield,
  Zap,
  Layers,
  Activity,
  Mail,
  User,
  BookOpen,
  Settings,
  Hammer,
  Database,
  Ruler,
  Fan,
  HardHat,
  Clock,
  ChevronRight,
  Thermometer,
  ArrowUpFromLine,
  Snowflake,
  Bot,
  Terminal,
  Grid,
  Cpu,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";

// Importação dinâmica do Recharts para evitar erro de hidratação (SSR)
const AreaChart = dynamic(
  () => import("recharts").then((mod) => mod.AreaChart),
  { ssr: false },
);
const Area = dynamic(() => import("recharts").then((mod) => mod.Area), {
  ssr: false,
});
const XAxis = dynamic(() => import("recharts").then((mod) => mod.XAxis), {
  ssr: false,
});
const YAxis = dynamic(() => import("recharts").then((mod) => mod.YAxis), {
  ssr: false,
});
const CartesianGrid = dynamic(
  () => import("recharts").then((mod) => mod.CartesianGrid),
  { ssr: false },
);
const Tooltip = dynamic(() => import("recharts").then((mod) => mod.Tooltip), {
  ssr: false,
});
const ResponsiveContainer = dynamic(
  () => import("recharts").then((mod) => mod.ResponsiveContainer),
  { ssr: false },
);
const ReferenceLine = dynamic(
  () => import("recharts").then((mod) => mod.ReferenceLine),
  { ssr: false },
);

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState("metalon");

  // --- DADOS PIG ---
  const [pigData, setPigData] = useState([]);

  // --- ESTADOS METALON ---
  const [width, setWidth] = useState(50); // mm
  const [height, setHeight] = useState(100); // mm
  const [thickness, setThickness] = useState(3.0); // mm
  const [length, setLength] = useState(6.0); // m

  // --- CÁLCULOS FÍSICOS REAIS (Engine Vestra) ---
  // Densidade solicitada: 8000 kg/m³
  const DENSITY = 8000;

  // Conversões para CM (unidade padrão de tabelas de engenharia)
  const H_cm = height / 10;
  const B_cm = width / 10;
  const t_cm = thickness / 10;

  // 1. Área da Seção (A) - cm²
  // Fórmula Tubo Retangular: A = B*H - (B-2t)*(H-2t)
  const AreaSec = B_cm * H_cm - (B_cm - 2 * t_cm) * (H_cm - 2 * t_cm);

  // 2. Inércias (Ixx e Iyy) - cm⁴
  const Ixx =
    (B_cm * Math.pow(H_cm, 3) -
      (B_cm - 2 * t_cm) * Math.pow(H_cm - 2 * t_cm, 3)) /
    12;
  const Iyy =
    (H_cm * Math.pow(B_cm, 3) -
      (H_cm - 2 * t_cm) * Math.pow(B_cm - 2 * t_cm, 3)) /
    12;

  // 3. Módulos Resistentes (Wxx e Wyy) - cm³
  const Wxx = Ixx / (H_cm / 2);
  const Wyy = Iyy / (B_cm / 2);

  // 4. Raios de Giro (rxx e ryy) - cm
  const rxx = Math.sqrt(Ixx / AreaSec);
  const ryy = Math.sqrt(Iyy / AreaSec);

  // 5. Peso Total (kg)
  // Area (cm²) / 10000 = Area (m²) * Length (m) * Density (kg/m³)
  const WeightTotal = (AreaSec / 10000) * length * DENSITY;

  // 6. Peso Linear (kg/m)
  const WeightLinear = WeightTotal / length;

  // 7. Volume de Aço (m³)
  const VolumeMat = (AreaSec / 10000) * length;

  useEffect(() => {
    generatePigData();
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  // Função para gerar dados aleatórios PIG (Simulação)
  const generatePigData = () => {
    const data = [];
    const nominalThickness = 12.0;
    for (let i = 0; i <= 20; i++) {
      // Cria picos de corrosão aleatórios
      const corrosion =
        Math.random() > 0.8 ? Math.random() * 4 : Math.random() * 0.5;
      data.push({
        km: (i * 0.5).toFixed(1),
        espessura: nominalThickness,
        perda: corrosion.toFixed(2),
        restante: (nominalThickness - corrosion).toFixed(2),
      });
    }
    setPigData(data);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 font-sans selection:bg-purple-500 selection:text-white ${darkMode ? "bg-[#0a0a0a] text-slate-200" : "bg-slate-50 text-slate-800"}`}
    >
      {/* NAVBAR */}
      <nav
        className={`fixed w-full z-50 border-b backdrop-blur-md transition-colors duration-500 ${darkMode ? "bg-[#0a0a0a]/90 border-slate-900" : "bg-white/90 border-slate-200"}`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-lg shadow-lg ${darkMode ? "bg-gradient-to-br from-purple-700 to-indigo-700 text-white" : "bg-gradient-to-br from-purple-600 to-pink-600 text-white"}`}
            >
              V
            </div>
            <span className="font-bold text-xl tracking-tight">
              VESTRA
              <span
                className={darkMode ? "text-purple-500" : "text-purple-600"}
              >
                .ENG
              </span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#simulador" className="hover:text-purple-500 transition">
              Simulador
            </a>
            <a
              href="#ai"
              className="hover:text-purple-500 transition flex items-center gap-1"
            >
              <Bot size={14} /> Vestra AI
            </a>
            <a href="#modulos" className="hover:text-purple-500 transition">
              Módulos
            </a>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-colors ${darkMode ? "hover:bg-purple-900/20 text-purple-400" : "hover:bg-slate-100 text-slate-600"}`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <a
              href="mailto:luiz@vestra.eng.br"
              className={`hidden sm:flex px-6 py-2.5 rounded-lg font-bold text-sm shadow-lg hover:scale-105 transition items-center gap-2 ${darkMode ? "bg-slate-100 text-black hover:bg-white" : "bg-slate-900 text-white hover:bg-slate-800"}`}
            >
              <Mail size={16} /> Contato
            </a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="pt-40 pb-24 px-6 relative overflow-hidden text-center">
        {/* Efeito de fundo Cyberpunk */}
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] rounded-full blur-[150px] opacity-15 pointer-events-none ${darkMode ? "bg-purple-600" : "bg-blue-400"}`}
        ></div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-8 border ${darkMode ? "bg-purple-900/20 border-purple-500/30 text-purple-300" : "bg-slate-100 border-slate-200 text-slate-600"}`}
          >
            <Activity size={14} className="animate-pulse text-green-400" /> V2.0
            Live • Densidade Ajustada
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            Da Prática Industrial <br />
            para o{" "}
            <span
              className={`text-transparent bg-clip-text bg-gradient-to-r ${darkMode ? "from-purple-400 to-indigo-400" : "from-purple-600 to-pink-600"}`}
            >
              Digital.
            </span>
          </h1>

          <p className="text-xl opacity-70 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Software nascido no chão de fábrica da{" "}
            <strong>Inova Industrial</strong>. Automatize cálculos de
            transportadores, dimensionamento de câmaras frias e estruturas com a
            precisão de quem projeta máquinas reais.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/sobre"
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all hover:-translate-y-1 flex items-center justify-center gap-2 ${darkMode ? "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/20" : "bg-slate-900 text-white hover:bg-slate-800"}`}
            >
              <User size={18} /> Conheça o Engenheiro
            </Link>
            <a
              href="#modulos"
              className={`px-8 py-4 rounded-xl font-bold text-lg border transition-all hover:-translate-y-1 flex items-center justify-center gap-2 ${darkMode ? "border-slate-800 bg-[#0f111a] hover:border-purple-500/50" : "border-slate-300 hover:bg-slate-50"}`}
            >
              <Grid size={18} /> Ver Todos os Módulos
            </a>
          </div>
        </div>
      </header>

      {/* --- SIMULADOR DE ALTA PERFORMANCE --- */}
      <section id="simulador" className="px-4 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
              <Cpu className="text-purple-500" /> Kernel de Cálculo Vestra
            </h2>
            <p className="opacity-60">
              Teste a potência dos nossos algoritmos em tempo real.
            </p>
          </div>

          <div
            className={`rounded-2xl border shadow-2xl overflow-hidden transition-all duration-500 ${darkMode ? "bg-[#0f111a] border-slate-900 shadow-purple-900/10" : "bg-white border-slate-200 shadow-xl"}`}
          >
            {/* Header das Abas */}
            <div
              className={`flex flex-wrap border-b ${darkMode ? "border-slate-900 bg-[#050505]" : "border-slate-100 bg-slate-50"}`}
            >
              <button
                onClick={() => setActiveTab("metalon")}
                className={`flex-1 px-6 py-5 text-sm font-bold border-r transition-all ${activeTab === "metalon" ? "text-purple-400 bg-[#0f111a] border-t-2 border-t-purple-500" : "opacity-50 hover:opacity-100 hover:bg-slate-900"}`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Layers size={18} /> Metalon Builder
                </div>
              </button>
              <button
                onClick={() => setActiveTab("viga")}
                className={`flex-1 px-6 py-5 text-sm font-bold border-r transition-all ${activeTab === "viga" ? "text-cyan-400 bg-[#0f111a] border-t-2 border-t-cyan-500" : "opacity-50 hover:opacity-100 hover:bg-slate-900"}`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Ruler size={18} /> Viga Expert (Showcase)
                </div>
              </button>
              <button
                onClick={() => setActiveTab("pig")}
                className={`flex-1 px-6 py-5 text-sm font-bold transition-all ${activeTab === "pig" ? "text-blue-400 bg-[#0f111a] border-t-2 border-t-blue-500" : "opacity-50 hover:opacity-100 hover:bg-slate-900"}`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Shield size={18} /> PIG Analytics
                </div>
              </button>
            </div>

            <div className="p-0 min-h-[600px]">
              {/* === ABA 1: METALON BUILDER (Full Math & Drawing) === */}
              {activeTab === "metalon" && (
                <div className="grid lg:grid-cols-12 h-full animate-in fade-in duration-500">
                  {/* Coluna 1: Inputs */}
                  <div
                    className={`lg:col-span-3 p-6 border-r flex flex-col gap-8 ${darkMode ? "border-slate-900 bg-[#0a0a0a]" : "border-slate-100 bg-slate-50"}`}
                  >
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-purple-500 mb-6">
                        Geometria
                      </h3>
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
                          <div key={idx}>
                            <div className="flex justify-between text-xs font-bold mb-2 opacity-70">
                              {control.l}{" "}
                              <span className="text-white">
                                {control.v}
                                {control.unit || "mm"}
                              </span>
                            </div>
                            <input
                              type="range"
                              min={control.min}
                              max={control.max}
                              step={control.step || 10}
                              value={control.v}
                              onChange={(e) =>
                                control.s(Number(e.target.value))
                              }
                              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-600"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-auto p-4 rounded border border-purple-500/20 bg-purple-500/5">
                      <div className="flex justify-between text-xs mb-1 opacity-60">
                        Densidade Aço
                      </div>
                      <div className="font-mono text-purple-400 font-bold">
                        8000 kg/m³
                      </div>
                    </div>
                  </div>

                  {/* Coluna 2: Visualização (Desenho CSS) */}
                  <div
                    className={`lg:col-span-5 p-8 flex flex-col items-center justify-center relative overflow-hidden ${darkMode ? "bg-[#111]" : "bg-white"}`}
                  >
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: `radial-gradient(${darkMode ? "#333" : "#ccc"} 1px, transparent 1px)`,
                        backgroundSize: "20px 20px",
                      }}
                    ></div>

                    <div className="relative z-10">
                      {/* O Desenho do Perfil */}
                      <div
                        className="border-4 border-slate-400 transition-all duration-300 shadow-[0_0_50px_rgba(168,85,247,0.15)]"
                        style={{
                          width: `${width * 1.5}px`,
                          height: `${height * 1.5}px`,
                          borderWidth: `${thickness}px`,
                          borderColor: darkMode ? "#a855f7" : "#2563eb",
                          borderRadius: "4px",
                        }}
                      ></div>

                      {/* Cotas */}
                      <div className="absolute -left-8 top-1/2 -translate-y-1/2 text-xs font-mono opacity-50 border-r border-slate-600 pr-2 h-full flex items-center">
                        {height}
                      </div>
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-mono opacity-50 border-t border-slate-600 pt-1 w-full text-center">
                        {width}
                      </div>
                    </div>

                    <div className="absolute bottom-4 text-xs font-mono opacity-30">
                      ESCALA 1.5:1
                    </div>
                  </div>

                  {/* Coluna 3: Resultados (Data Grid) */}
                  <div
                    className={`lg:col-span-4 p-0 ${darkMode ? "bg-[#0f111a]" : "bg-slate-50"}`}
                  >
                    <div className="grid grid-cols-2 h-full">
                      {[
                        {
                          l: "Peso Total",
                          v: `${WeightTotal.toFixed(2)} kg`,
                          c: "text-green-500",
                        },
                        {
                          l: "Peso Linear",
                          v: `${WeightLinear.toFixed(2)} kg/m`,
                          c: "text-green-500",
                        },
                        {
                          l: "Área Seção",
                          v: `${AreaSec.toFixed(2)} cm²`,
                          c: "text-blue-400",
                        },
                        {
                          l: "Volume Aço",
                          v: `${VolumeMat.toFixed(4)} m³`,
                          c: "text-blue-400",
                        },
                        {
                          l: "Inércia X",
                          v: `${Ixx.toFixed(2)} cm⁴`,
                          c: "text-purple-400",
                        },
                        {
                          l: "Inércia Y",
                          v: `${Iyy.toFixed(2)} cm⁴`,
                          c: "text-purple-400",
                        },
                        {
                          l: "Wxx",
                          v: `${Wxx.toFixed(2)} cm³`,
                          c: "text-orange-400",
                        },
                        {
                          l: "Wyy",
                          v: `${Wyy.toFixed(2)} cm³`,
                          c: "text-orange-400",
                        },
                        {
                          l: "Raio Giro x",
                          v: `${rxx.toFixed(2)} cm`,
                          c: "text-slate-400",
                        },
                        {
                          l: "Raio Giro y",
                          v: `${ryy.toFixed(2)} cm`,
                          c: "text-slate-400",
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className={`p-4 border-b border-r flex flex-col justify-center ${darkMode ? "border-slate-900" : "border-slate-200"}`}
                        >
                          <div className="text-[10px] uppercase font-bold opacity-50 mb-1">
                            {item.l}
                          </div>
                          <div
                            className={`text-xl font-mono font-bold ${item.c}`}
                          >
                            {item.v}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* === ABA 2: VIGA I (Imagem Real) === */}
              {activeTab === "viga" && (
                <div className="grid lg:grid-cols-12 h-full animate-in zoom-in-95 duration-300">
                  <div className="lg:col-span-9 bg-black flex items-center justify-center p-4 relative">
                    {/* Imagem do diagrama de cargas */}
                    <img
                      src="/images/viga-simulacao.png"
                      alt="Diagrama Vestra Desktop"
                      className="object-contain max-h-[500px] w-auto border border-slate-800 rounded shadow-2xl"
                    />
                    <div className="absolute bottom-4 right-4 bg-black/80 px-3 py-1 rounded text-xs text-green-400 border border-green-900 flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>{" "}
                      Live Solver
                    </div>
                  </div>
                  <div
                    className={`lg:col-span-3 p-6 border-l flex flex-col ${darkMode ? "border-slate-900 bg-[#0f111a]" : "border-slate-200 bg-white"}`}
                  >
                    <h3 className="font-bold text-lg mb-4 text-cyan-400">
                      Viga Hiperestática
                    </h3>
                    <div className="space-y-4 text-sm opacity-70 mb-8">
                      <p>Visualização exata do módulo desktop. Suporta:</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Múltiplas cargas pontuais</li>
                        <li>Cargas distribuídas parciais</li>
                        <li>Apoios fixos e móveis</li>
                        <li>Diagramas V e M automáticos</li>
                      </ul>
                    </div>
                    <div className="mt-auto p-4 rounded border border-cyan-500/20 bg-cyan-500/5">
                      <div className="text-xs font-bold text-cyan-500 mb-1">
                        ROADMAP 2026
                      </div>
                      <p className="text-xs opacity-60">
                        Implementação de MEF (Elementos Finitos) para análise de
                        tensões locais.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* === ABA 3: PIG ANALYTICS (Chart) === */}
              {activeTab === "pig" && (
                <div className="grid lg:grid-cols-12 h-full animate-in fade-in">
                  <div
                    className={`lg:col-span-3 p-6 border-r flex flex-col ${darkMode ? "border-slate-900 bg-[#0a0a0a]" : "border-slate-100 bg-slate-50"}`}
                  >
                    <h3 className="text-sm font-bold uppercase tracking-wider text-blue-500 mb-6">
                      Controle PIG
                    </h3>
                    <div className="mb-6">
                      <div className="text-xs opacity-50 mb-2">
                        Segmento do Duto
                      </div>
                      <select className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-slate-300">
                        <option>Trecho Alpha-01 (km 0-10)</option>
                        <option>Trecho Beta-04 (km 10-25)</option>
                      </select>
                    </div>

                    {/* Botão de Gerar Novos Dados - FUNCIONAL */}
                    <button
                      onClick={generatePigData}
                      className="w-full py-3 text-xs font-bold border border-blue-500/30 text-blue-400 rounded hover:bg-blue-500/10 transition flex items-center justify-center gap-2 mb-4"
                    >
                      <RefreshCw size={14} /> Simular Nova Leitura
                    </button>

                    <div className="mt-auto p-4 bg-red-500/10 border border-red-500/20 rounded">
                      <div className="flex items-center gap-2 text-red-500 text-xs font-bold mb-1">
                        <AlertTriangle size={14} /> ANOMALIA
                      </div>
                      <p className="text-[10px] opacity-70">
                        Detectada perda de espessura 15% no km 4.5. Requer
                        inspeção visual.
                      </p>
                    </div>
                  </div>

                  <div
                    className={`lg:col-span-9 p-6 flex flex-col justify-center ${darkMode ? "bg-[#0f111a]" : "bg-white"}`}
                  >
                    <div className="h-[400px] w-full">
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
                                stopOpacity={0.8}
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
        </div>
      </section>

      {/* --- SEÇÃO VESTRA AI (MARKETING PODEROSO) --- */}
      <section
        id="ai"
        className={`py-24 border-y ${darkMode ? "bg-slate-900/30 border-slate-900" : "bg-slate-50 border-slate-200"}`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-500/10 text-emerald-500 text-xs font-bold mb-6 border border-emerald-500/20">
                <Bot size={14} /> STRUCT-AI V2
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Seu copiloto de <br />
                engenharia.
              </h2>
              <p className="text-lg opacity-70 mb-8 leading-relaxed">
                Pare de procurar normas em PDFs antigos. O Vestra AI conecta-se
                ao banco de dados da sua empresa para responder dúvidas técnicas
                complexas instantaneamente.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4 p-4 rounded bg-slate-800/50 border border-slate-800">
                  <Database className="text-emerald-500 shrink-0" />
                  <div>
                    <div className="font-bold text-sm text-slate-200">
                      Busca Semântica
                    </div>
                    <div className="text-xs opacity-60">
                      "Qual o rolamento usado no projeto da Nória 03 em 2024?"
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded bg-slate-800/50 border border-slate-800">
                  <BookOpen className="text-emerald-500 shrink-0" />
                  <div>
                    <div className="font-bold text-sm text-slate-200">
                      Normas Integradas
                    </div>
                    <div className="text-xs opacity-60">
                      Consulta automática à ABNT, ASME e CEMA 350.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Terminal AI Simulation */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative rounded-lg bg-[#0F1115] border border-slate-800 p-1 font-mono text-sm shadow-2xl">
                <div className="bg-[#1A1D24] px-4 py-2 rounded-t flex items-center gap-2 border-b border-slate-800">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  <span className="ml-2 opacity-50 text-xs">
                    vestra_ai_terminal — v2.0.4
                  </span>
                </div>
                <div className="p-6 space-y-6 min-h-[350px]">
                  <div>
                    <span className="text-emerald-500 font-bold">
                      eng_luiz@vestra:~$
                    </span>{" "}
                    perguntar --norma CEMA-350
                    <div className="mt-2 text-slate-300">
                      "Qual a recomendação de passo para helicoide 300mm com 15°
                      de inclinação?"
                    </div>
                  </div>

                  <div className="pl-4 border-l-2 border-emerald-500/30">
                    <div className="text-emerald-400 font-bold text-xs mb-1">
                      VESTRA AI ASSISTANT
                    </div>
                    <p className="opacity-80 leading-relaxed mb-2">
                      Analisando tabelas de fluxo...{" "}
                      <span className="text-green-500">[OK]</span>
                    </p>
                    <p className="opacity-80 leading-relaxed">
                      Para D=300mm e inclinação de 15°, a norma CEMA recomenda o
                      uso de <strong>Passo Curto (Short Pitch)</strong> para
                      evitar retorno de material.
                    </p>
                    <div className="mt-2 bg-slate-800/50 p-2 rounded text-xs text-yellow-200/80">
                      Fator Eficiência sugerido: 0.85
                      <br />
                      Rotação máxima segura: 80 RPM
                    </div>
                  </div>

                  <div>
                    <span className="text-emerald-500 font-bold">
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

      {/* --- MÓDULOS DETALHADOS (Grid Bento Box) --- */}
      <section
        id="modulos"
        className={`py-24 border-t ${darkMode ? "bg-[#050505] border-slate-900" : "bg-slate-50 border-slate-200"}`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
              <Grid className="text-purple-500" /> Suite Completa Vestra
            </h2>
            <p className="opacity-60 max-w-2xl">
              Selecione o módulo específico para sua necessidade. Ferramentas
              desenvolvidas para cobrir todas as áreas da engenharia mecânica
              industrial.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[180px]">
            {/* ESTRUTURAS */}
            <ModuleCard
              icon={ArrowUpFromLine}
              title="Viga de Sustentação"
              desc="Cálculo de cabeceiras e vigas principais para pontes rolantes."
              color="text-purple-400"
              bg="bg-purple-500/10"
              border="hover:border-purple-500/50"
            />
            <ModuleCard
              icon={Grid}
              title="Coluna (Viga I)"
              desc="Dimensionamento de pilares e estruturas verticais em perfil I."
              color="text-purple-400"
              bg="bg-purple-500/10"
              border="hover:border-purple-500/50"
            />
            <ModuleCard
              icon={Layers}
              title="Coluna (Tubo)"
              desc="Análise crítica de flambagem em perfis tubulares quadrados."
              color="text-purple-400"
              bg="bg-purple-500/10"
              border="hover:border-purple-500/50"
            />
            <ModuleCard
              icon={Ruler}
              title="Metalon Builder"
              desc="Propriedades geométricas completas de seções tubulares."
              color="text-purple-400"
              bg="bg-purple-500/10"
              border="hover:border-purple-500/50"
            />

            {/* TRANSPORTE */}
            <ModuleCard
              icon={Zap}
              title="Nória (Aéreo)"
              desc="Transportador aéreo de canecas. Cálculo de corrente e potência."
              color="text-yellow-400"
              bg="bg-yellow-500/10"
              border="hover:border-yellow-500/50"
            />
            <ModuleCard
              icon={Settings}
              title="Transp. Helicoidal"
              desc="Rosca sem fim conforme CEMA 350. Torque e seleção de motor."
              color="text-yellow-400"
              bg="bg-yellow-500/10"
              border="hover:border-yellow-500/50"
            />

            {/* TÉRMICA & GESTÃO */}
            <ModuleCard
              icon={Snowflake}
              title="Câmara Padrão"
              desc="Balanço térmico completo para dimensionamento de frio."
              color="text-blue-400"
              bg="bg-blue-500/10"
              border="hover:border-blue-500/50"
            />
            <ModuleCard
              icon={Thermometer}
              title="Linhas Frigoríficas"
              desc="Cálculo de diâmetro e perda de carga em tubulações."
              color="text-blue-400"
              bg="bg-blue-500/10"
              border="hover:border-blue-500/50"
            />
            <ModuleCard
              icon={Clock}
              title="Gestão RH (Ponto)"
              desc="Registro simplificado de ponto para chão de fábrica."
              color="text-pink-400"
              bg="bg-pink-500/10"
              border="hover:border-pink-500/50"
              span="md:col-span-2"
            />
            <ModuleCard
              icon={Database}
              title="Integração IA"
              desc="Banco de dados técnico inteligente."
              color="text-emerald-400"
              bg="bg-emerald-500/10"
              border="hover:border-emerald-500/50"
              span="md:col-span-2"
            />
          </div>
        </div>
      </section>

      <footer
        className={`py-12 text-center text-sm border-t ${darkMode ? "bg-black border-slate-900 text-slate-500" : "bg-slate-50 border-slate-200 text-slate-400"}`}
      >
        <p className="font-mono mb-2">VESTRA ENGINEERING ENVIRONMENT © 2025</p>
        <p className="text-xs opacity-50">
          Desenvolvido com ❤️ por Luiz Medeiros.
        </p>
      </footer>
    </div>
  );
}

// Componente auxiliar para os Cards
function ModuleCard({ icon: Icon, title, desc, color, bg, border, span = "" }) {
  return (
    <div
      className={`p-6 rounded-2xl border border-slate-800 bg-[#0f111a] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${border} ${span}`}
    >
      <div
        className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center ${color}`}
      >
        <Icon size={20} />
      </div>
      <div>
        <h3 className="font-bold text-slate-200 mb-1">{title}</h3>
        <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
