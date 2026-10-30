import { motion } from "framer-motion";

import { styles } from "../styles";
import { cn } from "../utils/lib";
import { staggerContainer } from "../utils/motion";

type SectionWrapperProps = {
  children: React.ReactNode;
  idName?: string;
  className?: string;
};

export const SectionWrapper = ({ children, idName, className }: SectionWrapperProps) => (
  <motion.section
    variants={staggerContainer(0.06)}
    initial="hidden"
    whileInView="show"
    // Small threshold so very tall sections (e.g. experience on phones) still animate in
    viewport={{ once: true, amount: 0.05 }}
    className={cn(styles.padding, "max-w-7xl mx-auto relative z-0", className)}
  >
    <span className="hash-span" id={idName}>
      &nbsp;
    </span>
    {children}
  </motion.section>
);
