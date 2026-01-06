// pages/sobre/index.js
import React from "react";
import Head from "next/head";
import Link from "next/link";
import {
  ArrowLeft,
  GraduationCap,
  Briefcase,
  Terminal,
  Award,
  Hammer,
  Code2,
  Wrench,
  BookOpen,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Calendar,
  ExternalLink,
} from "lucide-react";

function cn() {
  return Array.from(arguments).filter(Boolean).join(" ");
}

function Badge({ tone = "slate", children }) {
  const toneClasses = {
    purple:
      "bg-purple-900/25 border-purple-500/30 text-purple-300 shadow-[0_0_0_1px_rgba(168,85,247,0.12)]",
    blue: "bg-blue-900/25 border-blue-500/30 text-blue-300 shadow-[0_0_0_1px_rgba(59,130,246,0.12)]",
    green:
      "bg-emerald-900/25 border-emerald-500/30 text-emerald-300 shadow-[0_0_0_1px_rgba(16,185,129,0.12)]",
    red: "bg-rose-900/25 border-rose-500/30 text-rose-300 shadow-[0_0_0_1px_rgba(244,63,94,0.12)]",
    slate:
      "bg-slate-900/60 border-slate-700/60 text-slate-300 shadow-[0_0_0_1px_rgba(148,163,184,0.08)]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur",
        toneClasses[tone] || toneClasses.slate,
      )}
    >
      {children}
    </span>
  );
}

function Card({ children, className }) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-slate-800/80 bg-slate-900/40 backdrop-blur",
        "shadow-[0_1px_0_0_rgba(255,255,255,0.04)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

function SectionHeader({ icon: Icon, title, subtitle, tone = "slate" }) {
  return (
    <div className="flex items-end justify-between gap-6">
      <div>
        <div className="flex items-center gap-2">
          <Icon className="size-5" />
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        </div>
        {subtitle ? (
          <p className="mt-2 text-sm text-slate-400 max-w-2xl">{subtitle}</p>
        ) : null}
      </div>
      <Badge tone={tone}>
        <span className="opacity-90">Atualizado</span>
        <span className="opacity-60">•</span>
        <span className="opacity-70">2026</span>
      </Badge>
    </div>
  );
}

function Stat({ label, value, hint }) {
  return (
    <div className="rounded-2xl border border-slate-800/70 bg-slate-950/30 p-4">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="mt-1 text-2xl font-extrabold tracking-tight">{value}</div>
      {hint ? <div className="mt-1 text-xs text-slate-500">{hint}</div> : null}
    </div>
  );
}

