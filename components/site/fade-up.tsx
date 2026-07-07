"use client";

import { motion } from "motion/react";

export function FadeUp({
  children,
  delay = 0,
  className,
  nosnippet,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** Excludes the content from Google search snippets. */
  nosnippet?: boolean;
}) {
  return (
    <motion.div
      className={className}
      data-nosnippet={nosnippet ? "" : undefined}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
