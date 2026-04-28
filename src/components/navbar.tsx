import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logo, menu, close } from "../assets";
import { NAV_LINKS } from "../constants";
import { styles } from "../styles";
import { cn } from "../utils/lib";
import { useLanguage, Language } from "../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'hi', label: 'HI' },
    { code: 'fr', label: 'FR' },
  ];

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-gray-300 hover:text-white transition p-2 rounded-full hover:bg-white/10"
      >
        <GlobeIcon />
        <span className="text-sm font-medium uppercase">{language}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 py-2 w-24 bg-black/90 backdrop-blur-lg border border-white/10 rounded-xl shadow-xl flex flex-col overflow-hidden"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={cn(
                  "px-4 py-2 text-sm text-left transition hover:bg-white/10",
                  language === lang.code ? "text-white font-bold bg-white/5" : "text-gray-400"
                )}
              >
                {lang.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Navbar = ({ hide }: { hide: boolean }) => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        styles.paddingX,
        "fixed top-0 z-50 w-full py-4 transition-all duration-300",
        scrolled || !hide ? "bg-black/80 backdrop-blur-lg border-b border-white/10" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="Logo" className="h-8 w-8 object-contain" />
          <p className="text-xl font-semibold text-white font-kuber pt-1">
            Kuber
          </p>
        </Link>

        <div className="flex items-center gap-6">
          <ul className="hidden sm:flex gap-8 items-center">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                {link.link ? (
                  <a
                    href={link.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-sm text-gray-300 transition hover:text-white"
                  >
                    {t(`navbar.${link.id}`) || link.title}
                  </a>
                ) : (
                  <a
                    href={`#${link.id}`}
                    className={cn(
                      "text-sm transition",
                      active === link.title ? "text-white" : "text-gray-400 hover:text-white"
                    )}
                    onClick={() => setActive(link.title)}
                  >
                    {t(`navbar.${link.id}`) || link.title}
                  </a>
                )}
              </li>
            ))}
          </ul>
          
          <div className="hidden sm:block">
            <LanguageToggle />
          </div>

          <div className="sm:hidden flex items-center gap-4">
            <LanguageToggle />
            <img
              src={toggle ? close : menu}
              alt="Menu"
              className="h-6 w-6 cursor-pointer"
              onClick={() => setToggle(!toggle)}
            />
            <div
              className={cn(
                !toggle ? "hidden" : "flex",
                "absolute right-4 top-16 min-w-[140px] rounded-xl border border-white/10 bg-black/90 p-4 backdrop-blur-lg"
              )}
            >
              <ul className="flex flex-col gap-3 w-full">
                {NAV_LINKS.map((link) => (
                  <li key={link.id}>
                    {link.link ? (
                      <a
                        href={link.link}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-sm text-gray-300"
                      >
                        {t(`navbar.${link.id}`) || link.title}
                      </a>
                    ) : (
                      <a
                        href={`#${link.id}`}
                        className="text-sm text-gray-300 block w-full"
                        onClick={() => {
                          setToggle(false);
                          setActive(link.title);
                        }}
                      >
                        {t(`navbar.${link.id}`) || link.title}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};