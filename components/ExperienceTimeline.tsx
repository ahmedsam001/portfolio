"use client";

import { useEffect, useRef, useState } from "react";
import { timeline, type TimelineEntry } from "@/data/experience";
import { GraduationCap, Briefcase, FolderGit2, ExternalLink } from "lucide-react";

const typeConfig = {
  education: {
    icon: GraduationCap,
    color: "text-primary",
    bg: "bg-primary-tint",
    border: "border-primary/30",
    dot: "bg-primary",
  },
  training: {
    icon: Briefcase,
    color: "text-accent",
    bg: "bg-accent-tint",
    border: "border-accent/30",
    dot: "bg-accent",
  },
  project: {
    icon: FolderGit2,
    color: "text-primary",
    bg: "bg-primary-tint",
    border: "border-primary/30",
    dot: "bg-primary/60",
  },
};

function TimelineItem({ entry, index }: { entry: TimelineEntry; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const config = typeConfig[entry.type];
  const Icon = config.icon;

  return (
    <div
      ref={ref}
      className={`relative flex gap-5 sm:gap-8 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center">
        <div className={`w-10 h-10 rounded-xl ${config.bg} border ${config.border} flex items-center justify-center flex-shrink-0 shadow-sm`}>
          <Icon size={18} className={config.color} aria-hidden="true" />
        </div>
        {/* Vertical line */}
        <div className="flex-1 w-0.5 mt-2 rounded-full" style={{ background: "linear-gradient(to bottom, #0F6E5C40, #E8E1D080)" }} aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        <div className="bg-surface border border-border rounded-2xl p-5 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200">
          {/* Period */}
          <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
            <span className={`tech-pill text-[11px] px-2.5 py-1 rounded-full ${config.bg} ${config.color} border ${config.border} font-medium`}>
              {entry.period}
            </span>
            {entry.current && (
              <span className="flex items-center gap-1.5 text-xs font-mono text-success">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" aria-hidden="true" />
                Current
              </span>
            )}
          </div>

          <h3 className="font-heading font-bold text-base sm:text-lg text-text-primary leading-snug mb-0.5">
            {entry.title}
          </h3>
          <p className={`text-sm font-semibold ${config.color} mb-3`}>
            {entry.organization}
            {entry.location && (
              <span className="text-text-secondary font-normal"> · {entry.location}</span>
            )}
          </p>

          <ul className="space-y-1.5" role="list">
            {entry.description.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                <span className={`${config.color} mt-1 flex-shrink-0`} aria-hidden="true">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {entry.projectLink && (
            <a
              href={entry.projectLink}
              className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
              <ExternalLink size={13} aria-hidden="true" />
              View Projects
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ExperienceTimeline() {
  return (
    <section
      id="experience"
      className="py-16 sm:py-20 lg:py-24 bg-bg-alt"
      aria-labelledby="experience-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-mono font-medium text-primary uppercase tracking-widest mb-2">
            Background
          </p>
          <h2
            id="experience-heading"
            className="font-heading font-bold text-2xl sm:text-3xl text-text-primary"
          >
            Engineering Journey
          </h2>
          <p className="text-text-secondary mt-2 text-sm">
            Technical training programs, data engineering projects, and foundational education.
          </p>
        </div>

        {/* Timeline */}
        <div aria-label="Experience and education timeline">
          {timeline.map((entry, i) => (
            <TimelineItem key={entry.id} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

