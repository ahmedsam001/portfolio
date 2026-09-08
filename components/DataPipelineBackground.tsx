"use client";

import React from "react";

/**
 * Data Pipeline Background Animation
 *
 * Paths are routed through the empty zones of the Hero layout:
 * - Top edge (above the name)
 * - Far left/right margins
 * - Bottom zones (below buttons/photo, above pipeline strip)
 * - Diagonal connectors linking top to bottom
 *
 * Represents: Data Sources → Streaming → Processing → Storage → Analytics
 */

const paths = [
  // Upper-left corner flow (above the name area)
  { d: "M-20,25 C120,25 200,60 340,55 C480,50 550,20 680,15", dur: "20s", delay: "0s" },
  // Top sweep across full width (very top edge)
  { d: "M-20,8 C200,8 400,35 600,30 C800,25 950,8 1120,12", dur: "28s", delay: "4s" },
  // Upper-right area (above photo, curves down to right edge)
  { d: "M680,15 C780,12 880,30 1000,55 C1060,70 1100,40 1120,35", dur: "16s", delay: "2s" },

  // Left-side vertical flow (far left margin)
  { d: "M-10,80 C5,120 15,200 10,300 C5,380 -5,420 8,500", dur: "25s", delay: "1s" },
  // Right-side vertical flow (far right margin)
  { d: "M1110,50 C1100,130 1115,250 1105,350 C1095,430 1110,500 1100,580", dur: "26s", delay: "3s" },

  // Bottom-left flow (below buttons, above pipeline strip)
  { d: "M-20,520 C100,510 200,540 340,535 C420,530 480,550 550,545", dur: "22s", delay: "2s" },
  // Bottom-right flow (below photo)
  { d: "M620,480 C720,475 830,500 940,495 C1020,490 1080,510 1120,505", dur: "20s", delay: "5s" },

  // Deep bottom edge sweep
  { d: "M-20,600 C200,595 450,615 700,608 C900,602 1050,618 1120,612", dur: "30s", delay: "1s" },

  // Cross-connecting arcs (diagonal links between zones)
  { d: "M340,55 C380,120 350,300 340,535", dur: "32s", delay: "6s" },
  { d: "M680,15 C700,100 680,300 620,480", dur: "30s", delay: "8s" },
  { d: "M550,545 C580,520 600,500 620,480", dur: "12s", delay: "3s" },
];

const nodes = [
  { cx: 340, cy: 55, r: 3, pulse: true },
  { cx: 680, cy: 15, r: 2.5, pulse: false },
  { cx: 10, cy: 300, r: 2, pulse: true },
  { cx: 1105, cy: 350, r: 2, pulse: false },
  { cx: 550, cy: 545, r: 2.5, pulse: true },
  { cx: 620, cy: 480, r: 2, pulse: false },
  { cx: 1000, cy: 55, r: 1.5, pulse: false },
  { cx: 200, cy: 540, r: 1.5, pulse: false },
];

export default function DataPipelineBackground() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Soft edge fading so network dissolves at boundaries */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-bg-base/70 via-transparent to-bg-base/60" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-bg-base/50 via-transparent to-bg-base/50" />

      <svg
        className="absolute inset-0 w-full h-full opacity-[0.45] transition-opacity duration-[2000ms] ease-in-out group-hover/bg:opacity-[0.55]"
        viewBox="0 0 1100 630"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="pipeNodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0F6E5C" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0F6E5C" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Static pipeline skeleton */}
        {paths.map((p, i) => (
          <path
            key={`base-${i}`}
            d={p.d}
            fill="none"
            stroke="#0F6E5C"
            strokeWidth="0.8"
            strokeOpacity="0.12"
          />
        ))}

        {/* Animated data packets */}
        <g className="motion-reduce:hidden">
          {/* Primary packets */}
          {paths.map((p, i) => (
            <path
              key={`pkt-${i}`}
              d={p.d}
              fill="none"
              stroke="#0F6E5C"
              strokeWidth="1.5"
              strokeOpacity="0.35"
              pathLength="100"
              strokeDasharray="1.5 98.5"
              strokeLinecap="round"
              className="animate-flow-bg"
              style={{
                animationDuration: p.dur,
                animationDelay: p.delay,
              }}
            />
          ))}
          {/* Staggered secondary packets on main routes */}
          {paths.slice(0, 8).map((p, i) => (
            <path
              key={`pkt2-${i}`}
              d={p.d}
              fill="none"
              stroke="#0F6E5C"
              strokeWidth="1"
              strokeOpacity="0.2"
              pathLength="100"
              strokeDasharray="1 99"
              strokeLinecap="round"
              className="animate-flow-bg"
              style={{
                animationDuration: p.dur,
                animationDelay: `calc(${p.delay} + ${p.dur} * 0.45)`,
              }}
            />
          ))}
          {/* Orange accent packets on output/analytics paths */}
          {paths.slice(5, 8).map((p, i) => (
            <path
              key={`pkt-accent-${i}`}
              d={p.d}
              fill="none"
              stroke="#E8792E"
              strokeWidth="1"
              strokeOpacity="0.2"
              pathLength="100"
              strokeDasharray="0.8 99.2"
              strokeLinecap="round"
              className="animate-flow-bg"
              style={{
                animationDuration: p.dur,
                animationDelay: `calc(${p.delay} + ${p.dur} * 0.7)`,
              }}
            />
          ))}
        </g>

        {/* Junction nodes */}
        {nodes.map((n, i) => (
          <g key={`node-${i}`}>
            <circle
              cx={n.cx}
              cy={n.cy}
              r={n.r * 3}
              fill="url(#pipeNodeGlow)"
              opacity="0.25"
            />
            {n.pulse && (
              <circle
                cx={n.cx}
                cy={n.cy}
                r={n.r * 2}
                fill="none"
                stroke="#0F6E5C"
                strokeWidth="0.5"
                strokeOpacity="0.2"
                className="motion-reduce:hidden animate-[pulseRingAnim_4s_ease-out_infinite]"
              />
            )}
            <circle
              cx={n.cx}
              cy={n.cy}
              r={n.r}
              fill="#0F6E5C"
              opacity="0.25"
            />
            <circle
              cx={n.cx}
              cy={n.cy}
              r={n.r * 0.35}
              fill="#FAF6EC"
              opacity="0.7"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
