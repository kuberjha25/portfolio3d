import { motion } from "framer-motion";

import { SKILL_GROUPS } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { cn } from "../utils/lib";
import { useLanguage } from "../context/LanguageContext";
import { SectionHeading } from "./Rich";

// Layout of the cards on large screens (12-column grid)
const SPANS: Record<string, string> = {
  ai: "lg:col-span-7",
  mobile: "lg:col-span-5",
  frontend: "lg:col-span-7",
  backend: "lg:col-span-5",
  data: "lg:col-span-4",
  cloud: "lg:col-span-4",
  integrations: "lg:col-span-4",
  product: "lg:col-span-12",
};

export const Tech = () => {
  const { t } = useLanguage();

  return (
    <SectionWrapper idName="skills">
      <motion.div variants={textVariant()} className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading index="03" label={t("tech.label")} title={t("tech.title")} />
        <p className="max-w-sm text-[15px] leading-relaxed text-muted">{t("tech.description")}</p>
      </motion.div>

      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
        {SKILL_GROUPS.map((group, gi) => (
          <motion.div
            key={group.key}
            variants={fadeIn("up", undefined, 0.04 * gi, 0.7)}
            className={cn(
              "relative overflow-hidden rounded-3xl border p-6 sm:p-7",
              SPANS[group.key],
              group.featured
                ? "border-accent/25 bg-gradient-to-br from-accent/[0.10] via-surface to-surface sm:col-span-2"
                : "border-white/[0.08] bg-surface",
            )}
          >
            {group.featured && (
              <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(255,138,76,0.22),transparent_70%)]" />
            )}
            <div className="relative flex items-baseline justify-between gap-4">
              <h3 className={cn("text-lg font-semibold tracking-tight", group.featured ? "text-accent-soft" : "text-cream")}>
                {t(`tech.groups.${group.key}`)}
              </h3>
              <span className="text-xs tabular-nums text-muted">
                {String(group.skills.length).padStart(2, "0")}
              </span>
            </div>
            <ul className="relative mt-5 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li
                  key={skill.name}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-2 pr-3.5 text-sm text-cream/80 transition hover:border-white/25 hover:text-cream"
                >
                  {skill.icon ? (
                    // Light circle so dark logos (Next.js, Express) stay visible
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cream">
                      <img
                        src={skill.icon}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        width={16}
                        height={16}
                        className="h-4 w-4 object-contain"
                      />
                    </span>
                  ) : (
                    <span className="ml-1.5 h-1.5 w-1.5 rounded-full bg-accent/70" />
                  )}
                  {skill.name}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};
