"use client";

import React, { useState, useEffect, useRef } from "react";
import { FileJson, Cloud, Activity, Webhook, Cpu, Database, PieChart, X } from "lucide-react";

type NodeId = 'sources' | 'kafka' | 'spark' | 'storage' | 'analytics';

interface NodeData {
  id: NodeId;
  label: string;
  sub: string;
  icon: React.ReactNode;
  tooltip: string;
  color: "teal" | "orange";
  delayMs: number;
}

const nodes: NodeData[] = [
  { id: 'kafka', label: 'Kafka', sub: 'Streaming', icon: <Webhook size={20} />, tooltip: 'Real-time event streaming', color: 'teal', delayMs: 400 },
  { id: 'spark', label: 'Spark', sub: 'Processing', icon: <Cpu size={20} />, tooltip: 'Distributed data processing', color: 'teal', delayMs: 800 },
  { id: 'storage', label: 'Storage', sub: 'Data Layers', icon: <Database size={20} />, tooltip: 'Layered data storage (Bronze/Silver/Gold)', color: 'teal', delayMs: 1200 },
  { id: 'analytics', label: 'Analytics', sub: 'Insights', icon: <PieChart size={20} />, tooltip: 'Business and risk insights', color: 'orange', delayMs: 1600 },
];

export default function HeroDataFlow() {
  const [activeNode, setActiveNode] = useState<NodeId | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close popover when clicking outside or pressing Escape
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveNode(null);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveNode(null);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const Connector = ({ delayMs }: { delayMs: number }) => (
    <div 
      className="hero-node flex items-center justify-center flex-shrink-0" 
      style={{ animationDelay: `${delayMs}ms` }}
      aria-hidden="true"
    >
      {/* Desktop: Horizontal Arrow */}
      <svg className="hidden md:block" width="40" height="16" viewBox="0 0 40 16" fill="none">
        <line x1="0" y1="8" x2="34" y2="8" stroke="currentColor" strokeWidth="2" className="text-primary/30 hero-connector-line" strokeLinecap="round" />
        <path d="M28 4 L34 8 L28 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/60" />
      </svg>
      {/* Mobile: Vertical Arrow */}
      <svg className="block md:hidden" width="16" height="24" viewBox="0 0 16 24" fill="none">
        <line x1="8" y1="0" x2="8" y2="18" stroke="currentColor" strokeWidth="2" className="text-primary/30 hero-connector-line-vertical" strokeLinecap="round" />
        <path d="M4 12 L8 18 L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/60" />
      </svg>
    </div>
  );

  return (
    <div 
      className="w-full max-w-5xl mx-auto pt-6 pb-2 relative flex justify-center" 
      ref={containerRef}
      role="img"
      aria-label="Interactive live data flow visualization: Sources to Kafka, Spark, Storage, and Analytics"
    >
      <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2">
        
        {/* SOURCES GROUP */}
        <div 
          className="hero-node flex flex-row md:flex-col flex-wrap justify-center gap-1.5 md:gap-2 p-2 md:p-3 bg-surface border border-border rounded-xl shadow-sm z-10"
          style={{ animationDelay: '0ms' }}
        >
          <div className="hidden md:block text-[9px] font-mono font-bold text-text-secondary uppercase tracking-widest text-center mb-1">
            Sources
          </div>
          <div className="flex flex-row md:flex-col gap-1.5 md:gap-2">
            {[
              { label: 'CSV', icon: <FileJson size={14}/> },
              { label: 'API', icon: <Cloud size={14}/> },
              { label: 'EVENTS', icon: <Activity size={14}/> }
            ].map((src, i) => (
              <div key={i} className="flex items-center gap-1 md:gap-1.5 px-2 py-1 md:px-2.5 md:py-1.5 bg-bg-base border border-border/50 rounded-lg text-text-secondary hover:text-primary transition-colors cursor-default">
                <span className="text-primary/70">{src.icon}</span>
                <span className="text-[9px] md:text-[10px] font-mono font-semibold">{src.label}</span>
              </div>
            ))}
          </div>
        </div>

        <Connector delayMs={200} />

        {/* MAIN NODES */}
        {nodes.map((node, i) => (
          <React.Fragment key={node.id}>
            <div 
              className={`hero-node relative z-10 ${node.color === 'orange' ? 'node-orange' : ''}`}
              style={{ animationDelay: `${node.delayMs}ms` }}
            >
              <button
                onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
                className={`flex flex-col items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-xl md:rounded-2xl border transition-all duration-300 bg-surface group hero-node-active ${
                  node.color === 'orange' 
                    ? 'border-accent/30 hover:border-accent text-accent hover:bg-accent-tint/30' 
                    : 'border-primary/30 hover:border-primary text-primary hover:bg-primary-tint/30'
                } ${
                  activeNode === node.id 
                    ? (node.color === 'orange' ? 'ring-2 ring-accent/50 scale-105 bg-accent-tint/30' : 'ring-2 ring-primary/50 scale-105 bg-primary-tint/30') 
                    : 'hover:scale-[1.02]'
                }`}
                aria-expanded={activeNode === node.id}
                aria-label={`View details for ${node.label}`}
              >
                <div className={`mb-1 transition-transform duration-300 group-hover:-translate-y-0.5 ${node.color === 'orange' ? 'text-accent' : 'text-primary'}`}>
                  {React.cloneElement(node.icon as React.ReactElement, { size: 22 })}
                </div>
                <span className="text-[10px] md:text-xs font-heading font-bold text-text-primary tracking-wide">
                  {node.label}
                </span>
                <span className={`text-[8px] md:text-[9px] font-mono opacity-80 mt-0.5 ${node.color === 'orange' ? 'text-accent' : 'text-primary'}`}>
                  {node.sub}
                </span>
              </button>

              {/* LIGHTWEIGHT POPOVER */}
              {activeNode === node.id && (
                <div className="absolute top-full md:top-auto md:bottom-full left-1/2 -translate-x-1/2 mt-2 md:mt-0 md:mb-3 w-40 md:w-48 p-3 bg-surface border border-border rounded-xl shadow-lg z-50 hero-popover">
                  <div className="flex justify-between items-start mb-1.5">
                    <span className={`text-[9px] md:text-[10px] font-mono font-bold uppercase tracking-widest ${node.color === 'orange' ? 'text-accent' : 'text-primary'}`}>
                      {node.label}
                    </span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setActiveNode(null); }} 
                      className="text-text-secondary hover:text-primary transition-colors -mt-1 -mr-1 p-1"
                      aria-label="Close details"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <p className="text-[11px] md:text-xs text-text-primary leading-relaxed text-left">
                    {node.tooltip}
                  </p>
                  {/* Arrow pointing to node */}
                  <div className="absolute -top-1.5 md:top-auto md:-bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-l border-t md:border-l-0 md:border-t-0 md:border-r md:border-b border-border bg-surface" aria-hidden="true" />
                </div>
              )}
            </div>

            {i < nodes.length - 1 && <Connector delayMs={node.delayMs + 200} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

