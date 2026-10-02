import { ArrowUp, Mail } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  XIcon,
} from "@/components/BrandIcons";
import { navLinks, site } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { label: "GitHub", href: site.socials.github, Icon: GithubIcon },
    { label: "LinkedIn", href: site.socials.linkedin, Icon: LinkedinIcon },
    { label: "X", href: site.socials.x, Icon: XIcon },
    { label: "Email", href: site.socials.mailto, Icon: Mail },
  ];

  return (
    <footer className="relative border-t border-line-soft bg-surface/30">
      <div className="container-page py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-surface-2 font-mono text-sm text-accent">
                {site.initials}
              </span>
              <span className="text-sm font-semibold tracking-tight">
                {site.name}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {site.tagline}
            </p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent/35 bg-accent/8 px-3 py-1 text-xs text-accent">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent/70 animate-pulse-ring" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              {site.availability}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <div>
              <h2 className="font-mono text-xs tracking-[0.18em] text-faint uppercase">
                Navigate
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-sm text-muted transition-colors hover:text-accent"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-mono text-xs tracking-[0.18em] text-faint uppercase">
                Elsewhere
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {socials.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
                    >
                      <Icon className="h-3.5 w-3.5 text-faint transition-colors group-hover:text-accent" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-12 flex flex-col-reverse items-center justify-between gap-5 border-t border-line-soft pt-7 sm:flex-row">
          <p className="text-center font-mono text-xs text-faint sm:text-left">
            © {year} {site.name}. Built with Next.js, Tailwind CSS &amp;
            Framer Motion.
          </p>
          <a
            href="#top"
            aria-label="Back to top"
            className="group inline-flex items-center gap-2 rounded-lg border border-line bg-surface-2/60 px-3.5 py-2 font-mono text-xs text-muted transition-all duration-300 hover:border-accent/55 hover:text-accent"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}