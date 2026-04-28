import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import { STATS } from "../constants";

const Icon = ({ type }: { type: "sparkles" | "code" | "terminal" }) => {
  if (type === "sparkles") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-gray-400" fill="currentColor">
        <path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9L12 2z" />
        <path d="M19 15l.8 2.7L22.5 18l-2.7.8L19 21.5l-.8-2.7-2.7-.8 2.7-.8L19 15z" />
      </svg>
    );
  }
  if (type === "code") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 9l-4 3 4 3" />
        <path d="M16 9l4 3-4 3" />
        <path d="M14 4l-4 16" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 7l6 5-6 5" />
      <path d="M12 19h8" />
    </svg>
  );
};

export const About = () => {
  const handleContactClick = () => {
    if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
      window.location.href = "tel:+918708574843";
    } else {
      window.location.href = "mailto:kuber98jha@gmail.com";
    }
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
          className="mt-4 max-w-4xl space-y-6 text-gray-300 leading-relaxed text-base sm:text-lg"
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

        {/* Stats Grid */}
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={fadeIn("up", "spring", index * 0.1, 0.75)}
              className="rounded-xl bg-white/5 p-5 border border-white/5 hover:border-white/10 transition-all hover:bg-white/10"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-white">
                {stat.value}
              </h3>
              <p className="mt-1 text-xs md:text-sm text-gray-400">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack */}
        <motion.div
          variants={fadeIn(undefined, undefined, 0.25, 1)}
          className="mt-14"
        >
          <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold text-white">
            <Icon type="code" />
            Technologies I work with
          </h3>
          <div className="flex flex-wrap gap-2">
            {["React", "Next.js", "React Native", "Node.js", "Java", "Spring Boot", "MongoDB", "PostgreSQL", "TypeScript", "Docker", "AWS"].map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-white/5 border border-white/5 px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:border-white/10 transition"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          variants={fadeIn(undefined, undefined, 0.35, 1)}
          className="mt-14 rounded-2xl bg-white/5 p-8 border border-white/5"
        >
          <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-white">
            <Icon type="terminal" />
            Education & Background
          </h3>
          <p className="text-gray-300">Bachelor's Degree in Computer Science</p>
          <p className="mt-2 text-sm text-gray-400 leading-relaxed">
            Specialized in Full Stack Development with a focus on scalable web
            and mobile applications.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          variants={fadeIn("up", "spring", 0.45, 0.75)}
          className="mt-10"
        >
          <button
            type="button"
            onClick={handleContactClick}
            className="group relative overflow-hidden rounded-lg bg-white px-8 py-3 font-medium text-black transition-all hover:bg-gray-200"
          >
            <span className="relative z-10">Get In Touch</span>
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </button>
        </motion.div>
      </>
    </SectionWrapper>
  );
};