function Timeline({ items, tone = "purple" }) {
  const dotActive = tone === "purple" ? "bg-purple-500" : "bg-blue-500";
  const textActive = tone === "purple" ? "text-purple-400" : "text-blue-400";

  return (
    <div className="pl-4 border-l border-slate-800 space-y-8">
      {items.map((it, idx) => (
        <div key={idx} className="relative">
          <div
            aria-hidden="true"
            className={cn(
              "absolute -left-[21px] top-1.5 size-3 rounded-full",
              it.dot === "muted" ? "bg-slate-700" : dotActive,
            )}
          />
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <div className="font-bold text-lg">{it.title}</div>
            {it.when ? (
              <div className="text-xs text-slate-500 inline-flex items-center gap-1">
                <Calendar className="size-3.5" />
                {it.when}
              </div>
            ) : null}
          </div>

          {it.org ? (
            <div className={cn("text-sm font-semibold", textActive)}>
              {it.org}
            </div>
          ) : null}

          {it.tags && it.tags.length ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {it.tags.map((t) => (
                <span
                  key={t}
                  className="text-[11px] rounded-full border border-slate-800 bg-slate-950/40 px-2 py-1 text-slate-400"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}

          {it.body ? (
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              {it.body}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function PillList({ title, items, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-slate-800/70 bg-slate-950/30 p-5">
      <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
        <Icon className="size-4 text-slate-400" />
        {title}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((x) => (
          <span
            key={x}
            className="rounded-full border border-slate-800 bg-slate-950/40 px-3 py-1 text-xs text-slate-300"
          >
            {x}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ name, role, desc, bullets, stack, href, tone }) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-extrabold tracking-tight">{name}</h3>
            <Badge tone={tone || "slate"}>{role}</Badge>
          </div>
          <p className="mt-2 text-sm text-slate-400 leading-relaxed">{desc}</p>
        </div>

        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/40 px-3 py-2 text-xs font-bold text-slate-200 hover:border-slate-700 hover:bg-slate-950/60 transition"
          >
            Ver <ExternalLink className="size-4" />
          </a>
        ) : null}
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-800/70 bg-slate-950/30 p-4">
          <div className="text-xs font-bold text-slate-300">Destaques</div>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            {bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-slate-600" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-800/70 bg-slate-950/30 p-4">
          <div className="text-xs font-bold text-slate-300">Stack</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-slate-800 bg-slate-950/40 px-3 py-1 text-xs text-slate-300"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function Sobre() {
  // ✅ Ajuste aqui (links e PDFs)
  const profile = {
    name: "Luiz Felipe Oliveira Medeiros",
    headline:
      "Engenharia Mecânica (UFU) • Projetista Industrial • Full Stack Engineer",
    location: "Uberlândia/Araguari, MG — Brasil (remoto disponível)",
    quote:
      "Eu não apenas escrevo código; eu vivo a engenharia no chão de fábrica. O Vestra nasceu de uma necessidade real: automatizar processos complexos que travavam a rotina industrial.",
    links: {
      github: "https://github.com/M3d3iro5",
      linkedin: "https://linkedin.com/in/luiz-felipe-oliveira-medeiros",
      email: "mailto:lfelipeomederos@gmail.com",
    },
    cv: {
      eng: "/cv/luiz-medeiros-engenharia.pdf",
      fullstack: "/cv/luiz-medeiros-fullstack.pdf",
    },
  };

  // ✅ Conteúdo mais completo (pode editar à vontade)
  const highlights = [
    {
      label: "Projetos industriais",
      value: "20+",
      hint: "Estruturas e detalhamento",
    },
    {
      label: "Estruturas detalhadas",
      value: "~400t",
      hint: "Escala real em fábrica",
    },
    { label: "Tempo de projeto", value: "-70%", hint: "Automação com Python" },
    { label: "Produtividade", value: "+90%", hint: "Automação NBR 8800" },
  ];

  const formation = [
    {
      title: "Engenharia Mecânica",
      org: "Universidade Federal de Uberlândia (UFU)",
      when: "2022 — previsão 2026",
      tags: [
        "Mecânica dos Sólidos",
        "Computação aplicada",
        "Engenharia de projeto",
      ],
      body: "Formação voltada à engenharia aplicada, com foco em transformar teoria em entregas reais (projeto, cálculo e software).",
      dot: "active",
    },
    {
      title: "Inglês B1",
      org: "Certificação Cambridge",
      when: "intermediário",
      tags: ["Leitura técnica", "Documentação", "Comunicação"],
      dot: "muted",
    },
  ];

  const career = [
    {
      title: "Inova Industrial",
      org: "Estagiário de Engenharia / Projetista Mecânico • Automação",
      when: "2025 — atual",
      tags: ["Transportadores", "Estruturas metálicas", "Python", "SolidWorks"],
      body: "Projetos industriais e detalhamento em escala real. Automação de rotinas repetitivas (cálculos/listas), reduzindo fortemente o tempo de projeto e padronizando entregáveis.",
      dot: "active",
    },
    {
      title: "Vestra",
      org: "Fundador & Lead Developer • Engenharia Computacional",
      when: "2025 — atual",
      tags: ["NBR 8800", "PostgreSQL", "Docker", "TDD", "IA/RAG"],
      body: "Software de engenharia para automatizar verificações normativas e acelerar fluxo de cálculo. Evolução de legado desktop para arquitetura mais escalável e modular.",
      dot: "active",
    },
    {
      title: "Tucano Aerodesign (UFU)",
      org: "Elétrica & Telemetria",
      when: "2022 — 2024",
      tags: ["C/C++", "Telemetria", "MATLAB", "Equipe"],
      body: "Trabalho multidisciplinar com aprendizado forte em sistemas embarcados, dados e colaboração.",
      dot: "muted",
    },
  ];

  const research = [
    {
      title: "COBEM 2025",
      org: "Structural Integrity Analysis of Pipelines Using Artificial Intelligence",
      when: "2025",
      tags: ["Machine Learning", "Integridade estrutural", "RBI"],
      body: "Pesquisa aplicada usando IA para prever falhas em dutos com base em dados de inspeção e manutenção baseada em risco.",
      dot: "active",
    },
  ];

  const stacks = {
    engenharia: [
      "Estruturas metálicas",
      "Dimensionamento e detalhamento",
      "Normas (NBR 8800 / ISO)",
      "SolidWorks (CAD 3D)",
      "AutoCAD",
      "Ansys / CAE",
      "MATLAB",
      "Excel avançado / VBA",
    ],
    software: [
      "Python",
      "JavaScript (ES6+)",
      "Node.js / Express",
      "Flask (REST)",
      "PostgreSQL",
      "Docker / Compose",
      "Git / GitHub Actions",
      "TDD (PyTest / Jest)",
      "Linux",
      "RAG / IA aplicada",
    ],
    soft: [
      "Agile / Scrum",
      "Liderança técnica",
      "Mentoria",
      "Comunicação técnica",
      "Gestão de entregas",
      "Trabalho em equipe",
    ],
  };

  const projects = [
    {
      name: "Vestra",
      role: "Engenharia Computacional",
      desc: "Plataforma para cálculos e automações de engenharia (com foco em produtividade, padronização e confiabilidade).",
      bullets: [
        "Automação de verificações normativas e rotinas de cálculo.",
        "Arquitetura modular para evoluir legado desktop para soluções web/híbridas.",
        "Banco relacional para histórico, rastreabilidade e reuso.",
        "Base pronta para IA/RAG em consultas técnicas e dados internos.",
      ],
      stack: ["Python", "Flask", "PostgreSQL", "Docker", "TDD", "RAG"],
      tone: "purple",
      href: profile.links.github,
    },
    {
      name: "Automação de Engenharia (Indústria)",
      role: "Python + CAD + Padronização",
      desc: "Automação de rotinas repetitivas que travavam projeto: listas, cálculos, consistência e velocidade de entrega.",
      bullets: [
        "Redução drástica de tempo em tarefas repetitivas e geração de documentos.",
        "Padronização e redução de retrabalho em entregáveis.",
        "Apoio direto a projetos em escala real (montagem e operação).",
      ],
      stack: ["Python", "Excel/VBA", "SolidWorks", "CAD 3D", "Normas"],
      tone: "blue",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: "Mechanical Engineering Student & Full Stack Developer",
    sameAs: [profile.links.github, profile.links.linkedin],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Uberlândia/Araguari",
      addressRegion: "MG",
      addressCountry: "BR",
    },
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-purple-500 selection:text-white">
      <Head>
        <title>Sobre — Luiz Medeiros</title>
        <meta
          name="description"
          content="Engenharia mecânica (UFU) + desenvolvimento full stack. Automação industrial, NBR 8800, Python, Node, Docker, RAG."
        />
        <meta property="og:title" content="Sobre — Luiz Medeiros" />
        <meta
          property="og:description"
          content="Projetista industrial + full stack. Automação de engenharia, Vestra, pesquisa em IA aplicada."
        />
        <meta property="og:type" content="profile" />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      {/* Background glows */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-purple-600/10 blur-3xl" />
        <div className="absolute top-40 right-[-120px] h-[420px] w-[420px] rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute bottom-[-160px] left-[-120px] h-[420px] w-[420px] rounded-full bg-emerald-600/10 blur-3xl" />
      </div>

      {/* Navbar */}
      <nav className="border-b border-slate-800/80 bg-slate-950/80 supports-[backdrop-filter]:bg-slate-950/60 backdrop-blur fixed w-full z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-bold hover:text-purple-400 transition"
          >
            <ArrowLeft className="size-4" /> Voltar para Vitrine
          </Link>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline font-mono text-xs opacity-50">
              LUIZ MEDEIROS / PROFILE
            </span>
            <div className="flex items-center gap-2">
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center size-9 rounded-xl border border-slate-800 bg-slate-950/40 hover:bg-slate-950/70 hover:border-slate-700 transition"
                aria-label="GitHub"
              >
                <Github className="size-4" />
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center size-9 rounded-xl border border-slate-800 bg-slate-950/40 hover:bg-slate-950/70 hover:border-slate-700 transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="size-4" />
              </a>
              <a
                href={profile.links.email}
                className="inline-flex items-center justify-center size-9 rounded-xl border border-slate-800 bg-slate-950/40 hover:bg-slate-950/70 hover:border-slate-700 transition"
                aria-label="Email"
              >
                <Mail className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-28 pb-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-start">
            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge tone="purple">
                  <Code2 className="size-4" /> Full Stack
                </Badge>
                <Badge tone="blue">
                  <Hammer className="size-4" /> Projeto Industrial
                </Badge>
                <Badge tone="green">
                  <Terminal className="size-4" /> Automação Python
                </Badge>
                <Badge tone="red">
                  <Award className="size-4" /> Pesquisa
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.05] tracking-tight">
                Projetista na indústria, <br />
                Engenheiro na UFU, <br />
                <span className="text-purple-400">inovador por natureza.</span>
              </h1>

              <p className="mt-5 text-base md:text-lg text-slate-400 leading-relaxed max-w-2xl">
                {profile.headline}. Eu conecto engenharia mecânica (normas,
                estruturas, CAD/CAE) com software (automação, dados, web) para
                entregar resultado mensurável.
              </p>

              <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
                <MapPin className="size-4" />
                <span>{profile.location}</span>
              </div>

              <blockquote className="mt-8 rounded-3xl border border-slate-800/70 bg-slate-950/30 p-6">
                <p className="text-slate-300 leading-relaxed">
                  “{profile.quote}”
                </p>
                <div className="mt-4 text-xs text-slate-500">
                  — {profile.name}
                </div>
              </blockquote>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#projetos"
                  className="inline-flex items-center gap-2 rounded-2xl bg-purple-600/20 border border-purple-500/30 px-5 py-3 text-sm font-bold text-purple-200 hover:bg-purple-600/25 transition"
                >
                  <Wrench className="size-4" /> Ver projetos
                </a>

                <a
                  href={profile.cv.eng}
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-950/30 px-5 py-3 text-sm font-bold text-slate-200 hover:bg-slate-950/50 hover:border-slate-700 transition"
                >
                  <BookOpen className="size-4" /> Baixar CV (Full Stack)
                </a>

                <a
                  href={profile.cv.fullstack}
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-950/30 px-5 py-3 text-sm font-bold text-slate-200 hover:bg-slate-950/50 hover:border-slate-700 transition"
                >
                  <Terminal className="size-4" /> Baixar CV (Engenharia)
                </a>
              </div>
            </div>

            {/* Right column: stats + mini profile */}
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center gap-4">
                  {/* Avatar opcional (se não tiver, vira iniciais) */}
                  <div className="size-14 rounded-2xl border border-slate-800 bg-slate-950/40 grid place-items-center font-extrabold">
                    LM
                  </div>

                  <div>
                    <div className="font-extrabold leading-tight">
                      {profile.name}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      Engenharia + Software • foco em impacto
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  {highlights.map((s) => (
                    <Stat
                      key={s.label}
                      label={s.label}
                      value={s.value}
                      hint={s.hint}
                    />
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-slate-800/70 bg-slate-950/30 p-4">
                  <div className="text-xs font-bold text-slate-300">
                    Principais frentes
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-slate-400">
                    <li className="flex gap-2">
                      <span className="mt-2 size-1.5 rounded-full bg-purple-500" />
                      Automação de engenharia (Python) + padronização
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-2 size-1.5 rounded-full bg-blue-500" />
                      Projeto industrial (estruturas, CAD 3D)
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-2 size-1.5 rounded-full bg-emerald-500" />
                      Software de cálculo e ferramentas internas (Vestra)
                    </li>
                  </ul>
                </div>
              </Card>

              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="p-5">
                  <div className="text-xs font-bold text-slate-300">
                    Contato
                  </div>
                  <div className="mt-3 space-y-2 text-sm">
                    <a
                      href={profile.links.email}
                      className="flex items-center gap-2 text-slate-300 hover:text-purple-300 transition"
                    >
                      <Mail className="size-4" />
                      Email
                    </a>
                    <a
                      href={profile.links.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-slate-300 hover:text-purple-300 transition"
                    >
                      <Linkedin className="size-4" />
                      LinkedIn
                    </a>
                    <a
                      href={profile.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-slate-300 hover:text-purple-300 transition"
                    >
                      <Github className="size-4" />
                      GitHub
                    </a>
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="text-xs font-bold text-slate-300">
                    Disponibilidade
                  </div>
                  <div className="mt-3 text-sm text-slate-400 leading-relaxed">
                    Remoto disponível • foco em automação industrial, engenharia
                    computacional e plataformas web para indústria.
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Formação + Carreira */}
          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <SectionHeader
                icon={GraduationCap}
                title="Formação"
                subtitle="Base de engenharia mecânica com viés forte em computação aplicada."
                tone="purple"
              />
              <Card className="p-7">
                <Timeline items={formation} tone="purple" />
              </Card>
            </div>

            <div className="space-y-6">
              <SectionHeader
                icon={Briefcase}
                title="Carreira"
                subtitle="Projetos reais + automação + liderança técnica."
                tone="blue"
              />
              <Card className="p-7">
                <Timeline items={career} tone="blue" />
              </Card>
            </div>
          </div>

          {/* Pesquisa */}
          <div className="mt-16 space-y-6">
            <SectionHeader
              icon={Award}
              title="Pesquisa & Publicações"
              subtitle="IA aplicada a integridade estrutural e manutenção."
              tone="red"
            />
            <Card className="p-7">
              <Timeline items={research} tone="purple" />
            </Card>
          </div>

          {/* Projetos */}
          <div id="projetos" className="mt-16 space-y-6 scroll-mt-28">
            <SectionHeader
              icon={Wrench}
              title="Projetos de maior impacto"
              subtitle="Onde eu junto engenharia, automação e software para reduzir tempo, risco e retrabalho."
              tone="green"
            />

            <div className="grid gap-6 lg:grid-cols-2">
              {projects.map((p) => (
                <ProjectCard key={p.name} {...p} />
              ))}
            </div>
          </div>

          {/* Arsenal */}
          <div className="mt-16 space-y-6">
            <SectionHeader
              icon={Terminal}
              title="Arsenal Técnico"
              subtitle="Hard skills de engenharia + stack moderna para construir ferramentas de produção."
              tone="green"
            />

            <div className="grid gap-6 lg:grid-cols-3">
              <PillList
                title="Engenharia & Indústria"
                items={stacks.engenharia}
                icon={Hammer}
              />
              <PillList
                title="Software & Dados"
                items={stacks.software}
                icon={Code2}
              />
              <PillList
                title="Gestão & Soft Skills"
                items={stacks.soft}
                icon={Briefcase}
              />
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16">
            <Card className="p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <div className="text-2xl font-extrabold tracking-tight">
                    Quer transformar gargalos de engenharia em software?
                  </div>
                  <p className="mt-2 text-sm text-slate-400 max-w-2xl">
                    Eu curto problemas com norma, prazo e chão de fábrica. Se a
                    meta é reduzir tempo, padronizar cálculo, automatizar fluxo
                    ou criar uma plataforma interna, bora conversar.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={profile.links.email}
                    className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 px-5 py-3 text-sm font-bold text-emerald-200 hover:bg-emerald-600/25 transition"
                  >
                    <Mail className="size-4" /> Me chama no email
                  </a>
                  <a
                    href={profile.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-950/30 px-5 py-3 text-sm font-bold text-slate-200 hover:bg-slate-950/50 hover:border-slate-700 transition"
                  >
                    <Linkedin className="size-4" /> Conectar
                  </a>
                </div>
              </div>
            </Card>

            <div className="mt-8 text-center text-xs text-slate-600">
              © {new Date().getFullYear()} {profile.name}. Next.js + Tailwind.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
