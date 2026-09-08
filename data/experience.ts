// ─── Experience & Education timeline ─────────────────────────────────────────
export type TimelineType = "education" | "training" | "project";

export interface TimelineEntry {
  id: string;
  type: TimelineType;
  period: string;
  title: string;
  organization: string;
  location?: string;
  description: string[];
  projectLink?: string; // links to a project card id
  current?: boolean;
}

export const timeline: TimelineEntry[] = [
  {
    id: "nti",
    type: "training",
    period: "Aug 2026 — Present",
    title: "Big Data Analysis Intern",
    organization: "National Telecommunication Institute (NTI)",
    location: "Egypt",
    current: true,
    description: [
      "Built ingestion and streaming data pipelines with Kafka and Flume.",
      "Processed large-scale datasets using MapReduce, Apache Spark, and Apache Flink.",
      "Designed data warehousing solutions and optimized complex queries using Apache Hive.",
      "Administered Linux-based distributed environments and Hadoop clusters (YARN, Zookeeper).",
    ],
  },
  {
    id: "depi",
    type: "training",
    period: "Jul 2026 — Present",
    title: "Microsoft Data Engineer Trainee",
    organization: "Digital Egypt Pioneers Initiative (DEPI)",
    location: "Egypt",
    current: true,
    description: [
      "Built end-to-end data pipelines with Python and Microsoft Azure data services.",
      "Designed scalable data architectures and optimized workflows for performance.",
      "Managed databases and integrated cloud systems with SQL technologies.",
      "Delivered a technical capstone project simulating a production analytics environment.",
    ],
  },
  {
    id: "sinai-uni",
    type: "education",
    period: "2023 — 2027",
    title: "Bachelor of Computer Science, Data Engineering",
    organization: "Sinai University",
    location: "Egypt",
    description: [
      "CGPA 3.3 / 4.0 — Very Good",
      "Focused heavily on distributed systems, data structures, and database architecture.",
    ],
  },
];
