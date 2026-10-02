import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/primitives";
import { site } from "@/data/site";

const highlights = [
  {
    title: "Design systems that get reused",
    body: "Component libraries I have built have cut feature development time by roughly 25% across projects — the payoff shows up in the second and third build, not the first.",
  },
  {
    title: "Shipped across three runtimes",
    body: "Next.js, React Native and Flutter from the same brain. I pick the runtime for the job and hold the architecture honest once it's running.",
  },
  {
    title: "Figma handoff to production",
    body: "I work straight from designer files to deployed UI, keeping spacing rhythm, type scale and responsive behaviour intact the whole way through.",
  },
];

export function About() {
  return (
    <Section id="about">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <SectionHeading
              eyebrow="About"
              title={
                <>
                  Frontend work that survives
                  <span className="text-accent"> real conditions</span>.
                </>
              }
            />
          </Reveal>

          <Reveal delay={0.1} className="mt-8">
            <div className="glass relative overflow-hidden rounded-2xl p-6">
              <p className="text-sm leading-relaxed text-muted">
                Currently based in Lagos, Nigeria and open to remote roles and
                relocation. Comfortable leading projects independently in Agile
                environments and working directly with designers and
                stakeholders.
              </p>
              <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-line-soft pt-4">
                <div>
                  <dt className="font-mono text-[10px] tracking-wider text-faint uppercase">
                    Languages
                  </dt>
                  <dd className="mt-1 text-sm text-ink">
                    {site.languages.join(" · ")}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] tracking-wider text-faint uppercase">
                    Availability
                  </dt>
                  <dd className="mt-1 text-sm text-ink">
                    {site.availability}
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col gap-6">
          <Reveal delay={0.12}>
            <div className="flex flex-col gap-5">
              {site.bio.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed text-muted sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <div className="mt-3 flex flex-col gap-4">
            {highlights.map((h, i) => (
              <Reveal key={h.title} delay={0.16 + i * 0.08}>
                <div className="group flex gap-4 rounded-xl border border-line-soft bg-surface/50 p-5 transition-all duration-400 hover:border-accent/35 hover:bg-surface">
                  <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line bg-surface-2 font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-ink">{h.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {h.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}