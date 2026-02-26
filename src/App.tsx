/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar, HomeSection, ProjectsSection, EducationSection, ExperienceSection, SkillsSection, AboutSection, Footer, ScrollToTop } from "./components/Portfolio";

export default function App() {
  return (
    <div className="min-h-screen bg-#0a0a0a text-slate-100">
      
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pt-32">
        <HomeSection />
        <ProjectsSection />
        <EducationSection/>
        <ExperienceSection />
        <SkillsSection />
        <AboutSection />
        <Footer />
      </main>

      {/* Utilities */}
      <ScrollToTop />
    </div>
  );
}
