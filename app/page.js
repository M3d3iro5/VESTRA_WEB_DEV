"use client"; // Necessário para interatividade (botões e estados)

import React, { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  Database,
  Server,
  Cpu,
  Code2,
  GitBranch,
  Terminal,
  ArrowRight,
  Layers,
  Activity,
  ShieldCheck,
} from "lucide-react";

export default function Home() {
  // Estado para controlar o tema (começa no escuro por padrão)
  const [darkMode, setDarkMode] = useState(true);

  // Aplica a classe 'dark' no HTML quando o estado muda
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${darkMode ? "bg-vestra-dark text-slate-200" : "bg-vestra-light text-slate-800"}`}
    >
      {/* --- NAVBAR --- */}
      <nav
        className={`fixed w-full z-50 border-b transition-colors duration-500 ${darkMode ? "bg-vestra-dark/90 border-purple-900/30" : "bg-white/90 border-pink-200"}`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl shadow-lg transition-all ${darkMode ? "bg-purple-600 text-white shadow-purple-500/20" : "bg-pink-600 text-white shadow-pink-500/20"}`}
            >
              V
            </div>
            <span className="font-bold text-xl tracking-tight">
              VESTRA
              <span className={darkMode ? "text-purple-500" : "text-pink-600"}>
                .DATA
              </span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-6 text-sm font-medium">
              <a href="#arquitetura" className="hover:opacity-70 transition">
                Arquitetura
              </a>
              <a href="#projetos" className="hover:opacity-70 transition">
                Projetos
              </a>
              <a href="#engenharia" className="hover:opacity-70 transition">
                Engenharia
              </a>
            </div>

            {/* Botão de Tema */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full border transition-all duration-300 ${darkMode ? "border-purple-800 bg-purple-900/20 text-purple-400 hover:bg-purple-900/40" : "border-pink-200 bg-pink-50 text-pink-600 hover:bg-pink-100"}`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Texto de Impacto */}
          <div>
            <div
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-8 border ${darkMode ? "bg-purple-950/30 border-purple-500/30 text-purple-400" : "bg-pink-50 border-pink-200 text-pink-600"}`}
            >
              <Activity size={14} className={darkMode ? "animate-pulse" : ""} />
              Structural Data Engineering
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              A inteligência <br />
              do{" "}
              <span
                className={`text-transparent bg-clip-text bg-gradient-to-r ${darkMode ? "from-purple-400 to-indigo-500" : "from-pink-600 to-rose-500"}`}
              >
                Cálculo Estrutural
              </span>
            </h1>

            <p className="text-lg opacity-80 mb-10 max-w-xl leading-relaxed">
              O Vestra não é apenas um software. É um ecossistema de engenharia
              de dados que unifica a precisão do Python SciPy com a
              escalabilidade da Web moderna.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className={`flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-bold transition-all shadow-lg ${darkMode ? "bg-purple-600 hover:bg-purple-700 text-white shadow-purple-600/25" : "bg-pink-600 hover:bg-pink-700 text-white shadow-pink-600/25"}`}
              >
                Ver Dashboard <ArrowRight size={20} />
              </button>
              <button
                className={`px-8 py-4 rounded-lg font-bold border transition-colors ${darkMode ? "border-purple-800 hover:bg-purple-900/20 text-purple-300" : "border-pink-200 hover:bg-pink-50 text-pink-700"}`}
              >
                Documentação Técnica
              </button>
            </div>
          </div>

          {/* Elemento Visual: Arquitetura de Software */}
          <div className="relative group">
            <div
              className={`absolute -inset-1 rounded-2xl blur opacity-30 transition duration-1000 ${darkMode ? "bg-gradient-to-r from-purple-600 to-blue-600" : "bg-gradient-to-r from-pink-400 to-rose-400"}`}
            ></div>
            <div
              className={`relative rounded-2xl p-8 border backdrop-blur-xl transition-colors ${darkMode ? "bg-black/50 border-purple-500/20" : "bg-white/80 border-pink-200"}`}
            >
              <div className="flex items-center justify-between mb-8 border-b pb-4 opacity-50 border-current">
                <span className="text-xs font-mono font-bold">
                  SYSTEM ARCHITECTURE v2.0
                </span>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
              </div>

              {/* Diagrama de Fluxo */}
              <div className="space-y-6">
                {/* Python Backend */}
                <div
                  className={`flex items-center gap-4 p-4 rounded-lg border ${darkMode ? "bg-purple-900/10 border-purple-500/30" : "bg-pink-50 border-pink-200"}`}
                >
                  <div
                    className={`p-3 rounded bg-current ${darkMode ? "text-purple-400" : "text-pink-600"}`}
                  >
                    <Server size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">
                      Python Calculation Core
                    </h3>
                    <p className="text-xs opacity-70 font-mono">
                      NumPy • SciPy • Pandas
                    </p>
                  </div>
                  <div className="ml-auto text-xs font-mono opacity-50">
                    Latency: 12ms
                  </div>
                </div>

                {/* Seta de Conexão */}
                <div className="flex justify-center">
                  <ArrowRight className="transform rotate-90 opacity-30" />
                </div>

                {/* API Layer */}
                <div
                  className={`flex items-center gap-4 p-4 rounded-lg border ${darkMode ? "bg-blue-900/10 border-blue-500/30" : "bg-slate-50 border-slate-200"}`}
                >
                  <div
                    className={`p-3 rounded bg-current ${darkMode ? "text-blue-400" : "text-slate-600"}`}
                  >
                    <GitBranch size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Flask REST API</h3>
                    <p className="text-xs opacity-70 font-mono">
                      JSON Serialization • Auth
                    </p>
                  </div>
                </div>

                {/* Seta de Conexão */}
                <div className="flex justify-center">
                  <ArrowRight className="transform rotate-90 opacity-30" />
                </div>

                {/* Frontend */}
                <div
                  className={`flex items-center gap-4 p-4 rounded-lg border ${darkMode ? "bg-emerald-900/10 border-emerald-500/30" : "bg-rose-50 border-rose-200"}`}
                >
                  <div
                    className={`p-3 rounded bg-current ${darkMode ? "text-emerald-400" : "text-rose-600"}`}
                  >
                    <Code2 size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Next.js Interface</h3>
                    <p className="text-xs opacity-70 font-mono">
                      React 19 • Tailwind • Recharts
                    </p>
                  </div>
                  <div className="ml-auto text-xs font-bold text-emerald-500">
                    ONLINE
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* --- SEÇÃO TÉCNICA (Data Engineering) --- */}
      <section
        id="engenharia"
        className={`py-20 border-t ${darkMode ? "bg-black/40 border-purple-900/20" : "bg-pink-50/50 border-pink-100"}`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
              <Database
                className={darkMode ? "text-purple-500" : "text-pink-600"}
              />
              Engenharia de Dados Estruturais
            </h2>
            <p className="opacity-70 max-w-2xl">
              Nossos algoritmos transformam dados brutos de inspeção e geometria
              em relatórios de confiabilidade precisos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1: Metalon */}
            <div
              className={`p-8 rounded-xl border transition-all duration-300 hover:-translate-y-2 group ${darkMode ? "bg-neutral-900 border-neutral-800 hover:border-purple-500" : "bg-white border-slate-200 hover:border-pink-400 shadow-sm"}`}
            >
              <div className="mb-6 opacity-50 group-hover:opacity-100 transition-opacity">
                <Layers size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Análise de Perfis</h3>
              <p className="text-sm opacity-60 mb-6">
                Dimensionamento automatizado de seções tubulares (Metalon) para
                estruturas de refrigeração industrial.
              </p>
              <div
                className={`text-xs font-mono p-3 rounded ${darkMode ? "bg-black text-purple-400" : "bg-slate-100 text-pink-600"}`}
              >
                def calc_inertia(b, h, t):
                <br />
                &nbsp;&nbsp;return (b*h**3 - (b-2*t)*(h-2*t)**3)/12
              </div>
            </div>

            {/* Card 2: PIG Petrobras */}
            <div
              className={`p-8 rounded-xl border transition-all duration-300 hover:-translate-y-2 group ${darkMode ? "bg-neutral-900 border-neutral-800 hover:border-blue-500" : "bg-white border-slate-200 hover:border-blue-400 shadow-sm"}`}
            >
              <div className="mb-6 opacity-50 group-hover:opacity-100 transition-opacity">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Confiabilidade PIG</h3>
              <p className="text-sm opacity-60 mb-6">
                Processamento de milhões de pontos de inspeção de dutos para
                predição de falhas e análise de corrosão.
              </p>
              <div className="flex gap-2 text-xs font-mono mt-4">
                <span className="px-2 py-1 rounded bg-blue-900/30 text-blue-400">
                  Petrobras
                </span>
                <span className="px-2 py-1 rounded bg-blue-900/30 text-blue-400">
                  Dutos
                </span>
              </div>
            </div>

            {/* Card 3: Otimização */}
            <div
              className={`p-8 rounded-xl border transition-all duration-300 hover:-translate-y-2 group ${darkMode ? "bg-neutral-900 border-neutral-800 hover:border-emerald-500" : "bg-white border-slate-200 hover:border-emerald-400 shadow-sm"}`}
            >
              <div className="mb-6 opacity-50 group-hover:opacity-100 transition-opacity">
                <Cpu size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Algoritmos Híbridos</h3>
              <p className="text-sm opacity-60 mb-6">
                O VestraWeb utiliza uma arquitetura que permite rodar scripts
                Python pesados sem travar a interface do usuário.
              </p>
              <div
                className={`h-1 w-full rounded-full overflow-hidden ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}
              >
                <div
                  className={`h-full w-2/3 ${darkMode ? "bg-purple-500" : "bg-pink-500"}`}
                ></div>
              </div>
              <div className="flex justify-between text-xs mt-2 font-mono opacity-60">
                <span>Processing</span>
                <span>67%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer
        className={`py-12 text-center text-sm border-t ${darkMode ? "bg-black border-purple-900/20 text-slate-500" : "bg-white border-pink-100 text-slate-400"}`}
      >
        <p className="font-mono">
          VESTRA ENGINEERING SOLUTIONS © 2025 <br />
          <span className="opacity-50">
            Desenvolvido com Next.js 16 & Python Core
          </span>
        </p>
      </footer>
    </div>
  );
}
