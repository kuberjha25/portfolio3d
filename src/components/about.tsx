import { motion } from "framer-motion";

import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

const stats = [
  { value: "5+", label: "Years Experience" },
  { value: "50+", label: "Projects Completed" },
  { value: "20+", label: "Happy Clients" },
  { value: "24/7", label: "Support" },
];

const techStack = [
  "React",
  "Next.js",
  "React Native",
  "Node.js",
  "Java",
  "Spring Boot",
  "MongoDB",
  "PostgreSQL",
];

const Icon = ({ type }: { type: "sparkles" | "code" | "terminal" }) => {
  if (type === "sparkles") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#b49bff]" fill="currentColor">
        <path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9L12 2z" />
        <path d="M19 15l.8 2.7L22.5 18l-2.7.8L19 21.5l-.8-2.7-2.7-.8 2.7-.8L19 15z" />
      </svg>
    );
  }

  if (type === "code") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M8 9l-4 3 4 3" />
        <path d="M16 9l4 3-4 3" />
        <path d="M14 4l-4 16" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 7l6 5-6 5" />
      <path d="M12 19h8" />
    </svg>
  );
};

export const About = () => {
  const handleContactClick = () => {
    if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
      window.location.href = "tel:+918708574843";
      return;
    }

    window.location.href = "mailto:kuber98jha@gmail.com";
  };

  return (
    <SectionWrapper idName="about">
      <>
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>Introduction</p>
          <h2 className={styles.sectionHeadText}>About Me.</h2>
        </motion.div>

        <motion.div
          variants={fadeIn(undefined, undefined, 0.1, 1)}
          className="mt-4 max-w-4xl space-y-6 text-[17px] leading-[30px] text-secondary"
        >
          <p>
            I'm a passionate Full Stack Developer with over 5 years of
            experience in building scalable web and mobile applications.
            Currently working at{" "}
            <span className="font-semibold text-white">
              Paul Merchants Limited
            </span>
            , where I create innovative solutions using React, React Native,
            Java, and Spring Boot.
          </p>

          <p>
            My journey in tech started during my Computer Science degree, where
            I fell in love with creating things that live on the internet. Since
            then, I've worked on diverse projects ranging from e-commerce
            platforms to mobile apps serving thousands of users.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={fadeIn("up", "spring", index * 0.15, 0.75)}
              className="rounded-xl bg-black-100 p-5"
            >
              <h3 className="text-[34px] font-bold text-white">
                {stat.value}
              </h3>
              <p className="mt-1 text-[14px] font-medium text-secondary">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeIn(undefined, undefined, 0.25, 1)}
          className="mt-14"
        >
          <h3 className="mb-5 flex items-center gap-2 text-[22px] font-bold text-white">
            <Icon type="code" />
            Technologies I work with
          </h3>
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-tertiary px-4 py-2 text-sm text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn(undefined, undefined, 0.35, 1)}
          className="mt-14 rounded-2xl bg-black-100 p-8"
        >
          <h3 className="mb-4 flex items-center gap-2 text-[22px] font-bold text-white">
            <Icon type="terminal" />
            Education & Background
          </h3>
          <p className="text-secondary">Bachelor's Degree in Computer Science</p>
          <p className="mt-2 text-[15px] leading-[28px] text-white">
            Specialized in Full Stack Development with a focus on scalable web
            and mobile applications.
          </p>
        </motion.div>

        <motion.div
          variants={fadeIn("up", "spring", 0.45, 0.75)}
          className="mt-10"
        >
          <button
            type="button"
            onClick={handleContactClick}
            className="rounded-lg bg-[#915eff] px-8 py-3 font-medium text-white transition duration-300 hover:bg-[#7d4de0]"
          >
            Get In Touch
          </button>
        </motion.div>
      </>
    </SectionWrapper>
  );
};
