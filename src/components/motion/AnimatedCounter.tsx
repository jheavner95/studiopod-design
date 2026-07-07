"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { motionEase } from "@/lib/tokens";
import { useMotionPreference } from "./MotionPreference";

interface AnimatedCounterProps {
  /** The target number to count up to. */
  value: number;
  /** Seconds the count-up takes. */
  duration?: number;
  /** Formats the (possibly fractional, mid-animation) number for display. Defaults to a rounded, comma-grouped integer. */
  format?: (value: number) => string;
  className?: string;
}

const defaultFormat = (value: number) => Math.round(value).toLocaleString();

/** Counts up from 0 to `value` once it scrolls into view. Renders the final value instantly under reduced motion. */
export function AnimatedCounter({ value, duration = 1.2, format = defaultFormat, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useMotionPreference();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (reduceMotion || !isInView) return;

    const controls = animate(0, value, {
      duration,
      ease: motionEase.standard,
      onUpdate: setDisplay,
    });

    return () => controls.stop();
  }, [isInView, value, duration, reduceMotion]);

  const shown = reduceMotion ? value : display;

  return (
    <span ref={ref} className={className}>
      {format(shown)}
    </span>
  );
}
