"use client";

import React from "react";

/**
 * DataPipelineBackground
 *
 * A lively yet refined two-way data-flow background animation.
 * All paths navigate strictly through open corridors around Hero content.
 */

const pipelinePaths = [
  { id: "p-upper-main",    d: "M -40,42 C 180,18, 380,64, 580,36 C 780,14, 980,60, 1240,32",            hasActivePulse: true  },
  { id: "p-upper-buffer",  d: "M -40,20 C 220,50, 440,16, 640,38 C 840,58, 1040,22, 1240,48",           hasActivePulse: false },
  { id: "p-central-spine", d: "M 560,36 C 590,130, 568,250, 608,350 C 628,400, 612,440, 585,480",        hasActivePulse: false },
  { id: "p-central-branch",d: "M 608,350 C 648,390, 710,430, 780,455",                                   hasActivePulse: false },
  { id: "p-left-spine",    d: "M 25,-30 C 40,110, 15,250, 35,370 C 45,440, 20,500, 30,710",             hasActivePulse: false },
  { id: "p-left-feed",     d: "M -30,85 C 80,78, 170,62, 270,52",                                        hasActivePulse: false },
  { id: "p-right-spine",   d: "M 1170,-30 C 1150,130, 1180,270, 1160,390 C 1145,470, 1175,550, 1165,710",hasActivePulse: false },
  { id: "p-right-arch",    d: "M 1020,24 C 1080,48, 1140,105, 1165,190",                                 hasActivePulse: false },
  { id: "p-lower-main",    d: "M -40,448 C 160,472, 360,434, 580,464 C 780,488, 980,442, 1240,468",      hasActivePulse: true  },
  { id: "p-lower-cross",   d: "M -40,482 C 200,448, 420,482, 640,452 C 860,428, 1060,476, 1240,438",     hasActivePulse: false },
  { id: "p-lower-feed",    d: "M 30,420 C 140,432, 310,452, 480,462",                                    hasActivePulse: false },
  { id: "p-bottom-horizon",d: "M -40,665 C 240,650, 520,674, 800,654 C 1000,668, 1120,656, 1240,664",   hasActivePulse: false },
];

const dataPackets = [
  { id: "up-fwd-1",       pathId: "p-upper-main",     direction: "forward",  color: "#0F6E5C", dur: "7.5s",  delay: "0s"   },
  { id: "up-rev-1",       pathId: "p-upper-main",     direction: "reverse",  color: "#0F6E5C", dur: "8.2s",  delay: "2.8s" },
  { id: "up-rev-2",       pathId: "p-upper-buffer",   direction: "reverse",  color: "#0F6E5C", dur: "9.0s",  delay: "1.2s" },
  { id: "up-fwd-2",       pathId: "p-upper-buffer",   direction: "forward",  color: "#0F6E5C", dur: "8.6s",  delay: "5.0s" },
  { id: "ctr-down",       pathId: "p-central-spine",  direction: "forward",  color: "#0F6E5C", dur: "6.8s",  delay: "0.5s" },
  { id: "ctr-up",         pathId: "p-central-spine",  direction: "reverse",  color: "#0F6E5C", dur: "7.2s",  delay: "3.6s" },
  { id: "ctr-branch-org", pathId: "p-central-branch", direction: "forward",  color: "#E8792E", dur: "6.0s",  delay: "1.8s" },
  { id: "left-down",      pathId: "p-left-spine",     direction: "forward",  color: "#0F6E5C", dur: "10.0s", delay: "1.0s" },
  { id: "left-up",        pathId: "p-left-spine",     direction: "reverse",  color: "#0F6E5C", dur: "9.5s",  delay: "5.5s" },
  { id: "left-feed-fwd",  pathId: "p-left-feed",      direction: "forward",  color: "#0F6E5C", dur: "6.2s",  delay: "2.0s" },
  { id: "right-down",     pathId: "p-right-spine",    direction: "forward",  color: "#0F6E5C", dur: "9.8s",  delay: "0.8s" },
  { id: "right-up",       pathId: "p-right-spine",    direction: "reverse",  color: "#0F6E5C", dur: "8.8s",  delay: "4.5s" },
  { id: "right-arch-fwd", pathId: "p-right-arch",     direction: "forward",  color: "#0F6E5C", dur: "6.5s",  delay: "3.0s" },
  { id: "low-fwd-1",      pathId: "p-lower-main",     direction: "forward",  color: "#0F6E5C", dur: "8.0s",  delay: "1.5s" },
  { id: "low-rev-org",    pathId: "p-lower-main",     direction: "reverse",  color: "#E8792E", dur: "9.2s",  delay: "4.8s" },
  { id: "low-rev-2",      pathId: "p-lower-cross",    direction: "reverse",  color: "#0F6E5C", dur: "8.4s",  delay: "2.2s" },
  { id: "low-fwd-2",      pathId: "p-lower-cross",    direction: "forward",  color: "#0F6E5C", dur: "8.9s",  delay: "6.0s" },
  { id: "low-feed-fwd",   pathId: "p-lower-feed",     direction: "forward",  color: "#0F6E5C", dur: "6.4s",  delay: "3.2s" },
  { id: "btm-fwd",        pathId: "p-bottom-horizon", direction: "forward",  color: "#0F6E5C", dur: "11.5s", delay: "1.0s" },
  { id: "btm-rev",        pathId: "p-bottom-horizon", direction: "reverse",  color: "#0F6E5C", dur: "10.8s", delay: "6.2s" },
];

