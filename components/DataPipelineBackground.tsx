"use client";

import React from "react";

/**
 * DataPipelineBackground
 *
 * A subtle, realistic two-way data-flow background animation inspired by
 * distributed Data Engineering systems:
 * - Streaming ingestion & event queues (Kafka/Flink)
 * - Distributed batch processing & Medallion layers (Spark/dbt)
 * - Cloud data warehousing & lakehouse storage (Snowflake/Azure)
 * - Two-way flows: forward ingestion/ETL + reverse ETL/acknowledgment feedback
 *
 * Layout:
 * All paths navigate strictly through the open corridors around Hero content:
 * - Upper Highway: above the name and photo (Y: 15–65)
 * - Central Conduit: open vertical valley between text and photo (X: 560–630)
 * - Left Margin Spine: far left outer gutter (X: 15–45)
 * - Right Margin Spine: far right outer gutter (X: 1140–1180)
 * - Lower Transit: comfortable buffer above HeroDataFlow (Y: 430–485)
 * - Bottom Horizon: below HeroDataFlow (Y: 650–675)
 */

// ── 1. Pipeline Paths Definition ──
const pipelinePaths = [
  // ── Upper Ingestion Highway (Top edge) ──
  {
    id: "p-upper-main",
    d: "M -40,40 C 180,18, 380,62, 580,36 C 780,14, 980,58, 1240,32",
    hasActivePulse: true,
  },
  {
    id: "p-upper-buffer",
    d: "M -40,18 C 220,48, 440,16, 640,38 C 840,56, 1040,22, 1240,48",
    hasActivePulse: false,
  },

  // ── Central Gap Conduit (Open valley between text and photo) ──
  {
    id: "p-central-spine",
    d: "M 560,36 C 590,130, 568,250, 608,350 C 628,400, 612,440, 585,480",
    hasActivePulse: false,
  },
  {
    id: "p-central-branch",
    d: "M 608,350 C 648,390, 710,430, 780,455",
    hasActivePulse: false,
  },

  // ── Left Margin Spine (Far-left gutter) ──
  {
    id: "p-left-spine",
    d: "M 25,-30 C 40,110, 15,250, 35,370 C 45,440, 20,500, 30,710",
    hasActivePulse: false,
  },
  {
    id: "p-left-feed",
    d: "M -30,85 C 80,78, 170,62, 270,52",
    hasActivePulse: false,
  },

  // ── Right Margin Spine (Far-right gutter) ──
  {
    id: "p-right-spine",
    d: "M 1170,-30 C 1150,130, 1180,270, 1160,390 C 1145,470, 1175,550, 1165,710",
    hasActivePulse: false,
  },
  {
    id: "p-right-arch",
    d: "M 1020,24 C 1080,48, 1140,105, 1165,190",
    hasActivePulse: false,
  },

  // ── Lower Transit Channel (Between buttons/photo and HeroDataFlow) ──
  {
    id: "p-lower-main",
    d: "M -40,448 C 160,472, 360,434, 580,464 C 780,488, 980,442, 1240,468",
    hasActivePulse: true,
  },
  {
    id: "p-lower-cross",
    d: "M -40,482 C 200,448, 420,482, 640,452 C 860,428, 1060,476, 1240,438",
    hasActivePulse: false,
  },
  {
    id: "p-lower-feed",
    d: "M 30,420 C 140,432, 310,452, 480,462",
    hasActivePulse: false,
  },

  // ── Bottom Horizon (Below HeroDataFlow strip) ──
  {
    id: "p-bottom-horizon",
    d: "M -40,665 C 240,650, 520,674, 800,654 C 1000,668, 1120,656, 1240,664",
    hasActivePulse: false,
  },
];

