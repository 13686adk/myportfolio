"use client";

import { motion } from "framer-motion";
import { Award, Briefcase, GraduationCap } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { GradientDivider, Section, SectionHeading } from "@/components/primitives";
import { certifications, timeline } from "@/data/site";

export function Experience() {
  return (
    <Section id="experience">
      <Reveal>
        <SectionHeading
          eyebrow="Trajectory"
          title="Experience & education"
          description="Where the work happened and what it taught me."
        />
      </Reveal>

      <div className="relative mt-14">
        {/* Spine */}
        <div
          aria-hidden
          className="absolute top-2 bottom-2 left-[0.6875rem] w-px bg-linear-to-b from-accent/60 via-line to-transparent md:left-1/2 md:-translate-x-1/2"
        />

        <ol className="flex flex-col gap-10">
          {timeline.map((entry, i) => {
            const isLeft = i % 2 === 0;
            const Icon =
              entry.kind === "work" ? Briefcase : GraduationCap;

            return (
              <motion.li
                key={`${entry.period}-${entry.title}`}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-12 md:grid md:grid-cols-2 md:gap-14 md:pl-0"
              >
                {/* Node */}
                <span
                  aria-hidden
                  className="absolute top-1 left-0 z-10 grid h-6 w-6 place-items-center rounded-full border border-line bg-canvas md:left-1/2 md:-translate-x-1/2"
                >
                  <span className="absolute inset-0 rounded-full bg-accent/12 blur-[6px]" />
                  <Icon className="relative h-3 w-3 text-accent" />
                </span>

                {/* Card */}
                <div
                  className={
                    isLeft
                      ? "md:col-start-1 md:pr-2 md:text-right"
                      : "md:col-start-2 md:pl-2"
                  }
                >
                  <div className="group rounded-2xl border border-line-soft bg-surface/50 p-6 transition-all duration-500 hover:border-accent/30 hover:bg-surface">
                    <div
                      className={`flex flex-wrap items-center gap-2.5 ${
                        isLeft ? "md:justify-end" : ""
                      }`}
                    >
                      <span className="font-mono text-xs text-accent">
                        {entry.period}
                      </span>
                      {entry.current ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[10px] tracking-wider text-accent uppercase">
                          <span className="h-1 w-1 rounded-full bg-accent" />
                          Current
                        </span>
                      ) : null}
                    </div>

                    <h3 className="mt-2.5 text-lg font-semibold tracking-tight text-ink">
                      {entry.title}
                    </h3>
                    <p className="mt-0.5 text-sm font-medium text-muted">
                      {entry.org}
                    </p>

                    <ul
                      className={`mt-4 flex flex-col gap-2.5 border-t border-line-soft pt-4 ${
                        isLeft ? "md:items-end md:text-right" : ""
                      }`}
                    >
                      {entry.points.map((point) => (
                        <li
                          key={point}
                          className={`flex gap-2.5 text-sm leading-relaxed text-muted ${
                            isLeft ? "md:flex-row-reverse" : ""
                          }`}
                        >
                          <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>

      <div className="mt-16">
        <Reveal>
          <h3 className="flex items-center gap-2.5 text-lg font-semibold tracking-tight text-ink">
            <Award className="h-5 w-5 text-accent" />
            Certifications
          </h3>
        </Reveal>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {certifications.map((cert, i) => (
            <Reveal key={cert.title} delay={i * 0.06}>
              <li className="flex h-full flex-col gap-1 rounded-xl border border-line-soft bg-surface/50 p-5 transition-colors duration-300 hover:border-accent/30 hover:bg-surface">
                <span className="font-mono text-[11px] tracking-wider text-accent uppercase">
                  {cert.issuer} · {cert.year}
                </span>
                <span className="text-sm leading-relaxed font-medium text-ink">
                  {cert.title}
                </span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>

      <GradientDivider />
    </Section>
  );
}