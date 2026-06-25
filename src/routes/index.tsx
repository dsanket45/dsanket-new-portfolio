import { createFileRoute, Link } from "@tanstack/react-router";
import { ContactForm } from "@/components/ContactForm";
import { Cursor } from "@/components/Cursor";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { PROJECTS as PROJECT_LIST, CATEGORIES, type Project } from "@/data/projects";
import {
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Sparkles,
} from "lucide-react";

import mainPhoto from "@/assets/sanket-main.jpg.asset.json";
import aboutPhoto from "@/assets/sanket-about.jpg.asset.json";
import shot1 from "@/assets/sanket-shot1.jpg.asset.json";
import shot3 from "@/assets/sanket-shot3.jpg.asset.json";

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


const JOURNEY = [
  { when: "Feb 2025 — present", role: "Full-Stack Developer", org: "Swajyot Technologies", city: "Bengaluru", tag: "Work",
    notes: "Shipping responsive React + Spring Boot applications. Owning UI/UX details, API design and cloud deployment." },
  { when: "Oct — Nov 2023", role: "Innovation & Entrepreneurship Intern", org: "Novel Sky Technologies", city: "Bengaluru", tag: "Internship",
    notes: "Product thinking, design innovation and the entrepreneurial mindset behind building real IT products." },
  { when: "2021 — 2025", role: "BE, Computer Science & Engineering", org: "VTU University", city: "Bengaluru", tag: "Education",
    notes: "Strong fundamentals in programming, algorithms, systems and modern software engineering." },
  { when: "2019 — 2021", role: "Pre-University — Science", org: "Shree Guru Vidya Peetha", city: "Gulbarga", tag: "Education",
    notes: "Physics, Chemistry, Mathematics." },
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
  return (
    <div className="paper-grain min-h-screen bg-background text-foreground antialiased">
      <Cursor />
      <Nav />
      <main className="relative">
        <Hero />
        <Marquee />
        <Services />
        <Gallery />
        <Work />
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
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border/60 bg-background/75 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1480px] items-center justify-between px-6 py-4 lg:px-12">
        <a href="#top" className="flex items-center gap-3" data-cursor="home">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-foreground text-paper">
            <span className="font-display text-lg leading-none">ds</span>
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-base">D Sanket</span>
            <span className="font-mono-label text-muted-foreground">
              Software Engineer · IND
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="group relative rounded-full px-4 py-2 text-sm text-foreground/80 transition-colors hover:text-foreground"
            >
              {label}
              <span className="pointer-events-none absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-ember transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          data-cursor="say hi"
          className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm text-paper transition-all hover:bg-ember"
        >
          Let's talk
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </header>
  );
}

