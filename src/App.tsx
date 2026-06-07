import { useState, useEffect, useRef } from "react";

const NAV_LINKS = [
  { label: "Accueil", href: "#hero" },
  { label: "À propos", href: "#about" },
  { label: "Expériences", href: "#experience" },
  { label: "Formation", href: "#education" },
  { label: "Compétences", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

function useScrollSpy() {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "experience", "education", "skills", "contact"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return active;
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}
    >
      {children}
    </div>
  );
}

function Navbar() {
  const active = useScrollSpy();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#0d1b2a]/95 backdrop-blur-md shadow-2xl" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#hero" className="font-playfair text-xl font-bold text-[#c9a84c] tracking-wide">
          YS<span className="text-white">.</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const id = link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wider uppercase transition-colors duration-200 ${
                  active === id ? "text-[#c9a84c]" : "text-gray-300 hover:text-[#c9a84c]"
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <a
            href="mailto:sabiryoussef1999@gmail.com"
            className="ml-4 px-5 py-2 rounded-full bg-[#c9a84c] text-[#0d1b2a] text-sm font-semibold tracking-wide hover:bg-[#e0c068] transition-colors duration-200"
          >
            Me contacter
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <div className={`w-6 h-0.5 bg-current mb-1.5 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <div className={`w-6 h-0.5 bg-current mb-1.5 transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <div className={`w-6 h-0.5 bg-current transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0d1b2a]/98 border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-[#c9a84c] text-sm font-medium uppercase tracking-wider"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0d1b2a 0%, #1a2f4e 40%, #0d2137 70%, #0a1628 100%)",
      }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-[#c9a84c]/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-blue-600/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#c9a84c]/3 blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(201,168,76,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 py-32">
        {/* Text */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#c9a84c]/40 bg-[#c9a84c]/10 text-[#c9a84c] text-sm font-medium tracking-widest uppercase mb-8">
            <span className="w-2 h-2 rounded-full bg-[#c9a84c] animate-pulse" />
            Disponible pour de nouvelles opportunités
          </div>

          <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white leading-tight mb-4">
            Youssef
            <br />
            <span className="text-[#c9a84c]">SABIR</span>
          </h1>

          <p className="text-xl md:text-2xl text-blue-200 font-light tracking-wide mb-6">
            Chargé Administratif & Juridique
          </p>

          <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-xl mb-10">
            Juriste d'affaires spécialisé en droit et contentieux des affaires, 
            avec une solide expérience en banque, assurance et contrôle interne.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="#experience"
              className="px-8 py-4 rounded-full bg-[#c9a84c] text-[#0d1b2a] font-semibold text-sm tracking-wider uppercase hover:bg-[#e0c068] transition-all duration-300 shadow-lg shadow-[#c9a84c]/20 hover:shadow-[#c9a84c]/40 hover:-translate-y-0.5"
            >
              Voir mon parcours
            </a>
            <a
              href="#contact"
              className="px-8 py-4 rounded-full border border-white/30 text-white font-semibold text-sm tracking-wider uppercase hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all duration-300 hover:-translate-y-0.5"
            >
              Me contacter
            </a>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
            {[
              { value: "3+", label: "Ans d'expérience" },
              { value: "2", label: "Postes occupés" },
              { value: "3", label: "Langues maîtrisées" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold font-playfair text-[#c9a84c]">{stat.value}</div>
                <div className="text-xs text-gray-400 mt-1 leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo */}
        <div className="flex-shrink-0 relative">
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            {/* Decorative ring */}
            <div className="absolute inset-0 rounded-full border-2 border-[#c9a84c]/30 animate-spin-slow" style={{ animationDuration: "20s" }} />
            <div className="absolute -inset-4 rounded-full border border-[#c9a84c]/10" />
            {/* Gold arc */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
              <circle cx="200" cy="200" r="190" fill="none" stroke="#c9a84c" strokeWidth="1" strokeDasharray="80 20" opacity="0.3" />
            </svg>
            {/* Photo container */}
            <div className="absolute inset-4 rounded-full overflow-hidden border-4 border-[#c9a84c]/60 shadow-2xl shadow-[#c9a84c]/20">
              <img
                src="/images/profile.jpg"
                alt="Youssef SABIR"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  target.parentElement!.style.background = "linear-gradient(135deg, #1a2f4e, #0d1b2a)";
                  target.parentElement!.innerHTML += `<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;color:#c9a84c;font-size:80px;font-family:Playfair Display,serif;font-weight:700">YS</div>`;
                }}
              />
            </div>
          </div>

          {/* Floating badges */}
          <div className="absolute -bottom-4 -left-4 bg-[#0d1b2a] border border-[#c9a84c]/40 rounded-2xl px-4 py-3 shadow-xl">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#c9a84c]/20 flex items-center justify-center text-[#c9a84c]">
                ⚖️
              </div>
              <div>
                <div className="text-white text-xs font-semibold">Droit des Affaires</div>
                <div className="text-gray-400 text-xs">Master en cours</div>
              </div>
            </div>
          </div>

          <div className="absolute -top-4 -right-4 bg-[#0d1b2a] border border-[#c9a84c]/40 rounded-2xl px-4 py-3 shadow-xl">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-sm">
                🏦
              </div>
              <div>
                <div className="text-white text-xs font-semibold">BMCI BNP Paribas</div>
                <div className="text-green-400 text-xs">En poste</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500">
        <span className="text-xs tracking-widest uppercase">Défiler</span>
        <div className="w-0.5 h-12 bg-gradient-to-b from-[#c9a84c]/60 to-transparent animate-pulse" />
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-28 bg-[#f8f6f1]">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-[#c9a84c] text-sm font-semibold tracking-[4px] uppercase">Qui suis-je</span>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#0d1b2a] mt-3">
              À propos de moi
            </h2>
            <div className="w-16 h-1 bg-[#c9a84c] mx-auto mt-4 rounded-full" />
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <div className="relative">
              <div className="bg-[#0d1b2a] rounded-3xl p-8 md:p-12 text-white shadow-2xl">
                <div className="text-[#c9a84c] text-6xl font-playfair font-bold opacity-20 leading-none mb-4">"</div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Juriste d'affaires en cours de spécialisation en droit et contentieux des affaires, 
                  avec expérience en banque, assurance et contrôle interne.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Compétences en conformité réglementaire, analyse des risques et relation clientèle. 
                  Passionné par le droit des affaires et la finance, je m'engage à apporter rigueur 
                  et expertise dans chaque mission qui m'est confiée.
                </p>
                <div className="mt-8 pt-8 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#c9a84c]/20 flex items-center justify-center text-[#c9a84c] text-xl">
                      📍
                    </div>
                    <div>
                      <div className="text-white font-semibold">Ain Chok, Casablanca</div>
                      <div className="text-gray-400 text-sm">Maroc</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-[#c9a84c]/20 -z-10" />
              <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full border-2 border-[#c9a84c]/30 -z-10" />
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="space-y-6">
              {/* Contact info */}
              {[
                { icon: "📞", label: "Téléphone", value: "06 96 05 26 64", href: "tel:+212696052664" },
                { icon: "✉️", label: "Email", value: "sabiryoussef1999@gmail.com", href: "mailto:sabiryoussef1999@gmail.com" },
                { icon: "🔗", label: "LinkedIn", value: "linkedin.com/in/youssefsabir", href: "https://linkedin.com/in/youssefsabir" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex items-center gap-5 p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-[#c9a84c]/40 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#0d1b2a]/5 flex items-center justify-center text-2xl group-hover:bg-[#c9a84c]/10 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">{item.label}</div>
                    <div className="text-[#0d1b2a] font-semibold mt-0.5 group-hover:text-[#c9a84c] transition-colors">{item.value}</div>
                  </div>
                </a>
              ))}

              {/* Languages */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-4">
                <h3 className="text-[#0d1b2a] font-semibold mb-4 flex items-center gap-2">
                  <span>🌍</span> Langues
                </h3>
                <div className="space-y-3">
                  {[
                    { lang: "Arabe", level: "Maternelle", pct: 100 },
                    { lang: "Français", level: "Bilingue", pct: 95 },
                    { lang: "Anglais", level: "Professionnel", pct: 75 },
                  ].map((l) => (
                    <div key={l.lang}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-[#0d1b2a]">{l.lang}</span>
                        <span className="text-gray-400">{l.level}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#0d1b2a] to-[#c9a84c] rounded-full"
                          style={{ width: `${l.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const experiences = [
    {
      title: "Chargé de clientèle bancaire",
      company: "BMCI Groupe BNP Paribas",
      period: "2024 – Actuel",
      type: "CDI",
      color: "#00a651",
      icon: "🏦",
      tasks: [
        "Gestion des opérations bancaires et caisse",
        "Relation et fidélisation clientèle",
        "Application des procédures réglementaires",
      ],
    },
    {
      title: "Contrôleur interne",
      company: "Maroc Finance SARL",
      period: "2022 – 2024",
      type: "CDD",
      color: "#c9a84c",
      icon: "🔍",
      tasks: [
        "Contrôle de conformité et gestion des risques",
        "Participation au dispositif LBC/FT",
        "Reporting et suivi des actions correctives",
      ],
    },
  ];

  return (
    <section id="experience" className="py-28 bg-[#0d1b2a]">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-[#c9a84c] text-sm font-semibold tracking-[4px] uppercase">Parcours professionnel</span>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mt-3">
              Expériences
            </h2>
            <div className="w-16 h-1 bg-[#c9a84c] mx-auto mt-4 rounded-full" />
          </div>
        </AnimatedSection>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#c9a84c]/60 via-[#c9a84c]/20 to-transparent -translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp) => (
              <AnimatedSection key={exp.title}>
                <div className="relative flex flex-col md:flex-row gap-8 items-start">
                  {/* Content */}
                  <div className="flex-1 ml-16 md:ml-0">
                    <div className="bg-white/5 backdrop-blur rounded-3xl p-8 border border-white/10 hover:border-[#c9a84c]/30 transition-all duration-300 hover:bg-white/8 group">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <span
                            className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
                            style={{ backgroundColor: `${exp.color}20`, color: exp.color }}
                          >
                            {exp.type}
                          </span>
                          <h3 className="text-white font-bold text-xl font-playfair">{exp.title}</h3>
                          <p className="text-[#c9a84c] font-medium mt-1">{exp.company}</p>
                        </div>
                        <div className="text-3xl">{exp.icon}</div>
                      </div>

                      <div className="flex items-center gap-2 text-gray-400 text-sm mb-6">
                        <span>📅</span>
                        <span>{exp.period}</span>
                      </div>

                      <ul className="space-y-3">
                        {exp.tasks.map((task) => (
                          <li key={task} className="flex items-start gap-3 text-gray-300 text-sm">
                            <div className="w-5 h-5 rounded-full bg-[#c9a84c]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
                            </div>
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-8 w-4 h-4 rounded-full border-2 border-[#c9a84c] bg-[#0d1b2a] z-10 shadow-lg shadow-[#c9a84c]/30" />

                  {/* Empty spacer for alternating */}
                  <div className="hidden md:block flex-1" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Education() {
  const edu = [
    {
      degree: "Master Droit et Contentieux des Affaires",
      school: "Université Hassan II Mohammedia",
      period: "2024 – Actuel",
      status: "En cours",
      icon: "🎓",
    },
    {
      degree: "Licence en Droit Privé",
      school: "Université Hassan 1er Settat",
      period: "2019 – 2021",
      status: "Obtenu",
      icon: "📜",
    },
  ];

  return (
    <section id="education" className="py-28 bg-[#f8f6f1]">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-[#c9a84c] text-sm font-semibold tracking-[4px] uppercase">Parcours académique</span>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#0d1b2a] mt-3">
              Formation
            </h2>
            <div className="w-16 h-1 bg-[#c9a84c] mx-auto mt-4 rounded-full" />
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {edu.map((e) => (
            <AnimatedSection key={e.degree}>
              <div className="relative bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#c9a84c]/30 transition-all duration-300 group overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#0d1b2a]/3 rounded-bl-full" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#c9a84c]/5 rounded-tr-full" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-[#0d1b2a] flex items-center justify-center text-3xl shadow-lg">
                      {e.icon}
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        e.status === "En cours"
                          ? "bg-green-100 text-green-700"
                          : "bg-[#c9a84c]/15 text-[#8a6e20]"
                      }`}
                    >
                      {e.status}
                    </span>
                  </div>

                  <h3 className="font-playfair font-bold text-xl text-[#0d1b2a] mb-2 leading-tight">
                    {e.degree}
                  </h3>
                  <p className="text-[#c9a84c] font-semibold text-sm mb-3">{e.school}</p>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <span>📅</span>
                    <span>{e.period}</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const skills = [
    { name: "Esprit juriste", icon: "⚖️", desc: "Analyse et raisonnement juridique approfondi" },
    { name: "Gestion du risque", icon: "🛡️", desc: "Identification et maîtrise des risques opérationnels" },
    { name: "Analyse réglementaire", icon: "📋", desc: "Veille et conformité aux normes en vigueur" },
    { name: "Rédaction juridique", icon: "✍️", desc: "Rédaction de documents et actes juridiques" },
    { name: "Esprit d'équipe", icon: "🤝", desc: "Collaboration et dynamique de groupe" },
    { name: "Outils informatiques", icon: "💻", desc: "Maîtrise des outils bureautiques et logiciels" },
  ];

  const domains = [
    { label: "Conformité LBC/FT", pct: 90 },
    { label: "Droit bancaire", pct: 85 },
    { label: "Contrôle interne", pct: 88 },
    { label: "Contentieux des affaires", pct: 80 },
    { label: "Relation clientèle", pct: 92 },
    { label: "Analyse des risques", pct: 87 },
  ];

  return (
    <section id="skills" className="py-28 bg-[#0d1b2a]">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-[#c9a84c] text-sm font-semibold tracking-[4px] uppercase">Savoir-faire</span>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mt-3">
              Compétences
            </h2>
            <div className="w-16 h-1 bg-[#c9a84c] mx-auto mt-4 rounded-full" />
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Skill cards */}
          <AnimatedSection>
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-[#c9a84c]/40 hover:bg-white/8 transition-all duration-300 group"
                >
                  <div className="text-3xl mb-3">{skill.icon}</div>
                  <h3 className="text-white font-semibold text-sm mb-1">{skill.name}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{skill.desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Progress bars */}
          <AnimatedSection>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <h3 className="text-white font-bold font-playfair text-xl mb-8">Domaines d'expertise</h3>
              <div className="space-y-6">
                {domains.map((d) => (
                  <div key={d.label}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300 font-medium">{d.label}</span>
                      <span className="text-[#c9a84c] font-bold">{d.pct}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#c9a84c] to-[#e8d080] transition-all duration-1000"
                        style={{ width: `${d.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mailto fallback
    window.location.href = `mailto:sabiryoussef1999@gmail.com?subject=Contact de ${form.name}&body=${encodeURIComponent(form.message)}%0A%0ADe: ${form.email}`;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="py-28 bg-[#f8f6f1]">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-[#c9a84c] text-sm font-semibold tracking-[4px] uppercase">Travaillons ensemble</span>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#0d1b2a] mt-3">
              Me contacter
            </h2>
            <div className="w-16 h-1 bg-[#c9a84c] mx-auto mt-4 rounded-full" />
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {/* Left side */}
          <AnimatedSection>
            <div>
              <p className="text-gray-600 text-lg leading-relaxed mb-10">
                Vous avez une opportunité à me proposer ou souhaitez échanger sur une collaboration ?
                N'hésitez pas à me contacter, je vous répondrai dans les plus brefs délais.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: "📞",
                    title: "Téléphone",
                    value: "06 96 05 26 64",
                    href: "tel:+212696052664",
                    color: "bg-blue-50 text-blue-600",
                  },
                  {
                    icon: "✉️",
                    title: "Email",
                    value: "sabiryoussef1999@gmail.com",
                    href: "mailto:sabiryoussef1999@gmail.com",
                    color: "bg-orange-50 text-orange-600",
                  },
                  {
                    icon: "🔗",
                    title: "LinkedIn",
                    value: "linkedin.com/in/youssefsabir",
                    href: "https://linkedin.com/in/youssefsabir",
                    color: "bg-blue-50 text-blue-700",
                  },
                  {
                    icon: "📍",
                    title: "Localisation",
                    value: "Ain Chok, Casablanca, Maroc",
                    href: "#",
                    color: "bg-red-50 text-red-600",
                  },
                ].map((c) => (
                  <a
                    key={c.title}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <div className={`w-12 h-12 rounded-xl ${c.color} flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      {c.icon}
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">{c.title}</div>
                      <div className="text-[#0d1b2a] font-semibold group-hover:text-[#c9a84c] transition-colors">{c.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection>
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#0d1b2a] mb-2">Nom complet</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20 transition-all text-sm"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0d1b2a] mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20 transition-all text-sm"
                  placeholder="votre@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0d1b2a] mb-2">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20 transition-all text-sm resize-none"
                  placeholder="Votre message..."
                />
              </div>
              <button
                type="submit"
                className={`w-full py-4 rounded-xl font-semibold text-sm tracking-wider uppercase transition-all duration-300 ${
                  sent
                    ? "bg-green-500 text-white"
                    : "bg-[#0d1b2a] text-white hover:bg-[#c9a84c] hover:text-[#0d1b2a]"
                }`}
              >
                {sent ? "✓ Message envoyé !" : "Envoyer le message"}
              </button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0a1221] py-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-playfair text-[#c9a84c] font-bold text-xl">
          Youssef SABIR<span className="text-white">.</span>
        </div>
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} — Chargé Administratif & Juridique · Casablanca, Maroc
        </p>
        <a
          href="https://linkedin.com/in/youssefsabir"
          target="_blank"
          rel="noreferrer"
          className="text-gray-400 hover:text-[#c9a84c] transition-colors text-sm"
        >
          LinkedIn →
        </a>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        .font-playfair { font-family: 'Playfair Display', Georgia, serif; }
        html { scroll-behavior: smooth; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
      `}</style>
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Education />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}
