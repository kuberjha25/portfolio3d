import { Link } from "react-router-dom";
import { SOCIALS } from "../constants";
import { styles } from "../styles";
import { cn } from "../utils/lib";

const Footer = () => {
  return (
    <footer
      className={cn(
        styles.paddingX,
        "w-full border-t border-white/10 bg-black/50 py-6"
      )}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-gray-500">
          © Kuber Jha {new Date().getFullYear()}. All rights reserved.
        </p>
        <ul className="flex gap-6">
          {SOCIALS.map((social) => (
            <li key={social.name}>
              <Link
                to={social.link}
                target="_blank"
                rel="noreferrer noopener"
                className="block opacity-60 transition hover:opacity-100"
              >
                <img src={social.icon} alt={social.name} className="h-5 w-5" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;