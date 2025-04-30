import React from "react";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import Events from "./Events";
import AlumniCard from "./AlumniCard";
import StatsSection from "./StatsSection";
import Posts from "../Posts";
import AlumniStories from "./AlumniStories";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col ">
      <div>
        <HeroSection />
      </div>
      <div>
        <AboutSection />
      </div>
      <div>
        <Posts />
      </div>
      <div>
        <Events />
      </div>
      <div>
        <AlumniStories />
      </div>
      <div>
        <StatsSection />
      </div>
    </div>
  );
};

export default HomePage;