/* ---------- hero ---------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 8]);

  // tilt on portrait
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rX = useSpring(useTransform(my, [-1, 1], [8, -8]), { stiffness: 150, damping: 14 });
  const rY = useSpring(useTransform(mx, [-1, 1], [-8, 8]), { stiffness: 150, damping: 14 });

  return (
    <section
      id="top"
      ref={ref}
      className="relative overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32"
    >
      <div className="pointer-events-none absolute -top-40 right-[-10%] h-[600px] w-[600px] rounded-full bg-ember/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-[-10%] h-[500px] w-[500px] rounded-full bg-clay/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-1/3 h-[400px] w-[400px] rounded-full bg-cobalt/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-[1480px] grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-8 lg:px-12">
        <motion.div style={{ y, opacity }} className="lg:col-span-7 lg:pt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-moss opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-moss" />
            </span>
            <span className="font-mono-label text-foreground/70">
              Available · Q1 2026 · Bengaluru, IN
            </span>
          </motion.div>

          <h1 className="font-display text-[clamp(3.5rem,9vw,8.5rem)] leading-[0.92] tracking-tight">
            <Reveal delay={0.05}><span className="block">Building</span></Reveal>
            <Reveal delay={0.18}><span className="block"><em className="italic text-ember">software</em></span></Reveal>
            <Reveal delay={0.31}><span className="block">with care.</span></Reveal>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-10 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            I'm <strong className="text-foreground">D Sanket</strong> — a
            full-stack engineer who designs as much as I code. I build fast,
            scalable React + Spring Boot products and sweat the details until
            they feel inevitable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="#work"
                data-cursor="view work"
                className="group inline-flex items-center gap-3 rounded-full bg-foreground px-6 py-3.5 text-base text-paper transition-all hover:bg-ember"
              >
                See selected work
                <span className="grid h-7 w-7 place-items-center rounded-full bg-paper/15 transition-transform group-hover:rotate-45">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </a>
            </Magnetic>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-2 py-3 text-base"
            >
              <span className="ember-underline pb-0.5">or get in touch</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-16 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-8"
          >
            <Stat n="4+" l="Years building" />
            <Stat n="10+" l="Projects shipped" />
            <Stat n="5+" l="Certifications" />
          </motion.div>
        </motion.div>

        {/* right — portrait with tilt */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-5"
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
            my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
          }}
          onMouseLeave={() => { mx.set(0); my.set(0); }}
        >
          <div className="relative mx-auto aspect-[3/4] w-full max-w-md" style={{ perspective: 1000 }}>
            <motion.div style={{ rotate }} className="absolute inset-0 -rotate-2 rounded-[28px] border border-border bg-card" />
            <motion.div
              style={{ rotateX: rX, rotateY: rY }}
              className="tilt-card relative h-full w-full overflow-hidden rounded-[28px] border border-border shadow-[0_30px_60px_-20px_rgba(70,40,20,0.3)]"
            >
              <img
                src={mainPhoto.url}
                alt="D Sanket, software engineer"
                width={1024}
                height={1536}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent p-5">
                <p className="font-mono-label text-paper/80">001 / portrait</p>
                <p className="font-display text-2xl text-paper">Sanket, 2026</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="animate-float absolute -left-6 top-8 hidden rotate-[-6deg] rounded-2xl border border-border bg-paper px-4 py-3 shadow-lg sm:block"
            >
              <p className="font-mono-label text-muted-foreground">currently</p>
              <p className="font-display text-lg">Swajyot Tech</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute -right-4 bottom-16 hidden rotate-[5deg] items-center gap-2 rounded-full border border-border bg-ember px-4 py-2 text-paper shadow-lg sm:inline-flex"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span className="font-mono-label">design + code</span>
            </motion.div>

            {/* spinning badge */}
            <div className="animate-spin-slow absolute -bottom-6 -left-6 hidden h-24 w-24 sm:grid place-items-center rounded-full bg-foreground text-paper">
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
                <defs>
                  <path id="circ" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
                </defs>
                <text className="font-mono-label fill-paper" fontSize="9.5" letterSpacing="2">
                  <textPath href="#circ">AVAILABLE FOR WORK · 2026 · AVAILABLE FOR WORK · </textPath>
                </text>
              </svg>
              <span className="font-display text-2xl">✦</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* social row */}
      <div className="relative mx-auto mt-20 flex max-w-[1480px] flex-wrap items-center justify-between gap-4 border-t border-border px-6 pt-6 lg:px-12">
        <p className="font-mono-label text-muted-foreground">(scroll) — the work</p>
        <div className="flex items-center gap-1">
          <Social href="https://github.com/dsanket45/" label="GitHub"><Github className="h-4 w-4" /></Social>
          <Social href="https://www.linkedin.com/in/sanket-d-39b735246/" label="LinkedIn"><Linkedin className="h-4 w-4" /></Social>
          <Social href="https://x.com/D__Sanket/" label="X"><Twitter className="h-4 w-4" /></Social>
          <Social href="https://www.instagram.com/thenameissanket_/" label="Instagram"><Instagram className="h-4 w-4" /></Social>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <p className="font-display text-3xl text-foreground sm:text-4xl">{n}</p>
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
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  return (
    <motion.span
      ref={ref}
      style={{ x: sx, y: sy }}
      className="inline-block"
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.3);
        y.set((e.clientY - r.top - r.height / 2) * 0.3);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.span>
  );
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
      <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-ember/0 blur-3xl transition-all duration-700 group-hover:bg-ember/20" />
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
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const y3 = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-card py-28 lg:py-40">
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
          <motion.div style={{ y: y1 }} className="col-span-7 md:col-span-4 aspect-[3/4] overflow-hidden rounded-[20px] border border-border">
            <img src={shot1.url} alt="Sanket" className="h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-105" loading="lazy" />
          </motion.div>
          <motion.div style={{ y: y2 }} className="col-span-5 md:col-span-4 aspect-[3/4] overflow-hidden rounded-[20px] border border-border mt-12">
            <img src={aboutPhoto.url} alt="Sanket" className="h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-105" loading="lazy" />
          </motion.div>
          <motion.div style={{ y: y3 }} className="col-span-12 md:col-span-4 aspect-[3/4] overflow-hidden rounded-[20px] border border-border md:mt-24">
            <img src={shot3.url} alt="Sanket" className="h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-105" loading="lazy" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- work ---------- */

