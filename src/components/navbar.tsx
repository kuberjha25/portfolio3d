import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { logo } from "../assets";
import { NAV_LINKS, RESUME_URL } from "../constants";
import { cn } from "../utils/lib";
import { useLanguage, type Language } from "../context/LanguageContext";

const LANGUAGES: { code: Language; label: string }[] = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
  { code: "fr", label: "Français" },
];

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        aria-label="Change language"
        aria-expanded={isOpen}
        className="flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-medium uppercase tracking-wider text-cream/70 transition hover:bg-white/5 hover:text-cream"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </svg>
        {language}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-36 overflow-hidden rounded-2xl border border-white/10 bg-surface-2 p-1 shadow-2xl"
          >
            {LANGUAGES.map((lang) => (
              <li key={lang.code}>
                <button
                  type="button"
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full rounded-xl px-3 py-2 text-left text-sm transition hover:bg-white/5",
                    language === lang.code ? "text-cream" : "text-muted",
                  )}
                >
                  {lang.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Navbar = (_props: { hide?: boolean }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      <nav
        className={cn(
          "mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border px-3 pl-4 transition-all duration-300",
          scrolled || open
            ? "border-white/10 bg-ink/85 shadow-[0_8px_30px_rgba(0,0,0,0.35)] md:bg-ink/60 md:backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <a
          href="#top"
          className="flex items-center gap-2.5"
          onClick={(e) => {
            e.preventDefault();
            setOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img src={logo} alt="" width={28} height={28} className="h-7 w-7 object-contain" />
          <span className="pt-1 font-kuber text-lg text-cream">Kuber</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.03] p-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className="block rounded-full px-4 py-1.5 text-sm text-cream/70 transition hover:bg-white/[0.06] hover:text-cream"
              >
                {t(`navbar.${link.key}`)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <LanguageToggle />
          <a
            href={RESUME_URL}
            download="KuberJha-Resume.pdf"
            className="hidden h-9 items-center gap-1.5 rounded-full bg-cream px-4 text-sm font-medium text-ink transition hover:bg-accent sm:flex"
          >
            {t("navbar.resume")}
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M12 4v12m0 0-5-5m5 5 5-5M5 20h14" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-cream md:hidden"
          >
            <span
              className={cn(
                "absolute h-[1.5px] w-5 bg-current transition-transform duration-300",
                open ? "rotate-45" : "-translate-y-[4px]",
              )}
            />
            <span
              className={cn(
                "absolute h-[1.5px] w-5 bg-current transition-transform duration-300",
                open ? "-rotate-45" : "translate-y-[4px]",
              )}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-6xl rounded-3xl border border-white/10 bg-ink/95 p-3 md:hidden"
          >
            <ul className="flex flex-col">
              {NAV_LINKS.map((link, i) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between rounded-2xl px-4 py-3 text-2xl font-medium tracking-tight text-cream transition hover:bg-white/5"
                  >
                    {t(`navbar.${link.key}`)}
                    <span className="text-xs text-muted">0{i + 1}</span>
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={RESUME_URL}
              download="KuberJha-Resume.pdf"
              className="mt-2 flex h-12 items-center justify-center rounded-2xl bg-cream text-sm font-medium text-ink"
            >
              {t("navbar.resume")} ↓
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
