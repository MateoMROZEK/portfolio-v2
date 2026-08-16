"use client";

import { motion } from "motion/react";
import { pageTransition } from "@/lib/motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={pageTransition} initial="hidden" animate="show">
      {children}
    </motion.div>
  );
}
