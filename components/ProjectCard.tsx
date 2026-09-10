"use client";

import { useEffect, useRef, useState } from "react";
import { Github, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import type { Project } from "@/data/projects";
import ArchitectureDiagram from "./ArchitectureDiagram";

// Badge colors
const badgeColors: Record<string, string> = {
  "Real-Time + ML": "bg-accent-tint text-accent border-accent/30",
  "Batch ELT":       "bg-primary-tint text-primary border-primary/30",
  "ELT + Star Schema": "bg-primary-tint text-primary border-primary/30",
};

interface Props {
  project: Project;
  delay?: number;
}

export default function ProjectCard({ project, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`bg-surface rounded-3xl border border-border shadow-card card-hover transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="p-5 sm:p-6">
        {/* Top row: badge + number */}
        <div className="flex items-center justify-between mb-3">
          {project.badge && (
            <span
              className={`tech-pill px-2.5 py-0.5 rounded-full border text-[11px] font-semibold ${
                badgeColors[project.badge] ?? "bg-primary-tint text-primary border-primary/30"
              }`}
            >
              {project.badge}
            </span>
          )}
          <span className="text-xs font-mono text-text-secondary/60 ml-auto">
            {String(project.order).padStart(2, "0")}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading font-bold text-base sm:text-lg text-text-primary mb-3 leading-snug">
          {project.shortTitle}
        </h3>

        {/* Architecture diagram */}
        <div className="bg-bg-base border border-border rounded-xl p-3 mb-4 overflow-hidden">
          <ArchitectureDiagram project={project} compact />
        </div>

        {/* Short description */}
        <p className="text-text-secondary text-sm leading-relaxed mb-3 line-clamp-3">
          {project.description}
        </p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5 mb-4" aria-label="Tech stack">
          {project.techPills.map((pill) => (
            <span
              key={pill.label}
              className="tech-pill px-2 py-0.5 rounded-md bg-primary-tint text-primary border border-primary/15 text-[10.5px] font-medium"
            >
              {pill.label}
            </span>
          ))}
        </div>

        {/* Key details toggle */}
        <button
          onClick={() => setDetailsOpen(!detailsOpen)}
          className="flex items-center gap-1.5 text-[13px] font-medium text-primary hover:text-primary-dark transition-colors mb-3 group"
          aria-expanded={detailsOpen}
          aria-controls={`details-${project.id}`}
        >
          <span>{detailsOpen ? "Hide" : "View"} Architecture Details</span>
          {detailsOpen ? (
            <ChevronUp size={14} className="transition-transform" aria-hidden="true" />
          ) : (
            <ChevronDown size={14} className="transition-transform" aria-hidden="true" />
          )}
        </button>

        {detailsOpen && (
          <div
            id={`details-${project.id}`}
            className="mb-4 bg-primary-tint border border-primary/20 rounded-xl p-3.5 tooltip-panel"
            aria-live="polite"
          >
            <ul className="space-y-1.5" role="list">
              {project.keyDetails.map((detail, i) => (
                <li key={i} className="flex items-start gap-2 text-[13px] text-text-secondary leading-relaxed">
                  <span className="text-primary mt-0.5 flex-shrink-0 text-xs" aria-hidden="true">→</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
            {/* Long description in expanded view */}
            {project.longDescription && project.longDescription.length > 0 && (
              <div className="mt-3 pt-3 border-t border-primary/10 space-y-2">
                {project.longDescription.map((para, i) => (
                  <p key={i} className="text-[13px] text-text-secondary leading-relaxed">{para}</p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col xs:flex-row flex-wrap gap-2.5 pt-3 border-t border-border">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl border-2 border-border hover:border-primary text-text-secondary hover:text-primary font-heading font-semibold text-sm transition-all duration-200 hover:bg-primary-tint"
            aria-label={`View ${project.shortTitle} on GitHub`}
          >
            <Github size={14} aria-hidden="true" />
            GitHub
          </a>
          <a
            href="#architecture"
            className="flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-accent hover:bg-accent-dark text-text-on-dark font-heading font-semibold text-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            aria-label={`View full architecture for ${project.shortTitle}`}
          >
            <ExternalLink size={14} aria-hidden="true" />
            View Architecture
          </a>
        </div>
      </div>
    </div>
  );
}

