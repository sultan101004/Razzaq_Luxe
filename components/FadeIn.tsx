"use client";

import { motion, type MotionProps } from "motion/react";

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
} & Omit<MotionProps, "children">;

export function FadeIn({
  children,
  className,
  delay = 0,
  ...motionProps
}: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
