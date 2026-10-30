import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { github as githubIcon } from "../assets";
import { PROJECTS, PROJECT_KINDS, type Project, type ProjectKind } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { cn } from "../utils/lib";
import { useLanguage } from "../context/LanguageContext";
import { SectionHeading } from "./Rich";

const MAX_CHIPS = 6;

// Cover for projects without a screenshot: big serif title on a soft gradient grid
const TypeCover = ({ project }: { project: Project }) => (
  <div className="relative flex h-full w-full items-end overflow-hidden bg-[radial-gradient(120%_90%_at_100%_0%,rgba(255,138,76,0.22),transparent_55%),radial-gradient(90%_80%_at_0%_100%,rgba(138,180,255,0.14),transparent_60%)] bg-surface-2 p-7">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:36px_36px]" />
    <p className="relative font-serif text-4xl italic leading-[0.95] text-cream/90 sm:text-5xl">
      {project.tagline}
    </p>
  </div>
);

const ProjectCard = ({ project }: { project: Project }) => {
  const { t } = useLanguage();
  const extra = project.stack.length - MAX_CHIPS;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-surface transition-colors hover:border-white/20"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {project.image ? (
          <>
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              decoding="async"
              width={800}
              height={500}
              className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
          </>
        ) : (
          <TypeCover project={project} />
        )}
        <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-ink/80 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-cream/80">
          {t(`works.kinds.${project.kind}`)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-xs uppercase tracking-[0.18em] text-muted">{project.context}</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-cream sm:text-[28px]">
          {project.title}
        </h3>
        {project.image && (
          <p className="mt-1 font-serif text-lg italic text-cream/55">{project.tagline}</p>
        )}
        <p className="mt-4 text-[15px] leading-relaxed text-cream/60">{project.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.slice(0, MAX_CHIPS).map((tech) => (
            <span key={tech} className="rounded-full border border-white/10 px-3 py-1 text-xs text-cream/60">
              {tech}
            </span>
          ))}
          {extra > 0 && (
            <span className="rounded-full bg-white/[0.04] px-3 py-1 text-xs text-muted">+{extra}</span>
          )}
        </div>

        {(project.github || project.live) && (
          <div className="mt-auto flex gap-2 pt-7">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-10 items-center gap-1.5 rounded-full bg-cream px-4 text-sm font-medium text-ink transition hover:bg-accent"
              >
                {t("works.live_site")} <span aria-hidden>↗</span>
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-sm text-cream transition hover:border-white/40"
              >
                <img src={githubIcon} alt="" width={16} height={16} className="h-4 w-4" />
                {t("works.source_code")}
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
};

export const Works = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<ProjectKind | "All">("All");
  const visible = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.kind === filter);
  const filters: (ProjectKind | "All")[] = ["All", ...PROJECT_KINDS];

  return (
    <SectionWrapper idName="projects">
      <motion.div variants={textVariant()} className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading index="04" label={t("works.label")} title={t("works.title")} />
        <p className="max-w-sm text-[15px] leading-relaxed text-muted">{t("works.description")}</p>
      </motion.div>

      <div className="mt-12 flex flex-wrap gap-2">
        {filters.map((kind) => {
          const count = kind === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.kind === kind).length;
          return (
            <button
              key={kind}
              type="button"
              onClick={() => setFilter(kind)}
              aria-pressed={filter === kind}
              className={cn(
                "inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm transition",
                filter === kind
                  ? "border-cream bg-cream text-ink"
                  : "border-white/10 text-cream/70 hover:border-white/30 hover:text-cream",
              )}
            >
              {kind === "All" ? t("works.all") : t(`works.kinds.${kind}`)}
              <span className={cn("text-xs tabular-nums", filter === kind ? "text-ink/50" : "text-muted")}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && <p className="py-20 text-center text-muted">{t("works.empty")}</p>}
    </SectionWrapper>
  );
};
