import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { useLanguage } from "../context/LanguageContext";
import { SectionHeading } from "./Rich";

const ICONS: Record<string, ReactNode> = {
  football: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m12 7 4 3-1.5 4.5h-5L8 10z" />
      <path d="M12 3v4M16 10l4.5-1.5M14.5 14.5 17 19M9.5 14.5 7 19M8 10 3.5 8.5" />
    </>
  ),
  singing: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7" />
    </>
  ),
  coding: (
    <>
      <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />
    </>
  ),
  reading: (
    <>
      <path d="M3 5.5C5.5 4 9 4 12 6c3-2 6.5-2 9-.5V19c-2.5-1.5-6-1.5-9 .5-3-2-6.5-2-9-.5z" />
      <path d="M12 6v13.5" />
    </>
  ),
};

const HOBBIES = ["football", "singing", "coding", "reading"] as const;

export const Hobbies = () => {
  const { t } = useLanguage();

  return (
    <SectionWrapper idName="hobbies">
      <motion.div variants={textVariant()} className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading index="05" label={t("hobbies.label")} title={t("hobbies.title")} />
        <p className="max-w-sm text-[15px] leading-relaxed text-muted">{t("hobbies.description")}</p>
      </motion.div>

      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {HOBBIES.map((key, i) => (
          <motion.div
            key={key}
            variants={fadeIn("up", undefined, 0.06 * i, 0.7)}
            className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-surface p-7 transition-colors hover:border-accent/30"
          >
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(255,138,76,0.18),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 text-accent-soft transition-colors group-hover:border-accent/40">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                {ICONS[key]}
              </svg>
            </div>
            <h3 className="mt-10 font-serif text-3xl italic text-cream">{t(`hobbies.${key}.title`)}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{t(`hobbies.${key}.desc`)}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Hobbies;