// ── 2. Bidirectional Packets (Forward: Left → Right / Top → Bottom; Reverse: Right → Left / Bottom → Top) ──
const dataPackets = [
  // Upper Highway: Forward (Stream Ingestion) + Reverse (Schema ACK / Commit)
  {
    pathId: "p-upper-main",
    direction: "forward",
    type: "teal-dash",
    dur: "21s",
    delay: "0s",
    dashArray: "2.4 97.6",
  },
  {
    pathId: "p-upper-main",
    direction: "reverse",
    type: "teal-dot",
    dur: "19s",
    delay: "6s",
    dashArray: "1.2 98.8",
  },
  {
    pathId: "p-upper-buffer",
    direction: "reverse",
    type: "teal-dash",
    dur: "24s",
    delay: "2s",
    dashArray: "2.0 98.0",
  },
  {
    pathId: "p-upper-buffer",
    direction: "forward",
    type: "teal-dot",
    dur: "26s",
    delay: "11s",
    dashArray: "1.4 98.6",
  },

  // Central Valley Conduit: Forward (Partition dispatch) + Reverse (Health telemetry)
  {
    pathId: "p-central-spine",
    direction: "forward",
    type: "teal-dash",
    dur: "16s",
    delay: "1s",
    dashArray: "2.6 97.4",
  },
  {
    pathId: "p-central-spine",
    direction: "reverse",
    type: "teal-dot",
    dur: "14s",
    delay: "7s",
    dashArray: "1.2 98.8",
  },
  // Branch into analytics storage: Forward with occasional warm orange packet
  {
    pathId: "p-central-branch",
    direction: "forward",
    type: "orange-packet",
    dur: "12s",
    delay: "3s",
    dashArray: "2.2 97.8",
  },

  // Left Margin Spine: Forward (Source ingest) + Reverse (Backpressure signal)
  {
    pathId: "p-left-spine",
    direction: "forward",
    type: "teal-dot",
    dur: "27s",
    delay: "2s",
    dashArray: "1.5 98.5",
  },
  {
    pathId: "p-left-spine",
    direction: "reverse",
    type: "teal-dash",
    dur: "23s",
    delay: "10s",
    dashArray: "2.0 98.0",
  },
  {
    pathId: "p-left-feed",
    direction: "forward",
    type: "teal-dot",
    dur: "15s",
    delay: "4s",
    dashArray: "1.3 98.7",
  },

  // Right Margin Spine: Forward (Replication) + Reverse (Replica sync ACK)
  {
    pathId: "p-right-spine",
    direction: "forward",
    type: "teal-dash",
    dur: "25s",
    delay: "1s",
    dashArray: "2.2 97.8",
  },
  {
    pathId: "p-right-spine",
    direction: "reverse",
    type: "teal-dot",
    dur: "22s",
    delay: "9s",
    dashArray: "1.3 98.7",
  },
  {
    pathId: "p-right-arch",
    direction: "forward",
    type: "teal-dot",
    dur: "14s",
    delay: "5s",
    dashArray: "1.4 98.6",
  },

  // Lower Transit: Forward (Medallion ETL) + Reverse (Reverse ETL / Metric Sync)
  {
    pathId: "p-lower-main",
    direction: "forward",
    type: "teal-dash",
    dur: "22s",
    delay: "3s",
    dashArray: "2.8 97.2",
  },
  {
    pathId: "p-lower-main",
    direction: "reverse",
    type: "orange-packet",
    dur: "25s",
    delay: "12s",
    dashArray: "1.8 98.2",
  },
  {
    pathId: "p-lower-cross",
    direction: "reverse",
    type: "teal-dash",
    dur: "20s",
    delay: "5s",
    dashArray: "2.0 98.0",
  },
  {
    pathId: "p-lower-cross",
    direction: "forward",
    type: "teal-dot",
    dur: "24s",
    delay: "13s",
    dashArray: "1.2 98.8",
  },
  {
    pathId: "p-lower-feed",
    direction: "forward",
    type: "teal-dot",
    dur: "16s",
    delay: "6s",
    dashArray: "1.4 98.6",
  },

  // Bottom Horizon: Deep storage stream
  {
    pathId: "p-bottom-horizon",
    direction: "forward",
    type: "teal-dot",
    dur: "32s",
    delay: "2s",
    dashArray: "1.5 98.5",
  },
  {
    pathId: "p-bottom-horizon",
    direction: "reverse",
    type: "teal-dash",
    dur: "30s",
    delay: "15s",
    dashArray: "2.0 98.0",
  },
];

// ── 3. Connection Nodes (Placed at real path intersections with pulse timings) ──
const connectionNodes = [
  // Upper Ingestion nodes
  { id: "node-1", cx: 270,  cy: 52,  r: 2.4, pulseDur: "7.5s", pulseDelay: "1.2s", label: "Source Gateway" },
  { id: "node-2", cx: 580,  cy: 36,  r: 2.8, pulseDur: "6.8s", pulseDelay: "3.5s", label: "Ingestion Broker" },
  { id: "node-3", cx: 920,  cy: 42,  r: 2.3, pulseDur: "8.2s", pulseDelay: "2.0s", label: "Schema Registry" },

  // Left perimeter nodes
  { id: "node-4", cx: 30,   cy: 180, r: 2.0, pulseDur: "9.0s", pulseDelay: "4.8s", label: "Agent Queue" },
  { id: "node-5", cx: 32,   cy: 430, r: 2.2, pulseDur: "7.0s", pulseDelay: "1.8s", label: "Telemetry Node" },

  // Central valley nodes (Between text and photo)
  { id: "node-6", cx: 575,  cy: 190, r: 2.4, pulseDur: "6.2s", pulseDelay: "2.5s", label: "Stream Coordinator" },
  { id: "node-7", cx: 608,  cy: 350, r: 2.6, pulseDur: "7.8s", pulseDelay: "5.0s", label: "Partition Router" },

  // Right perimeter nodes
  { id: "node-8", cx: 1165, cy: 190, r: 2.2, pulseDur: "8.0s", pulseDelay: "3.0s", label: "Replica Node" },
  { id: "node-9", cx: 1160, cy: 420, r: 2.0, pulseDur: "9.4s", pulseDelay: "6.2s", label: "Sink Gateway" },

  // Lower transit nodes
  { id: "node-10", cx: 480, cy: 462, r: 2.6, pulseDur: "7.2s", pulseDelay: "4.0s", label: "Transform Hub" },
  { id: "node-11", cx: 780, cy: 455, r: 2.5, pulseDur: "8.5s", pulseDelay: "2.8s", label: "Warehouse Staging" },
];

