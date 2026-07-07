import { createFileRoute, Link } from "@tanstack/react-router";
import { ContactForm } from "@/components/ContactForm";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { PROJECTS as PROJECT_LIST, CATEGORIES, type Project } from "@/data/projects";
import {
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import mainPhoto from "@/assets/sanket-main.jpg.asset.json";
import aboutPhoto from "@/assets/sanket-about.jpg.asset.json";
import shot1 from "@/assets/sanket-shot1.jpg.asset.json";
import shot3 from "@/assets/sanket-shot3.jpg.asset.json";
import jCode from "@/assets/journey-code.jpg.asset.json";
import jProduct from "@/assets/journey-product.jpg.asset.json";
import jCs from "@/assets/journey-cs.jpg.asset.json";
import jMath from "@/assets/journey-math.jpg.asset.json";
import heroWallpaper from "@/assets/hero-wallpaper.jpg.asset.json";
import contactBg from "@/assets/contact-bg.jpg.asset.json";

const Github = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.76.41-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.04 11.04 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.27 5.68.42.36.79 1.08.79 2.18v3.23c0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);
const Linkedin = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
  </svg>
);
const Twitter = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.16 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
  </svg>
);
const Instagram = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "D Sanket — Full-Stack Software Engineer & Designer" },
      {
        name: "description",
        content:
          "D Sanket is a full-stack engineer in Bengaluru building fast, scalable, beautifully made web products with React, Spring Boot, and a designer's eye for craft.",
      },
      { property: "og:title", content: "D Sanket — Full-Stack Engineer" },
      { property: "og:description", content: "Portfolio of D Sanket — React, Spring Boot, design-led engineering from Bengaluru." },
      { property: "og:image", content: mainPhoto.url },
    ],
  }),
  component: Portfolio,
});

/* ---------- data ---------- */

const SKILLS_MARQUEE = [
  "React", "TypeScript", "Spring Boot", "Java", "Tailwind",
  "MySQL", "Firebase", "Docker", "Figma", "JavaScript",
  "REST APIs", "Git",
];

const STACKS = [
  { label: "Frontend", items: [["React", 92],["JavaScript", 88],["Tailwind", 92],["HTML / CSS", 95],["Bootstrap", 86]] as const },
  { label: "Backend",  items: [["Java", 92],["Spring Boot", 88],["MySQL", 85],["Firebase", 82],["Python", 75]] as const },
  { label: "Design",   items: [["Figma", 90],["UI / UX", 88],["Photoshop", 85],["Lightroom", 85],["API Design", 88]] as const },
];

const SERVICES = [
  { n: "01", t: "Web Development", b: "Production-grade React + Spring Boot apps. Type-safe, tested, deployed.", tags: ["React", "Spring Boot", "Vite"] },
  { n: "02", t: "UI / UX Design",  b: "Editorial, motion-led interfaces. From wireframe to ready-for-handoff in Figma.", tags: ["Figma", "Motion", "Systems"] },
  { n: "03", t: "API & Systems",   b: "REST and event-driven APIs, schema design, performance and observability.", tags: ["REST", "MySQL", "Docker"] },
  { n: "04", t: "Brand & Visuals", b: "Identity, typography, photo retouching — the visual layer for digital products.", tags: ["Identity", "Photo", "Type"] },
];

// Projects come from shared data so the index list and detail pages stay in sync.


const JOURNEY: Array<{
  when: string;
  year: string;
  role: string;
  org: string;
  city: string;
  tag: string;
  notes: string;
  image: string;
  highlights: string[];
  stack: string[];
}> = [
  {
    when: "Feb 2025 — present",
    year: "2025",
    role: "Full-Stack Developer",
    org: "Swajyot Technologies",
    city: "Bengaluru",
    tag: "Work",
    notes:
      "Shipping responsive React + Spring Boot applications. Owning UI/UX details, API design and cloud deployment.",
    image: jCode.url,
    highlights: [
      "Led the redesign of internal tools — 40% faster task completion",
      "Designed REST APIs powering 6+ production modules",
      "Set up CI/CD and shaved 50% off deploy time",
    ],
    stack: ["React", "Spring Boot", "MySQL", "Docker"],
  },
  {
    when: "Oct — Nov 2023",
    year: "2023",
    role: "Innovation & Entrepreneurship Intern",
    org: "Novel Sky Technologies",
    city: "Bengaluru",
    tag: "Internship",
    notes:
      "Product thinking, design innovation and the entrepreneurial mindset behind building real IT products.",
    image: jProduct.url,
    highlights: [
      "Built rapid product concepts end-to-end in a week",
      "Pitched 2 prototypes to mentors and senior engineers",
      "Learned how real teams ship under real constraints",
    ],
    stack: ["Product", "Design", "Prototyping"],
  },
  {
    when: "2021 — 2025",
    year: "2021",
    role: "BE, Computer Science & Engineering",
    org: "VTU University",
    city: "Bengaluru",
    tag: "Education",
    notes:
      "Strong fundamentals in programming, algorithms, systems and modern software engineering.",
    image: jCs.url,
    highlights: [
      "Built 10+ academic & personal projects — web, ML, systems",
      "Specialised in full-stack engineering and human-centred design",
      "Graduated with a strong portfolio of shipped work",
    ],
    stack: ["Java", "Python", "DSA", "DBMS"],
  },
  {
    when: "2019 — 2021",
    year: "2019",
    role: "Pre-University — Science",
    org: "Shree Guru Vidya Peetha",
    city: "Gulbarga",
    tag: "Education",
    notes:
      "Physics, Chemistry, Mathematics — the quiet years that built the discipline behind the craft.",
    image: jMath.url,
    highlights: [
      "Built the maths and physics foundation that engineering rests on",
      "Discovered programming through after-school tinkering",
      "Decided computing was the path forward",
    ],
    stack: ["PCM", "Foundations"],
  },
];

