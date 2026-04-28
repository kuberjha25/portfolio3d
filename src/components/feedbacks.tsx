import { motion } from "framer-motion";
import { TESTIMONIALS } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { cn } from "../utils/lib";
import { fadeIn, textVariant } from "../utils/motion";

const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
}: {
  index: number;
  testimonial: string;
  name: string;
  designation: string;
  company: string;
  image: string;
}) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.3, 0.75)}
    className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm xs:w-[300px] w-full"
  >
    <p className="text-4xl text-gray-500">"</p>
    <p className="mt-1 text-sm text-gray-300 leading-relaxed">{testimonial}</p>
    <div className="mt-6 flex items-center justify-between gap-3">
      <div className="flex-1">
        <p className="text-sm font-medium text-white">
          @ {name}
        </p>
        <p className="mt-0.5 text-xs text-gray-500">
          {designation} of {company}
        </p>
      </div>
      <img
        src={image}
        alt={`feedback-by-${name}`}
        className="h-10 w-10 rounded-full object-cover"
      />
    </div>
  </motion.div>
);

export const Feedbacks = () => {
  return (
    <SectionWrapper idName="feedbacks">
      <div className="mt-12 rounded-2xl bg-white/5 p-6 md:p-8">
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>What others say</p>
          <h2 className={styles.sectionHeadText}>Testimonials.</h2>
        </motion.div>
        <div className="mt-8 flex flex-wrap justify-center gap-5">
          {TESTIMONIALS.map((testimonial, i) => (
            <FeedbackCard key={testimonial.name} index={i} {...testimonial} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};