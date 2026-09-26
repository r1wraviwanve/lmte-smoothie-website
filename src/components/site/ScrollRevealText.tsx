"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

export function ScrollRevealText({ text }: { text: string }) {
  const container = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 80%", "end 50%"],
  });

  const words = text.split(" ");

  return (
    <p
      ref={container}
      className="text-2xl md:text-3xl font-light text-text-100 leading-relaxed max-w-4xl flex flex-wrap"
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.25, 1]);
  return (
    <span className="mr-[0.25em] mt-[0.25em]">
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}