const NAV = [
  ["index", "#top"],
  ["work", "#work"],
  ["services", "#services"],
  ["about", "#about"],
  ["journey", "#journey"],
  ["contact", "#contact"],
] as const;

/* ---------- page ---------- */

function Portfolio() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.4 });
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      
      <motion.div
        style={{ scaleX: progress, transformOrigin: "0% 50%" }}
        className="fixed left-0 right-0 top-0 z-[60] h-[3px] bg-ember"
      />
      <Nav />
      <main className="relative">
        <Hero />
        <Marquee />
        <Manifesto />
        <Services />
        <Principles />
        <Gallery />
        <Work />
        <Quotes />
        <Craft />
        <About />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

/* ---------- nav ---------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      className={`group/nav fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border/60 bg-background/95 text-foreground shadow-sm"
          : "border-b border-transparent text-paper"
      }`}
    >
      <div className="mx-auto flex max-w-[1480px] items-center justify-between px-6 py-4 lg:px-12">
        <a href="#top" className="flex items-center gap-3" data-cursor="home">
          <span className={`grid h-9 w-9 place-items-center rounded-full transition-colors ${scrolled ? "bg-foreground text-paper" : "bg-paper text-ink"}`}>
            <span className="font-display text-lg leading-none">ds</span>
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-base">D Sanket</span>
            <span className={`font-mono-label ${scrolled ? "text-muted-foreground" : "text-paper/60"}`}>
              Software Engineer · IND
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className={`group relative rounded-full px-4 py-2 text-sm transition-colors ${scrolled ? "text-foreground/80 hover:text-foreground" : "text-paper/80 hover:text-paper"}`}
            >
              {label}
              <span className="pointer-events-none absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-ember transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          data-cursor="say hi"
          className={`group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm transition-all ${scrolled ? "bg-foreground text-paper hover:bg-ember" : "bg-paper text-ink hover:bg-ember hover:text-paper"}`}
        >
          Let&apos;s talk
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </header>
  );
}

/* ---------- hero ---------- */

function Hero() {
  return (
    <section
      id="top"
      className="relative isolate min-h-[88svh] w-full overflow-hidden bg-ink text-paper sm:min-h-[92svh]"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <img
          src={heroWallpaper.url}
          alt=""
          className="h-full w-full object-cover object-center"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/72 via-ink/30 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/78 via-transparent to-paper/10" />
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(circle at 76% 18%, rgba(232,168,96,0.28), transparent 24%), radial-gradient(circle at 18% 72%, rgba(70,105,190,0.22), transparent 28%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,240,220,0.35) 1px, transparent 0)",
            backgroundSize: "3px 3px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(0,0,0,0.48))]" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto flex min-h-[88svh] max-w-[1520px] flex-col justify-center px-6 pb-18 pt-20 sm:min-h-[92svh] sm:pt-24 lg:px-14 lg:pt-24"
      >
        <div className="max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-5 flex flex-wrap items-center gap-3 font-mono-label text-paper/72 sm:mb-7"
          >
            <span className="h-px w-10 bg-ember" />
            <span>Full-stack Engineer · UI craft · Bengaluru</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(3.25rem,11vw,9.2rem)] leading-[0.9] text-paper drop-shadow-[0_18px_50px_rgba(0,0,0,0.35)]"
          >
            Fast <em className="italic text-ember-soft">software.</em>
            <br />
            Sharp <em className="italic text-ember-soft">interfaces.</em>
            <br />
            Built <span className="relative inline-block">to ship.<span className="absolute -bottom-1 left-0 h-[3px] w-full bg-ember" /></span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.35 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-paper/82 sm:mt-7 sm:text-xl"
          >
            I&apos;m Sanket — I turn product ideas into clean, performant web experiences with React, Spring Boot, and a designer&apos;s eye for the details users feel.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.48 }}
            className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4"
          >
            <Magnetic>
              <a
                href="#work"
                className="group inline-flex items-center gap-3 rounded-full bg-paper px-6 py-3.5 text-sm text-ink transition-all hover:bg-ember hover:text-paper"
              >
                View my work
                <span className="grid h-6 w-6 place-items-center rounded-full bg-ink/10 transition-transform group-hover:rotate-45 group-hover:bg-paper/20">
                  <ArrowUpRight className="h-3 w-3" />
                </span>
              </a>
            </Magnetic>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full border border-paper/25 bg-paper/8 px-5 py-3.5 text-sm text-paper transition-colors hover:border-paper/70 hover:bg-paper/12"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-moss opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-moss" />
              </span>
              Available Q3 · 2026
            </a>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.6 }}
        className="absolute inset-x-0 bottom-0 z-10 hidden sm:block"
      >
        <div className="mx-6 h-px bg-paper/15 lg:mx-14" />
        <div className="mx-auto flex max-w-[1520px] flex-wrap items-center justify-between gap-4 px-6 py-5 lg:px-14">
          <p className="font-mono-label text-paper/70">
            Crafting web experiences where code meets composition
          </p>
          <div className="flex items-center gap-5 text-paper/70">
            <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub" className="transition-colors hover:text-paper">
              <Github className="h-4 w-4" />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-paper">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram" className="transition-colors hover:text-paper">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="X" className="transition-colors hover:text-paper">
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}


function Stat({ n, l }: { n: string; l: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [val, setVal] = useState("0");
  useEffect(() => {
    const target = parseFloat(n);
    if (Number.isNaN(target)) { setVal(n); return; }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      const dur = 1400; const start = performance.now();
      const suffix = n.replace(/[\d.]/g, "");
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        const cur = (target * eased);
        setVal((Number.isInteger(target) ? Math.round(cur) : cur.toFixed(1)) + suffix);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      io.disconnect();
    }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [n]);
  return (
    <div>
      <p ref={ref} className="font-display text-3xl text-foreground sm:text-4xl tabular-nums">{val}</p>
      <p className="font-mono-label mt-1 text-muted-foreground">{l}</p>
    </div>
  );
}

function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode; }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      data-cursor={label.toLowerCase()}
      className="grid h-9 w-9 place-items-center rounded-full text-foreground/70 transition-all hover:bg-foreground hover:text-paper"
    >
      {children}
    </a>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number; }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

