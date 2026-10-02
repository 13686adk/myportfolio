import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <span className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.22em] text-accent uppercase">
        <span className="h-px w-6 bg-accent/60" />
        {eyebrow}
      </span>
      <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed text-muted",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function Pill({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-surface-2/70 px-3 py-1 font-mono text-xs text-muted transition-colors duration-300 hover:border-accent/50 hover:text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-24 py-20 sm:py-28 md:py-32", className)}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

export function GradientDivider() {
  return (
    <div
      aria-hidden
      className="mx-auto h-px w-full max-w-76rem bg-gradient-to-r from-transparent via-line to-transparent"
    />
  );
}