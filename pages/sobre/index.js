"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  GraduationCap,
  Briefcase,
  Code2,
  Award,
  Hammer,
  Terminal,
} from "lucide-react";

export default function Sobre() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-purple-500 selection:text-white">
      {/* Navbar Simplificada */}
      <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur fixed w-full z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-bold hover:text-purple-400 transition"
          >
            <ArrowLeft size={16} /> Voltar para Vitrine
          </Link>
          <span className="font-mono text-xs opacity-50">
            LUIZ MEDEIROS / PROFILE
          </span>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header Bio */}
          <div className="mb-20">
            <div className="inline-block px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-400 text-xs font-bold mb-6">
              Full Stack Engineer & Mechanical Designer
            </div>
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Projetista na Inova, <br />
              Engenheiro na UFU, <br />
              <span className="text-purple-500">Inovador por natureza.</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-2xl">
              "Eu não apenas escrevo código; eu vivo a engenharia no chão de
              fábrica. O Vestra nasceu da minha necessidade real de automatizar
              processos complexos que atrasavam o dia a dia na indústria."
            </p>
          </div>

          {/* Timeline da Carreira */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            {/* Formação */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <GraduationCap className="text-purple-500" /> Formação
              </h3>
              <div className="pl-4 border-l-2 border-slate-800 space-y-8">
                <div className="relative">
                  <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-purple-500"></div>
                  <div className="font-bold text-lg">Engenharia Mecânica</div>
                  <div className="text-slate-400 text-sm mb-2">
                    Universidade Federal de Uberlândia (UFU)
                  </div>
                  <div className="text-xs bg-slate-900 inline-block px-2 py-1 rounded text-slate-500">
                    Previsão: 2027
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-slate-700"></div>
                  <div className="font-bold text-lg">Publicação no COBEM</div>
                  <div className="text-slate-400 text-sm">
                    Congresso Brasileiro de Engenharia Mecânica
                  </div>
                  <p className="text-sm opacity-60 mt-2">
                    Artigo técnico publicado, validando o rigor acadêmico
                    aplicado aos softwares.
                  </p>
                </div>
              </div>
            </div>

            {/* Experiência */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Briefcase className="text-blue-500" /> Carreira
              </h3>
              <div className="pl-4 border-l-2 border-slate-800 space-y-8">
                <div className="relative">
                  <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-blue-500"></div>
                  <div className="font-bold text-lg">Inova Industrial</div>
                  <div className="text-blue-400 text-sm font-bold mb-2">
                    Estagiário de Projetos & Lead Developer
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Iniciei como projetista de câmaras frias. Percebi gargalos
                    nos cálculos manuais e desenvolvi o ecossistema Vestra para
                    automatizar o dimensionamento de peças frigoríficas.
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-slate-700"></div>
                  <div className="font-bold text-lg">Fundador do Vestra</div>
                  <div className="text-slate-500 text-sm mb-2">
                    Junho 2025 - Presente
                  </div>
                  <p className="text-sm text-slate-400">
                    Desenvolvimento da plataforma, migrando de CustomTkinter
                    (Desktop) para soluções Web híbridas com Next.js.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stack Detalhado */}
          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Terminal className="text-green-500" /> Arsenal Técnico
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="font-bold text-slate-300 mb-4 border-b border-slate-800 pb-2">
                  Core Engineering
                </div>
                <ul className="space-y-2 text-sm text-slate-400 font-mono">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>{" "}
                    Python 3.12
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>{" "}
                    CustomTkinter (UI)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>{" "}
                    PyWebview
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-slate-600 rounded-full"></div>{" "}
                    C++ / Cython (Estudo)
                  </li>
                </ul>
              </div>

              <div>
                <div className="font-bold text-slate-300 mb-4 border-b border-slate-800 pb-2">
                  Web Moderno
                </div>
                <ul className="space-y-2 text-sm text-slate-400 font-mono">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>{" "}
                    React 19
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>{" "}
                    Next.js 16 (App Router)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>{" "}
                    Tailwind CSS
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>{" "}
                    Recharts Viz
                  </li>
                </ul>
              </div>

              <div>
                <div className="font-bold text-slate-300 mb-4 border-b border-slate-800 pb-2">
                  Domínio Industrial
                </div>
                <ul className="space-y-2 text-sm text-slate-400 font-mono">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>{" "}
                    Norma CEMA 350
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>{" "}
                    Dimensionamento Térmico
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>{" "}
                    SolidWorks API
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
