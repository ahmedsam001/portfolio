"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/data/projects";

// Layer color map
const layerColors: Record<string, { bg: string; border: string; text: string }> = {
  source:  { bg: "#E4F2ED", border: "#0F6E5C", text: "#0B5548" },
  ingest:  { bg: "#EBF4F0", border: "#0F6E5C", text: "#0B5548" },
  process: { bg: "#F0F7F4", border: "#0F6E5C", text: "#0F6E5C" },
  storage: { bg: "#F0F7F4", border: "#0F6E5C", text: "#0F6E5C" },
  output:  { bg: "#FCE9D9", border: "#E8792E", text: "#C7601E" },
};

interface Props {
  project: Project;
  compact?: boolean;
}

/**
 * Simple left-to-right flow diagram rendered as SVG-adjacent HTML boxes.
 * Uses the archNodes from project data grouped by layer.
 */
export default function ArchitectureDiagram({ project, compact = false }: Props) {
  // Group nodes by layer order
  const layerOrder: Array<Project["archNodes"][number]["layer"]> = [
    "source", "ingest", "process", "storage", "output",
  ];

  const layerLabels: Record<string, string> = {
    source:  "Sources",
    ingest:  "Ingestion",
    process: "Processing",
    storage: "Storage",
    output:  "Analytics",
  };

  const layers = layerOrder
    .map((layer) => ({
      key: layer,
      label: layerLabels[layer],
      nodes: project.archNodes.filter((n) => n.layer === layer),
    }))
    .filter((l) => l.nodes.length > 0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // Allow native horizontal scroll
      const isAtLeft = el.scrollLeft === 0;
      const isAtRight = Math.ceil(el.scrollLeft + el.clientWidth) >= el.scrollWidth;

      if ((e.deltaY < 0 && !isAtLeft) || (e.deltaY > 0 && !isAtRight)) {
        e.preventDefault();
        el.scrollBy({ left: e.deltaY, behavior: "auto" });
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative group/arch" role="region" aria-label={`Architecture diagram for ${project.title}`}>
      {/* Edge Gradients */}
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-bg-base to-transparent z-10 pointer-events-none transition-opacity duration-300" />
      )}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-bg-base to-transparent z-10 pointer-events-none transition-opacity duration-300" />
      )}

      {/* Navigation Arrows */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-1 top-1/2 -translate-y-1/2 z-20 bg-surface/90 hover:bg-surface border border-border rounded-full p-1 shadow-sm text-primary transition-all backdrop-blur-sm opacity-0 group-hover/arch:opacity-100 focus:opacity-100"
          aria-label="Scroll left"
        >
          <ChevronLeft size={16} />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-1 top-1/2 -translate-y-1/2 z-20 bg-surface/90 hover:bg-surface border border-border rounded-full p-1 shadow-sm text-primary transition-all backdrop-blur-sm opacity-0 group-hover/arch:opacity-100 focus:opacity-100"
          aria-label="Scroll right"
        >
          <ChevronRight size={16} />
        </button>
      )}

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="w-full overflow-x-auto arch-scrollbar pb-2"
      >
        <div
          className={`flex items-stretch gap-0 ${compact ? "min-w-[420px]" : "min-w-[580px]"}`}
        >
        {layers.map((layer, li) => {
          const colors = layerColors[layer.key];
          return (
            <div key={layer.key} className="flex items-center flex-1 min-w-0">
              {/* Column */}
              <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                {/* Column header */}
                <p
                  className="text-center text-[10px] font-mono font-medium uppercase tracking-widest mb-1 truncate"
                  style={{ color: colors.text }}
                >
                  {layer.label}
                </p>

                {/* Nodes */}
                {layer.nodes.map((node) => (
                  <div
                    key={node.id}
                    className="mx-1 rounded-lg border px-2 py-1.5 text-center shadow-sm min-w-0"
                    style={{
                      backgroundColor: colors.bg,
                      borderColor: colors.border,
                    }}
                  >
                    <p
                      className={`font-mono font-semibold leading-tight break-words ${compact ? "text-[10px]" : "text-[11px]"}`}
                      style={{ color: colors.text }}
                    >
                      {node.label}
                    </p>
                    {node.sublabel && (
                      <p
                        className={`font-mono leading-tight opacity-70 mt-0.5 break-words ${compact ? "text-[9px]" : "text-[10px]"}`}
                        style={{ color: colors.text }}
                      >
                        {node.sublabel}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Arrow connector between columns */}
              {li < layers.length - 1 && (
                <div className="flex-shrink-0 flex flex-col items-center justify-center px-0.5">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 10h11M11 7l3 3-3 3"
                      stroke="#0F6E5C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
}

