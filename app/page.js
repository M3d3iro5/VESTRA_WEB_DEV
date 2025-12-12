"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link"; // Navegação fluida sem recarregar
import dynamic from "next/dynamic"; // Importação dinâmica para o gráfico não quebrar no server-side
import {
  Moon,
  Sun,
  CheckCircle,
  Cpu,
  Shield,
  Zap,
  Layers,
  Activity,
  Terminal,
  Mail,
  User,
  BookOpen,
  MessageSquare,
  Settings,
  Hammer,
} from "lucide-react";

// Carrega o gráfico apenas no cliente para evitar erros de hidratação
const PigChart = dynamic(() => import("../components/PigChart"), {
  ssr: false,
});

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState("metalon");

  // Dados simulados para o gráfico PIG
  const [pigData, setPigData] = useState([]);

  useEffect(() => {
    // Gerar dados iniciais
    generateData();
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const generateData = () => {
    const data = [];
    let currentThickness = 12.0;
    for (let i = 0; i <= 20; i++) {
      // Simula uma corrosão progressiva
      const corrosion = Math.random() > 0.7 ? Math.random() * 3 : 0;
      data.push({
        km: (i * 0.5).toFixed(1),
        espessura: currentThickness,
        perda: corrosion, // O quanto perdeu de parede
        restante: (currentThickness - corrosion).toFixed(2),
      });
    }
    setPigData(data);
  };

  // Estados Metalon
  const [width, setWidth] = useState(50);
  const [height, setHeight] = useState(100);
  const [thickness, setThickness] = useState(3.0);

  // Cálculos Metalon Simples
  const area = (
    2 * (width * thickness) +
    2 * ((height - 2 * thickness) * thickness)
  ).toFixed(1);
  const weight = ((area * 7.85) / 1000).toFixed(2);
  const inertiaX =
    ((width * Math.pow(height, 3)) / 12 -
      ((width - 2 * thickness) * Math.pow(height - 2 * thickness, 3)) / 12) /
    10000;

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
            <Link
              href="/sobre"
              className="hover:text-pink-500 transition flex items-center gap-1"
            >
              <User size={14} /> Sobre o Criador
            </Link>
            <a href="#modulos" className="hover:text-pink-500 transition">
              Módulos
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
              href="mailto:luiz@vestra.eng.br"
              className={`hidden sm:flex px-5 py-2.5 rounded-full font-bold text-sm shadow-lg hover:scale-105 transition items-center gap-2 ${darkMode ? "bg-white text-black" : "bg-slate-900 text-white"}`}
            >
              <Mail size={16} /> Contato
            </a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="pt-40 pb-16 px-6 relative overflow-hidden text-center">
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[120px] opacity-30 pointer-events-none ${darkMode ? "bg-purple-600" : "bg-pink-400"}`}
        ></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border ${darkMode ? "bg-purple-950/40 border-purple-500/30 text-purple-300" : "bg-pink-50 border-pink-200 text-pink-600"}`}
          >
            <Activity size={14} className="animate-pulse" /> V2.0 Stable •
            Python Core
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Da Prática Industrial <br />
            para o{" "}
            <span
              className={`text-transparent bg-clip-text bg-gradient-to-r ${darkMode ? "from-purple-400 to-indigo-400" : "from-pink-600 to-rose-500"}`}
            >
              Digital.
            </span>
          </h1>
          <p className="text-xl opacity-70 mb-10 max-w-2xl mx-auto leading-relaxed">
            Software nascido no chão de fábrica da{" "}
            <strong>Inova Industrial</strong>. Automatize cálculos de
            transportadores CEMA, dimensionamento de motores e análise de dutos
            com a precisão de quem projeta máquinas reais.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              href="/sobre"
              className={`px-8 py-4 rounded-xl font-bold border transition-all hover:-translate-y-1 flex items-center gap-2 ${darkMode ? "bg-white text-black hover:bg-slate-200" : "bg-slate-900 text-white hover:bg-slate-800"}`}
            >
              <User size={18} /> Conheça o Engenheiro
            </Link>
          </div>
        </div>
      </header>

      {/* --- SIMULADOR INTERATIVO COM RECHARTS --- */}
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
                <Layers size={18} /> Metalon
              </button>
              <button
                onClick={() => setActiveTab("pig")}
                className={`px-6 py-4 text-sm font-bold flex items-center gap-2 border-r transition-colors ${activeTab === "pig" ? (darkMode ? "text-blue-400 bg-slate-900" : "text-blue-600 bg-white") : "opacity-50 hover:opacity-100"}`}
              >
                <Shield size={18} /> PIG Analytics
              </button>
              <button className="px-6 py-4 text-sm font-bold flex items-center gap-2 opacity-40 cursor-not-allowed">
                <Settings size={18} /> CEMA 350 (Pro)
              </button>
            </div>

            <div className="grid md:grid-cols-12 min-h-[450px]">
              {/* Painel de Controle */}
              <div
                className={`md:col-span-4 p-8 border-r ${darkMode ? "border-slate-800" : "border-slate-100"}`}
              >
                {activeTab === "metalon" ? (
                  <div className="space-y-6 animate-in fade-in">
                    <div>
                      <h3 className="text-xl font-bold mb-1">
                        Geometria do Perfil
                      </h3>
                      <p className="text-xs opacity-60 mb-6">
                        Ajuste dimensões para cálculo de inércia em tempo real.
                      </p>
                      {/* Sliders Metalon (Código Reduzido para Clareza) */}
                      <div className="space-y-5">
                        <div>
                          <div className="flex justify-between text-xs font-bold mb-2">
                            Altura (H){" "}
                            <span className="text-purple-500">{height}mm</span>
                          </div>
                          <input
                            type="range"
                            min="50"
                            max="300"
                            step="10"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs font-bold mb-2">
                            Largura (B){" "}
                            <span className="text-purple-500">{width}mm</span>
                          </div>
                          <input
                            type="range"
                            min="30"
                            max="200"
                            step="10"
                            value={width}
                            onChange={(e) => setWidth(e.target.value)}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs font-bold mb-2">
                            Espessura (t){" "}
                            <span className="text-purple-500">
                              {thickness}mm
                            </span>
                          </div>
                          <input
                            type="range"
                            min="1.5"
                            max="12"
                            step="0.5"
                            value={thickness}
                            onChange={(e) => setThickness(e.target.value)}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className={`p-4 rounded-lg text-sm font-mono border ${darkMode ? "bg-black border-slate-800 text-slate-400" : "bg-slate-50 border-slate-200 text-slate-600"}`}
                    >
                      <div className="flex justify-between mb-1">
                        <span>Peso:</span>{" "}
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
                  <div className="space-y-6 animate-in fade-in">
                    <div>
                      <h3 className="text-xl font-bold mb-1">
                        Análise de Dutos
                      </h3>
                      <p className="text-xs opacity-60 mb-4">
                        Detecção de anomalias via inspeção PIG.
                      </p>
                      <div
                        className={`p-4 rounded border mb-4 ${darkMode ? "bg-red-900/10 border-red-900/30" : "bg-red-50 border-red-100"}`}
                      >
                        <div className="text-xs font-bold text-red-500 mb-1">
                          ALERTA DE CORROSÃO
                        </div>
                        <div className="text-xs opacity-70">
                          Detectado pico de perda de massa no Km 4.5.
                        </div>
                      </div>
                      <button
                        onClick={generateData}
                        className="w-full py-2 text-xs font-bold border rounded hover:bg-slate-800 transition flex items-center justify-center gap-2"
                      >
                        <Activity size={14} /> Processar Novos Dados
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Área Visual (Gráfico ou Desenho) */}
              <div
                className={`md:col-span-8 p-8 flex flex-col items-center justify-center relative overflow-hidden ${darkMode ? "bg-slate-900" : "bg-slate-50"}`}
              >
                {activeTab === "metalon" ? (
                  <div
                    className="relative z-10 border-4 border-current flex items-center justify-center shadow-2xl transition-all duration-300"
                    style={{
                      width: `${width * 1.8}px`,
                      height: `${height * 1.8}px`,
                      borderColor: darkMode ? "#c084fc" : "#ec4899",
                      borderRadius: "4px",
                      borderWidth: `${thickness}px`,
                    }}
                  >
                    <div className="absolute opacity-50 text-[10px] font-mono">
                      Vista Corte A-A
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col justify-center">
                    <div className="text-xs font-bold opacity-50 mb-4 ml-8">
                      PERFIL DE ESPESSURA DE PAREDE (Ultrassom)
                    </div>
                    <PigChart data={pigData} darkMode={darkMode} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MÓDULOS (Resumo) --- */}
      <section
        id="modulos"
        className={`py-20 border-t ${darkMode ? "bg-slate-950 border-slate-900" : "bg-slate-50 border-slate-200"}`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Ecossistema Vestra</h2>
            <p className="opacity-60">
              Soluções desenvolvidas sob demanda para desafios reais.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              className={`p-6 rounded-xl border hover:-translate-y-1 transition ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
            >
              <Settings className="text-orange-500 mb-4" size={28} />
              <h3 className="font-bold mb-2">Transportador Helicoidal</h3>
              <p className="text-xs opacity-60 leading-relaxed">
                Cálculo de potência e torque seguindo rigorosamente a norma{" "}
                <strong>CEMA 350</strong>. Gera relatórios PDF automáticos e
                seleção de motor.
              </p>
            </div>

            <div
              className={`p-6 rounded-xl border hover:-translate-y-1 transition ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
            >
              <Zap className="text-yellow-500 mb-4" size={28} />
              <h3 className="font-bold mb-2">Noria (Elevador)</h3>
              <p className="text-xs opacity-60 leading-relaxed">
                Dimensionamento completo de motoredutores para elevadores de
                canecas, focado na eficiência energética.
              </p>
            </div>

            <div
              className={`p-6 rounded-xl border hover:-translate-y-1 transition ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
            >
              <MessageSquare className="text-emerald-500 mb-4" size={28} />
              <h3 className="font-bold mb-2">IA Assistente</h3>
              <p className="text-xs opacity-60 leading-relaxed">
                Chatbot integrado ao banco de dados técnico. Tira dúvidas sobre
                normas e especificações de projetos antigos instantaneamente.
              </p>
            </div>

            <div
              className={`p-6 rounded-xl border hover:-translate-y-1 transition ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
            >
              <BookOpen className="text-blue-500 mb-4" size={28} />
              <h3 className="font-bold mb-2">Gestão RH</h3>
              <p className="text-xs opacity-60 leading-relaxed">
                Módulo simplificado para registro de ponto digital, substituindo
                cartões manuais no chão de fábrica.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer
        className={`py-12 text-center text-sm border-t ${darkMode ? "bg-black border-slate-900 text-slate-500" : "bg-slate-50 border-slate-200 text-slate-400"}`}
      >
        <p className="font-mono mb-2">VESTRA ENGINEERING ENVIRONMENT © 2025</p>
        <p className="text-xs opacity-50">
          Fundado em Junho de 2025 por Luiz Medeiros.
        </p>
      </footer>
    </div>
  );
}
