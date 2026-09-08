import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import TechStack from "@/components/TechStack";
import FeaturedProjects from "@/components/FeaturedProjects";
import InteractiveArchitecture from "@/components/InteractiveArchitecture";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Connect from "@/components/Connect";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <AboutMe />
        <TechStack />
        <FeaturedProjects />
        <InteractiveArchitecture />
        <ExperienceTimeline />
        <Connect />
      </main>
      <Footer />
    </>
  );
}

