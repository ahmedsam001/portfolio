"use client";

import React, { useState } from "react";
import { 
  Database, Server, Zap, Activity, ShieldAlert,
  LayoutDashboard, FileSpreadsheet, Box, Layers, Filter, 
  BarChart, GitBranch, X, Cloud, ArrowDown
} from "lucide-react";

type ArchNodeInfo = {
  id: string;
  label: string;
  sub: string;
  icon: React.ReactNode;
  desc: string;
  type: 'teal' | 'teal-emp' | 'orange';
};

const healthcareNodes: Record<string, ArchNodeInfo> = {
  synthea: { id: 'synthea', label: 'Synthea', sub: 'Historical Data', icon: <FileSpreadsheet size={18}/>, desc: 'Generates realistic synthetic patient history data in CSV format for batch ingestion.', type: 'teal' },
  snow: { id: 'snow', label: 'Snowflake STAGING', sub: 'Raw Load', icon: <Database size={18}/>, desc: 'Raw patient records loaded securely into internal cloud staging tables.', type: 'teal' },
  sparkBatch: { id: 'sparkBatch', label: 'Spark Batch', sub: 'Nightly ETL', icon: <Server size={18}/>, desc: 'Distributed nightly processing to clean and transform historical medical records.', type: 'teal' },
  medallion: { id: 'medallion', label: 'Medallion', sub: 'Bronze→Silver→Gold', icon: <Layers size={18}/>, desc: 'Historical patient data is stored and refined in the read-only Gold layer.', type: 'teal' },
  
  event: { id: 'event', label: 'Medical Event', sub: 'Live Source', icon: <Activity size={18}/>, desc: 'Real-time patient vitals or medical events captured continuously.', type: 'teal' },
  kafka: { id: 'kafka', label: 'Kafka', sub: 'Event Stream', icon: <GitBranch size={18}/>, desc: 'Real-time medical events are published to Kafka before Spark Structured Streaming processes them.', type: 'teal' },
  sparkStream: { id: 'sparkStream', label: 'Spark Streaming', sub: 'Structured', icon: <Zap size={18}/>, desc: 'Stateful micro-batch processing of real-time patient telemetry.', type: 'teal' },
  realtime: { id: 'realtime', label: 'REALTIME', sub: 'Append-only', icon: <Database size={18}/>, desc: 'Fast, append-only storage for the absolute latest processed events.', type: 'teal' },

  patient: { id: 'patient', label: 'Patient State', sub: 'GOLD ∪ REALTIME', icon: <Filter size={18}/>, desc: 'Combines historical Gold data with append-only REALTIME data for risk evaluation.', type: 'teal-emp' },
  risk: { id: 'risk', label: 'Risk Prediction', sub: 'ML Inference', icon: <ShieldAlert size={18}/>, desc: 'Live inference models scoring the combined patient state for critical health risks.', type: 'orange' },
  dashboard: { id: 'dashboard', label: 'Risk Dashboard', sub: 'Live Monitoring', icon: <LayoutDashboard size={18}/>, desc: 'Interactive clinical dashboard showing instant patient risk trajectories.', type: 'orange' },
};

const airbnbNodes: Record<string, ArchNodeInfo> = {
  s3: { id: 'airS3', label: 'AWS S3', sub: 'Data Lake', icon: <Cloud size={18}/>, desc: 'Raw JSON/CSV dumps of Airbnb bookings landing in cloud storage.', type: 'teal' },
  snowStage: { id: 'airSnowStage', label: 'Snowflake', sub: 'External Stage', icon: <Box size={18}/>, desc: 'Secure external staging for scalable raw data ingestion.', type: 'teal' },
  staging: { id: 'airStaging', label: 'STAGING', sub: 'Raw Views', icon: <Database size={18}/>, desc: 'Raw views mapping directly to ingested cloud data files.', type: 'teal' },
  bronze: { id: 'airBronze', label: 'BRONZE / SILVER', sub: 'Cleaned', icon: <Layers size={18}/>, desc: 'Data quality constraints, deduplication, and standard typing.', type: 'teal' },
  gold: { id: 'airGold', label: 'GOLD', sub: 'Star Schema', icon: <Database size={18}/>, desc: 'Dimensional modeling for analytical querying.', type: 'teal' },
  obt: { id: 'airOBT', label: 'OBT', sub: 'One Big Table', icon: <BarChart size={18}/>, desc: 'Denormalized table optimized for fast BI dashboard rendering.', type: 'orange' },
};