export default function DataPipelineBackground() {
  // Map paths for quick lookup
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
      {/* Soft edge gradients: gently dissolve the network into the cream background */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-bg-base/80 via-transparent to-bg-base/70" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-bg-base/65 via-transparent to-bg-base/65" />

      <svg
        className="absolute inset-0 w-full h-full opacity-[0.40] transition-opacity duration-[2000ms] ease-in-out group-hover/bg:opacity-[0.50]"
        viewBox="0 0 1200 680"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Subtle node glow filter / radial gradient */}
          <radialGradient id="twoWayNodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0F6E5C" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#0F6E5C" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── Layer 1: Static Pipeline Skeleton (Thin, crisp, elegant) ── */}
        <g id="pipeline-skeleton">
          {pipelinePaths.map((p) => (
            <path
              key={`base-${p.id}`}
              d={p.d}
              fill="none"
              stroke="#0F6E5C"
              strokeWidth="0.7"
              strokeOpacity="0.10"
              className={p.hasActivePulse ? "animate-pipe-pulse" : undefined}
              style={
                p.hasActivePulse
                  ? { animationDuration: p.id === "p-upper-main" ? "14s" : "18s" }
                  : undefined
              }
            />
          ))}
        </g>

        {/* ── Layer 2: Occasional transmission wave along active routes ── */}
        <g id="pipeline-bursts" className="motion-reduce:hidden">
          <path
            d={pathMap["p-upper-main"]}
            fill="none"
            stroke="#0F6E5C"
            strokeWidth="0.9"
            strokeOpacity="0.12"
            pathLength="100"
            strokeDasharray="9 91"
            strokeLinecap="round"
            className="animate-flow-forward"
            style={{ animationDuration: "14s", animationDelay: "4s" }}
          />
          <path
            d={pathMap["p-lower-main"]}
            fill="none"
            stroke="#0F6E5C"
            strokeWidth="0.9"
            strokeOpacity="0.10"
            pathLength="100"
            strokeDasharray="8 92"
            strokeLinecap="round"
            className="animate-flow-reverse"
            style={{ animationDuration: "17s", animationDelay: "8s" }}
          />
        </g>

        {/* ── Layer 3: Bidirectional Moving Data Packets ── */}
        <g id="pipeline-packets" className="motion-reduce:hidden">
          {dataPackets.map((pkt, i) => {
            const d = pathMap[pkt.pathId];
            if (!d) return null;

            const isOrange = pkt.type === "orange-packet";
            const strokeColor = isOrange ? "#E8792E" : "#0F6E5C";
            const strokeWidth = isOrange ? "1.2" : pkt.type === "teal-dash" ? "1.4" : "1.2";
            const strokeOpacity = isOrange ? "0.38" : pkt.type === "teal-dash" ? "0.36" : "0.30";
            const animClass =
              pkt.direction === "forward" ? "animate-flow-forward" : "animate-flow-reverse";

            return (
              <path
                key={`pkt-${pkt.pathId}-${pkt.direction}-${i}`}
                d={d}
                fill="none"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeOpacity={strokeOpacity}
                pathLength="100"
                strokeDasharray={pkt.dashArray}
                strokeLinecap="round"
                className={animClass}
                style={{
                  animationDuration: pkt.dur,
                  animationDelay: pkt.delay,
                }}
              />
            );
          })}
        </g>

        {/* ── Layer 4: Connection Nodes with Pulse Reactions ── */}
        <g id="pipeline-nodes">
          {connectionNodes.map((n) => (
            <g key={n.id}>
              {/* Soft ambient background glow */}
              <circle
                cx={n.cx}
                cy={n.cy}
                r={n.r * 2.8}
                fill="url(#twoWayNodeGlow)"
                opacity="0.22"
              />

              {/* Reactive pulse halo: expands and fades when packet arrives */}
              <circle
                cx={n.cx}
                cy={n.cy}
                r={n.r * 1.8}
                fill="none"
                stroke="#0F6E5C"
                strokeWidth="0.5"
                className="motion-reduce:hidden animate-node-halo"
                style={{
                  animationDuration: n.pulseDur,
                  animationDelay: n.pulseDelay,
                }}
              />

              {/* Node solid body with synchronized brightening */}
              <circle
                cx={n.cx}
                cy={n.cy}
                r={n.r}
                fill="#0F6E5C"
                className="animate-node-brighten"
                style={{
                  animationDuration: n.pulseDur,
                  animationDelay: n.pulseDelay,
                }}
              />

              {/* Tiny bright center core */}
              <circle
                cx={n.cx}
                cy={n.cy}
                r={n.r * 0.38}
                fill="#FAF6EC"
                opacity="0.75"
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