function Magnetic({ children }: { children: React.ReactNode }) {
  return <span className="inline-block">{children}</span>;
}

/* ---------- marquee ---------- */

function Marquee() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-foreground py-8 text-paper">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...SKILLS_MARQUEE, ...SKILLS_MARQUEE].map((s, i) => (
          <span key={i} className="mx-8 flex items-center gap-8">
            <span className="font-display text-3xl md:text-4xl">{s}</span>
            <span className="text-ember">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* ---------- services ---------- */

function Services() {
  return (
    <section id="services" className="relative py-28 lg:py-40">
      <div className="mx-auto max-w-[1480px] px-6 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel n="00" title="services" />
            <h2 className="mt-8 max-w-3xl font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
              What I do, <em className="italic text-ember">end-to-end.</em>
            </h2>
          </div>
          <p className="max-w-xs text-muted-foreground">
            Design, engineering and the messy work between them. One person, one stack, one quality bar.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.n} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ s, i }: { s: (typeof SERVICES)[number]; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-[28px] border border-border bg-card p-8 transition-all hover:border-ember/50 lg:p-10"
      data-cursor="explore"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-ember/0 transition-colors duration-500 group-hover:bg-ember/80" />
      <div className="flex items-start justify-between">
        <span className="font-mono-label text-ember">{s.n}</span>
        <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ember" />
      </div>
      <h3 className="mt-8 font-display text-4xl leading-[1.05] sm:text-5xl">
        {s.t}
      </h3>
      <p className="mt-5 text-muted-foreground">{s.b}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {s.tags.map((t) => (
          <span key={t} className="font-mono-label rounded-full border border-border bg-background px-3 py-1 text-muted-foreground">{t}</span>
        ))}
      </div>
    </motion.div>
  );
}

/* ---------- gallery ---------- */

