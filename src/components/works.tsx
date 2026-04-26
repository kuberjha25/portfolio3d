import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import { github as githubIcon, preview } from "../assets";
import { PROJECTS } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

type Project = (typeof PROJECTS)[number];

type ProjectCardProps = {
  project: Project;
  index: number;
};

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [hovered, setHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-240, 240], [8, -8]), {
    damping: 25,
    stiffness: 300,
  });
  const rotateY = useSpring(useTransform(mouseX, [-240, 240], [-8, 8]), {
    damping: 25,
    stiffness: 300,
  });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left - rect.width / 2);
    mouseY.set(event.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      layout
      variants={fadeIn("up", "spring", index * 0.08, 0.6)}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, scale: 0.88, y: -24 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative h-[500px] w-full max-w-[400px]"
    >
      <motion.article
        animate={{
          boxShadow: hovered
            ? "0 20px 40px rgba(112, 66, 248, 0.28)"
            : "0 10px 30px rgba(0, 0, 0, 0.35)",
          scale: hovered ? 1.02 : 1,
        }}
        className="absolute inset-0 cursor-pointer overflow-hidden rounded-2xl border border-[#7042f88b] bg-[#030014] backdrop-blur-sm"
        onClick={() => setShowDetails(true)}
      >
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute -left-16 top-10 h-48 w-48 rounded-full bg-purple-500/25 blur-3xl" />
          <div className="absolute -right-20 bottom-16 h-56 w-56 rounded-full bg-cyan-500/20 blur-3xl" />
        </div>

        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition duration-500"
            style={{ transform: hovered ? "scale(1.1)" : "scale(1)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030014] to-transparent" />
          <motion.div
            animate={{
              scale: hovered ? 1.08 : 1,
              backgroundColor: hovered ? "#7042f8" : "#030014",
            }}
            className="absolute right-4 top-4 rounded-full border border-[#7042f88b] px-3 py-1 text-xs text-purple-200"
          >
            {project.category}
          </motion.div>
        </div>

        <div className="relative z-10 p-6">
          <motion.h3
            animate={{ color: hovered ? "#b49bff" : "#ffffff" }}
            className="mb-2 text-2xl font-bold"
          >
            {project.title}
          </motion.h3>
          <p className="mb-4 line-clamp-3 text-sm text-gray-400">
            {project.shortDescription}
          </p>

          <div className="mb-4 flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-[#7042f88b] bg-[#1a1a2e] px-2 py-1 text-xs text-purple-300"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="rounded-full bg-[#1a1a2e] px-2 py-1 text-xs text-gray-400">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          <div className="flex gap-3">
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer noopener"
              onClick={(event) => event.stopPropagation()}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 py-2 text-sm font-medium text-white"
            >
              <img src={preview} alt="" className="h-4 w-4" />
              Live Demo
            </a>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer noopener"
                onClick={(event) => event.stopPropagation()}
                className="flex items-center justify-center rounded-lg border border-[#7042f88b] px-4 py-2 text-sm text-gray-300 transition hover:bg-[#7042f8] hover:text-white"
              >
                <img src={githubIcon} alt="GitHub" className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </motion.article>

      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotateY: 180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.92, rotateY: 180 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 z-20 overflow-hidden rounded-2xl border border-[#7042f88b] bg-[#030014]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute inset-0 opacity-30">
              <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-500/30 blur-3xl" />
            </div>

            <div className="relative z-10 h-full overflow-y-auto p-6">
              <button
                type="button"
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-[#7042f88b] bg-[#1a1a2e] text-white transition hover:bg-purple-600"
                onClick={() => setShowDetails(false)}
              >
                x
              </button>

              <h2 className="mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text pr-10 text-3xl font-bold text-transparent">
                {project.title}
              </h2>

              <div className="space-y-5 text-gray-300">
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-purple-400">
                    Full Description
                  </h3>
                  <p className="whitespace-pre-line text-sm leading-relaxed">
                    {project.fullDescription}
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-semibold text-purple-400">
                    Key Features
                  </h3>
                  <ul className="list-inside list-disc space-y-1">
                    {project.features.map((feature) => (
                      <li key={feature} className="text-sm">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-semibold text-purple-400">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-[#7042f88b] bg-[#1a1a2e] px-3 py-1 text-xs text-purple-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex-1 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 py-3 text-center font-medium text-white"
                >
                  View Live Demo
                </a>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex-1 rounded-lg border border-[#7042f88b] py-3 text-center text-gray-300 transition hover:bg-[#7042f8] hover:text-white"
                  >
                    View Source Code
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const Works = () => {
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...new Set(PROJECTS.map((project) => project.category))];
  const filteredProjects =
    filter === "All"
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === filter);

  return (
    <SectionWrapper idName="projects">
      <>
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>My Work</p>
          <h2 className={styles.sectionHeadText}>Projects.</h2>
        </motion.div>

        <motion.p
          variants={fadeIn(undefined, undefined, 0.1, 1)}
          className="mt-3 max-w-3xl text-[17px] leading-[30px] text-secondary"
        >
          Following projects showcase my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos.
        </motion.p>

        <div className="mb-12 mt-12 flex flex-wrap justify-center gap-4">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              type="button"
              variants={fadeIn("up", "spring", index * 0.06, 0.5)}
              onClick={() => setFilter(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={
                filter === category
                  ? "rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 px-6 py-2 text-sm font-medium text-white shadow-lg shadow-purple-500/30"
                  : "rounded-full border border-[#7042f88b] bg-[#030014] px-6 py-2 text-sm font-medium text-gray-400 transition hover:border-purple-500 hover:text-white"
              }
            >
              {category}
            </motion.button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center text-gray-400"
          >
            No projects found in this category.
          </motion.div>
        )}
      </>
    </SectionWrapper>
  );
};
