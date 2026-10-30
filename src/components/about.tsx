import { motion } from "framer-motion";

import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { KEYWORDS, RESUME_URL, STATS } from "../constants";
import { useLanguage } from "../context/LanguageContext";
import { Rich, SectionHeading } from "./Rich";

// Infinite keyword strip. The list is rendered twice so the loop is seamless.
const Marquee = () => (
  <div className="marquee relative -mx-5 overflow-hidden border-y border-white/[0.06] py-6 sm:-mx-16">
    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent sm:w-32" />
    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent sm:w-32" />
    <div className="flex w-max animate-marquee items-center">
      {[0, 1].map((copy) => (
        <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
          {KEYWORDS.map((word, i) => (
            <span key={word} className="flex items-center">
              <span
                className={
                  i % 2
                    ? "kw whitespace-nowrap px-6 text-3xl sm:text-5xl"
                    : "whitespace-nowrap px-6 text-2xl font-semibold uppercase tracking-tight text-cream/90 sm:text-4xl"
                }
              >
                {word}
              </span>
              <span className="text-xl text-accent/70">✦</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export const About = () => {
  const { t } = useLanguage();

  return (
    <SectionWrapper idName="about">
      <motion.div variants={textVariant()}>
        <SectionHeading index="01" label={t("about.label")} title={t("about.title")} className="max-w-4xl" />
      </motion.div>

      <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Story */}
        <motion.div
          variants={fadeIn("up", undefined, 0.1, 0.8)}
          className="space-y-6 text-[17px] leading-[1.75] text-cream/65 sm:text-lg lg:col-span-7"
        >
          <p><Rich text={t("about.p1")} /></p>
          <p><Rich text={t("about.p2")} /></p>
          <p className="border-l-2 border-accent/60 pl-5 text-cream/85">
            <Rich text={t("about.p3")} />
          </p>

          <div className="flex flex-wrap gap-3 pt-4">
            <a
              href="#contact"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-cream px-6 text-sm font-medium text-ink transition hover:bg-accent"
            >
              {t("about.get_in_touch")}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href={RESUME_URL}
              download="KuberJha-Resume.pdf"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 px-6 text-sm font-medium text-cream transition hover:border-white/40"
            >
              {t("about.download_resume")} ↓
            </a>
          </div>
        </motion.div>

        {/* Side cards */}
        <motion.div variants={fadeIn("up", undefined, 0.2, 0.8)} className="flex flex-col gap-4 lg:col-span-5">
          <div className="relative overflow-hidden rounded-3xl border border-accent/25 bg-gradient-to-br from-accent/[0.12] via-surface to-surface p-7">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(255,138,76,0.25),transparent_70%)]" />
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-accent-soft">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {t("about.now_label")}
            </p>
            <p className="mt-5 text-2xl font-semibold tracking-tight text-cream">{t("about.now_role")}</p>
            <p className="mt-1 font-serif text-xl italic text-cream/60">{t("about.now_company")}</p>
          </div>

          <div className="rounded-3xl border border-white/[0.08] bg-surface p-7">
            <p className="text-xs uppercase tracking-[0.24em] text-muted">{t("about.education_title")}</p>
            <p className="mt-4 text-lg font-medium text-cream">{t("about.education_degree")}</p>
            <p className="mt-1 text-sm text-muted">{t("about.education_desc")}</p>
            <div className="my-5 h-px bg-white/[0.06]" />
            <p className="text-sm text-muted">{t("about.languages")}</p>
          </div>
        </motion.div>
      </div>

      <motion.div variants={fadeIn(undefined, undefined, 0.1, 0.8)} className="mt-20">
        <Marquee />
      </motion.div>

      {/* Numbers */}
      <div className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.key}
            variants={fadeIn("up", undefined, 0.05 * i, 0.7)}
            className="group bg-ink p-8 transition-colors hover:bg-surface"
          >
            <p className="font-serif text-6xl leading-none text-cream transition-colors group-hover:text-accent-soft sm:text-7xl">
              {stat.value}
            </p>
            <p className="mt-4 max-w-[26ch] text-sm leading-relaxed text-muted">
              {t(`about.stats.${stat.key}`)}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};