const connectionNodes = [
  { id: "node-1",  cx: 270,  cy: 52,  r: 2.6, pulseDur: "4.2s", pulseDelay: "0.8s" },
  { id: "node-2",  cx: 580,  cy: 36,  r: 3.2, pulseDur: "3.8s", pulseDelay: "2.1s" },
  { id: "node-3",  cx: 920,  cy: 42,  r: 2.6, pulseDur: "4.6s", pulseDelay: "1.5s" },
  { id: "node-4",  cx: 30,   cy: 180, r: 2.2, pulseDur: "5.0s", pulseDelay: "2.8s" },
  { id: "node-5",  cx: 32,   cy: 430, r: 2.4, pulseDur: "4.0s", pulseDelay: "1.2s" },
  { id: "node-6",  cx: 575,  cy: 190, r: 2.8, pulseDur: "3.6s", pulseDelay: "1.6s" },
  { id: "node-7",  cx: 608,  cy: 350, r: 3.0, pulseDur: "4.4s", pulseDelay: "3.0s" },
  { id: "node-8",  cx: 1165, cy: 190, r: 2.4, pulseDur: "4.8s", pulseDelay: "1.9s" },
  { id: "node-9",  cx: 1160, cy: 420, r: 2.2, pulseDur: "5.2s", pulseDelay: "3.8s" },
  { id: "node-10", cx: 480,  cy: 462, r: 3.0, pulseDur: "4.1s", pulseDelay: "2.4s" },
  { id: "node-11", cx: 780,  cy: 455, r: 2.8, pulseDur: "4.5s", pulseDelay: "1.4s" },
];

