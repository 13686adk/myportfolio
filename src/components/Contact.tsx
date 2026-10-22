"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Loader2,
  Mail,
  MessageSquare,
} from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  XIcon,
} from "@/components/BrandIcons";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/primitives";
import { site } from "@/data/site";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";
const IS_CONFIGURED = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

type Status = "idle" | "sending" | "success" | "error";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const socials = [
  { label: "GitHub", href: site.socials.github, Icon: GithubIcon },
  { label: "LinkedIn", href: site.socials.linkedin, Icon: LinkedinIcon },
  ...(site.socials.x
    ? [{ label: "X", href: site.socials.x, Icon: XIcon }]
    : []),
  { label: "Email", href: site.socials.mailto, Icon: Mail },
];

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function validate(): Errors {
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      next.email = "Please enter a valid email address.";
    if (form.message.trim().length < 10)
      next.message = "Tell me a little more — at least 10 characters.";
    return next;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("sending");
    try {
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name.trim(),
          reply_to: form.email.trim(),
          message: form.message.trim(),
          to_name: site.name,
        },
        { publicKey: PUBLIC_KEY },
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS send failed:", err);
      setStatus("error");
    }
  }

  const inputBase =
    "w-full rounded-xl border bg-canvas/70 px-4 py-3 text-sm text-ink placeholder:text-faint transition-colors duration-300 outline-none focus:border-accent/70";
  const ok = (k: keyof Errors) => `border-line ${errors[k] ? "border-red-400/70" : ""}`;

  return (
    <Section id="contact">
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* Left */}
        <div>
          <Reveal>
            <SectionHeading
              eyebrow="Contact"
              title={
                <>
                  Let&rsquo;s build something{" "}
                  <span className="text-accent">worth shipping</span>
                </>
              }
              description="Available for frontend roles, freelance builds and interesting product work. I read every message."
            />
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-9 flex flex-wrap gap-2.5">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface-2/60 px-4 py-2.5 text-sm text-muted transition-all duration-300 hover:border-accent/55 hover:text-ink"
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-9 rounded-2xl border border-line-soft bg-surface/40 p-5">
              <p className="flex items-center gap-2 text-sm font-medium text-ink">
                <MessageSquare className="h-4 w-4 text-accent" />
                Prefer a direct line?
              </p>
              <ul className="mt-3 flex flex-col gap-2.5">
                {site.phones.map((phone) => (
                  <li
                    key={phone.display}
                    className="flex flex-wrap items-center gap-x-3 gap-y-1"
                  >
                    <a
                      href={phone.tel}
                      className="inline-flex items-center gap-1.5 font-mono text-sm text-accent transition-colors hover:text-accent-soft"
                    >
                      {phone.display}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                    <a
                      href={phone.whatsapp}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="rounded-md border border-line bg-surface-2/70 px-2 py-0.5 text-[11px] text-muted transition-colors hover:border-accent/50 hover:text-accent"
                    >
                      WhatsApp
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Right — form */}
        <Reveal direction="left" delay={0.1}>
          <div className="glass relative overflow-hidden rounded-2xl p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                  className="flex min-h-[26rem] flex-col items-center justify-center gap-4 text-center"
                >
                  <span className="grid h-14 w-14 place-items-center rounded-full border border-accent/40 bg-accent/10">
                    <CheckCircle2 className="h-7 w-7 text-accent" />
                  </span>
                  <h3 className="text-xl font-semibold text-ink">
                    Message sent
                  </h3>
                  <p className="max-w-xs text-sm text-muted">
                    Thanks for reaching out. I&rsquo;ll get back to you within a
                    couple of days.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-2 rounded-lg border border-line bg-surface-2/70 px-5 py-2 text-sm text-ink transition-colors hover:border-accent/55"
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-5"
                >

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      id="name"
                      label="Name"
                      error={errors.name}
                      value={form.name}
                      onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                      placeholder="Your name"
                      autoComplete="name"
                      inputBase={inputBase}
                      okClass={ok("name")}
                    />
                    <Field
                      id="email"
                      type="email"
                      label="Email"
                      error={errors.email}
                      value={form.email}
                      onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                      placeholder="you@company.com"
                      autoComplete="email"
                      inputBase={inputBase}
                      okClass={ok("email")}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-xs font-medium tracking-wide text-muted"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={form.message}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, message: e.target.value }))
                      }
                      placeholder="What are you building, and where do you need a hand?"
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      className={`${inputBase} resize-y ${ok("message")}`}
                    />
                    {errors.message ? (
                      <p
                        id="message-error"
                        className="mt-1.5 text-xs text-red-400"
                      >
                        {errors.message}
                      </p>
                    ) : null}
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-canvas transition-shadow duration-300 hover:shadow-[0_0_38px_-8px_var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    {status === "sending" ? (
                      <>
                        <Loader2 className="relative h-4 w-4 animate-spin" />
                        <span className="relative">Sending…</span>
                      </>
                    ) : (
                      <>
                        <span className="relative">Send message</span>
                        <ArrowUpRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>

                  <AnimatePresence>
                    {status === "error" ? (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        role="alert"
                        className="rounded-lg border border-red-400/35 bg-red-400/8 px-4 py-3 text-xs text-red-300"
                      >
                        Something went wrong sending your message. Please try
                        again, or email me directly at{" "}
                        <a href={site.socials.mailto} className="underline">
                          {site.email}
                        </a>
                        .
                      </motion.p>
                    ) : null}
                  </AnimatePresence>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function Field({
  id,
  label,
  error,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
  inputBase,
  okClass,
}: {
  id: string;
  label: string;
  error?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  inputBase: string;
  okClass: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-medium tracking-wide text-muted"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${inputBase} ${okClass}`}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}