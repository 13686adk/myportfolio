"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { GradientDivider, Section, SectionHeading } from "@/components/primitives";
import { skillGroups } from "@/data/site";

const marqueeItems = [
  "React",
  "Next.js",
  "TypeScript",
  "React Native",
  "Expo",
  "Flutter",
  "Tailwind CSS",
  "NativeWind",
  "Zustand",
  "TanStack Query",
  "shadcn/ui",
  "Framer Motion",
  "Recharts",
  "Leaflet",
  "PostCSS",
  "Vercel",
];

function SkillCard({
  title,
  items,
  index,
}: {
  title: string;
  items: string[];
  index: number;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 22 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className="group relative h-full overflow-hidden rounded-2xl border border-line-soft bg-surface/50 p-6 transition-all duration-500 hover:border-accent/30 hover:shadow-[0_0_50px_-22px_var(--color-accent)]"
    >
      <div
        aria-hidden
        className="absolute -top-16 -right-16 h-32 w-32 rounded-full bg-accent/8 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />
      <h3 className="relative flex items-center gap-2 text-sm font-semibold tracking-tight text-ink">
        <span className="h-1 w-1 rounded-full bg-accent" />
        {title}
        <span className="ml-auto font-mono text-[10px] text-faint">
          {String(index + 1).padStart(2, "0")}
        </span>
      </h3>
      <ul className="relative mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-md border border-line-soft bg-canvas/60 px-2.5 py-1 font-mono text-xs text-muted transition-all duration-300 hover:border-accent/45 hover:text-accent"
          >
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function Skills() {
  const loop = [...marqueeItems, ...marqueeItems];

  return (
    <Section id="skills">
      <Reveal>
        <SectionHeading
          eyebrow="Toolkit"
          title="The stack I reach for"
          description="Chosen for what it lets me ship, not for how it looks on a résumé."
          align="center"
        />
      </Reveal>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
        className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {skillGroups.map((group, i) => (
          <SkillCard
            key={group.title}
            title={group.title}
            items={group.items}
            index={i}
          />
        ))}
      </motion.div>

      <Reveal delay={0.1} className="mt-14">
        <div className="glass overflow-hidden rounded-2xl py-5">
          <div className="mask-fade-x overflow-hidden">
            <div className="flex w-max animate-marquee gap-8 pr-8">
              {loop.map((item, i) => (
                <span
                  key={`${item}-${i}`}
                  className="flex shrink-0 items-center gap-3 font-mono text-sm whitespace-nowrap text-muted"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <GradientDivider />
    </Section>
  );
}