"use client";

import { useEffect, useRef, useState } from "react";

// Isometric server SVG illustration
function ServerIllustration() {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      className="flex-shrink-0"
    >
      {/* Server rack — isometric style */}
      {/* Back face */}
      <path d="M20 80 L60 58 L100 80 L60 102 Z" fill="#E4F2ED" stroke="#0F6E5C" strokeWidth="1.2"/>
      {/* Top face */}
      <path d="M20 80 L60 58 L60 38 L20 60 Z" fill="#0F6E5C" opacity="0.12"/>
      {/* Right face */}
      <path d="M60 58 L100 80 L100 60 L60 38 Z" fill="#0F6E5C" opacity="0.2"/>
      {/* Server unit 1 */}
      <rect x="30" y="64" width="40" height="8" rx="2" fill="#0F6E5C" opacity="0.3"/>
      <circle cx="38" cy="68" r="2" fill="#2E8B57"/>
      <circle cx="44" cy="68" r="2" fill="#E8792E" opacity="0.7"/>
      {/* Server unit 2 */}
      <rect x="30" y="74" width="40" height="8" rx="2" fill="#0F6E5C" opacity="0.2"/>
      <circle cx="38" cy="78" r="2" fill="#2E8B57"/>
      {/* Pipes / connections */}
      <path d="M60 38 L60 26" stroke="#0F6E5C" strokeWidth="1.5" strokeDasharray="2 2"/>
      <path d="M100 60 L110 52" stroke="#0F6E5C" strokeWidth="1.2" strokeDasharray="2 2"/>
      {/* Data flow dots */}
      <circle cx="60" cy="30" r="3" fill="#E8792E" opacity="0.8"/>
      <circle cx="107" cy="55" r="3" fill="#0F6E5C" opacity="0.8"/>
    </svg>
  );
}

export default function AboutMe() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="py-16 sm:py-20 lg:py-24 bg-bg-alt"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`bg-surface rounded-3xl shadow-card border border-border p-8 sm:p-10 lg:p-12 transition-all duration-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* Text */}
            <div className="flex-1 space-y-5">
              <div>
                <p className="text-xs font-mono font-medium text-primary uppercase tracking-widest mb-2">
                  Who I Am
                </p>
                <h2
                  id="about-heading"
                  className="font-heading font-bold text-2xl sm:text-3xl text-text-primary"
                >
                  About Me
                </h2>
              </div>

              <div className="space-y-4">
                <p className="text-text-secondary leading-relaxed text-[15px] sm:text-base">
                  I build <span className="text-primary font-medium">ETL/ELT pipelines</span>, <span className="text-primary font-medium">data warehouses</span>, and real-time data systems using Python, SQL, Spark, dbt, Kafka, and Snowflake.
                </p>

                <p className="text-text-secondary leading-relaxed text-[15px] sm:text-base">
                  My hands-on work spans batch and streaming architectures, medallion data layers, analytics engineering, and data quality workflows.
                </p>

                <p className="text-text-secondary leading-relaxed text-[15px] sm:text-base">
                  I'm pursuing opportunities to contribute as a <span className="text-primary font-medium">Junior Data Engineer / Analytics Engineer</span> and build reliable, production-oriented data infrastructure.
                </p>
              </div>

              {/* Quick facts */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {[
                  { label: "University", value: "Sinai University" },
                  { label: "CGPA", value: "3.3 / 4.0" },
                  { label: "Graduation", value: "2027" },
                  { label: "Location", value: "Mansoura, Egypt" },
                  { label: "Track", value: "Data Engineering" },
                  { label: "Status", value: "Open to Work" },
                ].map((fact) => (
                  <div
                    key={fact.label}
                    className="bg-bg-base border border-border rounded-xl p-3"
                  >
                    <p className="text-[11px] font-mono text-text-secondary uppercase tracking-wide mb-0.5">
                      {fact.label}
                    </p>
                    <p className="text-sm font-semibold text-text-primary">{fact.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Illustration */}
            <div className="flex-shrink-0 lg:self-center">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-primary-tint border border-primary/20 flex items-center justify-center shadow-card">
                <ServerIllustration />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

