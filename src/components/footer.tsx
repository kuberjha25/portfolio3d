import { NAV_LINKS, SOCIALS } from "../constants";
import { useLanguage } from "../context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] px-5 pb-10 pt-20 sm:px-16">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,138,76,0.12),transparent)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="font-kuber text-6xl leading-none text-cream sm:text-8xl lg:text-9xl">Kuber Jha</p>
            <p className="mt-5 max-w-md font-serif text-xl italic text-cream/55">{t("footer.tagline")}</p>
          </div>

          <div className="flex gap-16">
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} className="text-sm text-muted transition hover:text-cream">
                    {t(`navbar.${link.key}`)}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="space-y-2.5">
              {SOCIALS.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-sm text-muted transition hover:text-cream"
                  >
                    {social.name} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/[0.06] pt-6 text-xs text-muted sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} Kuber Jha. {t("footer.rights")}
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-1.5 transition hover:text-cream"
          >
            {t("footer.back_to_top")} ↑
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