function Gallery() {
  const frames = [
    { src: shot1.url, label: "portrait · 2024", caption: "Light is a co-author." },
    { src: jCode.url, label: "the editor · 2025", caption: "Where the work happens." },
    { src: aboutPhoto.url, label: "off-camera · 2024", caption: "Between the deadlines." },
    { src: jProduct.url, label: "process · 2024", caption: "Always sketching first." },
    { src: shot3.url, label: "frame · 2023", caption: "An eye for composition." },
  ];
  return (
    <section className="relative overflow-hidden bg-card py-24 lg:py-36">
      <div className="mx-auto max-w-[1480px] px-6 lg:px-12">
        <SectionLabel n="01" title="frames" />
        <div className="mt-8 grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
          <h2 className="lg:col-span-7 font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
            Off the keyboard, <em className="italic text-ember">a few frames.</em>
          </h2>
          <p className="lg:col-span-4 lg:col-start-9 text-muted-foreground">
            Light is a co-author. Photography keeps my eye for composition sharp — the same instinct shows up in interfaces.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-4 md:gap-6">
          {frames.map((f, i) => {
            const layouts = [
              "col-span-7 md:col-span-5 aspect-[3/4]",
              "col-span-5 md:col-span-4 aspect-[3/4] mt-16",
              "col-span-12 md:col-span-3 aspect-[3/4] md:mt-32",
              "col-span-6 md:col-span-4 aspect-[4/3] md:col-start-2",
              "col-span-6 md:col-span-5 aspect-[4/3] md:mt-12",
            ];
            return (
              <motion.figure
                key={f.label}
                className={`group relative overflow-hidden rounded-[20px] border border-border bg-paper ${layouts[i]}`}
              >
                <img
                  src={f.src}
                  alt={f.caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent p-4 text-paper opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="font-mono-label text-paper/85">{f.label}</span>
                  <span className="text-sm">{f.caption}</span>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}


/* ---------- work ---------- */

function Work() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]["id"]>("all");
  const filtered = useMemo(
    () => (filter === "all" ? PROJECT_LIST : PROJECT_LIST.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <section id="work" className="relative py-28 lg:py-40">
      <div className="mx-auto max-w-[1480px] px-6 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel n="02" title="selected work" />
            <h2 className="mt-8 max-w-2xl font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
              Things I've <em className="italic text-ember">actually shipped.</em>
            </h2>
          </div>
          <p className="max-w-xs text-muted-foreground">
            Ten projects, end-to-end. Click any line for the full story, stack, metrics and live links.
          </p>
        </div>

        {/* category filter */}
        <div className="mt-12 flex flex-wrap items-center gap-2">
          {CATEGORIES.map((c) => {
            const active = filter === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                data-cursor="filter"
                className={`group relative overflow-hidden rounded-full border px-4 py-2 text-sm transition-all ${
                  active
                    ? "border-foreground bg-foreground text-paper"
                    : "border-border bg-card text-foreground/80 hover:border-ember/60 hover:text-foreground"
                }`}
              >
                <span className="relative z-10">{c.label}</span>
                <span className="font-mono-label relative z-10 ml-2 opacity-60">
                  {c.id === "all" ? PROJECT_LIST.length : PROJECT_LIST.filter((p) => p.category === c.id).length}
                </span>
              </button>
            );
          })}
        </div>

        <ul className="mt-10 border-t border-border">
          {filtered.map((p, i) => (
            <ProjectRow key={p.slug} p={p} i={i} />
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <a
            href="https://github.com/dsanket45"
            target="_blank"
            rel="noreferrer"
            data-cursor="github"
            className="group inline-flex items-center gap-2 rounded-full border border-foreground px-6 py-3 text-sm transition-all hover:bg-foreground hover:text-paper"
          >
            More on GitHub
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

function ProjectRow({ p, i }: { p: Project; i: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0, on: false });

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group relative border-b border-border"
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top, on: true });
      }}
      onMouseLeave={() => setPos((s) => ({ ...s, on: false }))}
    >
      <Link
        to="/projects/$slug"
        params={{ slug: p.slug }}
        data-cursor="case study"
        className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-6 py-8 transition-colors sm:grid-cols-[60px_minmax(0,1fr)_auto_auto] sm:gap-10 sm:py-10"
      >
        <span className="font-mono-label text-muted-foreground">{p.n}</span>

        <div className="min-w-0">
          <h3 className="truncate font-display text-3xl transition-colors group-hover:text-ember sm:text-4xl lg:text-5xl">
            {p.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">{p.kind} · {p.year}</p>
        </div>

        {/* mobile thumbnail */}
        <div className="aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-xl border border-border sm:hidden">
          <img src={p.cover} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        </div>

        <div className="hidden max-w-md text-sm leading-relaxed text-muted-foreground lg:block">
          {p.blurb}
        </div>

        <span className="hidden sm:grid h-12 w-12 shrink-0 place-items-center rounded-full border border-border transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:border-ember group-hover:bg-ember group-hover:text-paper">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </Link>

      <div className="flex flex-wrap gap-2 pb-6 sm:pl-[100px]">
        {p.tags.map((t: string) => (
          <span key={t} className="font-mono-label rounded-full border border-border bg-card px-3 py-1 text-muted-foreground">{t}</span>
        ))}
      </div>

      {/* floating preview that follows cursor */}
      <motion.div
        animate={{ opacity: pos.on ? 1 : 0, scale: pos.on ? 1 : 0.85 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ left: pos.x, top: pos.y, x: "-50%", y: "-50%" }}
        className={`pointer-events-none absolute z-10 hidden h-56 w-80 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-border shadow-2xl lg:block`}
      >
        <img src={p.cover} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className={`absolute inset-0 bg-gradient-to-br ${p.color} mix-blend-multiply`} />
        <div className="relative flex h-full flex-col justify-between p-5 text-paper">
          <span className="font-mono-label">{p.n} · {p.year}</span>
          <div>
            <p className="font-display text-2xl drop-shadow">{p.title}</p>
            <p className="font-mono-label mt-1 opacity-80">{p.kind}</p>
          </div>
        </div>
      </motion.div>

      <div className="pointer-events-none absolute inset-0 -z-10 origin-left scale-x-0 bg-ember/[0.05] transition-transform duration-500 group-hover:scale-x-100" />
    </motion.li>
  );
}


/* ---------- craft / skills ---------- */

function Craft() {
  return (
    <section id="craft" className="relative bg-card py-28 lg:py-40">
      <div className="mx-auto max-w-[1480px] px-6 lg:px-12">
        <SectionLabel n="03" title="the craft" />
        <h2 className="mt-8 max-w-3xl font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
          Tools sharpened. <em className="italic text-ember">Often.</em>
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6">
          {STACKS.map((s) => (
            <div key={s.label} className="rounded-3xl border border-border bg-background p-8">
              <p className="font-mono-label text-ember">{s.label}</p>
              <ul className="mt-6 space-y-5">
                {s.items.map(([name, pct]) => <SkillBar key={name} name={name} pct={pct} />)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillBar({ name, pct }: { name: string; pct: number }) {
  return (
    <li>
      <div className="flex items-baseline justify-between">
        <span className="font-display text-xl">{name}</span>
        <span className="font-mono-label text-muted-foreground">{pct}</span>
      </div>
      <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-secondary">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-full bg-foreground"
        />
      </div>
    </li>
  );
}

/* ---------- about ---------- */

function About() {
  return (
    <section id="about" className="relative py-24 lg:py-36">
      <div className="mx-auto max-w-[1480px] px-6 lg:px-12">
        <SectionLabel n="04" title="about" />

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] border border-border bg-card shadow-[0_28px_90px_-55px_rgba(0,0,0,0.45)]">
                <img
                  src={mainPhoto.url}
                  alt="D Sanket portrait"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-center"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 text-paper">
                  <p className="font-display text-3xl leading-none">D Sanket</p>
                  <p className="font-mono-label text-paper/75">BLR · IN</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="font-mono-label text-muted-foreground">portrait / profile</p>
                <p className="font-mono-label text-muted-foreground">engineer + designer</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="font-display text-3xl leading-[1.15] sm:text-4xl lg:text-5xl">
              I'm a full-stack engineer who treats the{" "}
              <em className="italic text-ember">last 10%</em> of polish as the
              first priority — the spacing, the timing, the empty state nobody
              asked for.
            </p>

            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <Block title="What I do" body="Design and build production web apps end-to-end. From schema and APIs in Spring Boot, to component systems and motion in React + Tailwind, to deploy and observe." />
              <Block title="How I work" body="Small, opinionated, fast. Ship a real thing in week one. Then sharpen it with the people who'll actually use it." />
              <Block title="Where I'm based" body="Bengaluru, India. Working with teams and founders across IN, EU and US time zones." />
              <Block title="What I'm reading" body="Right now: refining design systems, learning more about distributed systems, sketching side projects on paper." />
            </div>

            <div className="mt-12 flex flex-wrap gap-2">
              {["Problem solver", "Team player", "Fast learner", "Pixel obsessive", "API-first"].map((t) => (
                <span key={t} className="rounded-full border border-border bg-card px-4 py-2 text-sm">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div className="border-t border-border pt-5">
      <p className="font-mono-label text-ember">{title}</p>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

/* ---------- journey ---------- */

function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineScale = useTransform(scrollYProgress, [0.06, 0.92], [0, 1]);
  const lineSpring = useSpring(lineScale, { stiffness: 90, damping: 26, mass: 0.5 });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  const [active, setActive] = useState(0);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    itemRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const activeItem = JOURNEY[active] ?? JOURNEY[0];
  const total = JOURNEY.length;

  const scrollTo = (i: number) => {
    itemRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative overflow-hidden bg-card py-24 lg:py-36"
    >
      {/* ambient washes */}
      <div className="pointer-events-none absolute inset-0 paper-grain opacity-40" />
      <div className="pointer-events-none absolute -top-32 left-[5%] h-[520px] w-[520px] rounded-full bg-ember/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-[-12%] h-[520px] w-[520px] rounded-full bg-cobalt/10 blur-3xl" />

      {/* terminal-style top tape */}
      <div className="relative mx-auto mb-12 max-w-[1480px] overflow-hidden border-y border-border/60 bg-paper/40 px-6 py-2.5 backdrop-blur-sm lg:px-12">
        <div className="flex items-center gap-4 font-mono-label text-muted-foreground">
          <span className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-ember/80" />
            <span className="h-2 w-2 rounded-full bg-clay/80" />
            <span className="h-2 w-2 rounded-full bg-moss/70" />
          </span>
          <span className="text-foreground">~ / chapters.log</span>
          <span className="hidden text-muted-foreground sm:inline">— git log --oneline --since="2019"</span>
          <span className="ml-auto text-ember">● live</span>
        </div>
      </div>

      <div className="relative mx-auto max-w-[1480px] px-6 lg:px-12">
        {/* heading */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel n="05" title="journey" />
            <h2 className="mt-8 max-w-3xl font-display text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
              A short path, <em className="italic text-ember">walked carefully.</em>
            </h2>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              From classrooms in Gulbarga to engineering rooms in Bengaluru — a
              timeline of the work, the studies, and the small decisions that
              compounded.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 text-right sm:gap-10">
            {[
              ["4+", "chapters"],
              ["10+", "shipped"],
              ["2026", "current"],
            ].map(([v, l]) => (
              <div key={l}>
                <p className="font-display text-3xl text-ember sm:text-4xl">{v}</p>
                <p className="mt-1 font-mono-label text-[10px] text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── DESKTOP ── */}
        <div className="mt-20 hidden lg:grid lg:grid-cols-12 lg:gap-12">
          {/* sticky aside */}
          <aside className="lg:col-span-5">
            <div className="sticky top-24">
              {/* meta line */}
              <div className="flex items-center gap-3 font-mono-label text-muted-foreground">
                <span className="text-ember">›</span>
                <span>chapter</span>
                <span className="text-foreground">
                  {String(active + 1).padStart(2, "0")}
                </span>
                <span>of {String(total).padStart(2, "0")}</span>
                <span className="ml-auto h-px flex-1 bg-border" />
              </div>

              {/* monospace giant year with cursor */}
              <div className="relative mt-5 h-[9.5rem] overflow-hidden">
                {JOURNEY.map((j, i) => (
                  <motion.div
                    key={j.year + i}
                    initial={false}
                    animate={{
                      y: i === active ? "0%" : i < active ? "-110%" : "110%",
                      opacity: i === active ? 1 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 120, damping: 22 }}
                    className="absolute inset-0 flex items-end gap-2 font-mono text-[8.5rem] leading-none tracking-tight text-foreground"
                  >
                    <span>{j.year}</span>
                    <span className="mb-3 inline-block h-[0.85em] w-[0.12em] bg-ember animate-blink" />
                  </motion.div>
                ))}
              </div>

              {/* tag + when */}
              <motion.div
                key={activeItem.role}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-4 flex items-center gap-3"
              >
                <span className="rounded-full bg-ember/10 px-3 py-1 font-mono-label text-ember">
                  {activeItem.tag}
                </span>
                <span className="font-mono-label text-muted-foreground">
                  {activeItem.when}
                </span>
              </motion.div>

              {/* image with grid + scanline + duotone tint */}
              <div className="relative mt-6 aspect-[5/6] overflow-hidden rounded-3xl border border-border bg-foreground grid-overlay scanlines">
                {JOURNEY.map((j, i) => (
                  <motion.div
                    key={j.year + i}
                    initial={false}
                    animate={{
                      opacity: i === active ? 1 : 0,
                      scale: i === active ? 1 : 1.06,
                    }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <motion.img
                      src={j.image}
                      alt={j.role}
                      loading="lazy"
                      style={{ y: parallaxY }}
                      className="h-[108%] w-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-transparent" />
                    <div className="pointer-events-none absolute inset-0 mix-blend-color bg-ember/20" />
                  </motion.div>
                ))}

                {/* corner ticks */}
                {(["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"] as const).map((p) => (
                  <span
                    key={p}
                    className={`absolute h-3 w-3 border-paper/60 ${p} ${
                      p.includes("top") ? "border-t" : "border-b"
                    } ${p.includes("left") ? "border-l" : "border-r"}`}
                  />
                ))}

                <div className="absolute bottom-5 left-5 right-5 z-[2] text-paper">
                  <p className="font-mono-label text-paper/70">
                    {activeItem.tag} · {activeItem.year}
                  </p>
                  <p className="mt-1.5 font-display text-2xl leading-tight">
                    {activeItem.role}
                  </p>
                  <p className="mt-0.5 font-mono-label text-paper/70">
                    {activeItem.org} · {activeItem.city}
                  </p>
                </div>
              </div>

              {/* chapter tab buttons */}
              <div className="mt-6 space-y-1.5">
                {JOURNEY.map((j, i) => (
                  <button
                    key={j.role + i}
                    onClick={() => scrollTo(i)}
                    className={`group flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left font-mono-label transition-all duration-300 ${
                      active === i
                        ? "border-ember/40 bg-ember/5 text-foreground"
                        : "border-border bg-transparent text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                    }`}
                  >
                    <span
                      className={`grid h-5 w-7 place-items-center rounded text-[10px] ${
                        active === i ? "bg-ember text-paper" : "bg-card text-muted-foreground"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="truncate">{j.year} — {j.tag}</span>
                    <span className="ml-auto truncate text-muted-foreground/80">{j.org}</span>
                  </button>
                ))}
              </div>

              {/* progress */}
              <div className="mt-6 flex items-center gap-4">
                <span className="font-mono-label text-muted-foreground">progress</span>
                <div className="relative h-px flex-1 bg-border">
                  <motion.span
                    style={{ scaleX: lineSpring, transformOrigin: "left" }}
                    className="absolute inset-0 block h-px bg-ember"
                  />
                </div>
                <span className="font-mono-label text-ember">
                  {String(Math.round(((active + 1) / total) * 100)).padStart(2, "0")}%
                </span>
              </div>
            </div>
          </aside>

          {/* right rail */}
          <div className="relative lg:col-span-7">
            <div className="pointer-events-none absolute left-4 top-0 bottom-0 w-px bg-border" />
            <motion.div
              style={{ scaleY: lineSpring, transformOrigin: "top" }}
              className="pointer-events-none absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-ember via-ember/70 to-transparent"
            />

            <ol className="space-y-12">
              {JOURNEY.map((j, i) => (
                <motion.li
                  key={j.role + i}
                  ref={(el) => { itemRefs.current[i] = el; }}
                  data-idx={i}
                  initial={{ opacity: 0, x: 30, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ margin: "-15% 0px -15% 0px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="relative pl-14"
                >
                  {/* node */}
                  <span
                    className={`absolute left-[9px] top-8 grid h-3.5 w-3.5 place-items-center rounded-full bg-card ring-1 transition-all duration-500 ${
                      active === i ? "ring-ember scale-125" : "ring-border"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        active === i ? "bg-ember" : "bg-foreground/40"
                      }`}
                    />
                    {active === i && (
                      <span className="absolute inset-0 -m-2 rounded-full bg-ember/20 blur-sm animate-pulse" />
                    )}
                  </span>

                  <article
                    className={`group relative overflow-hidden rounded-2xl border bg-paper/70 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:bg-paper hover:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)] ${
                      active === i ? "border-ember/40" : "border-border"
                    }`}
                  >
                    {/* IDE-style top chrome */}
                    <div className="flex items-center gap-3 border-b border-border/60 bg-card/60 px-5 py-2.5 font-mono-label text-muted-foreground">
                      <span className="flex gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-ember/70" />
                        <span className="h-2 w-2 rounded-full bg-clay/70" />
                        <span className="h-2 w-2 rounded-full bg-moss/60" />
                      </span>
                      <span className="text-foreground">
                        chapter_{String(i + 1).padStart(2, "0")}.md
                      </span>
                      <span className="ml-auto text-ember">{j.year}</span>
                    </div>

                    <span className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-ember/0 via-ember/0 to-ember/[0.08] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="p-7">
                      {/* code-comment metadata */}
                      <p className="font-mono-label text-muted-foreground">
                        <span className="text-ember/70">//</span> {j.when} · {j.city}
                      </p>

                      <div className="mt-3 flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-display text-3xl leading-tight">{j.role}</h3>
                          <p className="mt-1 text-muted-foreground">
                            {j.org} <span className="text-ember">·</span> {j.tag}
                          </p>
                        </div>
                        <span className="font-display text-5xl leading-none text-foreground/12 transition-colors group-hover:text-ember/40">
                          0{i + 1}
                        </span>
                      </div>

                      <div className="mt-5 h-px w-12 bg-ember/60 transition-all duration-500 group-hover:w-40" />

                      <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                        {j.notes}
                      </p>

                      <ul className="mt-6 space-y-2.5">
                        {j.highlights.map((h) => (
                          <li
                            key={h}
                            className="flex items-start gap-3 text-sm text-foreground/85"
                          >
                            <span className="mt-1 font-mono text-ember">›</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {j.stack.map((s) => (
                          <span
                            key={s}
                            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-2.5 py-1 font-mono-label text-foreground/70"
                          >
                            <span className="h-1 w-1 rounded-full bg-ember/70" />
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>

        {/* ── MOBILE ── */}
        <div className="relative mt-14 lg:hidden">
          <div className="sticky top-16 z-10 mb-6 -mx-6 flex items-center justify-between border-b border-border/60 bg-card/85 px-6 py-3 backdrop-blur-md">
            <div className="flex items-center gap-2 font-mono-label text-muted-foreground">
              <span className="text-ember">›</span>
              <span>chapter {String(active + 1).padStart(2, "0")}</span>
            </div>
            <div className="relative h-[1.2em] w-[5ch] overflow-hidden text-right">
              {JOURNEY.map((j, i) => (
                <motion.span
                  key={j.year + i}
                  initial={false}
                  animate={{
                    y: i === active ? "0%" : i < active ? "-110%" : "110%",
                    opacity: i === active ? 1 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 160, damping: 22 }}
                  className="absolute inset-0 font-mono text-2xl leading-none text-ember"
                >
                  {j.year}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute left-[15px] top-0 bottom-0 w-px bg-border" />
            <motion.div
              style={{ scaleY: lineSpring, transformOrigin: "top" }}
              className="pointer-events-none absolute left-[15px] top-0 bottom-0 w-px bg-gradient-to-b from-ember via-ember/70 to-transparent"
            />

            <ol className="space-y-10">
              {JOURNEY.map((j, i) => (
                <motion.li
                  key={j.role + i}
                  ref={(el) => { itemRefs.current[i] = el; }}
                  data-idx={i}
                  initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ margin: "-10% 0px -10% 0px" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative pl-12"
                >
                  <span
                    className={`absolute left-0 top-4 grid h-8 w-8 place-items-center rounded-full bg-card ring-1 ${
                      active === i ? "ring-ember/60" : "ring-border"
                    }`}
                  >
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        active === i ? "bg-ember" : "bg-foreground/40"
                      }`}
                    />
                  </span>

                  <div className="overflow-hidden rounded-2xl border border-border bg-paper/60">
                    <div className="flex items-center gap-2 border-b border-border/60 bg-card/60 px-4 py-2 font-mono-label text-muted-foreground">
                      <span className="flex gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-ember/70" />
                        <span className="h-1.5 w-1.5 rounded-full bg-clay/70" />
                        <span className="h-1.5 w-1.5 rounded-full bg-moss/60" />
                      </span>
                      <span className="text-foreground">chapter_{String(i + 1).padStart(2, "0")}.md</span>
                      <span className="ml-auto text-ember">{j.year}</span>
                    </div>

                    <div className="relative aspect-[16/10] overflow-hidden bg-foreground grid-overlay scanlines">
                      <img
                        src={j.image}
                        alt={j.role}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
                      <div className="pointer-events-none absolute inset-0 mix-blend-color bg-ember/15" />
                      <span className="absolute left-3 top-3 z-[2] rounded-full bg-paper/90 px-2.5 py-0.5 font-mono-label text-ember">
                        {j.tag}
                      </span>
                    </div>
                    <div className="p-5">
                      <p className="font-mono-label text-muted-foreground">
                        <span className="text-ember/70">//</span> {j.when}
                      </p>
                      <h3 className="mt-2 font-display text-2xl leading-tight">{j.role}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {j.org} <span className="text-ember">·</span> {j.city}
                      </p>
                      <div className="mt-4 h-px w-10 bg-ember/60" />
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                        {j.notes}
                      </p>
                      <ul className="mt-4 space-y-2">
                        {j.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2.5 text-sm text-foreground/85">
                            <span className="mt-0.5 font-mono text-ember">›</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {j.stack.map((s) => (
                          <span
                            key={s}
                            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-2.5 py-1 font-mono-label text-foreground/70"
                          >
                            <span className="h-1 w-1 rounded-full bg-ember/70" />
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>

        {/* footer caption */}
        <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 font-mono-label">
          <p className="text-muted-foreground">
            <span className="text-ember">›</span> end of log · {active + 1} / {total} —{" "}
            <span className="text-foreground">{activeItem.year}</span>
          </p>
          <p className="max-w-md text-sm text-muted-foreground normal-case tracking-normal">
            And the chapter still being written — building, learning, and
            shipping in <span className="text-foreground">2026</span>.
          </p>
        </div>
      </div>
    </section>
  );
}





/* ---------- contact ---------- */

function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-28 lg:py-40">
      {/* atmospheric night-city backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <img
          src={contactBg.url}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />
      </div>
      <div className="mx-auto max-w-[1480px] px-6 lg:px-12">
        <SectionLabel n="06" title="contact" />

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.95]">
              Have a thing
              <br />
              <em className="italic text-ember">to build?</em>
              <span className="animate-blink inline-block translate-y-[-0.1em] text-ember">_</span>
            </h2>
            <p className="mt-8 max-w-lg text-lg text-muted-foreground">
              Full-time, freelance, or just a hello — my inbox is genuinely open. I usually reply within a day.
            </p>

            <Magnetic>
              <a
                href="mailto:dsanket965@gmail.com"
                data-cursor="email"
                className="group mt-10 inline-flex items-center gap-4 rounded-full border border-foreground px-6 py-4 text-lg transition-all hover:bg-foreground hover:text-paper"
              >
                dsanket965@gmail.com
                <span className="grid h-9 w-9 place-items-center rounded-full bg-foreground text-paper transition-transform group-hover:rotate-45 group-hover:bg-ember">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
            </Magnetic>
          </div>

          <div className="lg:col-span-5">
            <div className="space-y-1 rounded-3xl border border-border bg-card p-8">
              <ContactRow icon={<Mail className="h-4 w-4" />} label="Email" value="dsanket965@gmail.com" href="mailto:dsanket965@gmail.com" />
              <ContactRow icon={<Phone className="h-4 w-4" />} label="Phone" value="+91 90354 00802" href="tel:+919035400802" />
              <ContactRow icon={<MapPin className="h-4 w-4" />} label="Location" value="Bengaluru, Karnataka, IN" href="https://maps.google.com/?q=bangalore,karnataka,India" />
            </div>
          </div>

          <div className="lg:col-span-12">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href: string; }) {
  return (
    <a href={href} className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 border-b border-border py-4 last:border-0">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-foreground transition-colors group-hover:bg-ember group-hover:text-paper">{icon}</span>
      <div className="min-w-0">
        <p className="font-mono-label text-muted-foreground">{label}</p>
        <p className="truncate text-base">{value}</p>
      </div>
      <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember" />
    </a>
  );
}

/* ---------- footer ---------- */

function Clock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () => new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: "Asia/Kolkata" });
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time} IST</span>;
}

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-foreground text-paper">
      {/* top marquee */}
      <div className="border-b border-paper/10 py-5">
        <div className="flex whitespace-nowrap animate-marquee-slow">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="mx-10 inline-flex items-center gap-10 font-display text-2xl text-paper/70">
              <span>Available for select projects · 2026</span>
              <span className="text-ember">✦</span>
              <span>dsanket965@gmail.com</span>
              <span className="text-ember">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1480px] px-6 py-20 lg:px-12">
        {/* big CTA */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="font-mono-label text-paper/50">[ let's make ]</p>
            <h3 className="mt-4 font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
              Something <em className="italic text-ember">worth shipping.</em>
            </h3>
            <p className="mt-6 max-w-md text-paper/60">
              Pick a channel below — or just send an email. The faster way is usually the email.
            </p>
            <Magnetic>
              <a
                href="mailto:dsanket965@gmail.com"
                data-cursor="email"
                className="group mt-8 inline-flex items-center gap-3 rounded-full bg-ember px-6 py-3.5 text-paper transition-all hover:bg-paper hover:text-foreground"
              >
                Start a project
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
          </div>

          {/* link columns */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8 sm:grid-cols-3">
            <FooterCol title="Navigate" items={[
              ["Work", "#work"], ["Services", "#services"], ["About", "#about"], ["Journey", "#journey"], ["Contact", "#contact"],
            ]} />
            <FooterCol title="Services" items={[
              ["Web Development", "#services"], ["UI / UX Design", "#services"], ["API & Systems", "#services"], ["Brand & Visuals", "#services"],
            ]} />
            <FooterCol title="Social" items={[
              ["GitHub", "https://github.com/dsanket45/"],
              ["LinkedIn", "https://www.linkedin.com/in/sanket-d-39b735246/"],
              ["X / Twitter", "https://x.com/D__Sanket/"],
              ["Instagram", "https://www.instagram.com/thenameissanket_/"],
            ]} external />
          </div>
        </div>

        {/* wordmark */}
        <div className="mt-20 font-display text-[clamp(4rem,18vw,22rem)] leading-[0.82] tracking-tight">
          D&nbsp;Sanket<span className="text-ember">.</span>
        </div>

        {/* meta row */}
        <div className="mt-10 grid grid-cols-1 gap-6 border-t border-paper/10 pt-8 text-sm text-paper/60 sm:grid-cols-4">
          <p>© {new Date().getFullYear()} D Sanket</p>
          <p className="font-mono-label">Bengaluru · <Clock /></p>
          <p className="sm:text-right font-mono-label">Lat 12.97° N · Lng 77.59° E</p>
          <p className="sm:text-right">Designed & built end-to-end · v2026.2</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items, external }: { title: string; items: readonly (readonly [string, string])[]; external?: boolean }) {
  return (
    <div>
      <p className="font-mono-label text-paper/50">{title}</p>
      <ul className="mt-5 space-y-2.5">
        {items.map(([label, href]) => (
          <li key={label}>
            <a
              href={href}
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              data-cursor="open"
              className="group inline-flex items-center gap-1.5 text-paper/85 transition-colors hover:text-ember"
            >
              <span className="relative">
                {label}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-ember transition-transform duration-300 group-hover:scale-x-100" />
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}


/* ---------- manifesto ---------- */

function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  return (
    <section ref={ref} className="relative overflow-hidden py-24 lg:py-32">
      <div className="mx-auto max-w-[1480px] px-6 lg:px-12">
        <SectionLabel n="—" title="the motive" />
        <motion.p
          style={{ x }}
          className="mt-10 font-display text-[clamp(2rem,5.4vw,4.8rem)] leading-[1.05] tracking-tight"
        >
          I don't ship features. I ship <em className="italic text-ember">feelings</em> —
          the quiet click of a button that lands, the page that loads before you blink,
          the empty state that says <em className="italic">"we got you."</em>
        </motion.p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
          <span className="font-mono-label">— a working manifesto</span>
          <span className="h-px flex-1 min-w-12 bg-border" />
          <span className="font-mono-label">v.2026</span>
        </div>
      </div>
    </section>
  );
}

/* ---------- principles ---------- */

const PRINCIPLES = [
  { k: "P/01", t: "Taste compounds.", b: "Every spacing, easing curve and copy line is a vote for the kind of product this becomes. Small votes, loud results." },
  { k: "P/02", t: "Performance is design.", b: "Snappy is a feeling. Sub-second interactions, lean bundles, native scroll — they're the substrate everything else sits on." },
  { k: "P/03", t: "Ship the boring 99%.", b: "Loading states, empty states, error states, offline states. The polish nobody mentions is the polish everyone feels." },
  { k: "P/04", t: "Write less, mean more.", b: "Microcopy is UI. Three honest words beat a paragraph of marketing every time." },
  { k: "P/05", t: "Build for tomorrow's you.", b: "Boring tech where it counts, fresh tech where it sings. Code somebody else (or future-you) can actually finish." },
  { k: "P/06", t: "Make the demo, then the deck.", b: "Working software earns trust faster than any slide. Prototype in days, decide on Monday." },
];

function Principles() {
  return (
    <section className="relative bg-card py-28 lg:py-36">
      <div className="mx-auto max-w-[1480px] px-6 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel n="—" title="principles" />
            <h2 className="mt-8 max-w-3xl font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
              Six rules I <em className="italic text-ember">actually</em> follow.
            </h2>
          </div>
          <p className="max-w-xs text-muted-foreground">
            Not a brand. A working philosophy — the things I keep saying out loud on calls.
          </p>
        </div>

        <ul className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <motion.li
              key={p.k}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              className="group relative bg-card p-8 transition-colors hover:bg-background lg:p-10"
            >
              <span className="font-mono-label text-ember">{p.k}</span>
              <h3 className="mt-5 font-display text-3xl leading-[1.1] transition-colors group-hover:text-ember">{p.t}</h3>
              <p className="mt-4 text-muted-foreground">{p.b}</p>
              <span className="pointer-events-none absolute bottom-6 right-6 font-display text-5xl text-foreground/5 transition-all duration-500 group-hover:text-ember/20 group-hover:-translate-y-1">
                {String(i + 1).padStart(2, "0")}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- quotes / recognition ---------- */

const QUOTE_LINES = [
  "“Calm interfaces, loud impact.”",
  "Bengaluru → World",
  "Design × Engineering",
  "Built with care, shipped on time.",
  "Available · Q1 2026",
  "10+ projects, one quality bar",
  "React · Spring Boot · Figma",
];

function Quotes() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-ember/[0.08] py-14">
      <div className="flex whitespace-nowrap animate-marquee-slow">
        {[...QUOTE_LINES, ...QUOTE_LINES, ...QUOTE_LINES].map((q, i) => (
          <span key={i} className="mx-10 inline-flex items-center gap-10 font-display text-3xl text-foreground/80 md:text-4xl">
            <span>{q}</span>
            <span className="text-ember">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* ---------- shared ---------- */


function SectionLabel({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-mono-label text-ember">{n}</span>
      <span className="h-px w-10 bg-border" />
      <span className="font-mono-label text-muted-foreground">{title}</span>
    </div>
  );
}
