"use client";

import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function FeaturedProjects() {
  return (
    <section
      id="projects"
      className="py-16 sm:py-20 lg:py-24 bg-bg-alt"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-mono font-medium text-primary uppercase tracking-widest mb-2">
            Portfolio
          </p>
          <h2
            id="projects-heading"
            className="font-heading font-bold text-2xl sm:text-3xl text-text-primary"
          >
            Featured Projects
          </h2>
          <p className="text-text-secondary mt-2 text-sm max-w-2xl">
            Three end-to-end data engineering pipelines — real repositories, real architectures, no
            fabricated metrics.
          </p>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