const retailNodes: Record<string, ArchNodeInfo> = {
  raw: { id: 'retRaw', label: 'Raw Retail Data', sub: 'JSON/CSV', icon: <FileSpreadsheet size={18}/>, desc: 'Raw sales transactions and inventory data.', type: 'teal' },
  bronze: { id: 'retBronze', label: 'Bronze', sub: 'Raw History', icon: <Database size={18}/>, desc: 'Immutable historical record of all raw transactions.', type: 'teal' },
  silver: { id: 'retSilver', label: 'Silver', sub: 'Enriched', icon: <Layers size={18}/>, desc: 'Master data joins, filtering, and enriched transaction records.', type: 'teal' },
  gold: { id: 'retGold', label: 'Gold KPI Marts', sub: 'Aggregated', icon: <Server size={18}/>, desc: 'Aggregated business metrics for distinct departments.', type: 'teal' },
  analytics: { id: 'retAnalytics', label: 'Business Analytics', sub: 'Dashboards', icon: <LayoutDashboard size={18}/>, desc: 'Actionable executive dashboards for revenue and operations.', type: 'orange' },
};

export default function InteractiveArchitecture() {
  const [activeTab, setActiveTab] = useState<0 | 1>(0);
  const [activeNode, setActiveNode] = useState<ArchNodeInfo | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const renderNode = (node: ArchNodeInfo, x: string, y: string) => {
    const isActive = activeNode?.id === node.id;
    const isHovered = hoveredNodeId === node.id;
    
    let baseBorder = 'border-primary/20 bg-surface';
    let hoverBorder = 'hover:border-primary';
    let ringColor = 'ring-primary/50';
    let iconBg = 'bg-primary-tint text-primary';
    let textSub = 'text-primary/70';
    
    if (node.type === 'orange') {
      baseBorder = 'border-accent/30 bg-surface';
      hoverBorder = 'hover:border-accent';
      ringColor = 'ring-accent/50';
      iconBg = 'bg-accent-tint text-accent';
      textSub = 'text-accent/90';
    } else if (node.type === 'teal-emp') {
      baseBorder = 'border-primary bg-primary text-text-on-dark shadow-md ring-2 ring-primary/30';
      hoverBorder = 'hover:ring-primary/60 hover:shadow-lg';
      ringColor = 'ring-primary/80';
      iconBg = 'bg-text-on-dark text-primary';
      textSub = 'text-text-on-dark/80';
    }
    
    return (
      <button
        key={node.id}
        tabIndex={0}
        title={node.desc}
        onClick={() => setActiveNode(isActive ? null : node)}
        onMouseEnter={() => setHoveredNodeId(node.id)}
        onMouseLeave={() => setHoveredNodeId(null)}
        className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-3 p-2.5 md:p-3 transition-all duration-300 rounded-xl z-20 w-[120px] sm:w-[150px] md:w-[176px] text-center md:text-left border-2
        ${baseBorder} ${hoverBorder} ${isActive ? `ring-4 ${ringColor} scale-[1.02]` : 'hover:scale-[1.02]'} shadow-sm`}
        style={{ left: x, top: y }}
        aria-label={`View details for ${node.label}`}
      >
        <div className={`flex-shrink-0 flex items-center justify-center w-7 h-7 md:w-9 md:h-9 rounded-lg transition-colors ${iconBg}`}>
          {node.icon}
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <p className={`font-heading font-bold text-[11px] md:text-[13px] leading-tight break-words ${node.type === 'teal-emp' ? 'text-text-on-dark' : 'text-text-primary'}`}>
            {node.label}
          </p>
          <p className={`font-mono font-medium text-[9px] md:text-[10px] mt-0.5 leading-tight break-words ${textSub}`}>
            {node.sub}
          </p>
        </div>
      </button>
    );
  };

  const RenderPath = ({ d, type, sourceId, targetId }: { d: string, type: 'batch' | 'stream' | 'output', sourceId?: string, targetId?: string }) => {
    const isOrange = type === 'output';
    const color = isOrange ? 'var(--color-accent)' : 'var(--color-primary)';
    const flowClass = type === 'batch' ? 'arch-path-batch' : 'arch-path-stream';
    const isHovered = activeNode?.id === sourceId || activeNode?.id === targetId || hoveredNodeId === sourceId || hoveredNodeId === targetId;
    
    return (
      <g>
        <path 
          d={d} 
          className={`arch-path-base transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-40"}`} 
          style={{ stroke: color, strokeWidth: isHovered ? 3 : 2 }} 
          vectorEffect="non-scaling-stroke" 
        />
        <path 
          d={d} 
          className={flowClass} 
          style={{ stroke: color, strokeWidth: 3, fill: 'none' }} 
          vectorEffect="non-scaling-stroke" 
        />
      </g>
    );
  };

  const renderMobileNode = (node: ArchNodeInfo) => {
    const isOrange = node.type === 'orange';
    const isEmp = node.type === 'teal-emp';
    
    return (
      <button
        key={node.id}
        onClick={() => setActiveNode(activeNode?.id === node.id ? null : node)}
        className={`w-full max-w-[280px] p-3 border-2 rounded-xl flex items-center gap-3 bg-surface transition-all duration-200 text-left
        ${isOrange ? 'border-accent/30 hover:border-accent' : isEmp ? 'border-primary bg-primary text-text-on-dark shadow-md' : 'border-primary/20 hover:border-primary'}
        ${activeNode?.id === node.id ? (isOrange ? 'ring-4 ring-accent/30' : 'ring-4 ring-primary/30') : ''}`}
      >
        <div className={`p-2 rounded-lg ${isOrange ? 'bg-accent-tint text-accent' : isEmp ? 'bg-text-on-dark text-primary' : 'bg-primary-tint text-primary'}`}>
          {node.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`font-heading font-bold text-sm leading-tight ${isEmp ? 'text-text-on-dark' : 'text-text-primary'}`}>{node.label}</p>
          <p className={`font-mono text-[10px] mt-0.5 leading-tight ${isOrange ? 'text-accent/90' : isEmp ? 'text-text-on-dark/80' : 'text-primary/70'}`}>{node.sub}</p>
        </div>
      </button>
    );
  };

  return (
    <section id="architecture" className="py-16 sm:py-20 lg:py-24 bg-bg-base relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="text-xs font-mono font-medium text-primary uppercase tracking-widest mb-2">
            System Design
          </p>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-text-primary">
            Interactive Architecture
          </h2>
          <p className="text-text-secondary mt-4 text-base max-w-2xl mx-auto">
            Explore the high-level data flow across my featured projects. 
            Select a node to view its specific technical role.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-12">
          <div className="bg-surface p-1.5 rounded-2xl inline-flex border border-border shadow-sm">
            <button
              onClick={() => { setActiveTab(0); setActiveNode(null); }}
              className={`px-6 py-3 rounded-xl font-heading font-bold text-[15px] transition-all duration-300 ${
                activeTab === 0 ? "bg-primary text-text-on-dark shadow-md" : "text-text-secondary hover:text-text-primary hover:bg-bg-base"
              }`}
            >
              Healthcare (Real-Time)
            </button>
            <button
              onClick={() => { setActiveTab(1); setActiveNode(null); }}
              className={`px-6 py-3 rounded-xl font-heading font-bold text-[15px] transition-all duration-300 ${
                activeTab === 1 ? "bg-primary text-text-on-dark shadow-md" : "text-text-secondary hover:text-text-primary hover:bg-bg-base"
              }`}
            >
              Airbnb / Retail (Batch)
            </button>
          </div>
        </div>

        {/* Desktop Architecture Container */}
        <div className="relative w-full bg-surface border border-border rounded-2xl shadow-card min-h-[600px] overflow-hidden hidden lg:block">
          
          {/* Details Panel Popover */}
          {activeNode && (
            <div className="absolute top-6 right-6 w-80 bg-surface border-2 border-primary/20 rounded-2xl shadow-2xl p-5 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${activeNode.type === 'orange' ? 'bg-accent-tint text-accent' : 'bg-primary-tint text-primary'}`}>
                    {activeNode.icon}
                  </div>
                  <div>
                    <h4 className="font-heading font-extrabold text-[15px] text-text-primary leading-none">{activeNode.label}</h4>
                    <p className={`font-mono text-[10px] uppercase mt-1.5 font-semibold tracking-wider ${activeNode.type === 'orange' ? 'text-accent' : 'text-primary'}`}>{activeNode.sub}</p>
                  </div>
                </div>
                <button onClick={() => setActiveNode(null)} className="text-text-secondary hover:text-primary transition-colors p-1 bg-bg-base rounded-md">
                  <X size={16} />
                </button>
              </div>
              <p className="text-[13px] text-text-secondary leading-relaxed border-t border-border pt-3">
                {activeNode.desc}
              </p>
            </div>
          )}

          {/* SVG Canvas */}
          <svg className="absolute inset-0 w-full h-full z-0" pointerEvents="none" viewBox="0 0 100 100" preserveAspectRatio="none">
            {activeTab === 0 && (
              <g className="animate-in fade-in duration-700">
                {/* Batch Paths */}
                <RenderPath d="M 8 25 L 22 25" type="batch" sourceId="synthea" targetId="snow" />
                <RenderPath d="M 22 25 L 36 25" type="batch" sourceId="snow" targetId="sparkBatch" />
                <RenderPath d="M 36 25 L 50 25" type="batch" sourceId="sparkBatch" targetId="medallion" />
                <RenderPath d="M 50 25 C 57 25, 57 50, 64 50" type="batch" sourceId="medallion" targetId="patient" />
                
                {/* Stream Paths */}
                <RenderPath d="M 8 75 L 22 75" type="stream" sourceId="event" targetId="kafka" />
                <RenderPath d="M 22 75 L 36 75" type="stream" sourceId="kafka" targetId="sparkStream" />
                <RenderPath d="M 36 75 L 50 75" type="stream" sourceId="sparkStream" targetId="realtime" />
                <RenderPath d="M 50 75 C 57 75, 57 50, 64 50" type="stream" sourceId="realtime" targetId="patient" />

                {/* Output Paths */}
                <RenderPath d="M 64 50 L 78 50" type="output" sourceId="patient" targetId="risk" />
                <RenderPath d="M 78 50 L 92 50" type="output" sourceId="risk" targetId="dashboard" />
              </g>
            )}

            {activeTab === 1 && (
              <g className="animate-in fade-in duration-700">
                {/* Airbnb Paths */}
                <RenderPath d="M 10 30 L 26 30" type="batch" sourceId="airS3" targetId="airSnowStage" />
                <RenderPath d="M 26 30 L 42 30" type="batch" sourceId="airSnowStage" targetId="airStaging" />
                <RenderPath d="M 42 30 L 58 30" type="batch" sourceId="airStaging" targetId="airBronze" />
                <RenderPath d="M 58 30 L 74 30" type="batch" sourceId="airBronze" targetId="airGold" />
                <RenderPath d="M 74 30 L 90 30" type="batch" sourceId="airGold" targetId="airOBT" />

                {/* Retail Paths */}
                <RenderPath d="M 10 70 L 30 70" type="batch" sourceId="retRaw" targetId="retBronze" />
                <RenderPath d="M 30 70 L 50 70" type="batch" sourceId="retBronze" targetId="retSilver" />
                <RenderPath d="M 50 70 L 70 70" type="batch" sourceId="retSilver" targetId="retGold" />
                <RenderPath d="M 70 70 L 90 70" type="batch" sourceId="retGold" targetId="retAnalytics" />
              </g>
            )}
          </svg>

          {/* HTML Nodes */}
          {activeTab === 0 && (
            <div className="absolute inset-0 z-10 animate-in fade-in duration-700">
              {renderNode(healthcareNodes.synthea, '8%', '25%')}
              {renderNode(healthcareNodes.snow, '22%', '25%')}
              {renderNode(healthcareNodes.sparkBatch, '36%', '25%')}
              {renderNode(healthcareNodes.medallion, '50%', '25%')}
              
              {renderNode(healthcareNodes.event, '8%', '75%')}
              {renderNode(healthcareNodes.kafka, '22%', '75%')}
              {renderNode(healthcareNodes.sparkStream, '36%', '75%')}
              {renderNode(healthcareNodes.realtime, '50%', '75%')}
              
              {/* Convergence Label */}
              <div className="absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 bg-surface/80 backdrop-blur-sm px-3 py-1 rounded-full border border-primary/10 shadow-sm" style={{ left: '57%', top: '38%' }}>
                <span className="text-[10px] font-mono font-bold text-primary tracking-widest uppercase">Unified</span>
                <span className="text-[10px] font-mono font-bold text-primary tracking-widest uppercase">Convergence</span>
              </div>

              {renderNode(healthcareNodes.patient, '64%', '50%')}
              {renderNode(healthcareNodes.risk, '78%', '50%')}
              {renderNode(healthcareNodes.dashboard, '92%', '50%')}
            </div>
          )}

          {activeTab === 1 && (
            <div className="absolute inset-0 z-10 animate-in fade-in duration-700">
              {/* Airbnb Flow Labels */}
              <div className="absolute -translate-y-1/2 left-[10%]" style={{ top: '15%' }}>
                <span className="text-xs font-mono font-bold text-text-secondary uppercase tracking-widest">Airbnb Project</span>
              </div>
              
              {renderNode(airbnbNodes.s3, '10%', '30%')}
              {renderNode(airbnbNodes.snowStage, '26%', '30%')}
              {renderNode(airbnbNodes.staging, '42%', '30%')}
              {renderNode(airbnbNodes.bronze, '58%', '30%')}
              {renderNode(airbnbNodes.gold, '74%', '30%')}
              {renderNode(airbnbNodes.obt, '90%', '30%')}

              {/* Retail Flow Labels */}
              <div className="absolute -translate-y-1/2 left-[10%]" style={{ top: '55%' }}>
                <span className="text-xs font-mono font-bold text-text-secondary uppercase tracking-widest">Retail Project</span>
              </div>

              {renderNode(retailNodes.raw, '10%', '70%')}
              {renderNode(retailNodes.bronze, '30%', '70%')}
              {renderNode(retailNodes.silver, '50%', '70%')}
              {renderNode(retailNodes.gold, '70%', '70%')}
              {renderNode(retailNodes.analytics, '90%', '70%')}
            </div>
          )}
        </div>

        {/* Mobile / Tablet Architecture View */}
        <div className="block lg:hidden w-full relative z-10">
          
          {activeNode && (
            <div className="fixed bottom-4 left-4 right-4 bg-surface border-2 border-primary/30 rounded-2xl shadow-2xl p-5 z-50 animate-in slide-in-from-bottom-8">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${activeNode.type === 'orange' ? 'bg-accent-tint text-accent' : 'bg-primary-tint text-primary'}`}>
                    {activeNode.icon}
                  </div>
                  <div>
                    <h4 className="font-heading font-extrabold text-[15px] text-text-primary leading-none">{activeNode.label}</h4>
                    <p className={`font-mono text-[10px] uppercase mt-1.5 font-bold ${activeNode.type === 'orange' ? 'text-accent' : 'text-primary'}`}>{activeNode.sub}</p>
                  </div>
                </div>
                <button onClick={() => setActiveNode(null)} className="p-2 bg-bg-base rounded-lg text-text-secondary">
                  <X size={18} />
                </button>
              </div>
              <p className="text-[13px] text-text-secondary leading-relaxed pt-2">
                {activeNode.desc}
              </p>
            </div>
          )}

          {activeTab === 0 && (
            <div className="flex flex-col gap-8 animate-in fade-in zoom-in-95 duration-500">
              <div className="bg-surface p-5 rounded-2xl border border-border shadow-sm">
                <h3 className="text-xs font-mono font-bold text-text-secondary uppercase tracking-widest mb-6 text-center border-b border-border pb-3">Historical Batch Flow</h3>
                <div className="flex flex-col items-center gap-3">
                  {[healthcareNodes.synthea, healthcareNodes.snow, healthcareNodes.sparkBatch, healthcareNodes.medallion].map((n, i) => (
                    <React.Fragment key={n.id}>
                      {renderMobileNode(n)}
                      {i < 3 && <ArrowDown size={20} className="text-primary/30" />}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="bg-surface p-5 rounded-2xl border border-border shadow-sm">
                <h3 className="text-xs font-mono font-bold text-text-secondary uppercase tracking-widest mb-6 text-center border-b border-border pb-3">Real-Time Event Flow</h3>
                <div className="flex flex-col items-center gap-3">
                  {[healthcareNodes.event, healthcareNodes.kafka, healthcareNodes.sparkStream, healthcareNodes.realtime].map((n, i) => (
                    <React.Fragment key={n.id}>
                      {renderMobileNode(n)}
                      {i < 3 && <ArrowDown size={20} className="text-primary/30" />}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-b from-surface to-bg-base p-5 rounded-2xl border-2 border-primary/20 shadow-md relative overflow-hidden">
                <h3 className="text-xs font-mono font-bold text-primary uppercase tracking-widest mb-6 text-center border-b border-primary/20 pb-3">Convergence & Output</h3>
                <div className="flex flex-col items-center gap-3 relative z-10">
                  {[healthcareNodes.patient, healthcareNodes.risk, healthcareNodes.dashboard].map((n, i) => (
                    <React.Fragment key={n.id}>
                      {renderMobileNode(n)}
                      {i < 2 && <ArrowDown size={20} className={n.type === 'orange' ? 'text-accent/40' : 'text-primary/40'} />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 1 && (
            <div className="flex flex-col gap-8 animate-in fade-in zoom-in-95 duration-500">
               <div className="bg-surface p-5 rounded-2xl border border-border shadow-sm">
                 <h3 className="text-xs font-mono font-bold text-text-secondary uppercase tracking-widest mb-6 text-center border-b border-border pb-3">Airbnb Batch ELT</h3>
                 <div className="flex flex-col items-center gap-3">
                   {[airbnbNodes.s3, airbnbNodes.snowStage, airbnbNodes.staging, airbnbNodes.bronze, airbnbNodes.gold, airbnbNodes.obt].map((n, i) => (
                      <React.Fragment key={n.id}>
                        {renderMobileNode(n)}
                        {i < 5 && <ArrowDown size={20} className={n.type === 'orange' ? 'text-accent/40' : 'text-primary/30'} />}
                      </React.Fragment>
                   ))}
                 </div>
               </div>

               <div className="bg-surface p-5 rounded-2xl border border-border shadow-sm">
                 <h3 className="text-xs font-mono font-bold text-text-secondary uppercase tracking-widest mb-6 text-center border-b border-border pb-3">Retail BI Pipeline</h3>
                 <div className="flex flex-col items-center gap-3">
                   {[retailNodes.raw, retailNodes.bronze, retailNodes.silver, retailNodes.gold, retailNodes.analytics].map((n, i) => (
                      <React.Fragment key={n.id}>
                        {renderMobileNode(n)}
                        {i < 4 && <ArrowDown size={20} className={n.type === 'orange' ? 'text-accent/40' : 'text-primary/30'} />}
                      </React.Fragment>
                   ))}
                 </div>
               </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
