import { useState } from "react";
import { motion } from "framer-motion";
import { 
  TECHNOLOGIES_FRONTEND, 
  TECHNOLOGIES_BACKEND, 
  TECHNOLOGIES_MOBILE,
  TECHNOLOGIES_DEVOPS 
} from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { textVariant, fadeIn } from "../utils/motion";
import { cn } from "../utils/lib";

type Technology = {
  name: string;
  icon: string;
};

type SkillCategoryProps = {
  title: string;
  technologies: readonly Technology[];
  delayStart: number;
};

const SkillCategory = ({ title, technologies, delayStart }: SkillCategoryProps) => {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  return (
    <motion.div
      variants={fadeIn("up", "spring", delayStart, 0.75)}
      className="w-full"
    >
      <h3 className="mb-6 text-center text-[22px] font-bold text-white sm:mb-8 sm:text-left sm:text-[24px]">
        {title}
      </h3>

      <div className="grid grid-cols-4 justify-items-center gap-x-3 gap-y-8 sm:flex sm:flex-row sm:flex-wrap sm:justify-center sm:gap-10 lg:justify-start">
        {technologies.map((technology, index) => {
          const isSelected = selectedTech === technology.name;

          return (
            <motion.button
              key={technology.name}
              type="button"
              variants={fadeIn("up", "spring", delayStart + index * 0.1, 0.5)}
              aria-label={technology.name}
              aria-pressed={isSelected}
              onClick={() =>
                setSelectedTech((current) =>
                  current === technology.name ? null : technology.name
                )
              }
              className="group relative flex h-16 w-16 items-center justify-center rounded-lg bg-tertiary p-3 outline-none transition duration-300 hover:-translate-y-2 hover:bg-[#24243d] focus-visible:ring-2 focus-visible:ring-[#915eff] sm:h-28 sm:w-28 sm:rounded-xl sm:p-4"
            >
              <img
                src={technology.icon}
                alt=""
                className="w-full h-full object-contain transition duration-300 group-hover:scale-90"
              />
              <span
                className={cn(
                  "absolute -bottom-10 left-1/2 z-20 max-w-[160px] -translate-x-1/2 whitespace-nowrap rounded-md bg-black-100 px-3 py-1.5 text-sm font-medium text-white opacity-0 shadow-card transition duration-200 group-hover:opacity-100 group-focus-visible:opacity-100",
                  isSelected && "opacity-100"
                )}
              >
                {technology.name}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

// Main Section
export const Tech = () => {
  return (
    <SectionWrapper idName="skills">
      <>
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>My Expertise</p>
          <h2 className={styles.sectionHeadText}>Technologies.</h2>
        </motion.div>

        <motion.p
          variants={fadeIn(undefined, undefined, 0.1, 1)}
          className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px] mb-16"
        >
          Over the years, I've worked with a diverse range of technologies across the full stack.
        </motion.p>

        <div className="w-full space-y-16">
          <SkillCategory title="Frontend Development" technologies={TECHNOLOGIES_FRONTEND} delayStart={0.2} />
          <SkillCategory title="Backend Development" technologies={TECHNOLOGIES_BACKEND} delayStart={0.3} />
          <SkillCategory title="Mobile Development" technologies={TECHNOLOGIES_MOBILE} delayStart={0.4} />
          <SkillCategory title="DevOps & Tools" technologies={TECHNOLOGIES_DEVOPS} delayStart={0.5} />
        </div>
      </>
    </SectionWrapper>
  );
};
