import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Cursor } from "@/components/Cursor";
import { PROJECTS, getProject, type Project } from "@/data/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.project.title} — D Sanket` },
          { name: "description", content: loaderData.project.blurb },
          { property: "og:title", content: `${loaderData.project.title} — D Sanket` },
          { property: "og:description", content: loaderData.project.blurb },
          { property: "og:image", content: loaderData.project.cover },
        ]
      : [],
  }),
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project } = Route.useLoaderData() as { project: Project };
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.4 });

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yImg = useTransform(heroP, [0, 1], [0, 160]);
  const scaleImg = useTransform(heroP, [0, 1], [1, 1.15]);

  const idx = PROJECTS.findIndex((p) => p.slug === project.slug);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  return (
    <div ref={ref} className="paper-grain min-h-screen bg-background text-foreground antialiased">
      <Cursor />

      {/* scroll progress */}
      <motion.div
        style={{ scaleX: progress, transformOrigin: "0% 50%" }}
        className="fixed left-0 right-0 top-0 z-[60] h-[3px] bg-ember"
      />

      {/* nav */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1480px] items-center justify-between px-6 py-4 lg:px-12">
          <Link to="/" className="group inline-flex items-center gap-2 text-sm" data-cursor="back">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-border transition-all group-hover:-translate-x-1 group-hover:border-ember group-hover:bg-ember group-hover:text-paper">
              <ArrowLeft className="h-4 w-4" />
            </span>
            <span className="font-mono-label text-muted-foreground">back to index</span>
          </Link>
          <span className="font-mono-label text-muted-foreground">
            {project.n} · {project.kind}
          </span>
        </div>
      </header>

      {/* hero */}
      <section ref={heroRef} className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div
          className="pointer-events-none absolute -top-40 right-[-10%] h-[600px] w-[600px] rounded-full blur-3xl"
          style={{ backgroundColor: `${project.accent}22` }}
        />
        <div className="mx-auto max-w-[1480px] px-6 lg:px-12">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono-label text-ember"
          >
            {project.category.toUpperCase()} · {project.year}
          </motion.p>

          <h1 className="mt-6 font-display text-[clamp(3rem,9vw,8rem)] leading-[0.94] tracking-tight">
            {project.title.split(" ").map((word, i) => (
              <span key={i} className="inline-block overflow-hidden align-top">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.05 + i * 0.08 }}
                  className="mr-4 inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            {project.blurb}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            {project.live && project.live !== "#" && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                data-cursor="open"
                className="group inline-flex items-center gap-3 rounded-full bg-foreground px-6 py-3.5 text-base text-paper transition-all hover:bg-ember"
              >
                Visit live site
                <span className="grid h-7 w-7 place-items-center rounded-full bg-paper/15 transition-transform group-hover:rotate-45">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </a>
            )}
            <a
              href={project.code}
              target="_blank"
              rel="noreferrer"
              data-cursor="github"
              className="group inline-flex items-center gap-2 rounded-full border border-foreground px-6 py-3.5 text-base transition-all hover:bg-foreground hover:text-paper"
            >
              View source
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        </div>

        {/* cover image with parallax */}
        <div className="mx-auto mt-16 max-w-[1480px] px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[16/9] overflow-hidden rounded-[28px] border border-border shadow-[0_30px_60px_-20px_rgba(70,40,20,0.3)]"
          >
            <motion.img
              src={project.cover}
              alt={project.title}
              style={{ y: yImg, scale: scaleImg }}
              className="absolute inset-0 h-[120%] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-paper">
              <p className="font-mono-label text-paper/80">cover · {project.n}</p>
              <p className="font-mono-label text-paper/80">{project.year}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* metrics strip */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-[1480px] grid-cols-2 divide-border px-6 sm:grid-cols-3 sm:divide-x lg:px-12">
          {project.metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="px-2 py-10 first:pl-0 sm:px-8"
            >
              <p className="font-display text-4xl sm:text-5xl">{m.value}</p>
              <p className="font-mono-label mt-2 text-muted-foreground">{m.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* overview + features */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto grid max-w-[1480px] grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-12">
          <div className="lg:col-span-7">
            <p className="font-mono-label text-ember">[ overview ]</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.1] sm:text-5xl">
              The <em className="italic text-ember">why</em> & the <em className="italic text-ember">how</em>.
            </h2>
            <div className="mt-8 space-y-5">
              {project.longDescription.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: i * 0.07 }}
                  className="text-lg leading-relaxed text-muted-foreground"
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-28 rounded-3xl border border-border bg-card p-8">
              <p className="font-mono-label text-ember">[ features ]</p>
              <ul className="mt-6 space-y-4">
                {project.features.map((f, i) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    className="flex items-start gap-3"
                  >
                    <span
                      className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full"
                      style={{ backgroundColor: `${project.accent}26`, color: project.accent }}
                    >
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-base text-foreground">{f}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* stack */}
      <section className="border-t border-border bg-card py-24 lg:py-32">
        <div className="mx-auto max-w-[1480px] px-6 lg:px-12">
          <p className="font-mono-label text-ember">[ stack ]</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[1.1] sm:text-5xl">
            The tools behind it.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {project.stack.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="rounded-3xl border border-border bg-background p-8"
              >
                <p className="font-mono-label text-muted-foreground">{s.label}</p>
                <ul className="mt-5 space-y-2">
                  {s.items.map((it) => (
                    <li key={it} className="font-display text-2xl">
                      {it}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="font-mono-label rounded-full border border-border bg-background px-3 py-1 text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* next project */}
      <section className="border-t border-border py-24 lg:py-32">
        <div className="mx-auto max-w-[1480px] px-6 lg:px-12">
          <p className="font-mono-label text-muted-foreground">[ next project ]</p>
          <Link
            to="/projects/$slug"
            params={{ slug: next.slug }}
            data-cursor="next"
            className="group mt-6 grid grid-cols-1 items-center gap-8 rounded-[28px] border border-border bg-card p-8 transition-all hover:border-ember/50 lg:grid-cols-[1fr_auto_auto] lg:p-12"
          >
            <div>
              <span className="font-mono-label text-ember">{next.n}</span>
              <h3 className="mt-3 font-display text-4xl leading-[1.05] transition-colors group-hover:text-ember sm:text-5xl lg:text-6xl">
                {next.title}
              </h3>
              <p className="mt-2 text-muted-foreground">{next.kind} · {next.year}</p>
            </div>
            <div className="hidden h-28 w-44 overflow-hidden rounded-2xl border border-border lg:block">
              <img src={next.cover} alt={next.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <span className="grid h-14 w-14 place-items-center rounded-full border border-border transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:border-ember group-hover:bg-ember group-hover:text-paper">
              <ArrowUpRight className="h-6 w-6" />
            </span>
          </Link>

          <div className="mt-12 flex justify-center">
            <Link
              to="/"
              hash="work"
              data-cursor="all"
              className="group inline-flex items-center gap-2 px-2 py-3 text-sm font-mono-label text-muted-foreground transition-colors hover:text-ember"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              view all projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
