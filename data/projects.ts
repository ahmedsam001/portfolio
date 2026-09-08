// ─── Project data — verified from GitHub repos ───────────────────────────────
export interface TechPill {
  label: string;
}

export interface ArchNode {
  id: string;
  label: string;
  sublabel?: string;
  layer: "source" | "ingest" | "process" | "storage" | "output";
  highlight?: boolean; // orange accent for final output
}

export interface ArchEdge {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;
}

export interface Project {
  id: string;
  order: number;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string[];
  techPills: TechPill[];
  githubUrl: string;
  archNodes: ArchNode[];
  archEdges: ArchEdge[];
  keyDetails: string[];
  badge?: string;
}

export const projects: Project[] = [
  {
    id: "healthcare",
    order: 1,
    title: "Healthcare Real-Time Risk Monitoring Platform",
    shortTitle: "Healthcare Risk Platform",
    badge: "Real-Time + ML",
    description:
      "A production-style healthcare data platform combining historical patient data with real-time medical events to generate live disease-risk predictions using five XGBoost models.",
    longDescription: [
      "Ingests synthetic patient data (Synthea/SyntheticMass) into Snowflake STAGING, processes it through a batch Spark ETL into Bronze → Silver → Gold medallion layers, and trains 5 XGBoost models (Diabetes, Hypertension, CHD, Stroke, Asthma) on the Gold layer.",
      "A parallel real-time path captures new medical events through a Streamlit UI, streams them via Kafka into Spark Structured Streaming, persists them to REALTIME tables in Snowflake, and computes risk scores on the unified Patient State (GOLD ∪ REALTIME) view.",
    ],
    techPills: [
      { label: "Python" },
      { label: "Apache Spark" },
      { label: "Kafka" },
      { label: "Snowflake" },
      { label: "Streamlit" },
      { label: "XGBoost" },
      { label: "SQL" },
    ],
    githubUrl: "https://github.com/ahmedsam001/HealthCare",
    archNodes: [
      { id: "synthea", label: "SyntheticMass", sublabel: "Synthea", layer: "source" },
      { id: "staging", label: "Snowflake", sublabel: "STAGING", layer: "ingest" },
      { id: "spark-batch", label: "Spark Batch", sublabel: "ETL", layer: "process" },
      { id: "bronze", label: "Bronze", sublabel: "Raw", layer: "storage" },
      { id: "silver", label: "Silver", sublabel: "Clean", layer: "storage" },
      { id: "gold", label: "Gold", sublabel: "Historical (RO)", layer: "storage" },
      { id: "ml", label: "5 XGBoost", sublabel: "Models", layer: "output", highlight: true },
      { id: "event", label: "Medical Event", sublabel: "Streamlit UI", layer: "source" },
      { id: "kafka", label: "Kafka Topic", sublabel: "Streaming", layer: "ingest" },
      { id: "spark-stream", label: "Spark Structured", sublabel: "Streaming", layer: "process" },
      { id: "realtime", label: "REALTIME", sublabel: "Append-only", layer: "storage" },
      { id: "patient-state", label: "Patient State", sublabel: "GOLD ∪ REALTIME", layer: "storage" },
      { id: "risk", label: "Risk Dashboard", sublabel: "18-feature engine", layer: "output", highlight: true },
    ],
    archEdges: [
      { from: "synthea", to: "staging" },
      { from: "staging", to: "spark-batch" },
      { from: "spark-batch", to: "bronze" },
      { from: "bronze", to: "silver" },
      { from: "silver", to: "gold" },
      { from: "gold", to: "ml" },
      { from: "event", to: "kafka" },
      { from: "kafka", to: "spark-stream" },
      { from: "spark-stream", to: "realtime" },
      { from: "gold", to: "patient-state", dashed: true },
      { from: "realtime", to: "patient-state" },
      { from: "patient-state", to: "risk" },
    ],
    keyDetails: [
      "GOLD layer is read-only / historical; REALTIME is append-only",
      "Patient State = GOLD UNION REALTIME at query time",
      "Risk scoring triggers only after Kafka event is confirmed in Snowflake",
      "5 disease models: Diabetes, Hypertension, CHD, Stroke, Asthma",
      "18-feature engine: 14 numeric + 4 categorical features",
    ],
  },
  {
    id: "retail",
    order: 2,
    title: "dbt Retail Analytics Pipeline",
    shortTitle: "Retail Analytics Pipeline",
    badge: "Batch ELT",
    description:
      "End-to-end retail analytics pipeline using dbt with a Bronze/Silver/Gold medallion architecture on Databricks, delivering business-ready KPIs for sales, returns, and promotions.",
    longDescription: [
      "Raw retail data is ingested into a Bronze layer, cleaned and standardized in Silver (null handling, type casting, formatting), then surfaced as Gold-layer KPI marts that serve downstream BI tools.",
      "Modular dbt models use reusable macros to standardize KPI logic across daily and monthly sales marts, ensuring consistent metric definitions across reporting.",
    ],
    techPills: [
      { label: "Databricks" },
      { label: "dbt Core" },
      { label: "SQL" },
      { label: "Jinja" },
      { label: "Git" },
    ],
    githubUrl: "https://github.com/ahmedsam001/dbt-retail-analytics-pipeline",
    archNodes: [
      { id: "raw-retail", label: "Raw Retail", sublabel: "Source Data", layer: "source" },
      { id: "bronze-retail", label: "Bronze", sublabel: "Raw Ingestion", layer: "storage" },
      { id: "silver-retail", label: "Silver", sublabel: "Cleaning + Types", layer: "storage" },
      { id: "gold-retail", label: "Gold", sublabel: "KPI Marts", layer: "storage", highlight: true },
      { id: "bi-retail", label: "BI / Analytics", sublabel: "Business Reports", layer: "output", highlight: true },
    ],
    archEdges: [
      { from: "raw-retail", to: "bronze-retail" },
      { from: "bronze-retail", to: "silver-retail", label: "dbt models" },
      { from: "silver-retail", to: "gold-retail", label: "dbt models" },
      { from: "gold-retail", to: "bi-retail" },
    ],
    keyDetails: [
      "KPIs: net revenue, revenue after returns, promotion attach rate",
      "KPIs: return rate, average transaction value",
      "Reusable Jinja macros standardize KPI logic across mart models",
      "Daily and monthly sales mart granularities",
      "Platform: Databricks with dbt Core",
    ],
  },
  {
    id: "airbnb",
    order: 3,
    title: "Airbnb Analytics Pipeline — dbt + Snowflake",
    shortTitle: "Airbnb ELT Pipeline",
    badge: "ELT + Star Schema",
    description:
      "An ELT analytics-engineering pipeline ingesting Airbnb booking/host/listing CSVs from AWS S3 into Snowflake, transforming through dbt medallion layers to a Kimball star schema and One Big Table (OBT) for BI consumption.",
    longDescription: [
      "CSVs (bookings, hosts, listings) land in AWS S3, are loaded into Snowflake via an External Stage into STAGING tables, then flow through Bronze (incremental), Silver (cleaned, normalized), Gold (star schema: fct_bookings, dim_hosts, dim_listings), and finally into a 37-column OBT.",
      "dbt snapshots implement SCD Type 2 on booking history; an ephemeral CTE layer computes derived flags and revenue-by-status logic. 19 data tests (unique/not_null) cover all fact, dimension, and OBT models.",
    ],
    techPills: [
      { label: "AWS S3" },
      { label: "Snowflake" },
      { label: "dbt Core" },
      { label: "SQL" },
      { label: "Jinja" },
      { label: "Git" },
    ],
    githubUrl: "https://github.com/ahmedsam001/airbnb-analytics-dbt-snowflake",
    archNodes: [
      { id: "s3", label: "AWS S3", sublabel: "bookings / hosts / listings", layer: "source" },
      { id: "ext-stage", label: "External Stage", sublabel: "Snowflake", layer: "ingest" },
      { id: "staging-air", label: "STAGING", sublabel: "Raw tables", layer: "process" },
      { id: "bronze-air", label: "Bronze", sublabel: "Incremental", layer: "storage" },
      { id: "silver-air", label: "Silver", sublabel: "Cleaned + Normalized", layer: "storage" },
      { id: "gold-air", label: "Gold — Star Schema", sublabel: "fct_bookings + dims", layer: "storage", highlight: true },
      { id: "obt", label: "OBT", sublabel: "37-col One Big Table", layer: "output", highlight: true },
    ],
    archEdges: [
      { from: "s3", to: "ext-stage" },
      { from: "ext-stage", to: "staging-air" },
      { from: "staging-air", to: "bronze-air", label: "incremental" },
      { from: "bronze-air", to: "silver-air", label: "dbt" },
      { from: "silver-air", to: "gold-air", label: "dbt" },
      { from: "gold-air", to: "obt" },
    ],
    keyDetails: [
      "13 dbt models · 19 data tests · 3 SCD Type 2 snapshots",
      "~5,000 fact rows · 37-column OBT",
      "Full dbt build in ~37 seconds",
      "SCD Type 2 on booking history via dbt snapshots",
      "Ephemeral CTE layer for derived booking flags and revenue-by-status logic",
    ],
  },
];

