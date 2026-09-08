// ─── Technical stack — CV/repo-verified only ─────────────────────────────────
export interface SkillItem {
  label: string;
  icon?: string; // Lucide icon name or custom key
}

export interface SkillGroup {
  id: string;
  title: string;
  emoji: string;
  items: SkillItem[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: "Languages",
    emoji: "💻",
    items: [
      { label: "Python", icon: "python" },
      { label: "SQL", icon: "database" },
      { label: "C++", icon: "code-2" },
      { label: "HTML", icon: "code" },
      { label: "CSS", icon: "palette" },
    ],
  },
  {
    id: "data-engineering",
    title: "Data Engineering",
    emoji: "⚙️",
    items: [
      { label: "Apache Spark", icon: "zap" },
      { label: "Apache Kafka", icon: "activity" },
      { label: "Apache Flink", icon: "wind" },
      { label: "Apache Hive", icon: "layers" },
      { label: "Hadoop / YARN", icon: "server" },
      { label: "dbt Core", icon: "git-merge" },
      { label: "Apache Airflow", icon: "repeat" },
      { label: "ETL / ELT Design", icon: "arrow-right-left" },
    ],
  },
  {
    id: "databases",
    title: "Databases & Warehousing",
    emoji: "🗄️",
    items: [
      { label: "Snowflake", icon: "snowflake" },
      { label: "Databricks", icon: "flame" },
      { label: "PostgreSQL", icon: "database" },
      { label: "MongoDB", icon: "circle-dot" },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & Platforms",
    emoji: "☁️",
    items: [
      { label: "AWS S3", icon: "cloud" },
      { label: "Microsoft Azure", icon: "cloud" },
      { label: "Databricks Cloud", icon: "flame" },
    ],
  },
  {
    id: "analytics",
    title: "Analytics & Tooling",
    emoji: "📊",
    items: [
      { label: "Pandas", icon: "table" },
      { label: "NumPy", icon: "sigma" },
      { label: "XGBoost", icon: "trending-up" },
      { label: "Streamlit", icon: "monitor" },
    ],
  },
  {
    id: "dev-tools",
    title: "Dev Tools",
    emoji: "🛠️",
    items: [
      { label: "Git", icon: "git-branch" },
      { label: "GitHub", icon: "github" },
      { label: "Linux", icon: "terminal" },
    ],
  },
];

