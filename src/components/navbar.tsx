import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logo, menu, close } from "../assets";
import { NAV_LINKS } from "../constants";
import { styles } from "../styles";
import { cn } from "../utils/lib";

export const Navbar = ({ hide }: { hide: boolean }) => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
          <p className="text-lg font-semibold text-white">
            Kuber<span className="hidden sm:inline"> | Developer</span>
          </p>
        </Link>

        <ul className="hidden sm:flex gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              {link.link ? (
                <a
                  href={link.link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm text-gray-300 transition hover:text-white"
                >
                  {link.title}
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
                  {link.title}
                </a>
              )}
            </li>
          ))}
        </ul>

        <div className="sm:hidden">
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
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  {link.link ? (
                    <a
                      href={link.link}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-sm text-gray-300"
                    >
                      {link.title}
                    </a>
                  ) : (
                    <a
                      href={`#${link.id}`}
                      className="text-sm text-gray-300"
                      onClick={() => {
                        setToggle(false);
                        setActive(link.title);
                      }}
                    >
                      {link.title}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};