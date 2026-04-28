import { motion } from "framer-motion";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { EXPERIENCES } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { textVariant } from "../utils/motion";
import "react-vertical-timeline-component/style.min.css";

type ExperienceCardProps = {
  experience: (typeof EXPERIENCES)[number];
};

const ExperienceCard = ({ experience }: ExperienceCardProps) => (
  <VerticalTimelineElement
    contentStyle={{ background: "#0a0a0a", color: "#fff", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px" }}
    contentArrowStyle={{ borderRight: "7px solid #1a1a1a" }}
    date={experience.date}
    dateClassName="text-gray-400"
    iconStyle={{ background: experience.iconBg }}
    icon={
      <div className="flex h-full w-full items-center justify-center">
        <img
          src={experience.icon}
          alt={experience.company_name}
          className="h-[60%] w-[60%] object-contain"
        />
      </div>
    }
  >
    <div>
      <h3 className="text-xl font-bold text-white">{experience.title}</h3>
      <p className="text-sm text-gray-400 mt-1">{experience.company_name}</p>
    </div>
    <ul className="mt-5 list-disc space-y-2 pl-5">
      {experience.points.map((point, i) => (
        <li key={`experience-point-${i}`} className="text-sm text-gray-300 pl-1">
          {point}
        </li>
      ))}
    </ul>
  </VerticalTimelineElement>
);

export const Experience = () => {
  return (
    <SectionWrapper idName="work">
      <>
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>What I have done so far</p>
          <h2 className={styles.sectionHeadText}>Work Experience.</h2>
        </motion.div>
        <div className="mt-20 flex flex-col">
          <VerticalTimeline>
            {EXPERIENCES.map((experience, i) => (
              <ExperienceCard key={i} experience={experience} />
            ))}
          </VerticalTimeline>
        </div>
      </>
    </SectionWrapper>
  );
};