function Work() {
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
            A small, honest list. Real users, real bugs, real deploys.
          </p>
        </div>

        <ul className="mt-16 border-t border-border">
          {PROJECTS.map((p, i) => <ProjectRow key={p.n} p={p} i={i} />)}
        </ul>
      </div>
    </section>
  );
}

function ProjectRow({ p, i }: { p: (typeof PROJECTS)[number]; i: number; }) {
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
      <a
        href={p.live}
        target="_blank"
        rel="noreferrer"
        data-cursor="open"
        className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-6 py-8 transition-colors sm:grid-cols-[60px_minmax(0,1fr)_auto_auto] sm:gap-10 sm:py-10"
      >
        <span className="font-mono-label text-muted-foreground">{p.n}</span>

        <div className="min-w-0">
          <h3 className="truncate font-display text-3xl transition-colors group-hover:text-ember sm:text-4xl lg:text-5xl">
            {p.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">{p.kind} · {p.year}</p>
        </div>

        <div className="hidden max-w-md text-sm leading-relaxed text-muted-foreground lg:block">
          {p.blurb}
        </div>

        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-border transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:border-ember group-hover:bg-ember group-hover:text-paper">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </a>

      <div className="flex flex-wrap gap-2 pb-6 sm:pl-[100px]">
        {p.tags.map((t) => (
          <span key={t} className="font-mono-label rounded-full border border-border bg-card px-3 py-1 text-muted-foreground">{t}</span>
        ))}
      </div>

      {/* floating gradient card that follows cursor */}
      <motion.div
        animate={{ opacity: pos.on ? 1 : 0, scale: pos.on ? 1 : 0.85 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ left: pos.x, top: pos.y, x: "-50%", y: "-50%" }}
        className={`pointer-events-none absolute z-10 hidden h-56 w-72 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${p.color} shadow-2xl lg:block`}
      >
        <div className="flex h-full flex-col justify-between p-5">
          <span className="font-mono-label text-foreground/70">{p.n} · {p.year}</span>
          <div>
            <p className="font-display text-2xl text-foreground">{p.title}</p>
            <p className="font-mono-label mt-1 text-foreground/60">{p.kind}</p>
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
    <section id="about" className="relative py-28 lg:py-40">
      <div className="mx-auto max-w-[1480px] px-6 lg:px-12">
        <SectionLabel n="04" title="about" />

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] border border-border">
                <img
                  src={aboutPhoto.url}
                  alt="Editorial portrait"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="font-mono-label text-muted-foreground">002 / studio</p>
                <p className="font-mono-label text-muted-foreground">bengaluru, in</p>
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
  return (
    <section id="journey" className="relative bg-card py-28 lg:py-40">
      <div className="mx-auto max-w-[1480px] px-6 lg:px-12">
        <SectionLabel n="05" title="journey" />
        <h2 className="mt-8 max-w-3xl font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
          A short path, <em className="italic text-ember">walked carefully.</em>
        </h2>

        <ol className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-x-16">
          {JOURNEY.map((j, i) => (
            <motion.li
              key={j.role + i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className="relative border-l border-border pl-6"
            >
              <span className="absolute left-0 top-2 -translate-x-1/2 h-3 w-3 rounded-full bg-ember ring-4 ring-card" />
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono-label text-ember">{j.tag}</span>
                <span className="font-mono-label text-muted-foreground">{j.when}</span>
              </div>
              <h3 className="mt-3 font-display text-2xl sm:text-3xl">{j.role}</h3>
              <p className="mt-1 text-muted-foreground">{j.org} · {j.city}</p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{j.notes}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- contact ---------- */

function Contact() {
  return (
    <section id="contact" className="relative py-28 lg:py-40">
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
