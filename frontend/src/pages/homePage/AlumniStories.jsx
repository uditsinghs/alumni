import React from "react";
import AlumniCard from "./AlumniCard";

const AlumniStories = () => {
  const alumniStories = [
    {
      name: "Ravi Kumar",
      batch: "2020",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      currentPosition: "Software Engineer at Infosys",
      storyText:
        "My journey at Future University laid the foundation for my success. The faculty support and exposure I received was phenomenal.",
    },
    {
      name: "Sneha Sharma",
      batch: "2019",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
      currentPosition: "UX Designer at Google",
      storyText:
        "Future University gave me the platform to discover my passion for design. I'm grateful for the real-world opportunities I had here.",
    },
    {
      name: "Aman Verma",
      batch: "2021",
      photo: "https://randomuser.me/api/portraits/men/76.jpg",
      currentPosition: "AI Researcher at Microsoft",
      storyText:
        "From hackathons to industry mentorship, my time at Future University was transformative and exciting.",
    },
  ];
  return (
    <div className="p-6 bg-background text-foreground">
      <h2 className="text-2xl font-bold text-center mb-6">Alumni Stories</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {alumniStories.map((story, index) => (
          <AlumniCard key={index} story={story} />
        ))}
      </div>
    </div>
  );
};

export default AlumniStories;
