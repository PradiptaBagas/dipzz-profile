import {
  Dock,
  HomeSection,
  ProjectsSection,
  EducationSection,
  ExperienceSection,
  SkillsSection,
  AboutSection,
  Footer,
  ScrollToTop,
} from "./components/Portfolio";

function App() {
  return (
    <div className="bg-black min-h-screen text-white">
      <HomeSection />
      <ProjectsSection />
      <EducationSection />
      <ExperienceSection />
      <SkillsSection />
      <AboutSection />
      <Footer />
      <Dock />
      <ScrollToTop />
    </div>
  );
}

export default App;