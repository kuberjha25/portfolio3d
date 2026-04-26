import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { motion } from "framer-motion";
import { textVariant } from "../utils/motion";
import ImageSlider from "./ImageSlider";

const ImageSliderSection = () => {
  // Sample images - replace with your actual images
  const sliderImages = [
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/58281/bg1.jpg',
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/58281/bg2.jpg',
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/58281/bg3.jpg',
  ];

  return (
    <SectionWrapper idName="showcase">
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My Creative Work</p>
        <h2 className={styles.sectionHeadText}>Featured Showcase.</h2>
      </motion.div>

      <div className="mt-12 w-full h-[600px] rounded-2xl overflow-hidden relative">
        <ImageSlider 
          images={sliderImages} 
          autoPlay={true} 
          autoPlayDelay={4000}
        />
      </div>
    </SectionWrapper>
  );
};

export default ImageSliderSection;