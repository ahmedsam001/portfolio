"use client";

import { useEffect, useRef, useState } from "react";
import {
  Code2, Database, Zap, Activity, Layers, Server, GitMerge,
  Repeat, ArrowRightLeft, Cloud, Flame, CircleDot, Table, Sigma,
  TrendingUp, Monitor, GitBranch, Github, Terminal, Wind, Code, Palette
} from "lucide-react";
import { skillGroups, type SkillItem } from "@/data/skills";

const iconMap: Record<string, React.ReactNode> = {
  python:          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true"><path d="M12 2C6.48 2 6 4.5 6 4.5v3h6v1H4.5C3 8.5 2 10 2 12s1 3.5 2.5 3.5H5v3s.5 3.5 7 3.5 7-3.5 7-3.5v-3h-6v-1h7.5c1.5 0 2.5-1.5 2.5-3.5S20.5 8.5 19.5 8.5H19v-4s-.5-2.5-7-2.5z" fill="#0F6E5C" opacity="0.8"/></svg>,
  "database":      <Database size={16} aria-hidden="true"/>,
  "code-2":        <Code2 size={16} aria-hidden="true"/>,
  "code":          <Code size={16} aria-hidden="true"/>,
  "palette":       <Palette size={16} aria-hidden="true"/>,
  "zap":           <Zap size={16} aria-hidden="true"/>,
  "activity":      <Activity size={16} aria-hidden="true"/>,
  "wind":          <Wind size={16} aria-hidden="true"/>,
  "layers":        <Layers size={16} aria-hidden="true"/>,
  "server":        <Server size={16} aria-hidden="true"/>,
  "git-merge":     <GitMerge size={16} aria-hidden="true"/>,
  "repeat":        <Repeat size={16} aria-hidden="true"/>,
  "arrow-right-left": <ArrowRightLeft size={16} aria-hidden="true"/>,
  "snowflake":     <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true"><path d="M12 2v20M12 2l-3 3M12 2l3 3M12 22l-3-3M12 22l3-3M2 12h20M2 12l3-3M2 12l3 3M22 12l-3-3M22 12l-3 3M6.34 6.34l11.32 11.32M6.34 6.34L5 5M17.66 6.34L19 5M6.34 17.66L5 19M17.66 17.66L19 19" stroke="#0F6E5C" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  "flame":         <Flame size={16} aria-hidden="true"/>,
  "circle-dot":    <CircleDot size={16} aria-hidden="true"/>,
  "cloud":         <Cloud size={16} aria-hidden="true"/>,
  "table":         <Table size={16} aria-hidden="true"/>,
  "sigma":         <Sigma size={16} aria-hidden="true"/>,
  "trending-up":   <TrendingUp size={16} aria-hidden="true"/>,
  "monitor":       <Monitor size={16} aria-hidden="true"/>,
  "git-branch":    <GitBranch size={16} aria-hidden="true"/>,
  "github":        <Github size={16} aria-hidden="true"/>,
  "terminal":      <Terminal size={16} aria-hidden="true"/>,
};

function SkillPill({ item }: { item: SkillItem }) {
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-bg-base border border-border hover:border-primary/50 hover:bg-primary-tint text-text-secondary hover:text-primary transition-all duration-150 group cursor-default min-h-[32px]">
      <span className="text-primary/70 group-hover:text-primary group-hover:scale-110 transition-transform duration-150 flex-shrink-0">
        {item.icon && iconMap[item.icon] ? iconMap[item.icon] : <Code2 size={14} aria-hidden="true"/>}
      </span>
      <span className="tech-pill text-text-primary group-hover:text-primary whitespace-nowrap text-[11.5px]">{item.label}</span>
    </div>
  );
}

export default function TechStack() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={ref}
      className="py-16 sm:py-20 lg:py-24 bg-bg-base"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`mb-10 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <p className="text-xs font-mono font-medium text-primary uppercase tracking-widest mb-2">
            Technologies
          </p>
          <h2
            id="skills-heading"
            className="font-heading font-bold text-2xl sm:text-3xl text-text-primary"
          >
            Technical Stack
          </h2>
          <p className="text-text-secondary mt-2 text-sm">
            Technologies I work with — verified from training programs and projects.
          </p>
        </div>

        {/* Grid of skill groups */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {skillGroups.map((group, gi) => (
            <div
              key={group.id}
              className={`bg-surface rounded-2xl border border-border shadow-card p-5 sm:p-6 transition-all duration-500 hover:shadow-card-hover hover:-translate-y-1 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${gi * 60}ms` }}
            >
              {/* Group header */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg" aria-hidden="true">{group.emoji}</span>
                <h3 className="font-heading font-semibold text-sm text-text-primary">
                  {group.title}
                </h3>
              </div>

              {/* Pills */}
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <SkillPill key={item.label} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

