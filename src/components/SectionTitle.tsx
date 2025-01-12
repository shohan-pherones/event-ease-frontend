"use client";

import { motion } from "framer-motion";
import { fadeUp } from "../utils/motion";

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <>
      <div className="overflow-hidden">
        <motion.h3
          initial="hidden"
          whileInView="visible"
          variants={fadeUp()}
          className="text-2xl md:text-3xl font-bold"
        >
          {title}
        </motion.h3>
      </div>
      <div className="mb-5 md:mb-10"></div>
    </>
  );
};

export default SectionTitle;
