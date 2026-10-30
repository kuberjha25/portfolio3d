import { useState } from "react";
import { motion } from "framer-motion";

import { EXPERIENCES, type Experience as ExperienceItem } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { useLanguage } from "../context/LanguageContext";
import { cn } from "../utils/lib";
import { Rich, SectionHeading } from "./Rich";

const VISIBLE_POINTS = 4;

const CompanyMark = ({ item }: { item: ExperienceItem }) => (
  <div
    className={cn(
      "flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border",
      item.logo && item.logoFill
        ? "border-white/10"
        : item.logo
          ? "border-white/10 bg-white"
          : "border-accent/40 bg-accent/10",
      item.current && "ring-2 ring-accent/30 ring-offset-2 ring-offset-ink",
    )}
  >
    {item.logo ? (
      <img
        src={item.logo}
        alt=""
        loading="lazy"
        decoding="async"
        width={48}
        height={48}
        className={item.logoFill ? "h-full w-full object-cover" : "h-8 w-8 object-contain"}
      />
    ) : (
      <span className="font-serif text-2xl italic text-accent">{item.monogram}</span>
    )}
  </div>
);

const Role = ({ item, index }: { item: ExperienceItem; index: number }) => {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const hidden = item.points.length - VISIBLE_POINTS;
  const points = expanded ? item.points : item.points.slice(0, VISIBLE_POINTS);

  return (
    <motion.li
      variants={fadeIn("up", undefined, 0.05 * index, 0.7)}
      className="relative grid gap-6 pb-14 pl-8 last:pb-0 md:grid-cols-[260px_1fr] md:gap-12 md:pl-0"
    >
      {/* Timeline dot (mobile: left rail; desktop: between columns) */}
      <span
        className={cn(
          "absolute left-0 top-2 h-3 w-3 -translate-x-[5px] rounded-full border-2 md:left-[260px] md:translate-x-[18px]",
          item.current ? "border-accent bg-accent shadow-[0_0_0_6px_rgba(255,138,76,0.15)]" : "border-white/30 bg-ink",
        )}
      />

      {/* Left: when & where */}
      <div className="md:pt-0.5">
        <p className="text-sm tabular-nums text-muted">{item.date}</p>
        <div className="mt-4 flex items-center gap-3">
          <CompanyMark item={item} />
          <div>
            <p className="font-medium leading-tight text-cream">{item.company}</p>
            {item.location && <p className="mt-0.5 text-xs text-muted">{item.location}</p>}
          </div>
        </div>
      </div>

      {/* Right: role details */}
      <div className="md:pl-10">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-2xl font-semibold tracking-tight text-cream sm:text-[28px]">{item.title}</h3>
          {item.current && (
            <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-accent-soft">
              {t("experience.current")}
            </span>
          )}
        </div>
        {item.promoted && (
          <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-cool">
            <span aria-hidden>↗</span> {item.promoted}
          </p>
        )}
        <p className="mt-3 font-serif text-xl italic leading-snug text-cream/55">{item.summary}</p>

        <ul className="mt-6 space-y-3">
          {points.map((point, i) => (
            <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-cream/65">
              <span className="mt-[10px] h-1 w-1 shrink-0 rounded-full bg-accent/80" />
              <span><Rich text={point} /></span>
            </li>
          ))}
        </ul>

        {hidden > 0 && (
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="mt-4 text-sm font-medium text-accent-soft underline-offset-4 hover:underline"
          >
            {expanded ? t("experience.show_less") : t("experience.show_more").replace("{n}", String(hidden))}
          </button>
        )}

        <div className="mt-6 flex flex-wrap gap-2">
          {item.tech.map((tech) => (
            <span key={tech} className="rounded-full border border-white/10 px-3 py-1 text-xs text-cream/60">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.li>
  );
};

export const Experience = () => {
  const { t } = useLanguage();

  return (
    <SectionWrapper idName="work">
      <motion.div variants={textVariant()}>
        <SectionHeading index="02" label={t("experience.label")} title={t("experience.title")} />
      </motion.div>

      <div className="relative mt-16">
        {/* Vertical rail */}
        <div className="absolute bottom-0 left-0 top-2 w-px bg-gradient-to-b from-accent/60 via-white/10 to-transparent md:left-[260px] md:translate-x-6" />
        <ol>
          {EXPERIENCES.map((item, i) => (
            <Role key={`${item.company}-${item.date}`} item={item} index={i} />
          ))}
        </ol>
      </div>
    </SectionWrapper>
  );
};
