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
import { useLanguage } from "../context/LanguageContext";

type SkillCategoryProps = {
  title: string;
  technologies: readonly { name: string; icon: string }[];
  delayStart: number;
};

const SkillCategory = ({ title, technologies, delayStart }: SkillCategoryProps) => {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  return (
    <motion.div
      variants={fadeIn("up", "spring", delayStart, 0.75)}
      className="w-full"
    >
      <h3 className="mb-6 text-center text-lg font-semibold text-white sm:mb-8 sm:text-left">
        {title}
      </h3>
      <div className="grid grid-cols-4 justify-items-center gap-x-3 gap-y-8 sm:flex sm:flex-row sm:flex-wrap sm:justify-start sm:gap-6">
        {technologies.map((technology, index) => {
          const isSelected = selectedTech === technology.name;
          return (
            <motion.button
              key={technology.name}
              type="button"
              variants={fadeIn("up", "spring", delayStart + index * 0.05, 0.5)}
              aria-label={technology.name}
              aria-pressed={isSelected}
              onClick={() =>
                setSelectedTech((current) =>
                  current === technology.name ? null : technology.name
                )
              }
              className="group relative flex h-14 w-14 items-center justify-center rounded-xl bg-[#111827] p-3 transition-all hover:-translate-y-1 hover:bg-white/20 sm:h-20 sm:w-20"
            >
              <img
                src={technology.icon}
                alt=""
                className="h-full w-full object-contain transition duration-300 group-hover:scale-110"
              />
              <span
                className={cn(
                  "absolute -bottom-8 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100",
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

export const Tech = () => {
  const { t } = useLanguage();

  return (
    <SectionWrapper idName="skills">
      <>
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>{t('tech.subtitle')}</p>
          <h2 className={styles.sectionHeadText}>{t('tech.title')}</h2>
        </motion.div>
        <motion.p
          variants={fadeIn(undefined, undefined, 0.1, 1)}
          className="mt-4 text-gray-400 text-base max-w-3xl leading-relaxed mb-12"
        >
        </motion.p>
        <div className="w-full space-y-12">
          <SkillCategory title="Frontend" technologies={TECHNOLOGIES_FRONTEND} delayStart={0.2} />
          <SkillCategory title="Backend" technologies={TECHNOLOGIES_BACKEND} delayStart={0.3} />
          <SkillCategory title="Mobile" technologies={TECHNOLOGIES_MOBILE} delayStart={0.4} />
          <SkillCategory title="DevOps & Tools" technologies={TECHNOLOGIES_DEVOPS} delayStart={0.5} />
        </div>
      </>
    </SectionWrapper>
  );
};