"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

/**
 * Always `false` on the server and during hydration, so markup that branches on
 * reduced motion can never mismatch.
 */
function getServerSnapshot() {
  return false;
}

/**
 * Hydration-safe reduced-motion detection.
 *
 * Framer Motion's own `useReducedMotion` reads `matchMedia` *during render*,
 * which yields `false` on the server but the real value on the client's first
 * render. Branching markup on it therefore causes a hydration mismatch for users
 * who have reduced motion enabled in their OS.
 *
 * `useSyncExternalStore` uses the server snapshot while rendering and hydrating,
 * then switches to the live snapshot once mounted.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}