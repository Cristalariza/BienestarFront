import HeroSection from '../components/home/HeroSection';
import CategoriesSection from '../components/home/CategoriesSection';
import AboutSection from '../components/home/AboutSection';
import MissionVisionSection from '../components/home/MissionVisionSection';
import StructureSection from '../components/home/StructureSection';
import ContactSection from '../components/home/ContactSection';

const HomeView = () => {
  return (
    <div>
      <HeroSection />
      <CategoriesSection />
      <AboutSection />
      <MissionVisionSection />
      <StructureSection />
      <ContactSection />
    </div>
  );
};

export default HomeView;
