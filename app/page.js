"use client";

import React, { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  CheckCircle,
  Cpu,
  Shield,
  Zap,
  Download,
  ArrowRight,
  Layers,
  Activity,
  MousePointer2,
  Terminal,
  GraduationCap,
  Briefcase,
  Github,
  Linkedin,
  Mail,
  Code2,
  AlertTriangle,
} from "lucide-react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);

  // --- ESTADOS DO SIMULADOR ---
  const [activeTab, setActiveTab] = useState("metalon"); // metalon | pig

  // Metalon States
  const [width, setWidth] = useState(50);
  const [height, setHeight] = useState(100);
  const [thickness, setThickness] = useState(3.0);

  // PIG States (Simulação de Duto)
  const [pipeSegments, setPipeSegments] = useState([]);

  // Gera dados aleatórios para o gráfico PIG ao carregar
  useEffect(() => {
    const segments = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      thickness: 8 + Math.random() * 2, // Espessura base entre 8 e 10mm
      corrosion: Math.random() > 0.7 ? Math.random() * 4 : 0, // 30% de chance de corrosão
    }));
    setPipeSegments(segments);
  }, []);

  // Cálculos Metalon
  const area = (
    2 * (width * thickness) +
    2 * ((height - 2 * thickness) * thickness)
  ).toFixed(1);
  const weight = ((area * 7.85) / 1000).toFixed(2);
  const inertiaX =
    ((width * Math.pow(height, 3)) / 12 -
      ((width - 2 * thickness) * Math.pow(height - 2 * thickness, 3)) / 12) /
    10000;

  // Efeito Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen transition-colors duration-500 font-sans ${darkMode ? "bg-vestra-dark text-slate-200" : "bg-vestra-light text-slate-800"}`}
    >
      {/* NAVBAR */}
      <nav
        className={`fixed w-full z-50 border-b backdrop-blur-md transition-colors duration-500 ${darkMode ? "bg-vestra-dark/80 border-purple-900/30" : "bg-white/90 border-pink-100"}`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-lg shadow-lg ${darkMode ? "bg-gradient-to-br from-purple-600 to-indigo-600 text-white" : "bg-gradient-to-br from-pink-500 to-rose-600 text-white"}`}
            >
              V
            </div>
            <span className="font-bold text-xl tracking-tight">
              VESTRA
              <span className={darkMode ? "text-purple-400" : "text-pink-600"}>
                .PRO
              </span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#simulador" className="hover:text-pink-500 transition">
              Simulador
            </a>
            <a href="#sobre" className="hover:text-pink-500 transition">
              Engenheiro
            </a>
            <a href="#precos" className="hover:text-pink-500 transition">
              Planos
            </a>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-colors ${darkMode ? "hover:bg-purple-900/30 text-purple-400" : "hover:bg-pink-50 text-pink-600"}`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <a
              href="mailto:luiz@vestra.eng.br?subject=Interesse%20na%20Licença%20Vestra%20Pro"
              className={`px-5 py-2.5 rounded-full font-bold text-sm shadow-lg hover:scale-105 transition flex items-center gap-2 ${darkMode ? "bg-white text-black" : "bg-slate-900 text-white"}`}
            >
              <Mail size={16} /> Contato Comercial
            </a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="pt-40 pb-12 px-6 relative overflow-hidden text-center">
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[120px] opacity-30 pointer-events-none ${darkMode ? "bg-purple-600" : "bg-pink-400"}`}
        ></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border ${darkMode ? "bg-purple-950/40 border-purple-500/30 text-purple-300" : "bg-pink-50 border-pink-200 text-pink-600"}`}
          >
            <Activity size={14} className="animate-pulse" /> Vestra Interactive
            Engine v2.0
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Engenharia Interativa <br />
            <span
              className={`text-transparent bg-clip-text bg-gradient-to-r ${darkMode ? "from-purple-400 to-indigo-400" : "from-pink-600 to-rose-500"}`}
            >
              em Tempo Real.
            </span>
          </h1>
          <p className="text-xl opacity-70 mb-10 max-w-2xl mx-auto">
            Não apenas veja, <strong>experimente</strong>. A fusão perfeita
            entre cálculo estrutural robusto e a velocidade da web moderna.
          </p>
        </div>
      </header>

      {/* --- SIMULADOR INTERATIVO --- */}
      <section id="simulador" className="px-4 pb-32">
        <div className="max-w-6xl mx-auto">
          <div
            className={`rounded-2xl border shadow-2xl overflow-hidden transition-all duration-500 ${darkMode ? "bg-slate-950 border-slate-800 shadow-purple-900/20" : "bg-white border-slate-200 shadow-xl"}`}
          >
            {/* Abas */}
            <div
              className={`flex border-b ${darkMode ? "border-slate-800 bg-slate-900/50" : "border-slate-100 bg-slate-50"}`}
            >
              <button
                onClick={() => setActiveTab("metalon")}
                className={`px-6 py-4 text-sm font-bold flex items-center gap-2 border-r transition-colors ${activeTab === "metalon" ? (darkMode ? "text-purple-400 bg-slate-900" : "text-pink-600 bg-white") : "opacity-50 hover:opacity-100"}`}
              >
                <Layers size={18} /> Metalon Builder
              </button>
              <button
                onClick={() => setActiveTab("pig")}
                className={`px-6 py-4 text-sm font-bold flex items-center gap-2 border-r transition-colors ${activeTab === "pig" ? (darkMode ? "text-blue-400 bg-slate-900" : "text-blue-600 bg-white") : "opacity-50 hover:opacity-100"}`}
              >
                <Shield size={18} /> PIG Analytics
              </button>
            </div>

            <div className="grid md:grid-cols-12 min-h-[500px]">
              {/* Controles */}
              <div
                className={`md:col-span-4 p-8 border-r ${darkMode ? "border-slate-800" : "border-slate-100"}`}
              >
                {activeTab === "metalon" ? (
                  <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                    <div>
                      <h3 className="text-xl font-bold mb-1">
                        Geometria do Perfil
                      </h3>
                      <p className="text-xs opacity-60 mb-6">
                        Ajuste as dimensões para recalcular a inércia.
                      </p>

                      {/* Sliders */}
                      {[
                        "Altura (H)|height|300",
                        "Largura (B)|width|200",
                        "Espessura (t)|thickness|12",
                      ].map((item) => {
                        const [label, state, max] = item.split("|");
                        const val =
                          state === "height"
                            ? height
                            : state === "width"
                              ? width
                              : thickness;
                        const setVal =
                          state === "height"
                            ? setHeight
                            : state === "width"
                              ? setWidth
                              : setThickness;
                        const step = state === "thickness" ? 0.5 : 10;

                        return (
                          <div key={state} className="mb-6">
                            <div className="flex justify-between text-sm font-medium mb-2">
                              <span>{label}</span>
                              <span
                                className={
                                  darkMode ? "text-purple-400" : "text-pink-600"
                                }
                              >
                                {val} mm
                              </span>
                            </div>
                            <input
                              type="range"
                              min={state === "thickness" ? 1.5 : 30}
                              max={max}
                              step={step}
                              value={val}
                              onChange={(e) => setVal(Number(e.target.value))}
                              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                            />
                          </div>
                        );
                      })}
                    </div>
                    <div
                      className={`p-4 rounded-lg text-sm font-mono border ${darkMode ? "bg-black border-slate-800 text-slate-400" : "bg-slate-50 border-slate-200 text-slate-600"}`}
                    >
                      <div className="flex items-center gap-2 mb-3 opacity-50 text-xs uppercase tracking-widest">
                        <Terminal size={12} /> Resultados (Python Core)
                      </div>
                      <div className="flex justify-between mb-1">
                        <span>Peso Linear:</span>{" "}
                        <span className="text-green-500 font-bold">
                          {weight} kg/m
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Inércia Ix:</span>{" "}
                        <span className="text-blue-500 font-bold">
                          {inertiaX.toFixed(2)} cm⁴
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
                    <h3 className="text-xl font-bold">Telemetria de Dutos</h3>
                    <p className="text-sm opacity-60">
                      Visualização de perda de espessura por corrosão interna
                      (Simulação).
                    </p>

                    <div className="space-y-3">
                      <div
                        className={`p-3 rounded border flex items-center gap-3 ${darkMode ? "bg-red-900/10 border-red-900/30" : "bg-red-50 border-red-100"}`}
                      >
                        <AlertTriangle className="text-red-500" size={20} />
                        <div>
                          <div className="text-xs font-bold text-red-500">
                            ALERTA CRÍTICO
                          </div>
                          <div className="text-xs opacity-70">
                            Segmento 04 apresenta 45% de perda.
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          setPipeSegments([
                            ...pipeSegments.map((s) => ({
                              ...s,
                              corrosion:
                                Math.random() > 0.6 ? Math.random() * 5 : 0,
                            })),
                          ])
                        }
                        className="w-full py-2 text-xs font-bold border rounded hover:bg-slate-800 transition"
                      >
                        Gerar Novos Dados Aleatórios
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Visualização Gráfica */}
              <div
                className={`md:col-span-8 p-8 flex flex-col items-center justify-center relative overflow-hidden ${darkMode ? "bg-slate-900" : "bg-slate-50"}`}
              >
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
                    backgroundSize: "20px 20px",
                  }}
                ></div>

                {activeTab === "metalon" ? (
                  <div
                    className="relative z-10 transition-all duration-300 border-4 border-current flex items-center justify-center shadow-2xl animate-in zoom-in duration-300"
                    style={{
                      width: `${width * 1.8}px`,
                      height: `${height * 1.8}px`,
                      borderColor: darkMode ? "#c084fc" : "#ec4899",
                      borderRadius: "4px",
                      borderWidth: `${thickness}px`,
                    }}
                  >
                    <div className="absolute -right-12 top-1/2 -translate-y-1/2 text-xs font-mono opacity-50 rotate-90">
                      Eixo Y
                    </div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8 text-xs font-mono opacity-50">
                      Eixo X
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col justify-center gap-2 px-8">
                    <div className="text-xs font-mono opacity-50 mb-2">
                      PERFIL LONGITUDINAL DO DUTO (Espessura da Parede)
                    </div>
                    <div className="flex items-end justify-between h-64 w-full gap-1 border-b border-l border-slate-700 p-4 relative">
                      {pipeSegments.map((seg) => (
                        <div key={seg.id} className="relative w-full group">
                          {/* Barra de Espessura */}
                          <div
                            className={`w-full transition-all duration-500 rounded-t ${seg.corrosion > 2 ? "bg-red-500" : darkMode ? "bg-blue-500" : "bg-blue-400"}`}
                            style={{
                              height: `${(seg.thickness - seg.corrosion) * 5}%`,
                            }}
                          ></div>
                          {/* Tooltip */}
                          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] p-2 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-20 pointer-events-none">
                            Seg: {seg.id} | Esp:{" "}
                            {(seg.thickness - seg.corrosion).toFixed(1)}mm
                          </div>
                        </div>
                      ))}
                      {/* Linha de limite crítico */}
                      <div className="absolute bottom-[20%] w-full h-px bg-red-500 border-dashed border-t border-red-500 opacity-50"></div>
                    </div>
                    <div className="flex justify-between text-xs font-mono opacity-50 mt-2">
                      <span>Km 0.0</span>
                      <span>Km 2.5</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SOBRE O AUTOR (Novo Card Interativo) --- */}
      <section
        id="sobre"
        className={`py-24 border-t ${darkMode ? "bg-black border-slate-900" : "bg-pink-50/50 border-pink-100"}`}
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Engenharia & Código</h2>
            <p className="opacity-60 max-w-2xl mx-auto">
              O Vestra Web é fruto da união entre engenharia mecânica avançada e
              desenvolvimento de software moderno.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Texto e Detalhes */}
            <div className="space-y-8">
              <h3 className="text-4xl font-bold leading-tight">
                Olá, eu sou <br />
                <span
                  className={`text-transparent bg-clip-text bg-gradient-to-r ${darkMode ? "from-purple-400 to-indigo-500" : "from-pink-600 to-rose-500"}`}
                >
                  Luiz Medeiros.
                </span>
              </h3>
              <p className="text-lg opacity-80 leading-relaxed">
                Estudante de Engenharia Mecânica na <strong>UFU</strong> e
                desenvolvedor full-stack. Atualmente estagiário na{" "}
                <strong>Inova Industrial</strong>, onde aplico Python e React
                para resolver problemas complexos de refrigeração e estruturas.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div
                  className={`p-4 rounded-xl border transition hover:-translate-y-1 ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-pink-100 shadow-sm"}`}
                >
                  <GraduationCap
                    className={`mb-2 ${darkMode ? "text-purple-400" : "text-pink-500"}`}
                  />
                  <div className="font-bold">UFU</div>
                  <div className="text-xs opacity-60">Engenharia Mecânica</div>
                </div>
                <div
                  className={`p-4 rounded-xl border transition hover:-translate-y-1 ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-pink-100 shadow-sm"}`}
                >
                  <Briefcase
                    className={`mb-2 ${darkMode ? "text-blue-400" : "text-blue-500"}`}
                  />
                  <div className="font-bold">Inova Industrial</div>
                  <div className="text-xs opacity-60">Projetista & Dev</div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  className={`p-3 rounded-full border hover:scale-110 transition ${darkMode ? "border-slate-700 bg-slate-800 hover:bg-slate-700" : "border-slate-200 bg-white hover:bg-slate-50"}`}
                >
                  <Github size={20} />
                </button>
                <button
                  className={`p-3 rounded-full border hover:scale-110 transition ${darkMode ? "border-slate-700 bg-slate-800 hover:bg-slate-700" : "border-slate-200 bg-white hover:bg-slate-50"}`}
                >
                  <Linkedin size={20} />
                </button>
                <button
                  className={`p-3 rounded-full border hover:scale-110 transition ${darkMode ? "border-slate-700 bg-slate-800 hover:bg-slate-700" : "border-slate-200 bg-white hover:bg-slate-50"}`}
                >
                  <Code2 size={20} />
                </button>
              </div>
            </div>

            {/* Stack Visual Card (Interativo) */}
            <div
              className={`relative p-8 rounded-3xl border-2 rotate-3 hover:rotate-0 transition-all duration-500 shadow-2xl group ${darkMode ? "bg-slate-900 border-purple-900 shadow-purple-900/20" : "bg-white border-pink-200 shadow-pink-200"}`}
            >
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce">
                Full Stack
              </div>
              <h4 className="font-bold text-xl mb-6 flex items-center gap-2">
                <Cpu /> Tech Stack
              </h4>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-500/10">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="font-mono text-sm">Python (Backend)</span>
                  </div>
                  <span className="text-xs font-bold opacity-60">
                    NumPy / Flask
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-500/10">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                    <span className="font-mono text-sm">React (Frontend)</span>
                  </div>
                  <span className="text-xs font-bold opacity-60">
                    Next.js 16
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-500/10">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <span className="font-mono text-sm">Cloud / DevOps</span>
                  </div>
                  <span className="text-xs font-bold opacity-60">
                    AWS / Docker
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-dashed border-slate-500/30 text-center">
                <p className="text-xs opacity-50 italic">
                  "Construindo ferramentas que eu mesmo uso na engenharia."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PREÇOS --- */}
      <section id="precos" className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
          Invista na sua produtividade
        </h2>
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Estudante */}
          <div
            className={`p-8 rounded-2xl border transition hover:-translate-y-2 ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
          >
            <div className="text-sm font-bold opacity-50 uppercase tracking-widest mb-4">
              Acadêmico
            </div>
            <div className="text-4xl font-bold mb-2">Grátis</div>
            <ul className="space-y-4 my-8 text-sm opacity-80">
              <li className="flex gap-3">
                <CheckCircle size={18} className="text-green-500" /> Acesso ao
                Metalon Básico
              </li>
              <li className="flex gap-3">
                <CheckCircle size={18} className="text-green-500" /> 1 Projeto
                Ativo
              </li>
            </ul>
            <button
              className={`w-full py-3 rounded-lg font-bold text-sm border ${darkMode ? "border-slate-700 hover:bg-slate-800" : "border-slate-200 hover:bg-slate-50"}`}
            >
              Começar Agora
            </button>
          </div>

          {/* PRO */}
          <div
            className={`p-10 rounded-2xl border-2 relative transform md:-translate-y-4 shadow-2xl transition hover:scale-105 ${darkMode ? "bg-slate-900 border-purple-500 shadow-purple-900/20" : "bg-white border-pink-500 shadow-pink-200"}`}
          >
            <div
              className={`absolute top-0 right-0 px-3 py-1 text-xs font-bold text-white rounded-bl-xl rounded-tr-lg ${darkMode ? "bg-purple-600" : "bg-pink-600"}`}
            >
              POPULAR
            </div>
            <div className="text-4xl font-bold mb-2">
              R$ 89<span className="text-lg opacity-50 font-normal">/mês</span>
            </div>
            <ul className="space-y-4 my-8 text-sm font-medium">
              <li className="flex gap-3">
                <CheckCircle
                  size={18}
                  className={darkMode ? "text-purple-400" : "text-pink-600"}
                />{" "}
                Ferramentas Completas
              </li>
              <li className="flex gap-3">
                <CheckCircle
                  size={18}
                  className={darkMode ? "text-purple-400" : "text-pink-600"}
                />{" "}
                Câmaras Frias
              </li>
              <li className="flex gap-3">
                <CheckCircle
                  size={18}
                  className={darkMode ? "text-purple-400" : "text-pink-600"}
                />{" "}
                Exportação PDF
              </li>
            </ul>
            <a
              href="mailto:luiz@vestra.eng.br?subject=Assinatura%20Pro"
              className={`block text-center w-full py-4 rounded-lg font-bold text-sm text-white transition-colors ${darkMode ? "bg-purple-600 hover:bg-purple-700" : "bg-pink-600 hover:bg-pink-700"}`}
            >
              Assinar Vestra Pro
            </a>
          </div>

          {/* Enterprise */}
          <div
            className={`p-8 rounded-2xl border transition hover:-translate-y-2 ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
          >
            <div className="text-sm font-bold opacity-50 uppercase tracking-widest mb-4">
              Enterprise
            </div>
            <div className="text-3xl font-bold mb-2">Sob Consulta</div>
            <ul className="space-y-4 my-8 text-sm opacity-80">
              <li className="flex gap-3">
                <CheckCircle size={18} className="text-green-500" /> Módulo PIG
                Petrobras
              </li>
              <li className="flex gap-3">
                <CheckCircle size={18} className="text-green-500" /> API
                Dedicada
              </li>
            </ul>
            <a
              href="mailto:luiz@vestra.eng.br?subject=Orçamento%20Enterprise"
              className={`block text-center w-full py-3 rounded-lg font-bold text-sm border ${darkMode ? "border-slate-700 hover:bg-slate-800" : "border-slate-200 hover:bg-slate-50"}`}
            >
              Falar com Luiz
            </a>
          </div>
        </div>
      </section>

      <footer
        className={`py-12 text-center text-sm border-t ${darkMode ? "bg-black border-slate-900 text-slate-500" : "bg-slate-50 border-slate-200 text-slate-400"}`}
      >
        <p className="font-mono mb-2">VESTRA ENGINEERING SOLUTIONS © 2025</p>
        <p className="text-xs opacity-50">
          Desenvolvido com ❤️ por Luiz Medeiros em Araguari-MG
        </p>
      </footer>
    </div>
  );
}
