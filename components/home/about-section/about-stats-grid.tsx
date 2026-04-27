"use client";

import { motion } from "motion/react";

import { sectionEase, sectionMotionViewport } from "../section-motion";
import { ABOUT_STATS } from "./about-data";
import { AboutStatCard } from "./about-stat-card";

export function AboutStatsGrid() {
  return (
    <div className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-3 sm:items-stretch sm:gap-4">
      {ABOUT_STATS.map((stat, index) => (
        <motion.div
          key={stat.id}
          className="h-full min-h-0"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={sectionMotionViewport}
          transition={{ duration: 0.58, delay: index * 0.1, ease: sectionEase }}
        >
          <AboutStatCard stat={stat} index={index} />
        </motion.div>
      ))}
    </div>
  );
}
