"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, MapPin, Sparkles } from "lucide-react";
import { rotatingWords, site } from "@/data/site";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

const TYPE_INTERVAL = 85;
const DELETE_INTERVAL = 45;
const HOLD_MS = 1900;

function TypingLine() {
  const reduce = usePrefersReducedMotion();

  // Single source of truth so every transition happens inside a timer callback
  // rather than synchronously in the effect body. Starts empty so the server
  // render and the first client render always match.
  const [state, setState] = useState({
    text: "",
    index: 0,
    deleting: false,
  });

  useEffect(() => {
    const word = rotatingWords[state.index % rotatingWords.length];

    // Respect reduced motion: settle on the first word and stop animating.
    if (reduce) {
      if (state.text !== rotatingWords[0] || state.deleting) {
        const t = setTimeout(
          () =>
            setState((s) => ({
              ...s,
              text: rotatingWords[0],
              deleting: false,
            })),
          0,
        );
        return () => clearTimeout(t);
      }
      return;
    }

    // Word fully typed — hold, then start deleting.
    if (!state.deleting && state.text === word) {
      const t = setTimeout(
        () => setState((s) => ({ ...s, deleting: true })),
        HOLD_MS,
      );
      return () => clearTimeout(t);
    }

    // Fully deleted — advance to the next word.
    if (state.deleting && state.text === "") {
      const t = setTimeout(
        () => setState((s) => ({ ...s, deleting: false, index: s.index + 1 })),
        120,
      );
      return () => clearTimeout(t);
    }

    // Type or delete one character.
    const t = setTimeout(
      () =>
        setState((s) => ({
          ...s,
          text: s.deleting
            ? rotatingWords[s.index % rotatingWords.length].slice(
                0,
                s.text.length - 1,
              )
            : rotatingWords[s.index % rotatingWords.length].slice(
                0,
                s.text.length + 1,
              ),
        })),
      state.deleting ? DELETE_INTERVAL : TYPE_INTERVAL,
    );
    return () => clearTimeout(t);
  }, [state, reduce]);

  return (
    <span className="font-mono text-accent">
      {state.text || "..."}
      <span className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[2px] animate-blink bg-accent" />
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16"
    >
      {/* Backdrop layers */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-bg absolute inset-0 opacity-[0.55] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_35%,black,transparent)]" />
        <div className="absolute left-1/2 top-[-14rem] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-accent/12 blur-[130px]" />
        <div className="absolute right-[-10rem] top-1/3 h-[26rem] w-[26rem] rounded-full bg-accent-2/10 blur-[120px]" />
        <div className="absolute left-[-8rem] bottom-0 h-[22rem] w-[22rem] rounded-full bg-accent-3/10 blur-[120px]" />
        {/* Decorative dots — always rendered so the markup is stable; the
            reduced-motion media query in globals.css stops them animating. */}
        <div className="absolute left-[14%] top-[26%] h-1.5 w-1.5 rounded-full bg-accent/70 animate-float" />
        <div className="absolute right-[22%] top-[18%] h-1.5 w-1.5 rounded-full bg-accent-2/70 animate-float [animation-delay:1.6s]" />
        <div className="absolute left-[62%] bottom-[24%] h-1.5 w-1.5 rounded-full bg-accent-3/70 animate-float [animation-delay:3.1s]" />
      </div>

      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          {/* Left column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 py-1.5 pr-4 pl-1.5 backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent/70 animate-pulse-ring" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="text-xs font-medium text-muted">{site.availability}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 text-5xl font-semibold tracking-[-0.035em] text-balance sm:text-6xl lg:text-[4.5rem] lg:leading-[1.02]"
            >
              <span className="block text-muted">{site.firstName} here.</span>
              <span className="text-gradient block animate-gradient">
                I build interfaces
              </span>
              <span className="block">that handle money.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 font-mono text-sm text-muted sm:text-base"
            >
              <span className="text-faint">&gt;&nbsp;</span>
              <TypingLine />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            >
              {site.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a
                href="#work"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-canvas transition-shadow duration-300 hover:shadow-[0_0_38px_-8px_var(--color-accent)]"
              >
                <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <Sparkles className="relative h-4 w-4" />
                <span className="relative">View my work</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface-2/60 px-6 py-3 text-sm font-medium text-ink transition-all duration-300 hover:border-accent/60 hover:bg-surface-2"
              >
                Get in touch
              </a>
              <a
                href={site.resumeUrl}
                download
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface-2/60 px-6 py-3 text-sm font-medium text-ink transition-all duration-300 hover:border-accent/60 hover:bg-surface-2"
              >
                <Download className="h-4 w-4" />
                Résumé
              </a>
              <span className="ml-1 inline-flex items-center gap-1.5 font-mono text-xs text-faint">
                <MapPin className="h-3.5 w-3.5" />
                {site.location}
              </span>
            </motion.div>

            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-line-soft pt-7"
            >
              {site.stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-mono text-2xl font-semibold text-ink sm:text-3xl">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-xs text-faint">{s.label}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Right column — code card */}
          <motion.div
            initial={{ opacity: 0, y: 32, rotate: 1.5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <CodeCard />
          </motion.div>
        </div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          aria-label="Scroll to about section"
          className="mx-auto mt-14 hidden w-fit animate-bounce text-faint transition-colors hover:text-accent lg:flex"
        >
          <ArrowDown className="h-5 w-5" />
        </motion.a>
      </div>
    </section>
  );
}

const snippet: Array<[string, string] | [string]> = [
  ["export", " "],
  ["const", " "],
  ["developer", " = {"],
  ["  name", ": "],
  ["'Abdulkadir Mustapha'", ","],
  ["  role", ": "],
  ["'Front-End Developer'", ","],
  ["  location", ": "],
  ["'Lagos, NG'", ","],
  ["  stack", ": ["],
  ["    'React',", " "],
  ["    'Next.js',", " "],
  ["    'TypeScript',", " "],
  ["    'React Native',", " "],
  ["    'Flutter',", " "],
  ["    'Tailwind CSS',", " "],
  ["  ],"],
  ["  shipping", ": "],
  ["true", ","],
  ["  available", ": "],
  ["'open to work'", ","],
  ["};"],
];

function CodeCard() {
  const reduce = usePrefersReducedMotion();
  // Always starts empty so the server render matches the first client render.
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Reduced motion: jump straight to the finished snippet, no typing.
    if (reduce) {
      if (step !== snippet.length) {
        const t = setTimeout(() => setStep(snippet.length), 0);
        return () => clearTimeout(t);
      }
      return;
    }

    const t = setTimeout(() => {
      setStep((s) => (s >= snippet.length ? 0 : s + 1));
    }, step === snippet.length ? 2600 : 92);
    return () => clearTimeout(t);
  }, [step, reduce]);

  return (
    <div className="glass relative overflow-hidden rounded-2xl shadow-2xl shadow-black/50">
      <div className="flex items-center gap-2 border-b border-line-soft bg-surface-2/50 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-xs text-faint">developer.ts</span>
      </div>

      <div className="relative h-[26rem] overflow-hidden p-5 font-mono text-[13px] leading-relaxed">
        <pre className="flex flex-col">
          {snippet.slice(0, step).map((line, i) => (
            <code key={i} className="whitespace-pre">
              <span className="text-faint select-none">{String(i + 1).padStart(2, "0")} </span>
              <SyntaxLine parts={line} />
            </code>
          ))}
          <span className="absolute bottom-5 left-5 h-4 w-2 bg-accent/80 animate-blink" />
        </pre>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-transparent to-canvas/85"
        />
      </div>

      <div className="flex items-center justify-between border-t border-line-soft bg-surface-2/40 px-5 py-3 font-mono text-xs text-faint">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          TypeScript
        </span>
        <span>UTF-8</span>
      </div>
    </div>
  );
}

function SyntaxLine({ parts }: { parts: [string, string] | [string] }) {
  const [left, right] = parts;
  const isKey = left.trim().startsWith("'") || left.trim().endsWith(":");

  return (
    <>
      <span
        className={
          isKey
            ? "text-accent-2"
            : left === "export" || left === "const"
              ? "text-accent-3"
              : "text-muted"
        }
      >
        {left}
      </span>
      {right ? <span className="text-ink">{right}</span> : null}
    </>
  );
}