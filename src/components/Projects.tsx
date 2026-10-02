"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import { Reveal } from "@/components/Reveal";
import { GradientDivider, Section, SectionHeading } from "@/components/primitives";
import { projectFilters, projects, type Project } from "@/data/site";
import { cn } from "@/lib/utils";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 26, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.98 }}
      transition={{ duration: 0.42, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-line-soft bg-surface/50 p-6 transition-colors duration-500 hover:border-accent/30",
        project.featured && "sm:col-span-2",
      )}
    >
      {/* Hover glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at 50% 0%, color-mix(in oklab, var(--color-accent) 12%, transparent), transparent 65%)",
        }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="rounded-md border border-line bg-surface-2 px-2.5 py-1 font-mono text-[10px] tracking-wider text-accent uppercase">
            {project.category}
          </span>
          {project.featured ? (
            <span className="rounded-md border border-accent-3/40 bg-accent-3/10 px-2.5 py-1 font-mono text-[10px] tracking-wider text-accent-3 uppercase">
              Featured
            </span>
          ) : null}
          <span className="font-mono text-[10px] text-faint">{project.year}</span>
        </div>

        <div className="flex shrink-0 gap-1.5">
          {project.repo ? (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${project.title} source code on GitHub`}
              className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-surface-2/70 text-muted transition-all duration-300 hover:border-accent/60 hover:text-accent"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
          ) : null}
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${project.title} live demo`}
              className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-surface-2/70 text-muted transition-all duration-300 hover:border-accent/60 hover:text-accent"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      </div>

      <h3 className="relative mt-5 text-xl font-semibold tracking-tight text-ink">
        {project.title}
      </h3>
      <p className="relative mt-2 text-sm leading-relaxed font-medium text-accent-soft/90">
        {project.blurb}
      </p>
      <p className="relative mt-3 text-sm leading-relaxed text-muted">
        {project.description}
      </p>

      <ul className="relative mt-5 flex flex-col gap-2">
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-2.5 text-sm text-muted">
            <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-accent/70" />
            {h}
          </li>
        ))}
      </ul>

      <ul className="relative mt-6 flex flex-wrap gap-1.5 border-t border-line-soft pt-5">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded-md bg-surface-2/80 px-2 py-0.5 font-mono text-[11px] text-faint"
          >
            {tech}
          </li>
        ))}
      </ul>

      {project.demo ? (
        <a
          href={project.demo}
          target="_blank"
          rel="noreferrer noopener"
          className="relative mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-soft"
        >
          Visit live site
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      ) : null}
    </motion.article>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<string>("All");

  const visible = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter],
  );

  return (
    <Section id="work">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <Reveal>
          <SectionHeading
            eyebrow="What I built"
            title={
              <>
                What I{" "}
                <span className="text-accent">built and shipped</span>
              </>
            }
            description="Web, mobile and dashboard products built end to end — several running on live deployments. Source is public."
          />
        </Reveal>

        <Reveal delay={0.12}>
          <div className="flex flex-wrap gap-2">
            {projectFilters.map((f) => {
              const isActive = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  aria-pressed={isActive}
                  className={cn(
                    "relative rounded-lg border px-3.5 py-1.5 font-mono text-xs transition-colors duration-300",
                    isActive
                      ? "border-accent/60 bg-accent/10 text-accent"
                      : "border-line bg-surface-2/50 text-muted hover:border-accent/35 hover:text-ink",
                  )}
                >
                  {f}
                  {isActive ? (
                    <motion.span
                      layoutId="project-filter"
                      className="absolute inset-0 -z-10 rounded-lg bg-accent/10"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>

      <motion.div
        layout
        className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      <p className="mt-10 text-center font-mono text-xs text-faint">
        Showing {visible.length} of {projects.length} projects
      </p>

      <GradientDivider />
    </Section>
  );
}