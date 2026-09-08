"use client";

import Image from "next/image";
import { Github, Linkedin, Download, ChevronDown } from "lucide-react";
import HeroDataFlow from "./HeroDataFlow";
import { profile } from "@/data/profile";
import DataPipelineBackground from "./DataPipelineBackground";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative pt-24 pb-8 sm:pt-28 sm:pb-10 lg:pt-32 lg:pb-14 bg-bg-base overflow-hidden group/bg"
      aria-labelledby="hero-heading"
    >
      {/* Abstract Animated Data Pipeline Background */}
      <DataPipelineBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ── Left: Text content ── */}
          <div className="order-2 lg:order-1 space-y-6">
            {/* Name */}
            <div>
              <h1
                id="hero-heading"
                className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-text-primary leading-tight"
              >
                {profile.name}
              </h1>

              {/* Role line */}
              <div className="mt-3 flex items-center gap-3 flex-wrap">
                <span className="font-heading font-bold text-xl sm:text-2xl text-primary">
                  Data Engineer
                </span>
                <span className="text-border">·</span>
                <span className="text-sm text-text-secondary font-medium">
                  {profile.subtitle}
                </span>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-xl">
              {profile.tagline}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-text-on-dark font-heading font-semibold text-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
              >
                View Projects
              </a>
              <a
                href={profile.links.cv}
                download="Ahmed_Sami_Fathi_CV.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-dark text-text-on-dark font-heading font-semibold text-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                aria-label="Download Ahmed Sami Fathi's CV"
              >
                <Download size={15} aria-hidden="true" />
                Download CV
              </a>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-border hover:border-primary text-text-secondary hover:text-primary font-heading font-semibold text-sm transition-all duration-200 hover:bg-primary-tint"
                aria-label="Ahmed Sami Fathi's GitHub profile"
              >
                <Github size={15} aria-hidden="true" />
                GitHub
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-border hover:border-primary text-text-secondary hover:text-primary font-heading font-semibold text-sm transition-all duration-200 hover:bg-primary-tint"
                aria-label="Ahmed Sami Fathi's LinkedIn profile"
              >
                <Linkedin size={15} aria-hidden="true" />
                LinkedIn
              </a>
            </div>
          </div>

          {/* ── Right: Profile photo ── */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Pulsing outer ring */}
              <div
                className="absolute inset-0 rounded-full motion-safe:animate-[pulseRingAnim_2.5s_ease-out_infinite] bg-primary/10 scale-110"
                aria-hidden="true"
              />
              {/* Teal ring */}
              <div
                className="absolute inset-0 rounded-full border-4 border-primary/30 scale-105"
                aria-hidden="true"
              />
              {/* Photo */}
              <div className="relative w-52 h-52 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden shadow-teal-glow border-4 border-surface">
                <Image
                  src="/assets/profile-photo.jpg"
                  alt="Ahmed Sami Fathi, Data Engineer"
                  fill
                  sizes="(max-width: 640px) 208px, (max-width: 1024px) 256px, 288px"
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Floating badge */}
              <div
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-surface border border-border rounded-full px-3 py-1 shadow-card flex items-center gap-1.5"
                aria-hidden="true"
              >
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs font-mono font-medium text-text-secondary whitespace-nowrap">
                  Open to Work
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom: Live Data Flow ── */}
        <div className="mt-12 lg:mt-16 w-full">
          <HeroDataFlow />
        </div>

        {/* Scroll hint */}
        <div className="flex justify-center mt-8 motion-safe:animate-bounce" aria-hidden="true">
          <a href="#about" className="text-text-secondary hover:text-primary transition-colors p-2">
            <ChevronDown size={22} />
          </a>
        </div>
      </div>
    </section>
  );
}

