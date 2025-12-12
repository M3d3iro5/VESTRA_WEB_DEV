import React from "react";
import {
  ArrowRight,
  Cpu,
  Anchor,
  Database,
  Layers,
  Code2,
  CloudCog,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50">
      {/* Navbar Técnica */}
      <nav className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200 fixed top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">
              V
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              VESTRA<span className="text-blue-600">.WEB</span>
            </span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <span className="cursor-pointer hover:text-blue-600 transition">
              Módulos
            </span>
            <span className="cursor-pointer hover:text-blue-600 transition">
              Documentação
            </span>
            <span className="cursor-pointer hover:text-blue-600 transition">
              API Python
            </span>
          </div>
          <div className="flex gap-3">
            <button className="text-slate-600 hover:text-slate-900 text-sm font-medium px-3 py-2">
              Login
            </button>
            <button className="bg-slate-900 text-white px-4 py-2 rounded text-sm font-medium hover:bg-slate-800 transition shadow-lg shadow-slate-900/20">
              Console
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Engenharia */}
      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Texto Principal */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-6 border border-blue-100">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Versão Web 1.0.0 Stable
              </div>

              <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight mb-6 leading-[1.15]">
                Cálculo estrutural <br />
                com a velocidade <br />
                da <span className="text-blue-600">computação em nuvem.</span>
              </h1>

              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Migramos a robustez do Desktop para a Web. Execute
                dimensionamentos de câmaras frias, análises de Metalon e
                processamento de dados PIG em qualquer lugar.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3.5 rounded-lg font-bold hover:bg-blue-700 transition shadow-blue-600/25 shadow-lg">
                  Acessar Módulos <ArrowRight size={18} />
                </button>
                <button className="flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 px-6 py-3.5 rounded-lg font-bold hover:bg-slate-50 transition">
                  <Code2 size={18} className="text-slate-400" />
                  Ver Repositório
                </button>
              </div>
            </div>

            {/* Elemento Visual Técnico (Card Flutuante) */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-20"></div>
              <div className="relative bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Database size={16} className="text-blue-600" />
                    <span className="text-xs font-bold text-slate-500 uppercase">
                      Input de Dados
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    vestra_core.py
                  </span>
                </div>

                {/* Simulação de Código/Dados */}
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Material:</span>
                    <span className="text-blue-600">ASTM A36</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Perfil:</span>
                    <span className="text-slate-900">Metalon 50x30x2.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Tensão Esc. (fy):</span>
                    <span className="text-slate-900">250 MPa</span>
                  </div>
                  <div className="h-px bg-slate-100 my-2"></div>
                  <div className="flex justify-between items-center bg-slate-50 p-2 rounded border border-slate-100">
                    <span className="text-slate-500">Status:</span>
                    <span className="flex items-center gap-1 text-emerald-600 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>{" "}
                      Aprovado
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grid de Funcionalidades */}
          <div className="mt-24 grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition duration-300 group">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition">
                <Layers size={20} />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">
                Estruturas Metálicas
              </h3>
              <p className="text-sm text-slate-500">
                Dimensionamento automatizado de perfis tubulares retangulares
                para projetos da Inova.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition duration-300 group">
              <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition">
                <Anchor size={20} />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">
                Pipeline Integrity (PIG)
              </h3>
              <p className="text-sm text-slate-500">
                Algoritmos de confiabilidade para análise de corrosão e falha em
                dutos de petróleo.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 hover:border-cyan-300 hover:shadow-lg transition duration-300 group">
              <div className="w-10 h-10 bg-cyan-50 rounded-lg flex items-center justify-center text-cyan-600 mb-4 group-hover:scale-110 transition">
                <CloudCog size={20} />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">
                Híbrido Python/Web
              </h3>
              <p className="text-sm text-slate-500">
                Interface React conectada a backend Python para cálculos pesados
                sem travar o navegador.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