export default function DataPipelineBackground() {
  const pathMap = React.useMemo(() => {
    const map: Record<string, string> = {};
    for (const p of pipelinePaths) {
      map[p.id] = p.d;
    }
    return map;
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Soft edge gradients */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-bg-base/75 via-transparent to-bg-base/65" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-bg-base/60 via-transparent to-bg-base/60" />

      <svg
        className="absolute inset-0 w-full h-full opacity-[0.55] transition-opacity duration-1000 group-hover/bg:opacity-[0.68]"
        viewBox="0 0 1200 680"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="dataNodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0F6E5C" stopOpacity="0.40" />
            <stop offset="100%" stopColor="#0F6E5C" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Layer 1: Static skeleton paths */}
        <g id="pipeline-paths">
          {pipelinePaths.map((p) => (
            <path
              key={`base-${p.id}`}
              d={p.d}
              fill="none"
              stroke="#0F6E5C"
              strokeWidth="0.8"
              strokeOpacity="0.14"
              className={p.hasActivePulse ? "animate-pipe-pulse" : undefined}
              style={
                p.hasActivePulse
                  ? { animationDuration: p.id === "p-upper-main" ? "8s" : "10s" }
                  : undefined
              }
            />
          ))}
        </g>

        {/* Layer 2: Data burst waves */}
        <g id="pipeline-bursts" className="motion-reduce:hidden">
          <path
            d={pathMap["p-upper-main"]}
            fill="none"
            stroke="#0F6E5C"
            strokeWidth="1.1"
            strokeOpacity="0.18"
            pathLength="100"
            strokeDasharray="8 92"
            strokeLinecap="round"
            className="animate-flow-forward"
            style={{ animationDuration: "8.5s", animationDelay: "2s" }}
          />
          <path
            d={pathMap["p-lower-main"]}
            fill="none"
            stroke="#0F6E5C"
            strokeWidth="1.1"
            strokeOpacity="0.16"
            pathLength="100"
            strokeDasharray="7 93"
            strokeLinecap="round"
            className="animate-flow-reverse"
            style={{ animationDuration: "9.5s", animationDelay: "4s" }}
          />
        </g>

        {/* Layer 3: Bidirectional packets with soft trails */}
        <g id="pipeline-packets" className="motion-reduce:hidden">
          {dataPackets.map((pkt) => {
            const d = pathMap[pkt.pathId];
            if (!d) return null;
            const isOrange = pkt.color === "#E8792E";
            const animClass =
              pkt.direction === "forward" ? "animate-flow-forward" : "animate-flow-reverse";
            return (
              <g key={`pkt-group-${pkt.id}`}>
                {/* Soft trailing tail */}
                <path
                  d={d}
                  fill="none"
                  stroke={pkt.color}
                  strokeWidth={isOrange ? "1.2" : "1.3"}
                  strokeOpacity={isOrange ? "0.40" : "0.38"}
                  pathLength="100"
                  strokeDasharray="4.2 95.8"
                  strokeLinecap="round"
                  className={animClass}
                  style={{ animationDuration: pkt.dur, animationDelay: pkt.delay }}
                />
                {/* Bright leading head */}
                <path
                  d={d}
                  fill="none"
                  stroke={pkt.color}
                  strokeWidth={isOrange ? "2.0" : "2.2"}
                  strokeOpacity={isOrange ? "0.85" : "0.80"}
                  pathLength="100"
                  strokeDasharray="1.6 98.4"
                  strokeLinecap="round"
                  className={animClass}
                  style={{ animationDuration: pkt.dur, animationDelay: pkt.delay }}
                />
              </g>
            );
          })}
        </g>

        {/* Layer 4: Connection nodes with pulse */}
        <g id="pipeline-nodes">
          {connectionNodes.map((n) => (
            <g key={n.id}>
              <circle
                cx={n.cx}
                cy={n.cy}
                r={n.r * 2.8}
                fill="url(#dataNodeGlow)"
                opacity="0.30"
              />
              <circle
                cx={n.cx}
                cy={n.cy}
                r={n.r * 1.8}
                fill="none"
                stroke="#0F6E5C"
                strokeWidth="0.6"
                className="motion-reduce:hidden animate-node-halo"
                style={{ animationDuration: n.pulseDur, animationDelay: n.pulseDelay }}
              />
              <circle
                cx={n.cx}
                cy={n.cy}
                r={n.r}
                fill="#0F6E5C"
                className="animate-node-brighten"
                style={{ animationDuration: n.pulseDur, animationDelay: n.pulseDelay }}
              />
              <circle
                cx={n.cx}
                cy={n.cy}
                r={n.r * 0.40}
                fill="#FAF6EC"
                opacity="0.90"
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
