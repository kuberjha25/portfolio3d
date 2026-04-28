import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import { useLanguage } from "../context/LanguageContext";

const FloatingElement = ({ children, delay, className }: { children: React.ReactNode, delay: number, className: string }) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{
        y: [0, -15, 0],
        rotate: [0, 2, -2, 0]
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: delay,
      }}
      className={`absolute ${className}`}
    >
      {children}
    </motion.div>
  );
};

// Icons using SVG paths
const FootballIcon = () => (
  <svg viewBox="0 0 24 24" className="w-12 h-12 text-[#915eff]" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    <path d="M2 12h20" />
  </svg>
);

const SingingIcon = () => (
  <svg viewBox="0 0 24 24" className="w-12 h-12 text-[#ff5e91]" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);

const CodingIcon = () => (
  <svg viewBox="0 0 24 24" className="w-12 h-12 text-[#5eff91]" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
    <path d="M12 2l-2 20" />
  </svg>
);

const ReadingIcon = () => (
  <svg viewBox="0 0 24 24" className="w-12 h-12 text-[#5e91ff]" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

export const Hobbies = () => {
  const { t } = useLanguage();

  return (
    <SectionWrapper idName="hobbies">
      <div className="relative w-full overflow-hidden min-h-[800px] py-10">
        <motion.div variants={textVariant()} className="relative z-10 text-center sm:text-left">
          <p className={styles.sectionSubText}>{t('hobbies.subtitle')}</p>
          <h2 className={styles.sectionHeadText}>{t('hobbies.title')}</h2>
        </motion.div>

        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px] relative z-10 mx-auto sm:mx-0 text-center sm:text-left"
        >
          {t('hobbies.description')}
        </motion.p>

        <div className="relative w-full h-[900px] md:h-[600px] mt-10">
          {/* Football */}
          <FloatingElement delay={0} className="top-[0%] md:top-[10%] left-[2%] md:left-[10%] group">
            <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl w-[280px] md:w-[300px] shadow-2xl hover:bg-black/60 transition-colors duration-300">
              <div className="flex items-center gap-4 mb-4">
                <FootballIcon />
                <h3 className="text-white font-bold text-[20px]">{t('hobbies.football.title')}</h3>
              </div>
              <p className="text-secondary text-[14px] leading-relaxed">
                {t('hobbies.football.desc')}
              </p>
            </div>
          </FloatingElement>

          {/* Singing */}
          <FloatingElement delay={1.5} className="top-[25%] md:top-[30%] right-[2%] md:right-[15%] group">
            <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl w-[280px] md:w-[300px] shadow-2xl hover:bg-black/60 transition-colors duration-300">
              <div className="flex items-center gap-4 mb-4">
                <SingingIcon />
                <h3 className="text-white font-bold text-[20px]">{t('hobbies.singing.title')}</h3>
              </div>
              <p className="text-secondary text-[14px] leading-relaxed">
                {t('hobbies.singing.desc')}
              </p>
            </div>
          </FloatingElement>

          {/* Coding */}
          <FloatingElement delay={3} className="top-[50%] md:top-auto md:bottom-[15%] left-[2%] md:left-[25%] group">
            <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl w-[280px] md:w-[300px] shadow-2xl hover:bg-black/60 transition-colors duration-300">
              <div className="flex items-center gap-4 mb-4">
                <CodingIcon />
                <h3 className="text-white font-bold text-[20px]">{t('hobbies.coding.title')}</h3>
              </div>
              <p className="text-secondary text-[14px] leading-relaxed">
                {t('hobbies.coding.desc')}
              </p>
            </div>
          </FloatingElement>

          {/* Reading */}
          <FloatingElement delay={0.8} className="top-[75%] md:top-auto md:bottom-[5%] right-[2%] md:right-[5%] group">
            <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl w-[280px] md:w-[300px] shadow-2xl hover:bg-black/60 transition-colors duration-300">
              <div className="flex items-center gap-4 mb-4">
                <ReadingIcon />
                <h3 className="text-white font-bold text-[20px]">{t('hobbies.reading.title')}</h3>
              </div>
              <p className="text-secondary text-[14px] leading-relaxed">
                {t('hobbies.reading.desc')}
              </p>
            </div>
          </FloatingElement>

          {/* Background decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
             <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#915eff] rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>
             <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#ff5e91] rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>
             <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-[#5eff91] rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Hobbies;
